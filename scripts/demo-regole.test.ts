/*
 * Il test delle regole del bot nella demo (piano 2026-11-15-demo-fedele.md, compito 5, nel repo team-tasks-manager):
 * ogni caso viene dal codice del bot che la regola replica, citato accanto. Si lancia dalla cartella tasks con
 * `node --test "scripts/*.test.ts"`.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { FUSI_DEL_BOT } from '../src/components/home/demo/fusi-del-bot.ts';
import {
  ADESSO, COACHES, LEO, MIA, PROPOSTO, SAM, ZONA, fusoDi, idRuoloTtm, listaDellaDemo, posizione, statoIniziale,
} from '../src/components/home/demo/modello.ts';
import type { Stato, Task } from '../src/components/home/demo/modello.ts';
import {
  applicaOwner, applicaOwnerActivity, applicaPromemoria, applicaTag, applicaTagActivity, applicaWebhook, avanzamento,
  campiDelPromemoria, campiDellaNuovaData, carrello, eliminaTask, eliminaTaskConfermato, imparaIlFuso, prosa,
  prosaDelTask, pulisci, pulisciConfermato, pulsantiAccesi, riapri, riapriConfermato, rifiutoDelCarrello, rinumera,
  salvaTesto, salvaTestoActivity, sceltaDellOwner, spunta, statoDeiGruppi, tagDelTesto, testoDellaLista, togliOwner,
  togliOwnerConfermato, togliPromemoria, togliTag, togliWebhook, tokenTolti, validaNuovaData, validaPromemoria,
} from '../src/components/home/demo/regole.ts';
import type { Campi, Domanda, Esito } from '../src/components/home/demo/regole.ts';
import { PRIMA_RIGA, TASTI } from '../src/components/home/scene-data.ts';

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

// 5c — Owner e tag

const TTM1 = idRuoloTtm(1);
const TTM2 = idRuoloTtm(2);
const MIA_TAG = '<@1181730456203947581>';
const COACHES_TAG = '<@&1181730456203947590>';
const persona = (id: string) => ({ ruolo: false, id });
const ruolo = (id: string) => ({ ruolo: true, id });
const rifiutoDi = (chiave: string) => ({ tipo: 'rifiuto', testo: { chiave } });
/** L'owner del task in `pos`. */
const ownerDi = (s: Stato, pos: string) => s.lista.tasks.find((t) => posizione(t.pos) === pos)?.owner;
/** Il task 3 della lista della demo senza owner né promemoria. */
function treSenzaOwner(): Task {
  const t = { ...statoIniziale().lista.tasks[3] };
  delete t.owner;
  delete t.promemoria;
  return t;
}

test("il carrello dell'owner: persona, ruolo o gruppo; persone e ruoli insieme, o più ruoli, no (RuoliTtm)", () => {
  assert.equal(carrello([], []), 'vuoto');
  assert.equal(carrello([MIA], []), 'persona');
  assert.equal(carrello([MIA, MIA], []), 'persona');
  assert.equal(carrello([MIA, LEO], []), 'gruppo');
  assert.equal(carrello([], [COACHES]), 'ruolo');
  assert.equal(carrello([], [COACHES, TTM1]), 'misto');
  assert.equal(carrello([MIA], [COACHES]), 'misto');
  // Il controllo del bot alla chiusura del menu (TaskListSlctOwner, RegoleDellOwner).
  assert.deepEqual(rifiutoDelCarrello([MIA], [COACHES]), { chiave: 'tasklist.slct.owner.mixed.error' });
  assert.equal(rifiutoDelCarrello([MIA, LEO], []), null);
  assert.equal(rifiutoDelCarrello([], []), null);
});

test("nel canale la scelta diventa l'owner; senza scelta, o con quella di adesso, si rifiuta (OwnerLogic)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(ownerDi(statoDi(applicaOwner(s0, '2', [MIA], [])), '2'), { tipo: 'persona', id: MIA });
  assert.deepEqual(ownerDi(statoDi(applicaOwner(s0, '2', [], [COACHES])), '2'), { tipo: 'ruolo', id: COACHES });
  assert.deepEqual(applicaOwner(s0, '3', [MIA], []), rifiutoDi('tasklist.slct.owner.sameselection.error'));
  assert.deepEqual(applicaOwner(s0, '2', [], []), rifiutoDi('tasklist.slct.owner.noselection.error'));
  assert.deepEqual(applicaOwner(s0, '2', [MIA], [COACHES]), rifiutoDi('tasklist.slct.owner.mixed.error'));
  // L'owner non guarda lo stato del task; il promemoria del 3 resta col nuovo owner.
  assert.deepEqual(ownerDi(statoDi(applicaOwner(s0, '1', [LEO], [])), '1'), { tipo: 'persona', id: LEO });
  assert.deepEqual(statoDi(applicaOwner(s0, '3', [LEO], [])).lista.tasks[3],
    { ...s0.lista.tasks[3], owner: { tipo: 'persona', id: LEO } });
  assert.deepEqual(s0, statoIniziale());
});

