// Schede a componenti per le anteprime dei link su Discord (Component Embed): il contenuto del JSON
// che PreviewMeta mette nell'<head>. Qui vive la forma comune — contenitore col colore del sito,
// testo con il logo a destra, un'immagine facoltativa, pulsanti — così ogni pagina dice soltanto
// cosa mostrare. Regole e limiti: https://docs.discord.com/developers/link-previews/component-embeds

// URL assoluti: Discord li vuole tali per immagini e pulsanti, e la scheda si apre fuori dal sito.
export const abs = (path: string) => new URL(path, import.meta.env.SITE).href;

// Le tre righe della home, le stesse della scheda di /invite e dell'immagine og/ttm-card.png.
export const PITCH = '## Team Tasks Manager\nCoordinate your team where it already talks.\n- Shared checklists inside the channel\n- Tasks for people or roles\n- Automatic reminders';

// I pulsanti possono essere solo link (style 5): con un'altra forma o una chiave in più Discord
// scarta l'intero payload, senza segnalarlo.
export interface Link { label: string; url: string; }
export interface Picture { url: string; alt: string; }

export function previewCard(text: string, links: Link[], picture?: Picture) {
  return {
    type: 17,
    accent_color: 0xE9A44C,
    components: [
      {
        type: 9,
        components: [{ type: 10, content: text }],
        accessory: { type: 11, media: { url: abs('/og/ttm-logo.png') }, description: 'Team Tasks Manager logo' },
      },
      ...(picture ? [{ type: 12, items: [{ media: { url: picture.url }, description: picture.alt }] }] : []),
      { type: 1, components: links.map((l) => ({ type: 2, style: 5, label: l.label, url: l.url })) },
    ],
  };
}

// Titoli e descrizioni arrivano dal frontmatter, e nel testo della scheda diventano markdown di
// Discord: un `*` o un `_` in un titolo si trasformerebbe in formattazione.
export const md = (s: string) => s.replace(/[\\*_~`|[\]]/g, '\\$&');

// Scheda di una pagina della documentazione: titolo cliccabile, descrizione, e i due passi naturali
// di chi riceve il link — leggere la pagina o aggiungere il bot.
export function docsCard(title: string, description: string | undefined, path: string, readLabel = 'Read the guide') {
  const url = abs(path);
  const body = description ? `\n${md(description)}` : '';
  return previewCard(
    `## [${md(title)}](${url})${body}\n-# Team Tasks Manager docs`,
    [
      { label: readLabel, url },
      { label: 'Add to Discord', url: abs('/invite/') },
    ],
  );
}
