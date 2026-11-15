/*
 * I dati delle scene della home (spec docs/superpowers/specs/2026-11-15-home-video-e-demo-design.md, nel repo
 * team-tasks-manager): la lista, le persone, i pulsanti coi nomi del bot, le frasi del selettore e del pannello, i
 * tooltip, i fumetti della demo e i tempi dei video. Li usano i componenti delle scene, la demo, i tooltip, i video e
 * la pagina della registrazione.
 *
 * I testi dell'interfaccia sono quelli del bundle inglese del bot (slash-resource.properties), con la chiave
 * accanto; quelli dei tooltip e dei fumetti sono del §8 della spec.
 */

export const TITOLO = 'Roster & scrims — week 12';

export interface Task {
  id: string;
  testo: string;
  padre?: string;
}

/** La lista dei video e della demo (§4.1): quella della scena di prima, con un subtask. */
export const TASKS: readonly Task[] = [
  { id: '1', testo: "Confirm the five-man roster for Saturday's scrim block" },
  { id: '2', testo: 'Lock the scrim block vs. Nova Collective' },
  { id: '2.1', testo: 'Clip the three teamfights for the review', padre: '2' },
  { id: '3', testo: 'VOD review: mid rotations, game 3' },
  { id: '4', testo: 'Publish the match-day graphic' },
];

/** Fatto all'inizio, nei video e nella demo. */
export const FATTI_INIZIALI: readonly string[] = ['1'];

export interface Persona {
  id: string;
  nome: string;
  colore: string;
}

export const MIA: Persona = { id: 'mia', nome: 'Mia', colore: '#eb459e' };
export const LEO: Persona = { id: 'leo', nome: 'Leo', colore: '#23a55a' };
/** Chi guarda: nell'Activity è «Sam (you)» (activity.picker.you). */
export const SAM: Persona = { id: 'sam', nome: 'Sam', colore: '#f0b232' };

/**
 * Il promemoria del task 3, all'ora che propongono la modale del bot e l'Activity: adesso più 10 minuti, cioè le
 * 18:14 della scena (il messaggio è delle 18:04) del giorno della registrazione. Si registra un altro giorno? Si
 * cambiano queste righe.
 */
export const PROMEMORIA = {
  giorno: '15',
  mese: 'November',
  anno: '2026',
  ora: '18:14',
  fuso: 'Europe/Rome',
  /** `<t:N>` come lo mostra Discord in inglese (en-US). */
  canale: 'November 15, 2026 6:14 PM',
  /** La pagina dell'Activity in inglese usa en-GB (activity/src/text/time.ts). */
  activity: '15 November 2026 18:14',
  /** I campi nativi di Chrome in en-US. */
  campoData: '11/15/2026',
  campoOra: '06:14 PM',
  citta: 'Rome',
  paese: 'Italy',
  scarto: 'UTC+1',
} as const;

/**
 * La spunta con la cascata dei gruppi, nei due sensi, come il bot: il gruppo trascina i subtask, l'ultimo subtask
 * spuntato spunta il gruppo, un subtask despuntato lo riapre.
 */
export function spunta(fatti: ReadonlySet<string>, id: string, valore: boolean): Set<string> {
  const nuovi = new Set(fatti);
  const imposta = (x: string) => (valore ? nuovi.add(x) : nuovi.delete(x));
  imposta(id);
  TASKS.filter((t) => t.padre === id).forEach((t) => imposta(t.id));
  const padre = TASKS.find((t) => t.id === id)?.padre;
  if (padre) {
    const fratelli = TASKS.filter((t) => t.padre === padre);
    if (fratelli.every((f) => nuovi.has(f.id))) nuovi.add(padre);
    else nuovi.delete(padre);
  }
  return nuovi;
}

/**
 * La barra come la disegna il bot (scripts/bar/README.md): per difetto al 5%, 5 con una casella, 95 finché ne manca
 * una.
 */
