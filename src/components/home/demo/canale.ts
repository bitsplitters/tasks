/*
 * Il tab del canale della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §6, nel repo
 * team-tasks-manager): ciò che succede a ogni clic. Il selettore a riposo spunta il task scelto con la cascata dei
 * gruppi; l'Activity, il primo pulsante, porta la lista nell'altro tab; la seconda riga passa da grigio a blu a rosso.
 * Le azioni dei pulsanti arrivano coi compiti 9 e 10: fino ad allora un task scelto con un pulsante acceso lo spegne e
 * basta. Gli altri pulsanti mostrano il loro tooltip.
 */
import type { Tasto } from '../scene-data.ts';
import { apriSelettore, chatInBasso, menuSottoAperto, sceltaNelMenuSotto, tastoDelCanale } from '../scene-dom.ts';
import { dentro, dopoIlClic, type Acceso, type Condiviso } from './condiviso.ts';
import { invertiSpunta, nellActivity } from './regole.ts';

/** Il tab del canale montato: chiudi lo riporta com'è all'arrivo, coi menu chiusi e i pulsanti grigi. */
export interface Canale {
  chiudi(): void;
}

export function montaCanale(scena: HTMLElement, condiviso: Condiviso): Canale {
  const el = (chiave: string) => scena.querySelector<HTMLElement>(`[data-k="${chiave}"]`);
  const chan = el('chan')!;
  let acceso: Acceso | null = null;
  /** Le persone scelte nel menu sotto i pulsanti. */
  let scelte: string[] = [];

  /** Il pulsante della seconda riga spento: il menu sotto i pulsanti sparisce con le sue scelte. */
  function spegni(): void {
    acceso = null;
    scelte = [];
    tastoDelCanale(chan, null, null);
  }

  function chiudi(): void {
    apriSelettore(chan, false);
    spegni();
  }

  scena.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    const k = b.dataset.k ?? '';
    if (b.getAttribute('aria-disabled') === 'true') {
      // Spento dal bot: niente azione, come in Discord; il tooltip dice comunque cosa fa.
      if (b.dataset.tt) condiviso.tooltip(b);
    } else if (k === 'sel') {
      menuSottoAperto(chan, false);
      apriSelettore(chan, !chan.hasAttribute('data-menu'));
    } else if (b.matches('.sc-opt')) {
      apriSelettore(chan, false);
      if (acceso) spegni();
      else condiviso.cambia(invertiSpunta(condiviso.stato(), b.dataset.pos ?? ''));
      el('sel')?.focus();
    } else if (k === 'sub-sel') {
      apriSelettore(chan, false);
      menuSottoAperto(chan, !chan.hasAttribute('data-subopen'));
    } else if (b.matches('.sc-subopt')) {
      const p = b.dataset.persona ?? '';
      scelte = scelte.includes(p) ? scelte.filter((x) => x !== p) : [...scelte, p];
      sceltaNelMenuSotto(chan, scelte);
    } else if (b.dataset.tasto) {
      acceso = dopoIlClic(acceso, b.dataset.tasto as Tasto);
      scelte = [];
      tastoDelCanale(chan, acceso?.tasto ?? null, acceso?.colore ?? null);
    } else if (k === 'b-activity') {
      chiudi();
      condiviso.cambia(nellActivity(condiviso.stato()));
      condiviso.vaiA('activity');
    } else if (k === 'b-join') {
      condiviso.vaiA('activity');
    } else if (b.dataset.tt) {
      condiviso.tooltip(b);
    }
  });

  // Un clic fuori chiude i menu, come in Discord.
  document.addEventListener('click', (e) => {
    if (chan.hasAttribute('data-menu') && !dentro(e, '.sc-selwrap')) apriSelettore(chan, false);
    if (chan.hasAttribute('data-subopen') && !dentro(e, '.sc-submenu')) menuSottoAperto(chan, false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const qui = scena.contains(document.activeElement);
    if (chan.hasAttribute('data-menu')) {
      apriSelettore(chan, false);
      if (qui) el('sel')?.focus();
    }
    if (chan.hasAttribute('data-subopen')) {
      menuSottoAperto(chan, false);
      if (qui) el('sub-sel')?.focus();
    }
  });
  // La chat in fondo quando la scena cambia misura o torna visibile col suo tab.
  new ResizeObserver(() => chatInBasso(scena)).observe(scena);

  return { chiudi };
}
