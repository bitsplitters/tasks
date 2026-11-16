/*
 * I campi del promemoria nel DOM, come WhenFields e ZoneView di ReminderFields.tsx nella pagina dell'Activity: data,
 * ora e il fuso, che apre la sua vista al posto dei campi; sotto, in un fuso che non è quello del dispositivo, l'ora
 * che il dispositivo mostrerà. Li usano il pannello del task e New date di Reopen all (piano 2026-11-15-demo-fedele,
 * compito 12, nel repo team-tasks-manager).
 */
import { escape } from '../markdown.ts';
import { ADESSO } from '../modello.ts';
import { dispositivoDi } from '../quando.ts';
import type { Quando } from '../quando.ts';
import { testo } from '../testi.ts';
import { zona } from '../zone.ts';
import { nuovoNumero } from './comune.ts';
import { montaFusi } from './fusi.ts';

/**
 * I campi in `dove`, al posto di ciò che conteneva, coi data-k che cominciano con `prefisso` (p nel pannello, r in
 * Reopen all). `scelta` è il fuso che chi guarda ha scelto prima, per «Your time zones». `cambio` arriva a ogni campo
 * scritto e al ritorno dalla vista dei fusi; `fusi` quando la vista si apre, perché chi monta tolga i suoi avvisi.
 */
export function montaQuando(dove: HTMLElement, iniziale: Quando, prefisso: string, scelta: string | undefined,
  alla: { cambio(q: Quando): void; fusi(): void }): { smonta(): void } {
  let q = iniziale;
  let vista: { smonta(): void } | null = null;
  const k = (nome: string) => `${prefisso}-${nome}`;

  const campo = (tipo: 'date' | 'time', etichetta: string, valore: string) => {
    const id = `${k(tipo)}-${nuovoNumero()}`;
    return `<div class="sc-field"><label class="sc-flabel" for="${id}">${escape(testo(etichetta))}</label>` +
      `<input class="sc-pin" type="${tipo}" id="${id}" data-k="${k(tipo)}" value="${escape(valore)}" required></div>`;
  };

  /** L'ora del dispositivo sotto i campi, o niente nel fuso del dispositivo. */
  function riga(): void {
    const r = dove.querySelector<HTMLElement>(`[data-k="${k('device')}"]`);
    if (!r) return;
    const t = dispositivoDi(q);
    r.hidden = t === null;
    r.textContent = t ?? '';
  }

  function campi(): void {
    const z = zona(q.zona, ADESSO);
    const id = `${k('zone')}-${nuovoNumero()}`;
    const paese = z.paese ? `<span class="sc-zcountry">${escape(z.paese)}</span>` : '';
    dove.innerHTML = '<div class="sc-when"><div class="sc-whenrow">' +
      campo('date', 'activity.reminder.date', q.data) + campo('time', 'activity.reminder.time', q.ora) + '</div>' +
      `<div class="sc-field"><label class="sc-flabel" for="${id}">${escape(testo('activity.reminder.zone'))}</label>` +
      `<button type="button" class="sc-pin sc-zfield" id="${id}" data-k="${k('zone')}">` +
      '<img src="/icons/timeZone.png" alt="" draggable="false">' +
      `<span class="sc-zplace"><span class="sc-zcity">${escape(z.citta)}</span>${paese}</span>` +
      `<span class="sc-zoff">${escape(z.scarto)}</span></button></div>` +
      `<div class="sc-fdesc" data-k="${k('device')}" hidden></div></div>`;
    riga();
  }

  function tornaAiCampi(): void {
    vista?.smonta();
    vista = null;
    campi();
    alla.cambio(q);
  }

  function apriIFusi(): void {
    alla.fusi();
    vista = montaFusi(dove, q.zona, scelta, ADESSO, {
      scelta: (z) => {
        q = { ...q, zona: z, toccata: true };
        tornaAiCampi();
      },
      indietro: tornaAiCampi,
    });
  }

  const alCampo = (e: Event) => {
    const t = e.target as HTMLInputElement;
    if (t.dataset.k === k('date')) q = { ...q, data: t.value };
    else if (t.dataset.k === k('time')) q = { ...q, ora: t.value };
    else return;
    riga();
    alla.cambio(q);
  };
  const alClic = (e: MouseEvent) => {
    if (!vista && (e.target as Element).closest(`[data-k="${k('zone')}"]`)) apriIFusi();
  };
  dove.addEventListener('input', alCampo);
  dove.addEventListener('click', alClic);
  campi();
  return {
    smonta() {
      vista?.smonta();
      dove.removeEventListener('input', alCampo);
      dove.removeEventListener('click', alClic);
    },
  };
}
