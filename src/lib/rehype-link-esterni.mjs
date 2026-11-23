// I link che portano fuori dal sito, nella lingua del file: rehype-external-links con il testo per gli screen reader
// della lingua (« (opens in a new tab)», « (si apre in una nuova scheda)»). Le regole e il perché stanno in
// astro.config.mjs, che passa le opzioni senza `content`.
import rehypeExternalLinks from 'rehype-external-links';
import { t } from '../i18n/t.ts';
import { linguaDelFile } from './lingua-del-file.mjs';

export default function rehypeLinkEsterni(opzioni) {
  const perLingua = new Map();
  const trasformatore = (lingua) => {
    if (!perLingua.has(lingua)) {
      perLingua.set(lingua, rehypeExternalLinks({
        ...opzioni,
        content: {
          type: 'element',
          tagName: 'span',
          properties: { className: ['sr-only'] },
          children: [{ type: 'text', value: t(lingua, 'comune.link.esterno') }],
        },
      }));
    }
    return perLingua.get(lingua);
  };
  return (tree, file) => trasformatore(linguaDelFile(file))(tree, file);
}
