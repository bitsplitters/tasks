/*
 * La prima riga dell'Activity della demo (src/components/home/demo/primariga.ts; piano 2026-11-15-demo-fedele,
 * compito 12, nel repo team-tasks-manager): i rifiuti prima dei dialoghi come FirstRow, i testi dei dialoghi di
 * activity/src/features/dialogs, la guida, New date di Reopen all. Si lancia dalla radice:
 * node --test "scripts/*.test.ts".
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROPOSTO, ZONA, fusoDi, posizione, statoIniziale } from '../src/components/home/demo/modello.ts';
import type { Stato } from '../src/components/home/demo/modello.ts';
import { escape } from '../src/components/home/demo/markdown.ts';
import { imparaIlFuso, testoDellaLista } from '../src/components/home/demo/regole.ts';
import {
  PAGINE, bloccoDellaPrimaRiga, corpoDellUscita, corpoDellaModifica, corpoDellaPulizia, corpoDellaRiapertura,
  dialogoDellUscita, htmlDelPiedeDellaGuida, htmlDellaGuida, nuovaDataProposta, primaDelDialogo,
  problemaDellaNuovaData, riaperturaPronta, riapriNellActivity,
} from '../src/components/home/demo/primariga.ts';
import { rispostaDellEsito } from '../src/components/home/demo/testi.ts';

const S0 = statoIniziale();
const TUTTI = ['1', '2', '2.1', '3', '4'];
/** La lista della demo coi soli task di `fatti` completati. */
const conFatti = (fatti: readonly string[], s: Stato = S0): Stato => ({
  ...s,
  lista: { ...s.lista, tasks: s.lista.tasks.map((t) => ({ ...t, fatto: fatti.includes(posizione(t.pos)) })) },
});
const TITOLO = 'Roster &amp; scrims — week 12';

test("Clean the list: nessun completato, o tutti; il fumetto lo dice coi testi dell'Activity", () => {
  assert.deepEqual(primaDelDialogo(conFatti([]), 'clean'),
    { tipo: 'rifiuto', testo: { chiave: 'activity.clean.none' } });
  assert.equal(rispostaDellEsito(primaDelDialogo(conFatti([]), 'clean')),
    '<:tip:0> No task is completed: there is nothing to clean.');
  assert.deepEqual(primaDelDialogo(conFatti(TUTTI), 'clean'),
    { tipo: 'rifiuto', testo: { chiave: 'activity.clean.all' } });
  assert.equal(rispostaDellEsito(primaDelDialogo(conFatti(TUTTI), 'clean')),
    '<:tip:0> All the tasks are completed: cleaning would leave the list empty. To delete a list, use the channel.');
  assert.deepEqual(primaDelDialogo(S0, 'clean'),
    { tipo: 'domanda', domanda: { tipo: 'pulisci', completati: 1, avvertenza: 'plain' } });
});

test('Reopen all: senza completati il rifiuto del canale; sennò il dialogo, con New date per un promemoria', () => {
  assert.equal(rispostaDellEsito(primaDelDialogo(conFatti([]), 'reopen')),
    '<:tip:0> No task is completed: there is nothing to reopen.');
  assert.deepEqual(primaDelDialogo(S0, 'reopen'),
    { tipo: 'domanda', domanda: { tipo: 'riapri', spuntati: 1, nuovaData: false } });
  assert.deepEqual(primaDelDialogo(conFatti(['1', '3']), 'reopen'),
    { tipo: 'domanda', domanda: { tipo: 'riapri', spuntati: 2, nuovaData: true } });
});

test('con Save acceso nel pannello Edit, Clean e Reopen all aspettano: il fumetto dice quale task', () => {
  assert.equal(bloccoDellaPrimaRiga('2.1'),
    '<:tip:0> You are changing task 2.1: Edit, Clean and Reopen all wait until you save or close its panel.');
});

test("il dialogo di Clean the list: la domanda del canale col titolo, poi la nota dell'Activity", () => {
  const html = corpoDellaPulizia(S0, 2);
  assert.match(html, /^<div class="ui-dlgtesto"><div><img class="sc-emoji" src="\/icons\/clean_blue.png" alt=""> /);
  assert.ok(html.includes(`Remove the 2 completed tasks of <strong>${TITOLO}</strong>?</div>`));
  assert.ok(html.endsWith('<div><span class="sc-subtext">The summary at the end of the session records how many ' +
    'tasks you removed.</span></div></div>'));
  assert.equal(html.match(/<div>/g)?.length, 2);
  assert.match(corpoDellaPulizia(S0, 1), /Remove the only completed task of/);
});

