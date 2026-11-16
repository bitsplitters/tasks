/*
 * Il dialogo della pagina dell'Activity (piano 2026-11-15-demo-fedele, §5; spec §3.5 e §8.2; nel repo
 * team-tasks-manager), com'è il Dialog di activity/src (Dialog.tsx e Dialog.css): il titolo con la ✕, il corpo, i
 * pulsanti in fondo, sul velo che copre la pagina sotto la barra della finestra. Esc, la ✕ e un clic sul velo lo
 * chiudono; che cosa fanno i pulsanti lo decide chi lo apre.
 */
import { escape } from '../markdown.ts';
import { testo } from '../testi.ts';
import { giraIlTab, nuovoNumero, rendiIlFocus } from './comune.ts';

export interface Pulsante {
  id: string;
  testo: string;
  stile: 'blu' | 'rosso' | 'grigio';
  spento?: boolean;
}

/** Le classi di Button.css: nel Dialog il grigio è quello rialzato. */
const STILE = { blu: 'sc-blue', rosso: 'sc-red', grigio: 'sc-raised' } as const;

/** Il dialogo in HTML col contratto del §5: `d-x` la ✕, `d-<id>` i pulsanti. Il corpo è già HTML. */
export function htmlDelDialogo(titolo: string, corpo: string, pulsanti: readonly Pulsante[], n: number): string {
  const id = `ui-dt-${n}`;
  const tasti = pulsanti.map((p) => `<button type="button" class="sc-abtn ${STILE[p.stile]}" data-k="d-${p.id}"` +
    `${p.spento ? ' disabled' : ''}>${escape(p.testo)}</button>`).join('');
  return `<div class="ui-dlg" role="dialog" aria-modal="true" aria-labelledby="${id}" tabindex="-1">` +
    `<div class="ui-dlghd"><p class="ui-dlgtit" id="${id}">${escape(titolo)}</p><button type="button" ` +
    `class="ui-dlgx" data-k="d-x" aria-label="${escape(testo('activity.dialog.close'))}">&times;</button></div>` +
    `<div class="ui-dlgcorpo">${corpo}</div>${tasti ? `<div class="ui-dlgpiede">${tasti}</div>` : ''}</div>`;
}

/** Il velo di ogni contenitore, col dialogo aperto: aprirne un altro (la pagina dopo della guida) chiude il primo. */
const APERTI = new WeakMap<HTMLElement, () => void>();

/**
 * Apre il dialogo in `dove` (il posto `dlg` della finestra). Il focus va al dialogo; Tab gira dentro; alla chiusura il
 * focus torna ad `apritore`. Un pulsante acceso chiama `clic` col suo id senza chiudere il dialogo: lo chiude chi lo
 * ha aperto, con la funzione che riceve. Esc, la ✕ e un clic sul velo chiudono e chiamano `chiusura`.
 */
export function apriDialogo(dove: HTMLElement, titolo: string, corpo: string, pulsanti: readonly Pulsante[],
  apritore: HTMLElement, alla: { clic(id: string): void; chiusura?(): void }): () => void {
  APERTI.get(dove)?.();
  dove.innerHTML = htmlDelDialogo(titolo, corpo, pulsanti, nuovoNumero());
  dove.hidden = false;
  const box = dove.querySelector<HTMLElement>('.ui-dlg');
  if (!box) throw new Error('apriDialogo: il dialogo non si è disegnato');
  const ac = new AbortController();
  const { signal } = ac;
  let chiuso = false;
  const chiudi = (avvisa: boolean) => {
    if (chiuso) return;
    chiuso = true;
    ac.abort();
    APERTI.delete(dove);
    dove.hidden = true;
    dove.replaceChildren();
    rendiIlFocus(apritore);
    if (avvisa) alla.chiusura?.();
  };

  dove.addEventListener('pointerdown', (e) => {
    if (e.target === dove) chiudi(true);
  }, { signal });
  dove.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      chiudi(true);
    } else {
      giraIlTab(box, e);
    }
  }, { signal });
  box.addEventListener('click', (e) => {
    const tasto = (e.target as Element).closest<HTMLButtonElement>('button[data-k^="d-"]');
    const k = tasto && !tasto.disabled ? tasto.dataset.k : undefined;
    if (k === 'd-x') chiudi(true);
    else if (k) alla.clic(k.slice(2));
  }, { signal });

  box.focus({ preventScroll: true });
  APERTI.set(dove, () => chiudi(false));
  return () => chiudi(false);
}
