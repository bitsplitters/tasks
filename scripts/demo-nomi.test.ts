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
  personale: false,
};

/** Il testo con cui la modale si è aperta: cita Leo, che si scrive per nome. */
const CON_LEO = `ask <@${LEO}>`;

test("il salvataggio fa codici i nomi del dizionario dell'apertura; il resto resta testo", () => {
  assert.deepEqual(coiCodici('ask @Leo in #scrims, mail ava@example.com, #7, @everyone, @ alone', R, CON_LEO), {
    testo: `ask <@${LEO}> in <#${SCRIMS}>, mail ava@example.com, #7, @everyone, @ alone`,
    sconosciuto: null,
  });
});

test("una persona che il testo aperto non citava è un nome sconosciuto, come una che il server non ha", () => {
  // Scelta dell'utente del 2026-11-21: le persone nuove si aggiungono con Owner o Tag, o col loro codice.
  assert.equal(coiCodici('ask @Leo', R, 'nobody yet').sconosciuto, '@Leo');
  assert.equal(coiCodici('ask @leo2. Then @Leo', R, CON_LEO).sconosciuto, '@leo2');
  assert.deepEqual(coiCodici(`ask <@${LEO}>`, R, 'nobody yet'), { testo: `ask <@${LEO}>`, sconosciuto: null });
});

test('la barra davanti a un nome si toglie: il segno resta testo, come in NomiNellaModale', () => {
  assert.equal(coiCodici(String.raw`\@Leo and \#scrims`, R, CON_LEO).testo, '@Leo and #scrims');
  assert.equal(coiCodici(String.raw`\\@Leo`, R, CON_LEO).testo, String.raw`\@Leo`);
  // Dove non segue un nome la barra non serve, e resta com'è scritta; davanti a una `@` con una parola si toglie, come
  // nel bot (NomiNellaModale.idoneo), e la parola resta testo, non un nome sconosciuto.
  assert.deepEqual(coiCodici(String.raw`\#7 and \@leo2`, R, CON_LEO), { testo: String.raw`\#7 and @leo2`, sconosciuto: null });
});

test('la lettura salta codici, link, backtick e token: lì una `@` non è un nome', () => {
  const scritto = 'see `@leo2`, https://example.com/@leo2, [it](https://x.y/@leo2), {{@leo2}} and <@&333333333333333333>';
  assert.deepEqual(coiCodici(scritto, R, CON_LEO), { testo: scritto, sconosciuto: null });
});

test("un'andata e ritorno lascia il testo com'era, anche con le barre", () => {
  for (const salvato of [
    `@Leo as text, <@${LEO}> as a mention, #scrims as text`,
    String.raw`\@Leo with its bar and <@${LEO}>`,
    String.raw`\#7, \@leo2 and <#${SCRIMS}>`,
  ]) {
    assert.deepEqual(coiCodici(coiNomi(salvato, R), R, salvato), { testo: salvato, sconosciuto: null }, salvato);
  }
});