export function avanzamento(fatti: ReadonlySet<string>): number {
  const n = TASKS.filter((t) => fatti.has(t.id)).length;
  if (n === 0) return 0;
  if (n === TASKS.length) return 100;
  return Math.min(95, Math.max(5, Math.floor((n / TASKS.length) * 20) * 5));
}

export type Tasto = 'content' | 'owner' | 'tag' | 'reminder' | 'webhook';
export type Colore = 'blue' | 'red';

/** Grigio, blu, rosso, di nuovo grigio: un clic alla volta, come nel bot. */
export const prossimoColore = (c: Colore | null): Colore | null => (c === null ? 'blue' : c === 'blue' ? 'red' : null);

/** La seconda riga del canale e i pulsanti del pannello (nomi: tasklist.guide.card.*). */
export const TASTI: readonly { k: Tasto; icona: string; nome: string }[] = [
  { k: 'content', icona: 'task', nome: 'Content' },
  { k: 'owner', icona: 'owner', nome: 'Owner' },
  { k: 'tag', icona: 'tag', nome: 'Tag' },
  { k: 'reminder', icona: 'alertW', nome: 'Reminder' },
  { k: 'webhook', icona: 'api', nome: 'Webhook' },
];

/** Il selettore a riposo (tasklist.slct.activities.hint.check). */
export const FRASE_SPUNTA = 'Tick a task';

/** Il selettore e il pannello con un pulsante acceso (tasklist.slct.activities.hint.*). */
export const FRASI: Record<Tasto, Record<Colore, string>> = {
  content: { blue: 'Edit task', red: 'Delete task' },
  owner: { blue: 'Edit owner', red: 'Remove owner' },
  tag: { blue: 'Edit tags', red: 'Remove tags' },
  reminder: { blue: 'Edit reminder', red: 'Remove reminder' },
  webhook: { blue: 'Link webhook', red: 'Unlink webhook' },
};

/** Il pannello a riposo (activity.panel.choose). */
export const fraseDelPannello = (id: string) => `Choose what to change in task ${id}`;

/** Il menu sotto i pulsanti, quando Owner, Tag o Webhook sono blu (tasklist.slct.owner, .tag, .webhook). */
export const MENU_SOTTO: Partial<Record<Tasto, string>> = {
  owner: 'Choose one or more people, or a role, then the task',
  tag: 'Choose the tag, then the task',
  webhook: 'Choose the webhook to associate',
};

export interface Pulsante {
  k: string;
  icona: string;
  nome: string;
  testo: string;
}

/** La prima riga del canale (tasklist.guide.card.*), tutta blu. */
export const PRIMA_RIGA: readonly Pulsante[] = [
  { k: 'activity', icona: 'activity', nome: 'Activity',
    testo: 'Open the list in a window inside Discord and work on it together.' },
  { k: 'bulk', icona: 'edit', nome: 'Bulk update', testo: 'Edit the title and every task at once.' },
  { k: 'clean', icona: 'clean', nome: 'Clean list', testo: 'Clear away the completed tasks.' },
  { k: 'reopen', icona: 'reopen', nome: 'Reopen all', testo: 'Bring every completed task back to to-do.' },
  { k: 'more', icona: 'other', nome: 'More',
    testo: 'Clone, download, seal or delete the list, plus the guide to every button.' },
];

/** Cosa fanno i pulsanti della seconda riga e del pannello (§8, «I tooltip»). */
export const TESTI_TASTI: Record<Tasto, string> = {
  content: 'Edit or delete a task.',
  owner: 'Give a task its owner: a person, a role, or several people.',
  tag: 'Choose who hears about it when the task is done.',
  reminder: 'Set when the owner gets reminded.',
  webhook: 'Let your other systems know when the task is ticked or reopened.',
};

export const NOTA_COLORI = 'Blue edits, red deletes.';

