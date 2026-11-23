/*
 * Gli indirizzi per lingua (spec 2026-11-19-sito-multilingua-design.md, §2 e §4.5, nel repo team-tasks-manager): dopo
 * il prefisso il percorso è quello inglese, slug e ancore compresi. I componenti scrivono i link con `percorso`; il
 * selettore e il piè di pagina passano da una lingua all'altra con `equivalente`. Il lavoro vero lo fa rinvio.mjs, lo
 * stesso codice dello script del rinvio.
 */
import { LINGUE } from './lingue.ts';
import type { Lingua } from './lingue.ts';
import { equivalente as equivalenteCon, linguaDelPercorso } from './rinvio.mjs';

export const PREFISSI: Readonly<Record<Lingua, string>> = Object.fromEntries(
  LINGUE.map((l) => [l.codice, l.prefisso]),
) as Record<Lingua, string>;

/** Un percorso inglese del sito (`/premium/`, `/docs/reminders/#x`) nella lingua data. */
export function percorso(lingua: Lingua, inglese: string): string {
  return equivalenteCon(inglese, lingua, PREFISSI);
}

/** La lingua di un percorso del sito, dal suo prefisso. */
export function linguaDi(pathname: string): Lingua {
  return linguaDelPercorso(pathname, PREFISSI) as Lingua;
}

/** Lo stesso percorso in un'altra lingua. */
export function equivalente(pathname: string, lingua: Lingua): string {
  return equivalenteCon(pathname, lingua, PREFISSI);
}
