/*
 * La pagina della registrazione (Registrazione.astro): legge ?modo, &misura e &t, mostra il riquadro della scena
 * alla larghezza della misura e prepara per scripts/registra-video.cjs window.render(t) e window.DURATA. Quando ha
 * finito mette window.PRONTA; un errore va nel titolo della pagina, dove lo script e la schermata lo mostrano.
 */
import { DURATA, type Modo } from '../components/home/scene-data';
import { motore, type Copione } from './render-comune';
import { copioneDelCanale } from './render-channel';

const LARGHEZZA = { wide: 720, narrow: 390 } as const;
type Misura = keyof typeof LARGHEZZA;

const COPIONI: Partial<Record<Modo, () => Copione>> = { channel: copioneDelCanale };

declare global {
  interface Window {
    render?: (t: number) => Promise<void>;
    DURATA?: number;
    PRONTA?: boolean;
  }
}

async function avvia(): Promise<void> {
  const q = new URLSearchParams(location.search);
  const modo: Modo = q.get('modo') === 'activity' ? 'activity' : 'channel';
  const misura: Misura = q.get('misura') === 'narrow' ? 'narrow' : 'wide';
  const copione = COPIONI[modo];
  if (!copione) throw new Error(`nessun copione per ${modo}`);
  document.querySelectorAll<HTMLElement>('[data-modo]').forEach((b) => {
    b.hidden = b.dataset.modo !== modo;
    b.style.width = `${LARGHEZZA[misura]}px`;
  });
  await document.fonts.ready;
  const scena = document.querySelector<HTMLElement>(`[data-modo="${modo}"] .scene`);
  if (!scena) throw new Error(`manca la scena ${modo}`);
  await Promise.all([...scena.querySelectorAll('img')].map((i) => i.decode().catch(() => undefined)));
  window.render = await motore(scena, copione());
  window.DURATA = DURATA[modo];
  const t = q.get('t');
  if (t !== null) await window.render(parseFloat(t));
  window.PRONTA = true;
}

avvia().catch((e: Error) => {
  console.error(e);
  document.title = `ERRORE: ${e.message}`;
});
