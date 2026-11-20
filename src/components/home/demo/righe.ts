/*
 * Le righe della lista nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 6; tutti e due nel repo team-tasks-manager): un solo
 * disegno, dalla lista, per le righe dell'embed nel canale, le opzioni del selettore dei task, le righe della pagina
 * dell'Activity. Come nel bot le righe di un task sono le stesse nei due posti (RigheDellaLista): il canale le scrive
 * con EmbedUITaskConverter, la pagina le riceve da VistaDellaLista. Le opzioni vengono da TaskActivityConverter e da
 * ActivityOptionConverter. Non tocca il DOM: restituisce HTML coi testi passati dall'escape.
 */
import { escape, markdown } from './markdown.ts';
import type { Contesto } from './markdown.ts';
import { CANALE, NOME_DEL_CANALE, PERSONE, dataDelCanale, dataDellActivity, posizione } from './modello.ts';
import type { Lista, Pos, Stato, Task } from './modello.ts';
import { conOwner, senzaSpaziInPiu } from './regole.ts';

/** I nomi che le menzioni mostrano: undefined per chi non è nel server. */
export interface Nomi {
  persona(id: string): string | undefined;
  ruolo(id: string): string | undefined;
}

/** I nomi del server della demo: le persone, poi i ruoli dello stato, compresi i `TTM<n>` creati per gli owner. */
export function nomiDi(stato: Stato): Nomi {
  return {
    persona: (id) => PERSONE.find((p) => p.id === id)?.nome,
    ruolo: (id) => stato.ruoli.find((r) => r.id === id)?.nome,
  };
}

/** Il contesto del Markdown: i nomi, il canale della demo, le date del posto. */
function contesto(nomi: Nomi, data: (at: number, stile: string) => string): Contesto {
  return {
    persona: (id) => nomi.persona(id),
    ruolo: (id) => nomi.ruolo(id),
    canale: (id) => (id === CANALE ? NOME_DEL_CANALE : undefined),
    data,
  };
}

/** Il contesto del Markdown nel canale per i testi del bot fuori dalle righe: le risposte nel fumetto, le modali. */
export function contestoDelCanale(stato: Stato): Contesto {
  return contesto(nomiDi(stato), dataDelCanale);
}

/** Il contesto del Markdown nell'Activity per i testi fuori dalle righe: gli avvisi e le domande del pannello. */
export function contestoDellActivity(stato: Stato): Contesto {
  return contesto(nomiDi(stato), dataDellActivity);
}

/** Una riga di un task (Riga.DelTask): il webhook, il promemoria col badge della ricorrenza, la casella col testo. */
type Riga =
  | { tipo: 'webhook'; nome: string }
  | { tipo: 'promemoria'; at: number; badge: string }
  | { tipo: 'casella'; testo: string };

/**
 * Il badge della ricorrenza, come ReminderDisplay.badgeOf: vuoto per l'evento singolo (nessuna ripetizione),
 * altrimenti `↻intervallo ×volte`, con le volte che contano anche il primo avviso.
 */
export function badgeDellaRicorrenza(promemoria: Task['promemoria']): string {
  const r = promemoria?.ricorrenza;
  return r && r.ripetizioni > 0 ? `↻${r.intervallo} ×${r.ripetizioni + 1}` : '';
}

/** Le righe di un task, come RigheDellaLista.delTask: il webhook, il promemoria, poi la casella con l'owner in testa. */
function righeDelTask(task: Task): Riga[] {
  const righe: Riga[] = [];
  if (task.webhook !== undefined) righe.push({ tipo: 'webhook', nome: task.webhook });
  if (task.promemoria) {
    righe.push({ tipo: 'promemoria', at: task.promemoria.at, badge: badgeDellaRicorrenza(task.promemoria) });
  }
  righe.push({ tipo: 'casella', testo: conOwner(task) });
  return righe;
}

/**
 * Se il task ha davanti una riga vuota, con «Spazi tra i gruppi» acceso (RigheDellaLista.staFraIGruppi): è un task
 * principale e non il primo, e viene dopo un subtask, che chiude il gruppo di prima, o apre lui un gruppo.
 */
