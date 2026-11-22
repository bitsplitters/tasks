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

test("la barra è dell'utente: il segno resta testo e la barra resta nel testo salvato, come in NomiNellaModale", () => {
  // Scelta dell'utente del 2026-11-22: «La barra va utilizzata solo quando è l'utente a utilizzarla».
  for (const scritto of [String.raw`\@Leo and \#scrims`, String.raw`\\@Leo`, String.raw`\#7 and \@leo2`])
    assert.equal(coiCodici(scritto, R, CON_LEO).testo, scritto, scritto);
  // All'apertura TTM non ne aggiunge: una parola uguale a un nome salvata senza barra, prima della 2.5.0, si mostra
  // com'è, e se la riga cambia diventa la menzione.
  assert.equal(coiNomi(`@Leo as a word, <@${LEO}>`, R), '@Leo as a word, @Leo');
  assert.equal(coiCodici('@Leo as a word, @Leo', R, `@Leo as a word, <@${LEO}>`).testo,
    `<@${LEO}> as a word, <@${LEO}>`);
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
  // La barra lo lascia testo, e resta.
  assert.deepEqual(coiCodici(String.raw`\@Bea: ask`, R, CON_LEO), { testo: String.raw`\@Bea: ask`, owner: null });
});

test("nel contenuto di un task solo `@nome:` in testa è testo: lì l'owner non c'è", () => {
  // Scelta dell'utente del 2026-11-22: «il contenuto deve modificare solo il contenuto, non dovrebbe essere permesso di
  // aggiungere/modificare l'owner». Un nome noto è la sua persona, come altrove; all'apertura niente barra, qui come
  // nella lista.
  assert.deepEqual(coiCodici('@Bea: ask', R, CON_LEO, 'contenuto'), { testo: '@Bea: ask', owner: null });
  assert.deepEqual(coiCodici('@Leo Rossi: ask', R, CON_LEO, 'contenuto'),
    { testo: `<@${LEO}> Rossi: ask`, owner: null });
  assert.equal(coiNomi('@Bea: ask', R), '@Bea: ask');
  for (const salvato of ['@Bea: as text at the head', `<@${LEO}>: ask`, String.raw`\@Bea: with its bar`])
    assert.equal(coiCodici(coiNomi(salvato, R), R, salvato, 'contenuto').testo, salvato, salvato);
});

test('la lettura salta codici, link, backtick e token: lì una `@` non è un nome', () => {
  const scritto = 'see `@leo2`, https://example.com/@leo2, [it](https://x.y/@leo2), {{@leo2}} and <@&333333333333333333>';
  assert.equal(coiCodici(scritto, R, CON_LEO).testo, scritto);
});

test("un'andata e ritorno lascia il testo com'era, anche con le barre", () => {
  for (const salvato of [
    String.raw`\@Leo as text, <@${LEO}> as a mention, \#scrims as text`,
    String.raw`\@Leo with its bar and <@${LEO}>`,
    String.raw`\#7, \@leo2 and <#${SCRIMS}>`,
    '@leo2 and @Bea as text, with no bar',
    String.raw`\@Bea: as text at the head, with its bar`,
  ]) {
    assert.equal(coiCodici(coiNomi(salvato, R), R, salvato).testo, salvato, salvato);
  }
});
