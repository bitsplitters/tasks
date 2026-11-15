/*
 * Le regole del bot nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 5; tutti e due nel repo team-tasks-manager): funzioni pure
 * che ricevono lo stato con la scelta di chi guarda e restituiscono un esito, cioè lo stato nuovo, un rifiuto oppure
 * una domanda. Qui anche i tipi che le regole condividono coi testi (testi.ts) e con l'interfaccia.
 */
import type { Lista, Pos, Stato, Task } from './modello.ts';

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

/** L'esito di una regola: lo stato nuovo, a volte con un avviso; un rifiuto (lo stato non cambia); una domanda. */
export type Esito =
  | { tipo: 'fatto'; stato: Stato; avviso?: Testo }
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

function fatto(stato: Stato): Esito {
  return { tipo: 'fatto', stato };
}

function rifiuto(chiave: string): Esito {
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
