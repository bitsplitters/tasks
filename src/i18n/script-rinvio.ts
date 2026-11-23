/*
 * Lo script inline del rinvio alla lingua di chi visita (spec 2026-11-19-sito-multilingua-design.md, §5, nel repo
 * team-tasks-manager), che Base.astro mette in testa alla pagina prima di quello del tema: un modulo arriverebbe dopo
 * il primo disegno. Le funzioni sono quelle di rinvio.mjs, scritte per intero con toString; si chiamano col loro `name`,
 * così lo script resta giusto anche se il build le rinomina. Conosce solo le lingue pubblicate.
 */
import { LINGUE_PUBBLICATE } from './lingue.ts';
import { equivalente, linguaDaMostrare, linguaDelBrowser, linguaDelPercorso } from './rinvio.mjs';

const prefissi = Object.fromEntries(LINGUE_PUBBLICATE.map((l) => [l.codice, l.prefisso]));

export const SCRIPT_RINVIO = [
  '(function(){',
  `var P=${JSON.stringify(prefissi)};`,
  `${linguaDelPercorso}`,
  `${equivalente}`,
  `${linguaDelBrowser}`,
  `${linguaDaMostrare}`,
  // localStorage bloccato lancia: vale come nessuna scelta.
  "var s=null;try{s=localStorage.getItem('lingua')}catch(e){}",
  `var pagina=${linguaDelPercorso.name}(location.pathname,P);`,
  `var l=${linguaDaMostrare.name}(s,pagina,navigator.languages||[navigator.language],Object.keys(P));`,
  `if(l!==pagina)location.replace(${equivalente.name}(location.pathname,l,P)+location.search+location.hash);`,
  '})();',
].join('\n');
