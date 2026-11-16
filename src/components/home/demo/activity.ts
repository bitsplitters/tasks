/*
 * Il tab dell'Activity della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §7, nel repo
 * team-tasks-manager): ciò che succede a ogni clic nella pagina. La casella spunta il task con la cascata dei gruppi;
 * il testo di un task apre il suo pannello, dove i pulsanti passano da grigio a blu a rosso e l'area mostra l'azione
 * del pulsante acceso (demo/pannello.ts). Save e Delete la mandano al bot, che risponde dopo un attimo: il pannello
 * torna ai pulsanti grigi. Exit riporta la lista nel canale. La prima riga arriva col compito 12: fino ad allora i suoi
 * pulsanti, come gli altri, mostrano il loro tooltip.
 */
import type { Tasto } from '../scene-data.ts';
import {
  apriPannello, azzeraIlPannello, chatInBasso, eliminaAttivo, posizionaPannello, salva, scorrimentoPerIlPannello,
  tastoDelPannello,
} from '../scene-dom.ts';
import { dentro, dopoIlClic, type Acceso, type Condiviso } from './condiviso.ts';
import { markdown } from './markdown.ts';
import { montaAzione, type Azione } from './pannello.ts';
import { invertiSpunta, nelCanale } from './regole.ts';
import { contestoDellActivity } from './righe.ts';
import { rispostaDellEsito } from './testi.ts';

/** Quanto il bot ci mette a rispondere a Save o Delete: intanto i tre puntini al posto della scritta (Button). */
const ATTESA_MS = 400;

/** Il tab dell'Activity montato: chiudi lo riporta com'è all'arrivo, col pannello chiuso. */
export interface Activity {
  chiudi(): void;
}

