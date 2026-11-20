/*
 * Il test dei testi del bot nella demo (piano 2026-11-15-demo-fedele.md, compito 3, nel repo team-tasks-manager): ogni
 * testo è quello del bundle inglese del bot; le funzioni che li compongono fanno ciò che fa il bot. Si lancia dalla
 * cartella tasks con `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { PROPOSTO, statoIniziale } from '../src/components/home/demo/modello.ts';
import {
  TESTI, avviso, elencoDeiTolti, emoji, rispostaDellEsito, testo, testoDegliErrori, testoDelPromemoria,
  testoDellaDomanda, testoDi,
} from '../src/components/home/demo/testi.ts';
import { FRASI, FRASI_NEL_CANALE } from '../src/components/home/scene-data.ts';

const ESCAPE: Record<string, string> = { t: '\t', n: '\n', r: '\r', f: '\f' };

/**
 * Le coppie di un file .properties come le legge java.util.Properties: una riga che comincia con «#» o «!» è un
 * commento; la chiave finisce al primo «=», «:» o spazio senza «\» davanti; gli spazi attorno al separatore non
 * contano; una riga che finisce con un numero dispari di «\» continua sulla seguente, senza gli spazi iniziali di
 * quella (e lì un «#» non apre un commento); «\n», «\t», «\uXXXX» sono escape, una «\» davanti a un altro carattere
 * lo lascia com'è.
 */
function leggiProperties(sorgente: string): Map<string, string> {
  const sciogli = (s: string) => s.replace(/\\(u[0-9a-fA-F]{4}|.)/g, (_, e: string) =>
    e.length === 5 ? String.fromCharCode(parseInt(e.slice(1), 16)) : (ESCAPE[e] ?? e));
  const senzaSpazi = (s: string) => s.replace(/^[ \t\f]+/, '');
  const righe = sorgente.split(/\r\n|\r|\n/);
  const coppie = new Map<string, string>();
  for (let i = 0; i < righe.length; i++) {
    let riga = senzaSpazi(righe[i]);
    if (riga === '' || riga[0] === '#' || riga[0] === '!') continue;
    while ((riga.length - riga.replace(/\\+$/, '').length) % 2 === 1) {
      riga = riga.slice(0, -1) + senzaSpazi(righe[++i] ?? '');
    }
    let fine = 0;
    while (fine < riga.length && !'=: \t\f'.includes(riga[fine])) fine += riga[fine] === '\\' ? 2 : 1;
    let valore = senzaSpazi(riga.slice(fine));
    if (valore[0] === '=' || valore[0] === ':') valore = senzaSpazi(valore.slice(1));
    coppie.set(sciogli(riga.slice(0, fine)), sciogli(valore));
  }
  return coppie;
}

/**
 * Il valore con i riferimenti ${chiave} risolti dal bundle stesso, come PropertyResolver del framework: un riferimento
 * a una chiave che non c'è, o che chiuderebbe un giro, resta com'è.
 */
function risolvi(bundle: Map<string, string>, chiave: string, inCorso = new Set<string>()): string {
  inCorso.add(chiave);
  const risolto = (bundle.get(chiave) ?? '').replace(/\$\{(.+?)\}/g, (tutto, riferita: string) =>
    bundle.has(riferita) && !inCorso.has(riferita) ? risolvi(bundle, riferita, inCorso) : tutto);
  inCorso.delete(chiave);
  return risolto;
}

test('il bundle si legge come Properties di Java', () => {
  const letto = leggiProperties([
    '# un commento = no',
    '  ! anche questo',
    '',
    'a = uno',
    'b=due  ',
    'c:tre',
    'd    quattro',
    'e = cinque \\',
    '    e sei',
    'f = riga\\nnuova \\u00e8 \\\\ fine',
    '  g  =  ',
    'h = continua \\',
    '# non è un commento',
    'chiave\\=strana = sì',
  ].join('\r\n'));
  assert.deepEqual([...letto], [
    ['a', 'uno'], ['b', 'due  '], ['c', 'tre'], ['d', 'quattro'], ['e', 'cinque e sei'],
    ['f', 'riga\nnuova è \\ fine'], ['g', ''], ['h', 'continua # non è un commento'], ['chiave=strana', 'sì'],
  ]);
});

