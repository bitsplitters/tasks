/*
 * Il bundle del bot letto come lo legge lui (spec 2026-11-19-sito-multilingua-design.md, §10, nel repo
 * team-tasks-manager): java.util.Properties per le coppie, PropertyResolver del framework per i riferimenti ${…}. Lo
 * usano il generatore dei testi della demo (scripts/testi-demo.mjs) e il test che li confronta col bundle
 * (scripts/demo-testi.test.ts).
 *
 * Il bundle sta nel repo team-tasks-manager accanto a tasks. Da un worktree che non l'ha accanto si indica la cartella
 * delle risorse con la variabile TTM_RISORSE (`.../team-tasks-manager/src/main/resources`).
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/** La cartella delle risorse del bot: TTM_RISORSE, o quella del repo accanto a tasks. */
export const RISORSE = process.env.TTM_RISORSE
  ? path.resolve(process.env.TTM_RISORSE)
  : fileURLToPath(new URL('../../team-tasks-manager/src/main/resources/', import.meta.url));

/** Il file del bundle di una lingua, dal suffisso di lingue.ts (`''`, `'_it'`). */
export const fileDelBundle = (suffisso) => path.join(RISORSE, `slash-resource${suffisso}.properties`);

const ESCAPE = { t: '\t', n: '\n', r: '\r', f: '\f' };

/**
 * Le coppie di un file .properties come le legge java.util.Properties: una riga che comincia con «#» o «!» è un
 * commento; la chiave finisce al primo «=», «:» o spazio senza «\» davanti; gli spazi attorno al separatore non
 * contano; una riga che finisce con un numero dispari di «\» continua sulla seguente, senza gli spazi iniziali di
 * quella (e lì un «#» non apre un commento); «\n», «\t», «\uXXXX» sono escape, una «\» davanti a un altro carattere
 * lo lascia com'è.
 *
 * @param {string} sorgente
 * @returns {Map<string, string>}
 */
export function leggiProperties(sorgente) {
  const sciogli = (s) => s.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (_, e) =>
    e.length === 5 ? String.fromCharCode(parseInt(e.slice(1), 16)) : (ESCAPE[e] ?? e));
  const senzaSpazi = (s) => s.replace(/^[ \t\f]+/, '');
  const righe = sorgente.split(/\r\n|\r|\n/);
  const coppie = new Map();
  for (let i = 0; i < righe.length; i++) {
    let riga = senzaSpazi(righe[i]);
    if (riga === '' || riga[0] === '#' || riga[0] === '!') continue;
    while ((riga.length - riga.replace(/\\+$/, '').length) % 2 === 1) {
      riga = riga.slice(0, -1) + senzaSpazi(righe[++i] ?? '');
    }
    let fine = 0;
    while (fine < riga.length && !'=: \t\f'.includes(riga[fine])) fine += riga[fine] === '\\' ? 2 : 1;
    let valore = senzaSpazi(riga.slice(fine));
    if (valore[0] === '=' || valore[0] === ':') valore = senzaSpazi(valore.slice(1));
    coppie.set(sciogli(riga.slice(0, fine)), sciogli(valore));
  }
  return coppie;
}

/**
 * Il valore con i riferimenti ${chiave} risolti dal bundle stesso, come PropertyResolver del framework: un riferimento
 * a una chiave che non c'è, o che chiuderebbe un giro, resta com'è.
 *
 * @param {Map<string, string>} bundle
 * @param {string} chiave
 * @returns {string}
 */
export function risolvi(bundle, chiave, inCorso = new Set()) {
  inCorso.add(chiave);
  const risolto = (bundle.get(chiave) ?? '').replace(/\$\{(.+?)\}/g, (tutto, riferita) =>
    bundle.has(riferita) && !inCorso.has(riferita) ? risolvi(bundle, riferita, inCorso) : tutto);
  inCorso.delete(chiave);
  return risolto;
}
