/*
 * Prepara la pagina /registrazione-esplora (RegistrazioneEsplora.astro): render(t) disegna la scena col copione
 * (render-esplora.ts, nel motore dei video della home) e poi la cornice (cornice-esplora.ts); DURATA è quella della
 * musica montata. scripts/registra-video.cjs aspetta PRONTA; con ?t la pagina resta ferma su quell'istante. Un
 * errore finisce nel titolo («ERRORE: …»), dove il registratore lo legge e si ferma.
 */
import { cornice } from './cornice-esplora';
import { DURATA } from './esplora-tempi';
import { motore } from './render-comune';
import { copioneDiEsplora } from './render-esplora';

declare global {
  interface Window {
    render?: (t: number) => Promise<void>;
    DURATA?: number;
    PRONTA?: boolean;
  }
}

/** I titoli delle didascalie vanno su due righe, come sono scritti: una riga in più vuol dire un titolo troppo lungo. */
function controllaLeDidascalie(): void {
  document.querySelectorAll<HTMLElement>('.esp-cap h2').forEach((h) => {
    const righe = Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight));
    if (righe !== 2) throw new Error(`il titolo «${h.textContent}» va su ${righe} righe invece di 2`);
  });
}

async function avvia(): Promise<void> {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.decode().catch(() => undefined)));
  controllaLeDidascalie();
  const scena = document.querySelector<HTMLElement>('#scena .scene');
  if (!scena) throw new Error('manca la scena');
  const disegna = await motore(scena, copioneDiEsplora());
  window.render = async (t: number) => {
    await disegna(t);
    cornice(t);
  };
  window.DURATA = DURATA;
  const t = new URLSearchParams(location.search).get('t');
  if (t !== null) await window.render(parseFloat(t));
  window.PRONTA = true;
}

avvia().catch((e: Error) => {
  console.error(e);
  document.title = `ERRORE: ${e.message}`;
});
