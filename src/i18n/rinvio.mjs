/*
 * La lingua di chi visita (spec 2026-11-19-sito-multilingua-design.md, §5, nel repo team-tasks-manager). Funzioni
 * pure in JavaScript semplice, senza import: Base.astro le scrive per intero nello script inline in testa alla pagina
 * (con toString), e percorsi.ts le usa al build. Così il rinvio del browser e i link del sito cambiano lingua con lo
 * stesso codice. `prefissi` è la mappa codice → prefisso (`{ en: '', it: 'it' }`): nello script inline solo le lingue
 * pubblicate.
 */

/** La lingua di un percorso, dal primo segmento: `/it/docs/` → `it`; senza prefisso noto, `en`. */
export function linguaDelPercorso(pathname, prefissi) {
  const primo = String(pathname).split('/')[1] || '';
  for (const codice in prefissi) {
    if (prefissi[codice] && prefissi[codice] === primo) return codice;
  }
  return 'en';
}

/** Lo stesso percorso nell'altra lingua: `/it/docs/reminders/` → `/docs/reminders/` per `en`, e viceversa. */
export function equivalente(pathname, lingua, prefissi) {
  const da = linguaDelPercorso(pathname, prefissi);
  const base = da === 'en' ? pathname : pathname.slice(prefissi[da].length + 1) || '/';
  const prefisso = prefissi[lingua];
  return prefisso ? '/' + prefisso + base : base;
}

/**
 * La prima lingua di `navigator.languages` che corrisponde a una lingua pubblicata, secondo la tabella del §5; senza
 * corrispondenze, l'inglese. Lo spagnolo senza regione e quello di Spagna vanno a `es-ES`, ogni altro `es-*` a
 * `es-419`; ogni portoghese a `pt-BR`.
 */
export function linguaDelBrowser(preferite, pubblicate) {
  for (const p of preferite || []) {
    const l = String(p).toLowerCase();
    const radice = l.split('-')[0];
    let c = null;
    if (radice === 'en') c = 'en';
    else if (radice === 'it') c = 'it';
    else if (radice === 'de') c = 'de';
    else if (radice === 'fr') c = 'fr';
    else if (l === 'es' || l === 'es-es') c = 'es-ES';
    else if (radice === 'es') c = 'es-419';
    else if (radice === 'pt') c = 'pt-BR';
    if (c && pubblicate.indexOf(c) >= 0) return c;
  }
  return 'en';
}

/**
 * La lingua in cui mostrare la pagina: la scelta salvata, se è una lingua pubblicata; altrimenti, su una pagina
 * inglese, quella del browser; altrimenti la lingua della pagina. Una pagina tradotta senza scelta non si rinvia: il
 * crawler di Google ha il browser in inglese e nessuna scelta, e un link tradotto condiviso è già una scelta.
 */
export function linguaDaMostrare(salvata, pagina, preferite, pubblicate) {
  if (salvata && pubblicate.indexOf(salvata) >= 0) return salvata;
  if (pagina === 'en') return linguaDelBrowser(preferite, pubblicate);
  return pagina;
}
