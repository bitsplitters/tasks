/*
 * Il test dei casi d'uso del sito (piano 2026-11-20-casi-d-uso-esempi-completi.md, compiti 3, 4 e 5, nel repo
 * team-tasks-manager): il testo di Bulk update letto e riscritto, i token dei webhook come WebhookTokenResolver, il
 * controllo al build, le riproduzioni di Discord. Si lancia dalla cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { coiNomi, leggi, scrivi } from '../src/lib/esempi/testo.ts';
import { dataNelTesto } from '../src/components/home/demo/nomi.ts';
import { percentEncode, risolvi, risolviBody, risolviUrl, testoPerIlToken, variabili } from '../src/lib/esempi/webhook.ts';
import type { ContestoDelWebhook } from '../src/lib/esempi/webhook.ts';
import { problemi } from '../src/lib/esempi/controllo.ts';
import { giornoEOra, riproduzione } from '../src/lib/esempi/discord.ts';
import type { Esempio } from '../src/lib/esempi/tipi.ts';

const AVA = '1181730456203948101';
const LEO = '1181730456203948102';
const MODS = '1181730456203948201';
const CANALE = '1181730456203948301';
const ZONA = 'Europe/London';

const TESTO = [
  `- [X] <@${AVA}>: Write the rules in <#${CANALE}>`,
  `- [] {{wb=Rules changed}} <t:1765206000> [0m,7d,3] <@&${MODS}>: Update the rules {{change=No more spoilers}}`,
  ` - [] <@${LEO}>: Press :owner: then the task, questions to [Ava](mailto:ava@example.com)`,
  `- [] <t:1765206000> [0m,0m,0] <@${LEO}>: Announce it`,
].join('\n');

test('il testo di Bulk update si legge e torna identico (giro testo, modello, testo)', () => {
  const { tasks, errori } = leggi(TESTO, ZONA);
  assert.deepEqual(errori, []);
  assert.equal(tasks.length, 4);
  assert.deepEqual(tasks.map((t) => `${t.pos.main}.${t.pos.sub}`), ['1.0', '2.0', '2.1', '3.0']);
  assert.equal(tasks[0].fatto, true);
  assert.deepEqual(tasks[1].owner, { tipo: 'ruolo', id: MODS });
  assert.equal(tasks[1].webhook, 'Rules changed');
  assert.deepEqual(tasks[1].promemoria, { at: 1765206000, zona: ZONA, ricorrenza: { intervallo: '7d', ripetizioni: 3 } });
  assert.equal(tasks[3].promemoria?.ricorrenza, undefined);
  assert.match(tasks[2].testo, /^Press <:owner_blue:0> then/);
  assert.equal(scrivi(tasks), TESTO);
});

test('una riga senza trattino, un subtask in testa, un task senza testo sono errori con la loro riga', () => {
  assert.match(leggi('Ship it', ZONA).errori[0], /^riga 1: /);
  assert.match(leggi(' - [] Notes', ZONA).errori[0], /^riga 1: la prima riga non può essere un subtask/);
  assert.match(leggi(`- [] a\n- [] <@${AVA}>: `, ZONA).errori[0], /^riga 2: il task non ha testo/);
  assert.match(leggi('- [] <t:1765206000> [1d,0m,0] <@1181730456203948101>: x', ZONA).errori[0], /distanza/);
});

test('Bulk update coi nomi (2.5.0): persone, ruoli, canali e la data del promemoria nel fuso del team', () => {
  assert.equal(coiNomi(TESTO, esempio().team), [
    '- [X] @Ava: Write the rules in #staff',
    '- [] {{wb=Rules changed}} 2025-12-08 15:00 [0m,7d,3] @Moderators: Update the rules {{change=No more spoilers}}',
    ' - [] @Leo: Press :owner: then the task, questions to [Ava](mailto:ava@example.com)',
    '- [] 2025-12-08 15:00 [0m,0m,0] @Leo: Announce it',
  ].join('\n'));
});

// Le persone del dizionario sono quelle che la lista cita, come nel bot: Ava c'è perché il testo la menziona.
test("i nomi uguali: le persone con lo username, due ruoli col codice; la barra scritta dall'utente resta com'è", () => {
  const MARIO_A = '1181730456203948111';
  const MARIO_B = '1181730456203948112';
  const STAFF_A = '1181730456203948211';
  const STAFF_B = '1181730456203948212';
  const team = {
    ...esempio().team,
    people: [
      ...esempio().team.people,
      { id: MARIO_A, name: 'Mario', username: 'mario.rossi', color: '#000', about: 'x' },
      { id: MARIO_B, name: 'Mario', username: 'mario_b', color: '#000', about: 'x' },
      { id: '1181730456203948113', name: 'Moderators', username: 'mods.bot', color: '#000', about: 'x' },
    ],
    roles: [
      ...esempio().team.roles,
      { id: STAFF_A, name: 'Staff', about: 'x' },
      { id: STAFF_B, name: 'staff', about: 'x' },
    ],
  };
  const testo = `- [] <@${MARIO_A}>: ask <@${MARIO_B}>, <@1181730456203948113> and <@&${MODS}>, then <@&${STAFF_A}> `
    + `<@&${STAFF_B}>; write \\@Ava as a word to <@${AVA}>, mail ava@example.com, ask @everyone`;
  assert.equal(coiNomi(testo, team),
    `- [] @Mario (mario.rossi): ask @Mario (mario_b), @Moderators (mods.bot) and @Moderators, then <@&${STAFF_A}> `
    + `<@&${STAFF_B}>; write \\@Ava as a word to @Ava, mail ava@example.com, ask @everyone`);
});

test('la data del promemoria: i secondi solo se ci sono, lo scarto nell\'ora che si ripete', () => {
  assert.equal(dataNelTesto(1796752800, ZONA), '2026-12-08 18:00');
  assert.equal(dataNelTesto(1796752830, ZONA), '2026-12-08 18:00:30');
  // 25 ottobre 2026: a Londra l'1:30 viene due volte, prima con +01:00 e poi con +00:00.
  assert.equal(dataNelTesto(1792888200, ZONA), '2026-10-25 01:30 +01:00');
  assert.equal(dataNelTesto(1792888200 + 3600, ZONA), '2026-10-25 01:30 +00:00');
  assert.equal(dataNelTesto(1792888200, 'UTC'), '2026-10-25 00:30');
});

const CTX: ContestoDelWebhook = {
  task: 'Ship', state: 'completed', list: 'Week 50', user: 'Leo', user_id: LEO, when: '2026-12-07T10:00:00Z',
  guild: 'Nova', guild_id: '1', channel: 'staff', channel_id: CANALE,
};

test('i token: la variabile libera vince sul predefinito, una chiave sconosciuta è vuota (WebhookTokenResolver)', () => {
  const vars = variabili('Ship {{task=Override}} {{ team = Nova Collective }} {{team=Team Nova}}');
  assert.deepEqual([...vars], [['task', 'Override'], ['team', 'Team Nova']]);
  assert.equal(risolvi('{{task}}|{{user}}|{{nope}}|{{state}}', CTX, vars), 'Override|Leo||completed');
});

test('nel body ogni valore ha l\'escape JSON (resolveBody); negli header entra così com\'è (resolve)', () => {
  const valore = 'a "b" C:\\x\nfine';
  const body = risolviBody('{"t": "{{list}}"}', CTX, new Map([['list', valore]]));
  assert.equal(body, '{"t": "a \\"b\\" C:\\\\x\\nfine"}');
  assert.equal(JSON.parse(body).t, valore);
  assert.equal(risolvi('Bearer {{list}}', CTX, new Map([['list', '"k"']])), 'Bearer "k"');
});

test('nell\'URL ogni valore è percent-encoded come URLEncoder, con lo spazio %20', () => {
  assert.equal(risolviUrl('https://x.test/{{team}}?q={{user}}', CTX, new Map([['team', 'Team Nova/2']])),
    'https://x.test/Team%20Nova%2F2?q=Leo');
  assert.equal(percentEncode("a!b'c(d)e~f*g.h-i_j"), 'a%21b%27c%28d%29e%7Ef*g.h-i_j');
});

test('{{task}} ha l\'owner in testa e niente definizioni (VariabiliWebhook.testoDelTask)', () => {
  const { tasks } = leggi(TESTO, ZONA);
  assert.equal(testoPerIlToken(tasks[1]), `<@&${MODS}>: Update the rules`);
});

function esempio(testo = TESTO): Esempio {
  return {
    team: {
      guild: 'Nova', zone: ZONA,
      people: [
        { id: AVA, name: 'Ava', username: 'ava', color: '#eb459e', about: 'Head mod' },
        { id: LEO, name: 'Leo', username: 'leo', color: '#23a55a', about: 'Mod' },
      ],
      roles: [{ id: MODS, name: 'Moderators', about: 'The mods' }],
      channels: [{ id: CANALE, name: 'staff', about: 'Private' }],
    },
    list: { title: 'Staff week', channel: CANALE, at: '2026-12-09T21:00', text: testo },
    webhooks: [{
      name: 'Rules changed', service: 'discord', trigger: 'completion', method: 'POST',
      url: 'https://discord.com/api/webhooks/<id>/<token>', headers: 'Content-Type: application/json',
      body: '{"content": "{{change}} — {{task}}", "allowed_mentions": {"parse": []}}', setup: 'x',
      postsAs: { name: 'Rules', channel: CANALE, color: '#5865f2' },
    }],
    settings: [{ setting: 'Recurring reminders', choice: 'On', why: 'x', premium: true }],
    week: [
      { at: '2026-12-07T10:00', text: 'x', card: { kind: 'notice', type: 'assigned', by: AVA, task: '2' } },
      { at: '2026-12-08T18:00', text: 'x', card: { kind: 'reminder', task: '2' } },
      { at: '2026-12-09T12:00', text: 'x', card: { kind: 'webhook', webhook: 'Rules changed', task: '2', by: LEO } },
    ],
  };
}

test('un esempio valido non ha problemi', () => {
  assert.deepEqual(problemi(esempio()), []);
});

test('il controllo trova id estranei, promemoria senza owner, webhook sconosciuti, body rotti, schede sbagliate', () => {
  const estraneo = problemi(esempio(TESTO.replace(`<#${CANALE}>`, '<#1181730456203948999>')));
  assert.ok(estraneo.some((x) => /task 1: <#1181730456203948999> non è del team/.test(x)));
  const senzaOwner = problemi(esempio(TESTO.replace(`[0m,0m,0] <@${LEO}>: `, '[0m,0m,0] ')));
  assert.ok(senzaOwner.some((x) => /task 3: un promemoria senza owner/.test(x)));
  const sconosciuto = problemi(esempio(TESTO.replace('{{wb=Rules changed}}', '{{wb=Nope}}')));
  assert.ok(sconosciuto.some((x) => /«Nope» non è fra quelli/.test(x)));
  const virgolette = problemi(esempio(TESTO.replace('No more spoilers', 'No more "spoilers"')));
  assert.ok(!virgolette.some((x) => /il body non è JSON/.test(x)));
  const rotto = esempio();
  rotto.webhooks[0].body = '{"content": {{change}}}';
  assert.ok(problemi(rotto).some((x) => /webhooks: «Rules changed»: il body non è JSON/.test(x)));
  const e = esempio();
  e.week[1].card = { kind: 'reminder', task: '9' };
  e.week[2].at = '2026-12-01T09:00';
  const p = problemi(e);
  assert.ok(p.some((x) => /il task 9 non c'è/.test(x)));
  assert.ok(p.some((x) => /fuori dalla settimana/.test(x)));
});

test('le schede: il promemoria del ruolo nel canale, la notifica con la menzione, il messaggio del webhook', () => {
  const e = esempio();
  const [notifica, promemoria, webhook] = e.week.map((m) => riproduzione(e, m)!);
  assert.equal(promemoria.dove, 'In #staff, as a reply to the list, mentioning @Moderators');
  assert.match(promemoria.html, /Staff week/);
  assert.equal(notifica.dove, 'In #staff, under the list');
  assert.match(notifica.html, /I assigned the owner to the following task/);
  assert.match(notifica.html, /Ava: I assigned the owner to a task\.\. <span class="sc-mention">@Moderators/);
  assert.equal(webhook.dove, 'In #staff, posted by the webhook');
  // {{task}} porta l'owner come codice di Discord: nel messaggio postato diventa la menzione del ruolo.
  assert.match(webhook.html, /No more spoilers — <span class="sc-mention">@Moderators<\/span>: Update the rules/);
});

test('una virgoletta nella variabile libera arriva nel messaggio del webhook (il body resta JSON)', () => {
  const e = esempio(TESTO.replace('No more spoilers', 'No more "spoilers"'));
  const webhook = riproduzione(e, e.week[2])!;
  assert.match(webhook.html, /No more (&quot;|")spoilers(&quot;|") — /);
});

test('un promemoria a una persona arriva in DM; chi prende un task da sé non si menziona', () => {
  const e = esempio();
  e.week = [
    { at: '2026-12-07T10:00', text: 'x', card: { kind: 'notice', type: 'claimed', by: LEO, task: '3' } },
    { at: '2026-12-08T18:00', text: 'x', card: { kind: 'reminder', task: '3' } },
  ];
  const [presa, dm] = e.week.map((m) => riproduzione(e, m)!);
  assert.equal(dm.dove, "In Leo's direct messages");
  assert.match(presa.html, /Leo: I took a task\.\./);
  assert.doesNotMatch(presa.html, /I took a task\.\. <span class="sc-mention">/);
  assert.equal(giornoEOra('2026-12-08T18:00', ZONA), 'Tuesday, 6:00 PM');
});