test('nel canale più persone fanno sempre un ruolo TTM<n> nuovo, col primo nome libero (RuoliOwner.crea)', () => {
  const uno = statoDi(applicaOwner(statoIniziale(), '2', [MIA, LEO], []));
  assert.deepEqual(uno.ruoli.at(-1), { id: TTM1, nome: 'TTM1', membri: [MIA, LEO], diTtm: true });
  assert.deepEqual(ownerDi(uno, '2'), { tipo: 'ruolo', id: TTM1 });
  const due = statoDi(applicaOwner(uno, '4', [LEO, MIA], []));
  assert.deepEqual(due.ruoli.at(-1), { id: TTM2, nome: 'TTM2', membri: [LEO, MIA], diTtm: true });
  assert.deepEqual(ownerDi(due, '4'), { tipo: 'ruolo', id: TTM2 });
  // Il solo caso senza ruolo nuovo: l'owner di adesso è un ruolo di TTM con quelle persone (RisoluzioneDellOwner).
  assert.deepEqual(applicaOwner(due, '2', [LEO, MIA], []), rifiutoDi('tasklist.slct.owner.sameselection.error'));
  // @Coaches ha Mia e Leo, ma non è di TTM: le stesse persone fanno un ruolo nuovo.
  const coaches = statoDi(applicaOwner(statoIniziale(), '2', [], [COACHES]));
  assert.deepEqual(ownerDi(statoDi(applicaOwner(coaches, '2', [MIA, LEO], [])), '2'), { tipo: 'ruolo', id: TTM1 });
  // Con TTM1 e TTM3 nel server il primo nome libero è TTM2 (RuoliTtm.primoNomeLibero).
  const s0 = statoIniziale();
  const buco: Stato = {
    ...s0,
    ruoli: [...s0.ruoli, { id: TTM1, nome: 'TTM1', membri: [MIA, LEO], diTtm: true },
      { id: idRuoloTtm(3), nome: 'TTM3', membri: [LEO, SAM], diTtm: true }],
  };
  const tre = statoDi(applicaOwner(buco, '4', [MIA, SAM], []));
  assert.deepEqual(tre.ruoli.map((r) => r.nome), ['Coaches', 'TTM1', 'TTM3', 'TTM2']);
  assert.deepEqual(ownerDi(tre, '4'), { tipo: 'ruolo', id: TTM2 });
});

test("nell'Activity più persone riusano il ruolo di TTM della lista con loro (PannelloDelTask.ruolo)", () => {
  const s0 = statoIniziale();
  const miaLeo = [persona(MIA), persona(LEO)];
  assert.deepEqual(ownerDi(statoDi(applicaOwnerActivity(s0, '2', [persona(MIA)])), '2'), { tipo: 'persona', id: MIA });
  assert.deepEqual(applicaOwnerActivity(s0, '3', [persona(MIA)]), { tipo: 'fatto', stato: s0 });
  const uno = statoDi(applicaOwnerActivity(s0, '2', miaLeo));
  assert.deepEqual(uno.ruoli.at(-1), { id: TTM1, nome: 'TTM1', membri: [MIA, LEO], diTtm: true });
  const riuso = statoDi(applicaOwnerActivity(uno, '4', [persona(LEO), persona(MIA)]));
  assert.deepEqual(ownerDi(riuso, '4'), { tipo: 'ruolo', id: TTM1 });
  assert.deepEqual(riuso.ruoli, uno.ruoli);
  // Le persone che il pannello mostra già, in un altro ordine: niente cambia.
  assert.deepEqual(applicaOwnerActivity(uno, '2', [persona(LEO), persona(MIA), persona(LEO)]),
    { tipo: 'fatto', stato: uno });
  // Un ruolo di TTM che non è più owner di un task della lista non si riusa: ne nasce un altro.
  const lasciato = statoDi(applicaOwnerActivity(uno, '2', [persona(SAM)]));
  assert.deepEqual(ownerDi(statoDi(applicaOwnerActivity(lasciato, '4', miaLeo)), '4'), { tipo: 'ruolo', id: TTM2 });
  // Vuota toglie l'owner col promemoria: è il Delete del pannello, dopo la sua domanda.
  assert.deepEqual(statoDi(applicaOwnerActivity(s0, '3', [])).lista.tasks[3], treSenzaOwner());
  assert.deepEqual(applicaOwnerActivity(s0, '2', []), { tipo: 'fatto', stato: s0 });
  assert.deepEqual(applicaOwnerActivity(s0, '2', [persona(MIA), ruolo(COACHES)]),
    rifiutoDi('tasklist.slct.owner.mixed.error'));
});

