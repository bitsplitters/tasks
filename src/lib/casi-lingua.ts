/*
 * I casi d'uso nella lingua di una pagina (spec 2026-11-19-sito-multilingua-design.md, §4.3, nel repo
 * team-tasks-manager), in ordine. Per ogni caso inglese, la sua traduzione se c'è; se non c'è, l'inglese fa da riserva.
 * `inglese` è sempre l'esempio inglese: da lì vengono le ancore delle impostazioni e il testo push, che nelle
 * traduzioni hanno nomi tradotti.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lingua } from '../i18n/lingue.ts';
import { PREFISSI } from '../i18n/percorsi.ts';

export interface CasoDellaLingua {
  id: string;
  data: CollectionEntry<'useCases'>['data'];
  inglese: CollectionEntry<'useCases'>['data'];
  /** La entry da rendere: la traduzione, o l'inglese che fa da riserva. */
  entry: CollectionEntry<'useCases'> | CollectionEntry<'casiTradotti'>;
  /** Vero quando il caso è in inglese in una lingua che non lo è. */
  riserva: boolean;
}

export async function casiDellaLingua(lingua: Lingua): Promise<CasoDellaLingua[]> {
  const inglesi = (await getCollection('useCases')).sort((a, b) => a.data.order - b.data.order);
  const prefisso = PREFISSI[lingua];
  const tradotti = lingua === 'en'
    ? new Map<string, CollectionEntry<'casiTradotti'>>()
    : new Map(
      (await getCollection('casiTradotti'))
        .filter((c) => c.id.startsWith(`${prefisso}/`))
        .map((c) => [c.id.slice(prefisso.length + 1), c]),
    );
  return inglesi.map((e) => {
    const t = tradotti.get(e.id);
    if (!t) return { id: e.id, data: e.data, inglese: e.data, entry: e, riserva: lingua !== 'en' };
    return { id: e.id, data: t.data, inglese: e.data, entry: t, riserva: false };
  });
}
