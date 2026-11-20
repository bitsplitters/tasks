/*
 * Il test dei messaggi effimeri del bot nel canale della demo (piano 2026-11-15-demo-fedele.md, compito 10, nel repo
 * team-tasks-manager): il ponte di Riapri tutti col suo esito; il pannello More, prima e dopo un blocco. Si
 * lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  esitoDelPonte, htmlDellAnnullamento, htmlDelPannello, htmlDelPonte,
} from '../src/components/home/demo/messaggi.ts';
import { statoIniziale } from '../src/components/home/demo/modello.ts';
import type { Stato } from '../src/components/home/demo/modello.ts';
import { invertiSpunta, riapri, riapriConfermato } from '../src/components/home/demo/regole.ts';
import type { Domanda } from '../src/components/home/demo/regole.ts';
import { AVVISO_ILLUSTRATIVO } from '../src/components/home/scene-data.ts';

/** Le chiavi dei pulsanti del messaggio, in ordine. */
const tasti = (html: string) => [...html.matchAll(/data-k="e-([a-z]+)"/g)].map((m) => m[1]);

/** Quante volte c'è il pezzo. */
const quante = (html: string, pezzo: string) => html.split(pezzo).length - 1;

/** La domanda di Riapri tutti: un altro esito fa fallire il test. */
function domandaDi(stato: Stato): Extract<Domanda, { tipo: 'riapri' }> {
  const esito = riapri(stato);
  assert.ok(esito.tipo === 'domanda' && esito.domanda.tipo === 'riapri', JSON.stringify(esito));
  return esito.domanda;
}

const EMBED = '<div class="sc-embed ui-emb"><div class="ui-td">';

test('il ponte di Riapri tutti: la domanda nell\'embed verde, poi Reopen e Cancel', () => {
  const s0 = statoIniziale();
  const html = htmlDelPonte(domandaDi(s0), s0);
  assert.ok(html.startsWith(`${EMBED}<img class="sc-emoji" src="/icons/reopen_blue.png" alt=""> Reopen the only ` +
    'completed task of <strong>Roster &amp; scrims — week 12</strong>?'), html);
  assert.match(html, /Every task goes back to to-do: those with a webhook call it\.<\/div><\/div><div class="ui-tasti">/);
  assert.doesNotMatch(html, /New date/);
  assert.deepEqual(tasti(html), ['reopen', 'cancel']);
  assert.match(html, /<button type="button" class="sc-btn sc-blue ui-scritta" data-k="e-reopen">Reopen<\/button>/);
  assert.match(html, /<button type="button" class="sc-btn ui-scritta" data-k="e-cancel">Cancel<\/button>/);
});

test('il ponte con un promemoria da spostare: la nota e New date, fra Reopen e Cancel', () => {
  const s = invertiSpunta(statoIniziale(), '3');
  const html = htmlDelPonte(domandaDi(s), s);
  assert.match(html, /Reopen the 2 completed tasks of <strong>/);
  assert.match(html, /With <strong>New date<\/strong> you also move the reminders of the tasks you reopen/);
  assert.deepEqual(tasti(html), ['reopen', 'newdate', 'cancel']);
  assert.match(html, /<button type="button" class="sc-btn ui-scritta" data-k="e-newdate">New date<\/button>/);
});

test('il ponte chiuso: la riapertura fatta, il rifiuto nell\'embed giallo, l\'annullamento; mai pulsanti', () => {
  const s0 = statoIniziale();
  const fatto = esitoDelPonte(riapriConfermato(s0), s0);
  assert.equal(fatto, `${EMBED}<img class="sc-emoji" src="/icons/reopen_blue.png" alt=""> ` +
    '<em>List reopened: every task is to-do again.</em></div></div>');
  const bloccata = { ...s0, bloccata: true };
  const no = esitoDelPonte(riapriConfermato(bloccata), bloccata);
  assert.equal(no, '<div class="sc-embed ui-emb" data-barra="gialla"><div class="ui-td"><img class="sc-emoji" ' +
    'src="/icons/tip.png" alt=""> This list can\'t be changed right now: someone is editing it, or it has been ' +
    'sealed.</div></div>');
  assert.equal(htmlDellAnnullamento(s0), `${EMBED}Reopening cancelled.</div></div>`);
});

