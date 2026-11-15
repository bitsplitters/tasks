/*
 * Il test delle regole del bot nella demo (piano 2026-11-15-demo-fedele.md, compito 5, nel repo team-tasks-manager):
 * ogni caso viene dal codice del bot che la regola replica, citato accanto. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COACHES, LEO, MIA, posizione, statoIniziale } from '../src/components/home/demo/modello.ts';
import type { Stato, Task } from '../src/components/home/demo/modello.ts';
import {
  avanzamento, eliminaTask, eliminaTaskConfermato, prosa, prosaDelTask, rinumera, salvaTesto, salvaTestoActivity,
  spunta, statoDeiGruppi, tagDelTesto, tokenTolti,
} from '../src/components/home/demo/regole.ts';
import type { Esito } from '../src/components/home/demo/regole.ts';

/** I task come «posizione prima parola»: '2.1 Clip'. */
const elenco = (s: Stato) => s.lista.tasks.map((t) => `${posizione(t.pos)} ${t.testo.split(' ')[0]}`);
const fatti = (s: Stato) => s.lista.tasks.filter((t) => t.fatto).map((t) => posizione(t.pos));
const task = (main: number, sub: number, testo: string, fatto = false): Task => ({ pos: { main, sub }, testo, fatto });
const conTasks = (tasks: Task[]): Stato => ({ ...statoIniziale(), lista: { titolo: 'x', tasks } });

/** Lo stato di un esito «fatto»: un altro esito fa fallire il test. */
function statoDi(esito: Esito): Stato {
  assert.equal(esito.tipo, 'fatto', JSON.stringify(esito));
  return (esito as Extract<Esito, { tipo: 'fatto' }>).stato;
}

// 5a — La spunta, la barra, le posizioni, l'eliminazione

test('la spunta di un gruppo arriva ai subtask; quella di un subtask porta il gruppo (CascataSpunta)', () => {
  const s0 = statoIniziale();
  const spuntato = spunta(s0, '2', true);
  assert.deepEqual(fatti(spuntato), ['1', '2', '2.1']);
  assert.deepEqual(fatti(spunta(spuntato, '2', false)), ['1']);
  const vuota = spunta(s0, '1', false);
  assert.deepEqual(fatti(vuota), []);
  const sub = spunta(vuota, '2.1', true);
  assert.deepEqual(fatti(sub), ['2', '2.1']);
  assert.deepEqual(fatti(spunta(sub, '2.1', false)), []);
  assert.deepEqual(fatti(spunta(s0, '3', true)), ['1', '3']);
  // La spunta non tocca lo stato di prima, né l'owner e il promemoria.
  assert.deepEqual(s0, statoIniziale());
  assert.deepEqual(spunta(s0, '3', true).lista.tasks[3].owner, { tipo: 'persona', id: MIA });
});

test('un gruppo coi subtask si completa quando li ha tutti: cambia solo il gruppo cliccato', () => {
  const s = conTasks([task(1, 0, 'a'), task(1, 1, 'b', true), task(1, 2, 'c'), task(2, 0, 'd'), task(2, 1, 'e')]);
  const tutti = spunta(s, '1.2', true);
  assert.deepEqual(fatti(tutti), ['1', '1.1', '1.2']);
  assert.deepEqual(fatti(spunta(tutti, '1.1', false)), ['1.2']);
  assert.throws(() => spunta(s, '9', true), /9/);
});

test('la barra va di 5 in 5 per difetto: mai 0 con un task fatto, mai 100 a lista non finita (BarraDellaLista)', () => {
  const conFatti = (n: number, di: number) => ({
    titolo: 'x', tasks: Array.from({ length: di }, (_, i) => task(i + 1, 0, 't', i < n)),
  });
  assert.deepEqual([0, 1, 3, 4, 5].map((n) => avanzamento(conFatti(n, 5))), [0, 20, 60, 80, 100]);
  assert.equal(avanzamento(conFatti(1, 30)), 5);
  assert.equal(avanzamento(conFatti(29, 30)), 95);
  assert.equal(avanzamento(conFatti(2, 3)), 65);
  assert.equal(avanzamento({ titolo: 'x', tasks: [] }), 0);
  assert.equal(avanzamento(statoIniziale().lista), 20);
});

