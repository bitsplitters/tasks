/*
 * La lingua della demo e delle scene della home (spec 2026-11-19-sito-multilingua-design.md, §10, nel repo
 * team-tasks-manager): quella della pagina. I pezzi della demo (testi del bot, di Discord, la lista, le date) la leggono
 * da qui invece di riceverla a ogni chiamata: sono tanti, e la lingua è una sola per pagina.
 *
 * Chi la imposta:
 * - nel browser, l'ingresso della demo, dei tooltip e della registrazione dei video, da `<html lang>` (linguaDellaPagina);
 * - al build, ChannelScene e ActivityScene, dalla loro prop `lingua`, prima di comporre qualsiasi testo. Astro rende
 *   una pagina alla volta (build.concurrency vale 1): la lingua di una pagina non si mescola con quella di un'altra.
 */
import { LINGUE, type Lingua } from '../../../i18n/lingue.ts';

let corrente: Lingua = 'en';

/** La lingua dei testi della demo. */
export const linguaDellaDemo = (): Lingua => corrente;

export function usaLingua(lingua: Lingua): void {
  corrente = lingua;
}

/** La lingua di `<html lang>`, nel browser; l'inglese per un codice che il sito non ha. */
export function linguaDellaPagina(): Lingua {
  const lang = typeof document === 'undefined' ? '' : document.documentElement.lang;
  return LINGUE.find((l) => l.codice === lang)?.codice ?? 'en';
}
