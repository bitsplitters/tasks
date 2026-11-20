/*
 * La prosa scritta nel frontmatter di un caso d'uso (l'attacco, i momenti della settimana, il perché di
 * un'impostazione, il passo dal lato del servizio) in HTML, al build. Il corpo delle pagine passa dalla pipeline di
 * astro.config.mjs; questi testi no, quindi il processore si crea qui, coi link esterni trattati allo stesso modo:
 * una scheda nuova, rel e il testo per gli screen reader. Se cambia la regola in astro.config.mjs, cambia anche qui.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';

type Processore = Awaited<ReturnType<typeof createMarkdownProcessor>>;
let processore: Promise<Processore> | undefined;

function crea(): Promise<Processore> {
  return createMarkdownProcessor({
    shikiConfig: { theme: 'css-variables' },
    rehypePlugins: [[rehypeExternalLinks, {
      target: '_blank',
      rel: ['noopener', 'noreferrer'],
      content: {
        type: 'element', tagName: 'span', properties: { className: ['sr-only'] },
        children: [{ type: 'text', value: ' (opens in a new tab)' }],
      },
    }]],
  });
}

/** Il Markdown in HTML, coi paragrafi. */
export async function prosa(testo: string): Promise<string> {
  processore ??= crea();
  return (await (await processore).render(testo)).code;
}

/** Il Markdown in HTML, senza il paragrafo attorno: per una cella o una riga sola. */
export async function prosaInLinea(testo: string): Promise<string> {
  const html = (await prosa(testo)).trim();
  const m = /^<p>([\s\S]*)<\/p>$/.exec(html);
  return m && !m[1].includes('<p>') ? m[1] : html;
}