test("il pannello mostra un ruolo di TTM con le sue persone, un altro ruolo com'è (QuadroDellaLista)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(sceltaDellOwner(s0, s0.lista.tasks[3]), [persona(MIA)]);
  assert.deepEqual(sceltaDellOwner(s0, s0.lista.tasks[1]), []);
  const uno = statoDi(applicaOwner(s0, '2', [MIA, LEO], []));
  assert.deepEqual(sceltaDellOwner(uno, uno.lista.tasks[1]), [persona(MIA), persona(LEO)]);
  const coaches = statoDi(applicaOwner(s0, '2', [], [COACHES]));
  assert.deepEqual(sceltaDellOwner(coaches, coaches.lista.tasks[1]), [ruolo(COACHES)]);
});

test("il pulsante rosso toglie l'owner col promemoria; se deve ancora partire, prima chiede (OwnerLogic)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(togliOwner(s0, '2'), rifiutoDi('tasklist.slct.owner.delete.notpresent.error'));
  assert.deepEqual(togliOwner(s0, '3'), { tipo: 'domanda', domanda: { tipo: 'togliOwner', pos: '3' } });
  assert.deepEqual(togliOwnerConfermato(s0, '3').lista.tasks[3], treSenzaOwner());
  assert.deepEqual(togliOwner(statoDi(applicaOwner(s0, '2', [MIA], [])), '2'), { tipo: 'fatto', stato: s0 });
  // Un promemoria già passato si toglie senza chiedere.
  const tasks = s0.lista.tasks.map((t, i) => (i === 3 ? { ...t, promemoria: { at: ADESSO - 60, zona: ZONA } } : t));
  assert.deepEqual(statoDi(togliOwner({ ...s0, lista: { ...s0.lista, tasks } }, '3')).lista.tasks[3], treSenzaOwner());
});

test('nel canale i tag scelti prendono il posto di quelli del task: prima i ruoli, poi le persone (TagLogic)', () => {
  const s0 = statoIniziale();
  const leo = statoDi(applicaTag(s0, '2', [LEO], []));
  assert.equal(leo.lista.tasks[1].testo, `Lock the scrim block vs. Nova Collective ${LEO_TAG}`);
  const due = statoDi(applicaTag(leo, '2', [MIA], [COACHES]));
  assert.equal(due.lista.tasks[1].testo, `Lock the scrim block vs. Nova Collective ${COACHES_TAG} ${MIA_TAG}`);
  assert.deepEqual(applicaTag(s0, '2', [], []), rifiutoDi('tasklist.slct.tag.noselection.error'));
});

test("nell'Activity i tag vanno nell'ordine scelto; gli stessi di adesso non cambiano niente (PannelloDelTask)", () => {
  const s0 = statoIniziale();
  const due = statoDi(applicaTagActivity(s0, '2', [persona(MIA), ruolo(COACHES)]));
  assert.equal(due.lista.tasks[1].testo, `Lock the scrim block vs. Nova Collective ${MIA_TAG} ${COACHES_TAG}`);
  assert.deepEqual(applicaTagActivity(due, '2', [ruolo(COACHES), persona(MIA)]), { tipo: 'fatto', stato: due });
  assert.deepEqual(statoDi(applicaTagActivity(due, '2', [])), s0);
  assert.deepEqual(applicaTagActivity(s0, '2', []), { tipo: 'fatto', stato: s0 });
  assert.deepEqual(applicaTagActivity(conTesto(1, LEO_TAG), '2', []), rifiutoDi('activity.tag.delete.blank'));
});