export function staFraIGruppi(tasks: readonly Task[], i: number): boolean {
  if (i === 0 || tasks[i].pos.sub) return false;
  return tasks[i - 1].pos.sub > 0 || (i + 1 < tasks.length && tasks[i + 1].pos.sub > 0);
}

/** La riga vuota fra due gruppi: alta quanto una riga, senza niente dentro. */
const RIGA_VUOTA = '<div class="sc-row sc-gap" aria-hidden="true"></div>';

/**
 * Le righe di tutti i task, disegnate da `riga`, che sa se è la prima del suo task. Senza `spazi`, niente righe
 * vuote fra i gruppi: GroupSpacingMode è spento per i server che aggiungono il bot dalla 2.0.0.
 */
function disegna(lista: Lista, riga: (task: Task, r: Riga, prima: boolean) => string, spazi = false): string {
  return lista.tasks.map((t, i) => (spazi && staFraIGruppi(lista.tasks, i) ? RIGA_VUOTA : '')
    + righeDelTask(t).map((r, j) => riga(t, r, j === 0)).join('')).join('');
}

/**
 * L'apertura di una riga: la classe del posto, `sc-sub` per un subtask, la classe del webhook o del promemoria; la
 * posizione del task; `data-done` su tutte le righe di un completato, che nel bot cominciano tutte col subtext
 * (DimDoneMode, acceso).
 */
function apertura(base: string, task: Task, riga: Riga): string {
  const tipo = riga.tipo === 'webhook' ? ' sc-row-wb' : riga.tipo === 'promemoria' ? ' sc-row-rem' : '';
  const classi = `${base}${task.pos.sub ? ' sc-sub' : ''}${tipo}`;
  return `<div class="${classi}" data-task="${posizione(task.pos)}"${task.fatto ? ' data-done' : ''}>`;
}

const icona = (nome: string) => `<img class="sc-emoji" src="/icons/${nome}.png" alt="">`;

/** Le due immagini della casella: si vede quella dello stato della riga (scene.css, `[data-done]`). */
const CASELLA = '<img class="sc-off" src="/icons/checkbox_empty.png" alt="">'
  + '<img class="sc-on" src="/icons/checkbox_marked.png" alt="">';

/**
 * Il numero di un task nell'embed, come getTaskNumberToEmbed: due caratteri per un task, cinque per un subtask, con
 * gli spazi che li pareggiano («2 », «12», «2 .1 », «12.1 », «2 .12»).
 */
function numeroDelCanale(pos: Pos): string {
  if (!pos.sub) return pos.main >= 10 ? String(pos.main) : `${pos.main} `;
  return `${pos.main}${pos.main >= 10 ? '.' : ' .'}${pos.sub}${pos.sub >= 10 ? '' : ' '}`;
}

/** L'attacco delle righe dopo la prima: il codice vuoto, largo quanto il numero (EmbedUITaskConverter.spaziatore). */
function spaziatore(pos: Pos): string {
  return pos.sub ? '     ' : '  ';
}

/** Una riga dell'embed: il numero o lo spaziatore, l'emoji della riga, il suo testo (EmbedUITaskConverter.corpo). */
function rigaDelCanale(task: Task, riga: Riga, prima: boolean, ctx: Contesto): string {
  const numero = `<span class="sc-num"><code>${prima ? numeroDelCanale(task.pos) : spaziatore(task.pos)}</code></span>`;
  const testo = (t: string) => `<span class="sc-text">${markdown(t, ctx, true)}</span>`;
  const corpo = riga.tipo === 'webhook' ? icona('wb') + testo(riga.nome)
    : riga.tipo === 'promemoria' ? icona('alert') + testo(`<t:${riga.at}>${riga.badge ? ` ${riga.badge}` : ''}`)
    : `<span class="sc-cb">${CASELLA}</span>${testo(riga.testo)}`;
  return `${apertura('sc-row', task, riga)}${numero}${corpo}</div>`;
}

/** Come disegnare le righe del canale per una lista che non è quella della demo (i casi d'uso del sito). */
export interface OpzioniDelCanale {
  /** I nomi dei canali e le date di un altro server; senza, quelli della demo, a Roma. */
  contesto?: Contesto;
  /** «Spazi tra i gruppi» acceso: una riga vuota attorno a ogni gruppo con subtask. */
  spazi?: boolean;
}

