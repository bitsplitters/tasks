/*
 * Il test dei nomi delle modali della demo (segnaposto leggibili, 2.5.0; spec
 * 2026-11-21-segnaposto-leggibili-design.md, §2, nel repo team-tasks-manager): il salvataggio riporta i codici e
 * tratta le barre come NomiNellaModale. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coiCodici, coiNomi } from '../src/components/home/demo/nomi.ts';
import type { Rubrica } from '../src/components/home/demo/nomi.ts';

const LEO = '111111111111111111';
const SCRIMS = '222222222222222222';
const R: Rubrica = {
  persone: [{ id: LEO, nome: 'Leo', username: 'leo' }],
  ruoli: [],
  canali: [{ id: SCRIMS, nome: 'scrims' }],
  zona: 'UTC',
};

test('il salvataggio fa codici i nomi del dizionario; il resto resta testo', () => {
  assert.equal(coiCodici('ask @Leo in #scrims, not @leo2, mail ava@example.com, #7', R),
    `ask <@${LEO}> in <#${SCRIMS}>, not @leo2, mail ava@example.com, #7`);
});

test('la barra davanti a un nome si toglie: il segno resta testo, come in NomiNellaModale', () => {
  assert.equal(coiCodici(String.raw`\@Leo and \#scrims`, R), '@Leo and #scrims');
  assert.equal(coiCodici(String.raw`\\@Leo`, R), String.raw`\@Leo`);
  // Dove non segue un nome la barra non serve, e resta com'è scritta.
  assert.equal(coiCodici(String.raw`\#7 and \@leo2`, R), String.raw`\#7 and \@leo2`);
});

test("un'andata e ritorno lascia il testo com'era, anche con le barre", () => {
  for (const salvato of [
    `@Leo as text, <@${LEO}> as a mention, #scrims as text`,
    String.raw`\@Leo with its bar and <@${LEO}>`,
    String.raw`\#7, \@leo2 and <#${SCRIMS}>`,
  ]) {
    assert.equal(coiCodici(coiNomi(salvato, R), R), salvato, salvato);
  }
});
