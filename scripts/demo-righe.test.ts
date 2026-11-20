/*
 * Il test del disegno delle righe nella demo (piano 2026-11-15-demo-fedele.md, compito 6, nel repo team-tasks-manager):
 * le righe dell'embed nel canale, le opzioni del selettore dei task, le righe della pagina dell'Activity. Ogni caso
 * viene dal codice del bot che il disegno replica, citato accanto. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CANALE, COACHES, LEO, MIA, PROPOSTO, ZONA, idRuoloTtm, listaDellaDemo, posizione, statoIniziale,
} from '../src/components/home/demo/modello.ts';
import type { Lista, Task } from '../src/components/home/demo/modello.ts';
import {
  contestoDelCanale, contestoDellActivity, etichettaDelTask, nomiDi, opzioniDelSelettore, righeDelCanale,
  righeDellActivity, testoPulito,
} from '../src/components/home/demo/righe.ts';

const S0 = statoIniziale();
const NOMI = nomiDi(S0);

/** La lista della demo col task in quella posizione cambiato. */
function conIlTask(pos: string, cambio: Partial<Task>): Lista {
  const lista = listaDellaDemo();
  return { ...lista, tasks: lista.tasks.map((t) => (posizione(t.pos) === pos ? { ...t, ...cambio } : t)) };
}

const icone = (html: string) => [...html.matchAll(/src="\/icons\/([^"]+)\.png"/g)].map((m) => m[1]);
const tra = (html: string, re: RegExp) => re.exec(html)?.[1] ?? '';

/** Le righe del canale lette dall'HTML: una per `<div class="sc-row…">`, che non si annidano. */
function righeLette(html: string) {
  return html.split(/(?=<div class="sc-row)/).filter((p) => p !== '').map((p) => ({
    classe: tra(p, /^<div class="([^"]*)"/),
    task: tra(p, /^<div [^>]*data-task="([^"]*)"/),
    fatta: /^<div [^>]*\bdata-done\b/.test(p),
    numero: tra(p, /<code>([^<]*)<\/code>/),
    icone: icone(p),
    testo: tra(p, /<span class="sc-text">(.*)<\/span><\/div>$/s),
  }));
}

/** Le righe della pagina dell'Activity lette dall'HTML, una per `<div class="sc-arow…">`. */
function righeDellActivityLette(html: string) {
  return html.split(/(?=<div class="sc-arow)/).filter((p) => p !== '').map((p) => ({
    classe: tra(p, /^<div class="([^"]*)"/),
    task: tra(p, /^<div [^>]*data-task="([^"]*)"/),
    fatta: /^<div [^>]*\bdata-done\b/.test(p),
    numero: tra(p, /<span class="sc-anum">(.*?)<\/span><span class="sc-aicon">/),
    icone: icone(p),
    casella: tra(p, /data-k="(a-cb-[^"]*)"/),
    premuta: tra(p, /aria-pressed="([^"]*)"/),
    chiave: tra(p, /class="sc-atext" data-k="([^"]*)"/),
    testo: tra(p, /class="sc-atext" data-k="[^"]*">(.*)<\/button><\/div>$/s),
  }));
}

/** Le opzioni del selettore lette dall'HTML, una per `<button … class="sc-opt">`. */
function opzioniLette(html: string) {
  return html.split(/(?=<button type="button" class="sc-opt")/).filter((p) => p !== '').map((p) => ({
    pos: tra(p, /data-pos="([^"]*)"/),
    chiave: tra(p, /data-k="([^"]*)"/),
    ruolo: tra(p, /role="([^"]*)"/),
    icone: icone(p),
    etichetta: tra(p, /<span class="sc-optlab">(.*)<\/span><\/button>$/s),
  }));
}

// nomiDi: i nomi che le menzioni mostrano, dalle persone del server e dai ruoli dello stato.

