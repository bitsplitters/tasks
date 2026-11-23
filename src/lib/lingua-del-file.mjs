// La lingua di un file Markdown, dalla sua cartella (spec 2026-11-19-sito-multilingua-design.md, §4.5 e §8, nel repo
// team-tasks-manager): le traduzioni stanno in src/content/traduzioni/<prefisso>/ (documentazione) e in
// src/content/traduzioni-casi/<prefisso>/ (casi d'uso). Ogni altro file è inglese. La usano i plugin rehype della
// lingua, delle ancore, delle note di rilascio e dei link esterni.
import { fileURLToPath } from 'node:url';
import { linguaDelPrefisso } from '../i18n/lingue.ts';

const CARTELLA = /([\\/])(traduzioni|traduzioni-casi)[\\/]([^\\/]+)[\\/]([^\\/]+)$/;
const INGLESE = { traduzioni: 'docs', 'traduzioni-casi': 'use-cases' };

/** Il percorso su disco del file che il processore sta rendendo: Astro passa un URL file:. */
export function percorsoDelFile(file) {
  const p = file?.path ?? file?.history?.[0];
  if (!p) return '';
  const s = String(p);
  return s.startsWith('file:') ? fileURLToPath(s) : s;
}

/**
 * La lingua del file e il suo inglese: `{ lingua, prefisso, inglese }` per una traduzione (inglese è il percorso del
 * file inglese con lo stesso nome), `null` per un file inglese.
 */
export function traduzioneDi(percorso) {
  const m = CARTELLA.exec(percorso);
  if (!m) return null;
  const [, sep, cartella, prefisso, nome] = m;
  const lingua = linguaDelPrefisso(prefisso);
  if (!lingua) throw new Error(`traduzioni: la cartella «${prefisso}» non è il prefisso di una lingua (${percorso})`);
  const inglese = percorso.slice(0, m.index) + sep + INGLESE[cartella] + sep + nome;
  return { lingua, prefisso, inglese };
}

/** La lingua di un file Markdown: 'en' per i file inglesi. */
export const linguaDelFile = (file) => traduzioneDi(percorsoDelFile(file))?.lingua ?? 'en';
