// Le copie allineate (spec 2026-11-19-sito-multilingua-design.md, §7 e §16, nel repo team-tasks-manager). Ogni
// traduzione dice da quale versione dell'inglese è stata tradotta: `fonte`, i primi 12 caratteri esadecimali dello
// SHA-256 del file inglese con le righe in LF (qui il checkout è CRLF, la build di GitHub vede LF). Nel frontmatter per
// il Markdown, come `export const fonte = '…'` nei moduli di testo.
//
// Le coppie, per ogni lingua col suo prefisso:
// - src/content/docs/<nome>.md        ↔ src/content/traduzioni/<prefisso>/<nome>.md
// - src/content/use-cases/<nome>.md   ↔ src/content/traduzioni-casi/<prefisso>/<nome>.md
// - src/pages/<nome>.md (le legali)   ↔ src/pages/<prefisso>/<nome>.md
// - src/i18n/testi/en/<zona>.ts       ↔ src/i18n/testi/<prefisso>/<zona>.ts (index.ts escluso)
//
// `rapporto` è puro: riceve i file letti e restituisce i problemi. `raccogli` legge il disco. Li usano l'integrazione
// controllo-traduzioni di astro.config.mjs, scripts/traduzioni.mjs (npm run traduzioni) e scripts/traduzioni.test.ts.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { LINGUE } from '../i18n/lingue.ts';

/** Le coppie di cartelle: `inglese` relativa alla radice, `tradotta(prefisso)` idem. */
export const CARTELLE = [
  { nome: 'docs', inglese: 'src/content/docs', tradotta: (p) => `src/content/traduzioni/${p}`, tipo: 'pagina' },
  { nome: 'use-cases', inglese: 'src/content/use-cases', tradotta: (p) => `src/content/traduzioni-casi/${p}`, tipo: 'pagina' },
  { nome: 'legali', inglese: 'src/pages', tradotta: (p) => `src/pages/${p}`, tipo: 'pagina' },
  { nome: 'testi', inglese: 'src/i18n/testi/en', tradotta: (p) => `src/i18n/testi/${p}`, tipo: 'modulo' },
];

/** L'impronta di un file: 12 caratteri dello SHA-256 con le righe in LF. */
export function impronta(testo) {
  return createHash('sha256').update(testo.replace(/\r\n/g, '\n'), 'utf8').digest('hex').slice(0, 12);
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/;

/** La `fonte` di un file Markdown (dal frontmatter) o di un modulo (`export const fonte`); '' se non c'è. */
export function fonteDi(testo, tipo) {
  if (tipo === 'modulo') return /^export const fonte = '([^']*)';/m.exec(testo)?.[1] ?? '';
  const fm = FRONTMATTER.exec(testo)?.[1] ?? '';
  return /^fonte:\s*["']?([^"'\s]*)["']?\s*$/m.exec(fm)?.[1] ?? '';
}

