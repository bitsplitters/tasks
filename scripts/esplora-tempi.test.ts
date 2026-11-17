/*
 * I tempi del video di Esplora sull'Activity (src/video/esplora-tempi.ts; piano 2026-11-17-video-activity-esplora,
 * nel repo team-tasks-manager): la griglia del brano, le scene sugli attacchi, la chiusura e il montaggio della
 * musica. Si lancia dalla radice: node --test "scripts/*.test.ts".
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CHIUSURA, DURATA, MONTAGGIO, SCENE, battuta } from '../src/video/esplora-tempi.ts';

/** Uguali al millisecondo: gli attacchi sono stati misurati con questa precisione. */
function circa(valore: number, atteso: number, cosa: string): void {
  assert.ok(Math.abs(valore - atteso) < 0.001, `${cosa}: ${valore} invece di ${atteso}`);
}

test('la griglia del brano: gli attacchi misurati il 17/11', () => {
  circa(battuta(1), 0.206, 'la battuta 1');
  circa(battuta(3), 3.635, 'la battuta 3');
  circa(battuta(8), 12.208, 'la battuta 8');
  circa(battuta(16, 3), 26.781, 'il terzo battito della battuta 16');
  circa(battuta(17), 27.638, 'la battuta 17');
});

test("le scene: cinque, una dopo l'altra, dalla battuta 3 a dove entra la chiusura", () => {
  assert.equal(SCENE.length, 5);
  assert.deepEqual(SCENE.map(([inizio]) => inizio), [3, 5, 8, 11, 14].map((n) => battuta(n)));
  for (let i = 1; i < SCENE.length; i++) assert.equal(SCENE[i][0], SCENE[i - 1][1], `la scena ${i + 1}`);
  assert.equal(SCENE[4][1], CHIUSURA[0]);
});

test('il montaggio: il taglio 5 ms prima della battuta 17, la chiusura piena lì, la durata della musica', () => {
  circa(MONTAGGIO.taglio, battuta(17) - 0.005, 'il taglio');
  assert.equal(CHIUSURA[1], battuta(17));
  const [da, a] = MONTAGGIO.coda;
  circa(MONTAGGIO.taglio + (a - da) - MONTAGGIO.dissolvenza, DURATA, 'la musica montata');
});
