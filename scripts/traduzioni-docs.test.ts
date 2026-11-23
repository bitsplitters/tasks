/*
 * I plugin delle traduzioni della documentazione (spec 2026-11-19-sito-multilingua-design.md, §4.5 e §8, nel repo
 * team-tasks-manager), provati nella pipeline Markdown vera di Astro: i link interni nella lingua del file, le ancore
 * della pagina inglese, le note di rilascio e i link esterni nella lingua. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createMarkdownProcessor, parseFrontmatter } from '@astrojs/markdown-remark';
import rehypeLinkDellaLingua, { conPrefisso } from '../src/lib/rehype-link-della-lingua.mjs';
import rehypeAncoreInglesi, { ancoreInglesi } from '../src/lib/rehype-ancore-inglesi.mjs';
import rehypeNoteDiRilascio from '../src/lib/rehype-note-di-rilascio.mjs';
import rehypeLinkEsterni from '../src/lib/rehype-link-esterni.mjs';
import { traduzioneDi } from '../src/lib/lingua-del-file.mjs';

// I plugin nell'ordine di astro.config.mjs.
const processore = await createMarkdownProcessor({
  syntaxHighlight: false,
  rehypePlugins: [
    rehypeLinkDellaLingua,
    rehypeAncoreInglesi,
    rehypeNoteDiRilascio,
    [rehypeLinkEsterni, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
  ],
});

const rendi = async (percorso: string) => {
  const { content, frontmatter } = parseFrontmatter(await readFile(percorso, 'utf8'));
  return processore.render(content, { frontmatter, fileURL: pathToFileURL(percorso) });
};

/** Una cartella content finta: docs/<nome>.md in inglese, traduzioni/it/<nome>.md in italiano. */
const radice = mkdtempSync(join(tmpdir(), 'traduzioni-'));
mkdirSync(join(radice, 'docs'));
mkdirSync(join(radice, 'traduzioni', 'it'), { recursive: true });
const pagina = (nome: string, inglese: string, italiano: string) => {
  writeFileSync(join(radice, 'docs', `${nome}.md`), inglese);
  writeFileSync(join(radice, 'traduzioni', 'it', `${nome}.md`), italiano);
  return join(radice, 'traduzioni', 'it', `${nome}.md`);
};

test('conPrefisso: le pagine prendono il prefisso, i file statici e /invite no', () => {
  assert.equal(conPrefisso('/docs/reminders/', 'it'), '/it/docs/reminders/');
  assert.equal(conPrefisso('/docs/reminders/#how-it-works', 'it'), '/it/docs/reminders/#how-it-works');
  assert.equal(conPrefisso('/premium/#vat', 'it'), '/it/premium/#vat');
  assert.equal(conPrefisso('/', 'it'), '/it/');
  assert.equal(conPrefisso('/it/docs/', 'it'), '/it/docs/');
  assert.equal(conPrefisso('/invite', 'it'), '/invite');
  assert.equal(conPrefisso('/invite/', 'it'), '/invite/');
  assert.equal(conPrefisso('/icons/other.png', 'it'), '/icons/other.png');
  assert.equal(conPrefisso('/premium/premium-it.png', 'it'), '/premium/premium-it.png');
  assert.equal(conPrefisso('/video/home', 'it'), '/video/home');
  assert.equal(conPrefisso('#how-it-works', 'it'), '#how-it-works');
  assert.equal(conPrefisso('https://discord.com/', 'it'), 'https://discord.com/');
  assert.equal(conPrefisso('//cdn.example.com/x', 'it'), '//cdn.example.com/x');
});

test('traduzioneDi: la lingua e il file inglese dalla cartella', () => {
  const it = traduzioneDi(join(radice, 'traduzioni', 'it', 'x.md'));
  assert.equal(it?.lingua, 'it');
  assert.equal(it?.inglese, join(radice, 'docs', 'x.md'));
  assert.equal(traduzioneDi(join(radice, 'docs', 'x.md')), null);
  assert.equal(traduzioneDi(join(radice, 'traduzioni-casi', 'it', 'y.md'))?.inglese, join(radice, 'use-cases', 'y.md'));
  assert.throws(() => traduzioneDi(join(radice, 'traduzioni', 'xx', 'x.md')), /prefisso/);
});

