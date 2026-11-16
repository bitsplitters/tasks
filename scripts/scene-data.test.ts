/*
 * Il test dei testi delle scene della home: ogni pulsante ha il suo tooltip. La spunta, la barra e i testi del bot
 * hanno i loro test accanto ai moduli di demo/ (demo-regole.test.ts, demo-testi.test.ts). Si lancia dalla cartella
 * tasks con `node --test scripts/scene-data.test.ts` (Node toglie da sé i tipi).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TOOLTIP } from '../src/components/home/scene-data.ts';

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