test('nomiDi: le persone del server, i ruoli dello stato compresi i TTM<n>', () => {
  const ttm1 = { id: idRuoloTtm(1), nome: 'TTM1', membri: [MIA, LEO], diTtm: true };
  const nomi = nomiDi({ ...S0, ruoli: [...S0.ruoli, ttm1] });
  assert.equal(nomi.persona(MIA), 'Mia');
  assert.equal(nomi.persona('1181730456203947599'), undefined);
  assert.equal(nomi.ruolo(COACHES), 'Coaches');
  assert.equal(nomi.ruolo(idRuoloTtm(1)), 'TTM1');
  assert.equal(NOMI.ruolo(idRuoloTtm(1)), undefined);
});

// RigheDellaLista.delTask, EmbedUITaskConverter.nelCanale: il webhook, il promemoria, la casella; il numero sulla
// prima riga del task (getTaskNumberToEmbed), lo spaziatore sulle altre; niente righe vuote fra i gruppi
// (GroupSpacingMode, spento per i server nuovi).

test('righeDelCanale: le sei righe della lista della demo, il promemoria sopra il task 3', () => {
  const r = righeLette(righeDelCanale(listaDellaDemo(), NOMI));
  assert.deepEqual(r.map((x) => x.task), ['1', '2', '2.1', '3', '3', '4']);
  assert.deepEqual(r.map((x) => x.classe),
    ['sc-row', 'sc-row', 'sc-row sc-sub', 'sc-row sc-row-rem', 'sc-row', 'sc-row']);
  assert.deepEqual(r.map((x) => x.numero), ['1 ', '2 ', '2 .1 ', '3 ', '  ', '4 ']);
  assert.deepEqual(r.map((x) => x.fatta), [true, false, false, false, false, false]);
  assert.deepEqual(r[3].icone, ['alert']);
  assert.equal(r[3].testo, '<span class="sc-ts">November 15, 2026 6:14 PM</span>');
  assert.deepEqual(r[4].icone, ['checkbox_empty', 'checkbox_marked']);
  assert.equal(r[4].testo, '<span class="sc-mention">@Mia</span>: VOD review: mid rotations, game 3');
  assert.equal(r[1].testo, 'Lock the scrim block vs. Nova Collective');
});

test('righeDelCanale: il webhook prima del promemoria, il numero solo sulla prima riga del task', () => {
  const r = righeLette(righeDelCanale(conIlTask('3', { webhook: 'Scrim results' }), NOMI))
    .filter((x) => x.task === '3');
  assert.deepEqual(r.map((x) => x.classe), ['sc-row sc-row-wb', 'sc-row sc-row-rem', 'sc-row']);
  assert.deepEqual(r.map((x) => x.numero), ['3 ', '  ', '  ']);
  assert.deepEqual(r[0].icone, ['wb']);
  assert.equal(r[0].testo, 'Scrim results');
});

test('righeDelCanale: lo spaziatore di un subtask è largo quanto il suo numero', () => {
  const r = righeLette(righeDelCanale(conIlTask('2.1', { promemoria: { at: PROPOSTO, zona: ZONA } }), NOMI))
    .filter((x) => x.task === '2.1');
  assert.deepEqual(r.map((x) => x.classe), ['sc-row sc-sub sc-row-rem', 'sc-row sc-sub']);
  assert.deepEqual(r.map((x) => x.numero), ['2 .1 ', '     ']);
});

test('righeDelCanale: i numeri da due cifre', () => {
  const task = (main: number, sub: number): Task => ({ pos: { main, sub }, testo: 'x', fatto: false });
  const lista: Lista = { titolo: 'T', tasks: [task(9, 0), task(12, 0), task(12, 1), task(2, 12), task(12, 12)] };
  assert.deepEqual(righeLette(righeDelCanale(lista, NOMI)).map((x) => x.numero),
    ['9 ', '12', '12.1 ', '2 .12', '12.12']);
});

