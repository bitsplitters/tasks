/*
 * Le regole del bot nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 5; tutti e due nel repo team-tasks-manager): funzioni pure
 * che ricevono lo stato con la scelta di chi guarda e restituiscono un esito, cioè lo stato nuovo, un rifiuto oppure
 * una domanda. Qui anche i tipi che le regole condividono coi testi (testi.ts) e con l'interfaccia.
 */
import { FUSI_DEL_BOT } from './fusi-del-bot.ts';
import { ADESSO, PROPOSTO, SAM, campiDi, daiCampi, fusoDi, idRuoloTtm, posizione } from './modello.ts';
import type { Lista, Owner, Pos, Ruolo, Stato, Task } from './modello.ts';
import { elencoDeiTolti } from './testi.ts';

/** Un testo del bot per chiave, con gli argomenti: lo compone `testo` di testi.ts. */
export interface Testo {
  chiave: string;
  argomenti?: (string | number)[];
}

/** Una persona o un ruolo scelto in un menu di menzioni. */
export interface Menzione {
  ruolo: boolean;
  id: string;
}

/**
 * Una domanda del bot prima di un'azione che toglie qualcosa: l'owner di un task col promemoria, un gruppo coi suoi
 * subtask, i task completati (Pulisci), i completati da riaprire (Riapri tutti). Le posizioni sono scritte come nella
 * riga ('2.1'); `sopra` è il gruppo che riceve i subtask, `null` se non ce n'è uno.
 */
export type Domanda =
  | { tipo: 'togliOwner'; pos: string }
  | { tipo: 'eliminaGruppo'; pos: string; sopra: number | null }
  | { tipo: 'pulisci'; completati: number; avvertenza: 'all' | 'reminders' | 'tags' | 'plain' }
  | { tipo: 'riapri'; spuntati: number; nuovaData: boolean };

/**
 * L'esito di una regola: lo stato nuovo, a volte con un avviso (TTMEmbed.avviso) o col messaggio che il bot scrive al
 * posto di quello della riuscita; un rifiuto (lo stato non cambia); una domanda.
 */
export type Esito =
  | { tipo: 'fatto'; stato: Stato; avviso?: Testo; messaggio?: Testo }
  | { tipo: 'rifiuto'; testo: Testo }
  | { tipo: 'domanda'; domanda: Domanda };

/* Gli strumenti delle regole. */

/** La posizione come la scrive la riga ('2', '2.1'). */
function daPosizione(pos: string): Pos {
  const [main, sub = '0'] = pos.split('.');
  return { main: Number(main), sub: Number(sub) };
}

/** L'indice del task in `pos`. Una posizione che non c'è è un errore della demo, non una scelta di chi guarda. */
function indice(stato: Stato, pos: string): number {
  const p = daPosizione(pos);
  const i = stato.lista.tasks.findIndex((t) => t.pos.main === p.main && t.pos.sub === p.sub);
  if (i < 0) throw new Error(`La demo non ha il task «${pos}»`);
  return i;
}

function conTasks(stato: Stato, tasks: Task[]): Stato {
  return { ...stato, lista: { ...stato.lista, tasks } };
}

/** Lo stato col task `i` al posto di quello di prima. */
function conTask(stato: Stato, i: number, task: Task): Stato {
  return conTasks(stato, stato.lista.tasks.map((t, j) => (j === i ? task : t)));
}

/** Un esito riuscito; l'avviso, se c'è, accompagna lo stato nuovo. */
function fatto(stato: Stato, avviso?: Testo): Esito {
  return avviso ? { tipo: 'fatto', stato, avviso } : { tipo: 'fatto', stato };
}

function rifiuto(chiave: string): Extract<Esito, { tipo: 'rifiuto' }> {
  return { tipo: 'rifiuto', testo: { chiave } };
}

/* 5a — La spunta, la barra, le posizioni, l'eliminazione. */

/**
 * La spunta di un task, come CascataSpunta: il clic su un gruppo, o su un task senza subtask, porta lo stato a tutti i
 * suoi subtask; il clic su un subtask completa il gruppo quando li ha tutti spuntati, lo riapre quando uno non lo è.
 * Gli altri gruppi non cambiano.
 */
export function spunta(stato: Stato, pos: string, valore: boolean): Stato {
  const c = stato.lista.tasks[indice(stato, pos)].pos;
  const tasks = stato.lista.tasks.map((t) =>
    t.pos.main === c.main && (c.sub === 0 || t.pos.sub === c.sub) ? { ...t, fatto: valore } : t);
  if (c.sub > 0) {
    const g = tasks.findIndex((t) => t.pos.main === c.main && t.pos.sub === 0);
    const tutti = tasks.every((t) => t.pos.main !== c.main || t.pos.sub === 0 || t.fatto);
    if (g >= 0 && tasks[g].fatto !== tutti) tasks[g] = { ...tasks[g], fatto: tutti };
  }
  return conTasks(stato, tasks);
}

/**
 * Lo stato della barra sotto la lista, come BarraDellaLista: le caselle spuntate sul totale, di 5 in 5 per difetto.
 * Un task spuntato non dà mai 0, una lista non finita non dà mai 100.
 */
export function avanzamento(lista: Lista): number {
  const totale = lista.tasks.length;
  if (totale === 0) return 0;
  const fatti = lista.tasks.filter((t) => t.fatto).length;
  if (fatti === totale) return 100;
  const perDifetto = Math.floor(Math.floor((fatti * 100) / totale) / 5) * 5;
  return Math.min(95, Math.max(fatti > 0 ? 5 : 0, perDifetto));
}

/**
 * Le posizioni da capo, come TaskListUpdater.updateTasksPosition: ogni task principale prende il numero dopo, ogni
 * subtask il numero dopo nel suo gruppo. I subtask prima del primo gruppo restano nel gruppo 0, come nel bot.
 */
