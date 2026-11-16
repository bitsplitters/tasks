/*
 * Il modello della demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md, §3.1 e §3.6; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, §1.2; tutti e due nel repo team-tasks-manager): la lista come dato,
 * il server della demo, le due liste di partenza e l'orologio fermo. Non tocca il DOM: lo usano le regole, il disegno
 * delle righe, la demo, i video e il build.
 */

/** La posizione di un task: 2.1 è { main: 2, sub: 1 }, un task principale ha sub 0. */
export interface Pos {
  main: number;
  sub: number;
}

export interface Owner {
  tipo: 'persona' | 'ruolo';
  id: string;
}

/** Sempre un evento singolo: i promemoria ricorrenti sono fuori dalla demo. `at` in secondi epoch. */
export interface Promemoria {
  at: number;
  zona: string;
}

/**
 * Un task come lo salva il bot: il testo è la prosa coi tag in coda (`<@id>`, `<@&id>`); l'owner è un campo, che la
 * riga mostra davanti al testo; il webhook è il suo nome.
 */
export interface Task {
  pos: Pos;
  testo: string;
  fatto: boolean;
  owner?: Owner;
  promemoria?: Promemoria;
  webhook?: string;
}

export interface Lista {
  titolo: string;
  tasks: Task[];
}

export interface Persona {
  id: string;
  nome: string;
  username: string;
  colore: string;
}

/** Un ruolo del server; `diTtm` per i ruoli `TTM<n>` che il bot crea per gli owner di più persone. */
export interface Ruolo {
  id: string;
  nome: string;
  membri: string[];
  diTtm: boolean;
}

export interface Webhook {
  nome: string;
  /** Quando scatta: al completamento del task, o sempre (activity.webhook.trigger.*). */
  scatta: 'completion' | 'both';
}

/** Lo stato della demo, uno solo per i due tab. */
export interface Stato {
  lista: Lista;
  ruoli: Ruolo[];
  bloccata: boolean;
  inActivity: boolean;
  /**
   * Il fuso di chi guarda, quando ne ha scritto uno al posto di quello proposto, in una modale «Quando» o nel pannello
   * del promemoria (UserTimezoneService.learn). Senza, vale quello del server (fusoDi).
   */
  fuso?: string;
}

/*
 * Gli id del server della demo: da 17 a 20 cifre come quelli di Discord, perché le regole del bot riconoscono una
 * menzione solo così (Patterns.OWNER_ENTITY, TAG_ENTITY).
 */
export const MIA = '1181730456203947581';
export const LEO = '1181730456203947582';
/** Chi guarda la demo: nell'Activity è «Sam (you)». */
export const SAM = '1181730456203947583';
export const COACHES = '1181730456203947590';
/** Il canale #scrims. */
export const CANALE = '1181730456203947000';
export const NOME_DEL_CANALE = 'scrims';

/** L'id del ruolo `TTM<n>`: TTM1 è 1181730456203947601. */
export function idRuoloTtm(n: number): string {
  return `11817304562039476${String(n).padStart(2, '0')}`;
}

/** Le persone del server, nell'ordine dei menu, coi colori degli avatar delle scene. */
export const PERSONE: readonly Persona[] = [
  { id: MIA, nome: 'Mia', username: 'mia_nova', colore: '#eb459e' },
  { id: LEO, nome: 'Leo', username: 'leo_kade', colore: '#23a55a' },
  { id: SAM, nome: 'Sam', username: 'sam_rivers', colore: '#f0b232' },
];

/** I webhook già creati nel server: mancavano, ed era il motivo per cui il webhook non si poteva provare. */
export const WEBHOOK: readonly Webhook[] = [
  { nome: 'Scrim results', scatta: 'completion' },
  { nome: 'Staff alerts', scatta: 'both' },
];

/** Chi è nell'Activity: le pillole del selettore delle persone prima di scrivere (activity.picker.here). */
export const NELL_ACTIVITY: readonly string[] = [SAM, MIA];

/** Il fuso del server: anche quello di chi guarda, finché non ne scrive un altro (fusoDi). */
export const ZONA = 'Europe/Rome';

/** L'orologio fermo: il 15 novembre 2026 alle 18:04 di Roma, l'ora del messaggio della lista. */
export const ADESSO = Date.UTC(2026, 10, 15, 17, 4) / 1000;

/** Il promemoria proposto: adesso più dieci minuti, come WhenModalFields.prefillBase. */
export const PROPOSTO = ADESSO + 600;

export const TITOLO = 'Roster & scrims — week 12';

const TESTI = [
  "Confirm the five-man roster for Saturday's scrim block",
  'Lock the scrim block vs. Nova Collective',
  'Clip the three teamfights for the review',
  'VOD review: mid rotations, game 3',
  'Publish the match-day graphic',
] as const;

function listaDiPartenza(conOwner: boolean): Lista {
  const task3: Task = { pos: { main: 3, sub: 0 }, testo: TESTI[3], fatto: false };
  if (conOwner) {
    task3.owner = { tipo: 'persona', id: MIA };
    task3.promemoria = { at: PROPOSTO, zona: ZONA };
  }
  return {
    titolo: TITOLO,
    tasks: [
      { pos: { main: 1, sub: 0 }, testo: TESTI[0], fatto: true },
      { pos: { main: 2, sub: 0 }, testo: TESTI[1], fatto: false },
      { pos: { main: 2, sub: 1 }, testo: TESTI[2], fatto: false },
      task3,
      { pos: { main: 4, sub: 0 }, testo: TESTI[4], fatto: false },
    ],
  };
}

