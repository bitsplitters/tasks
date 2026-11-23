/*
 * I casi d'uso nella lingua di una pagina (spec 2026-11-19-sito-multilingua-design.md, §16, nel repo
 * team-tasks-manager), in ordine. Per ora l'inglese per ogni lingua: le traduzioni (collection `casiTradotti`) arrivano
 * col compito 5 del piano 2026-11-23-sito-italiano.md.
 */
import { getCollection } from 'astro:content';
import type { Lingua } from '../i18n/lingue.ts';

export async function casiDellaLingua(_: Lingua) {
  return (await getCollection('useCases')).sort((a, b) => a.data.order - b.data.order);
}