export function rinumera(tasks: Task[]): Task[] {
  let main = 0;
  let sub = 0;
  return tasks.map((t) => {
    if (t.pos.sub === 0) {
      main++;
      sub = 0;
    } else {
      sub++;
    }
    return { ...t, pos: { main, sub } };
  });
}

/**
 * Lo stato dei gruppi allineato ai loro subtask, come TaskListUpdater.updateTasksStatus: un gruppo coi subtask è
 * completato quando lo sono tutti. Un task senza subtask resta com'è.
 */
export function statoDeiGruppi(tasks: Task[]): Task[] {
  const nuovi = [...tasks];
  let gruppo = -1;
  let tutti = true;
  let conSubtask = false;
  const chiudi = () => {
    if (gruppo === -1 || !conSubtask) return;
    const g = nuovi.findIndex((t) => t.pos.main === gruppo && t.pos.sub === 0);
    if (g >= 0 && nuovi[g].fatto !== tutti) nuovi[g] = { ...nuovi[g], fatto: tutti };
  };
  for (const t of tasks) {
    if (t.pos.main !== gruppo) {
      chiudi();
      gruppo = t.pos.main;
      tutti = true;
      conSubtask = false;
    } else if (t.pos.sub > 0) {
      tutti &&= t.fatto;
      conSubtask = true;
    }
  }
  chiudi();
  return nuovi;
}

/** Se il task in `p` è un gruppo coi subtask (TaskListUpdater.haSubtask): eliminarlo li sposta. */
function haSubtask(tasks: Task[], p: Pos): boolean {
  return p.sub === 0 && tasks.some((t) => t.pos.sub > 0 && t.pos.main === p.main);
}

/**
 * La lista senza il task in `p`, rinumerata, come TaskListUpdater.senzaIlTask: i subtask di un gruppo eliminato
 * passano sotto il gruppo sopra; se sopra non ce n'è, diventano principali.
 */
function senzaIlTask(tasks: Task[], p: Pos): Task[] {
  const gruppo = p.sub === 0;
  const gruppoSopra = gruppo && tasks.some((t) => t.pos.sub === 0 && t.pos.main < p.main);
  const restanti = tasks
    .filter((t) => t.pos.main !== p.main || t.pos.sub !== p.sub)
    .map((t) => gruppo && !gruppoSopra && t.pos.sub > 0 && t.pos.main === p.main
      ? { ...t, pos: { main: t.pos.main, sub: 0 } } : t);
  return rinumera(restanti);
}

/**
 * L'eliminazione di un task, come TaskLogic: l'ultimo task della lista non si elimina; un gruppo coi subtask chiede
 * conferma, perché i subtask cambiano di posto; gli altri si eliminano subito.
 */
export function eliminaTask(stato: Stato, pos: string): Esito {
  const { tasks } = stato.lista;
  const p = tasks[indice(stato, pos)].pos;
  if (tasks.length <= 1) return rifiuto('tasklist.slct.task.last.error');
  if (haSubtask(tasks, p)) {
    const sopra = p.main > 1 ? p.main - 1 : null;
    return { tipo: 'domanda', domanda: { tipo: 'eliminaGruppo', pos: String(p.main), sopra } };
  }
  return fatto(eliminaTaskConfermato(stato, pos));
}

/** L'eliminazione confermata: la lista senza il task, coi gruppi allineati ai subtask come fa ModificaDelTask. */
export function eliminaTaskConfermato(stato: Stato, pos: string): Stato {
  const p = stato.lista.tasks[indice(stato, pos)].pos;
  return conTasks(stato, statoDeiGruppi(senzaIlTask(stato.lista.tasks, p)));
}

/* 5b — Il testo del task. */

/*
 * I token che la modale del singolo task toglie dal testo, coi pattern del bot (Patterns): la data (DISCORD_TIMESTAMP),
 * il promemoria (REMINDER_DATA), l'owner (OWNER_ENTITY) e il webhook (WEBHOOK_ASSOCIATION). Si impostano coi pulsanti.
 * In Java `[\d[dhm]]` è l'unione delle due classi, cioè `[\ddhm]`.
 */
const DATA = /<t:(\d+)(?::([tTdDfFR]))?>/g;
const PROMEMORIA = /\[([\ddhm]+?),([\ddhm]+?),(\d{1,50})\]/g;
const OWNER = /<@(?:!?&?)?(\d{17,20})>:/g;
const WEBHOOK = /\{\{wb=([^{}]*)\}\}/g;
const TOKEN = [DATA, PROMEMORIA, OWNER, WEBHOOK];
/** I token in un'unica alternanza, come TOKEN_UNITI: si trovano nell'ordine in cui compaiono. */
const TOKEN_UNITI = new RegExp(TOKEN.map((r) => `(?:${r.source})`).join('|'), 'g');
/** Un tag: la menzione di una persona o di un ruolo non seguita da «:», che ne farebbe l'owner (TAG_ENTITY). */
const TAG = /<@(?:!?&?)?(\d{17,20})>(?!:)/g;
/** Un promemoria in mesi, che non esiste più (REMINDER_DATA_IN_MONTHS). */
const IN_MESI = /\[(?:[\ddhm]*M[\dMdhm]*,[\dMdhm]+?|[\ddhm]+?,[\ddhm]*M[\dMdhm]*),\d{1,50}\]/;
/** Gli spazi di Java (`\s` senza Unicode), gli a capo di `\R` con gli spazi intorno, i bordi di String.trim. */
const SPAZI = /[ \t\n\v\f\r]+/g;
const A_CAPO = /[ \t\n\v\f\r]*(?:\r\n|[\n\v\f\r\u0085\u2028\u2029])[ \t\n\v\f\r]*/g;
const BORDI = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;

