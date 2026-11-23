/*
 * I fusi del promemoria nell'Activity (piano 2026-11-15-demo-fedele, compito 11; spec §7.2; nel repo
 * team-tasks-manager): la tabella di activity/src/fake/zones.ts con le città in inglese, la ricerca di
 * activity/src/app/zones.ts (ZoneBook), le zone di chi guarda e l'ora del dispositivo sotto i campi. Il dispositivo
 * della demo è a Roma, come il server. Non tocca il DOM: lo usano la vista dei fusi e il campo del fuso.
 */
import { datiDi, type Lingua } from '../../../i18n/lingue.ts';
import { linguaDellaDemo } from './lingua.ts';
import { ZONA, offsetMinuti } from './modello.ts';

/** Il locale della pagina dell'Activity nella lingua della demo: i nomi dei paesi e l'ordine delle città. */
const localeDi = (lingua: Lingua) => (lingua === 'en' ? 'en' : datiDi(lingua).intl);

/** Una zona come la mostra la vista: città e paese, lo scarto da UTC e l'ora di adesso. */
export interface Zona {
  id: string;
  citta: string;
  paese: string;
  scarto: string;
  ora: string;
}

/** Perché una zona è fra «Your time zones» (activity.zone.reason.*). */
export type Motivo = 'device' | 'learned' | 'server';

/** Il fuso del dispositivo di chi guarda la demo. */
export const DISPOSITIVO = ZONA;

/** [zona, paese, città in inglese]: la tabella di activity/src/fake/zones.ts. */
const TABELLA: readonly (readonly [string, string, string])[] = [
  ['Europe/Rome', 'IT', 'Rome'], ['Europe/London', 'GB', 'London'], ['Europe/Dublin', 'IE', 'Dublin'],
  ['Europe/Lisbon', 'PT', 'Lisbon'], ['Europe/Madrid', 'ES', 'Madrid'], ['Europe/Paris', 'FR', 'Paris'],
  ['Europe/Brussels', 'BE', 'Brussels'], ['Europe/Amsterdam', 'NL', 'Amsterdam'], ['Europe/Berlin', 'DE', 'Berlin'],
  ['Europe/Zurich', 'CH', 'Zurich'], ['Europe/Vienna', 'AT', 'Vienna'], ['Europe/Prague', 'CZ', 'Prague'],
  ['Europe/Warsaw', 'PL', 'Warsaw'], ['Europe/Budapest', 'HU', 'Budapest'],
  ['Europe/Copenhagen', 'DK', 'Copenhagen'], ['Europe/Oslo', 'NO', 'Oslo'], ['Europe/Stockholm', 'SE', 'Stockholm'],
  ['Europe/Helsinki', 'FI', 'Helsinki'], ['Europe/Athens', 'GR', 'Athens'], ['Europe/Bucharest', 'RO', 'Bucharest'],
  ['Europe/Kyiv', 'UA', 'Kyiv'], ['Europe/Istanbul', 'TR', 'Istanbul'], ['Europe/Moscow', 'RU', 'Moscow'],
  ['Europe/Malta', 'MT', 'Malta'], ['Europe/San_Marino', 'SM', 'San Marino'],
  ['America/New_York', 'US', 'New York'], ['America/Chicago', 'US', 'Chicago'], ['America/Denver', 'US', 'Denver'],
  ['America/Phoenix', 'US', 'Phoenix'], ['America/Los_Angeles', 'US', 'Los Angeles'],
  ['America/Anchorage', 'US', 'Anchorage'], ['Pacific/Honolulu', 'US', 'Honolulu'],
  ['America/Toronto', 'CA', 'Toronto'], ['America/Vancouver', 'CA', 'Vancouver'],
  ['America/Halifax', 'CA', 'Halifax'], ['America/Mexico_City', 'MX', 'Mexico City'],
  ['America/Bogota', 'CO', 'Bogotá'], ['America/Lima', 'PE', 'Lima'], ['America/Caracas', 'VE', 'Caracas'],
  ['America/Santiago', 'CL', 'Santiago'], ['America/Argentina/Buenos_Aires', 'AR', 'Buenos Aires'],
  ['America/Sao_Paulo', 'BR', 'São Paulo'], ['Africa/Casablanca', 'MA', 'Casablanca'],
  ['Africa/Lagos', 'NG', 'Lagos'], ['Africa/Cairo', 'EG', 'Cairo'], ['Africa/Nairobi', 'KE', 'Nairobi'],
  ['Africa/Johannesburg', 'ZA', 'Johannesburg'], ['Asia/Jerusalem', 'IL', 'Jerusalem'],
  ['Asia/Riyadh', 'SA', 'Riyadh'], ['Asia/Tehran', 'IR', 'Tehran'], ['Asia/Dubai', 'AE', 'Dubai'],
  ['Asia/Karachi', 'PK', 'Karachi'], ['Asia/Kolkata', 'IN', 'Kolkata'], ['Asia/Kathmandu', 'NP', 'Kathmandu'],
  ['Asia/Dhaka', 'BD', 'Dhaka'], ['Asia/Bangkok', 'TH', 'Bangkok'], ['Asia/Jakarta', 'ID', 'Jakarta'],
  ['Asia/Singapore', 'SG', 'Singapore'], ['Asia/Manila', 'PH', 'Manila'], ['Asia/Hong_Kong', 'HK', 'Hong Kong'],
  ['Asia/Shanghai', 'CN', 'Shanghai'], ['Asia/Seoul', 'KR', 'Seoul'], ['Asia/Tokyo', 'JP', 'Tokyo'],
  ['Australia/Perth', 'AU', 'Perth'], ['Australia/Adelaide', 'AU', 'Adelaide'],
  ['Australia/Brisbane', 'AU', 'Brisbane'], ['Australia/Sydney', 'AU', 'Sydney'],
  ['Australia/Melbourne', 'AU', 'Melbourne'], ['Pacific/Auckland', 'NZ', 'Auckland'],
];

