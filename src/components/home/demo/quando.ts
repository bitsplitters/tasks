/*
 * Data, ora e fuso come li scrivono i campi del promemoria (When di ReminderFields.tsx nella pagina dell'Activity), che
 * il pannello del task e New date di Reopen all usano insieme (piano 2026-11-15-demo-fedele, compito 12, nel repo
 * team-tasks-manager). Qui le funzioni pure; i campi nel DOM li monta ui/quando.ts.
 */
import { campiDi, daiCampi } from './modello.ts';
import { avviso, testo } from './testi.ts';
import { DISPOSITIVO, stessaZona, sulDispositivo } from './zone.ts';

/** Data e ora come le scrivono i campi, nel fuso in cui sono scelte; toccata se il fuso l'ha cambiato chi guarda. */
export interface Quando {
  data: string;
  ora: string;
  zona: string;
  toccata: boolean;
}

const due = (n: number) => String(n).padStart(2, '0');

/** L'istante `at` come lo scrivono i campi nel fuso `zona`, che chi guarda non ha ancora toccato (whenOf). */
export function quandoDa(at: number, zona: string): Quando {
  const c = campiDi(at, zona);
  return { data: `${c.anno}-${due(c.mese)}-${due(c.giorno)}`, ora: c.ora, zona, toccata: false };
}

/** L'istante dei campi, o null finché uno dei due è vuoto (atOf). */
export function istanteDi(q: Quando): number | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(q.data) || !/^\d{2}:\d{2}$/.test(q.ora)) return null;
  const [anno, mese, giorno] = q.data.split('-').map(Number);
  return daiCampi(giorno, mese, anno, q.ora, q.zona);
}

/** Una data a meno di 5 minuti da adesso: il testo del canale senza il «- » del suo elenco di errori (tooSoon). */
export function troppoVicina(): string {
  return avviso(testo('tasklist.modal.alert.date.minutes.error').replace(/^- /, ''));
}

/** Sotto i campi, in un fuso che non è quello del dispositivo: l'ora che il dispositivo mostrerà (WhenFields). */
export function dispositivoDi(q: Quando): string | null {
  const at = istanteDi(q);
  return at !== null && !stessaZona(q.zona, DISPOSITIVO) ? testo('activity.reminder.device', sulDispositivo(at)) : null;
}
