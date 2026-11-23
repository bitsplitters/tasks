/*
 * I testi delle scene della home (spec docs/superpowers/specs/2026-11-15-home-video-e-demo-design.md, nel repo
 * team-tasks-manager): i pulsanti coi nomi del bot, le frasi del selettore e del pannello, i tooltip, i testi di
 * Discord e i tempi dei video. Li usano i componenti delle scene, la demo coi suoi pezzi (demo/ui), i tooltip, i video
 * e la pagina della registrazione. La lista, il
 * server della demo e le regole del bot stanno in demo/ (spec 2026-11-15-demo-fedele-design.md): modello.ts,
 * regole.ts, testi.ts.
 *
 * Le frasi dell'interfaccia sono quelle del bundle del bot (demo/testi.ts), con la chiave accanto; quelle dei tooltip
 * sono del §8 della spec; quelle di Discord, del suo client. Tutte nella lingua della demo (demo/lingua.ts, spec
 * 2026-11-19-sito-multilingua-design.md, §10): per questo sono funzioni, che la leggono quando servono, e non costanti.
 * I testi che non sono del bot stanno in src/i18n/testi/<lingua>/demo.ts.
 */
import { delSito } from './demo/sito.ts';
import { testo } from './demo/testi.ts';

export type Tasto = 'content' | 'owner' | 'tag' | 'reminder' | 'webhook';
export type Colore = 'blue' | 'red';

/** Grigio, blu, rosso, di nuovo grigio: un clic alla volta, come nel bot. */
export const prossimoColore = (c: Colore | null): Colore | null => (c === null ? 'blue' : c === 'blue' ? 'red' : null);

/** I pulsanti della seconda riga del canale e del pannello, con le icone. */
const I_TASTI: readonly { k: Tasto; icona: string }[] = [
  { k: 'content', icona: 'task' },
  { k: 'owner', icona: 'owner' },
  { k: 'tag', icona: 'tag' },
  { k: 'reminder', icona: 'alertW' },
  { k: 'webhook', icona: 'api' },
];

/** La seconda riga del canale e i pulsanti del pannello (nomi: tasklist.guide.card.*). */
export const tasti = (): { k: Tasto; icona: string; nome: string }[] =>
  I_TASTI.map((t) => ({ ...t, nome: testo(`tasklist.guide.card.${t.k}`) }));

/** Il selettore a riposo (tasklist.slct.activities.hint.check). */
export const fraseSpunta = (): string => testo('tasklist.slct.activities.hint.check');

const due = (k: string, blu: string, rosso: string): Record<Colore, string> => ({
  blue: testo(`tasklist.slct.activities.hint.${k}.${blu}`),
  red: testo(`tasklist.slct.activities.hint.${k}.${rosso}`),
});

/** Il pannello dell'Activity con un pulsante acceso (tasklist.slct.activities.hint.*). */
export const frasi = (): Record<Tasto, Record<Colore, string>> => ({
  content: due('content', 'edit', 'delete'),
  owner: due('owner', 'edit', 'delete'),
  tag: due('tag', 'edit', 'delete'),
  reminder: due('reminder', 'edit', 'delete'),
  webhook: due('webhook', 'edit', 'delete'),
});

/**
 * Il selettore del canale con un pulsante acceso: come il pannello, ma Owner blu dice il claim
 * (tasklist.slct.activities.hint.owner.take), che nell'Activity non c'è.
 */
export const frasiNelCanale = (): Record<Tasto, Record<Colore, string>> => ({
  ...frasi(),
  owner: due('owner', 'take', 'delete'),
});

/** Il pannello a riposo (activity.panel.choose). */
export const fraseDelPannello = (id: string): string => testo('activity.panel.choose', id);

export interface Pulsante {
  k: string;
  icona: string;
  nome: string;
  testo: string;
}

/** La prima riga del canale (nomi: tasklist.guide.card.*), tutta blu; i testi sono dei tooltip. */
export const primaRiga = (): Pulsante[] => [
  { k: 'activity', icona: 'activity', nome: testo('tasklist.guide.card.activity'), testo: delSito('tooltip.activity') },
  { k: 'bulk', icona: 'edit', nome: testo('tasklist.guide.card.bulk'), testo: delSito('tooltip.bulk') },
  { k: 'clean', icona: 'clean', nome: testo('tasklist.guide.card.clean'), testo: delSito('tooltip.clean') },
  { k: 'reopen', icona: 'reopen', nome: testo('tasklist.guide.card.reopen'), testo: delSito('tooltip.reopen') },
  { k: 'more', icona: 'other', nome: testo('tasklist.guide.card.other'), testo: delSito('tooltip.more') },
];

