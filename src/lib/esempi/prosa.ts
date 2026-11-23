/*
 * La prosa scritta nel frontmatter di un caso d'uso (l'attacco, i momenti della settimana, il perché di
 * un'impostazione, il passo dal lato del servizio) in HTML, al build. Il corpo delle pagine passa dalla pipeline di
 * astro.config.mjs; questi testi no, quindi il processore si crea qui, coi link esterni trattati allo stesso modo:
 * una scheda nuova, rel e il testo per gli screen reader. Se cambia la regola in astro.config.mjs, cambia anche qui.
 *
 * Nella lingua della pagina (spec 2026-11-19-sito-multilingua-design.md, §4.5): il testo per gli screen reader dalla
 * zona `comune` dei testi, i link interni col prefisso della lingua come rehype-link-della-lingua.mjs.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';
import type { Lingua } from '../../i18n/lingue.ts';
import { PREFISSI } from '../../i18n/percorsi.ts';
import { t } from '../../i18n/t.ts';
import { htmlConPrefisso } from '../rehype-link-della-lingua.mjs';

type Processore = Awaited<ReturnType<typeof createMarkdownProcessor>>;
const processori = new Map<Lingua, Promise<Processore>>();

function crea(lingua: Lingua): Promise<Processore> {
  return createMarkdownProcessor({
    shikiConfig: { theme: 'css-variables' },
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
      content: {
        type: 'element', tagName: 'span', properties: { className: ['sr-only'] },
        children: [{ type: 'text', value: t(lingua, 'comune.link.esterno') }],
      },
    }]],
  });
}

/** Il Markdown in HTML, coi paragrafi, nella lingua della pagina. */
export async function prosa(testo: string, lingua: Lingua = 'en'): Promise<string> {
  if (!processori.has(lingua)) processori.set(lingua, crea(lingua));
  const html = (await (await processori.get(lingua)!).render(testo)).code;
  return lingua === 'en' ? html : htmlConPrefisso(html, PREFISSI[lingua]);
}

/** Il Markdown in HTML, senza il paragrafo attorno: per una cella o una riga sola. */
export async function prosaInLinea(testo: string, lingua: Lingua = 'en'): Promise<string> {
  const html = (await prosa(testo, lingua)).trim();
  const m = /^<p>([\s\S]*)<\/p>$/.exec(html);
  return m && !m[1].includes('<p>') ? m[1] : html;
}