test('il pulsante rosso dei tag li toglie tutti, se al task resta un testo (TagLogic.restaSenzaTesto)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(togliTag(s0, '2'), rifiutoDi('tasklist.slct.tag.delete.notpresent.error'));
  const conTag = conTesto(1, `Lock ${LEO_TAG} the  scrim block ${COACHES_TAG}`);
  assert.equal(statoDi(togliTag(conTag, '2')).lista.tasks[1].testo, 'Lock the scrim block');
  assert.deepEqual(togliTag(conTesto(1, LEO_TAG), '2'), rifiutoDi('tasklist.slct.tag.delete.blank.error'));
});

// 5d — Il promemoria, il webhook

/** I campi che la modale del promemoria propone sul task 2: adesso più dieci minuti, a Roma. */
const CAMPI: Campi = { giorno: '15', mese: '11', anno: '2026', ora: '18:14', zona: ZONA };
const conCampi = (diversi: Partial<Campi>): Campi => ({ ...CAMPI, ...diversi });
const E_FUSO = 'tasklist.modal.alert.timezone.error';
const E_MESE = 'tasklist.modal.when.month.error';
const E_ANNO = 'tasklist.modal.when.year.error';
const E_DATA = 'tasklist.modal.when.date.error';
const E_ORA = 'tasklist.modal.when.time.error';
const E_MINUTI = 'tasklist.modal.alert.date.minutes.error';

/** Lo stato iniziale, o `s`, col task `i` cambiato. */
function conIlTask(i: number, cambi: Partial<Task>, s = statoIniziale()): Stato {
  return { ...s, lista: { ...s.lista, tasks: s.lista.tasks.map((t, j) => (j === i ? { ...t, ...cambi } : t)) } };
}

test('i fusi della modale sono quelli del bot, maiuscole comprese: Intl li converte tutti (TimeZones)', () => {
  assert.equal(FUSI_DEL_BOT.size, 604);
  const presi = ['Europe/Rome', 'Asia/Kolkata', 'Asia/Calcutta', 'America/Argentina/Buenos_Aires', 'UTC', 'GMT'];
  for (const z of [...presi, 'Etc/GMT-14', 'SystemV/AST4', 'US/Eastern']) assert.ok(FUSI_DEL_BOT.has(z), z);
  for (const z of ['europe/rome', 'Mars/Olympus', 'Europe/Rome ', '']) assert.ok(!FUSI_DEL_BOT.has(z), z);
  // daiCampi converte con Intl: nessun fuso del bot va perso per colpa del motore.
  for (const z of FUSI_DEL_BOT) assert.doesNotThrow(() => new Intl.DateTimeFormat('en', { timeZone: z }), z);
});

test('la modale del promemoria propone adesso più dieci minuti, o la data del task (WhenModalFields)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(campiDelPromemoria(s0, '2'), CAMPI);
  const alle2030 = Date.UTC(2026, 10, 15, 19, 30) / 1000;
  const conLe2030 = conIlTask(3, { promemoria: { at: alle2030, zona: ZONA } });
  assert.deepEqual(campiDelPromemoria(conLe2030, '3'), conCampi({ ora: '20:30' }));
  // Il giorno senza zero davanti, l'ora con.
  const il5 = conIlTask(3, { promemoria: { at: Date.UTC(2026, 11, 5, 8, 0) / 1000, zona: ZONA } });
  assert.deepEqual(campiDelPromemoria(il5, '3'), conCampi({ giorno: '5', mese: '12', ora: '09:00' }));
  assert.deepEqual(campiDelPromemoria(s0, '1'), rifiutoDi('tasklist.slct.alert.checkedtask.error'));
});

