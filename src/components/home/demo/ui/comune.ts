/*
 * Ciò che i pezzi dell'interfaccia della demo si dividono (piano 2026-11-15-demo-fedele, §5, nel repo
 * team-tasks-manager): la chiave dei data-k, il confronto senza maiuscole né accenti, il Tab che gira dentro una modale
 * o un dialogo, il focus reso a chi ha aperto, gli id, le icone di Discord e il riquadro dell'avviso. Le icone sono
 * disegnate sulle schermate dell'utente (owner-menu.png, owner-ruolo.png in Desktop\ttm), alla loro misura.
 */
import { CHEV } from '../../scene-data.ts';
import { escape } from '../markdown.ts';

/** Minuscolo e senza accenti, per confrontare ciò che si scrive coi nomi: «Zoë» e «zoe» sono uguali. */
export function senzaAccenti(testo: string): string {
  return testo.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

/** Ciò che dice di chi è un data-k: la prima parola, in minuscolo, senza accenti («Scrim results» → `scrim`). */
export function chiave(testo: string): string {
  return senzaAccenti(testo).split(/[^a-z0-9]+/).find(Boolean) ?? '';
}

let ultimo = 0;

/** Un numero nuovo a ogni chiamata: tiene unici gli id che legano un titolo, un elenco, una voce attiva. */
export function nuovoNumero(): number {
  return ++ultimo;
}

/** Ciò che prende il focus col Tab, come in Dialog.tsx della pagina dell'Activity. */
const FOCUSABILI = 'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), ' +
  'textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

/** Tab e Maiusc+Tab girano dentro il riquadro: dall'ultimo controllo si torna al primo, dal primo all'ultimo. */
export function giraIlTab(riquadro: HTMLElement, e: KeyboardEvent): void {
  if (e.key !== 'Tab') return;
  const tutti = [...riquadro.querySelectorAll<HTMLElement>(FOCUSABILI)].filter((el) => el.getClientRects().length > 0);
  const attivo = document.activeElement;
  if (tutti.length === 0) {
    e.preventDefault();
    riquadro.focus();
  } else if (e.shiftKey && (attivo === tutti[0] || attivo === riquadro)) {
    e.preventDefault();
    tutti[tutti.length - 1].focus();
  } else if (!e.shiftKey && attivo === tutti[tutti.length - 1]) {
    e.preventDefault();
    tutti[0].focus();
  }
}

/** Il focus a chi ha aperto il pezzo, se c'è ancora; la pagina non scorre. */
export function rendiIlFocus(apritore: HTMLElement): void {
  if (apritore.isConnected) apritore.focus({ preventScroll: true });
}

/** Scorre solo l'elenco, non la pagina, finché la voce non si vede tutta. */
export function inVista(elenco: HTMLElement, voce: HTMLElement): void {
  const sopra = voce.offsetTop;
  const sotto = sopra + voce.offsetHeight;
  if (sopra < elenco.scrollTop) elenco.scrollTop = sopra;
  else if (sotto > elenco.scrollTop + elenco.clientHeight) elenco.scrollTop = sotto - elenco.clientHeight;
}

const svg = (classe: string, vista: string, corpo: string) =>
  `<svg class="${classe}" viewBox="${vista}" aria-hidden="true">${corpo}</svg>`;

/** La freccia dei menu, in giù: il CSS la gira quando il menu è aperto. */
export const FRECCIA = svg('sc-chev', '0 0 24 24', `<path fill="currentColor" d="${CHEV}"/>`);

/** La spunta bianca nella casella piena del menu di menzioni. */
export const SPUNTA = svg('ui-spunta', '0 0 20 20', '<path d="M5 10l3 3 6.5-6.5" fill="none" stroke="currentColor" ' +
  'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>');

/** La × sottile di un'etichetta. */
export const CROCE = svg('ui-croce', '0 0 20 20',
  '<path d="M5 5l10 10M15 5 5 15" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>');

/** Lo scudo grigio di un ruolo, con la persona ritagliata dentro. */
export const SCUDO = svg('ui-scudo', '3 2 18 20', '<path fill="currentColor" fill-rule="evenodd" d="M12 2C14.9 3.4 ' +
  '17.7 4.1 20.4 4.2Q21 4.2 21 4.8V11C21 16 17.6 20.1 12 22 6.4 20.1 3 16 3 11V4.8Q3 4.2 3.6 4.2C6.3 4.1 9.1 3.4 12 ' +
  '2ZM14.9 9.6A2.9 2.9 0 1 1 9.1 9.6 2.9 2.9 0 1 1 14.9 9.6ZM7.2 17.6C7.9 15.4 9.7 14 12 14S16.1 15.4 16.8 17.6C15.5 ' +
  '18.9 13.9 19.9 12 20.6 10.1 19.9 8.5 18.9 7.2 17.6Z"/>');

/** La persona davanti al numero dei membri di un ruolo. */
export const OMINO = svg('ui-omino', '0 0 24 24', '<path fill="currentColor" d="M12 11.5a4.25 4.25 0 1 0 0-8.5 4.25 ' +
  '4.25 0 1 0 0 8.5ZM4 21c0-4.2 3.6-7 8-7s8 2.8 8 7Z"/>');

/** L'occhio del piede di un messaggio effimero. */
export const OCCHIO = svg('ui-occhio', '0 0 24 24', '<path fill="currentColor" fill-rule="evenodd" d="M12 5C6.6 5 ' +
  '2.9 9.3 1.6 12c1.3 2.7 5 7 10.4 7s9.1-4.3 10.4-7C21.1 9.3 17.4 5 12 5Zm0 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 ' +
  '0-7.6Z"/><circle cx="12" cy="12" r="2" fill="currentColor"/>');

/** L'avviso della sola lettura in un riquadro (spec §8.3): la modale, il pannello More, il dialogo Edit the list. */
export function riquadroAvviso(testo: string): string {
  return `<div class="ui-avviso" role="note">${escape(testo)}</div>`;
}