test('il dialogo di Reopen all: la domanda; il suggerimento di New date finché i campi non si aprono', () => {
  const html = corpoDellaRiapertura(S0, 2, true);
  assert.match(html, /^<div class="ui-dlgtesto"><div><img class="sc-emoji" src="\/icons\/reopen_blue.png" alt=""> /);
  assert.ok(html.includes(`Reopen the 2 completed tasks of <strong>${TITOLO}</strong>?<br><br>Every task goes back ` +
    'to to-do: those with a webhook call it.</div>'));
  assert.match(html, /<div><span class="sc-subtext">With <strong>New date<\/strong> you also move the reminders/);
  assert.doesNotMatch(corpoDellaRiapertura(S0, 2, false), /New date/);
});

test("il dialogo di Exit: chi altro c'è nella sessione e ciò che si fa solo nel canale", () => {
  const html = corpoDellUscita(S0);
  assert.match(html, /^<div class="ui-dlgtesto"><div>Someone else is working on the list with you\. You can leave /);
  assert.match(html, /<div><span class="sc-subtext">Only in the channel: Clone, Download, Seal, Delete, Unlock /);
});

test('il dialogo di Exit intero: il titolo, il corpo, Bring back in grigio e Leave on your own in blu', () => {
  assert.deepEqual(dialogoDellUscita(S0), {
    titolo: 'Exit the Activity',
    corpo: corpoDellUscita(S0),
    piede: [
      { id: 'all', testo: 'Bring back to the channel for everyone', stile: 'grigio' },
      { id: 'me', testo: 'Leave on your own', stile: 'blu' },
    ],
  });
});

test("il dialogo di Edit the list in sola lettura: l'avviso, il titolo, il testo della lista, senza il blocco", () => {
  const html = corpoDellaModifica(S0, 7);
  assert.ok(html.startsWith('<div class="ui-avviso" role="note">For illustration only: this demo doesn\'t fully ' +
    'replicate how TTM works.</div>'));
  assert.ok(html.includes('<label class="sc-flabel" for="d-title-7">List title</label>'));
  assert.ok(html.includes(`<input class="sc-pin" type="text" id="d-title-7" data-k="d-title" value="${TITOLO}" ` +
    'maxlength="90" readonly>'));
  assert.ok(html.includes('<label class="sc-flabel" for="d-list-7">List of activities</label>'));
  assert.ok(html.includes('<textarea class="sc-pin ui-edittesto" id="d-list-7" data-k="d-list" rows="12" ' +
    `maxlength="4000" spellcheck="false" readonly>${escape(testoDellaLista(S0.lista))}</textarea>`));
  assert.match(html, /&lt;t:1794762840&gt; \[0m,0m,0\] &lt;@1181730456203947581&gt;: VOD review/);
  assert.doesNotMatch(html, /locked/);
});

test("la guida: cinque pagine una sull'altra, la prima in vista; a pagina 4 la legenda della prima riga", () => {
  const html = htmlDellaGuida(S0);
  assert.equal(PAGINE, 5);
  assert.equal(html.match(/class="ui-foglio"/g)?.length, 5);
  assert.match(html, /<div class="ui-foglio" data-pagina="1" data-current><strong>Tick a task by tapping its box/);
  assert.match(html, /<div class="ui-foglio" data-pagina="2"><strong>Tap the text of a task<\/strong>/);
  const voci = [...html.matchAll(/<li><img class="ui-legicona" src="\/icons\/(\w+)\.png" alt="([^"]+)" draggable=/g)];
  assert.deepEqual(voci.map((m) => `${m[1]} ${m[2]}`),
    ['doc Guide', 'edit Edit the list', 'clean Clean the list', 'reopen Reopen all', 'back Exit']);
  const cosa = [...html.matchAll(/draggable="false"><span>([^<]+)<\/span><\/li>/g)].map((m) => m[1]);
  assert.deepEqual(cosa,
    ['this guide', 'edit the list as text', 'clean the completed tasks', 'reopen the completed tasks', 'exit']);
  const legenda = html.indexOf('ui-legenda');
  assert.ok(legenda > html.indexOf('data-pagina="4"') && legenda < html.indexOf('data-pagina="5"'));
  assert.match(html, /<a href="https:\/\/tasks\.bitsplitters\.app\/docs\/activity\/" target="_blank" rel="noopener">/);
});

