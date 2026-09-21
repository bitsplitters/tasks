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
  }),
});

export const collections = { docs };
