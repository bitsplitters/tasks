/*
 * La cornice del video di Esplora sull'Activity (spec 2026-11-17-video-activity-esplora-design.md, §3-§5, nel repo
 * team-tasks-manager): l'apertura, le didascalie a sinistra, la scena che entra da sotto col marchio, la chiusura.
 * Ha i valori del primo video (team-tasks-manager/docs/brand/video_app_directory.html, render): l'apertura cresce da
 * 0,96 e sfuma in 0,6 s, la scena sale di 30 px, le didascalie salgono di 24 px, la chiusura cresce da 0,97. I tempi
 * vengono da esplora-tempi.ts: ogni didascalia resta per tutta la sua scena e cambia sull'attacco della scena dopo.
 */
import { CHIUSURA, SCENE } from './esplora-tempi';
import { easeInOutCubic, tra } from './render-comune';

/** Da 0 a 1 fra a e b, con l'andatura morbida (seg del primo video). */
const seg = (t: number, a: number, b: number) => easeInOutCubic(tra(t, a, b));
/** Dentro fra a e b, con dissolvenze di d secondi ai bordi (fin del primo video). */
const fin = (t: number, a: number, b: number, d: number) => Math.min(seg(t, a, a + d), 1 - seg(t, b - d, b));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

/** L'apertura resta fino a 3,0 s e sfuma in 0,6: all'attacco della battuta 3 (3,635 s) è sparita. */
const APERTURA = 3.6;
/** La scena entra mentre l'apertura sfuma ed esce in 0,5 s mentre entra la chiusura, come nel primo video. */
const PALCO: readonly [number, number] = [3.3, CHIUSURA[0] + 0.3];
/** Ai confini delle scene una didascalia esce in 0,3 s, poi la successiva entra in 0,3 s. */
const INCROCIO = 0.3;

function el(id: string): HTMLElement {
  const e = document.getElementById(id);
  if (!e) throw new Error(`la cornice non ha #${id}`);
  return e;
}

/** La cornice all'istante t. */
export function cornice(t: number): void {
  const apertura = el('intro');
  apertura.style.opacity = String(fin(t, 0, APERTURA, 0.6));
  apertura.style.transform = `scale(${lerp(0.96, 1, seg(t, 0, 1.2))})`;

  el('stage').style.opacity = String(fin(t, PALCO[0], PALCO[1], 0.5));
  el('scena').style.transform = `translateY(${lerp(30, 0, seg(t, PALCO[0], PALCO[0] + 0.7))}px)`;
  SCENE.forEach(([a, b], i) => {
    const didascalia = el(`cap${i + 1}`);
    didascalia.style.opacity = String(fin(t, a, b, INCROCIO));
    didascalia.style.transform = `translateY(calc(-50% + ${(1 - seg(t, a, a + INCROCIO)) * 24}px))`;
  });

  const chiusura = el('outro');
  chiusura.style.opacity = String(seg(t, CHIUSURA[0], CHIUSURA[1]));
  chiusura.style.transform = `scale(${lerp(0.97, 1, seg(t, CHIUSURA[0], CHIUSURA[0] + 1.2))})`;
}