/** StringUtil.removeExtraSpaces: i bordi tolti, ogni fila di spazi ridotta a uno. */
function senzaSpaziInPiu(testo: string): string {
  return testo.replace(BORDI, '').replace(SPAZI, ' ');
}

/** DataReplacer.senzaToken: ogni token diventa uno spazio, a giri, finché il testo non cambia più. */
function senzaToken(testo: string): string {
  let prima: string;
  let adesso = testo;
  do {
    prima = adesso;
    for (const t of TOKEN) adesso = adesso.replace(t, ' ');
  } while (adesso !== prima);
  return adesso;
}

/**
 * Il testo che la modale del singolo task salva, come ModaleDelSingoloTask.prosa: senza i token dei pulsanti, ognuno
 * al posto di uno spazio, su una riga sola, con gli spazi normalizzati. Due cose del bot la demo non le ha: i link ai
 * canali accorciati in `<#id>` e i segnaposto delle emoji dei pulsanti.
 */
export function prosa(scritto: string): string {
  return senzaSpaziInPiu(senzaToken(scritto).replace(A_CAPO, ' ')).trim();
}

/**
 * I token che `prosa` toglie, una volta ciascuno, nell'ordine in cui compaiono (ModaleDelSingoloTask.tokenTolti):
 * ogni giro li raccoglie, poi li sostituisce con uno spazio, così si trovano anche quelli che si formano togliendone
 * un altro.
 */
export function tokenTolti(scritto: string): string[] {
  const tolti = new Set<string>();
  let testo = scritto;
  for (let giro = testo.match(TOKEN_UNITI); giro; giro = testo.match(TOKEN_UNITI)) {
    for (const t of giro) tolti.add(t.trim());
    testo = testo.replace(TOKEN_UNITI, ' ');
  }
  return [...tolti];
}

/** I tag di un testo in forma canonica, `<@id>` o `<@&id>`, una volta ciascuno, nell'ordine (TagNelTesto.token). */
function tokenDeiTag(testo: string): string[] {
  return [...new Set([...testo.matchAll(TAG)].map((m) => (m[0].includes('&') ? `<@&${m[1]}>` : `<@${m[1]}>`)))];
}

/** I tag di un testo, nell'ordine in cui compaiono, senza doppioni (TagNelTesto.token, QuadroDellaLista.tag). */
export function tagDelTesto(testo: string): Menzione[] {
  return tokenDeiTag(testo).map((t) => ({ ruolo: t.startsWith('<@&'), id: t.replace(/\D/g, '') }));
}

/**
 * Il testo coi tag nuovi in fondo, come TagContentEditor.replaceTags: ogni tag di prima lascia uno spazio, poi gli
 * spazi si normalizzano. Un testo di soli tag, senza tag nuovi, resta vuoto: chi lo usa lo rifiuta.
 */
function conITag(testo: string, tag: string[]): string {
  const senza = senzaSpaziInPiu(testo.replace(TAG, ' '));
  return tag.length ? senzaSpaziInPiu(`${senza} ${tag.join(' ')}`) : senza;
}

/** Il testo del task come lo mostra il pannello dell'Activity: senza i tag (QuadroDellaLista.prosa). */
export function prosaDelTask(task: Task): string {
  return conITag(task.testo, []);
}

/** Il rifiuto di un testo che la lista non saprebbe rileggere (RegoleDelTesto): vuoto, o con un promemoria in mesi. */
function rifiutoDelTesto(contenuto: string): string | null {
  if (contenuto.trim() === '') return 'tasklist.modal.task.blank.error';
  if (IN_MESI.test(contenuto)) return 'tasklist.modal.task.months.error';
  return null;
}

/** L'avviso dei token tolti, se ce ne sono (TokenTolti.testo). */
function avvisoDeiTolti(tolti: string[]): Testo | undefined {
  if (tolti.length === 0) return undefined;
  return { chiave: 'tasklist.modal.task.filtered.warning', argomenti: [elencoDeiTolti(tolti)] };
}

/**
 * Il testo nuovo dalla modale del canale (TaskListMdlTask): la prosa di quello scritto, che porta anche i tag. Uguale
 * a quello di prima non cambia niente; vuoto o con un promemoria in mesi non si salva. Owner, promemoria e webhook sono
 * campi del task: restano. I token tolti li dice l'avviso, anche quando il testo non cambia.
 */
export function salvaTesto(stato: Stato, pos: string, scritto: string): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  const nuovo = prosa(scritto);
  const avviso = avvisoDeiTolti(tokenTolti(scritto));
  if (nuovo === prosa(task.testo)) return fatto(stato, avviso);
  const no = rifiutoDelTesto(nuovo);
  if (no) return rifiuto(no);
  return fatto(conTask(stato, i, { ...task, testo: nuovo }), avviso);
}

/**
 * Il testo nuovo dal pannello dell'Activity (PannelloDelTask.contenuto). Il campo ha la sola prosa: anche i tag scritti
 * si tolgono, dopo gli altri token; l'avviso li elenca. I tag del task restano, in fondo al testo.
 */
export function salvaTestoActivity(stato: Stato, pos: string, scritto: string): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  const scritta = prosa(scritto);
  const tolti = [...new Set([...tokenTolti(scritto), ...tokenDeiTag(scritta)])];
  const pulita = conITag(scritta, []);
  const no = rifiutoDelTesto(pulita);
  if (no) return rifiuto(no);
  const avviso = avvisoDeiTolti(tolti);
  if (pulita === prosaDelTask(task)) return fatto(stato, avviso);
  return fatto(conTask(stato, i, { ...task, testo: conITag(pulita, tokenDeiTag(task.testo)) }), avviso);
}

/* 5c — Owner e tag. */

