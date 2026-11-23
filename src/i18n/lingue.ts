/*
 * Le lingue del sito (spec 2026-11-19-sito-multilingua-design.md, §2 e §3, nel repo team-tasks-manager): le sette dei
 * bundle del bot. `pubblicata` è l'interruttore: una lingua spenta non ha pagine, voce nel selettore e nel piè di
 * pagina, hreflang, righe nella sitemap né rinvii verso di lei. Dal 2026-11-23 (§16) sono accesi l'inglese e
 * l'italiano; le altre cinque aspettano le loro traduzioni.
 */
export type Lingua = 'en' | 'it' | 'de' | 'fr' | 'es-ES' | 'es-419' | 'pt-BR';

export interface DatiLingua {
  /** Il codice della lingua, quello di `<html lang>` e di hreflang. */
  codice: Lingua;
  /** La cartella degli indirizzi (`/it/…`); l'inglese non ne ha. */
  prefisso: string;
  /** Il nome nel menu del selettore e nel piè di pagina, scritto nella sua lingua. */
  nome: string;
  /** La sigla del selettore chiuso: «EN ▾». */
  sigla: string;
  /** Il suffisso del bundle del bot: `slash-resource${bundle}.properties`. */
  bundle: string;
  /** Il locale di Intl per date, numeri e plurali. */
  intl: string;
  /** og:locale. */
  og: string;
  pubblicata: boolean;
}

export const LINGUE: readonly DatiLingua[] = [
  { codice: 'en', prefisso: '', nome: 'English', sigla: 'EN', bundle: '', intl: 'en-GB', og: 'en_GB', pubblicata: true },
  { codice: 'it', prefisso: 'it', nome: 'Italiano', sigla: 'IT', bundle: '_it', intl: 'it', og: 'it_IT', pubblicata: true },
  { codice: 'de', prefisso: 'de', nome: 'Deutsch', sigla: 'DE', bundle: '_de', intl: 'de', og: 'de_DE', pubblicata: false },
  { codice: 'fr', prefisso: 'fr', nome: 'Français', sigla: 'FR', bundle: '_fr', intl: 'fr', og: 'fr_FR', pubblicata: false },
  {
    codice: 'es-ES', prefisso: 'es', nome: 'Español (España)', sigla: 'ES', bundle: '_es_ES', intl: 'es-ES', og: 'es_ES',
    pubblicata: false,
  },
  {
    codice: 'es-419', prefisso: 'es-419', nome: 'Español (Latinoamérica)', sigla: 'LATAM', bundle: '_es_419',
    intl: 'es-419', og: 'es_LA', pubblicata: false,
  },
  {
    codice: 'pt-BR', prefisso: 'pt-br', nome: 'Português (Brasil)', sigla: 'PT', bundle: '_pt_BR', intl: 'pt-BR',
    og: 'pt_BR', pubblicata: false,
  },
];

export const LINGUE_PUBBLICATE: readonly DatiLingua[] = LINGUE.filter((l) => l.pubblicata);

/** Le lingue pubblicate tranne l'inglese: quelle che hanno le route sotto `src/pages/[lingua]/`. */
export const TRADOTTE: readonly DatiLingua[] = LINGUE_PUBBLICATE.filter((l) => l.codice !== 'en');

export function datiDi(codice: Lingua): DatiLingua {
  const l = LINGUE.find((x) => x.codice === codice);
  if (!l) throw new Error(`Lingua sconosciuta: ${codice}`);
  return l;
}

/** La lingua di un prefisso di cartella (`it`, `pt-br`), o undefined. */
export function linguaDelPrefisso(prefisso: string): Lingua | undefined {
  return LINGUE.find((l) => l.prefisso && l.prefisso === prefisso)?.codice;
}

/** I `getStaticPaths` delle route tradotte: un parametro `lingua` (il prefisso) per lingua tradotta. */
export function percorsiDelleLingue() {
  return TRADOTTE.map((l) => ({ params: { lingua: l.prefisso }, props: { lingua: l.codice } }));
}
