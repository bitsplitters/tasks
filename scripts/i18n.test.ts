/*
 * Le fondamenta del sito multilingua (spec 2026-11-19-sito-multilingua-design.md, §2-§5, nel repo team-tasks-manager):
 * le lingue, gli indirizzi, il rinvio e i testi. Si lancia dalla cartella tasks con `npm test`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LINGUE, LINGUE_PUBBLICATE, TRADOTTE, linguaDelPrefisso } from '../src/i18n/lingue.ts';
import { equivalente, linguaDi, percorso } from '../src/i18n/percorsi.ts';
import { linguaDaMostrare, linguaDelBrowser } from '../src/i18n/rinvio.mjs';
import { TESTI, t, traduttore } from '../src/i18n/t.ts';

test('le sette lingue del bot, l\'inglese senza prefisso e pubblicato', () => {
  assert.deepEqual(LINGUE.map((l) => l.codice), ['en', 'it', 'de', 'fr', 'es-ES', 'es-419', 'pt-BR']);
  assert.deepEqual(LINGUE.map((l) => l.prefisso), ['', 'it', 'de', 'fr', 'es', 'es-419', 'pt-br']);
  assert.equal(LINGUE_PUBBLICATE[0].codice, 'en');
  assert.ok(!TRADOTTE.some((l) => l.codice === 'en'));
  assert.equal(linguaDelPrefisso('pt-br'), 'pt-BR');
  assert.equal(linguaDelPrefisso(''), undefined);
});

test('ogni lingua pubblicata ha i suoi testi', () => {
  for (const l of LINGUE_PUBBLICATE) assert.ok(TESTI[l.codice], `mancano i testi di ${l.codice}`);
});

test('percorso e equivalente cambiano solo il prefisso', () => {
  assert.equal(percorso('en', '/premium/'), '/premium/');
  assert.equal(percorso('it', '/premium/'), '/it/premium/');
  assert.equal(percorso('it', '/'), '/it/');
  assert.equal(percorso('pt-BR', '/docs/reminders/#how-the-reminder-arrives'), '/pt-br/docs/reminders/#how-the-reminder-arrives');
  assert.equal(equivalente('/it/docs/reminders/', 'en'), '/docs/reminders/');
  assert.equal(equivalente('/it/', 'en'), '/');
  assert.equal(equivalente('/it', 'en'), '/');
  assert.equal(equivalente('/es-419/premium/', 'es-ES'), '/es/premium/');
  assert.equal(linguaDi('/es/premium/'), 'es-ES');
  assert.equal(linguaDi('/es-419/'), 'es-419');
  assert.equal(linguaDi('/docs/'), 'en');
  assert.equal(linguaDi('/'), 'en');
});

test('la lingua del browser segue la tabella del §5', () => {
  const tutte = ['en', 'it', 'de', 'fr', 'es-ES', 'es-419', 'pt-BR'];
  assert.equal(linguaDelBrowser(['it-IT', 'en'], tutte), 'it');
  assert.equal(linguaDelBrowser(['es'], tutte), 'es-ES');
  assert.equal(linguaDelBrowser(['es-ES'], tutte), 'es-ES');
  assert.equal(linguaDelBrowser(['es-MX'], tutte), 'es-419');
  assert.equal(linguaDelBrowser(['pt-PT'], tutte), 'pt-BR');
  assert.equal(linguaDelBrowser(['ja', 'de-AT'], tutte), 'de');
  assert.equal(linguaDelBrowser(['en-US', 'it'], tutte), 'en', 'la prima corrispondenza è l\'inglese');
  assert.equal(linguaDelBrowser(['ja'], tutte), 'en');
  assert.equal(linguaDelBrowser(['de', 'it'], ['en', 'it']), 'it', 'una lingua spenta si salta');
  assert.equal(linguaDelBrowser(undefined as unknown as string[], ['en']), 'en');
});

test('la lingua da mostrare: scelta salvata, poi browser solo sulle pagine inglesi', () => {
  const pubblicate = ['en', 'it'];
  assert.equal(linguaDaMostrare(null, 'en', ['it-IT'], pubblicate), 'it');
  assert.equal(linguaDaMostrare(null, 'it', ['en-US'], pubblicate), 'it', 'una pagina tradotta senza scelta resta');
  assert.equal(linguaDaMostrare('en', 'it', ['it'], pubblicate), 'en');
  assert.equal(linguaDaMostrare('de', 'en', ['it'], pubblicate), 'it', 'una scelta spenta non vale');
  assert.equal(linguaDaMostrare('it', 'en', ['en'], pubblicate), 'it');
});

test('t: chiavi, segnaposto e plurali', () => {
  assert.equal(t('en', 'comune.nav.docs'), 'Docs');
  assert.equal(t('it', 'comune.selettore.label', { nome: 'Italiano' }), 'Lingua: Italiano');
  assert.equal(t('en', 'comune.note.modifiche', { n: 1 }), '1 change');
  assert.equal(t('en', 'comune.note.modifiche', { n: 3 }), '3 changes');
  assert.equal(t('it', 'comune.note.altre', { n: 1 }), "un'altra");
  assert.equal(t('it', 'comune.note.altre', { n: 4 }), 'altre 4');
  assert.throws(() => t('en', 'comune.non.esiste'), /Testo mancante/);
  assert.throws(() => t('en', 'comune.selettore.label'), /vuole il valore \{nome\}/);
  assert.throws(() => t('en', 'comune.note.modifiche'), /vuole il numero n/);
  assert.equal(traduttore('it', 'comune')('nav.casi'), "Casi d'uso");
  assert.equal(t('en', 'casi.legenda.variable.spiega'), 'A free variable: the webhook reads it as <code>{{key}}</code>. It stays in the text.');
});