test('le posizioni si rinumerano come updateTasksPosition, orfani compresi', () => {
  const senzaIl2 = statoIniziale().lista.tasks.filter((t) => posizione(t.pos) !== '2');
  assert.deepEqual(rinumera(senzaIl2).map((t) => posizione(t.pos)), ['1', '1.1', '2', '3']);
  const orfani = [task(1, 1, 'a'), task(1, 2, 'b'), task(2, 0, 'c')];
  assert.deepEqual(rinumera(orfani).map((t) => posizione(t.pos)), ['0.1', '0.2', '1']);
});

test('il gruppo segue i suoi subtask; un task senza subtask non cambia (updateTasksStatus)', () => {
  const tasks = [task(1, 0, 'a', true), task(2, 0, 'b'), task(2, 1, 'c', true), task(3, 0, 'd', true),
    task(3, 1, 'e'), task(4, 0, 'f')];
  assert.deepEqual(statoDeiGruppi(tasks).map((t) => t.fatto), [true, true, true, false, false, false]);
  assert.equal(tasks[1].fatto, false);
});

test("l'eliminazione: subito un task senza subtask, con una domanda un gruppo che ne ha (TaskLogic)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(elenco(statoDi(eliminaTask(s0, '4'))), ['1 Confirm', '2 Lock', '2.1 Clip', '3 VOD']);
  const senzaSub = statoDi(eliminaTask(s0, '2.1'));
  assert.deepEqual(elenco(senzaSub), ['1 Confirm', '2 Lock', '3 VOD', '4 Publish']);
  assert.deepEqual(senzaSub.lista.tasks[2].owner, { tipo: 'persona', id: MIA });
  assert.deepEqual(eliminaTask(s0, '2'), { tipo: 'domanda', domanda: { tipo: 'eliminaGruppo', pos: '2', sopra: 1 } });
  assert.deepEqual(s0, statoIniziale());
});

test('confermato, i subtask di un gruppo passano sotto quello sopra o diventano principali (senzaIlTask)', () => {
  const sotto = eliminaTaskConfermato(statoIniziale(), '2');
  assert.deepEqual(elenco(sotto), ['1 Confirm', '1.1 Clip', '2 VOD', '3 Publish']);
  assert.deepEqual(eliminaTask(sotto, '1'),
    { tipo: 'domanda', domanda: { tipo: 'eliminaGruppo', pos: '1', sopra: null } });
  assert.deepEqual(elenco(eliminaTaskConfermato(sotto, '1')), ['1 Clip', '2 VOD', '3 Publish']);
});

test("dopo l'eliminazione il gruppo segue i subtask che restano; l'ultimo task non si elimina", () => {
  const s = conTasks([task(1, 0, 'a'), task(1, 1, 'b', true), task(1, 2, 'c'), task(2, 0, 'd')]);
  assert.deepEqual(fatti(statoDi(eliminaTask(s, '1.2'))), ['1', '1.1']);
  assert.deepEqual(eliminaTask(conTasks([task(1, 0, 'a')]), '1'),
    { tipo: 'rifiuto', testo: { chiave: 'tasklist.slct.task.last.error' } });
});

// 5b — Il testo del task

const LEO_TAG = '<@1181730456203947582>';
const filtrati = (elenco: string) => ({ chiave: 'tasklist.modal.task.filtered.warning', argomenti: [elenco] });
/** Lo stato iniziale col testo del task `i` cambiato. */
function conTesto(i: number, testo: string, s: Stato = statoIniziale()): Stato {
  return { ...s, lista: { ...s.lista, tasks: s.lista.tasks.map((t, j) => (j === i ? { ...t, testo } : t)) } };
}

test('la prosa: senza i token dei pulsanti, su una riga, con gli spazi normalizzati (ModaleDelSingoloTask)', () => {
  assert.equal(prosa('  two\nlines  '), 'two lines');
  assert.equal(prosa('a \r\n\t b\u2028c'), 'a b c');
  assert.equal(prosa('Check <t:1794762840> now'), 'Check now');
  assert.equal(prosa('Ask <@1181730456203947581>: soon'), 'Ask soon');
  assert.equal(prosa('Ping {{wb=Staff alerts}} me'), 'Ping me');
  assert.equal(prosa('[1d,0m,3] go'), 'go');
  assert.equal(prosa('Compra{{wb=ci}}latte'), 'Compra latte');
  assert.equal(prosa(`Hi ${LEO_TAG}`), `Hi ${LEO_TAG}`);
  assert.equal(prosa('{{wb={{wb=x}} y}}'), '');
});

