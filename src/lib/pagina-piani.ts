// La pagina dei piani (/premium/, src/pagine/Premium.astro) sta fuori dalla collezione docs, ma la
// documentazione la elenca in fondo al gruppo Plans. Titolo e descrizione servono alla pagina, alle due barre
// laterali e all'indice della documentazione (spec della pagina Premium, §3.10 e §5.4), nella lingua della pagina.
import type { Lingua } from '../i18n/lingue.ts';
import { percorso } from '../i18n/percorsi.ts';
import { t } from '../i18n/t.ts';

export function paginaPiani(lingua: Lingua) {
  return {
    title: t(lingua, 'premium.pagina.titolo'),
    path: percorso(lingua, '/premium/'),
    description: t(lingua, 'premium.pagina.descrizione'),
  };
}
