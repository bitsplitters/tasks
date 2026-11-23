// Schede a componenti per le anteprime dei link su Discord (Component Embed): il contenuto del JSON
// che PreviewMeta mette nell'<head>. Qui vivono le due forme comuni, così ogni pagina dice soltanto
// cosa mostrare:
// - previewCard: contenitore col colore del sito, testo con il logo a destra, un'immagine
//   facoltativa, pulsanti. Per la home e le pagine della documentazione;
// - bannerCard: contenitore col colore del bot, il banner in cima, testo, pulsanti. Per la pagina
//   d'invito: è la forma della scheda di /invite del bot, barra verde compresa.
// Regole e limiti: https://docs.discord.com/developers/link-previews/component-embeds

import type { Lingua } from '../i18n/lingue.ts';
import { t } from '../i18n/t.ts';

// URL assoluti: Discord li vuole tali per immagini e pulsanti, e la scheda si apre fuori dal sito.
export const abs = (path: string) => new URL(path, import.meta.env.SITE).href;

// Le tre righe della home, le stesse della scheda della pagina d'invito e dell'immagine
// og/ttm-card.png. La scheda di /invite del bot non le usa più: dal 2026-10-26 ha i testi della
// pagina dell'App Directory. Stanno nei testi della home (`home.pitch`); /invite/ esiste solo in inglese.
export const PITCH = t('en', 'home.pitch');

// Il banner v5, lo stesso di /invite, del benvenuto e del profilo del bot (Presentazione.BANNER nel
// bot). Il file non si cancella e non si rinomina: i messaggi del bot già mandati lo puntano. Se il
// disegno cambia si sostituisce il contenuto e nei due riferimenti si aggiunge ?v=<n>, così il proxy
// di Discord non serve la copia vecchia. v=2 dal 2026-11-20: l'avatar della lista è la mascotte.
export const BANNER = {
  path: '/og/ttm-banner.png?v=2',
  width: 1200,
  height: 630,
  alt: 'Team Tasks Manager: "Give your team a boost! Nothing to learn. Just click." Next to it, a task list in a Discord channel, with ticked tasks, a reminder and the task owners.',
};

// I pulsanti possono essere solo link (style 5): con un'altra forma o una chiave in più Discord
// scarta l'intero payload, senza segnalarlo.
export interface Link { label: string; url: string; }
export interface Picture { url: string; alt: string; }

const buttons = (links: Link[]) => ({
  type: 1,
  components: links.map((l) => ({ type: 2, style: 5, label: l.label, url: l.url })),
});

export function previewCard(text: string, links: Link[], picture?: Picture, lingua: Lingua = 'en') {
  return {
    type: 17,
    accent_color: 0xE9A44C,
    components: [
      {
        type: 9,
        components: [{ type: 10, content: text }],
        accessory: { type: 11, media: { url: abs('/og/ttm-logo.png?v=2') }, description: t(lingua, 'comune.anteprima.logo') },
      },
      ...(picture ? [{ type: 12, items: [{ media: { url: picture.url }, description: picture.alt }] }] : []),
      buttons(links),
    ],
  };
}

// La scheda col banner in cima e senza il logo, che il banner porta già. La barra è il verde del bot
// (`embed.color` del bot, 30,199,133: la spunta del logo), come nella scheda di /invite del bot:
// l'ambra è il colore del sito, non dell'invito.
export function bannerCard(text: string, links: Link[]) {
  return {
    type: 17,
    accent_color: 0x1EC785,
    components: [
      { type: 12, items: [{ media: { url: abs(BANNER.path) }, description: BANNER.alt }] },
      { type: 10, content: text },
      buttons(links),
    ],
  };
}

// Titoli e descrizioni arrivano dal frontmatter, e nel testo della scheda diventano markdown di
// Discord: un `*` o un `_` in un titolo si trasformerebbe in formattazione.
export const md = (s: string) => s.replace(/[\\*_~`|[\]]/g, '\\$&');

// Scheda di una pagina della documentazione: titolo cliccabile, descrizione, e i due passi naturali
// di chi riceve il link — leggere la pagina o aggiungere il bot. I testi nella lingua della pagina; il pulsante
// d'invito porta a /invite/, che esiste solo in inglese.
export function docsCard(
  lingua: Lingua, title: string, description: string | undefined, path: string,
  readLabel = t(lingua, 'comune.anteprima.leggi'),
) {
  const url = abs(path);
  const body = description ? `\n${md(description)}` : '';
  return previewCard(
    `## [${md(title)}](${url})${body}\n-# ${t(lingua, 'comune.anteprima.docs')}`,
    [
      { label: readLabel, url },
      { label: t(lingua, 'comune.anteprima.aggiungi'), url: abs('/invite/') },
    ],
    undefined,
    lingua,
  );
}
