/*
 * Il plugin delle note di rilascio a riquadri (spec 2026-11-19-iva-e-note-di-rilascio-design.md, §4.2, nel repo
 * team-tasks-manager), provato nella pipeline Markdown vera di Astro: così gli id dei titoli sono quelli che il sito
 * pubblica. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeNoteDiRilascio from '../src/lib/rehype-note-di-rilascio.mjs';

const processore = await createMarkdownProcessor({ syntaxHighlight: false, rehypePlugins: [rehypeNoteDiRilascio] });
const html = async (md: string, releases = true) =>
  (await processore.render(md, { frontmatter: releases ? { releases: true } : {} })).code;

const PAGINA = `Intro line.

## 2.3.0 — New lists

Released 2026-11-19

- **A [new](/x) list** — text.
- **\`/config app\` in a new order** — text.
- **Third** — text.
- **Fourth** — text.
  - nested, not a change

## 1.0.0 — First

Released 2026-10-23

The first release.

### Lists

- **Only one** — text.

---

<div class="callout">After</div>
`;

test('senza releases: true la pagina resta com è', async () => {
  const h = await html(PAGINA, false);
  assert.doesNotMatch(h, /class="rel/);
  assert.match(h, /<hr>/);
  assert.match(h, /Released 2026-11-19/);
});

test('ogni release è una sezione col titolo, la data e il riquadro', async () => {
  const h = await html(PAGINA);
  // Il testo prima della prima release resta fuori.
  assert.match(h, /^<p>Intro line\.<\/p>\s*<section class="rel">/);
  // Il titolo non cambia, quindi nemmeno la sua ancora.
  assert.match(h, /<section class="rel"><h2 id="230--new-lists">2\.3\.0 — New lists<\/h2>/);
  assert.match(h, /<p class="rel-date"><time datetime="2026-11-19">19 November 2026<\/time><\/p>/);
  assert.match(h, /<time datetime="2026-10-23">23 October 2026<\/time>/);
  assert.doesNotMatch(h, /Released/);
  assert.equal(h.match(/<section class="rel">/g)?.length, 2);
});

test("l'anteprima: i grassetti delle prime tre voci, senza link, col codice", async () => {
  const h = await html(PAGINA);
  const sep = '<span class="rel-sep"> · </span>';
  assert.match(
    h,
    new RegExp(
      `<span class="rel-preview">A new list${sep}<code>/config app</code> in a new order${sep}Third</span>` +
        `<span class="rel-more"><span class="rel-sep"> · </span>1 more</span><span class="rel-all">4 changes</span>`,
    ),
  );
  // Le voci annidate non sono cambi.
  assert.doesNotMatch(h, /5 changes/);
});

test('con tre voci o meno niente «more»; il singolare', async () => {
  const h = await html(PAGINA);
  const seconda = h.slice(h.indexOf('id="100--first"'));
  assert.match(seconda, /<span class="rel-preview">Only one<\/span><span class="rel-all">1 change<\/span>/);
  assert.doesNotMatch(seconda, /rel-more/);
});

test('solo la prima release è aperta; il contenuto sta nel riquadro, h3 compresi', async () => {
  const h = await html(PAGINA);
  assert.equal(h.match(/<details class="rel-box" open>/g)?.length, 1);
  assert.equal(h.match(/<details class="rel-box">/g)?.length, 1);
  assert.match(h, /<div class="rel-body">\s*<p>The first release\.<\/p>\s*<h3 id="lists">Lists<\/h3>/);
  // Il sommario non entra nella ricerca: ripete i grassetti che stanno già nell'elenco.
  assert.equal(h.match(/<summary data-pagefind-ignore(="")?>/g)?.length, 2);
});

test('la riga --- chiude le release: lei sparisce, quello che segue resta fuori', async () => {
  const h = await html(PAGINA);
  assert.doesNotMatch(h, /<hr>/);
  assert.match(h, /<\/details><\/section>\s*<div class="callout">After<\/div>/);
});

test('la build si ferma su una release senza data, con una data sbagliata o una voce senza grassetto', async () => {
  await assert.rejects(html('## 2.3.0 — X\n\n- **A** — b.\n'), /2\.3\.0 — X.*Released/s);
  await assert.rejects(html('## 2.3.0 — X\n\nReleased 2026-02-30\n\n- **A** — b.\n'), /2\.3\.0 — X.*2026-02-30/s);
  await assert.rejects(html('## 2.3.0 — X\n\nReleased 2026-11-19\n\n- plain — b.\n'), /2\.3\.0 — X.*grassetto/s);
  await assert.rejects(html('## 2.3.0 — X\n\nReleased 2026-11-19\n\nNo list.\n'), /2\.3\.0 — X.*voci/s);
});
