/*
 * I testi delle scene della home (spec docs/superpowers/specs/2026-11-15-home-video-e-demo-design.md, nel repo
 * team-tasks-manager): i pulsanti coi nomi del bot, le frasi del selettore e del pannello, i tooltip, i testi di
 * Discord e i tempi dei video. Li usano i componenti delle scene, la demo coi suoi pezzi (demo/ui), i tooltip, i video
 * e la pagina della registrazione. La lista, il
 * server della demo e le regole del bot stanno in demo/ (spec 2026-11-15-demo-fedele-design.md): modello.ts,
 * regole.ts, testi.ts.
 *
 * Le frasi dell'interfaccia sono quelle del bundle inglese del bot (slash-resource.properties), con la chiave
 * accanto; quelle dei tooltip sono del §8 della spec; quelle di Discord, del suo client in inglese.
 */

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

export type Modo = 'channel' | 'activity';

/** Quanto durano i video (§4.2 e §4.3), in secondi. */
export const DURATA: Record<Modo, number> = { channel: 14, activity: 15.4 };

/** Da quando si accendono i tre passi sotto i video: «Tick a task», «Set an owner», «Add a reminder». */
export const PASSI: Record<Modo, readonly number[]> = { channel: [0.6, 3.3, 8.7], activity: [3.4, 6.1, 9.4] };

/** La freccia dei menu di Discord: il selettore dei task, i menu della demo (demo/ui). */
export const CHEV =
  'M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.3 5.3-5.3a1 1 0 1 1 1.4 1.4l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4Z';

/**
 * I testi di Discord, non del bot (piano 2026-11-15-demo-fedele, §1.2.12 e §1.2.14): la modale coi suoi controlli, i
 * menu, il messaggio effimero. Quelli del bot stanno in demo/testi.ts.
 */
export const DISCORD = {
  annulla: 'Cancel',
  invia: 'Submit',
  chiudi: 'Close',
  obbligatorio: 'This field is required.',
  almeno: (n: number) => `Must be at least ${n} characters long.`,
  togli: (nome: string) => `Remove ${nome}`,
  nessuno: 'No results found',
  soloTu: 'Only you can see this',
  dismiss: 'Dismiss message',
} as const;

/** L'avviso della sola lettura (spec §1 e §8.3): in cima a Modifica in blocco, al pannello More, a Edit the list. */
export const AVVISO_ILLUSTRATIVO = "For illustration only: this demo doesn't fully replicate how TTM works.";
