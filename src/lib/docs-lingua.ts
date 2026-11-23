/*
 * Le pagine della documentazione nella lingua di una pagina (spec 2026-11-19-sito-multilingua-design.md, §4.2, nel
 * repo team-tasks-manager), in ordine. Per ogni pagina inglese, la sua traduzione se c'è; se non c'è, l'inglese fa da
 * riserva, e la pagina lo dice. Dalla traduzione vengono titolo, descrizione e corpo; dall'inglese tutto il resto
 * (gruppo, ordine, posto, note di rilascio, Premium), così una pagina ha lo stesso posto in ogni lingua.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lingua } from '../i18n/lingue.ts';
import { PREFISSI } from '../i18n/percorsi.ts';

export interface PaginaDellaLingua {
  id: string;
  data: CollectionEntry<'docs'>['data'];
  /** La entry da rendere: la traduzione, o l'inglese che fa da riserva. */
  entry: CollectionEntry<'docs'> | CollectionEntry<'traduzioni'>;
  /** Vero quando la pagina è in inglese in una lingua che non lo è. */
  riserva: boolean;
}

export async function docsDellaLingua(lingua: Lingua): Promise<PaginaDellaLingua[]> {
  const inglesi = (await getCollection('docs')).sort((a, b) => a.data.order - b.data.order);
  if (lingua === 'en') return inglesi.map((e) => ({ id: e.id, data: e.data, entry: e, riserva: false }));
  const prefisso = PREFISSI[lingua];
  const tradotte = new Map(
    (await getCollection('traduzioni'))
      .filter((t) => t.id.startsWith(`${prefisso}/`))
      .map((t) => [t.id.slice(prefisso.length + 1), t]),
  );
  return inglesi.map((e) => {
    const t = tradotte.get(e.id);
    if (!t) return { id: e.id, data: e.data, entry: e, riserva: true };
    return {
      id: e.id,
      data: { ...e.data, title: t.data.title, description: t.data.description ?? e.data.description },
      entry: t,
      riserva: false,
    };
  });
}