test('le frecce della guida: ‹ spenta a pagina 1, › spenta a pagina 5; in mezzo il numero della pagina', () => {
  const prima = htmlDelPiedeDellaGuida(1);
  assert.match(prima, /data-k="d-prev" aria-label="Previous page" title="Previous page" disabled><img src="\/icons/);
  assert.match(prima, /<span class="ui-guidapag" data-k="d-page" aria-live="polite">1 of 5<\/span>/);
  assert.match(prima, /data-k="d-next" aria-label="Next page" title="Next page"><img src="\/icons\/next\.png"/);
  const ultima = htmlDelPiedeDellaGuida(5);
  assert.match(ultima, /data-k="d-prev" aria-label="Previous page" title="Previous page"><img src="\/icons\/prev/);
  assert.match(ultima, /data-k="d-next" aria-label="Next page" title="Next page" disabled>/);
  assert.match(ultima, />5 of 5</);
});

test('New date parte da adesso più dieci minuti nel fuso di chi guarda (newWhen)', () => {
  assert.deepEqual(nuovaDataProposta(S0), { data: '2026-11-15', ora: '18:14', zona: ZONA, toccata: false });
  assert.deepEqual(nuovaDataProposta(imparaIlFuso(S0, 'Asia/Kolkata')),
    { data: '2026-11-15', ora: '22:44', zona: 'Asia/Kolkata', toccata: false });
});

test("New date a meno di 5 minuti, o passata: l'avviso e Reopen spento; senza i campi Reopen va", () => {
  const q = nuovaDataProposta(S0);
  assert.equal(problemaDellaNuovaData(q), null);
  assert.equal(riaperturaPronta(q), true);
  assert.equal(riaperturaPronta(null), true);
  const presto = { ...q, ora: '18:08' };
  assert.equal(problemaDellaNuovaData(presto),
    '<:tip:0> **Invalid reminder**. Reminder must be at least 5 minutes away from now.');
  assert.equal(riaperturaPronta(presto), false);
  assert.equal(problemaDellaNuovaData({ ...q, ora: '17:00' }), problemaDellaNuovaData(presto));
  assert.equal(problemaDellaNuovaData({ ...q, ora: '18:09' }), null);
  assert.equal(problemaDellaNuovaData({ ...q, data: '' }), null);
  assert.equal(riaperturaPronta({ ...q, data: '' }), false);
});

test("Reopen nell'Activity: tutto da fare; con New date i promemoria si spostano, il fuso si impara se toccato", () => {
  const s = conFatti(['1', '3']);
  const daFare = riapriNellActivity({ ...s, inActivity: true }, null);
  assert.deepEqual(daFare.lista.tasks.map((t) => t.fatto), [false, false, false, false, false]);
  assert.equal(daFare.inActivity, true);
  assert.deepEqual(daFare.lista.tasks[3].promemoria, S0.lista.tasks[3].promemoria);
  const domani = { ...nuovaDataProposta(s), data: '2026-11-16' };
  const spostata = riapriNellActivity(s, domani);
  assert.deepEqual(spostata.lista.tasks[3].promemoria, { at: PROPOSTO + 86400, zona: ZONA });
  assert.equal('fuso' in spostata, false);
  const tokyo = { ...domani, zona: 'Asia/Tokyo', toccata: true };
  const imparata = riapriNellActivity(s, tokyo);
  assert.equal(fusoDi(imparata), 'Asia/Tokyo');
  assert.equal(imparata.lista.tasks[3].promemoria?.zona, 'Asia/Tokyo');
  assert.equal('fuso' in riapriNellActivity(s, { ...tokyo, toccata: false }), false);
  assert.equal('fuso' in riapriNellActivity(s, { ...domani, toccata: true }), false);
});
