/*
 * La modale di Discord nella demo (piano 2026-11-15-demo-fedele, §5 e §1.2.12; spec §3.5; nel repo
 * team-tasks-manager): il titolo con la ✕, i testi, i campi con l'etichetta, il menu a scelta singola, Cancel e Submit.
 * Copre il canale; se è più alta, scorre il velo e i menu ne escono senza tagli. Prima di mandare controlla i campi
 * come Discord: l'obbligo, poi la lunghezza minima; la massima la tiene il campo. In sola lettura l'avviso in un
 * riquadro in cima, i campi che non si scrivono, Submit spento (spec §8.3).
 */
import { DISCORD } from '../../scene-data.ts';
import { escape } from '../markdown.ts';
import { CROCE, giraIlTab, nuovoNumero, rendiIlFocus, riquadroAvviso } from './comune.ts';
import { htmlDellaScelta, montaScelta } from './scelta.ts';
import type { Opzione, Scelta } from './scelta.ts';

export type Campo =
  | {
    tipo: 'testo'; id: string; etichetta: string; valore?: string; segnaposto?: string; obbligatorio?: boolean;
    min?: number; max?: number; paragrafo?: boolean;
  }
  /** Una scelta è sempre fatta: ha la sua di partenza e non si toglie. L'obbligo mette solo l'asterisco. */
  | { tipo: 'scelta'; id: string; etichetta: string; opzioni: Opzione[]; scelto?: string; obbligatorio?: boolean }
  /** Un TextDisplay: l'HTML è già pronto (markdown.ts). */
  | { tipo: 'testoFisso'; html: string };

export interface Modale {
  titolo: string;
  campi: Campo[];
  /** Il testo dell'avviso della sola lettura (AVVISO_ILLUSTRATIVO): se c'è, la modale non si manda. */
  solaLettura?: string;
}

/**
 * Il controllo di un campo prima di mandare, come Discord (§1.2.12): vuoto e obbligatorio, «This field is
 * required.»; scritto e più corto del minimo, «Must be at least n characters long.». Passano un campo facoltativo
 * vuoto e gli spazi: un testo fatto solo di spazi lo rifiuta il bot (tasklist.modal.task.blank.error).
 */
export function controllaCampo(campo: { obbligatorio?: boolean; min?: number }, valore: string): string | null {
  if (valore === '') return campo.obbligatorio ? DISCORD.obbligatorio : null;
  if (campo.min !== undefined && valore.length < campo.min) return DISCORD.almeno(campo.min);
  return null;
}

/** L'id di un campo nella modale `n`: lo usano l'etichetta, la riga dell'errore, il menu. */
const idDel = (n: number, campo: string) => `ui-m${n}-${campo}`;

function htmlDelCampo(c: Campo, n: number, sola: boolean): string {
  if (c.tipo === 'testoFisso') return `<div class="ui-mtesto">${c.html}</div>`;
  const id = idDel(n, c.id);
  const obbligo = c.obbligatorio ? '<span class="ui-mreq" aria-hidden="true">*</span>' : '';
  if (c.tipo === 'scelta') {
    const menu = htmlDellaScelta(`m-${c.id}`, c.opzioni, '', c.scelto ?? null, n,
      { spento: sola, etichetta: `${id}-lab` });
    return `<div class="sc-mfield"><p class="sc-mlab" id="${id}-lab">${escape(c.etichetta)}${obbligo}</p>` +
      `<div class="ui-mscelta" data-k="m-${c.id}">${menu}</div></div>`;
  }
  const attributi = [
    'class="sc-minput ui-minput"', `id="${id}"`, `data-k="m-${c.id}"`,
    c.max !== undefined ? `maxlength="${c.max}"` : '',
    c.segnaposto ? `placeholder="${escape(c.segnaposto)}"` : '',
    c.obbligatorio ? 'aria-required="true"' : '',
    sola ? 'readonly' : '',
    'autocomplete="off"',
  ].filter(Boolean).join(' ');
  const valore = escape(c.valore ?? '');
  // L'a capo dopo <textarea> il parser lo toglie: un testo che comincia con un a capo lo tiene.
  const campo = c.paragrafo
    ? `<textarea ${attributi}>\n${valore}</textarea>`
    : `<input type="text" ${attributi} value="${valore}">`;
  return `<div class="sc-mfield"><label class="sc-mlab" for="${id}">${escape(c.etichetta)}${obbligo}</label>` +
    `${campo}<p class="ui-merr" id="${id}-err" hidden></p></div>`;
}

/** La modale in HTML col contratto del §5: `modal`, `m-x`, `m-<id>` per campo, `m-cancel`, `m-submit`. */
export function htmlDellaModale(modale: Modale, n: number): string {
  const sola = Boolean(modale.solaLettura);
  const titolo = `ui-mt-${n}`;
  const avviso = modale.solaLettura ? riquadroAvviso(modale.solaLettura) : '';
  return `<div class="sc-modal ui-modale" data-k="modal" role="dialog" aria-modal="true" ` +
    `aria-labelledby="${titolo}" tabindex="-1">` +
    `<div class="sc-mhd"><p class="sc-mtitle" id="${titolo}">${escape(modale.titolo)}</p>` +
    `<button type="button" class="sc-mx" data-k="m-x" aria-label="${DISCORD.chiudi}">${CROCE}</button></div>` +
    avviso + modale.campi.map((c) => htmlDelCampo(c, n, sola)).join('') +
    `<div class="sc-mfoot"><button type="button" class="sc-mbtn" data-k="m-cancel">${DISCORD.annulla}</button>` +
    `<button type="button" class="sc-mbtn sc-mbtn-blue" data-k="m-submit"${sola ? ' disabled' : ''}>` +
    `${DISCORD.invia}</button></div></div>`;
}