test('la modale controlla il fuso e il mese, poi anno, data e ora: il primo che non va (WhenFieldsValidator)', () => {
  assert.deepEqual(validaPromemoria(CAMPI), { at: PROPOSTO });
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'Mars/Olympus' })), { errori: [E_FUSO] });
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'europe/rome' })), { errori: [E_FUSO] });
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'Asia/Kolkata', ora: '22:44' })), { at: PROPOSTO });
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'Asia/Calcutta', ora: '22:44' })), { at: PROPOSTO });
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'Mars/Olympus', mese: '' })), { errori: [E_FUSO, E_MESE] });
  assert.deepEqual(validaPromemoria(conCampi({ mese: '' })), { errori: [E_MESE] });
  // Anno, data e ora si guardano solo col fuso e il mese a posto.
  assert.deepEqual(validaPromemoria(conCampi({ zona: 'Mars/Olympus', anno: '2025' })), { errori: [E_FUSO] });
  assert.deepEqual(validaPromemoria(conCampi({ anno: '2025' })), { errori: [E_ANNO] });
  assert.deepEqual(validaPromemoria(conCampi({ anno: '2025', ora: '25:00' })), { errori: [E_ANNO] });
  const date: Partial<Campi>[] = [
    { anno: 'abcd' }, { giorno: '31' }, { giorno: 'x' }, { giorno: '0' }, { giorno: '31', ora: '25:00' },
    { giorno: '29', mese: '2', anno: '2027' },
  ];
  for (const d of date) assert.deepEqual(validaPromemoria(conCampi(d)), { errori: [E_DATA] }, JSON.stringify(d));
  for (const ora of ['18.14', '25:00', '24:00', '8:140']) {
    assert.deepEqual(validaPromemoria(conCampi({ ora })), { errori: [E_ORA] }, ora);
  }
  // Integer.parseInt dopo trim(): il segno davanti va; il 29 febbraio negli anni bisestili.
  assert.deepEqual(validaPromemoria(conCampi({ giorno: '+5', mese: '12' })), { at: PROPOSTO + 20 * 86400 });
  const bisestile = conCampi({ giorno: '29', mese: '2', anno: '2028' });
  assert.deepEqual(validaPromemoria(bisestile), { at: Date.UTC(2028, 1, 29, 17, 14) / 1000 });
  // L'anno di adesso è quello di UTC (TimeUtil.nowZoned).
  assert.deepEqual(validaPromemoria(CAMPI, Date.UTC(2027, 0, 1) / 1000), { errori: [E_ANNO] });
});

test('il promemoria sta almeno cinque minuti avanti, in minuti interi (RegoleDelPromemoria.abbastanzaAvanti)', () => {
  assert.deepEqual(validaPromemoria(conCampi({ ora: '18:09' })), { at: ADESSO + 300 });
  assert.deepEqual(validaPromemoria(conCampi({ ora: '18:08' })), { errori: [E_MINUTI] });
  assert.deepEqual(validaPromemoria(conCampi({ ora: '17:00' })), { errori: [E_MINUTI] });
  assert.deepEqual(validaPromemoria(conCampi({ giorno: '14' })), { errori: [E_MINUTI] });
  assert.deepEqual(validaPromemoria(CAMPI, PROPOSTO - 300), { at: PROPOSTO });
  assert.deepEqual(validaPromemoria(CAMPI, PROPOSTO - 299), { errori: [E_MINUTI] });
});

test('il promemoria salvato dà al task senza owner chi lo salva; lo stesso minuto non cambia (ReminderSaver)', () => {
  const s0 = statoIniziale();
  const due = statoDi(applicaPromemoria(s0, '2', PROPOSTO, ZONA));
  const sam = { tipo: 'persona', id: SAM };
  assert.deepEqual(due.lista.tasks[1], { ...s0.lista.tasks[1], owner: sam, promemoria: { at: PROPOSTO, zona: ZONA } });
  const tre = statoDi(applicaPromemoria(s0, '3', PROPOSTO + 3600, ZONA));
  assert.deepEqual(tre.lista.tasks[3], { ...s0.lista.tasks[3], promemoria: { at: PROPOSTO + 3600, zona: ZONA } });
  assert.deepEqual(tre.lista.tasks[3].owner, { tipo: 'persona', id: MIA });
  assert.deepEqual(applicaPromemoria(s0, '1', PROPOSTO, ZONA), rifiutoDi('tasklist.slct.alert.checkedtask.error'));
  const invariato = { tipo: 'fatto', stato: s0, messaggio: { chiave: 'tasklist.reminder.unchanged' } };
  assert.deepEqual(applicaPromemoria(s0, '3', PROPOSTO, ZONA), invariato);
  assert.deepEqual(applicaPromemoria(s0, '3', PROPOSTO + 59, ZONA), invariato);
  assert.deepEqual(s0, statoIniziale());
});