// RigheDellaLista.delTask(task, secondoPiano): il subtext su tutte le righe di un completato (DimDoneMode, acceso).
test('righeDelCanale: tutte le righe di un task completato sono spente', () => {
  const lista = conIlTask('3', { fatto: true, webhook: 'Staff alerts' });
  const r = righeLette(righeDelCanale(lista, NOMI)).filter((x) => x.task === '3');
  assert.deepEqual(r.map((x) => x.fatta), [true, true, true]);
});

test("righeDelCanale: i tag sono menzioni nel testo, l'owner di un ruolo ha il nome del ruolo", () => {
  const testo = `Lock the scrim block vs. Nova Collective <@${LEO}>`;
  const r = righeLette(righeDelCanale(conIlTask('2', { testo, owner: { tipo: 'ruolo', id: COACHES } }), NOMI));
  assert.equal(r[1].testo, '<span class="sc-mention">@Coaches</span>: Lock the scrim block vs. Nova Collective '
    + '<span class="sc-mention">@Leo</span>');
});

test("righeDelCanale: il testo con l'escape, il Markdown di Discord, il canale della demo col suo nome", () => {
  const testo = `<img src=x onerror=alert(1)> **bold** in <#${CANALE}>`;
  const html = righeDelCanale(conIlTask('4', { testo }), NOMI);
  assert.ok(!html.includes('<img src=x'));
  assert.equal(righeLette(html)[5].testo,
    '&lt;img src=x onerror=alert(1)&gt; <strong>bold</strong> in <span class="sc-mention">#scrims</span>');
});

// TaskActivityConverter, ActivitiesUtil.contentCleaned: l'etichetta è la posizione, uno spazio, il testo pulito.

test('etichettaDelTask: la posizione, uno spazio, il testo senza i tag', () => {
  const lista = conIlTask('2', { testo: `Lock the scrim block vs. Nova Collective <@${LEO}>` });
  assert.equal(etichettaDelTask(lista.tasks[1]), '2 Lock the scrim block vs. Nova Collective');
  assert.equal(etichettaDelTask(lista.tasks[2]), '2.1 Clip the three teamfights for the review');
});

// ActivitiesUtil.contentCleaned, poi StringUtil.removeMarkdown e removeExtraSpaces. Un'emoji del server ha un id da
// 17 a 19 cifre (DISCORD_CUSTOM_EMOJI), un tag da 17 a 20 (TAG_ENTITY).
test('testoPulito: via link, emoji, tag, link ai messaggi, Markdown', () => {
  assert.equal(testoPulito('[docs](https://x.y) **a** <:e:1181730456203947999> :smile: b'), 'docs a b');
  const messaggio = `https://discord.com/channels/${CANALE}/${CANALE}/${CANALE}`;
  assert.equal(testoPulito(`ask <@${MIA}> and <@&${COACHES}> ${messaggio} ok`), 'ask and ok');
  assert.equal(testoPulito('> `code` ~~gone~~ ||spoiler|| __under__ _it_ *em* ***both***'),
    'code gone spoiler under it em both');
});

// TaskActivityConverter.determineEmojiType, ActivityOptionConverter.toSelectOption: l'emoji della casella dello
// stato, l'etichetta coi canali per nome, accorciata a 50 (ActivitiesUtil.adaptContentLength, Abbrevia.entro).

test("opzioniDelSelettore: una per task, con la casella del suo stato e l'etichetta del bot", () => {
  const o = opzioniLette(opzioniDelSelettore(listaDellaDemo()));
  assert.deepEqual(o.map((x) => x.pos), ['1', '2', '2.1', '3', '4']);
  assert.deepEqual(o.map((x) => x.chiave), ['opt-1', 'opt-2', 'opt-2.1', 'opt-3', 'opt-4']);
  assert.deepEqual(o.map((x) => x.ruolo), ['option', 'option', 'option', 'option', 'option']);
  assert.deepEqual(o.map((x) => x.icone),
    [['checkbox_marked'], ['checkbox_empty'], ['checkbox_empty'], ['checkbox_empty'], ['checkbox_empty']]);
  assert.deepEqual(o.map((x) => x.etichetta), [
    "1 Confirm the five-man roster for Saturday's scri…",
    '2 Lock the scrim block vs. Nova Collective',
    '2.1 Clip the three teamfights for the review',
    '3 VOD review: mid rotations, game 3',
    '4 Publish the match-day graphic',
  ]);
});

