/*
 * La vista dei fusi nel pannello dell'Activity della demo (piano 2026-11-15-demo-fedele, compito 11, nel repo
 * team-tasks-manager), come ZonePicker.tsx e ZoneView della pagina: «‹ Time zone» al posto dei campi del promemoria,
 * la ricerca, sotto, senza testo, «Your time zones» coi motivi; con un testo, le zone trovate. Esc svuota la ricerca,
 * poi torna ai campi; col mouse la ricerca prende il focus, sul telefono la tastiera aspetta un tocco.
 */
import { escape } from '../markdown.ts';
import { testo } from '../testi.ts';
import { cercaZone, stessaZona, tueZone } from '../zone.ts';
import type { Motivo, Zona } from '../zone.ts';

/** Il data-k di una zona: il nome IANA in minuscolo, con - al posto di / e _ («z-europe-rome»). */
export function chiaveDellaZona(id: string): string {
  return `z-${id.toLowerCase().replace(/[/_]/g, '-')}`;
}

function riga(z: Zona, motivi: readonly Motivo[], attuale: string): string {
  const segnata = stessaZona(z.id, attuale) ? ' aria-current="true"' : '';
  const paese = z.paese ? `<span class="sc-zrcountry">${escape(z.paese)}</span>` : '';
  const perche = motivi.length
    ? `<span class="sc-zrreasons">${motivi.map((m) => escape(testo(`activity.zone.reason.${m}`))).join(' · ')}</span>`
    : '';
  return `<li><button type="button" class="sc-zrow" data-k="${chiaveDellaZona(z.id)}" data-zona="${escape(z.id)}"` +
    `${segnata}><span class="sc-zrplace"><span class="sc-zrcity">${escape(z.citta)}</span>${paese}${perche}</span>` +
    `<span class="sc-zrtime"><span class="sc-zrnow">${escape(z.ora)}</span>` +
    `<span class="sc-zroffset">${escape(z.scarto)}</span></span></button></li>`;
}

/**
 * Sotto la ricerca: senza testo le zone di chi guarda, coi motivi; con un testo quelle trovate, senza. `attuale` è la
 * zona del campo, segnata.
 */
export function htmlDelleZone(scritto: string, attuale: string, adesso: number): string {
  const q = scritto.trim();
  const righe = q ? cercaZone(q, adesso).map((zona) => ({ zona, motivi: [] as Motivo[] })) : tueZone(adesso);
  let nota = '';
  if (!q) nota = `<div class="sc-pnote">${escape(testo('activity.zone.yours'))}</div>`;
  else if (righe.length === 0) nota = `<div class="sc-pnote">${escape(testo('activity.zone.none', q))}</div>`;
  return `${nota}<ul class="sc-zlist">${righe.map((r) => riga(r.zona, r.motivi, attuale)).join('')}</ul>`;
}

/**
 * La vista nel DOM, al posto di ciò che `dove` conteneva. La scelta di una zona e il ritorno li decide chi la monta;
 * nessuno dei due rende il focus, come nella pagina.
 */
export function montaFusi(dove: HTMLElement, attuale: string, adesso: number,
  alla: { scelta(zona: string): void; indietro(): void }): { smonta(): void } {
  const cerca = escape(testo('activity.zone.search'));
  dove.innerHTML = '<div class="sc-zview"><div class="sc-zones"><div class="sc-zhead">' +
    `<button type="button" class="sc-zback" data-k="z-back" aria-label="${escape(testo('activity.zone.back'))}">` +
    '<img src="/icons/prev.png" alt="" draggable="false"></button>' +
    `<span class="sc-ztitle">${escape(testo('activity.zone.title'))}</span></div>` +
    `<input class="sc-pin" type="search" data-k="z-search" placeholder="${cerca}" aria-label="${cerca}" ` +
    'autocomplete="off"><div class="sc-pparte" data-k="z-list"></div></div></div>';
  const vista = dove.querySelector<HTMLElement>('.sc-zview')!;
  const campo = dove.querySelector<HTMLInputElement>('[data-k="z-search"]')!;
  const elenco = dove.querySelector<HTMLElement>('[data-k="z-list"]')!;
  const disegna = () => {
    elenco.innerHTML = htmlDelleZone(campo.value, attuale, adesso);
  };
  const alClic = (e: MouseEvent) => {
    const t = e.target as Element;
    const zona = t.closest<HTMLElement>('.sc-zrow')?.dataset.zona;
    if (zona) alla.scelta(zona);
    else if (t.closest('[data-k="z-back"]')) alla.indietro();
  };
  const alTasto = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    e.stopPropagation();
    if (e.target === campo && campo.value.trim() !== '') {
      campo.value = '';
      disegna();
    } else alla.indietro();
  };
  vista.addEventListener('click', alClic);
  vista.addEventListener('keydown', alTasto);
  campo.addEventListener('input', disegna);
  disegna();
  if (window.matchMedia('(pointer: fine)').matches) campo.focus();
  return {
    smonta() {
      vista.removeEventListener('click', alClic);
      vista.removeEventListener('keydown', alTasto);
      campo.removeEventListener('input', disegna);
    },
  };
}
