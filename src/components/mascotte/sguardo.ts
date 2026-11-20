/*
 * Dove guardano gli occhi della mascotte che sbircia (spec 2026-11-21-mascotte-nel-sito-design.md, §3.2, nel repo
 * team-tasks-manager). Funzioni pure, in unità del disegno di sbircia.svg: lo script le applica al gruppo delle
 * pupille (sbircia.ts).
 */

/** L'ellisse in cui si muovono le pupille: LIMITE di gen_mascotte.py, che controlla_occhi() verifica. */
export const LIMITE = { x: 10, y: 23 } as const;
/** Lo sguardo di riposo, in basso a sinistra: SGUARDO_RIPOSO di gen_mascotte.py, quello disegnato nello SVG. */
export const RIPOSO = { x: -7, y: 8 } as const;
/** Da questa distanza in su, in px dello schermo, le pupille arrivano al bordo dell'ellisse. */
export const PIENO_PX = 320;

/**
 * Lo spostamento delle pupille col puntatore a (dx, dy) px dal punto fra gli occhi: nella sua direzione, tanto più
 * quanto è lontano, fino al bordo dell'ellisse dei limiti.
 */
export function spostamento(dx: number, dy: number): { x: number; y: number } {
  const d = Math.hypot(dx, dy);
  if (d === 0) return { x: 0, y: 0 };
  const ux = dx / d;
  const uy = dy / d;
  const bordo = 1 / Math.hypot(ux / LIMITE.x, uy / LIMITE.y);
  const quanto = Math.min(1, d / PIENO_PX);
  return { x: ux * bordo * quanto, y: uy * bordo * quanto };
}