const OWNER_MISTO = 'tasklist.slct.owner.mixed.error';
const OWNER_UGUALE = 'tasklist.slct.owner.sameselection.error';

/** Il carrello della select owner, come RuoliTtm.Carrello.di; più ruoli, come persone e ruoli insieme, sono «misto». */
export type Carrello = 'vuoto' | 'persona' | 'ruolo' | 'gruppo' | 'misto';

export function carrello(persone: string[], ruoli: string[]): Carrello {
  const p = new Set(persone).size;
  const r = new Set(ruoli).size;
  if (r > 0 && p > 0) return 'misto';
  if (r > 1) return 'misto';
  if (r === 1) return 'ruolo';
  if (p === 1) return 'persona';
  return p > 1 ? 'gruppo' : 'vuoto';
}

/**
 * Il rifiuto del carrello, come RegoleDellOwner.rifiuto: l'owner è uno, quindi niente persone e ruoli insieme né più
 * ruoli. Nel canale il bot lo dice alla chiusura del menu (TaskListSlctOwner). Più persone vanno bene: in beta i
 * gruppi sono sbloccati per tutti.
 */
export function rifiutoDelCarrello(persone: string[], ruoli: string[]): Testo | null {
  return carrello(persone, ruoli) === 'misto' ? { chiave: OWNER_MISTO } : null;
}

/** Gli stessi elementi, in qualunque ordine. */
function stessoInsieme(a: readonly string[], b: readonly string[]): boolean {
  const x = new Set(a);
  const y = new Set(b);
  return x.size === y.size && [...x].every((v) => y.has(v));
}

function chiaveDi(m: Menzione): string {
  return `${m.ruolo ? '&' : ''}${m.id}`;
}

/** Le stesse menzioni in qualunque ordine: il confronto del pannello fra due insiemi (Set.equals). */
function stesseMenzioni(a: readonly Menzione[], b: readonly Menzione[]): boolean {
  return stessoInsieme(a.map(chiaveDi), b.map(chiaveDi));
}

/** Le menzioni una volta ciascuna, nell'ordine in cui arrivano (il LinkedHashSet del pannello). */
function senzaDoppioni(scelte: readonly Menzione[]): Menzione[] {
  const viste = new Set<string>();
  return scelte.filter((m) => {
    const chiave = chiaveDi(m);
    if (viste.has(chiave)) return false;
    viste.add(chiave);
    return true;
  });
}

/** La menzione come la scrive il testo del task (TagContentEditor.mentionOf). */
function menzione(m: Menzione): string {
  return m.ruolo ? `<@&${m.id}>` : `<@${m.id}>`;
}

/** Il task senza owner: il promemoria se ne va con lui, perché non arriverebbe a nessuno (Flusso.OWNER_TOGLI). */
function senzaOwner(task: Task): Task {
  const resto = { ...task };
  delete resto.owner;
  delete resto.promemoria;
  return resto;
}

/** Il ruolo di TTM che è questo owner, se lo è. */
function ruoloDiTtm(stato: Stato, owner: Owner | undefined): Ruolo | undefined {
  return owner?.tipo === 'ruolo' ? stato.ruoli.find((r) => r.id === owner.id && r.diTtm) : undefined;
}

/**
 * Lo stato col ruolo nuovo di queste persone, come RuoliOwner.crea: `TTM<n>` col primo numero libero fra i nomi dei
 * ruoli del server (RuoliTtm.primoNomeLibero). Da quel momento il ruolo compare fra quelli del menu.
 */
function conUnRuoloNuovo(stato: Stato, persone: string[]): { stato: Stato; id: string } {
  const presi = new Set(stato.ruoli.map((r) => r.nome));
  let n = 1;
  while (presi.has(`TTM${n}`)) n++;
  const ruolo: Ruolo = { id: idRuoloTtm(n), nome: `TTM${n}`, membri: [...new Set(persone)], diTtm: true };
  return { stato: { ...stato, ruoli: [...stato.ruoli, ruolo] }, id: ruolo.id };
}

/** Lo stato col task `i` dato a questo owner. */
function conLOwner(stato: Stato, i: number, owner: Owner): Stato {
  return conTask(stato, i, { ...stato.lista.tasks[i], owner });
}

/**
 * L'owner dalla select del canale alla scelta del task (OwnerLogic.manageOwner, col default OptionMode.DISABLED).
 * Senza scelta si rifiuta, come per persone e ruoli insieme. La persona o il ruolo che il task ha già non cambiano
 * niente: il bot lo dice. Più persone fanno un ruolo `TTM<n>` nuovo anche quando uno con loro c'è già; il solo caso
 * senza ruolo nuovo è l'owner di adesso, un ruolo di TTM con quelle persone (RisoluzioneDellOwner.gruppo). L'owner non
 * guarda lo stato del task; il promemoria resta, per il nuovo owner.
 */
export function applicaOwner(stato: Stato, pos: string, persone: string[], ruoli: string[]): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  const tipo = carrello(persone, ruoli);
  if (tipo === 'vuoto') return rifiuto('tasklist.slct.owner.noselection.error');
  if (tipo === 'misto') return rifiuto(OWNER_MISTO);
  if (tipo === 'gruppo') {
    const attuale = ruoloDiTtm(stato, task.owner);
    if (attuale && stessoInsieme(attuale.membri, persone)) return rifiuto(OWNER_UGUALE);
    const nuovo = conUnRuoloNuovo(stato, persone);
    return fatto(conLOwner(nuovo.stato, i, { tipo: 'ruolo', id: nuovo.id }));
  }
  const owner: Owner = tipo === 'persona' ? { tipo: 'persona', id: persone[0] } : { tipo: 'ruolo', id: ruoli[0] };
  if (task.owner?.tipo === owner.tipo && task.owner.id === owner.id) return rifiuto(OWNER_UGUALE);
  return fatto(conLOwner(stato, i, owner));
}