/** I livelli dei titoli `##`, `###` e `####` di un Markdown, in ordine: fuori dal frontmatter e dai blocchi di codice. */
export function titoli(testo) {
  const corpo = testo.replace(FRONTMATTER, '');
  const livelli = [];
  let recinto = null;
  for (const riga of corpo.split(/\r?\n/)) {
    const r = /^ {0,3}(`{3,}|~{3,})/.exec(riga);
    if (r) {
      if (!recinto) recinto = r[1][0];
      else if (r[1][0] === recinto) recinto = null;
      continue;
    }
    if (recinto) continue;
    const t = /^(#{2,4})\s+\S/.exec(riga);
    if (t) livelli.push(t[1].length);
  }
  return livelli;
}

/** I segnaposto `{nome}` di un testo, in ordine alfabetico, senza le doppie graffe dei webhook. */
export function segnaposto(valore) {
  const testo = typeof valore === 'string' ? valore : valore.other;
  return [...new Set([...testo.matchAll(/(?<!\{)\{(\w+)\}(?!\})/g)].map((m) => m[1]))].sort();
}

/** Le differenze fra due moduli di testo: chiavi, forma (testo o plurale), segnaposto. */
function confrontaModuli(inglese, tradotto) {
  const problemi = [];
  const [ce, ct] = [Object.keys(inglese), Object.keys(tradotto)];
  const mancano = ce.filter((k) => !(k in tradotto));
  const inPiu = ct.filter((k) => !(k in inglese));
  if (mancano.length) problemi.push({ tipo: 'chiavi', messaggio: `mancano le chiavi ${mancano.join(', ')}` });
  if (inPiu.length) problemi.push({ tipo: 'chiavi', messaggio: `chiavi che l'inglese non ha: ${inPiu.join(', ')}` });
  for (const k of ce.filter((x) => x in tradotto)) {
    const [e, t] = [inglese[k], tradotto[k]];
    if ((typeof e === 'string') !== (typeof t === 'string')) {
      problemi.push({ tipo: 'forma', messaggio: `«${k}» è ${typeof e === 'string' ? 'un testo' : 'un plurale'} in inglese` });
      continue;
    }
    const [se, st] = [segnaposto(e).join(' '), segnaposto(t).join(' ')];
    if (se !== st) problemi.push({ tipo: 'segnaposto', messaggio: `«${k}» ha i segnaposto [${st}], l'inglese [${se}]` });
  }
  return problemi;
}

/**
 * I problemi delle traduzioni di una lingua. `inglesi` e `tradotti` sono liste di file
 * `{ chiave, percorso, tipo, testo, testi? }`: `chiave` (`docs/config.md`) accoppia i file, `testi` è l'oggetto dei
 * testi di un modulo. Ogni problema è `{ lingua, chiave, percorso, tipo, messaggio }`; i tipi sono mancante, orfana,
 * indietro, chiavi, forma, segnaposto, titoli.
 */
export function rapporto(lingua, inglesi, tradotti) {
  const problemi = [];
  const perChiave = new Map(tradotti.map((f) => [f.chiave, f]));
  const conosciute = new Set(inglesi.map((f) => f.chiave));
  const aggiungi = (f, tipo, messaggio) => problemi.push({ lingua, chiave: f.chiave, percorso: f.percorso, tipo, messaggio });
  for (const e of inglesi) {
    const t = perChiave.get(e.chiave);
    if (!t) {
      aggiungi(e, 'mancante', `manca la traduzione di ${e.percorso}`);
      continue;
    }
    const fonte = fonteDi(t.testo, t.tipo);
    const oggi = impronta(e.testo);
    if (fonte !== oggi) {
      aggiungi(t, 'indietro', fonte ? `tradotto da ${fonte}, l'inglese oggi è ${oggi}` : `senza fonte (l'inglese oggi è ${oggi})`);
    }
    if (e.tipo === 'modulo') {
      for (const p of confrontaModuli(e.testi ?? {}, t.testi ?? {})) aggiungi(t, p.tipo, p.messaggio);
    } else {
      const [le, lt] = [titoli(e.testo).join(' '), titoli(t.testo).join(' ')];
      if (le !== lt) aggiungi(t, 'titoli', `titoli [${lt}], l'inglese [${le}]`);
    }
  }
  for (const t of tradotti) if (!conosciute.has(t.chiave)) aggiungi(t, 'orfana', `${t.percorso} non ha un inglese`);
  return problemi;
}

/** I file di una cartella con la loro chiave: i .md per le pagine, i .ts tranne index.ts per i moduli. */
async function file(radice, cartella, relativa) {
  const assoluta = join(radice, relativa);
  if (!existsSync(assoluta)) return [];
  const estensione = cartella.tipo === 'modulo' ? '.ts' : '.md';
  const nomi = readdirSync(assoluta, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith(estensione) && d.name !== 'index.ts')
    .map((d) => d.name)
    .sort();
  return Promise.all(nomi.map(async (nome) => {
    const percorso = `${relativa}/${nome}`;
    const testo = readFileSync(join(assoluta, nome), 'utf8');
    const f = { chiave: `${cartella.nome}/${nome}`, percorso, tipo: cartella.tipo, testo };
    if (cartella.tipo === 'modulo') f.testi = (await import(pathToFileURL(join(assoluta, nome)).href)).testi;
    return f;
  }));
}

/**
 * Legge il disco e restituisce, per ogni lingua tranne l'inglese, `{ lingua, pubblicata, tradotti, problemi }`:
 * `tradotti` è il numero di file tradotti, per distinguere una lingua mai cominciata da una indietro.
 */
export async function raccogli(radice) {
  const inglesi = (await Promise.all(CARTELLE.map((c) => file(radice, c, c.inglese)))).flat();
  return Promise.all(LINGUE.filter((l) => l.prefisso).map(async (l) => {
    const tradotti = (await Promise.all(CARTELLE.map((c) => file(radice, c, c.tradotta(l.prefisso))))).flat();
    return { lingua: l.codice, pubblicata: l.pubblicata, tradotti: tradotti.length, problemi: rapporto(l.codice, inglesi, tradotti) };
  }));
}

/** Una riga per problema, per la console. */
export const riga = (p) => `  ${p.lingua} ${p.percorso}: ${p.messaggio}`;