/** Le righe dell'embed nel canale, con le date di un client Discord in inglese americano. */
export function righeDelCanale(lista: Lista, nomi: Nomi, opzioni: OpzioniDelCanale = {}): string {
  const ctx = opzioni.contesto ?? contesto(nomi, dataDelCanale);
  return disegna(lista, (t, r, prima) => rigaDelCanale(t, r, prima, ctx), opzioni.spazi);
}

/**
 * Una riga della pagina dell'Activity (TaskRowView): il numero sulla prima riga del task, la casella o l'emoji, il
 * testo. Il testo di ogni riga apre il pannello del task, anche quello del webhook o del promemoria.
 */
function rigaDellActivity(task: Task, riga: Riga, prima: boolean, ctx: Contesto): string {
  const pos = posizione(task.pos);
  const numero = prima ? `<span class="sc-nmain">${task.pos.main}</span>${task.pos.sub ? `.${task.pos.sub}` : ''}` : '';
  const testo = (chiave: string, t: string) =>
    `<button type="button" class="sc-atext" data-k="${chiave}-${pos}">${markdown(t, ctx, true)}</button>`;
  const casella = `<button type="button" class="sc-cb sc-acb" data-k="a-cb-${pos}" aria-pressed="${task.fatto}"`
    + ` aria-label="Task ${pos}">${CASELLA}</button>`;
  const corpo = riga.tipo === 'webhook' ? `<span class="sc-aicon">${icona('wb')}</span>${testo('a-wb', riga.nome)}`
    : riga.tipo === 'promemoria' ? `<span class="sc-aicon">${icona('alert')}</span>${testo('a-rem', `<t:${riga.at}>`)}`
    : `<span class="sc-aicon">${casella}</span>${testo('a-txt', riga.testo)}`;
  return `${apertura('sc-arow', task, riga)}<span class="sc-anum">${numero}</span>${corpo}</div>`;
}

/** Le righe della pagina dell'Activity, con le date della pagina in inglese (en-GB). */
export function righeDellActivity(lista: Lista, nomi: Nomi): string {
  const ctx = contesto(nomi, dataDellActivity);
  return disegna(lista, (t, r, prima) => rigaDellActivity(t, r, prima, ctx));
}

/*
 * Il testo pulito delle etichette, come ActivitiesUtil.contentCleaned: le regole del bot nel loro ordine, poi il
 * Markdown tolto (StringUtil.removeMarkdown), poi gli spazi normalizzati. In Java `\w`, `\d` e `\s` sono ASCII, come
 * `\w` e `\d` qui.
 */
const PULIZIA: readonly (readonly [RegExp, string])[] = [
  [/\[(.+?)\]\((.+?)\)/g, '$1'], // MARKDOWN_URL: resta il nome del link
  [/<a?:(\w+:\d{17,19})>/g, ''], // DISCORD_CUSTOM_EMOJI
  [/<@(?:!?&?)?(\d{17,20})>(?!:)/g, ''], // TAG_ENTITY
  [/:\w+:/g, ''], // DISCORD_STANDARD_EMOJI
  [/https:\/\/discord\.com\/channels\/\d{17,20}\/\d{17,20}\/\d{17,20}/g, ''], // MESSAGE_URL
];

/** Le coppie del Markdown (MARKDOWN_PAIRED), nell'ordine del bot: di ognuna resta il contenuto. */
const MARKDOWN: readonly RegExp[] = [
  /```(?:[a-zA-Z0-9+#-]*\n)?(.*?)```/gs, /``(.*?)``/gs, /`(.*?)`/g, /\*\*(.*?)\*\*/g, /__(.*?)__/g, /~~(.*?)~~/g,
  /\|\|(.*?)\|\|/g, /\*(.*?)\*/g, /_(.*?)_/g,
];

/** La citazione in testa a una riga (MARKDOWN_QUOTE). */
const CITAZIONE = /^(?:>>> |> )/gm;