/**
 * L'owner come lo mostra il pannello dell'Activity (QuadroDellaLista.ownerPerLaPagina): una persona; un ruolo di TTM
 * con le sue persone, che nella demo TTM conosce sempre tutte (RuoliTtm.preselezioneDiPersone); un altro ruolo com'è.
 */
export function sceltaDellOwner(stato: Stato, task: Task): Menzione[] {
  if (!task.owner) return [];
  if (task.owner.tipo === 'persona') return [{ ruolo: false, id: task.owner.id }];
  const ttm = ruoloDiTtm(stato, task.owner);
  return ttm ? ttm.membri.map((id) => ({ ruolo: false, id })) : [{ ruolo: true, id: task.owner.id }];
}

/**
 * L'owner dal pannello dell'Activity (PannelloDelTask.owner). Una scelta uguale, come insieme, a quella che il pannello
 * mostra non cambia niente; vuota toglie l'owner col suo promemoria. Più persone riusano il ruolo di TTM che è owner di
 * un task della lista con loro, se c'è; altrimenti se ne crea uno (PannelloDelTask.ruolo). La pagina non manda mai
 * persone e ruoli insieme, ma la regola c'è.
 */
export function applicaOwnerActivity(stato: Stato, pos: string, scelte: Menzione[]): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  const scelti = senzaDoppioni(scelte);
  const persone = scelti.filter((m) => !m.ruolo).map((m) => m.id);
  const ruoli = scelti.filter((m) => m.ruolo).map((m) => m.id);
  const tipo = carrello(persone, ruoli);
  if (tipo === 'misto') return rifiuto(OWNER_MISTO);
  if (stesseMenzioni(scelti, sceltaDellOwner(stato, task))) return fatto(stato);
  if (tipo === 'vuoto') return fatto(conTask(stato, i, senzaOwner(task)));
  if (tipo === 'persona') return fatto(conLOwner(stato, i, { tipo: 'persona', id: persone[0] }));
  if (tipo === 'ruolo') return fatto(conLOwner(stato, i, { tipo: 'ruolo', id: ruoli[0] }));
  const riusato = stato.lista.tasks
    .map((t) => ruoloDiTtm(stato, t.owner))
    .find((r) => r !== undefined && stessoInsieme(r.membri, persone));
  if (riusato) return fatto(conLOwner(stato, i, { tipo: 'ruolo', id: riusato.id }));
  const nuovo = conUnRuoloNuovo(stato, persone);
  return fatto(conLOwner(nuovo.stato, i, { tipo: 'ruolo', id: nuovo.id }));
}

/**
 * Il pulsante rosso dell'owner nel canale (OwnerLogic.manageOwner, TOGLI): un task senza owner si rifiuta; con un
 * promemoria che deve ancora partire si chiede prima (TaskListMdlOwnerRemoveConfirm). Altrimenti l'owner si toglie,
 * col promemoria già passato se c'è.
 */
export function togliOwner(stato: Stato, pos: string): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  if (!task.owner) return rifiuto('tasklist.slct.owner.delete.notpresent.error');
  if (task.promemoria && task.promemoria.at > ADESSO)
    return { tipo: 'domanda', domanda: { tipo: 'togliOwner', pos: posizione(task.pos) } };
  return fatto(conTask(stato, i, senzaOwner(task)));
}

/** La rimozione confermata nella modale: l'owner se ne va col suo promemoria. */
export function togliOwnerConfermato(stato: Stato, pos: string): Stato {
  const i = indice(stato, pos);
  return conTask(stato, i, senzaOwner(stato.lista.tasks[i]));
}

/** Il task coi tag nuovi in fondo al testo, al posto dei suoi; un testo che resterebbe vuoto si rifiuta con `vuoto`. */
function conITagDelTask(stato: Stato, pos: string, tag: string[], vuoto: string): Esito {
  const i = indice(stato, pos);
  const task = stato.lista.tasks[i];
  const testo = conITag(task.testo, tag);
  if (testo === '') return rifiuto(vuoto);
  return fatto(conTask(stato, i, { ...task, testo }));
}

/**
 * I tag dalla select del canale alla scelta del task (TagLogic.manageTag, col default OptionMode.DISABLED): prendono il
 * posto di quelli del task, in fondo al testo, prima i ruoli poi le persone, ognuno nell'ordine scelto
 * (TagContentEditor.mentionsFrom). Senza scelta si rifiuta.
 */
export function applicaTag(stato: Stato, pos: string, persone: string[], ruoli: string[]): Esito {
  const tag = [
    ...ruoli.map((id) => menzione({ ruolo: true, id })),
    ...persone.map((id) => menzione({ ruolo: false, id })),
  ];
  if (tag.length === 0) return rifiuto('tasklist.slct.tag.noselection.error');
  return conITagDelTask(stato, pos, tag, 'tasklist.slct.tag.delete.blank.error');
}

/**
 * Il pulsante rosso dei tag nel canale (TagLogic.manageTag, TOGLI): toglie tutti i tag. Un task senza tag si rifiuta;
 * uno di soli tag pure, perché resterebbe senza testo (TagLogic.restaSenzaTesto).
 */
export function togliTag(stato: Stato, pos: string): Esito {
  if (tokenDeiTag(stato.lista.tasks[indice(stato, pos)].testo).length === 0)
    return rifiuto('tasklist.slct.tag.delete.notpresent.error');
  return conITagDelTask(stato, pos, [], 'tasklist.slct.tag.delete.blank.error');
}

/**
 * I tag dal pannello dell'Activity (PannelloDelTask.tag): nell'ordine scelto, al posto di quelli del task. Gli stessi
 * di adesso, come insieme, non cambiano niente; nessuno li toglie tutti, ma non da un task di soli tag.
 */
