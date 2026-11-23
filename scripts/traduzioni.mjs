// npm run traduzioni (spec 2026-11-19-sito-multilingua-design.md, §7, nel repo team-tasks-manager): le traduzioni
// mancanti e quelle indietro, lingua per lingua. Per una traduzione indietro mostra cosa è cambiato nell'inglese da
// quando è stata tradotta: il diff dal commit più recente in cui l'impronta dell'inglese valeva la sua `fonte`.
//
//   npm run traduzioni                         il rapporto, coi diff
//   npm run traduzioni -- --firma <file…>      scrive in quelle traduzioni la `fonte` di oggi dell'inglese
//   npm run traduzioni -- --firma              la scrive in tutte quelle indietro, e le elenca
//
// Si firma DOPO aver aggiornato la traduzione: la firma dice «tradotta da questa versione dell'inglese».
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { CARTELLE, impronta, raccogli, riga } from '../src/lib/traduzioni.mjs';
import { LINGUE } from '../src/i18n/lingue.ts';

const radice = resolve(fileURLToPath(new URL('..', import.meta.url)));
const git = (...args) => execFileSync('git', args, { cwd: radice, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

/** Il file inglese di una traduzione, dalla sua cartella. */
function inglese(percorso) {
  for (const c of CARTELLE) {
    for (const l of LINGUE.filter((x) => x.prefisso)) {
      const cartella = `${c.tradotta(l.prefisso)}/`;
      if (percorso.startsWith(cartella) && !percorso.slice(cartella.length).includes('/')) {
        return `${c.inglese}/${percorso.slice(cartella.length)}`;
      }
    }
  }
  throw new Error(`${percorso} non è una traduzione`);
}

/** Il commit più recente in cui il file inglese aveva l'impronta `fonte`, o null. */
function commitDellaFonte(percorso, fonte) {
  for (const h of git('log', '--format=%H', '--', percorso).split('\n').filter(Boolean)) {
    let testo;
    try {
      testo = git('show', `${h}:${percorso}`);
    } catch {
      continue;
    }
    if (impronta(testo) === fonte) return h;
  }
  return null;
}

/** Scrive la `fonte` in una traduzione: nel frontmatter del Markdown, nella riga `export const fonte` di un modulo. */
function firma(percorso) {
  const assoluto = join(radice, percorso);
  const testo = readFileSync(assoluto, 'utf8');
  const nl = testo.includes('\r\n') ? '\r\n' : '\n';
  const fonte = impronta(readFileSync(join(radice, inglese(percorso)), 'utf8'));
  let nuovo;
  if (percorso.endsWith('.ts')) {
    if (!/^export const fonte = '[^']*';/m.test(testo)) throw new Error(`${percorso}: manca la riga export const fonte`);
    nuovo = testo.replace(/^export const fonte = '[^']*';/m, `export const fonte = '${fonte}';`);
  } else {
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(testo);
    if (!m) throw new Error(`${percorso}: manca il frontmatter`);
    const fm = /^fonte:.*$/m.test(m[1]) ? m[1].replace(/^fonte:.*$/m, `fonte: ${fonte}`) : `${m[1]}${nl}fonte: ${fonte}`;
    nuovo = testo.slice(0, m.index) + `---${nl}${fm}${nl}---` + testo.slice(m.index + m[0].length);
  }
  if (nuovo !== testo) writeFileSync(assoluto, nuovo);
  return fonte;
}

const argomenti = process.argv.slice(2);
const lingue = await raccogli(radice);

if (argomenti[0] === '--firma') {
  const scelti = argomenti.slice(1).map((p) => relative(radice, resolve(p)).replace(/\\/g, '/'));
  const daFirmare = scelti.length
    ? scelti
    : lingue.flatMap((l) => l.problemi.filter((p) => p.tipo === 'indietro').map((p) => p.percorso));
  for (const p of daFirmare) console.log(`firmata ${p}: ${firma(p)}`);
  if (!daFirmare.length) console.log('Nessuna traduzione da firmare.');
  process.exit(0);
}

let problemi = 0;
for (const l of lingue) {
  if (!l.tradotti) {
    console.log(`${l.lingua}: nessuna traduzione${l.pubblicata ? '' : ' (non pubblicata)'}`);
    continue;
  }
  console.log(`${l.lingua}: ${l.tradotti} traduzioni, ${l.problemi.length} problemi${l.pubblicata ? '' : ' (non pubblicata)'}`);
  problemi += l.pubblicata ? l.problemi.length : 0;
  for (const p of l.problemi) {
    console.log(riga(p));
    if (p.tipo !== 'indietro') continue;
    const fonte = /tradotto da ([0-9a-f]+)/.exec(p.messaggio)?.[1];
    const ingl = inglese(p.percorso);
    const h = fonte && commitDellaFonte(ingl, fonte);
    if (!h) {
      console.log(fonte ? `    nessun commit di ${ingl} ha l'impronta ${fonte}` : '    da firmare dopo averla confrontata con l\'inglese');
      continue;
    }
    console.log(`    cosa è cambiato in ${ingl} da ${h.slice(0, 7)}:`);
    console.log(git('diff', h, '--', ingl).replace(/^/gm, '    '));
  }
}
process.exit(problemi ? 1 : 0);
