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
  assert.equal(coiCodici('ask @Leo in #scrims, mail ava@example.com, #7, @everyone, @ alone', R, CON_LEO).testo,
    `ask <@${LEO}> in <#${SCRIMS}>, mail ava@example.com, #7, @everyone, @ alone`);
});

test("una persona che il testo aperto non citava resta testo, come una che il server non ha", () => {
  // Scelta dell'utente del 2026-11-22: «Semplicemente risolviamo quelli che conosciamo, gli altri li lasciamo
  // letterali». Le persone nuove si aggiungono con Owner o Tag, o col loro codice.
  assert.equal(coiCodici('ask @Leo', R, 'nobody yet').testo, 'ask @Leo');
  assert.equal(coiCodici('ask @leo2. Then @Leo', R, CON_LEO).testo, `ask @leo2. Then <@${LEO}>`);
  assert.equal(coiCodici(`ask <@${LEO}>`, R, 'nobody yet').testo, `ask <@${LEO}>`);
});

test('la barra davanti a un nome si toglie: il segno resta testo, come in NomiNellaModale', () => {
  assert.equal(coiCodici(String.raw`\@Leo and \#scrims`, R, CON_LEO).testo, '@Leo and #scrims');
  assert.equal(coiCodici(String.raw`\\@Leo`, R, CON_LEO).testo, String.raw`\@Leo`);
  // Dove non segue un nome del dizionario la barra non serve, e resta com'è scritta, come nel bot
  // (NomiNellaModale.idoneo, dal 2026-11-22).
  assert.equal(coiCodici(String.raw`\#7 and \@leo2`, R, CON_LEO).testo, String.raw`\#7 and \@leo2`);
});

test("in testa, un owner che il dizionario non conosce si rifiuta, anche più lungo di un nome noto", () => {
  // Scelta dell'utente del 2026-11-22: «gli owner li gestiamo noi tramite funzione, quindi chi lo modifica manualmente
  // è perché vuole assegnare il task a qualcun altro». Fuori dalla testa, lo stesso nome resta testo.
  assert.deepEqual(coiCodici('@Bea: ask', R, CON_LEO), { testo: '@Bea: ask', owner: '@Bea' });
  assert.deepEqual(coiCodici('ok\n@Leo Rossi: ask', R, CON_LEO), { testo: 'ok\n@Leo Rossi: ask', owner: '@Leo Rossi' });
  assert.deepEqual(coiCodici('ask @Bea: now, @Leo Rossi: later', R, CON_LEO),
    { testo: `ask @Bea: now, <@${LEO}> Rossi: later`, owner: null });
  assert.deepEqual(coiCodici('@leo: ask', R, CON_LEO), { testo: `<@${LEO}>: ask`, owner: null });
  assert.deepEqual(coiCodici('@Bea:ask, @Bea', R, CON_LEO), { testo: '@Bea:ask, @Bea', owner: null });
  // La barra lo lascia testo.
  assert.deepEqual(coiCodici(String.raw`\@Bea: ask`, R, CON_LEO), { testo: '@Bea: ask', owner: null });
});

test("nel contenuto di un task solo `@nome:` in testa è testo: lì l'owner non c'è", () => {
  // Scelta dell'utente del 2026-11-22: «il contenuto deve modificare solo il contenuto, non dovrebbe essere permesso di
  // aggiungere/modificare l'owner». All'apertura niente barra; un nome noto è la sua persona, come altrove.
  assert.deepEqual(coiCodici('@Bea: ask', R, CON_LEO, 'contenuto'), { testo: '@Bea: ask', owner: null });
  assert.deepEqual(coiCodici('@Leo Rossi: ask', R, CON_LEO, 'contenuto'),
    { testo: `<@${LEO}> Rossi: ask`, owner: null });
  assert.equal(coiNomi('@Bea: ask', R, 'contenuto'), '@Bea: ask');
  assert.equal(coiNomi('@Bea: ask', R), String.raw`\@Bea: ask`);
  for (const salvato of ['@Bea: as text at the head', `<@${LEO}>: ask`, String.raw`\@Bea: with its bar`])
    assert.equal(coiCodici(coiNomi(salvato, R, 'contenuto'), R, salvato, 'contenuto').testo, salvato, salvato);
});

test('la lettura salta codici, link, backtick e token: lì una `@` non è un nome', () => {
  const scritto = 'see `@leo2`, https://example.com/@leo2, [it](https://x.y/@leo2), {{@leo2}} and <@&333333333333333333>';
  assert.equal(coiCodici(scritto, R, CON_LEO).testo, scritto);
});

test("un'andata e ritorno lascia il testo com'era, anche con le barre", () => {
  for (const salvato of [
    `@Leo as text, <@${LEO}> as a mention, #scrims as text`,
    String.raw`\@Leo with its bar and <@${LEO}>`,
    String.raw`\#7, \@leo2 and <#${SCRIMS}>`,
    '@leo2 and @Bea as text, with no bar',
    '@Bea: as text at the head',
    String.raw`\@Bea: as text at the head, with its bar`,
  ]) {
    assert.equal(coiCodici(coiNomi(salvato, R), R, salvato).testo, salvato, salvato);
  }
});