interface Riga {
  id: string;
  citta: string;
  paese: string;
}

/**
 * La tabella nell'ordine delle città, come il bot dà il suo catalogo (tableZones), coi paesi nella lingua della demo
 * (activity/src/fake/zones.ts). Si fa alla prima richiesta, una volta per lingua.
 */
const righe = new Map<Lingua, Riga[]>();

function tabella(): Riga[] {
  const lingua = linguaDellaDemo();
  let r = righe.get(lingua);
  if (!r) {
    const paesi = new Intl.DisplayNames([localeDi(lingua)], { type: 'region' });
    const ordine = new Intl.Collator(localeDi(lingua));
    r = TABELLA.map(([id, paese, citta]) => ({ id, citta, paese: paesi.of(paese) ?? paese }))
      .sort((a, b) => ordine.compare(a.citta, b.citta) || a.id.localeCompare(b.id));
    righe.set(lingua, r);
  }
  return r;
}

/** L'ora di una zona, come `clock` della pagina in inglese; null per una zona che il browser non sa disegnare. */
const OROLOGI = new Map<string, Intl.DateTimeFormat | null>();

function orologio(id: string): Intl.DateTimeFormat | null {
  if (!OROLOGI.has(id)) {
    let f: Intl.DateTimeFormat | null;
    try {
      f = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: id });
    } catch {
      f = null;
    }
    OROLOGI.set(id, f);
  }
  return OROLOGI.get(id) ?? null;
}

/** Il nome che il browser dà a una zona, lo stesso per le sue altre forme (browserZone); null se non la conosce. */
function delBrowser(id: string): string | null {
  return orologio(id)?.resolvedOptions().timeZone ?? null;
}

