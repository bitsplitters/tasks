import { defineConfig } from 'astro/config';
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
export default defineConfig({
  site: 'https://tasks.bitsplitters.app',
  markdown: {
    rehypePlugins: [
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

          // La freccina che il CSS aggiunge e' decorativa, e uno screen reader non la legge. Senza
          // questo testo, chi non la vede scopre la scheda nuova solo premendo Indietro e non
          // ottenendo niente.
          content: {
            type: 'element',
            tagName: 'span',
            properties: { className: ['sr-only'] },
            children: [{ type: 'text', value: ' (opens in a new tab)' }],
          },
        },
      ],
    ],
  },
});
