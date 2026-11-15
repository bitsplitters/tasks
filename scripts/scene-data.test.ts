/*
 * Il test dei dati delle scene della home: la cascata dei gruppi e la barra, come il bot. Si lancia dalla cartella
 * tasks con `node --test scripts/scene-data.test.ts` (Node toglie da sé i tipi).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import {
  avanzamento, fraseOwnerEPromemoria, spunta, RIFIUTI, TASKS, TOOLTIP, FATTI_INIZIALI,
} from '../src/components/home/scene-data.ts';

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

// Il bundle del bot, nel repo accanto: senza, il test si salta.
const BUNDLE = new URL('../../team-tasks-manager/src/main/resources/slash-resource.properties', import.meta.url);

test('i rifiuti e la frase sul promemoria sono le parole del bot', {
  skip: !existsSync(BUNDLE) && 'manca team-tasks-manager accanto a tasks',
}, () => {
  // Come Properties di Java: gli spazi attorno a «=» non contano.
  const bundle = new Map(readFileSync(BUNDLE, 'utf8').split(/\r?\n/)
    .map((r) => /^([\w.]+)\s*=\s*(.*)$/.exec(r)).filter((m) => m !== null).map((m) => [m[1], m[2]]));
  const chiavi: Record<keyof typeof RIFIUTI, string> = {
    ownerNessuno: 'tasklist.slct.owner.noselection.error',
    ownerUguale: 'tasklist.slct.owner.sameselection.error',
    ownerAssente: 'tasklist.slct.owner.delete.notpresent.error',
    tagNessuno: 'tasklist.slct.tag.noselection.error',
    tagAssenti: 'tasklist.slct.tag.delete.notpresent.error',
  };
  for (const [k, chiave] of Object.entries(chiavi)) {
    assert.equal(RIFIUTI[k as keyof typeof RIFIUTI], bundle.get(chiave), chiave);
  }
  // Il primo paragrafo, senza l'emoji ({0}), col numero del task al posto di {1}; lo spazio indivisibile conta come
  // uno spazio.
  const domanda = bundle.get('tasklist.modal.owner.remove.question') ?? '';
  const primo = domanda.split(String.raw`\n\n`)[0].replace('{0} ', '').replace('{1}', '3');
  assert.equal(fraseOwnerEPromemoria('3').replace(/\s+/g, ' '), primo);
});