test('il fuso scritto al posto di quello proposto diventa quello di chi agisce (UserTimezoneService.learn)', () => {
  const s0 = statoIniziale();
  assert.equal(fusoDi(s0), ZONA);
  assert.equal('fuso' in statoDi(applicaPromemoria(s0, '2', PROPOSTO, ZONA)), false);
  const kolkata = statoDi(applicaPromemoria(s0, '2', PROPOSTO, 'Asia/Kolkata'));
  assert.equal(fusoDi(kolkata), 'Asia/Kolkata');
  assert.deepEqual(kolkata.lista.tasks[1].promemoria, { at: PROPOSTO, zona: 'Asia/Kolkata' });
  assert.deepEqual(campiDelPromemoria(kolkata, '4'), conCampi({ ora: '22:44', zona: 'Asia/Kolkata' }));
  assert.equal(fusoDi(statoDi(applicaPromemoria(kolkata, '4', PROPOSTO, ZONA))), ZONA);
  // Anche quando il promemoria poi resta com'era.
  assert.equal(fusoDi(statoDi(applicaPromemoria(s0, '3', PROPOSTO, 'Asia/Kolkata'))), 'Asia/Kolkata');
});

test('il pulsante rosso del promemoria lascia owner, tag e webhook, anche su un task completato (AlertLogic)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(togliPromemoria(s0, '2'), rifiutoDi('tasklist.slct.alert.noreminder.error'));
  const tre = statoDi(togliPromemoria(s0, '3')).lista.tasks[3];
  assert.equal('promemoria' in tre, false);
  assert.deepEqual(tre.owner, { tipo: 'persona', id: MIA });
  const completato = conIlTask(0, { promemoria: { at: PROPOSTO, zona: ZONA } });
  assert.deepEqual(statoDi(togliPromemoria(completato, '1')), s0);
});

test('il webhook del menu va sul task, anche completato; senza una scelta il bot la chiede (WebhookLogic)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(applicaWebhook(s0, '2', null), rifiutoDi('tasklist.slct.webhook.none'));
  const scrim = statoDi(applicaWebhook(s0, '2', 'Scrim results'));
  assert.deepEqual(scrim.lista.tasks[1], { ...s0.lista.tasks[1], webhook: 'Scrim results' });
  assert.equal(statoDi(applicaWebhook(scrim, '2', 'Staff alerts')).lista.tasks[1].webhook, 'Staff alerts');
  assert.equal(statoDi(applicaWebhook(s0, '1', 'Staff alerts')).lista.tasks[0].webhook, 'Staff alerts');
  assert.deepEqual(togliWebhook(s0, '2'), rifiutoDi('tasklist.slct.webhook.delete.notpresent.error'));
  assert.deepEqual(statoDi(togliWebhook(scrim, '2')), s0);
});

// 5e — Pulisci, Riapri tutti, il blocco, il testo della lista

/** Lo stato iniziale, o `s`, coi task in `posizioni` spuntati: un gruppo porta con sé i suoi subtask (spunta). */
function conSpunte(posizioni: string[], s = statoIniziale()): Stato {
  return posizioni.reduce((stato, pos) => spunta(stato, pos, true), s);
}
const domandaDi = (domanda: Domanda) => ({ tipo: 'domanda', domanda });
const pulizia = (completati: number, avvertenza: 'all' | 'reminders' | 'tags' | 'plain') =>
  domandaDi({ tipo: 'pulisci', completati, avvertenza });
const riapertura = (spuntati: number, nuovaData: boolean) => domandaDi({ tipo: 'riapri', spuntati, nuovaData });
/** La data scelta con New date: le 9 del 16 novembre a Roma. */
const DOMANI = Date.UTC(2026, 10, 16, 8, 0) / 1000;

test("Pulisci chiede con l'avvertenza di ciò che esce; l'owner non è un tag (TaskListBtnClean, Pulizia)", () => {
  const s0 = statoIniziale();
  assert.deepEqual(pulisci(s0), pulizia(1, 'plain'));
  assert.deepEqual(pulisci(spunta(s0, '1', false)), rifiutoDi('tasklist.btn.clean.noselection'));
  assert.deepEqual(pulisci(conSpunte(['2', '3', '4'])), rifiutoDi('tasklist.btn.clean.emptylist'));
  assert.deepEqual(pulisci(conSpunte(['3'])), pulizia(2, 'reminders'));
  const conTag = conTesto(4, `Publish the match-day graphic ${LEO_TAG}`);
  assert.deepEqual(pulisci(conSpunte(['4'], conTag)), pulizia(2, 'tags'));
  assert.deepEqual(pulisci(conSpunte(['3', '4'], conTag)), pulizia(3, 'all'));
  assert.deepEqual(pulisci(conSpunte(['2'])), pulizia(3, 'plain'));
});

