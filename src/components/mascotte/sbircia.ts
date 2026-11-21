/*
 * La mascotte che sbircia (Sbircia.astro; spec 2026-11-21-mascotte-nel-sito-design.md, §3, nel repo
 * team-tasks-manager): sale da dietro il bordo del contenitore la prima volta che lo si vede, segue il puntatore
 * con gli occhi e diventa contenta sul suo bersaglio. Con meno animazioni non fa nulla: lo script inline del
 * componente non l'ha nascosta, e resta ferma al suo posto, con lo sguardo di riposo.
 */
import { RIPOSO, spostamento } from './sguardo.ts';

/** Il punto fra i due occhi (169 e 235, a y 163) in frazioni del riquadro di sbircia.svg (86 56 349 230). */
const FRA_GLI_OCCHI = { x: (202 - 86) / 349, y: (163 - 56) / 230 };
/** L'attesa prima della salita quando il contenitore si vede già all'apertura, perché la si veda salire. */
const ATTESA_MS = 400;

export function avviaSbirce(): void {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-sbircia]').forEach(avvia);
}

function avvia(el: HTMLElement): void {
  const pupille = el.querySelector<SVGGElement>('.mx-pupille');
  const contenitore = el.parentElement;
  if (!pupille || !contenitore) return;
  sali(el, contenitore);
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) segui(el, pupille);
  const sel = el.dataset.bersaglio;
  const bersaglio = sel ? document.querySelector<HTMLElement>(sel) : null;
  if (bersaglio) contenta(el, bersaglio);
}

/** La salita, una volta: quando il contenitore si vede per metà, o per mezzo schermo se è più alto. */
function sali(el: HTMLElement, contenitore: HTMLElement): void {
  let prima = true;
  const io = new IntersectionObserver((voci) => {
    const v = voci[voci.length - 1];
    const meta = (v.rootBounds?.height ?? window.innerHeight) / 2;
    if (v.isIntersecting && (v.intersectionRatio >= 0.5 || v.intersectionRect.height >= meta)) {
      io.disconnect();
      window.setTimeout(() => el.classList.remove('mx-attesa'), prima ? ATTESA_MS : 0);
    }
    prima = false;
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  io.observe(contenitore);
}

/** Gli occhi verso il puntatore, a ogni fotogramma in cui si è mosso; a riposo quando esce dalla pagina. */
function segui(el: HTMLElement, pupille: SVGGElement): void {
  let x = 0;
  let y = 0;
  let fuori = true;
  let chiesto = false;
  const metti = (p: { x: number; y: number }) =>
    pupille.setAttribute('transform', `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`);
  const aggiorna = () => {
    chiesto = false;
    if (fuori || el.classList.contains('mx-attesa')) {
      metti(RIPOSO);
      return;
    }
    const r = el.getBoundingClientRect();
    metti(spostamento(x - (r.left + r.width * FRA_GLI_OCCHI.x), y - (r.top + r.height * FRA_GLI_OCCHI.y)));
  };
  const chiedi = () => {
    if (chiesto) return;
    chiesto = true;
    requestAnimationFrame(aggiorna);
  };
  window.addEventListener('pointermove', (e) => {
    x = e.clientX;
    y = e.clientY;
    fuori = false;
    chiedi();
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => {
    fuori = true;
    chiedi();
  });
  window.addEventListener('scroll', chiedi, { passive: true });
}

/** Contenta col puntatore sul bersaglio, o col focus da tastiera dentro di lui. */
function contenta(el: HTMLElement, bersaglio: HTMLElement): void {
  let sopra = false;
  let fuoco = false;
  const aggiorna = () => {
    if (sopra || fuoco) el.dataset.umore = 'contento';
    else delete el.dataset.umore;
  };
  bersaglio.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'touch') return;
    sopra = true;
    aggiorna();
  });
  bersaglio.addEventListener('pointerleave', () => {
    sopra = false;
    aggiorna();
  });
  bersaglio.addEventListener('focusin', (e) => {
    fuoco = e.target instanceof Element && e.target.matches(':focus-visible');
    aggiorna();
  });
  bersaglio.addEventListener('focusout', (e) => {
    fuoco = e.relatedTarget instanceof Node && bersaglio.contains(e.relatedTarget);
    aggiorna();
  });
}
