/*
 * Il test del modello della demo (piano 2026-11-15-demo-fedele.md, compito 2, nel repo team-tasks-manager): le due
 * liste di partenza, il server della demo, l'orologio fermo e le date come le scrivono Discord e l'Activity. Si lancia
 * dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ADESSO, COACHES, LEO, MIA, PROPOSTO, SAM, ZONA, campiDi, daiCampi, dataDelCanale, dataDellActivity, idRuoloTtm,
  listaDeiVideo, listaDellaDemo, offsetMinuti, posizione, statoIniziale,
} from '../src/components/home/demo/modello.ts';
import type { Lista } from '../src/components/home/demo/modello.ts';

/** La lista in breve: posizione, testo, completato, owner, promemoria. */
const inBreve = (lista: Lista) =>
  lista.tasks.map((t) => [posizione(t.pos), t.testo, t.fatto, t.owner?.id ?? null, t.promemoria ?? null]);

test('la lista della demo è quella della scena: il task 1 completato, il 3 con Mia e il promemoria delle 18:14', () => {
  const lista = listaDellaDemo();
  assert.equal(lista.titolo, 'Roster & scrims — week 12');
  assert.deepEqual(inBreve(lista), [
    ['1', "Confirm the five-man roster for Saturday's scrim block", true, null, null],
    ['2', 'Lock the scrim block vs. Nova Collective', false, null, null],
    ['2.1', 'Clip the three teamfights for the review', false, null, null],
    ['3', 'VOD review: mid rotations, game 3', false, MIA, { at: PROPOSTO, zona: 'Europe/Rome' }],
    ['4', 'Publish the match-day graphic', false, null, null],
  ]);
  assert.deepEqual(lista.tasks[3].owner, { tipo: 'persona', id: MIA });
});

test('ogni chiamata dà una lista nuova: cambiarne una non cambia la seguente', () => {
  const prima = listaDellaDemo();
  prima.tasks[1].testo = 'Changed';
  prima.tasks[0].fatto = false;
  prima.tasks.pop();
  assert.deepEqual(inBreve(listaDellaDemo()), inBreve(statoIniziale().lista));
  assert.equal(listaDellaDemo().tasks.length, 5);
  assert.equal(listaDellaDemo().tasks[1].testo, 'Lock the scrim block vs. Nova Collective');
});

test('la lista dei video parte senza owner e senza promemoria, col task 1 completato', () => {
  assert.deepEqual(inBreve(listaDeiVideo()), [
    ['1', "Confirm the five-man roster for Saturday's scrim block", true, null, null],
    ['2', 'Lock the scrim block vs. Nova Collective', false, null, null],
    ['2.1', 'Clip the three teamfights for the review', false, null, null],
    ['3', 'VOD review: mid rotations, game 3', false, null, null],
    ['4', 'Publish the match-day graphic', false, null, null],
  ]);
});

test('lo stato iniziale ha @Coaches con Mia e Leo, nessun ruolo di TTM, la lista sbloccata nel canale', () => {
  const stato = statoIniziale();
  assert.deepEqual(stato.ruoli, [{ id: COACHES, nome: 'Coaches', membri: [MIA, LEO], diTtm: false }]);
  assert.equal(stato.bloccata, false);
  assert.equal(stato.inActivity, false);
  assert.deepEqual(inBreve(statoIniziale(listaDeiVideo()).lista), inBreve(listaDeiVideo()));
});

test('gli id sono come quelli di Discord, da 17 a 20 cifre, e i ruoli di TTM hanno il numero in fondo', () => {
  for (const id of [MIA, LEO, SAM, COACHES, idRuoloTtm(1)]) assert.match(id, /^\d{17,20}$/);
  assert.equal(idRuoloTtm(1), '1181730456203947601');
  assert.equal(idRuoloTtm(12), '1181730456203947612');
});

test('la posizione si scrive come nella riga', () => {
  assert.equal(posizione({ main: 2, sub: 1 }), '2.1');
  assert.equal(posizione({ main: 3, sub: 0 }), '3');
});

test("l'orologio è fermo al 15 novembre 2026 alle 18:04 di Roma; il promemoria proposto è dieci minuti dopo", () => {
  assert.equal(ADESSO, Date.UTC(2026, 10, 15, 17, 4) / 1000);
  assert.equal(ADESSO, 1794762240);
  assert.equal(PROPOSTO, ADESSO + 600);
  assert.equal(ZONA, 'Europe/Rome');
});

test('lo scarto di un fuso, in minuti a est di UTC', () => {
  assert.equal(offsetMinuti(PROPOSTO, 'Europe/Rome'), 60);
  assert.equal(offsetMinuti(PROPOSTO, 'Asia/Kolkata'), 330);
  assert.equal(offsetMinuti(PROPOSTO, 'America/St_Johns'), -210);
});

test("i campi di un'ora in un fuso", () => {
  assert.deepEqual(campiDi(PROPOSTO, 'Europe/Rome'), { giorno: 15, mese: 11, anno: 2026, ora: '18:14' });
  assert.deepEqual(campiDi(PROPOSTO, 'Asia/Kolkata'), { giorno: 15, mese: 11, anno: 2026, ora: '22:44' });
});

test("l'ora dai campi, come ZonedDateTime.of: un'ora che manca va avanti del salto, una doppia prende la prima", () => {
  assert.equal(daiCampi(15, 11, 2026, '18:14', 'Europe/Rome'), PROPOSTO);
  assert.equal(daiCampi(15, 11, 2026, '22:44', 'Asia/Kolkata'), PROPOSTO);
  assert.equal(daiCampi(29, 3, 2026, '02:30', 'Europe/Rome'), Date.UTC(2026, 2, 29, 1, 30) / 1000);
  assert.equal(daiCampi(25, 10, 2026, '02:30', 'Europe/Rome'), Date.UTC(2026, 9, 25, 0, 30) / 1000);
  assert.equal(daiCampi(25, 10, 2026, '03:30', 'Europe/Rome'), Date.UTC(2026, 9, 25, 2, 30) / 1000);
});

test('le date nel canale come le scrive Discord in inglese americano, a Roma', () => {
  assert.equal(dataDelCanale(PROPOSTO), 'November 15, 2026 6:14 PM');
  assert.equal(dataDelCanale(PROPOSTO, 'F'), 'Sunday, November 15, 2026 6:14 PM');
  // L'ora sola (`<t:N:t>`), come accanto al nome nel messaggio.
  assert.equal(dataDelCanale(ADESSO, 't'), '6:04 PM');
  assert.equal(dataDelCanale(daiCampi(1, 12, 2026, '09:05', ZONA)), 'December 1, 2026 9:05 AM');
  assert.equal(dataDelCanale(daiCampi(1, 12, 2026, '00:05', ZONA)), 'December 1, 2026 12:05 AM');
});

test("le date nell'Activity come la pagina vera, in inglese britannico", () => {
  assert.equal(dataDellActivity(PROPOSTO), '15 November 2026 18:14');
  assert.equal(dataDellActivity(daiCampi(1, 12, 2026, '09:05', ZONA)), '1 December 2026 09:05');
});