test('il gruppo di un subtask completato resta col suo promemoria: non conta (Pulizia)', () => {
  const gruppo: Task = { ...task(1, 0, 'Group'), promemoria: { at: PROPOSTO, zona: ZONA } };
  const s = conTasks([gruppo, task(1, 1, 'Done', true), task(1, 2, 'Open')]);
  assert.deepEqual(pulisci(s), pulizia(1, 'plain'));
  const pulita = pulisciConfermato(s);
  assert.deepEqual(elenco(pulita), ['1 Group', '1.1 Open']);
  assert.deepEqual(pulita.lista.tasks[0], gruppo);
});

test('Pulisci confermato toglie i completati e rinumera gli altri (TaskListMdlCleanConfirm)', () => {
  const s0 = statoIniziale();
  const pulita = pulisciConfermato(s0);
  assert.deepEqual(elenco(pulita), ['1 Lock', '1.1 Clip', '2 VOD', '3 Publish']);
  assert.deepEqual(pulita.lista.tasks[2], { ...s0.lista.tasks[3], pos: { main: 2, sub: 0 } });
  assert.deepEqual({ ...pulita, lista: s0.lista }, s0);
  assert.deepEqual(elenco(pulisciConfermato(conSpunte(['2']))), ['1 VOD', '2 Publish']);
});

test('Riapri tutti chiede quanti task riapre; New date solo per un promemoria da riaprire (Riapertura)', () => {
  const s0 = statoIniziale();
  assert.deepEqual(riapri(spunta(s0, '1', false)), rifiutoDi('tasklist.reopen.none.error'));
  assert.deepEqual(riapri(s0), riapertura(1, false));
  assert.deepEqual(riapri(conSpunte(['3'])), riapertura(2, true));
  assert.deepEqual(riapri(conSpunte(['2'])), riapertura(3, false));
});

test('Reopen riapre tutto e lascia i promemoria dove stavano (Riapertura.riaperti)', () => {
  const s0 = statoIniziale();
  const daFare = { ...s0, lista: { ...s0.lista, tasks: s0.lista.tasks.map((t) => ({ ...t, fatto: false })) } };
  assert.deepEqual(statoDi(riapriConfermato(conSpunte(['2', '3']))), daFare);
  assert.deepEqual(statoDi(riapriConfermato(s0, { at: DOMANI, zona: ZONA })), daFare);
});

test("Reopen rifiuta la lista cambiata col ponte aperto: nell'Activity, bloccata, senza completati", () => {
  const s0 = statoIniziale();
  assert.deepEqual(riapriConfermato(spunta(s0, '1', false)), rifiutoDi('tasklist.reopen.none.error'));
  assert.deepEqual(riapriConfermato({ ...s0, bloccata: true }), rifiutoDi('tasklist.action.unavailable.error'));
  assert.deepEqual(riapriConfermato({ ...s0, inActivity: true }), rifiutoDi('tasklist.modal.activity.error'));
  const tutte = { ...s0, inActivity: true, bloccata: true };
  assert.deepEqual(riapriConfermato(tutte, { at: DOMANI, zona: ZONA }), rifiutoDi('tasklist.modal.activity.error'));
});

test('New date: il primo promemoria dei riaperti cade sulla data, gli altri lo seguono (ReminderReanchorer)', () => {
  // Il 2, da fare, ha il promemoria più vecchio: resta dov'è e non conta.
  const alle18 = PROPOSTO - 14 * 60;
  const conIl2 = conIlTask(1, { promemoria: { at: alle18, zona: ZONA } }, conSpunte(['3', '4']));
  const s = conIlTask(4, { promemoria: { at: PROPOSTO + 3600, zona: ZONA } }, conIl2);
  const riaperta = statoDi(riapriConfermato(s, { at: DOMANI, zona: ZONA }));
  assert.deepEqual(fatti(riaperta), []);
  const date = riaperta.lista.tasks.map((t) => t.promemoria?.at);
  assert.deepEqual(date, [undefined, alle18, undefined, DOMANI, DOMANI + 3600]);
  assert.equal('fuso' in riaperta, false);
  const kolkata = statoDi(riapriConfermato(s, { at: DOMANI, zona: 'Asia/Kolkata' }));
  assert.equal(fusoDi(kolkata), 'Asia/Kolkata');
  assert.deepEqual(kolkata.lista.tasks[3].promemoria, { at: DOMANI, zona: 'Asia/Kolkata' });
  assert.deepEqual(kolkata.lista.tasks[1].promemoria, { at: alle18, zona: ZONA });
});