/** La prima riga dell'Activity (activity.btn.*): Guide, Edit, Clean, Reopen in blu, Exit in grigio. */
export const PRIMA_RIGA_ACTIVITY: readonly Pulsante[] = [
  { k: 'guide', icona: 'doc', nome: 'Guide', testo: 'What every button does.' },
  { k: 'edit', icona: 'edit', nome: 'Edit the list', testo: PRIMA_RIGA[1].testo },
  { k: 'clean', icona: 'clean', nome: 'Clean the list', testo: PRIMA_RIGA[2].testo },
  { k: 'reopen', icona: 'reopen', nome: 'Reopen all', testo: PRIMA_RIGA[3].testo },
  { k: 'exit', icona: 'back', nome: 'Exit',
    testo: 'Leave the Activity. The last one out sends the list back to the channel, with a summary.' },
];

/** In cima alla pagina dell'Activity: «Lists» (activity.btn.home), chi è dentro, la rotella (activity.btn.settings). */
export const IN_CIMA_ACTIVITY = {
  lists: { nome: 'Lists', testo: 'See the other lists of this channel.' },
  people: { nome: 'People here', testo: "Who's working on the list right now." },
  settings: { nome: 'Settings', testo: 'Your theme and text size, just for you.' },
} as const;

export interface Tooltip {
  nome: string;
  testo: string;
  nota?: string;
}

/** I tooltip della demo, per chiave: `ch-` nel canale, `ac-` nell'Activity, `ac-p-` nel pannello. */
export const TOOLTIP: Record<string, Tooltip> = Object.fromEntries([
  ...PRIMA_RIGA.map((p) => [`ch-${p.k}`, { nome: p.nome, testo: p.testo }]),
  ...TASTI.map((t) => [`ch-${t.k}`, { nome: t.nome, testo: TESTI_TASTI[t.k], nota: NOTA_COLORI }]),
  ...PRIMA_RIGA_ACTIVITY.map((p) => [`ac-${p.k}`, { nome: p.nome, testo: p.testo }]),
  ...TASTI.map((t) => [`ac-p-${t.k}`, { nome: t.nome, testo: TESTI_TASTI[t.k], nota: NOTA_COLORI }]),
  ...Object.entries(IN_CIMA_ACTIVITY).map(([k, v]) => [`ac-${k}`, { ...v }]),
]);

/** I fumetti della demo del canale, quando si sceglie un task con un pulsante acceso (§8). */
export const FUMETTI: Record<Tasto, Record<Colore, (n: string) => string>> = {
  content: {
    blue: (n) => `In Discord, this opens the form to edit task\u00a0${n}.`,
    red: (n) => `In Discord, this deletes task\u00a0${n}.`,
  },
  owner: {
    blue: (n) => `In Discord, the owner you picked goes to task\u00a0${n}.`,
    red: (n) => `In Discord, this removes the owner of task\u00a0${n}.`,
  },
  tag: {
    blue: (n) => `In Discord, the tags you picked go to task\u00a0${n}.`,
    red: (n) => `In Discord, this removes every tag from task\u00a0${n}.`,
  },
  reminder: {
    blue: (n) => `In Discord, this opens the reminder form for task\u00a0${n}.`,
    red: (n) => `In Discord, this removes the reminder of task\u00a0${n}.`,
  },
  webhook: {
    blue: (n) => `In Discord, this lets you link a webhook to task\u00a0${n}.`,
    red: (n) => `In Discord, this unlinks the webhook from task\u00a0${n}.`,
  },
};

export type Modo = 'channel' | 'activity';

/** Quanto durano i video (§4.2 e §4.3), in secondi. */
export const DURATA: Record<Modo, number> = { channel: 14, activity: 15.4 };

/** Da quando si accendono i tre passi sotto i video: «Tick a task», «Set an owner», «Add a reminder». */
export const PASSI: Record<Modo, readonly number[]> = { channel: [0.6, 3.3, 8.7], activity: [3.4, 6.1, 9.4] };
