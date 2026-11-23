/*
 * I componenti del bot nel canale della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, compiti 9 e 10,
 * nel repo team-tasks-manager): le voci del menu di menzioni di Owner e Tag, le opzioni del menu dei webhook, le
 * modali del contenuto, del promemoria, delle domande, di Modifica in blocco e di New date, come le costruisce il bot.
 * Non tocca il DOM: canale.ts li monta coi pezzi di ui/.
 */
import { datiDi } from '../../../i18n/lingue.ts';
import { avvisoIllustrativo } from '../scene-data.ts';
import { linguaDellaDemo } from './lingua.ts';
import { markdown } from './markdown.ts';
import { coiNomi, legendaDeiNomi, rubricaDi } from './nomi.ts';
import { NELL_ACTIVITY, PERSONE, posizione, webhookDellaDemo } from './modello.ts';
import type { Stato } from './modello.ts';
import { prosaDelTask, testoDellaLista } from './regole.ts';
import type { Campi, Domanda } from './regole.ts';
import { contestoDelCanale } from './righe.ts';
import { testo, testoDellaDomanda } from './testi.ts';
import type { Voce } from './ui/menzioni.ts';
import type { Campo, Modale } from './ui/modale.ts';
import type { Opzione } from './ui/scelta.ts';

/** Il tetto di un campo di testo di Discord (TextInput.MAX_VALUE_LENGTH). */
export const MAX_VALUE_LENGTH = 4000;

/** Il tetto del titolo di una lista (TaskList.TITLE_MAX_LENGTH). */
export const TITOLO_MAX = 90;

/**
 * I mesi del campo Month nella lingua della demo, come Month.getDisplayName(FULL_STANDALONE): «January», «gennaio».
 * Intl li scrive da sé (month: 'long' da solo è la forma standalone).
 */
function mesi(): string[] {
  const lingua = linguaDellaDemo();
  const f = new Intl.DateTimeFormat(lingua === 'en' ? 'en-US' : datiDi(lingua).intl, { month: 'long', timeZone: 'UTC' });
  return Array.from({ length: 12 }, (_, i) => f.format(Date.UTC(2026, i, 15)));
}

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
  return webhookDellaDemo().map((w) => ({ valore: w.nome, testo: w.nome }));
}

/** Un TextDisplay della modale: il Markdown del bot in HTML. */
function testoFisso(stato: Stato, md: string): Campo {
  return { tipo: 'testoFisso', html: markdown(md, contestoDelCanale(stato)) };
}

/**
 * La modale del contenuto (TaskListMdlTask.createTaskModal): il campo a paragrafo obbligatorio col testo del task senza
 * i tag (TaskLogic.testoDellaModale), coi nomi al posto dei codici, poi la riga sul blocco (AvvisoDelBlocco). Niente
 * legenda (SegnapostoDellaModale.apriSenzaLegenda): la modale cambia solo il testo, e tag e owner hanno i loro menu;
 * un `@nome:` in testa è testo.
 * Il tetto è quello di Discord: il
 * bot lo abbassa quando il resto della lista occupa la form di Modifica in blocco (TaskLogic.tettoDelTesto), cosa che
 * la lista corta della demo non fa sentire prima di 3700 caratteri.
 */
export function modaleDelTesto(stato: Stato, pos: string): Modale {
  const task = stato.lista.tasks.find((t) => posizione(t.pos) === pos);
  if (!task) throw new Error(`La demo non ha il task «${pos}»`);
  const rubrica = rubricaDi(stato);
  return {
    titolo: testo('tasklist.modal.task.title'),
    campi: [
      {
        tipo: 'testo', id: 'task', etichetta: testo('tasklist.modal.task.label'), valore: coiNomi(prosaDelTask(task), rubrica),
        obbligatorio: true, min: 1, max: MAX_VALUE_LENGTH, paragrafo: true,
      },
      testoFisso(stato, testo('tasklist.modal.lock.hint')),
    ],
  };
}

/**
 * I campi di una modale «Quando» (WhenModalFields.build): Day, Month, Year, Time e il fuso, coi valori di `campi`. Il
 * mese è una scelta, obbligatoria come ogni select di JDA in una modale.
 */
function campiDelQuando(campi: Campi): Campo[] {
  return [
    {
      tipo: 'testo', id: 'day', etichetta: testo('tasklist.modal.when.day'), valore: campi.giorno,
      obbligatorio: true, min: 1, max: 2,
    },
    {
      tipo: 'scelta', id: 'month', etichetta: testo('tasklist.modal.when.month'),
      opzioni: mesi().map((m, i) => ({ valore: String(i + 1), testo: m })), scelto: campi.mese, obbligatorio: true,
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
  ];
}

/** La modale del promemoria (TaskListMdlWhen), coi valori di campiDelPromemoria. */
export function modaleDelPromemoria(pos: string, campi: Campi): Modale {
  return { titolo: testo('tasklist.modal.alert.title', pos), campi: campiDelQuando(campi) };
}

/**
 * La modale di New date nel ponte di Riapri tutti (TaskListMdlReopenWhen.createModal): gli stessi campi, coi valori di
 * campiDellaNuovaData. Non blocca la lista: Riapri tutti non la blocca nemmeno nel bot (spec §6.4).
 */
export function modaleDellaNuovaData(campi: Campi): Modale {
  return { titolo: testo('tasklist.modal.reopen'), campi: campiDelQuando(campi) };
}

/**
 * La modale di Modifica in blocco (TaskListMdlEdit.modale) in sola lettura (spec §8.1): l'avviso della demo in cima,
 * «List title» col titolo, la legenda con le regole, «List of activities» col testo della lista nel formato del bot
 * (testoDellaLista), coi nomi al posto dei codici e le date nel fuso di chi guarda. I campi non si scrivono e Submit è
 * spento. Manca la riga del blocco (AvvisoDelBlocco): in sola lettura la lista non si
 * blocca.
 */
export function modaleDiModificaInBlocco(stato: Stato): Modale {
  const conId = testoDellaLista(stato.lista);
  const rubrica = rubricaDi(stato);
  return {
    titolo: testo('tasklist.modal.edit.title'),
    solaLettura: avvisoIllustrativo(),
    campi: [
      {
        tipo: 'testo', id: 'title', etichetta: testo('tasklist.modal.edit.txt.title.label'),
        valore: stato.lista.titolo, obbligatorio: true, min: 1, max: TITOLO_MAX,
      },
      testoFisso(stato, legendaDeiNomi()),
      {
        tipo: 'testo', id: 'list', etichetta: testo('tasklist.modal.edit.txt.list.label'),
        valore: coiNomi(conId, rubrica), obbligatorio: true, min: 1, max: MAX_VALUE_LENGTH, paragrafo: true,
      },
    ],
  };
}

/**
 * I valori di una modale «Quando» come li leggono TaskListMdlWhen e TaskListMdlReopenWhen, per id: uno che manca arriva
 * vuoto.
 */
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
