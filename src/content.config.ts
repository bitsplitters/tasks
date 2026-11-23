import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { problemi } from './lib/esempi/controllo';

// Content Layer (Astro 5+): la collection dichiara da sola DOVE stanno i file, con un loader.
// Prima era implicito — `type: 'content'` e la cartella omonima sotto src/content/ — e quella forma
// non e' piu' deprecata ma rimossa: dalla v6 `type` e' un errore bloccante.
//
// Il file sta in src/content.config.ts e non piu' in src/content/config.ts: la vecchia posizione era
// una retrocompatibilita' dichiarata temporanea nella v5.
//
// Gli `id` prodotti dal loader sono i nomi dei file senza estensione, cioe' esattamente i vecchi
// `slug`: nessun documento ha un `slug:` nel frontmatter e i nomi sono gia' kebab-case minuscolo.
// E' il motivo per cui gli URL pubblici non cambiano — cosa da riverificare se un giorno si
// aggiungessero sottocartelle sotto src/content/docs/, perche' li' l'id includerebbe il percorso.
const docs = defineCollection({
  loader: glob({ base: './src/content/docs', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    group: z.string().default('Guide'),
    // Il posto di una pagina d'uso: la pillola sotto il titolo (spec della documentazione divisa fra canale e
    // Activity, §5). Le pagine comuni, che valgono nei due posti, non ce l'hanno.
    place: z.enum(['channel', 'activity']).optional(),
    // Le note di rilascio: ogni `##` diventa un riquadro che si apre, con la data e l'anteprima delle voci (spec
    // 2026-11-19-iva-e-note-di-rilascio-design.md, §4, nel repo team-tasks-manager; il plugin è src/lib/rehype-note-di-rilascio.mjs).
    releases: z.boolean().optional(),
    // Una pagina che presenta per intero una funzione Premium (/config webhook): l'etichetta Premium accanto al titolo,
    // nel menu e nell'indice. Le funzioni Premium dentro una pagina lo dicono nel testo (2026-11-23).
    premium: z.boolean().optional(),
  }),
});

// Le pagine della documentazione tradotte (spec 2026-11-19-sito-multilingua-design.md, §4.2 e §7, nel repo
// team-tasks-manager): src/content/traduzioni/<prefisso>/<slug>.md, con lo stesso nome della pagina inglese. Una
// traduzione porta solo i testi: titolo e descrizione nel frontmatter, il corpo sotto. Gruppo, ordine, `place`,
// `releases` e `premium` vengono dalla pagina inglese (src/lib/docs-lingua.ts), così una pagina non cambia posto da una
// lingua all'altra. `fonte` è l'impronta dell'inglese tradotto, che src/lib/traduzioni.mjs confronta con quella di oggi.
const traduzioni = defineCollection({
  loader: glob({ base: './src/content/traduzioni', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    fonte: z.string().optional(),
  }),
});

// I casi d'uso (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §6, nel repo team-tasks-manager): la storia di un
// team che usa TTM per una settimana. `title` è l'H1, `seoTitle` il <title>, `name` il nome corto dell'indice e dei
// rimandi, `highlights` la frase delle schede. Il team, la lista come in Bulk update, i webhook, le scelte di
// /config app e la settimana passano dal controllo di src/lib/esempi/controllo.ts: se il bot rifiuterebbe la lista,
// o se una scheda nomina un task che non c'è, la build si ferma.
const id = z.string().regex(/^\d{17,20}$/);
const useCases = defineCollection({
  loader: glob({ base: './src/content/use-cases', pattern: '**/*.md' }),
  schema: z
    .object({
      title: z.string(),
      seoTitle: z.string(),
      name: z.string(),
      description: z.string(),
      highlights: z.string(),
      // L'attacco della pagina, in Markdown: il team, cosa deve fare, in quale settimana.
      intro: z.string(),
      order: z.number(),
      team: z.object({
        guild: z.string(),
        zone: z.string(),
        people: z.array(z.object({ id, name: z.string(), username: z.string(), color: z.string(), about: z.string() })),
        roles: z.array(z.object({
          id, name: z.string(), about: z.string(), members: z.array(id).optional(), ttm: z.boolean().optional(),
        })),
        channels: z.array(z.object({ id, name: z.string(), about: z.string(), voice: z.boolean().optional() })),
      }),
      list: z.object({
        title: z.string(),
        channel: id,
        at: z.string(),
        text: z.string().transform((s) => s.replace(/\s+$/, '')),
        spaced: z.boolean().optional(),
        tips: z.boolean().optional(),
        // La riga sotto la lista, in Markdown: cosa guardare.
        look: z.string(),
      }),
      webhooks: z.array(z.object({
        name: z.string(),
        service: z.enum(['discord', 'github', 'make']),
        trigger: z.enum(['completion', 'both']),
        method: z.enum(['GET', 'POST', 'PUT', 'DELETE']),
        url: z.string(),
        headers: z.string(),
        body: z.string(),
        setup: z.string(),
        postsAs: z.object({ name: z.string(), channel: id, color: z.string() }).optional(),
      })).default([]),
      settings: z.array(z.object({
        setting: z.string(), choice: z.string(), why: z.string(), premium: z.boolean().optional(),
      })),
      week: z.array(z.object({
        at: z.string(),
        text: z.string(),
        card: z.discriminatedUnion('kind', [
          z.object({ kind: z.literal('reminder'), task: z.string() }),
          z.object({
            kind: z.literal('notice'), type: z.enum(['claimed', 'assigned', 'updated', 'completed']), by: id,
            task: z.string(), from: id.optional(),
          }),
          z.object({ kind: z.literal('webhook'), webhook: z.string(), task: z.string(), by: id }),
        ]).optional(),
      })),
    })
    .superRefine((d, ctx) => {
      for (const message of problemi(d)) ctx.addIssue({ code: 'custom', message });
    }),
});

export const collections = { docs, traduzioni, useCases };