/** La lista della demo: il task 1 completato, il 3 con Mia come owner e il promemoria delle 18:14. Sempre nuova. */
export function listaDellaDemo(): Lista {
  return listaDiPartenza(true);
}

/** La lista dei video: senza owner e senza promemoria, che i video aggiungono. */
export function listaDeiVideo(): Lista {
  return listaDiPartenza(false);
}

/** La demo all'inizio o dopo «Start over»: nessun ruolo `TTM<n>`, la lista sbloccata nel canale. */
export function statoIniziale(lista: Lista = listaDellaDemo()): Stato {
  return {
    lista,
    ruoli: [{ id: COACHES, nome: 'Coaches', membri: [MIA, LEO], diTtm: false }],
    bloccata: false,
    inActivity: false,
  };
}

/** Il fuso di chi guarda, come FusoDiChiAgisce: il suo, se ne ha scritto uno, altrimenti quello del server. */
export function fusoDi(stato: Stato): string {
  return stato.fuso ?? ZONA;
}

/** La posizione come la scrive la riga: '2', '2.1'. */
export function posizione(pos: Pos): string {
  return pos.sub ? `${pos.main}.${pos.sub}` : String(pos.main);
}

/*
 * Le date. Si compongono per parti (formatToParts): la frase intera di Intl cambia da un motore all'altro. I
 * formattatori si fanno una volta per fuso: farne uno costa molto più che usarlo.
 */
const MURI = new Map<string, Intl.DateTimeFormat>();

function muro(zona: string): Intl.DateTimeFormat {
  let f = MURI.get(zona);
  if (!f) {
    f = new Intl.DateTimeFormat('en-CA', {
      timeZone: zona, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      hourCycle: 'h23',
    });
    MURI.set(zona, f);
  }
  return f;
}

function parti(f: Intl.DateTimeFormat, at: number): Record<string, string> {
  const r: Record<string, string> = {};
  for (const p of f.formatToParts(new Date(at * 1000))) r[p.type] = p.value;
  return r;
}

/** I campi dell'orologio di un istante in un fuso: giorno, mese e anno come numeri, l'ora come «HH:mm». */
export function campiDi(at: number, zona: string): { giorno: number; mese: number; anno: number; ora: string } {
  const p = parti(muro(zona), at);
  return { giorno: Number(p.day), mese: Number(p.month), anno: Number(p.year), ora: `${p.hour}:${p.minute}` };
}

/** Lo scarto di un fuso in un istante, in minuti a est di UTC (activity/src/text/time.ts, offsetMinutes). */
export function offsetMinuti(at: number, zona: string): number {
  const p = parti(muro(zona), at);
  const comeUtc = Date.UTC(Number(p.year), Number(p.month) - 1, Number(p.day), Number(p.hour), Number(p.minute));
  return Math.round((comeUtc / 1000 - Math.floor(at / 60) * 60) / 60);
}

/**
 * L'istante dei campi in un fuso, come ZonedDateTime.of nel bot: un'ora che non esiste (il salto di marzo) va avanti
 * della durata del salto, cioè si legge con lo scarto di prima; un'ora che c'è due volte (ottobre) prende la prima.
 * Gli scarti possibili sono quello di un giorno prima e quello di un giorno dopo: due cambi d'ora non stanno mai così
 * vicini.
 */
export function daiCampi(giorno: number, mese: number, anno: number, ora: string, zona: string): number {
  const [h, m] = ora.split(':').map(Number);
  const ingenuo = Date.UTC(anno, mese - 1, giorno, h, m) / 1000;
  const prima = offsetMinuti(ingenuo - 86400, zona);
  const dopo = offsetMinuti(ingenuo + 86400, zona);
  const validi = [...new Set([prima, dopo])]
    .map((o) => ingenuo - o * 60)
    .filter((t) => offsetMinuti(t, zona) * 60 === ingenuo - t);
  return validi.length ? Math.min(...validi) : ingenuo - prima * 60;
}

const DEL_CANALE = new Intl.DateTimeFormat('en-US', {
  timeZone: ZONA, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
  hour12: true,
});

/**
 * Una data come la scrive un client Discord in inglese americano, a Roma: `<t:N>` «November 15, 2026 6:14 PM»,
 * `<t:N:F>` «Sunday, November 15, 2026 6:14 PM», `<t:N:t>` «6:14 PM» (l'ora accanto al nome nel messaggio). Gli altri
 * stili, che la demo non usa, come `<t:N>`.
 */
export function dataDelCanale(at: number, stile = ''): string {
  const p = parti(DEL_CANALE, at);
  const ora = `${p.hour}:${p.minute} ${p.dayPeriod}`;
  if (stile === 't') return ora;
  const data = `${p.month} ${p.day}, ${p.year} ${ora}`;
  return stile === 'F' ? `${p.weekday}, ${data}` : data;
}

const DELL_ACTIVITY = new Intl.DateTimeFormat('en-GB', {
  timeZone: ZONA, day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
});

/** Una data come la scrive in inglese la pagina dell'Activity (en-GB, text/time.ts): «15 November 2026 18:14». */
export function dataDellActivity(at: number): string {
  const p = parti(DELL_ACTIVITY, at);
  return `${p.day} ${p.month} ${p.year} ${p.hour}:${p.minute}`;
}