test('i riferimenti si risolvono dal bundle; uno sconosciuto o in un giro resta com\'è', () => {
  const bundle = new Map([
    ['url', 'example.com'], ['a', 'at ${url}/x'], ['giro', '(${giro})'], ['b', '${nessuna} ${a}'],
  ]);
  assert.equal(risolvi(bundle, 'a'), 'at example.com/x');
  assert.equal(risolvi(bundle, 'giro'), '(${giro})');
  assert.equal(risolvi(bundle, 'b'), '${nessuna} at example.com/x');
});

// Il bundle del bot, nel repo accanto: senza, il confronto si salta.
const BUNDLE = new URL('../../team-tasks-manager/src/main/resources/slash-resource.properties', import.meta.url);

test('ogni testo della demo è quello del bundle inglese del bot, coi riferimenti risolti', {
  skip: !existsSync(BUNDLE) && 'manca team-tasks-manager accanto a tasks',
}, () => {
  const bundle = leggiProperties(readFileSync(BUNDLE, 'utf8'));
  for (const [chiave, valore] of Object.entries(TESTI)) {
    assert.ok(bundle.has(chiave), `${chiave}: non è nel bundle`);
    const atteso = risolvi(bundle, chiave);
    assert.doesNotMatch(atteso, /\$\{/, `${chiave}: un riferimento che non si risolve`);
    assert.equal(valore, atteso, chiave);
  }
});

test('negli apostrofi dei testi non c\'è niente che ICU leggerebbe come virgolette', () => {
  // ResourceBundleUtil.format usa ICU MessageFormat, che tiene letterale un apostrofo solo se non sta davanti a «{»,
  // «}», «#», «|» o a un altro apostrofo: finché è così, testo() non deve sapere niente delle virgolette.
  for (const [chiave, valore] of Object.entries(TESTI)) assert.doesNotMatch(valore, /'['{}#|]/, chiave);
});

test('testo mette gli argomenti al loro posto e sceglie la forma del plurale', () => {
  assert.equal(emoji('clean_blue'), '<:clean_blue:0>');
  assert.equal(testo('tasklist.modal.clean.question', emoji('clean_blue'), 1, 'Roster'),
    '<:clean_blue:0> Remove the only completed task of **Roster**?');
  assert.equal(testo('tasklist.modal.clean.question', emoji('clean_blue'), 3, 'Roster'),
    '<:clean_blue:0> Remove the 3 completed tasks of **Roster**?');
  assert.equal(testo('activity.here.list', 1), '1 person in this list');
  assert.equal(testo('activity.here.list', 2), '2 people in this list');
  assert.equal(testo('tasklist.modal.alert.title', 3), 'Set reminder for task 3');
  assert.equal(testo('tasklist.modal.alert.timezone'), 'Time zone at: timezones.bitsplitters.app');
  assert.equal(testo('tasklist.btn.clean.emptylist'),
    'Unable to proceed! Please deselect at least one task, or delete the list with **Delete list**.');
});

test("un argomento che manca resta com'è; quelli che ci sono non si rileggono", () => {
  assert.equal(testo('activity.guide.page', 2), '2 of {1}');
  assert.equal(testo('tasklist.modal.alert.title', '{1}'), 'Set reminder for task {1}');
  // Il «#» del titolo non è il numero del plurale.
  assert.equal(testo('tasklist.modal.clean.question', emoji('clean_blue'), 2, 'Week #12'),
    '<:clean_blue:0> Remove the 2 completed tasks of **Week #12**?');
});

test('una chiave che la demo non ha lancia', () => {
  assert.throws(() => testo('nessuna.chiave'), /nessuna\.chiave/);
  assert.throws(() => testo('toString'), /toString/);
});

test("avviso mette l'emoji tip in testa, al posto di ciò che c'era", () => {
  assert.equal(avviso('No tasks selected.'), '<:tip:0> No tasks selected.');
  assert.equal(avviso(testo('tasklist.reopen.none.error')),
    '<:tip:0> No task is completed: there is nothing to reopen.');
  assert.equal(avviso(testo('tasklist.slct.owner.mixed.error', emoji('tip'))),
    '<:tip:0> A task has one owner: several people or one role — not people and roles together, and not more than ' +
    'one role.');
  // Più emoji in fila, quelle Unicode del vecchio standard, gli spazi: se ne vanno tutte (TTMEmbed.EMOJI_INIZIALE).
  assert.equal(avviso('  ⚠️ <:fail:0>  ❌ Careful'), '<:tip:0> Careful');
});

test('elencoDeiTolti scrive i token fra apici inversi e si ferma prima dei 1500 caratteri', () => {
  assert.equal(elencoDeiTolti(['<t:5>', '{{wb=a`b}}']), "`<t:5>`, `{{wb=a'b}}`");
  // Quaranta token da quaranta caratteri: ogni voce ne conta 42, più i due di «, ». La trentacinquesima porterebbe
  // la somma a 34 × 44 + 42 = 1538, oltre 1500: al suo posto «…».
  const tolti = Array.from({ length: 40 }, (_, i) => `t${String(i).padStart(2, '0')}`.padEnd(40, 'x'));
  const voci = elencoDeiTolti(tolti).split(', ');
  assert.equal(voci.length, 35);
  assert.deepEqual(voci.slice(0, 34), tolti.slice(0, 34).map((t) => `\`${t}\``));
  assert.equal(voci[34], '…');
});

test("la domanda sull'owner e quelle sull'eliminazione di un gruppo", () => {
  assert.equal(testoDellaDomanda({ tipo: 'togliOwner', pos: '3' }, 'Roster'),
    '<:owner_blue:0> Task **3** has a reminder: without an owner it would reach no one, so the reminder is removed ' +
    'too.\n\nSubmit to remove the owner and its reminder, or close the window to leave everything as it is.');
  assert.equal(testoDellaDomanda({ tipo: 'eliminaGruppo', pos: '2', sopra: 1 }, 'Roster'),
    '<:task_blue:0> Task **2** has subtasks. If you delete it, its subtasks stay where they are and become subtasks ' +
    'of task **1**, the group right above.\n\nSubmit to delete the task, or close the window to leave everything as ' +
    'it is.');
  assert.equal(testoDellaDomanda({ tipo: 'eliminaGruppo', pos: '1', sopra: null }, 'Roster'),
    '<:task_blue:0> Task **1** has subtasks. If you delete it, its subtasks stay where they are and, with no group ' +
    'above, all become main tasks.\n\nSubmit to delete the task, or close the window to leave everything as it is.');
});

test('le domande di Pulisci e di Riapri tutti, col titolo senza spazi attorno', () => {
  assert.equal(testoDellaDomanda({ tipo: 'pulisci', completati: 1, avvertenza: 'plain' }, '  Roster '),
    "<:clean_blue:0> Remove the only completed task of **Roster**?\n\nIt leaves the list for good. If your server's " +
    "configuration allows it, the notification in the list's channel or in its own thread will show the removed " +
    'task.\n-# Submit to confirm, close this window to cancel.');
  assert.equal(testoDellaDomanda({ tipo: 'pulisci', completati: 2, avvertenza: 'all' }, 'Roster'),
    '<:clean_blue:0> Remove the 2 completed tasks of **Roster**?\n\nThey leave the list for good, together with ' +
    "their reminders and tags. If your server's configuration allows it, the notification in the list's channel or " +
    'in its own thread will show the removed tasks.\n-# Submit to confirm, close this window to cancel.');
  assert.equal(testoDellaDomanda({ tipo: 'riapri', spuntati: 2, nuovaData: true }, 'Roster'),
    '<:reopen_blue:0> Reopen the 2 completed tasks of **Roster**?\n\nEvery task goes back to to-do: those with a ' +
    'webhook call it.\n\nWith **New date** you also move the reminders of the tasks you reopen: the first one in the calendar ' +
    'lands on the date you pick, the others follow at the same distance from it. The reminders of tasks still to do ' +
    'stay as they are.');
  assert.equal(testoDellaDomanda({ tipo: 'riapri', spuntati: 1, nuovaData: false }, 'Roster'),
    '<:reopen_blue:0> Reopen the only completed task of **Roster**?\n\nEvery task goes back to to-do: those with a ' +
    'webhook call it.');
});

test("gli errori del promemoria, uno per riga nell'avviso della modale", () => {
  assert.equal(testoDegliErrori(['tasklist.modal.alert.timezone.error', 'tasklist.modal.when.month.error']),
    '<:tip:0> **Unable to create reminder due to the following errors:**\n\n- **Incorrect time zone**. There is no ' +
    'match between the official time zones and the one you entered. Copy and paste your zone by searching for it on ' +
    '[Time Zone Picker](https://timezones.bitsplitters.app).\nInvalid month: pick one from the list.');
});

test('testoDi compone il testo di una regola, con i suoi argomenti', () => {
  assert.equal(testoDi({ chiave: 'tasklist.slct.webhook.none' }),
    'Choose a webhook first, then select the task to associate it with.');
  assert.equal(testoDi({ chiave: 'tasklist.modal.alert.title', argomenti: ['2.1'] }), 'Set reminder for task 2.1');
});

test("rispostaDellEsito: ciò che il bot risponde all'esito di un'azione, nel fumetto della demo", () => {
  const s0 = statoIniziale();
  // Il rifiuto e l'avviso sono avvisi del bot (TTMEmbed.avviso): l'emoji tip al posto del {0}.
  assert.equal(rispostaDellEsito({ tipo: 'rifiuto', testo: { chiave: 'tasklist.slct.owner.mixed.error' } }),
    '<:tip:0> A task has one owner: several people or one role — not people and roles together, and not more than ' +
    'one role.');
  const tolti = {
    chiave: 'tasklist.modal.task.filtered.warning', argomenti: [elencoDeiTolti(['{{wb=Staff alerts}}'])],
  };
  assert.equal(rispostaDellEsito({ tipo: 'fatto', stato: s0, avviso: tolti }),
    '<:tip:0> I removed `{{wb=Staff alerts}}` from the task text.\n\nThis form only changes the task\'s content: ' +
    'owners, tags, reminders and webhooks have their own buttons.');
  // Il messaggio prende il posto della riuscita, senza emoji: «No changes» è un embed semplice (ReminderSaver).
  const nienteDiNuovo = { chiave: 'tasklist.reminder.unchanged' };
  assert.equal(rispostaDellEsito({ tipo: 'fatto', stato: s0, messaggio: nienteDiNuovo }, testoDelPromemoria(PROPOSTO)),
    'No changes: the reminder stays as it was.');
  // Una riuscita senza parole dice quella data, se c'è; una domanda apre la sua modale.
  assert.equal(rispostaDellEsito({ tipo: 'fatto', stato: s0 }), null);
  assert.equal(rispostaDellEsito({ tipo: 'fatto', stato: s0 }, testoDelPromemoria(PROPOSTO)), `📅 <t:${PROPOSTO}:F>`);
  assert.equal(rispostaDellEsito({ tipo: 'domanda', domanda: { tipo: 'togliOwner', pos: '3' } }), null);
});

test("Owner blu: nel selettore del canale la frase del claim, nel pannello dell'Activity quella di sempre", () => {
  assert.equal(FRASI_NEL_CANALE.owner.blue, TESTI['tasklist.slct.activities.hint.owner.take']);
  assert.equal(FRASI.owner.blue, TESTI['tasklist.slct.activities.hint.owner.edit']);
  assert.deepEqual({ ...FRASI_NEL_CANALE, owner: FRASI.owner }, FRASI);
});