export function applicaTagActivity(stato: Stato, pos: string, scelte: Menzione[]): Esito {
  const scelti = senzaDoppioni(scelte);
  if (stesseMenzioni(scelti, tagDelTesto(stato.lista.tasks[indice(stato, pos)].testo))) return fatto(stato);
  return conITagDelTask(stato, pos, scelti.map(menzione), 'activity.tag.delete.blank');
}

/* 5d — Il promemoria, il webhook. */

/**
 * I campi della modale «Quando» (WhenModalFields) come arrivano al bot: giorno, anno e ora come li scrive chi guarda,
 * il mese col valore della select (da '1' a '12'), il fuso scritto o lasciato com'era.
 */
export interface Campi {
  giorno: string;
  mese: string;
  anno: string;
  ora: string;
  zona: string;
}

const PROMEMORIA_SU_COMPLETATO = 'tasklist.slct.alert.checkedtask.error';
const DATA_CHE_NON_ESISTE = 'tasklist.modal.when.date.error';

/** I minuti interi che devono stare fra adesso e la data scelta, almeno (RegoleDelPromemoria.MARGINE_MINUTI). */
const MARGINE_MINUTI = 5;

/** L'ora come la legge LocalTime.parse col formato «HH:mm» STRICT: due cifre per le ore fino a 23, due per i minuti. */
const HH_MM = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

/** I campi di una modale «Quando» con la data `at` scritta nel fuso `zona` (WhenModalFields.build). */
function campiDa(at: number, zona: string): Campi {
  const c = campiDi(at, zona);
  return { giorno: String(c.giorno), mese: String(c.mese), anno: String(c.anno), ora: c.ora, zona };
}

/**
 * I campi che la modale del promemoria propone (AlertLogic.openWhenModal, WhenModalFields.prefillBase): la data del
 * promemoria che il task ha già, o adesso più dieci minuti, nel fuso di chi agisce; il giorno senza zero davanti, l'ora
 * con. Su un task completato la modale non si apre (AlertLogic.addOrReplaceAlert).
 */
export function campiDelPromemoria(stato: Stato, pos: string): Campi | Extract<Esito, { tipo: 'rifiuto' }> {
  const task = stato.lista.tasks[indice(stato, pos)];
  if (task.fatto) return rifiuto(PROMEMORIA_SU_COMPLETATO);
  return campiDa(task.promemoria ? task.promemoria.at : PROPOSTO, fusoDi(stato));
}

/**
 * Un intero come Integer.parseInt dopo trim(): un segno, poi solo cifre; `null` dove Java lancia NumberFormatException.
 * Le cifre di altre scritture, che parseInt accetta, qui no: nei campi di due e quattro caratteri nessuno le scrive.
 */
function intero(testo: string): number | null {
  const t = testo.replace(BORDI, '');
  return /^[+-]?\d+$/.test(t) ? Number(t) : null;
}

/** I giorni di un mese, come li conta LocalDate.of. */
function giorniDelMese(anno: number, mese: number): number {
  if (mese === 2) return anno % 4 === 0 && (anno % 100 !== 0 || anno % 400 === 0) ? 29 : 28;
  return [4, 6, 9, 11].includes(mese) ? 30 : 31;
}

/**
 * Se il bot conosce il fuso (TimeZones.getZones, che distingue le maiuscole) e la pagina lo sa convertire: un fuso del
 * bot che il motore del browser non conosce, in Node nessuno, vale come uno che non c'è.
 */
function fusoDelBot(zona: string): boolean {
  if (!FUSI_DEL_BOT.has(zona)) return false;
  try {
    return new Intl.DateTimeFormat('en', { timeZone: zona }).resolvedOptions().timeZone !== '';
  } catch {
    return false;
  }
}

/**
 * L'istante dei campi, o il primo errore, come il blocco try di WhenFieldsValidator.validate: l'anno che non è un
 * numero; l'anno prima di quello di adesso, in UTC (TimeUtil.nowZoned); la data che non c'è (LocalDate.of, che viene
 * prima dell'ora); l'ora che non è «HH:mm».
 */
function istanteDeiCampi(campi: Campi, adesso: number): { at: number } | { errore: string } {
  const anno = intero(campi.anno);
  if (anno === null) return { errore: DATA_CHE_NON_ESISTE };
  if (anno < new Date(adesso * 1000).getUTCFullYear()) return { errore: 'tasklist.modal.when.year.error' };
  const mese = intero(campi.mese);
  const giorno = intero(campi.giorno);
  if (mese === null || mese < 1 || mese > 12) return { errore: DATA_CHE_NON_ESISTE };
  if (giorno === null || giorno < 1 || giorno > giorniDelMese(anno, mese)) return { errore: DATA_CHE_NON_ESISTE };
  const ora = campi.ora.replace(BORDI, '');
  if (!HH_MM.test(ora)) return { errore: 'tasklist.modal.when.time.error' };
  return { at: daiCampi(giorno, mese, anno, ora, campi.zona) };
}

/**
 * I controlli del submit di una modale «Quando»: gli errori di WhenFieldsValidator.validate, cioè il fuso che il bot
 * non conosce, il mese vuoto, poi, con quei due a posto, il primo errore della data; senza errori, la data a meno di
 * cinque minuti da adesso, che ogni modale dice con la sua chiave (`troppoVicina`).
 */
function controlliDelQuando(campi: Campi, adesso: number, troppoVicina: string): { at: number } | { errori: string[] } {
  const errori: string[] = [];
  if (!fusoDelBot(campi.zona)) errori.push('tasklist.modal.alert.timezone.error');
  if (campi.mese.trim() === '') errori.push('tasklist.modal.when.month.error');
  if (errori.length) return { errori };
  const istante = istanteDeiCampi(campi, adesso);
  if ('errore' in istante) return { errori: [istante.errore] };
  if (Math.trunc((istante.at - adesso) / 60) < MARGINE_MINUTI) return { errori: [troppoVicina] };
  return istante;
}