/** Il velo di ogni contenitore, con la modale aperta: aprirne un'altra chiude quella di prima. */
const APERTE = new WeakMap<HTMLElement, () => void>();

/** L'errore sotto il campo, o nessuno: il bordo rosso e la frase, letta col campo (aria-describedby). */
function segnala(campo: HTMLInputElement | HTMLTextAreaElement, errore: string | null): void {
  const riga = campo.parentElement?.querySelector<HTMLElement>('.ui-merr');
  if (!riga) return;
  riga.textContent = errore ?? '';
  riga.hidden = !errore;
  if (errore) {
    campo.setAttribute('aria-invalid', 'true');
    campo.setAttribute('aria-describedby', riga.id);
  } else {
    campo.removeAttribute('aria-invalid');
    campo.removeAttribute('aria-describedby');
  }
}

/**
 * Apre la modale in `dove` (il canale), nel velo che c'è già (`modalwrap`) o in uno nuovo. Il focus va al primo campo,
 * col cursore in fondo, o alla modale in sola lettura; Tab gira dentro; alla chiusura torna ad `apritore`. Submit
 * controlla i campi, chiude, poi chiama `invio` coi valori per id; Cancel, la ✕, Esc e un clic sul velo chiudono e
 * chiamano `chiusura`. Restituisce la chiusura senza avvisi, per chi cambia tab.
 */
export function apriModale(dove: HTMLElement, modale: Modale, apritore: HTMLElement,
  alla: { invio(valori: Record<string, string>): void; chiusura?(): void }): () => void {
  let velo = dove.querySelector<HTMLElement>(':scope > [data-k="modalwrap"]');
  if (!velo) {
    velo = document.createElement('div');
    velo.className = 'sc-modalwrap';
    velo.dataset.k = 'modalwrap';
    dove.append(velo);
  }
  const posto = velo;
  APERTE.get(posto)?.();
  const n = nuovoNumero();
  const sola = Boolean(modale.solaLettura);
  posto.innerHTML = htmlDellaModale(modale, n);
  posto.setAttribute('data-aperta', '');
  posto.removeAttribute('aria-hidden');
  const box = posto.querySelector<HTMLElement>('[data-k="modal"]');
  if (!box) throw new Error('apriModale: la modale non si è disegnata');
  const ac = new AbortController();
  const { signal } = ac;
  const menu = new Map<string, Scelta>();
  for (const c of modale.campi) {
    const dentro = c.tipo === 'scelta' && !sola ? box.querySelector<HTMLElement>(`[data-k="m-${c.id}"]`) : null;
    if (c.tipo !== 'scelta' || !dentro) continue;
    menu.set(c.id, montaScelta(dentro, c.opzioni, '', { scelta: () => undefined },
      { scelto: c.scelto ?? null, etichetta: `${idDel(n, c.id)}-lab` }));
  }
  const campoDi = (id: string) =>
    box.querySelector<HTMLInputElement | HTMLTextAreaElement>(`[data-k="m-${id}"]`);

  let chiusa = false;
  const chiudi = (avvisa: boolean) => {
    if (chiusa) return;
    chiusa = true;
    menu.forEach((m) => m.smonta());
    ac.abort();
    APERTE.delete(posto);
    posto.removeAttribute('data-aperta');
    posto.setAttribute('aria-hidden', 'true');
    posto.replaceChildren();
    rendiIlFocus(apritore);
    if (avvisa) alla.chiusura?.();
  };
  const invia = () => {
    if (sola) return;
    const valori: Record<string, string> = {};
    let primo: HTMLElement | null = null;
    for (const c of modale.campi) {
      if (c.tipo === 'scelta') valori[c.id] = menu.get(c.id)?.valore() ?? c.scelto ?? '';
      if (c.tipo !== 'testo') continue;
      const campo = campoDi(c.id);
      if (!campo) continue;
      const errore = controllaCampo(c, campo.value);
      segnala(campo, errore);
      if (errore) primo ??= campo;
      valori[c.id] = campo.value;
    }
    if (primo) {
      primo.focus();
      return;
    }
    chiudi(false);
    alla.invio(valori);
  };

  posto.addEventListener('pointerdown', (e) => {
    // Sul velo, non sulla sua barra di scorrimento.
    if (e.target === posto && e.offsetX < posto.clientWidth) chiudi(true);
  }, { signal });
  posto.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      chiudi(true);
    } else if (e.key === 'Enter' && e.target instanceof HTMLInputElement && !e.isComposing) {
      e.preventDefault();
      invia();
    } else {
      giraIlTab(box, e);
    }
  }, { signal });
  box.addEventListener('input', (e) => {
    const t = e.target;
    if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) segnala(t, null);
  }, { signal });
  box.querySelector('[data-k="m-x"]')?.addEventListener('click', () => chiudi(true), { signal });
  box.querySelector('[data-k="m-cancel"]')?.addEventListener('click', () => chiudi(true), { signal });
  box.querySelector('[data-k="m-submit"]')?.addEventListener('click', invia, { signal });

  const primo = sola ? null : box.querySelector<HTMLElement>('.ui-minput, .ui-scelta');
  (primo ?? box).focus({ preventScroll: true });
  if (primo instanceof HTMLInputElement || primo instanceof HTMLTextAreaElement) {
    primo.setSelectionRange(primo.value.length, primo.value.length);
  }
  APERTE.set(posto, () => chiudi(false));
  return () => chiudi(false);
}