test('New date: adesso più dieci minuti; la data troppo vicina ha il testo del clone (TaskListMdlReopenWhen)', () => {
  const conPromemoria = conIlTask(3, { promemoria: { at: DOMANI, zona: ZONA } }, conSpunte(['3']));
  assert.deepEqual(campiDellaNuovaData(conPromemoria), CAMPI);
  const kolkata = imparaIlFuso(statoIniziale(), 'Asia/Kolkata');
  assert.deepEqual(campiDellaNuovaData(kolkata), conCampi({ ora: '22:44', zona: 'Asia/Kolkata' }));
  assert.deepEqual(validaNuovaData(CAMPI), { at: PROPOSTO });
  assert.deepEqual(validaNuovaData(conCampi({ ora: '18:08' })), { errori: ['tasklist.modal.clone.date.now.error'] });
  assert.deepEqual(validaNuovaData(conCampi({ zona: 'Mars/Olympus', mese: '' })), { errori: [E_FUSO, E_MESE] });
  assert.deepEqual(validaNuovaData(conCampi({ anno: '2025' })), { errori: [E_ANNO] });
  assert.deepEqual(validaPromemoria(conCampi({ ora: '18:08' })), { errori: [E_MINUTI] });
});

test('il fuso scritto al posto di quello proposto diventa quello di chi guarda (UserTimezoneService.learn)', () => {
  const s0 = statoIniziale();
  assert.equal(imparaIlFuso(s0, ZONA), s0);
  const kolkata = imparaIlFuso(s0, 'Asia/Kolkata');
  assert.deepEqual(kolkata, { ...s0, fuso: 'Asia/Kolkata' });
  assert.equal(imparaIlFuso(kolkata, 'Asia/Kolkata'), kolkata);
  assert.equal(fusoDi(imparaIlFuso(kolkata, ZONA)), ZONA);
});

test("la lista libera ha tutto acceso; bloccata, solo More; nell'Activity, solo Join (BloccoLista)", () => {
  const s0 = statoIniziale();
  const tutti = [...PRIMA_RIGA.map((p) => p.k), ...TASTI.map((t) => t.k), 'sel'];
  assert.equal(new Set(tutti).size, 11);
  assert.deepEqual([...pulsantiAccesi(s0)].sort(), tutti.sort());
  assert.deepEqual([...pulsantiAccesi({ ...s0, bloccata: true })], ['more']);
  assert.deepEqual([...pulsantiAccesi({ ...s0, inActivity: true })], ['join']);
});

test('il testo della lista è quello della modale di Modifica in blocco (ModalUITaskConverter.taskToText)', () => {
  const vod = `<t:1794762840> [0m,0m,0] ${MIA_TAG}: VOD review: mid rotations, game 3`;
  assert.equal(testoDellaLista(listaDellaDemo()), [
    "- [X] Confirm the five-man roster for Saturday's scrim block",
    '- [] Lock the scrim block vs. Nova Collective',
    ' - [] Clip the three teamfights for the review',
    `- [] ${vod}`,
    '- [] Publish the match-day graphic',
  ].join('\n'));
  const riga = (s: Stato, i: number) => testoDellaLista(s.lista).split('\n')[i];
  const coaches = conIlTask(1, { webhook: 'Scrim results', owner: { tipo: 'ruolo', id: COACHES } });
  assert.equal(riga(coaches, 1), `- [] {{wb=Scrim results}} ${COACHES_TAG}: Lock the scrim block vs. Nova Collective`);
  assert.equal(riga(coaches, 2), ' - [] Clip the three teamfights for the review');
  assert.equal(riga(conIlTask(3, { webhook: 'Staff alerts' }), 3), `- [] {{wb=Staff alerts}} ${vod}`);
  assert.equal(riga(conTesto(1, `Lock the scrim block ${LEO_TAG}`), 1), `- [] Lock the scrim block ${LEO_TAG}`);
  assert.equal(riga(conSpunte(['2']), 2), ' - [X] Clip the three teamfights for the review');
});
