/*
 * Il test del Markdown di Discord nella demo (piano 2026-11-15-demo-fedele.md, compito 4, nel repo
 * team-tasks-manager): i testi del bot diventano HTML sicuro, con le menzioni, le date e le emoji come le disegna
 * Discord. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { EMOJI, escape, markdown } from '../src/components/home/demo/markdown.ts';
import type { Contesto } from '../src/components/home/demo/markdown.ts';
import { CANALE, COACHES, LEO, MIA, SAM, dataDelCanale } from '../src/components/home/demo/modello.ts';

const NOMI = new Map([[MIA, 'Mia'], [LEO, 'Leo'], [SAM, 'Sam']]);

/** Il contesto del canale, coi nomi dello stato iniziale. */
const C: Contesto = {
  persona: (id) => NOMI.get(id),
  ruolo: (id) => (id === COACHES ? 'Coaches' : undefined),
  canale: (id) => (id === CANALE ? 'scrims' : undefined),
  data: dataDelCanale,
};
const md = (testo: string) => markdown(testo, C);
const menzione = (nome: string) => `<span class="sc-mention">${nome}</span>`;
const emojiTip = '<img class="sc-emoji" src="/icons/tip.png" alt="">';

test("grassetto e corsivo; il resto si scrive com'è, con l'escape", () => {
  assert.equal(md('**Roster** & *scrims*'), '<strong>Roster</strong> &amp; <em>scrims</em>');
  assert.equal(md('<script>alert(1)</script>'), '&lt;script&gt;alert(1)&lt;/script&gt;');
  assert.equal(md('***both***'), '<em><strong>both</strong></em>');
  assert.equal(md('5 * 3 * 2'), '5 * 3 * 2');
  assert.equal(md('"Saturday\'s"'), '&quot;Saturday\'s&quot;');
  assert.equal(md('**<@1181730456203947581>**'), `<strong>${menzione('@Mia')}</strong>`);
});

test("il codice in linea si scrive com'è, senza menzioni né grassetto", () => {
  assert.equal(md('a `<@1181730456203947581>` b'), 'a <code>&lt;@1181730456203947581&gt;</code> b');
  assert.equal(md('`**x**`, `<t:5>`'), '<code>**x**</code>, <code>&lt;t:5&gt;</code>');
});

test("le menzioni di persone, ruoli e canali, anche di chi non c'è più", () => {
  assert.equal(md('Hi <@1181730456203947581> and <@&1181730456203947590>'),
    `Hi ${menzione('@Mia')} and ${menzione('@Coaches')}`);
  assert.equal(md('<@!1181730456203947582>'), menzione('@Leo'));
  assert.equal(md('<@1181730456203947999> <@&1181730456203947999>'),
    `${menzione('@unknown-user')} ${menzione('@deleted-role')}`);
  assert.equal(md('<#1181730456203947000> <#1181730456203947999>'), `${menzione('#scrims')} ${menzione('#unknown')}`);
});

test('le date come le scrive Discord; gli stili che la demo non usa come la data intera', () => {
  assert.equal(md('<t:1794762840>'), '<span class="sc-ts">November 15, 2026 6:14 PM</span>');
  assert.equal(md('<t:1794762840:F>'), '<span class="sc-ts">Sunday, November 15, 2026 6:14 PM</span>');
  assert.equal(md('<t:1794762840:R>'), '<span class="sc-ts">November 15, 2026 6:14 PM</span>');
});

test('gli a capo, la riga -# e le voci di un elenco', () => {
  assert.equal(md('a\nb'), 'a<br>b');
  assert.equal(md('a\n\nb'), 'a<br><br>b');
  assert.equal(md('a\r\nb'), 'a<br>b');
  // La riga -# è un blocco suo: gli a capo attorno non servono, una riga vuota prima sì.
  assert.equal(md('a\n-# b\nc'), 'a<span class="sc-subtext">b</span>c');
  assert.equal(md('a\n\n-# b'), 'a<br><br><span class="sc-subtext">b</span>');
  assert.equal(md('-# **Exit** now'), '<span class="sc-subtext"><strong>Exit</strong> now</span>');
  assert.equal(md('-#no space'), '-#no space');
  // Come gli errori del promemoria: la voce del fuso (tasklist.modal.alert.timezone.error) si prende la riga dopo.
  assert.equal(md('**Errors:**\n\n- **Time zone**. Copy it\nInvalid year.'),
    '<strong>Errors:</strong><br><br><span class="sc-li"><strong>Time zone</strong>. Copy it<br>Invalid year.</span>');
  assert.equal(md('- a\n- b\n\nc'), '<span class="sc-li">a</span><span class="sc-li">b</span><br>c');
  assert.equal(md('Invalid year.\n- **Late**'), 'Invalid year.<span class="sc-li"><strong>Late</strong></span>');
  assert.equal(md('*Cancel* or ✕'), '<em>Cancel</em> or ✕');
});

test("in mezzo a una riga, come il testo di un task nell'embed, niente blocchi", () => {
  assert.equal(markdown('- **x**', C, true), '- <strong>x</strong>');
  assert.equal(markdown('-# x', C, true), '-# x');
});

test("i link solo verso http e https, col testo com'è", () => {
  assert.equal(md('[Time Zone Picker](https://timezones.bitsplitters.app)'),
    '<a href="https://timezones.bitsplitters.app" target="_blank" rel="noopener">Time Zone Picker</a>');
  assert.equal(md('[x](javascript:alert(1))'), '[x](javascript:alert(1))');
  assert.equal(md('[a "b"](https://x.y/?q="1"&r=2)'),
    '<a href="https://x.y/?q=&quot;1&quot;&amp;r=2" target="_blank" rel="noopener">a &quot;b&quot;</a>');
  assert.equal(md('[`code`](https://x.y)'),
    '<a href="https://x.y" target="_blank" rel="noopener"><code>code</code></a>');
});

test("le emoji del bot con la loro immagine, le altre col nome", () => {
  assert.equal(md('<:tip:0> ok'), `${emojiTip} ok`);
  assert.equal(md('<:nessuna:0> ok'), ':nessuna: ok');
  assert.equal(md('<a:tip:123456789012345678>'), emojiTip);
});

test('ogni emoji nota ha la sua immagine in public/icons', () => {
  assert.ok(EMOJI.has('tip'));
  for (const nome of EMOJI) assert.ok(existsSync(new URL(`../public/icons/${nome}.png`, import.meta.url)), nome);
});

test('il carattere nullo si toglie: non può fingersi un segnaposto', () => {
  assert.equal(md('a\u0000b'), 'ab');
  assert.equal(md('\u00000\u0000'), '0');
});

test("l'escape copre anche le virgolette degli attributi", () => {
  assert.equal(escape('<a href="x">&</a>'), '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;');
});

test('i link mailto:, tel: e sms: sono link come quelli web; javascript: resta testo («Writing a list»)', () => {
  assert.equal(markdown('[the sponsor](mailto:partners@example.com)', C, true),
    '<a href="mailto:partners@example.com" target="_blank" rel="noopener">the sponsor</a>');
  assert.match(markdown('[call](tel:+12025550100)', C, true), /^<a href="tel:\+12025550100"/);
  assert.match(markdown('[text](sms:+12025550100)', C, true), /^<a href="sms:/);
  assert.doesNotMatch(markdown('[x](javascript:alert(1))', C, true), /<a /);
});