/**
 * Il submit della modale del promemoria (TaskListMdlWhen): i controlli di una modale «Quando», con
 * `tasklist.modal.alert.date.minutes.error` per la data troppo vicina. Il testo degli errori lo compone
 * testoDegliErrori.
 */
export function validaPromemoria(campi: Campi, adesso = ADESSO): { at: number } | { errori: string[] } {
  return controlliDelQuando(campi, adesso, 'tasklist.modal.alert.date.minutes.error');
}

/**
 * Lo stato col fuso che chi guarda ha scritto in una modale «Quando» al posto di quello proposto: diventa il suo
 * (UserTimezoneService.learn, che salva il fuso valido diverso da quello proposto). Si chiama dopo i controlli.
 */
export function imparaIlFuso(stato: Stato, zona: string): Stato {
  return zona === fusoDi(stato) ? stato : { ...stato, fuso: zona };
}

/**
 * Il promemoria della modale (TaskListMdlWhen, poi ReminderSaver; i ricorrenti sono spenti, come nel piano Free). Il
 * fuso scritto al posto di quello proposto diventa quello di chi agisce (UserTimezoneService.learn), anche quando il
 * promemoria poi resta com'era: lo stesso minuto del promemoria che c'è non si scrive, il bot risponde «No changes».
 * Un task senza owner prende come owner chi salva (RegoleDelPromemoria.conPromemoria). `at` viene da validaPromemoria:
 * la data passata, che il bot ricontrolla al salvataggio, qui non arriva.
 */
export function applicaPromemoria(stato: Stato, pos: string, at: number, zona: string): Esito {
  const dopo = imparaIlFuso(stato, zona);
  const i = indice(dopo, pos);
  const task = dopo.lista.tasks[i];
  if (task.fatto) return rifiuto(PROMEMORIA_SU_COMPLETATO);
  if (task.promemoria && Math.floor(task.promemoria.at / 60) === Math.floor(at / 60))
    return { tipo: 'fatto', stato: dopo, messaggio: { chiave: 'tasklist.reminder.unchanged' } };
  const owner: Owner = task.owner ?? { tipo: 'persona', id: SAM };
  return fatto(conTask(dopo, i, { ...task, owner, promemoria: { at, zona } }));
}

/**
 * Il pulsante rosso del promemoria (AlertLogic.deleteAlert): toglie il promemoria, anche da un task completato; owner,
 * tag e webhook restano.
 */
export function togliPromemoria(stato: Stato, pos: string): Esito {
  const i = indice(stato, pos);
  const resto = { ...stato.lista.tasks[i] };
  if (!resto.promemoria) return rifiuto('tasklist.slct.alert.noreminder.error');
  delete resto.promemoria;
  return fatto(conTask(stato, i, resto));
}

/**
 * Il webhook scelto nel menu sul task scelto (WebhookLogic.manageWebhook): prende il posto di quello che c'era, anche
 * su un task completato. Senza una scelta nel menu il bot chiede di farla.
 */
export function applicaWebhook(stato: Stato, pos: string, nome: string | null): Esito {
  const i = indice(stato, pos);
  if (nome === null) return rifiuto('tasklist.slct.webhook.none');
  return fatto(conTask(stato, i, { ...stato.lista.tasks[i], webhook: nome }));
}

/** Il pulsante rosso del webhook (WebhookLogic.manageWebhook): toglie il webhook dal task che ce l'ha. */
export function togliWebhook(stato: Stato, pos: string): Esito {
  const i = indice(stato, pos);
  const resto = { ...stato.lista.tasks[i] };
  if (resto.webhook === undefined) return rifiuto('tasklist.slct.webhook.delete.notpresent.error');
  delete resto.webhook;
  return fatto(conTask(stato, i, resto));
}

/* 5e — Pulisci, Riapri tutti, il blocco, il testo della lista. */

/**
 * Pulisci (TaskListBtnClean, Pulizia): tutti completati, o nessun task, lascerebbero la lista vuota; senza completati
 * non c'è niente da togliere. Altrimenti la domanda, con l'avvertenza di ciò che esce: i promemoria e i tag dei soli
 * task completati (TaskListMdlCleanConfirm.avvertenza). Il gruppo di un subtask completato resta: non conta.
 */
export function pulisci(stato: Stato): Esito {
  const { tasks } = stato.lista;
  const completati = tasks.filter((t) => t.fatto);
  if (completati.length === tasks.length) return rifiuto('tasklist.btn.clean.emptylist');
  if (completati.length === 0) return rifiuto('tasklist.btn.clean.noselection');
  const promemoria = completati.some((t) => t.promemoria !== undefined);
  const tag = completati.some((t) => tagDelTesto(t.testo).length > 0);
  const avvertenza = promemoria && tag ? 'all' : promemoria ? 'reminders' : tag ? 'tags' : 'plain';
  return { tipo: 'domanda', domanda: { tipo: 'pulisci', completati: completati.length, avvertenza } };
}

/**
 * Pulisci confermato (TaskListMdlCleanConfirm.pulisci): la lista senza i completati, rinumerata
 * (TaskListUpdater.updateTasksPosition). La modale copre la lista: fra la domanda e la conferma non cambia niente,
 * quindi i due rifiuti della domanda qui non servono.
 */
export function pulisciConfermato(stato: Stato): Stato {
  return conTasks(stato, rinumera(stato.lista.tasks.filter((t) => !t.fatto)));
}