test('una traduzione: link nella lingua, ancore inglesi, link esterni nella lingua', async () => {
  const it = pagina(
    'prova',
    '---\ntitle: Test\n---\n\n## How it works\n\nSee [reminders](/docs/reminders/#how-it-works).\n\n### The second row\n\n' +
      '<div class="callout">Go to <a href="/docs/beta/">the beta</a> or <a href="/invite">invite</a>.</div>\n\n' +
      '## Where to press\n\n<img src="/icons/alertW.png" alt="" /> [Discord](https://discord.com/)\n',
    '---\ntitle: Prova\n---\n\n## Come funziona\n\nVedi [promemoria](/docs/reminders/#how-it-works).\n\n### La seconda riga\n\n' +
      '<div class="callout">Vai alla <a href="/docs/beta/">beta</a> o <a href="/invite">invita</a>.</div>\n\n' +
      '## Dove premere\n\n<img src="/icons/alertW.png" alt="" /> [Discord](https://discord.com/)\n',
  );
  const { code, metadata } = await rendi(it);
  assert.deepEqual(metadata.headings.map((h) => h.slug), ['how-it-works', 'the-second-row', 'where-to-press']);
  assert.match(code, /<h2 id="how-it-works">Come funziona<\/h2>/);
  assert.match(code, /href="\/it\/docs\/reminders\/#how-it-works"/);
  assert.match(code, /href="\/it\/docs\/beta\/"/);
  assert.match(code, /href="\/invite"/);
  assert.match(code, /src="\/icons\/alertW\.png"/);
  assert.match(code, /href="https:\/\/discord\.com\/"[^>]*>Discord<span><span class="sr-only"> \(si apre in una nuova scheda\)<\/span><\/span>/);
});

test("una pagina inglese resta com'è", async () => {
  pagina('inglese', '## How it works\n\n[x](/docs/beta/) [Discord](https://discord.com/)\n', '## Come funziona\n');
  const { code } = await rendi(join(radice, 'docs', 'inglese.md'));
  assert.match(code, /href="\/docs\/beta\/"/);
  assert.match(code, /<span class="sr-only"> \(opens in a new tab\)<\/span>/);
});

test('la build si ferma su una traduzione con titoli diversi dall’inglese', async () => {
  const it = pagina('diversa', '## One\n\n### Two\n', '## Uno\n\n## Due\n');
  await assert.rejects(rendi(it), /titoli \[2 2\], l'inglese \[2 3\]/);
});

test('le note di rilascio tradotte: releases dall’inglese, data e conteggi nella lingua', async () => {
  const voci = (n: number) => Array.from({ length: n }, (_, i) => `- **Voce ${i + 1}** — testo.`).join('\n');
  const it = pagina(
    'note',
    '---\ntitle: Notes\nreleases: true\n---\n\n## 2.3.0 — New lists\n\nReleased 2026-11-19\n\n' +
      Array.from({ length: 4 }, (_, i) => `- **Item ${i + 1}** — text.`).join('\n') + '\n\n## 2.2.0 — One\n\nReleased 2026-11-01\n\n- **Only** — text.\n',
    '---\ntitle: Note\n---\n\n## 2.3.0 — Liste nuove\n\nReleased 2026-11-19\n\n' + voci(4) +
      '\n\n## 2.2.0 — Una\n\nReleased 2026-11-01\n\n- **Sola** — testo.\n',
  );
  const { code, metadata } = await rendi(it);
  assert.deepEqual(metadata.headings.map((h) => h.slug), ['230--new-lists', '220--one']);
  assert.match(code, /<time datetime="2026-11-19">19 novembre 2026<\/time>/);
  assert.match(code, /<span class="rel-more"><span class="rel-sep"> · <\/span>un'altra<\/span>/);
  assert.match(code, /<span class="rel-all">4 modifiche<\/span>/);
  assert.match(code, /<span class="rel-all">1 modifica<\/span>/);
});

// Gli id che il plugin dà alle traduzioni sono quelli che Astro dà alle pagine inglesi: per ogni pagina inglese del
// sito, gli id calcolati da ancoreInglesi contro gli `headings` della pagina resa con i plugin del sito.
test('ancoreInglesi: per ogni pagina inglese gli id sono quelli della pipeline del sito', async () => {
  const cartella = join(process.cwd(), 'src', 'content', 'docs');
  const nomi = readdirSync(cartella).filter((n) => n.endsWith('.md'));
  assert.ok(nomi.length > 10);
  for (const nome of nomi) {
    const percorso = join(cartella, nome);
    const attesi = (await rendi(percorso)).metadata.headings.map((h) => ({ depth: h.depth, slug: h.slug }));
    assert.deepEqual(await ancoreInglesi(percorso), attesi, nome);
  }
});
