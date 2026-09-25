import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeExternalLinks from 'rehype-external-links';

// I link che portano FUORI dal sito si aprono in una scheda nuova; quelli interni no.
//
// La distinzione non e' un dettaglio: nel contenuto ci sono 68 link interni contro 8 esterni, e i
// due casi sono opposti. Fra pagine di documentazione si legge di seguito — si segue un rimando, si
// legge, si torna indietro — e aprire ogni rimando altrove romperebbe il tasto Indietro, che e' il
// modo in cui una documentazione si naviga davvero; chi vuole una scheda nuova ce l'ha gia' con
// ctrl-click. Un link esterno e' il contrario: la mappa dei fusi e' uno STRUMENTO che serve mentre
// si sta seguendo una procedura, e perdere la pagina a meta' istruzioni e' un costo vero.
//
// Il plugin lavora sulla sola pipeline markdown. Ne consegue, gratis, la cosa giusta anche per il
// marchio nell'intestazione e nel pie' di pagina (`Base.astro`): chi lo clicca sta scegliendo di
// andarsene, e non deve ritrovarsi una scheda in piu' che non ha chiesto. Nessuna eccezione da
// mantenere a mano: sta fuori dalla pipeline, quindi e' fuori dalla regola.
// Comandi e blocchi di codice restano come sono anche con la traduzione automatica del browser.
//
// Il sito e' solo in inglese e il pubblico del soft launch lo legge tradotto: senza questo, Chrome
// traduce anche `/create-list` (in un comando che non esiste) e gli esempi di lista, dove perde
// l'indentazione che insegna proprio la regola dei sottotask. `translate="no"` e' l'attributo HTML
// che i traduttori rispettano. Plugin locale di poche righe invece di una dipendenza.
function rehypeNoTranslateCode() {
  const visit = (node) => {
    if (node.type === 'element' && (node.tagName === 'pre' || node.tagName === 'code')) {
      node.properties = { ...node.properties, translate: 'no' };
    }
    (node.children ?? []).forEach(visit);
  };
  return (tree) => visit(tree);
}

export default defineConfig({
  site: 'https://tasks.bitsplitters.app',

  // Il processore Markdown va dichiarato esplicitamente. Dalla 7 il default di Astro e' Satteri, e
  // `@astrojs/markdown-remark` non e' piu' installato d'ufficio: la vecchia forma
  // `markdown.rehypePlugins` e' deprecata, e con quel pacchetto assente la build muore.
  //
  // Si resta su `unified` e non si passa a Satteri per una ragione concreta, non per inerzia: i
  // markdown di commands.md e config-lists.md contengono HTML grezzo inline (<img class="inline-ic">,
  // anche dentro le tabelle GFM) che oggi passa grazie a rehype-raw, dipendenza di
  // @astrojs/markdown-remark. Con Satteri quel comportamento andrebbe riverificato pagina per pagina.
  //
  // ATTENZIONE al modo peggiore di sbagliare qui: impostare `processor: satteri()` lasciando anche
  // `markdown.rehypePlugins` NON fa fallire la build — stampa un avviso e ignora i plugin. I link
  // esterni perderebbero target, rel e testo per screen reader, e la CI passerebbe lo stesso.
  markdown: {
    processor: unified({
      rehypePlugins: [
        rehypeNoTranslateCode,
        [
          rehypeExternalLinks,
          {
            target: '_blank',
            rel: ['noopener', 'noreferrer'],

            // I domini riservati agli esempi (RFC 2606) sono dimostrazioni, non destinazioni: in
            // «Personalize your lists» il link `[our roadmap](https://example.com/roadmap)` esiste
            // per far VEDERE com'e' un link cliccabile. Marcarlo come «esce dal sito», freccina
            // compresa, direbbe una cosa vera di una finzione, e in una pagina che insegna la
            // sintassi sarebbe solo rumore.
            test: (element) =>
              !/^https?:\/\/(www\.)?example\.(com|org|net)(\/|$)/i.test(
                String(element.properties?.href ?? '')
              ),

            // La freccina che il CSS aggiunge e' decorativa, e uno screen reader non la legge.
            // Senza questo testo, chi non la vede scopre la scheda nuova solo premendo Indietro e
            // non ottenendo niente.
            content: {
              type: 'element',
              tagName: 'span',
              properties: { className: ['sr-only'] },
              children: [{ type: 'text', value: ' (opens in a new tab)' }],
            },
          },
        ],
      ],
    }),
  },
});
