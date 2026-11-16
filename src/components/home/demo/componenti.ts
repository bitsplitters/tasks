/*
 * I componenti del bot nel canale della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 9, nel
 * repo team-tasks-manager): le voci del menu di menzioni di Owner e Tag, le opzioni del menu dei webhook, le modali del
 * contenuto, del promemoria e delle domande, come le costruisce il bot. Non tocca il DOM: canale.ts li monta coi pezzi
 * di ui/.
 */
import { markdown } from './markdown.ts';
import { NELL_ACTIVITY, PERSONE, WEBHOOK, posizione } from './modello.ts';
import type { Stato } from './modello.ts';
import type { Campi, Domanda } from './regole.ts';
import { contestoDelCanale } from './righe.ts';
import { testo, testoDellaDomanda } from './testi.ts';
import type { Voce } from './ui/menzioni.ts';
import type { Campo, Modale } from './ui/modale.ts';
import type { Opzione } from './ui/scelta.ts';

/** Il tetto di un campo di testo di Discord (TextInput.MAX_VALUE_LENGTH). */
const MAX_VALUE_LENGTH = 4000;

/** I mesi del campo Month, come Month.getDisplayName(FULL_STANDALONE) in inglese. */
const MESI = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Le righe del menu di menzioni, come le mostra Discord: prima le persone, col pallino verde per chi è in linea (chi è
 * nell'Activity), poi i ruoli dello stato col numero dei membri, i `TTM<n>` compresi. L'app del bot non c'è: nella
 * demo non serve sceglierla.
 */
export function vociDelMenu(stato: Stato): Voce[] {
  const persone = PERSONE.map((p): Voce => ({
    id: p.id, ruolo: false, nome: p.nome, sotto: p.username, colore: p.colore, online: NELL_ACTIVITY.includes(p.id),
  }));
  const ruoli = stato.ruoli.map((r): Voce => ({ id: r.id, ruolo: true, nome: r.nome, sotto: String(r.membri.length) }));
  return [...persone, ...ruoli];
}

/** La scelta del menu di menzioni come la riceve il bot: le persone e i ruoli, ognuno nell'ordine della scelta. */
export function divisa(ids: readonly string[], stato: Stato): { persone: string[]; ruoli: string[] } {
  const ruoli = new Set(stato.ruoli.map((r) => r.id));
  return { persone: ids.filter((id) => !ruoli.has(id)), ruoli: ids.filter((id) => ruoli.has(id)) };
}

/** Le voci del menu «Choose the webhook to associate»: i webhook già creati nel server, per nome. */
export function opzioniDeiWebhook(): Opzione[] {
  return WEBHOOK.map((w) => ({ valore: w.nome, testo: w.nome }));
}

/** Un TextDisplay della modale: il Markdown del bot in HTML. */
function testoFisso(stato: Stato, md: string): Campo {
  return { tipo: 'testoFisso', html: markdown(md, contestoDelCanale(stato)) };
}

/**
 * La modale del contenuto (TaskListMdlTask.createTaskModal): il campo a paragrafo obbligatorio col testo del task, che
 * porta i tag (TaskLogic.testoDellaModale), poi la riga sul blocco (AvvisoDelBlocco). Il tetto è quello di Discord: il
 * bot lo abbassa quando il resto della lista occupa la form di Modifica in blocco (TaskLogic.tettoDelTesto), cosa che
 * la lista corta della demo non fa sentire prima di 3700 caratteri.
 */
export function modaleDelTesto(stato: Stato, pos: string): Modale {
  const task = stato.lista.tasks.find((t) => posizione(t.pos) === pos);
  if (!task) throw new Error(`La demo non ha il task «${pos}»`);
  return {
    titolo: testo('tasklist.modal.task.title'),
    campi: [
      {
        tipo: 'testo', id: 'task', etichetta: testo('tasklist.modal.task.label'), valore: task.testo,
        obbligatorio: true, min: 1, max: MAX_VALUE_LENGTH, paragrafo: true,
      },
      testoFisso(stato, testo('tasklist.modal.lock.hint')),
    ],
  };
}

/**
 * La modale del promemoria (TaskListMdlWhen, coi campi di WhenModalFields.build): Day, Month, Year, Time e il fuso,
 * coi valori di `campi` (campiDelPromemoria). Il mese è una scelta, obbligatoria come ogni select di JDA in una
 * modale.
 */
export function modaleDelPromemoria(pos: string, campi: Campi): Modale {
  return {
    titolo: testo('tasklist.modal.alert.title', pos),
    campi: [
      {
        tipo: 'testo', id: 'day', etichetta: testo('tasklist.modal.when.day'), valore: campi.giorno,
        obbligatorio: true, min: 1, max: 2,
      },
      {
        tipo: 'scelta', id: 'month', etichetta: testo('tasklist.modal.when.month'),
        opzioni: MESI.map((m, i) => ({ valore: String(i + 1), testo: m })), scelto: campi.mese, obbligatorio: true,
      },
      {
        tipo: 'testo', id: 'year', etichetta: testo('tasklist.modal.when.year'), valore: campi.anno,
        obbligatorio: true, min: 4, max: 4,
      },
      {
        tipo: 'testo', id: 'time', etichetta: testo('tasklist.modal.when.time'), valore: campi.ora,
        obbligatorio: true, min: 5, max: 5,
      },
      {
        tipo: 'testo', id: 'zone', etichetta: testo('tasklist.modal.alert.timezone'), valore: campi.zona,
        segnaposto: testo('tasklist.modal.alert.timezone.placeholder'), obbligatorio: true, min: 1,
        max: MAX_VALUE_LENGTH,
      },
    ],
  };
}

/** I valori della modale del promemoria come li legge TaskListMdlWhen, per id: uno che manca arriva vuoto. */
export function campiDalPromemoria(valori: Readonly<Record<string, string>>): Campi {
  return {
    giorno: valori.day ?? '', mese: valori.month ?? '', anno: valori.year ?? '', ora: valori.time ?? '',
    zona: valori.zone ?? '',
  };
}

/** I titoli delle domande che il bot fa in una modale: quella di Riapri tutti è un messaggio coi pulsanti. */
const TITOLI = {
  togliOwner: 'tasklist.modal.owner.remove.title',
  eliminaGruppo: 'tasklist.modal.task.delete.title',
  pulisci: 'tasklist.modal.clean.title',
} as const;

/**
 * La modale di una domanda del bot (TaskListMdlOwnerRemoveConfirm, TaskListMdlTaskDeleteConfirm,
 * TaskListMdlCleanConfirm): il titolo e il testo della domanda, senza campi. Submit conferma; chiuderla lascia tutto
 * com'è.
 */
export function modaleDellaDomanda(domanda: Exclude<Domanda, { tipo: 'riapri' }>, stato: Stato): Modale {
  return {
    titolo: testo(TITOLI[domanda.tipo]),
    campi: [testoFisso(stato, testoDellaDomanda(domanda, stato.lista.titolo))],
  };
}
