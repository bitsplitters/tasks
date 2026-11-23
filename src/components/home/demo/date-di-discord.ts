/*
 * Una data `<t:N:stile>` come la scrive un client Discord nella sua lingua (spec 2026-11-19-sito-multilingua-design.md,
 * §10, nel repo team-tasks-manager). La usano la demo della home (dataDelCanale, demo/modello.ts) e le riproduzioni dei
 * casi d'uso (dataDelTeam, src/lib/esempi/discord.ts). Le date si compongono per parti (formatToParts): la frase intera
 * di Intl cambia da un motore all'altro. I formattatori si fanno una volta per lingua e fuso.
 *
 * - In inglese americano, a 12 ore: `<t:N>` «November 15, 2026 6:14 PM», `:F` «Sunday, November 15, 2026 6:14 PM», `:t`
 *   «6:14 PM».
 * - Nelle altre lingue, a 24 ore, con le forme del client (i formati LT, LLL e LLLL della sua lingua):
 *   - italiano e francese: «15 novembre 2026 18:14», «domenica 15 novembre 2026 18:14», «18:14»;
 *   - tedesco: «15. November 2026 18:14», «Sonntag, 15. November 2026 18:14»;
 *   - spagnolo, le due varianti: «15 de noviembre de 2026 18:14», «domingo, 15 de noviembre de 2026 18:14», e l'ora
 *     senza lo zero davanti («9:05»);
 *   - portoghese del Brasile: «15 de novembro de 2026 às 18:14», «domingo, 15 de novembro de 2026 às 18:14».
 *
 * Gli stili che né la demo né i casi usano si scrivono come `<t:N>`.
 */
import type { Lingua } from '../../../i18n/lingue.ts';

const FORMATI = new Map<string, Intl.DateTimeFormat>();

function formato(zona: string, lingua: Lingua): Intl.DateTimeFormat {
  const chiave = `${lingua} ${zona}`;
  let f = FORMATI.get(chiave);
  if (!f) {
    f = lingua === 'en'
      ? new Intl.DateTimeFormat('en-US', {
        timeZone: zona, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
        minute: '2-digit', hour12: true,
      })
      : new Intl.DateTimeFormat(lingua, {
        timeZone: zona, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit',
        minute: '2-digit', hourCycle: 'h23',
      });
    FORMATI.set(chiave, f);
  }
  return f;
}

/** Le parti di un istante nel fuso e nella lingua: weekday, day, month, year, hour, minute, dayPeriod. */
export function parti(at: number, zona: string, lingua: Lingua): Record<string, string> {
  const p: Record<string, string> = {};
  for (const x of formato(zona, lingua).formatToParts(new Date(at * 1000))) p[x.type] = x.value;
  return p;
}

const SPAGNOLO = (lingua: Lingua): boolean => lingua === 'es-ES' || lingua === 'es-419';

/** L'ora di un istante come la scrive Discord: «6:14 PM», «18:14», in spagnolo «9:05». */
export function oraDiDiscord(at: number, zona: string, lingua: Lingua): string {
  const p = parti(at, zona, lingua);
  if (lingua === 'en') return `${p.hour}:${p.minute} ${p.dayPeriod}`;
  return `${SPAGNOLO(lingua) ? String(Number(p.hour)) : p.hour}:${p.minute}`;
}

/** Una data `<t:N:stile>` come la scrive un client Discord nella lingua, senza lo stile R. */
export function dataDiDiscord(at: number, stile: string, zona: string, lingua: Lingua): string {
  const p = parti(at, zona, lingua);
  const ora = oraDiDiscord(at, zona, lingua);
  if (stile === 't') return ora;
  if (lingua === 'en') {
    const data = `${p.month} ${p.day}, ${p.year} ${ora}`;
    return stile === 'F' ? `${p.weekday}, ${data}` : data;
  }
  if (lingua === 'de') {
    const data = `${p.day}. ${p.month} ${p.year} ${ora}`;
    return stile === 'F' ? `${p.weekday}, ${data}` : data;
  }
  if (SPAGNOLO(lingua) || lingua === 'pt-BR') {
    const data = `${p.day} de ${p.month} de ${p.year} ${lingua === 'pt-BR' ? 'às ' : ''}${ora}`;
    return stile === 'F' ? `${p.weekday}, ${data}` : data;
  }
  const data = `${p.day} ${p.month} ${p.year} ${ora}`;
  return stile === 'F' ? `${p.weekday} ${data}` : data;
}