/** Cosa fanno i pulsanti della seconda riga e del pannello (§8, «I tooltip»). */
const testoDelTasto = (k: Tasto): string => delSito(`tooltip.${k}`);

/** La prima riga dell'Activity (activity.btn.*): Guide, Edit, Clean, Reopen in blu, Exit in grigio. */
export const primaRigaActivity = (): Pulsante[] => [
  { k: 'guide', icona: 'doc', nome: testo('activity.btn.guide'), testo: delSito('tooltip.guide') },
  { k: 'edit', icona: 'edit', nome: testo('activity.btn.edit'), testo: delSito('tooltip.bulk') },
  { k: 'clean', icona: 'clean', nome: testo('activity.btn.clean'), testo: delSito('tooltip.clean') },
  { k: 'reopen', icona: 'reopen', nome: testo('activity.btn.reopen'), testo: delSito('tooltip.reopen') },
  { k: 'exit', icona: 'back', nome: testo('activity.btn.exit'), testo: delSito('tooltip.exit') },
];

/** In cima alla pagina dell'Activity: le liste del canale, chi è dentro, la rotella (activity.btn.settings). */
export const inCimaActivity = () => ({
  lists: { nome: delSito('tooltip.lists.nome'), testo: delSito('tooltip.lists') },
  people: { nome: delSito('tooltip.people.nome'), testo: delSito('tooltip.people') },
  settings: { nome: testo('activity.btn.settings'), testo: delSito('tooltip.settings') },
});

export interface Tooltip {
  nome: string;
  testo: string;
  nota?: string;
}

/** I tooltip della demo, per chiave: `ch-` nel canale, `ac-` nell'Activity, `ac-p-` nel pannello. */
export function tooltipDellaDemo(): Record<string, Tooltip> {
  const nota = delSito('tooltip.colori');
  return Object.fromEntries([
    ...primaRiga().map((p) => [`ch-${p.k}`, { nome: p.nome, testo: p.testo }]),
    ...tasti().map((t) => [`ch-${t.k}`, { nome: t.nome, testo: testoDelTasto(t.k), nota }]),
    ...primaRigaActivity().map((p) => [`ac-${p.k}`, { nome: p.nome, testo: p.testo }]),
    ...tasti().map((t) => [`ac-p-${t.k}`, { nome: t.nome, testo: testoDelTasto(t.k), nota }]),
    ...Object.entries(inCimaActivity()).map(([k, v]) => [`ac-${k}`, { ...v }]),
  ]);
}

export type Modo = 'channel' | 'activity';

/** Quanto durano i video (§4.2 e §4.3), in secondi. */
export const DURATA: Record<Modo, number> = { channel: 14, activity: 15.4 };

/** Da quando si accendono i tre passi sotto i video: «Tick a task», «Set an owner», «Add a reminder». */
export const PASSI: Record<Modo, readonly number[]> = { channel: [0.6, 3.3, 8.7], activity: [3.4, 6.1, 9.4] };

/** La freccia dei menu di Discord: il selettore dei task, i menu della demo (demo/ui). */
export const CHEV =
  'M5.3 9.3a1 1 0 0 1 1.4 0l5.3 5.3 5.3-5.3a1 1 0 1 1 1.4 1.4l-6 6a1 1 0 0 1-1.4 0l-6-6a1 1 0 0 1 0-1.4Z';

/**
 * I testi di Discord, non del bot (piano 2026-11-15-demo-fedele, §1.2.12 e §1.2.14), nella lingua della demo: la
 * modale coi suoi controlli, i menu, il messaggio effimero, la casella del messaggio. Quelli del bot stanno in
 * demo/testi.ts.
 */
export const discord = () => ({
  annulla: delSito('discord.annulla'),
  invia: delSito('discord.invia'),
  chiudi: delSito('discord.chiudi'),
  obbligatorio: delSito('discord.obbligatorio'),
  almeno: (n: number) => delSito('discord.almeno', { n }),
  togli: (nome: string) => delSito('discord.togli', { nome }),
  nessuno: delSito('discord.nessuno'),
  soloTu: delSito('discord.soloTu'),
  dismiss: delSito('discord.dismiss'),
  scrivi: (nome: string) => delSito('discord.scrivi', { nome }),
});

/** L'avviso della sola lettura (spec §1 e §8.3): in cima a Modifica in blocco, al pannello More, a Edit the list. */
export const avvisoIllustrativo = (): string => delSito('avviso');
