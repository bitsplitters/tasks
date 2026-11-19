import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
  }),
});

export const collections = { docs };
