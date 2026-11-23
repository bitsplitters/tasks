/*
 * Il modello della demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md, §3.1 e §3.6; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, §1.2; tutti e due nel repo team-tasks-manager): la lista come dato,
 * il server della demo, le due liste di partenza e l'orologio fermo. Non tocca il DOM: lo usano le regole, il disegno
 * delle righe, la demo, i video e il build.
 */
import { datiDi, type Lingua } from '../../../i18n/lingue.ts';
import { dataDiDiscord } from './date-di-discord.ts';
import { linguaDellaDemo } from './lingua.ts';
import { delSito } from './sito.ts';

/** La posizione di un task: 2.1 è { main: 2, sub: 1 }, un task principale ha sub 0. */
export interface Pos {
  main: number;
  sub: number;
}

export interface Owner {
  tipo: 'persona' | 'ruolo';
  id: string;
}

/**
 * Il promemoria di un task, `at` in secondi epoch. Nella demo è sempre un evento singolo; i casi d'uso del sito
 * (src/lib/esempi) usano anche la ricorrenza: l'intervallo (`7d`) e le ripetizioni dopo il primo avviso, come la
 * tripletta `[distanza,intervallo,ripetizioni]` del bot.
 */
export interface Promemoria {
  at: number;
  zona: string;
  ricorrenza?: { intervallo: string; ripetizioni: number };
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

/**
 * I webhook già creati nel server, coi nomi nella lingua della demo: mancavano, ed era il motivo per cui il webhook non
 * si poteva provare.
 */
export const webhookDellaDemo = (): Webhook[] => [
  { nome: delSito('lista.webhook.risultati'), scatta: 'completion' },
  { nome: delSito('lista.webhook.staff'), scatta: 'both' },
];

/** Chi è nell'Activity: le pillole del selettore delle persone prima di scrivere (activity.picker.here). */
export const NELL_ACTIVITY: readonly string[] = [SAM, MIA];

/** Il fuso del server: anche quello di chi guarda, finché non ne scrive un altro (fusoDi). */
export const ZONA = 'Europe/Rome';

/** L'orologio fermo: il 15 novembre 2026 alle 18:04 di Roma, l'ora del messaggio della lista. */
export const ADESSO = Date.UTC(2026, 10, 15, 17, 4) / 1000;

/** Il promemoria proposto: adesso più dieci minuti, come WhenModalFields.prefillBase. */
export const PROPOSTO = ADESSO + 600;

/** Il titolo e i testi della lista, nella lingua della demo (src/i18n/testi/<lingua>/demo.ts). */
function listaDiPartenza(conOwner: boolean): Lista {
  const testo = (n: string) => delSito(`lista.task.${n}` as Parameters<typeof delSito>[0]);
  const task3: Task = { pos: { main: 3, sub: 0 }, testo: testo('3'), fatto: false };
  if (conOwner) {
    task3.owner = { tipo: 'persona', id: MIA };
    task3.promemoria = { at: PROPOSTO, zona: ZONA };
  }
  return {
    titolo: delSito('lista.titolo'),
    tasks: [
      { pos: { main: 1, sub: 0 }, testo: testo('1'), fatto: true },
      { pos: { main: 2, sub: 0 }, testo: testo('2'), fatto: false },
      { pos: { main: 2, sub: 1 }, testo: testo('2.1'), fatto: false },
      task3,
      { pos: { main: 4, sub: 0 }, testo: testo('4'), fatto: false },
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
    ruoli: [{ id: COACHES, nome: delSito('lista.ruolo'), membri: [MIA, LEO], diTtm: false }],
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

/**
 * Una data come la scrive un client Discord nella lingua della demo, a Roma (dataDiDiscord): `<t:N>` «November 15, 2026
 * 6:14 PM», `<t:N:F>` col giorno della settimana, `<t:N:t>` «6:14 PM» (l'ora accanto al nome nel messaggio); in
 * italiano «15 novembre 2026 18:14».
 */
export function dataDelCanale(at: number, stile = ''): string {
  return dataDiDiscord(at, stile, ZONA, linguaDellaDemo());
}

const DELL_ACTIVITY = new Map<Lingua, Intl.DateTimeFormat>();

/**
 * Una data come la scrive la pagina dell'Activity (text/time.ts) nella lingua della demo, a 24 ore: «15 November 2026
 * 18:14» (en-GB), «15 novembre 2026 18:14».
 */
export function dataDellActivity(at: number): string {
  const lingua = linguaDellaDemo();
  let f = DELL_ACTIVITY.get(lingua);
  if (!f) {
    f = new Intl.DateTimeFormat(datiDi(lingua).intl, {
      timeZone: ZONA, day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    });
    DELL_ACTIVITY.set(lingua, f);
  }
  const p = parti(f, at);
  return `${p.day} ${p.month} ${p.year} ${p.hour}:${p.minute}`;
}
