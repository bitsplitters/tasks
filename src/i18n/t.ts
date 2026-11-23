/*
 * I testi delle pagine (spec 2026-11-19-sito-multilingua-design.md, §4.4, nel repo team-tasks-manager). I testi dei
 * componenti stanno in moduli divisi per zona, `src/i18n/testi/<lingua>/<zona>.ts`, uno per lingua con le stesse
 * chiavi; una chiave si scrive `zona.voce` (`comune.nav.docs`).
 *
 * - Una chiave che manca lancia: la build si ferma invece di pubblicare un buco.
 * - I segnaposto si scrivono `{nome}`; un valore che manca lancia anche lui.
 * - Un plurale è un oggetto di forme (`one`, `other`…), scelte con `Intl.PluralRules` della lingua dal valore `n`.
 * - Un testo con del markup (un link, un grassetto) si rende con `set:html`: è contenuto nostro, non di chi visita.
 */
import { datiDi } from './lingue.ts';
import type { Lingua } from './lingue.ts';
import { ZONE as EN } from './testi/en/index.ts';
import { ZONE as IT } from './testi/it/index.ts';

export type Forme = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
export type Valore = string | Forme;
export type Modulo = Readonly<Record<string, Valore>>;
export type Valori = Readonly<Record<string, string | number>>;

/** I testi di ogni lingua che ne ha: le lingue senza moduli non hanno pagine (lingue.ts). */
export const TESTI: Readonly<Partial<Record<Lingua, Readonly<Record<string, Modulo>>>>> = { en: EN, it: IT };

/** La forma di un plurale per il numero `n`, con le regole della lingua; `other` se la forma non c'è. */
export function forma(lingua: Lingua, forme: Forme, n: number): string {
  const regola = new Intl.PluralRules(datiDi(lingua).intl).select(n);
  return forme[regola] ?? forme.other;
}

export function t(lingua: Lingua, chiave: string, valori: Valori = {}): string {
  const punto = chiave.indexOf('.');
  const valore = TESTI[lingua]?.[chiave.slice(0, punto)]?.[chiave.slice(punto + 1)];
  if (valore === undefined) throw new Error(`Testo mancante: «${chiave}» in ${lingua}`);
  let testo: string;
  if (typeof valore === 'string') testo = valore;
  else {
    if (typeof valori.n !== 'number') throw new Error(`Il plurale «${chiave}» vuole il numero n`);
    testo = forma(lingua, valore, valori.n);
  }
  return testo.replace(/\{(\w+)\}/g, (_, nome: string) => {
    if (!Object.hasOwn(valori, nome)) throw new Error(`Il testo «${chiave}» in ${lingua} vuole il valore {${nome}}`);
    return String(valori[nome]);
  });
}

/** Le chiavi di una zona con la lingua già scelta: `const tt = traduttore(lingua, 'home'); tt('hero.title')`. */
export function traduttore(lingua: Lingua, zona: string) {
  return (voce: string, valori?: Valori) => t(lingua, `${zona}.${voce}`, valori);
}