test("opzioniDelSelettore: i canali per nome, il taglio che non spezza un'emoji o una menzione, l'escape", () => {
  const etichetta = (testo: string) => opzioniLette(opzioniDelSelettore(conIlTask('4', { testo })))[4].etichetta;
  assert.equal(etichetta(`Post in <#${CANALE}> and <#1181730456203947999>`), '4 Post in #scrims and ');
  assert.equal(etichetta(`${'x'.repeat(46)}😀yyyy`), `4 ${'x'.repeat(46)}…`);
  assert.equal(etichetta(`${'x'.repeat(44)} <@123>`), `4 ${'x'.repeat(44)} …`);
  assert.equal(etichetta('<b>x</b> & "y"'), '4 &lt;b&gt;x&lt;/b&gt; &amp; &quot;y&quot;');
});

// VistaDellaLista.righe, TaskList.tsx (TaskRowView): le stesse righe del canale, il numero sulla prima riga del task,
// la data della pagina; il testo di ogni riga apre il pannello del task.

test('righeDellActivity: le righe della pagina, la casella e il testo di ogni task', () => {
  const r = righeDellActivityLette(righeDellActivity(listaDellaDemo(), NOMI));
  assert.deepEqual(r.map((x) => x.task), ['1', '2', '2.1', '3', '3', '4']);
  assert.deepEqual(r.map((x) => x.classe),
    ['sc-arow', 'sc-arow', 'sc-arow sc-sub', 'sc-arow sc-row-rem', 'sc-arow', 'sc-arow']);
  const n = (main: number) => `<span class="sc-nmain">${main}</span>`;
  assert.deepEqual(r.map((x) => x.numero), [n(1), n(2), `${n(2)}.1`, n(3), '', n(4)]);
  assert.deepEqual(r.map((x) => x.casella), ['a-cb-1', 'a-cb-2', 'a-cb-2.1', '', 'a-cb-3', 'a-cb-4']);
  assert.deepEqual(r.map((x) => x.premuta), ['true', 'false', 'false', '', 'false', 'false']);
  assert.deepEqual(r.map((x) => x.chiave), ['a-txt-1', 'a-txt-2', 'a-txt-2.1', 'a-rem-3', 'a-txt-3', 'a-txt-4']);
  assert.deepEqual(r.map((x) => x.fatta), [true, false, false, false, false, false]);
  assert.deepEqual(r[3].icone, ['alert']);
  assert.equal(r[3].testo, '<span class="sc-ts">15 November 2026 18:14</span>');
  assert.equal(r[4].testo, '<span class="sc-mention">@Mia</span>: VOD review: mid rotations, game 3');
});

test('righeDellActivity: il webhook col suo nome prima del promemoria, tutte spente da completato', () => {
  const r = righeDellActivityLette(righeDellActivity(conIlTask('3', { webhook: 'Scrim results', fatto: true }), NOMI))
    .filter((x) => x.task === '3');
  assert.deepEqual(r.map((x) => x.chiave), ['a-wb-3', 'a-rem-3', 'a-txt-3']);
  assert.deepEqual(r.map((x) => x.numero), ['<span class="sc-nmain">3</span>', '', '']);
  assert.deepEqual(r[0].icone, ['wb']);
  assert.equal(r[0].testo, 'Scrim results');
  assert.deepEqual(r.map((x) => x.fatta), [true, true, true]);
  assert.equal(r[2].premuta, 'true');
});

