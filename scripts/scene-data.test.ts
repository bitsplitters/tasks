/*
 * Il test dei dati delle scene della home: la cascata dei gruppi e la barra, come il bot. Si lancia dalla cartella
 * tasks con `node --test scripts/scene-data.test.ts` (Node toglie da sé i tipi).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { avanzamento, spunta, TASKS, TOOLTIP, FATTI_INIZIALI } from '../src/components/home/scene-data.ts';

const insieme = (...id: string[]) => new Set(id);

test('spuntare il gruppo spunta i suoi subtask', () => {
  assert.deepEqual(spunta(insieme('1'), '2', true), insieme('1', '2', '2.1'));
});

test('despuntare il gruppo despunta i suoi subtask', () => {
  assert.deepEqual(spunta(insieme('1', '2', '2.1'), '2', false), insieme('1'));
});

test("spuntare l'ultimo subtask spunta il gruppo, despuntarlo lo riapre", () => {
  assert.deepEqual(spunta(insieme(), '2.1', true), insieme('2', '2.1'));
  assert.deepEqual(spunta(insieme('2', '2.1'), '2.1', false), insieme());
});

test('un task senza subtask cambia da solo', () => {
  assert.deepEqual(spunta(insieme('1'), '3', true), insieme('1', '3'));
});

test('la barra arrotonda al 5% per difetto, 5 con una casella, 95 finché ne manca una', () => {
  assert.equal(TASKS.length, 5);
  assert.equal(avanzamento(insieme()), 0);
  assert.equal(avanzamento(new Set(FATTI_INIZIALI)), 20);
  assert.equal(avanzamento(insieme('1', '2', '2.1')), 60);
  assert.equal(avanzamento(insieme('1', '2', '2.1', '3')), 80);
  assert.equal(avanzamento(insieme('1', '2', '2.1', '3', '4')), 100);
});

test('ogni pulsante delle scene ha il suo tooltip', () => {
  const chiavi = ['activity', 'bulk', 'clean', 'reopen', 'more', 'content', 'owner', 'tag', 'reminder', 'webhook']
    .map((k) => `ch-${k}`)
    .concat(['guide', 'edit', 'clean', 'reopen', 'exit', 'lists', 'people', 'settings'].map((k) => `ac-${k}`))
    .concat(['content', 'owner', 'tag', 'reminder', 'webhook'].map((k) => `ac-p-${k}`));
  for (const k of chiavi) assert.ok(TOOLTIP[k]?.nome && TOOLTIP[k]?.testo, k);
  assert.equal(TOOLTIP['ch-owner'].nota, 'Blue edits, red deletes.');
  assert.equal(TOOLTIP['ac-clean'].nome, 'Clean the list');
  assert.equal(TOOLTIP['ac-clean'].testo, TOOLTIP['ch-clean'].testo);
});