/**
 * Riapri tutti (ReopenLogic.apri, Riapertura.proposta): senza completati non c'è niente da riaprire; altrimenti il
 * ponte, con New date se uno dei task da riaprire ha un promemoria (Riapertura.haPromemoriaDaSpostare). Il database
 * della demo non va mai giù.
 */
export function riapri(stato: Stato): Esito {
  const daRiaprire = stato.lista.tasks.filter((t) => t.fatto);
  if (daRiaprire.length === 0) return rifiuto('tasklist.reopen.none.error');
  const nuovaData = daRiaprire.some((t) => t.promemoria !== undefined);
  return { tipo: 'domanda', domanda: { tipo: 'riapri', spuntati: daRiaprire.length, nuovaData } };
}

/** La data scelta con New date, col fuso in cui è stata scritta (Riapertura.Ancora). */
export interface Ancora {
  at: number;
  zona: string;
}

/**
 * I task coi promemoria dei completati, cioè di quelli che si riaprono, ri-ancorati (ReminderReanchorer.reanchor): il
 * più vecchio cade sull'ancora, gli altri lo seguono alle stesse distanze, nel fuso dell'ancora. I promemoria dei task
 * da fare restano dove sono.
 */
function riancorati(tasks: Task[], ancora: Ancora): Task[] {
  const date = tasks.flatMap((t) => (t.fatto && t.promemoria ? [t.promemoria.at] : []));
  if (date.length === 0) return tasks;
  const primo = Math.min(...date);
  return tasks.map((t) => (t.fatto && t.promemoria
    ? { ...t, promemoria: { at: ancora.at + (t.promemoria.at - primo), zona: ancora.zona } }
    : t));
}

/**
 * Reopen, o il submit di New date (ReopenLogic.riapertura, Riapertura.riaperti). Il ponte resta aperto sotto la lista,
 * che intanto può cambiare: passata nell'Activity, bloccata (Riapri tutti è spento), senza completati, il bot
 * rifiuta. Altrimenti tutti i task tornano da fare. Con l'ancora si spostano i promemoria dei soli task che si
 * riaprono; il fuso della modale diventa quello di chi guarda (imparaIlFuso). Il bot lo impara anche quando poi
 * rifiuta, la demo no: un rifiuto non porta uno stato, per arrivarci serve una lista cambiata col ponte aperto.
 */
export function riapriConfermato(stato: Stato, ancora?: Ancora): Esito {
  if (stato.inActivity) return rifiuto('tasklist.modal.activity.error');
  if (stato.bloccata) return rifiuto('tasklist.action.unavailable.error');
  const { tasks } = stato.lista;
  if (!tasks.some((t) => t.fatto)) return rifiuto('tasklist.reopen.none.error');
  const riaperti = (ancora ? riancorati(tasks, ancora) : tasks).map((t) => (t.fatto ? { ...t, fatto: false } : t));
  return fatto(conTasks(ancora ? imparaIlFuso(stato, ancora.zona) : stato, riaperti));
}

/**
 * I campi della modale di New date (TaskListBtnReopenNewDate, TaskListMdlReopenWhen.createModal): adesso più dieci
 * minuti nel fuso di chi agisce, qualunque promemoria abbiano i task.
 */
export function campiDellaNuovaData(stato: Stato): Campi {
  return campiDa(PROPOSTO, fusoDi(stato));
}

/**
 * Il submit di New date (TaskListMdlReopenWhen): i controlli di una modale «Quando», con il testo del clone per la
 * data troppo vicina (`tasklist.modal.clone.date.now.error`). Poi riapriConfermato con l'ancora.
 */
export function validaNuovaData(campi: Campi, adesso = ADESSO): { at: number } | { errori: string[] } {
  return controlliDelQuando(campi, adesso, 'tasklist.modal.clone.date.now.error');
}

/** I pulsanti sotto la lista coi nomi della scena: la prima riga (CreateListUI.getFirstButtonsLine), poi la seconda. */
const PULSANTI = ['activity', 'bulk', 'clean', 'reopen', 'more', 'content', 'owner', 'tag', 'reminder', 'webhook'];

/**
 * Ciò che è acceso sotto la lista, coi nomi della scena; `sel` è il selettore dei task. Libera, tutto. Bloccata, solo
 * More: BloccoLista.bloccate spegne ogni pulsante tranne Clona, che con l'Activity accesa sta in More
 * (CreateListUI.getFirstButtonsLine). Nell'Activity, solo Join the Activity: è l'unico pulsante sotto la lista.
 */
export function pulsantiAccesi(stato: Stato): ReadonlySet<string> {
  if (stato.inActivity) return new Set(['join']);
  if (stato.bloccata) return new Set(['more']);
  return new Set([...PULSANTI, 'sel']);
}

/**
 * Il testo della lista nella modale di Modifica in blocco (TaskListSignature.Precompilazione.di, una riga per task con
 * ModalUITaskConverter.taskToText): il trattino, con uno spazio davanti per un subtask; la casella; il webhook; il
 * promemoria con la sua tripletta, sempre un evento singolo con la distanza di un task letto dall'embed
 * (EmbedUITaskConverter.FALLBACK_DISTANCE); il testo con l'owner in testa (OwnerNelTesto.conOwner).
 */
export function testoDellaLista(lista: Lista): string {
  return lista.tasks.map((t) => {
    const parti = [t.pos.sub ? ' -' : '-', t.fatto ? '[X]' : '[]'];
    if (t.webhook !== undefined) parti.push(`{{wb=${t.webhook}}}`);
    if (t.promemoria) parti.push(`<t:${t.promemoria.at}> [0m,0m,0]`);
    parti.push(t.owner ? `${menzione({ ruolo: t.owner.tipo === 'ruolo', id: t.owner.id })}: ${t.testo}` : t.testo);
    return parti.join(' ');
  }).join('\n');
}
