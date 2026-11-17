/*
 * I tempi del video di Esplora sull'Activity (spec 2026-11-17-video-activity-esplora-design.md, §4 e §7, nel repo
 * team-tasks-manager): la griglia di «Positive Fuse» di French Fuse, misurata il 2026-11-17, su cui cadono le
 * scene, i clic del copione e la chiusura; il montaggio della musica, che scripts/registra-video.cjs riporta nel
 * suo commento. Il brano è a 140 BPM: una battuta di quattro battiti dura 1,71452 s, il primo attacco cade a
 * 0,206 s.
 */

/** Il primo attacco del brano, in secondi. */
export const ATTACCO = 0.206;
/** Una battuta, misurata sul brano: a 140 BPM esatti sarebbe 1,714286, 4 ms di differenza in 16 battute. */
export const BATTUTA = 1.71452;

/** L'istante del battito `battito` (da 1 a 4) della battuta `n` (da 1). */
export function battuta(n: number, battito = 1): number {
  return ATTACCO + (n - 1) * BATTUTA + ((battito - 1) * BATTUTA) / 4;
}

/**
 * Il montaggio (§7): il brano fino a 5 ms prima dell'attacco della battuta 17, dove finisce la prima frase; poi
 * l'ultima battuta di accordi, l'arresto e l'eco; fra i due una dissolvenza.
 */
export const MONTAGGIO = { taglio: 27.633, coda: [127.05, 131.442], dissolvenza: 0.025 } as const;

/** La durata del video: quella della musica montata. */
export const DURATA = 32;

/** Le cinque scene, [inizio, fine): ognuna dall'attacco di una battuta all'inizio della successiva. */
export const SCENE: readonly (readonly [number, number])[] = [
  [battuta(3), battuta(5)],
  [battuta(5), battuta(8)],
  [battuta(8), battuta(11)],
  [battuta(11), battuta(14)],
  [battuta(14), battuta(16, 3)],
];

/** La chiusura: entra dal terzo battito della battuta 16 ed è piena all'attacco della 17, dove arriva il finale. */
export const CHIUSURA: readonly [number, number] = [battuta(16, 3), battuta(17)];
