/*
 * I testi del bot nella demo della home, per lingua (spec 2026-11-19-sito-multilingua-design.md, §10, nel repo
 * team-tasks-manager): per ogni lingua tradotta e pubblicata scrive src/components/home/demo/testi/<prefisso>.ts con le
 * chiavi della tabella inglese (demo/testi/en.ts) e i valori del bundle del bot in quella lingua, coi riferimenti ${…}
 * risolti. Non si correggono a mano: si rigenerano.
 *
 *   npm run testi-demo                        (il bundle del repo accanto)
 *   TTM_RISORSE=<…/src/main/resources> npm run testi-demo
 *
 * Una chiave che il bundle della lingua non ha ferma tutto: la demo mostrerebbe un buco.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { TRADOTTE } from '../src/i18n/lingue.ts';
import { TESTI } from '../src/components/home/demo/testi/en.ts';
import { fileDelBundle, leggiProperties, risolvi } from './properties.mjs';

const CARTELLA = new URL('../src/components/home/demo/testi/', import.meta.url);

/** Un valore come letterale TypeScript fra apici singoli, con gli escape che servono. */
const letterale = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n')}'`;

mkdirSync(CARTELLA, { recursive: true });
for (const lingua of TRADOTTE) {
  const file = fileDelBundle(lingua.bundle);
  if (!existsSync(file)) throw new Error(`Manca il bundle ${file}: TTM_RISORSE indica la cartella delle risorse`);
  const bundle = leggiProperties(readFileSync(file, 'utf8'));
  const righe = [];
  for (const chiave of Object.keys(TESTI)) {
    if (!bundle.has(chiave)) throw new Error(`${chiave}: non è nel bundle ${file}`);
    const valore = risolvi(bundle, chiave);
    if (valore.includes('${')) throw new Error(`${chiave}: un riferimento che non si risolve in ${file}`);
    righe.push(`  ${letterale(chiave)}: ${letterale(valore)},`);
  }
  const sorgente = [
    `// I testi del bot nella demo, lingua ${lingua.codice}: generati da scripts/testi-demo.mjs dal bundle`,
    `// slash-resource${lingua.bundle}.properties. Non si correggono a mano: npm run testi-demo.`,
    'export const TESTI: Readonly<Record<string, string>> = Object.freeze({',
    ...righe,
    '});',
    '',
  ].join('\n');
  writeFileSync(new URL(`${lingua.prefisso}.ts`, CARTELLA), sorgente);
  console.log(`${lingua.prefisso}.ts: ${righe.length} testi`);
}