/** La chiusura dei pannelli V2 (TTMEmbed.chiusuraV2): lo spazio, le tre emoji dei separatori, il footer in grigio. */
const CHIUSURA = '<div class="ui-spazio"></div><div class="ui-td">' +
  '<img class="sc-emoji" src="/icons/separator.png" alt="">'.repeat(3) +
  '<span class="sc-subtext">Team Tasks Manager is in beta. What does it mean? /beta</span></div></div>';

test('More: l\'avviso della demo, poi Guide, Clone list, Download, Seal list e Delete list coi pulsanti spenti', () => {
  const html = htmlDelPannello(statoIniziale());
  assert.ok(html.startsWith(`<div class="ui-cont"><div class="ui-avviso" role="note">${AVVISO_ILLUSTRATIVO}</div>` +
    '<div class="ui-voce"><div class="ui-td"><strong>Guide</strong><br>How every button of the list works, in ' +
    'short.</div><button type="button" class="sc-btn sc-blue" data-k="e-guide" aria-label="Guide" ' +
    'aria-disabled="true"><img src="/icons/doc.png" alt=""></button></div>'), html);
  assert.ok(html.endsWith(CHIUSURA), html);
  assert.deepEqual(tasti(html), ['guide', 'clone', 'download', 'seal', 'delete']);
  assert.equal(quante(html, 'aria-disabled="true"'), 5);
  assert.equal(quante(html, '<div class="ui-linea"></div>'), 4);
  assert.match(html, /<strong>Clone list<\/strong><br>Copies the list into another channel/);
  assert.match(html, /<strong>Download<\/strong><br>Downloads the list as a \.txt file/);
  assert.ok(html.includes('class="sc-btn ui-verde" data-k="e-seal" aria-label="Seal list" aria-disabled="true">' +
    '<img src="/icons/seal.png" alt="">'));
  assert.ok(html.includes('class="sc-btn ui-rosso" data-k="e-delete" aria-label="Delete list" ' +
    'aria-disabled="true"><img src="/icons/delete.png" alt="">'));
});

test('More con la lista bloccata: Unlock list in cima, accesa, per chi la modifica; niente Seal e Delete', () => {
  const html = htmlDelPannello({ ...statoIniziale(), bloccata: true });
  assert.deepEqual(tasti(html), ['unlock', 'guide', 'clone', 'download']);
  assert.ok(html.includes(`${AVVISO_ILLUSTRATIVO}</div><div class="ui-voce"><div class="ui-td"><strong>Unlock ` +
    'list</strong><br><span class="sc-mention">@Sam</span> is editing the list: its buttons are off. If they closed ' +
    'without saving, turn it back on for everyone here.</div><button type="button" class="sc-btn sc-blue" ' +
    'data-k="e-unlock" aria-label="Unlock list"><img src="/icons/unlock.png" alt=""></button></div>'), html);
  assert.equal(quante(html, 'aria-disabled="true"'), 3);
  assert.equal(quante(html, '<div class="ui-linea"></div>'), 3);
  assert.ok(html.endsWith(CHIUSURA));
});

test('More dopo Unlock list: l\'esito in cima, una linea davanti alla prima voce, di nuovo Seal e Delete', () => {
  const html = htmlDelPannello(statoIniziale(), true);
  assert.ok(html.includes(`${AVVISO_ILLUSTRATIVO}</div><div class="ui-td ui-esito"><img class="sc-emoji" ` +
    'src="/icons/unlock_blue.png" alt="">  List unlocked: its buttons work again.</div><div class="ui-linea"></div>' +
    '<div class="ui-voce">'), html);
  assert.deepEqual(tasti(html), ['guide', 'clone', 'download', 'seal', 'delete']);
  assert.equal(quante(html, '<div class="ui-linea"></div>'), 5);
});