test('i token tolti: una volta ciascuno, nell\'ordine, anche quelli che si formano togliendone un altro', () => {
  assert.deepEqual(tokenTolti('Check <t:1794762840> now'), ['<t:1794762840>']);
  assert.deepEqual(tokenTolti('x <t:5> y <t:5> z <t:6>'), ['<t:5>', '<t:6>']);
  assert.deepEqual(tokenTolti('Ask <@1181730456203947581>: soon'), ['<@1181730456203947581>:']);
  assert.deepEqual(tokenTolti('{{wb=a}} [1d,0m,3] <t:5:F>'), ['{{wb=a}}', '[1d,0m,3]', '<t:5:F>']);
  assert.deepEqual(tokenTolti('{{wb={{wb=x}} y}}'), ['{{wb=x}}', '{{wb=  y}}']);
  assert.deepEqual(tokenTolti(`Hi ${LEO_TAG}`), []);
});

test('la modale del canale salva la prosa, coi tag scritti; owner e promemoria restano (TaskListMdlTask)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(salvaTesto(s0, '2', 'New text'), { tipo: 'fatto', stato: conTesto(1, 'New text') });
  assert.deepEqual(salvaTesto(s0, '2', 'New <t:5> text'),
    { tipo: 'fatto', stato: conTesto(1, 'New text'), avviso: filtrati('`<t:5>`') });
  assert.deepEqual(salvaTesto(s0, '2', LEO_TAG), { tipo: 'fatto', stato: conTesto(1, LEO_TAG) });
  assert.deepEqual(salvaTesto(s0, '3', 'VOD review'), { tipo: 'fatto', stato: conTesto(3, 'VOD review') });
  // Uguale a prima: niente cambia, ma i token tolti si dicono lo stesso.
  assert.deepEqual(salvaTesto(s0, '2', ' Lock the scrim block vs. Nova Collective <t:5>'),
    { tipo: 'fatto', stato: s0, avviso: filtrati('`<t:5>`') });
  assert.deepEqual(salvaTesto(s0, '2', '<t:5>'),
    { tipo: 'rifiuto', testo: { chiave: 'tasklist.modal.task.blank.error' } });
  assert.deepEqual(salvaTesto(s0, '2', 'Plan [1M,0m,0]'),
    { tipo: 'rifiuto', testo: { chiave: 'tasklist.modal.task.months.error' } });
  assert.deepEqual(s0, statoIniziale());
});

test("il pannello dell'Activity toglie anche i tag scritti; quelli del task restano in coda (PannelloDelTask)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(salvaTestoActivity(s0, '2', `New ${LEO_TAG}`),
    { tipo: 'fatto', stato: conTesto(1, 'New'), avviso: filtrati(`\`${LEO_TAG}\``) });
  const conTag = conTesto(1, `Lock the scrim block vs. Nova Collective ${LEO_TAG}`);
  assert.deepEqual(salvaTestoActivity(conTag, '2', 'Other'), { tipo: 'fatto', stato: conTesto(1, `Other ${LEO_TAG}`) });
  assert.deepEqual(salvaTestoActivity(conTag, '2', 'Lock the scrim block vs. Nova Collective'),
    { tipo: 'fatto', stato: conTag });
  assert.deepEqual(salvaTestoActivity(s0, '2', 'X <@&1181730456203947590> <t:5> <@!1181730456203947582>'), {
    tipo: 'fatto', stato: conTesto(1, 'X'),
    avviso: filtrati(`\`<t:5>\`, \`<@&1181730456203947590>\`, \`${LEO_TAG}\``),
  });
  const vuoto = { tipo: 'rifiuto', testo: { chiave: 'tasklist.modal.task.blank.error' } };
  assert.deepEqual(salvaTestoActivity(s0, '2', '<t:5>'), vuoto);
  assert.deepEqual(salvaTestoActivity(s0, '2', LEO_TAG), vuoto);
});

test("i tag del testo: nell'ordine, senza doppioni, senza l'owner; la prosa del task senza tag", () => {
  assert.deepEqual(tagDelTesto('a <@&1181730456203947590> <@1181730456203947581>: b <@&1181730456203947590>'),
    [{ ruolo: true, id: COACHES }]);
  assert.deepEqual(tagDelTesto(`<@!1181730456203947582> <@&1181730456203947590> ${LEO_TAG}`),
    [{ ruolo: false, id: LEO }, { ruolo: true, id: COACHES }]);
  const task = { pos: { main: 1, sub: 0 }, testo: `Lock ${LEO_TAG} the  block <@&1181730456203947590>`, fatto: false };
  assert.equal(prosaDelTask(task), 'Lock the block');
});
