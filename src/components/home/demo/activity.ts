/*
 * Il tab dell'Activity della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §7, nel repo
 * team-tasks-manager): ciò che succede a ogni clic nella pagina. La casella spunta il task con la cascata dei gruppi;
 * il testo di un task apre il suo pannello, dove i pulsanti passano da grigio a blu a rosso; Exit riporta la lista nel
 * canale. Le azioni del pannello e della prima riga arrivano coi compiti 11 e 12: fino ad allora l'area del pannello
 * resta vuota e Save spento. Gli altri pulsanti mostrano il loro tooltip.
 */
import type { Tasto } from '../scene-data.ts';
import {
  apriPannello, azzeraIlPannello, chatInBasso, posizionaPannello, scorrimentoPerIlPannello, tastoDelPannello,
} from '../scene-dom.ts';
import { dentro, dopoIlClic, type Acceso, type Condiviso } from './condiviso.ts';
import { invertiSpunta, nelCanale } from './regole.ts';

/** Il tab dell'Activity montato: chiudi lo riporta com'è all'arrivo, col pannello chiuso. */
export interface Activity {
  chiudi(): void;
}

export function montaActivity(scena: HTMLElement, condiviso: Condiviso): Activity {
  const el = (chiave: string) => scena.querySelector<HTMLElement>(`[data-k="${chiave}"]`);
  const win = el('win')!;
  const pagina = el('page')!;
  const menoMovimento = matchMedia('(prefers-reduced-motion: reduce)');
  /** Il pulsante acceso del pannello. */
  let acceso: Acceso | null = null;

  const posDi = (b: HTMLElement) => b.closest<HTMLElement>('[data-task]')?.dataset.task ?? '';

  /** La pagina scorre fin dove il pannello si vede tutto, come scrollIntoView({ block: 'nearest' }). */
  function pannelloInVista(): void {
    pagina.scrollTo({ top: scorrimentoPerIlPannello(win), behavior: menoMovimento.matches ? 'auto' : 'smooth' });
  }

  /** Il pannello chiuso; se lo chiude chi guarda, il focus torna sul testo del task. */
  function chiudiPannello(rendiIlFocus: boolean): void {
    const pos = win.dataset.panel;
    if (pos === undefined) return;
    acceso = null;
    apriPannello(win, null);
    if (rendiIlFocus) el(`a-txt-${pos}`)?.focus();
  }

  function chiudi(): void {
    chiudiPannello(false);
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
      acceso = null;
      apriPannello(win, win.dataset.panel === pos ? null : pos);
      if (win.dataset.panel !== undefined) pannelloInVista();
    } else if (b.dataset.ptasto) {
      acceso = dopoIlClic(acceso, b.dataset.ptasto as Tasto);
      azzeraIlPannello(win);
      tastoDelPannello(win, acceso?.tasto ?? null, acceso?.colore ?? null);
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

  // Un clic fuori dal pannello e dai testi dei task lo chiude, come nell'Activity.
  document.addEventListener('click', (e) => {
    if (win.dataset.panel !== undefined && !dentro(e, '.sc-panel, .sc-atext')) chiudiPannello(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') chiudiPannello(scena.contains(document.activeElement));
  });
  // Il canale sotto in fondo e il pannello sotto il suo task, quando la scena cambia misura o torna visibile.
  new ResizeObserver(() => {
    chatInBasso(scena);
    posizionaPannello(win);
  }).observe(scena);

  return { chiudi };
}
