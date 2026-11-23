/*
 * Il test dei fusi della demo dell'Activity (piano 2026-11-15-demo-fedele.md, compito 11, nel repo team-tasks-manager):
 * la tabella di activity/src/fake/zones.ts in inglese, la ricerca di activity/src/app/zones.ts, le zone di chi guarda e
 * la riga del dispositivo sotto i campi. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ADESSO, PROPOSTO } from '../src/components/home/demo/modello.ts';
import { cercaZone, scarto, stessaZona, sulDispositivo, tueZone, zona } from '../src/components/home/demo/zone.ts';

const citta = (testo: string) => cercaZone(testo, ADESSO).map((z) => z.citta);

test('una zona della tabella ha città e paese in inglese, lo scarto e l\'ora di adesso', () => {
  assert.deepEqual(zona('Europe/Rome', ADESSO),
    { id: 'Europe/Rome', citta: 'Rome', paese: 'Italy', scarto: 'UTC+1', ora: '18:04' });
  assert.deepEqual(zona('Asia/Kolkata', ADESSO),
    { id: 'Asia/Kolkata', citta: 'Kolkata', paese: 'India', scarto: 'UTC+5:30', ora: '22:34' });
});

test('una zona fuori dalla tabella ha il suo scarto al posto della città e nessun paese', () => {
  assert.deepEqual(zona('America/Argentina/Cordoba', ADESSO),
    { id: 'America/Argentina/Cordoba', citta: 'UTC−3', paese: '', scarto: 'UTC−3', ora: '14:04' });
});

test('lo scarto si scrive come la pagina vera: il segno meno vero, i minuti solo se ci sono', () => {
  assert.deepEqual([60, -180, 330, 0, -570, 345].map(scarto),
    ['UTC+1', 'UTC−3', 'UTC+5:30', 'UTC+0', 'UTC−9:30', 'UTC+5:45']);
});

test('la ricerca trova per città, paese e nome IANA, senza maiuscole né accenti', () => {
  assert.deepEqual(citta('paris'), ['Paris']);
  assert.deepEqual(citta('ITALY'), ['Rome']);
  assert.deepEqual(citta('Europe/Rome'), ['Rome']);
  assert.deepEqual(citta('sao'), ['São Paulo']);
  assert.deepEqual(citta('san marino'), ['San Marino']);
  assert.deepEqual(citta('mexico_city'), ['Mexico City']);
});

test('prima le città che cominciano col testo, poi le altre righe nell\'ordine delle città', () => {
  assert.deepEqual(citta('new'), ['New York', 'Auckland']);
  assert.deepEqual(citta('lo'), ['London', 'Los Angeles', 'Bogotá', 'Oslo', 'São Paulo']);
});

test('uno scarto trova le zone che adesso sono lì: «+5:30», «utc-3», «GMT +1»', () => {
  assert.deepEqual(citta('+5:30'), ['Kolkata']);
  assert.deepEqual(citta('utc-3'), ['Buenos Aires', 'Santiago', 'São Paulo']);
  assert.deepEqual(citta('UTC−3'), ['Buenos Aires', 'Santiago', 'São Paulo']);
  const piuUno = citta('GMT +1');
  assert.ok(piuUno.includes('Rome') && piuUno.includes('Lagos'), piuUno.join());
  assert.ok(!piuUno.includes('London'), piuUno.join());
});

test('un testo vuoto o che non trova niente dà un elenco vuoto', () => {
  assert.deepEqual(citta(''), []);
  assert.deepEqual(citta('   '), []);
  assert.deepEqual(citta('atlantis'), []);
});

test('le zone di chi guarda: Rome per il dispositivo e il server, poi quella scelta, se è un\'altra', () => {
  const inBreve = (scelto?: string) => tueZone(scelto, ADESSO).map((r) => [r.zona.citta, r.motivi]);
  assert.deepEqual(inBreve(), [['Rome', ['device', 'server']]]);
  assert.deepEqual(inBreve('Europe/Rome'), [['Rome', ['device', 'learned', 'server']]]);
  assert.deepEqual(inBreve('Asia/Tokyo'), [['Rome', ['device', 'server']], ['Tokyo', ['learned']]]);
});

test('la stessa zona è lo stesso nome, o quello che il browser dà a tutti e due', () => {
  assert.ok(stessaZona('Europe/Rome', 'Europe/Rome'));
  assert.ok(!stessaZona('Europe/Rome', 'Europe/Paris'));
});

test('sotto i campi, l\'ora del dispositivo della demo, a Roma, come shortDateTime in inglese', () => {
  assert.equal(sulDispositivo(PROPOSTO), 'Sun 15 Nov, 18:14');
});
