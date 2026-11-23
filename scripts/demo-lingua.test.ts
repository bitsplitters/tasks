/*
 * La demo della home nella lingua della pagina (spec 2026-11-19-sito-multilingua-design.md, §10, nel repo
 * team-tasks-manager): i testi del bot, quelli di Discord e dei tooltip, la lista, le date e i fusi seguono
 * demo/lingua.ts. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linguaDellaDemo, usaLingua } from '../src/components/home/demo/lingua.ts';
import {
  ADESSO, dataDelCanale, dataDellActivity, listaDellaDemo, statoIniziale, webhookDellaDemo,
} from '../src/components/home/demo/modello.ts';
import { testo } from '../src/components/home/demo/testi.ts';
import { cercaZone, sulDispositivo } from '../src/components/home/demo/zone.ts';
import { avvisoIllustrativo, discord, fraseSpunta, tasti, tooltipDellaDemo } from '../src/components/home/scene-data.ts';
import { dataDelTeam } from '../src/lib/esempi/discord.ts';

/** Fa girare `f` con la demo nella lingua, e la rimette in inglese: gli altri test la vogliono così. */
function nella<T>(lingua: 'en' | 'it', f: () => T): T {
  usaLingua(lingua);
  try {
    return f();
  } finally {
    usaLingua('en');
  }
}

test("la demo nasce in inglese", () => {
  assert.equal(linguaDellaDemo(), 'en');
  assert.equal(testo('activity.here.list', 2), '2 people in this list');
  assert.equal(listaDellaDemo().titolo, 'Roster & scrims — week 12');
});

test('i testi del bot e i nomi dei pulsanti in italiano, dal bundle', () => {
  nella('it', () => {
    assert.equal(testo('activity.here.list', 2), '2 persone in questa lista');
    assert.equal(testo('activity.here.list', 1), '1 persona in questa lista');
    assert.equal(fraseSpunta(), testo('tasklist.slct.activities.hint.check'));
    assert.deepEqual(tasti().map((t) => t.nome), ['Contenuto', 'Proprietario', 'Tag', 'Promemoria', 'Webhook']);
    const tooltip = tooltipDellaDemo();
    assert.equal(tooltip['ch-owner'].nome, 'Proprietario');
    assert.equal(tooltip['ch-owner'].nota, 'Il blu modifica, il rosso elimina.');
    assert.equal(tooltip['ac-settings'].nome, 'Impostazioni');
  });
});

test('Discord, l\'avviso e la lista della demo in italiano', () => {
  nella('it', () => {
    assert.equal(discord().annulla, 'Annulla');
    assert.equal(discord().almeno(4), 'Deve contenere almeno 4 caratteri.');
    assert.equal(discord().scrivi('scrims'), 'Invia un messaggio in #scrims');
    assert.match(avvisoIllustrativo(), /^Solo a scopo illustrativo/);
    const lista = listaDellaDemo();
    assert.equal(lista.titolo, 'Roster e scrim — settimana 12');
    assert.equal(lista.tasks.length, 5);
    assert.deepEqual(webhookDellaDemo().map((w) => w.nome), ['Risultati scrim', 'Avvisi staff']);
    assert.equal(statoIniziale().ruoli[0].nome, 'Coach');
  });
});

test('le date: il client Discord e la pagina dell\'Activity nella lingua', () => {
  assert.equal(dataDelCanale(ADESSO), 'November 15, 2026 6:04 PM');
  assert.equal(dataDelCanale(ADESSO, 't'), '6:04 PM');
  assert.equal(dataDellActivity(ADESSO), '15 November 2026 18:04');
  nella('it', () => {
    assert.equal(dataDelCanale(ADESSO), '15 novembre 2026 18:04');
    assert.equal(dataDelCanale(ADESSO, 'F'), 'domenica 15 novembre 2026 18:04');
    assert.equal(dataDelCanale(ADESSO, 't'), '18:04');
    assert.equal(dataDellActivity(ADESSO), '15 novembre 2026 18:04');
    assert.match(sulDispositivo(ADESSO), /^dom 15 nov, 18:04$/);
  });
  // I casi d'uso passano la lingua da sé: la demo non li tocca.
  assert.equal(dataDelTeam(ADESSO, '', 'Europe/Rome', 'it'), '15 novembre 2026 18:04');
});

test('i fusi: i paesi nella lingua della demo, una tabella per lingua', () => {
  const [roma] = cercaZone('rome', ADESSO);
  assert.equal(roma.paese, 'Italy');
  const [romaIt] = nella('it', () => cercaZone('rome', ADESSO));
  assert.equal(romaIt.paese, 'Italia');
  assert.equal(romaIt.citta, 'Rome');
  assert.equal(cercaZone('rome', ADESSO)[0].paese, 'Italy');
});
