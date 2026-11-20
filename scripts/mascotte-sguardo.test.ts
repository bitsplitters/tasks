/*
 * Lo sguardo della mascotte che sbircia (spec 2026-11-21-mascotte-nel-sito-design.md, §3.2, nel repo
 * team-tasks-manager): le pupille seguono il puntatore senza uscire dagli occhi. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { LIMITE, PIENO_PX, RIPOSO, spostamento } from '../src/components/mascotte/sguardo.ts';

/** Quanto un punto sta verso il bordo dell'ellisse dei limiti: 1 sul bordo. */
const verso = (p: { x: number; y: number }) => (p.x / LIMITE.x) ** 2 + (p.y / LIMITE.y) ** 2;

test('le pupille restano dentro l\'ellisse dei limiti, in ogni direzione e a ogni distanza', () => {
  for (let k = 0; k < 360; k += 5) {
    const a = (k * Math.PI) / 180;
    for (const d of [1, 40, 160, PIENO_PX, 2000]) {
      assert.ok(verso(spostamento(d * Math.cos(a), d * Math.sin(a))) <= 1 + 1e-9, `${k}° a ${d} px`);
    }
  }
});

test('col puntatore fra gli occhi le pupille stanno al centro', () => {
  assert.deepEqual(spostamento(0, 0), { x: 0, y: 0 });
});

test('lo spostamento cresce con la distanza ed è pieno da PIENO_PX in su', () => {
  assert.ok(spostamento(80, 0).x < spostamento(160, 0).x);
  assert.ok(Math.abs(verso(spostamento(PIENO_PX, 0)) - 1) < 1e-9);
  assert.ok(Math.abs(verso(spostamento(0, 5000)) - 1) < 1e-9);
  assert.ok(Math.abs(spostamento(-PIENO_PX, 0).x + LIMITE.x) < 1e-9);
});

test('lo sguardo di riposo sta dentro i limiti ed è quello disegnato in sbircia.svg', () => {
  assert.ok(verso(RIPOSO) <= 1);
  const svg = readFileSync(new URL('../src/assets/mascotte/sbircia.svg', import.meta.url), 'utf8');
  assert.ok(svg.includes(`class="mx-pupille" transform="translate(${RIPOSO.x} ${RIPOSO.y})"`));
});