test('contestoDelCanale: i nomi dello stato coi TTM<n>, il canale della demo, le date come nel canale', () => {
  const ttm1 = { id: idRuoloTtm(1), nome: 'TTM1', membri: [MIA, LEO], diTtm: true };
  const c = contestoDelCanale({ ...S0, ruoli: [...S0.ruoli, ttm1] });
  assert.equal(c.persona(MIA), 'Mia');
  assert.equal(c.persona('1'), undefined);
  assert.equal(c.ruolo(COACHES), 'Coaches');
  assert.equal(c.ruolo(idRuoloTtm(1)), 'TTM1');
  assert.equal(c.canale(CANALE), 'scrims');
  assert.equal(c.canale('1'), undefined);
  assert.equal(c.data(PROPOSTO, 'F'), 'Sunday, November 15, 2026 6:14 PM');
  assert.equal(c.data(PROPOSTO, 't'), '6:14 PM');
});

test('contestoDellActivity: gli stessi nomi, le date come le scrive la pagina', () => {
  const c = contestoDellActivity(S0);
  assert.equal(c.persona(MIA), 'Mia');
  assert.equal(c.ruolo(COACHES), 'Coaches');
  assert.equal(c.canale(CANALE), 'scrims');
  assert.equal(c.data(PROPOSTO, 'F'), '15 November 2026 18:14');
});

/* I casi d'uso del sito (piano 2026-11-20-casi-d-uso-esempi-completi.md, compito 1): la ricorrenza e le righe vuote. */

test('il badge della ricorrenza conta anche il primo avviso; senza ripetizioni non c\'è (ReminderDisplay.badgeOf)', async () => {
  const { badgeDellaRicorrenza } = await import('../src/components/home/demo/righe.ts');
  assert.equal(badgeDellaRicorrenza({ at: PROPOSTO, zona: ZONA, ricorrenza: { intervallo: '7d', ripetizioni: 3 } }), '↻7d ×4');
  assert.equal(badgeDellaRicorrenza({ at: PROPOSTO, zona: ZONA, ricorrenza: { intervallo: '15m', ripetizioni: 0 } }), '');
  assert.equal(badgeDellaRicorrenza({ at: PROPOSTO, zona: ZONA }), '');
  assert.equal(badgeDellaRicorrenza(undefined), '');
});

test('la riga del promemoria ricorrente porta il badge dopo la data', () => {
  const lista = conIlTask('3', { promemoria: { at: PROPOSTO, zona: ZONA, ricorrenza: { intervallo: '7d', ripetizioni: 3 } } });
  const riga = righeLette(righeDelCanale(lista, NOMI)).find((r) => r.classe.includes('sc-row-rem'));
  assert.match(riga?.testo ?? '', /<\/span> ↻7d ×4$/);
  const singolo = righeLette(righeDelCanale(listaDellaDemo(), NOMI)).find((r) => r.classe.includes('sc-row-rem'));
  assert.doesNotMatch(singolo?.testo ?? '', /↻/);
});

test('con gli spazi, una riga vuota davanti a ogni task principale che chiude o apre un gruppo (staFraIGruppi)', () => {
  const t = (main: number, sub: number): Task => ({ pos: { main, sub }, testo: `t${main}.${sub}`, fatto: false });
  const lista: Lista = { titolo: 'x', tasks: [t(1, 0), t(2, 0), t(2, 1), t(3, 0), t(4, 0), t(4, 1)] };
  const righe = righeLette(righeDelCanale(lista, NOMI, { spazi: true }));
  const prima = righe.flatMap((r, i) => (r.classe.includes('sc-gap') ? [righe[i + 1].task] : []));
  assert.deepEqual(prima, ['2', '3', '4']);
  assert.ok(!righeDelCanale(lista, NOMI).includes('sc-gap'));
});
