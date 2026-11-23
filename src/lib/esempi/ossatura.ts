/*
 * Una traduzione di un caso d'uso racconta la stessa settimana dell'inglese (spec 2026-11-19-sito-multilingua-design.md,
 * §4.3, nel repo team-tasks-manager): stessi id, stessi orari, stesse schede, stesse impostazioni Premium. Cambiano solo
 * i testi. src/pagine/PaginaCaso.astro ferma la build se l'ossatura di una traduzione non è quella dell'inglese.
 */
import type { Esempio } from './tipi.ts';

/** Quello che una traduzione non può cambiare, in una stringa da confrontare. */
export function ossatura(x: Esempio): string {
  return JSON.stringify({
    zona: x.team.zone,
    persone: x.team.people.map((p) => [p.id, p.color]),
    ruoli: x.team.roles.map((r) => [r.id, r.members ?? [], !!r.ttm]),
    canali: x.team.channels.map((c) => [c.id, !!c.voice]),
    lista: [x.list.channel, x.list.at, !!x.list.spaced, !!x.list.tips],
    webhook: x.webhooks.map((w) => [w.service, w.trigger, w.method, w.postsAs?.channel ?? '']),
    impostazioni: x.settings.map((s) => !!s.premium),
    // Il nome del webhook di una scheda è tradotto come il webhook: resta fuori.
    settimana: x.week.map(({ at, card: c }) => [at, c?.kind ?? '', c?.task ?? '', c && 'by' in c ? c.by : '',
      c?.kind === 'notice' ? [c.type, c.from ?? ''] : []]),
  });
}

/** Il problema di una traduzione che si allontana dall'inglese, o null se racconta la stessa settimana. */
export function settimanaDiversa(tradotto: Esempio, inglese: Esempio): string | null {
  const [t, e] = [ossatura(tradotto), ossatura(inglese)];
  return t === e ? null : `non racconta la stessa settimana dell'inglese\n  traduzione ${t}\n  inglese    ${e}`;
}
