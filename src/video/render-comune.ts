/*
 * Il motore dei copioni dei video della home (spec 2026-11-15-home-video-e-demo-design.md, §2 e §7.1): come a
 * ottobre, render(t) disegna la scena all'istante t e scripts/registra-video.cjs ne fotografa un fotogramma alla
 * volta. Niente transizioni: lo stato a t è quello degli eventi fino a t, più gli effetti continui (dissolvenze,
 * ritagli, scorrimenti) calcolati da t. Così ogni fotogramma è lo stesso a ogni registrazione.
 *
 * Il cursore va da una fermata all'altra in MOSSA secondi, con l'andatura easeInOutCubic, e arriva sulla fermata al
 * suo istante; lì il tocco (un cerchio che si allarga e sparisce) dura TOCCO secondi e l'elemento sotto prende il
 * passaggio del mouse (.is-hover, che scene.css disegna come :hover). Le posizioni si misurano una volta sola,
 * all'avvio, sulla scena com'è all'istante di ogni fermata. Dopo un azzeramento il DOM è nuovo: non si tengono
 * riferimenti agli elementi, li si cerca a ogni fotogramma.
 */
import { chatInBasso } from '../components/home/scene-dom';

export interface Evento {
  t: number;
  fai: (scena: HTMLElement) => void;
}

/** Dove sta il cursore all'istante t: sul centro di [data-k=k], o in (x, y) come frazioni della scena. */
export interface Fermata {
  t: number;
  k?: string;
  x?: number;
  y?: number;
}

export interface Copione {
  eventi: Evento[];
  fermate: Fermata[];
  continui?: (scena: HTMLElement, t: number) => void;
}

interface Punto {
  t: number;
  k?: string;
  x: number;
  y: number;
}

const MOSSA = 0.6;
const TOCCO = 0.4;

export const easeInOutCubic = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2);
export const easeOut = (p: number) => 1 - (1 - p) ** 3;
/** Dove sta t fra a e b, da 0 a 1. */
export const tra = (t: number, a: number, b: number) => Math.min(1, Math.max(0, (t - a) / (b - a)));

/** Prepara render(t) per la scena: la fotografa com'è, misura le fermate e la rimette com'era. */
export async function motore(scena: HTMLElement, copione: Copione): Promise<(t: number) => Promise<void>> {
  const iniziale = scena.innerHTML;
  const eventi = [...copione.eventi].sort((a, b) => a.t - b.t);
  let applicati = 0;
  let ultimo = -Infinity;

  const azzera = async () => {
    scena.innerHTML = iniziale;
    applicati = 0;
    ultimo = -Infinity;
    await Promise.all([...scena.querySelectorAll('img')].map((i) => i.decode().catch(() => undefined)));
  };

  // Lo stato all'istante t. Indietro nel tempo si riparte dalla scena iniziale.
  const stato = async (t: number) => {
    if (t < ultimo) await azzera();
    ultimo = t;
    while (applicati < eventi.length && eventi[applicati].t <= t) eventi[applicati++].fai(scena);
    copione.continui?.(scena, t);
    chatInBasso(scena);
  };

  const punti: Punto[] = [];
  for (const f of [...copione.fermate].sort((a, b) => a.t - b.t)) {
    await stato(f.t);
    const s = scena.getBoundingClientRect();
    if (!f.k) {
      punti.push({ t: f.t, x: (f.x ?? 0.5) * s.width, y: (f.y ?? 0.5) * s.height });
      continue;
    }
    const r = scena.querySelector(`[data-k="${f.k}"]`)?.getBoundingClientRect();
    if (!r || r.width === 0) throw new Error(`la fermata a ${f.t} s: [data-k="${f.k}"] non si vede`);
    punti.push({ t: f.t, k: f.k, x: r.left + r.width / 2 - s.left, y: r.top + r.height / 2 - s.top });
  }
  if (punti.length === 0) throw new Error('il copione non ha fermate');
  for (let i = 1; i < punti.length; i++) {
    const [a, b] = [punti[i - 1].t, punti[i].t];
    if (b - a < MOSSA) throw new Error(`le fermate a ${a} e ${b} s sono più vicine di ${MOSSA} s`);
  }
  await azzera();

  return async (t: number) => {
    await stato(t);
    const j = punti.findIndex((p) => p.t > t);
    const prima = j === -1 ? punti[punti.length - 1] : punti[Math.max(0, j - 1)];
    const dopo = j > 0 ? punti[j] : null;
    let { x, y } = prima;
    let fermo = true;
    if (dopo) {
      const p = easeInOutCubic(tra(t, dopo.t - MOSSA, dopo.t));
      x = prima.x + (dopo.x - prima.x) * p;
      y = prima.y + (dopo.y - prima.y) * p;
      fermo = p === 0;
    }
    scena.querySelectorAll('.is-hover').forEach((e) => e.classList.remove('is-hover'));
    if (fermo && prima.k) scena.querySelector(`[data-k="${prima.k}"]`)?.classList.add('is-hover');

    // La punta della freccia sta in (5, 2.5) del suo riquadro di 24.
    const cursore = scena.querySelector<SVGSVGElement>('.sc-cursor');
    if (cursore) {
      const w = cursore.getBoundingClientRect().width;
      cursore.style.transform = `translate(${x - (5 / 24) * w}px, ${y - (2.5 / 24) * w}px)`;
    }
    const tocco = scena.querySelector<HTMLElement>('.sc-tap');
    if (tocco) {
      const p = prima.k && t >= prima.t ? (t - prima.t) / TOCCO : 1;
      const w = tocco.offsetWidth;
      tocco.style.opacity = p < 1 ? String(0.55 * (1 - p)) : '0';
      tocco.style.transform = `translate(${x - w / 2}px, ${y - w / 2}px) scale(${0.4 + 1.2 * Math.min(1, p)})`;
    }
  };
}
