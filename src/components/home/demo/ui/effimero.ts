/*
 * Il messaggio effimero sotto la lista (piano 2026-11-15-demo-fedele, §5; spec §3.5 e §9.2; nel repo
 * team-tasks-manager): da TTM, visto solo da chi ha agito, col piede di Discord «Only you can see this • Dismiss
 * message». Ce n'è uno alla volta: il nuovo prende il posto del vecchio, Dismiss lo toglie. I pulsanti del contenuto
 * (`e-<id>`) li ascolta chi lo mostra.
 */
import { DISCORD } from '../../scene-data.ts';
import { ADESSO, dataDelCanale } from '../modello.ts';
import { OCCHIO } from './comune.ts';

/** Il messaggio in HTML: l'intestazione del bot con l'ora, il contenuto com'è, il piede di Discord. */
export function htmlDellEffimero(html: string): string {
  return '<div class="sc-msg ui-eff"><img class="sc-avatar" src="/icons/ttm-avatar.png" alt="">' +
    '<p class="sc-mhead"><span class="sc-name">Team Tasks Manager</span><span class="sc-app">APP</span>' +
    `<span class="sc-time">${dataDelCanale(ADESSO, 't')}</span></p><div class="ui-effcorpo">${html}</div>` +
    `<p class="ui-effpiede">${OCCHIO}<span>${DISCORD.soloTu}</span><span aria-hidden="true">•</span>` +
    `<button type="button" class="ui-effvia" data-k="eph-dismiss">${DISCORD.dismiss}</button></p></div>`;
}

/** Mostra il messaggio in `dove` (il posto `eph` sotto la lista), al posto di quello che c'era. */
export function mostraEffimero(dove: HTMLElement, html: string, alla: { dismiss?(): void } = {}): void {
  dove.innerHTML = htmlDellEffimero(html);
  dove.hidden = false;
  dove.querySelector('[data-k="eph-dismiss"]')?.addEventListener('click', () => {
    togliEffimero(dove);
    alla.dismiss?.();
  });
}

/** Toglie il messaggio, coi suoi ascoltatori: stavano sui pulsanti che se ne vanno con lui. */
export function togliEffimero(dove: HTMLElement): void {
  dove.hidden = true;
  dove.replaceChildren();
}