/** Il testo di un task come lo scrivono le etichette del selettore (ActivitiesUtil.contentCleaned). */
export function testoPulito(testo: string): string {
  let t = testo;
  for (const [regola, resta] of PULIZIA) t = t.replace(regola, resta);
  for (const regola of MARKDOWN) t = t.replace(regola, '$1');
  return senzaSpaziInPiu(t.replace(CITAZIONE, ''));
}

/** L'etichetta di un task (TaskActivityConverter): la posizione, uno spazio, il testo pulito. */
export function etichettaDelTask(task: Task): string {
  return `${posizione(task.pos)} ${testoPulito(task.testo)}`;
}

/** I canali nel testo (Patterns.CHANNEL, CHANNEL_URL): il gruppo è l'id del canale. */
const CANALI: readonly RegExp[] = [
  /<#(\d{17,20})>/g, /https:\/\/discord\.com\/channels\/\d{17,20}\/(\d{17,20})(?!\/\d{17,20})/g,
];

/**
 * I canali dell'etichetta col loro nome, come ActivityOptionConverter.replaceChannelTags: «#scrims» per il canale
 * della demo, niente per uno che il server non ha. Come nel bot ogni menzione diversa si sostituisce dove compare la
 * prima volta: le trova un insieme (DataExtractor.extractRawChannelTags).
 */
function conINomiDeiCanali(testo: string): string {
  const trovati = new Map<string, string>();
  for (const regola of CANALI) for (const m of testo.matchAll(regola)) trovati.set(m[0], m[1]);
  let t = testo;
  for (const [menzione, id] of trovati) t = t.replace(menzione, () => (id === CANALE ? `#${NOME_DEL_CANALE}` : ''));
  return t;
}

/** Quanto può essere lunga l'etichetta di un'opzione (Config.ACTIVITY_VALUE_MAX_LENGTH). */
const ETICHETTA_MASSIMA = 50;
const ELLISSI = '…';

/** Ciò che il taglio non deve spezzare (Abbrevia.MENZIONE), col `\s` di Java. */
const MENZIONE = /^<(?:#|@[!&]?|a?:\w+:|t:)[^<>\t\n\v\f\r ]+>$/;

/** Il testo entro `massimo` unità UTF-16, con l'ellissi al posto del resto (Abbrevia.entro). */
function entro(testo: string, massimo: number): string {
  if (testo.length <= massimo) return testo;
  return testo.substring(0, taglio(testo, massimo - ELLISSI.length)) + ELLISSI;
}

/** Il punto del taglio: arretra prima di una coppia surrogata o di una menzione che spezzerebbe (Abbrevia.taglio). */
function taglio(testo: string, spazio: number): number {
  let fine = Math.max(0, spazio);
  const ultimo = fine > 0 ? testo.charCodeAt(fine - 1) : 0;
  if (ultimo >= 0xd800 && ultimo <= 0xdbff) fine--;
  const apertura = fine > 0 ? testo.lastIndexOf('<', fine - 1) : -1;
  const chiusura = apertura < 0 ? -1 : testo.indexOf('>', apertura);
  if (chiusura >= fine && MENZIONE.test(testo.substring(apertura, chiusura + 1))) fine = apertura;
  return fine;
}

/**
 * Le opzioni del selettore dei task, una per task: l'emoji della casella del suo stato
 * (TaskActivityConverter.determineEmojiType), l'etichetta coi canali per nome, accorciata dopo
 * (ActivityOptionConverter.toSelectOption). Un'etichetta di Discord non ha Markdown: solo l'escape.
 */
export function opzioniDelSelettore(lista: Lista): string {
  return lista.tasks.map((t) => {
    const pos = posizione(t.pos);
    const etichetta = entro(conINomiDeiCanali(etichettaDelTask(t)), ETICHETTA_MASSIMA);
    return `<button type="button" class="sc-opt" role="option" data-k="opt-${pos}" data-pos="${pos}">`
      + `<span class="sc-cb"><img src="/icons/${t.fatto ? 'checkbox_marked' : 'checkbox_empty'}.png" alt=""></span>`
      + `<span class="sc-optlab">${escape(etichetta)}</span></button>`;
  }).join('');
}
