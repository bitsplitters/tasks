// Le ancore sono inglesi in tutte le lingue (spec 2026-11-19-sito-multilingua-design.md, §8, nel repo
// team-tasks-manager). Per una traduzione, il plugin rende la pagina inglese col processore Markdown di Astro, ne prende
// gli id dei titoli (`headings`, calcolati da rehypeHeadingIds) e li dà, nell'ordine, ai titoli tradotti. Gira fra i
// plugin dell'utente, quindi prima di rehypeHeadingIds, che non tocca un titolo che ha già l'id.
//
// Così `/it/docs/reminders/#how-the-reminder-arrives` porta allo stesso titolo dell'inglese, il selettore porta
// l'ancora da una lingua all'altra e i link `note=` delle news aprono la release giusta. I titoli devono essere uguali
// per numero e livello: se non lo sono la build si ferma qui (lo controlla anche src/lib/traduzioni.mjs), e PaginaDocs
// confronta gli id finali con quelli della pagina inglese.
import { readFile } from 'node:fs/promises';
import { createMarkdownProcessor, parseFrontmatter } from '@astrojs/markdown-remark';
import { percorsoDelFile, traduzioneDi } from './lingua-del-file.mjs';

const TITOLI = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
let processore;
const cache = new Map();

/** Gli id dei titoli della pagina inglese, come li calcola Astro, con la loro profondità. */
export async function ancoreInglesi(percorso) {
  if (!cache.has(percorso)) {
    cache.set(percorso, (async () => {
      processore ??= await createMarkdownProcessor({ syntaxHighlight: false });
      const { content, frontmatter } = parseFrontmatter(await readFile(percorso, 'utf8'));
      const { metadata } = await processore.render(content, { frontmatter });
      return metadata.headings.map((h) => ({ depth: h.depth, slug: h.slug }));
    })());
  }
  return cache.get(percorso);
}

const titoliDi = (tree) => {
  const titoli = [];
  const visita = (n) => {
    if (n.type === 'element' && TITOLI.has(n.tagName)) titoli.push(n);
    else (n.children ?? []).forEach(visita);
  };
  visita(tree);
  return titoli;
};

export default function rehypeAncoreInglesi() {
  return async (tree, file) => {
    const percorso = percorsoDelFile(file);
    const traduzione = traduzioneDi(percorso);
    if (!traduzione) return;
    const ancore = await ancoreInglesi(traduzione.inglese);
    const titoli = titoliDi(tree);
    const livelli = (l) => l.join(' ');
    const tradotti = titoli.map((t) => Number(t.tagName[1]));
    const inglesi = ancore.map((a) => a.depth);
    if (livelli(tradotti) !== livelli(inglesi)) {
      throw new Error(
        `ancore: ${percorso} ha i titoli [${livelli(tradotti)}], l'inglese [${livelli(inglesi)}]: ` +
          'servono gli stessi titoli, nello stesso numero, livello e ordine',
      );
    }
    titoli.forEach((t, i) => {
      t.properties = { ...t.properties, id: ancore[i].slug };
    });
  };
}
