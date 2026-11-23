/*
 * Il controllo delle copie allineate (spec 2026-11-19-sito-multilingua-design.md, §7, nel repo team-tasks-manager) su
 * casi piccoli: l'impronta, i titoli, i segnaposto e il rapporto. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fonteDi, impronta, rapporto, segnaposto, titoli } from '../src/lib/traduzioni.mjs';

test("l'impronta è la stessa con le righe in CRLF e in LF", () => {
  assert.equal(impronta('a\r\nb\r\n'), impronta('a\nb\n'));
  assert.match(impronta('x'), /^[0-9a-f]{12}$/);
  assert.notEqual(impronta('a\nb\n'), impronta('a\nb'));
});

test('la fonte dal frontmatter e dal modulo', () => {
  assert.equal(fonteDi('---\r\ntitle: X\r\nfonte: abc123abc123\r\n---\r\n\r\nTesto\r\n', 'pagina'), 'abc123abc123');
  assert.equal(fonteDi('---\ntitle: X\n---\n\nfonte: no\n', 'pagina'), '');
  assert.equal(fonteDi("// x\nexport const fonte = 'abc123abc123';\n", 'modulo'), 'abc123abc123');
});

test('i titoli: ## ### ####, fuori dal frontmatter e dai blocchi di codice', () => {
  const md = '---\ntitle: X\n---\n\n## Uno\n\n```\n## non è un titolo\n```\n\n### Due\n\n# H1 no\n\n#### Tre\n\n##### no\n';
  assert.deepEqual(titoli(md), [2, 3, 4]);
});

test('i segnaposto: le graffe singole, non i token dei webhook; di un plurale conta other', () => {
  assert.deepEqual(segnaposto('{b} e {a}, {{task}} e {a}'), ['a', 'b']);
  assert.deepEqual(segnaposto({ one: 'giorno', other: '{n} giorni' }), ['n']);
});

const inglese = (chiave: string, testo: string, testi?: Record<string, unknown>) =>
  ({ chiave, percorso: `en/${chiave}`, tipo: testi ? 'modulo' : 'pagina', testo, testi });
const tradotto = (chiave: string, testo: string, testi?: Record<string, unknown>) =>
  ({ chiave, percorso: `it/${chiave}`, tipo: testi ? 'modulo' : 'pagina', testo, testi });
const conFonte = (en: string, corpo: string) => `---\ntitle: T\nfonte: ${impronta(en)}\n---\n\n${corpo}`;

test('il rapporto: una traduzione allineata non ha problemi', () => {
  const en = '---\ntitle: A\n---\n\n## One\n\n### Two\n';
  const modEn = "export const testi = { 'a': 'Hi {name}' };\n";
  const modIt = `export const fonte = '${impronta(modEn)}';\nexport const testi = { 'a': 'Ciao {name}' };\n`;
  const p = rapporto('it',
    [inglese('docs/a.md', en), inglese('testi/x.ts', modEn, { a: 'Hi {name}' })],
    [tradotto('docs/a.md', conFonte(en, '## Uno\n\n### Due\n')), tradotto('testi/x.ts', modIt, { a: 'Ciao {name}' })]);
  assert.deepEqual(p, []);
});

test('il rapporto: mancante, orfana, indietro, senza fonte, titoli, chiavi, segnaposto, forma', () => {
  const en = '## One\n\n### Two\n';
  const modEn = 'x';
  const p = rapporto('it',
    [
      inglese('docs/a.md', en),
      inglese('docs/b.md', en),
      inglese('docs/c.md', en),
      inglese('testi/x.ts', modEn, { a: 'Hi {name}', b: 'B', c: { one: '{n} day', other: '{n} days' }, d: 'D' }),
    ],
    [
      tradotto('docs/a.md', conFonte(en, '## Uno\n\n## Due\n')),
      tradotto('docs/c.md', '---\ntitle: T\nfonte: 000000000000\n---\n\n## Uno\n\n### Due\n'),
      tradotto('docs/z.md', '## Z\n'),
      tradotto('testi/x.ts', `export const fonte = '${impronta(modEn)}';`, { a: 'Ciao {nome}', c: 'giorno', d: 'D', e: 'E' }),
    ]);
  const tipi = p.map((x) => `${x.chiave} ${x.tipo}`).sort();
  assert.deepEqual(tipi, [
    'docs/a.md titoli',
    'docs/b.md mancante',
    'docs/c.md indietro',
    'docs/z.md orfana',
    'testi/x.ts chiavi',
    'testi/x.ts chiavi',
    'testi/x.ts forma',
    'testi/x.ts segnaposto',
  ].sort());
  assert.match(p.find((x) => x.chiave === 'docs/c.md')!.messaggio, /tradotto da 000000000000/);
  assert.match(p.find((x) => x.tipo === 'segnaposto')!.messaggio, /«a» ha i segnaposto \[nome\], l'inglese \[name\]/);
  assert.match(p.find((x) => x.tipo === 'titoli')!.messaggio, /titoli \[2 2\], l'inglese \[2 3\]/);
  const senza = rapporto('it', [inglese('docs/a.md', en)], [tradotto('docs/a.md', '## Uno\n\n### Due\n')]);
  assert.match(senza[0].messaggio, /^senza fonte/);
});