/** Lo scarto come formatOffset: «UTC+1», «UTC−3» col segno meno vero, «UTC+5:30». */
export function scarto(minuti: number): string {
  const assoluti = Math.abs(minuti);
  const m = assoluti % 60;
  return `UTC${minuti < 0 ? '−' : '+'}${Math.floor(assoluti / 60)}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

/** Le righe per il nome del browser: una zona fuori dalla tabella in un'altra forma (Asia/Calcutta) ha i suoi nomi. */
const perIlBrowser = new Map<Lingua, Map<string, Riga>>();

function nominata(id: string): Riga | null {
  const riga = tabella().find((r) => r.id === id);
  if (riga) return riga;
  const nome = delBrowser(id);
  if (nome === null) return null;
  let mappa = perIlBrowser.get(linguaDellaDemo());
  if (!mappa) {
    mappa = new Map();
    for (const r of tabella()) {
      const suo = delBrowser(r.id);
      if (suo !== null && !mappa.has(suo)) mappa.set(suo, r);
    }
    perIlBrowser.set(linguaDellaDemo(), mappa);
  }
  return mappa.get(nome) ?? null;
}

/** La zona come la mostrano la vista e il campo: senza un posto, la città è lo scarto. */
export function zona(id: string, adesso: number): Zona {
  const riga = nominata(id);
  const s = scarto(offsetMinuti(adesso, id));
  const ora = orologio(id)?.format(new Date(adesso * 1000)) ?? '';
  return { id, citta: riga?.citta ?? s, paese: riga?.paese ?? '', scarto: s, ora };
}

/** La stessa zona sotto due nomi, come Bot.sameZone. */
export function stessaZona(a: string, b: string): boolean {
  if (a === b) return true;
  const nome = delBrowser(a);
  return nome !== null && nome === delBrowser(b);
}

/**
 * «Your time zones», come yourZones del bot finto: il dispositivo, la zona che chi guarda ha scelto in una data, quella
 * del server, ognuna coi suoi motivi; una riga sola quando due motivi danno la stessa zona. Nella demo non c'è
 * l'ingranaggio, quindi la zona di una data è imparata, «last used», come nell'Activity dalla 2.6.0 senza un fuso scelto.
 */
export function tueZone(scelta: string | undefined, adesso: number): { zona: Zona; motivi: Motivo[] }[] {
  const fuori: { zona: Zona; motivi: Motivo[] }[] = [];
  const motivi: [string | undefined, Motivo][] = [[DISPOSITIVO, 'device'], [scelta, 'learned'], [ZONA, 'server']];
  for (const [id, motivo] of motivi) {
    if (!id || delBrowser(id) === null) continue;
    const stessa = fuori.find((r) => stessaZona(r.zona.id, id));
    if (stessa) stessa.motivi.push(motivo);
    else fuori.push({ zona: zona(id, adesso), motivi: [motivo] });
  }
  return fuori;
}

/** «+5:30», «utc-3», «GMT +1»: una ricerca per scarto da UTC. */
const PER_SCARTO = /^(?:utc|gmt)?\s*([+\-−])\s*(\d{1,2})(?:[:.](\d{2}))?$/;

/** Ciò che la ricerca confronta: senza accenti né maiuscole, Europe/San_Marino come si dice. */
function normale(testo: string): string {
  return testo.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/_/g, ' ').toLowerCase();
}

interface Chiave {
  riga: Riga;
  citta: string;
  /** Città, paese e nome IANA, uno per riga: ciò che si scrive non si trova a cavallo di due. */
  tutto: string;
}

const chiavi = new Map<Lingua, Chiave[]>();

/** Le righe che il browser sa disegnare: senza, non ci sarebbe un'ora da mostrare. */
function leChiavi(): Chiave[] {
  let c = chiavi.get(linguaDellaDemo());
  if (!c) {
    c = tabella().filter((r) => delBrowser(r.id) !== null).map((riga) => {
      const citta = normale(riga.citta);
      return { riga, citta, tutto: `${citta}\n${normale(riga.paese)}\n${normale(riga.id)}` };
    });
    chiavi.set(linguaDellaDemo(), c);
  }
  return c;
}

/**
 * La ricerca per città, paese, nome IANA o scarto, senza accenti né maiuscole: prima le città che cominciano col testo,
 * poi le altre righe nell'ordine delle città.
 */
export function cercaZone(testo: string, adesso: number): Zona[] {
  const q = normale(testo.trim());
  if (!q) return [];
  const s = PER_SCARTO.exec(q);
  let trovate: Chiave[];
  if (s) {
    const voluto = (s[1] === '+' ? 1 : -1) * (Number(s[2]) * 60 + Number(s[3] ?? 0));
    trovate = leChiavi().filter((k) => offsetMinuti(adesso, k.riga.id) === voluto);
  } else {
    const prime = leChiavi().filter((k) => k.citta.startsWith(q));
    trovate = [...prime, ...leChiavi().filter((k) => !k.citta.startsWith(q) && k.tutto.includes(q))];
  }
  return trovate.map((k) => zona(k.riga.id, adesso));
}

const BREVI = new Map<Lingua, Intl.DateTimeFormat>();

/**
 * L'ora che il dispositivo mostrerà (activity.reminder.device), come shortDateTime nella lingua della demo: «Sun 15
 * Nov, 18:14» (en-GB), «dom 15 nov, 18:14».
 */
export function sulDispositivo(at: number): string {
  const lingua = linguaDellaDemo();
  let breve = BREVI.get(lingua);
  if (!breve) {
    breve = new Intl.DateTimeFormat(lingua === 'en' ? 'en-GB' : datiDi(lingua).intl, {
      timeZone: DISPOSITIVO, weekday: 'short', day: 'numeric', month: 'short',
    });
    BREVI.set(lingua, breve);
  }
  const data = new Date(at * 1000);
  return `${breve.format(data)}, ${orologio(DISPOSITIVO)?.format(data) ?? ''}`;
}