export function montaActivity(scena: HTMLElement, condiviso: Condiviso): Activity {
  const el = (chiave: string) => scena.querySelector<HTMLElement>(`[data-k="${chiave}"]`);
  const win = el('win')!;
  const pagina = el('page')!;
  const menoMovimento = matchMedia('(prefers-reduced-motion: reduce)');
  /** Il pulsante acceso del pannello e la sua azione nell'area. */
  let acceso: Acceso | null = null;
  let azione: Azione | null = null;
  /** Il salvataggio in viaggio: l'azione che l'ha mandato e la risposta, che chi lascia il tab fa arrivare subito. */
  let attesa: { azione: Azione; timer: number; risposta: () => void } | null = null;

  const posDi = (b: HTMLElement) => b.closest<HTMLElement>('[data-task]')?.dataset.task ?? '';

  /** La pagina scorre fin dove il pannello si vede tutto, come scrollIntoView({ block: 'nearest' }). */
  function pannelloInVista(): void {
    pagina.scrollTo({ top: scorrimentoPerIlPannello(win), behavior: menoMovimento.matches ? 'auto' : 'smooth' });
  }

  /** Save o Delete in fondo, accesi se l'azione si può mandare; quella in viaggio tiene i suoi puntini. */
  function piede(): void {
    if (!azione || attesa?.azione === azione) return;
    if (acceso?.colore === 'red') eliminaAttivo(win, azione.pronto());
    else salva(win, azione.pronto() ? 'on' : 'off');
  }

  /** L'azione tolta dall'area, col suo pulsante. */
  function via(): void {
    azione?.smonta();
    azione = null;
    acceso = null;
  }

  /** Il pannello aperto da capo sul task pos, o chiuso (null). */
  function pannello(pos: string | null): void {
    via();
    apriPannello(win, pos);
  }

  /** Il pannello chiuso; se lo chiude chi guarda, il focus torna sul testo del task. */
  function chiudiPannello(rendiIlFocus: boolean): void {
    const pos = win.dataset.panel;
    if (pos === undefined) return;
    pannello(null);
    if (rendiIlFocus) el(`a-txt-${pos}`)?.focus();
  }

  /**
   * Il tab lasciato o Start over: il pannello chiuso. Un salvataggio in viaggio arriva subito, prima che la lista
   * cambi sotto: il bot l'aveva già ricevuto.
   */
  function chiudi(): void {
    if (attesa) {
      window.clearTimeout(attesa.timer);
      attesa.risposta();
    }
    chiudiPannello(false);
  }

  /** Un pulsante del pannello premuto: il colore dopo e, acceso, la sua azione nell'area (TaskPanel, press). */
  function premi(tasto: Tasto): void {
    const dopo = dopoIlClic(acceso, tasto);
    via();
    azzeraIlPannello(win);
    acceso = dopo;
    tastoDelPannello(win, dopo?.tasto ?? null, dopo?.colore ?? null);
    const pos = win.dataset.panel;
    const area = el('p-form');
    if (!dopo || pos === undefined || !area) return;
    azione = montaAzione(area, condiviso.stato(), pos, dopo, piede);
    piede();
  }

  /** Il pulsante in fondo che si vede, Save o Delete: il fumetto della risposta parte da lì (anchor del Footer). */
  const inFondo = () => el(win.dataset.delete === undefined ? 'p-save' : 'p-delete') ?? undefined;

  /** Save o Delete premuto: i puntini, poi la risposta del bot sulla lista di quel momento (usePanelSave). */
  function manda(): void {
    const a = azione;
    const pos = win.dataset.panel;
    if (!a || pos === undefined || attesa || !a.pronto()) return;
    const risposta = () => rispondi(a, pos);
    attesa = { azione: a, timer: window.setTimeout(risposta, ATTESA_MS), risposta };
    salva(win, 'pending');
  }

  /**
   * La risposta del bot. La lista cambia anche se intanto il pannello si è chiuso o è passato a un'altra azione, che
   * resta com'è (TaskPanel, onDone); la stessa azione torna ai pulsanti grigi; se il task non c'è più il pannello si
   * chiude. Un rifiuto, come l'avviso di una riuscita, va nel fumetto sul pulsante in fondo.
   */
  function rispondi(a: Azione, pos: string): void {
    attesa = null;
    const esito = a.esito(condiviso.stato());
    const qui = azione === a;
    if (esito.tipo === 'fatto') {
      condiviso.cambia(esito.stato);
      if (a.chiude && win.dataset.panel === pos) chiudiPannello(false);
      else if (qui) {
        via();
        azzeraIlPannello(win);
      }
    } else if (qui) {
      piede();
    }
    const md = rispostaDellEsito(esito);
    if (!md || win.dataset.panel !== pos) return;
    condiviso.fumetto(markdown(md, contestoDellActivity(condiviso.stato())), inFondo());
  }

  scena.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    const k = b.dataset.k ?? '';
    if (b.matches('.sc-acb')) {
      condiviso.cambia(invertiSpunta(condiviso.stato(), posDi(b)));
    } else if (b.matches('.sc-atext')) {
      // Un link nel testo del task si apre, senza il pannello.
      if ((e.target as Element).closest('a')) return;
      const pos = posDi(b);
      pannello(win.dataset.panel === pos ? null : pos);
      if (win.dataset.panel !== undefined) pannelloInVista();
    } else if (b.dataset.ptasto) {
      premi(b.dataset.ptasto as Tasto);
    } else if (k === 'p-save' || k === 'p-delete') {
      manda();
    } else if (k === 'p-close' || k === 'p-x') {
      chiudiPannello(true);
    } else if (k === 'a-exit') {
      chiudi();
      condiviso.cambia(nelCanale(condiviso.stato()));
      condiviso.vaiA('channel');
    } else if (b.dataset.tt) {
      // Fuori dal pannello il clic lo chiude: prima del tooltip, che così si mette dove il pulsante resta quando la
      // pagina, più corta, risale.
      if (!b.closest('.sc-panel')) chiudiPannello(false);
      condiviso.tooltip(b);
    }
  });

  // Un clic fuori dal pannello lo chiude, ma non sul fumetto, sul dialogo, sulle righe del suo task né sul testo di un
  // altro, che apre il suo (TaskPanel, useClosing).
  document.addEventListener('click', (e) => {
    const pos = win.dataset.panel;
    if (pos === undefined) return;
    const restaAperto = `.sc-panel, .sc-atext, .dm-bubble, .sc-dlg, .sc-arow[data-task="${pos}"]`;
    if (!dentro(e, restaAperto)) chiudiPannello(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') chiudiPannello(scena.contains(document.activeElement));
  });
  // Il canale sotto in fondo e il pannello sotto il suo task, quando la scena cambia misura o torna visibile.
  new ResizeObserver(() => {
    chatInBasso(scena);
    posizionaPannello(win);
  }).observe(scena);
  // La colonna alta quanto serve quando il pannello cresce, con gli avvisi sopra il modulo.
  new ResizeObserver(() => posizionaPannello(win)).observe(el('panel')!);

  return { chiudi };
}
