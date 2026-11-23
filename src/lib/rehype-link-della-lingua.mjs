// I link interni delle traduzioni portano alla stessa lingua (spec 2026-11-19-sito-multilingua-design.md, §4.5, nel
// repo team-tasks-manager). Chi traduce lascia i link dell'inglese (`[Premium page](/premium/)`); qui ogni `href` che
// comincia con `/` prende il prefisso della lingua del file, salvo:
// - un percorso che finisce con un'estensione (`/icons/other.png`, `/premium/premium-it.png`);
// - un percorso in una cartella di file statici (`/icons/`, `/screens/`, `/video/`, `/og/`, `/badges/`,
//   `/premium/premium-`);
// - /invite/, il passaggio verso Discord, che esiste solo in inglese.
// Anche i link dentro l'HTML scritto a mano (i riquadri `<div class="callout">`), che a questo punto della pipeline sono
// ancora testo grezzo: rehype-raw li trasforma in elementi solo dopo i plugin.
import { percorsoDelFile, traduzioneDi } from './lingua-del-file.mjs';

const STATICHE = ['/icons/', '/screens/', '/video/', '/og/', '/badges/', '/premium/premium-'];

/** L'href nella lingua del prefisso, se è un link a una pagina del sito. */
export function conPrefisso(href, prefisso) {
  if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
  const percorso = href.split(/[?#]/)[0];
  if (/\.[a-z0-9]+$/i.test(percorso)) return href;
  if (STATICHE.some((s) => percorso.startsWith(s))) return href;
  if (percorso === '/invite' || percorso === '/invite/') return href;
  if (percorso === `/${prefisso}` || percorso.startsWith(`/${prefisso}/`)) return href;
  return `/${prefisso}${href}`;
}

/** Gli href di un pezzo di HTML nella lingua del prefisso: per l'HTML grezzo e per la prosa dei casi d'uso. */
export function htmlConPrefisso(html, prefisso) {
  return html.replace(/(\shref=)(["'])(\/[^"']*)\2/g, (_, a, q, href) => `${a}${q}${conPrefisso(href, prefisso)}${q}`);
}

export default function rehypeLinkDellaLingua() {
  return (tree, file) => {
    const traduzione = traduzioneDi(percorsoDelFile(file));
    if (!traduzione) return;
    const { prefisso } = traduzione;
    const visita = (n) => {
      if (n.type === 'element' && n.tagName === 'a' && n.properties?.href) {
        n.properties.href = conPrefisso(String(n.properties.href), prefisso);
      } else if (n.type === 'raw') {
        n.value = htmlConPrefisso(n.value, prefisso);
      }
      (n.children ?? []).forEach(visita);
    };
    visita(tree);
  };
}
