/*
 * I nomi delle modali (segnaposto leggibili, 2.5.0; spec 2026-11-21-segnaposto-leggibili-design.md, §2, §3 e §6, nel
 * repo team-tasks-manager): all'apertura i codici del testo diventano i nomi del server e la data di un promemoria
 * quella del fuso (NomiNellaModale.perLaModale); al salvataggio i nomi tornano codici (dallaModale). La demo e i casi
 * d'uso del sito li usano ai bordi delle loro modali, come il bot: dentro, il testo resta con gli id.
 */
import { CANALE, NOME_DEL_CANALE, PERSONE, fusoDi } from './modello.ts';
import type { Stato } from './modello.ts';
import { testo } from './testi.ts';

/** Le persone, i ruoli e i canali che un testo può nominare, e il fuso delle date. */
export interface Rubrica {
  persone: readonly { id: string; nome: string; username: string }[];
  ruoli: readonly { id: string; nome: string }[];
  canali: readonly { id: string; nome: string }[];
  zona: string;
  /** Se il fuso è quello che chi guarda ha scritto (FusoScelto.Origine.PERSONALE); altrimenti è quello del server. */
  personale: boolean;
}

/**
 * La rubrica della demo: le persone del server, i suoi ruoli, il canale #scrims e il fuso di chi guarda, che fa le veci
 * del fuso di chi apre la modale (FusoDiChiAgisce.perAncorare).
 */
export function rubricaDi(stato: Stato): Rubrica {
  return {
    persone: PERSONE.map((p) => ({ id: p.id, nome: p.nome, username: p.username })),
    ruoli: stato.ruoli.map((r) => ({ id: r.id, nome: r.nome })),
    canali: [{ id: CANALE, nome: NOME_DEL_CANALE }],
    zona: fusoDi(stato),
    personale: stato.fuso !== undefined,
  };
}

interface Voce {
  codice: string;
  /** Il nome senza il segno. */
  nome: string;
  tipo: 'persona' | 'ruolo' | 'canale';
}

/** Un carattere che sta in un nome: un nome seguito da uno di questi è l'inizio di una parola più lunga. */
const DEL_NOME = /[\p{L}\p{N}_]/u;

/** I codici del testo e i segni: una menzione, un canale, la data di un promemoria davanti alla tripletta. */
const CODICI = /<@(&?)(\d{17,20})>|<#(\d{17,20})>|<t:(\d+)>(?= \[[\ddhm]+,[\ddhm]+,\d+\])|[@#]/g;

/**
 * Il dizionario (Dizionario): le persone della rubrica, tutti i ruoli e i canali. Una persona con lo stesso nome di
 * un'altra voce dopo la `@` prende lo username; due ruoli o due canali con lo stesso nome restano col codice. Il
 * confronto ignora le maiuscole.
 */
function dizionario(r: Rubrica): { at: Voce[]; hash: Voce[] } {
  const k = (nome: string) => nome.toLowerCase();
  const quanti = (nomi: string[]) => nomi.reduce((m, n) => m.set(k(n), (m.get(k(n)) ?? 0) + 1), new Map<string, number>());
  const dopoLaChiocciola = quanti([...r.persone.map((p) => p.nome), ...r.ruoli.map((x) => x.nome)]);
  const ruoli = quanti(r.ruoli.map((x) => x.nome));
  const canali = quanti(r.canali.map((c) => c.nome));
  return {
    at: [
      ...r.persone.map((p): Voce => ({
        codice: `<@${p.id}>`, tipo: 'persona',
        nome: dopoLaChiocciola.get(k(p.nome))! > 1 ? `${p.nome} (${p.username})` : p.nome,
      })),
      ...r.ruoli.filter((x) => ruoli.get(k(x.nome)) === 1)
        .map((x): Voce => ({ codice: `<@&${x.id}>`, nome: x.nome, tipo: 'ruolo' })),
    ],
    hash: r.canali.filter((c) => canali.get(k(c.nome)) === 1)
      .map((c): Voce => ({ codice: `<#${c.id}>`, nome: c.nome, tipo: 'canale' })),
  };
}

/** Il nome più lungo di `voci` scritto da `da`, come parola intera, senza badare alle maiuscole. */
function piuLungo(voci: readonly Voce[], scritto: string, da: number): Voce | null {
  let trovata: Voce | null = null;
  for (const v of voci) {
    const fine = da + v.nome.length;
    if (scritto.slice(da, fine).toLowerCase() !== v.nome.toLowerCase()) continue;
    if (fine < scritto.length && DEL_NOME.test(scritto[fine])) continue;
    if (!trovata || v.nome.length > trovata.nome.length) trovata = v;
  }
  return trovata;
}

/** Le persone che il testo cita: come nel bot, all'apertura il dizionario ha solo quelle della lista. */
function delTesto(conId: string, r: Rubrica): Rubrica {
  return { ...r, persone: r.persone.filter((p) => conId.includes(`<@${p.id}>`)) };
}

/**
 * Trattino, spunta, webhook, data e tripletta: quel che viene prima del contenuto di un task (NomiNellaModale.PREFISSO).
 * Le date scritte non servono: la demo legge coi nomi i testi salvati, che le hanno come codici, e scrive solo i
 * Contenuti, che non ne hanno.
 */
const PREFISSO = /[^\S\n]*-?[^\S\n]*(?:\[[xX]?\][^\S\n]*)?(?:(?:\{\{wb=[^{}]*\}\}|<t:\d+(?::[a-zA-Z])?>|\[[0-9dhmM]+,[0-9dhmM]+,\d+\])[^\S\n]*)*/y;

/**
 * Che cosa ha il campo (NomiNellaModale.Campo): le righe di una lista, con l'owner in testa a ogni task, o il contenuto
 * di un task solo, che non ha l'owner (scelta dell'utente del 2026-11-22: «il contenuto deve modificare solo il
 * contenuto»).
 */
export type Campo = 'lista' | 'contenuto';

/**
 * Dove comincia il contenuto di ogni riga (NomiNellaModale.testa): lì una `@nome:` è l'owner. Nel contenuto di un task
 * solo l'owner non c'è, e la testa nemmeno.
 */
function teste(testo: string, campo: Campo): Set<number> {
  const inizi = new Set<number>();
  if (campo === 'contenuto') return inizi;
  let inizio = 0;
  for (const riga of testo.split('\n')) {
    PREFISSO.lastIndex = 0;
    inizi.add(inizio + (PREFISSO.exec(riga)?.[0].length ?? 0));
    inizio += riga.length + 1;
  }
  return inizi;
}

/** Il nome di un owner scritto (NomiNellaModale.OWNER_SCRITTO): fino ai due punti, seguiti da uno spazio o dalla fine. */
const OWNER_SCRITTO = /([^\s@#<>\\`{}:][^@#<>\\`{}:\n]{0,31}):(?=\s|$)/y;

/** Il nome dell'owner scritto da `da`, senza il segno, o null (NomiNellaModale.ownerScritto). */
function ownerScritto(testo: string, da: number): string | null {
  OWNER_SCRITTO.lastIndex = da;
  const nome = OWNER_SCRITTO.exec(testo)?.[1];
  return nome !== undefined && nome === nome.trimEnd() ? nome : null;
}

/**
 * Se un segno scritto come testo vuole la barra (NomiNellaModale.idoneo): dove la lettura troverebbe un nome, cioè
 * davanti a un nome del dizionario o, in testa al contenuto, davanti alla forma dell'owner, che sarebbe un owner
 * sconosciuto. Altrove, davanti a un nome che non conosce, la barra non serve: resta testo comunque (scelte
 * dell'utente del 2026-11-22).
 */
function idoneo(d: { at: Voce[]; hash: Voce[] }, segno: string, testo: string, da: number, inTesta: boolean): boolean {
  return piuLungo(segno === '@' ? d.at : d.hash, testo, da) !== null
    || (segno === '@' && inTesta && ownerScritto(testo, da) !== null);
}

/** Quello che la lettura salta (NomiNellaModale.SALTA): i codici di Discord, i link, il codice fra backtick, i token. */
const SALTA = /<[^<>\s]+>|https?:\/\/\S+|\]\([^)\n]*\)|`[^`\n]*`|\{\{[^{}\n]*\}\}/y;

/**
 * Il testo coi nomi: `<@id>` è `@Nome`, `<@&id>` `@Ruolo`, `<#id>` `#canale`, la data di un promemoria quella del fuso
 * della rubrica. Un segno scritto come testo, dove segue un nome del dizionario, prende la barra: il salvataggio lo
 * lascia testo. Nel contenuto di un task solo, `@nome:` in testa non è un owner, e non la prende.
 */
export function coiNomi(conId: string, rubrica: Rubrica, campo: Campo = 'lista'): string {
  const d = dizionario(delTesto(conId, rubrica));
  const inTesta = teste(conId, campo);
  const nome = (voci: readonly Voce[], codice: string, segno: string) => {
    const v = voci.find((x) => x.codice === codice);
    return v ? segno + v.nome : null;
  };
  return conId.replace(CODICI, (m: string, amp: string, utente: string, canale: string, at: string, dove: number) => {
    if (utente) return nome(d.at, amp ? `<@&${utente}>` : `<@${utente}>`, '@') ?? m;
    if (canale) return nome(d.hash, `<#${canale}>`, '#') ?? m;
    if (at) return dataNelTesto(Number(at), rubrica.zona);
    if (dove > 0 && DEL_NOME.test(conId[dove - 1])) return m;
    // La testa si misura da dove cominciano le barre già scritte, come nel bot.
    let barre = dove;
    while (barre > 0 && conId[barre - 1] === '\\') barre--;
    return idoneo(d, m, conId, dove + 1, inTesta.has(barre)) ? `\\${m}` : m;
  });
}

/**
 * Il testo scritto in una modale coi codici al posto dei nomi, come NomiNellaModale.dallaModale. Il dizionario è quello
 * dell'apertura: le persone che il testo aperto citava, tutti i ruoli e i canali (scelta dell'utente del 2026-11-21:
 * le persone nuove si aggiungono con Owner o Tag, o col loro codice). Una `@` seguita da una parola che il dizionario
 * non conosce resta testo, come `@everyone`, `@here`, la `@` da sola e quella dentro una parola, un `#nome`
 * sconosciuto e quello che la lettura salta (scelta dell'utente del 2026-11-22: «Semplicemente risolviamo quelli che
 * conosciamo, gli altri li lasciamo letterali»). In testa a una riga, però, `@nome:` è un owner, e se il nome non è
 * proprio un nome del dizionario il salvataggio si rifiuta (scelta dell'utente del 2026-11-22: «gli owner li gestiamo
 * noi tramite funzione»): un nome che non c'è come uno più lungo di quello che combacia, `@Leo Rossi:`. Non nel
 * contenuto di un task solo, che non ha l'owner: lì `@nome:` in testa è testo come altrove. Le barre davanti
 * a un segno seguito da un nome del dizionario, o in testa da un owner, perdono una barra e il segno resta testo:
 * `\@Leo` si salva `@Leo`, che Discord non menziona, e la modale lo riapre con la barra. Le date no: le modali della
 * demo che si scrivono, quelle del contenuto, non hanno promemoria.
 *
 * @param aperto il testo con gli id con cui la modale si è aperta
 * @param campo che cosa ha il campo: le modali della demo che si scrivono sono quelle del contenuto
 * @return il testo coi codici, e il primo owner sconosciuto, con la `@`, o null
 */
export function coiCodici(scritto: string, rubrica: Rubrica, aperto: string, campo: Campo = 'lista'):
    { testo: string; owner: string | null } {
  const d = dizionario(delTesto(aperto, rubrica));
  const inTesta = teste(scritto, campo);
  let owner: string | null = null;
  let fuori = '';
  let i = 0;
  while (i < scritto.length) {
    const c = scritto[i];
    SALTA.lastIndex = i;
    const saltato = SALTA.exec(scritto);
    if (saltato) {
      fuori += saltato[0];
      i += saltato[0].length;
      continue;
    }
    if (c === '\\') {
      let segno = i;
      while (scritto[segno] === '\\') segno++;
      const s = scritto[segno];
      if (s === '@' || s === '#') {
        const togli = idoneo(d, s, scritto, segno + 1, inTesta.has(i)) ? 1 : 0;
        fuori += scritto.slice(i, segno - togli) + s;
        i = segno + 1;
        continue;
      }
    }
    if ((c === '@' || c === '#') && (i === 0 || !DEL_NOME.test(scritto[i - 1]))) {
      const v = piuLungo(c === '@' ? d.at : d.hash, scritto, i + 1);
      const nomeDellOwner = c === '@' && inTesta.has(i) ? ownerScritto(scritto, i + 1) : null;
      if (nomeDellOwner !== null && (!v || v.nome.length < nomeDellOwner.length)) {
        owner ??= `@${nomeDellOwner}`;
        fuori += c + nomeDellOwner;
        i += 1 + nomeDellOwner.length;
        continue;
      }
      if (v) {
        fuori += v.codice;
        i += 1 + v.nome.length;
        continue;
      }
    }
    fuori += c;
    i++;
  }
  return { testo: fuori, owner };
}

const OROLOGI = new Map<string, Intl.DateTimeFormat>();

/** Data e ora di un istante nel fuso, coi secondi: `2026-12-08 18:00:30`. */
function orologio(at: number, zona: string): string {
  let f = OROLOGI.get(zona);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: zona, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
      second: '2-digit', hourCycle: 'h23',
    });
    OROLOGI.set(zona, f);
  }
  const p: Record<string, string> = {};
  for (const x of f.formatToParts(new Date(at * 1000))) p[x.type] = x.value;
  return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

/**
 * La data di un promemoria come la scrive la modale (DateNellaModale): `AAAA-MM-GG HH:MM` nel fuso; i secondi solo se
 * non sono zero; lo scarto nell'ora che si ripete al ritorno dell'ora solare, perché i due istanti non si scrivano
 * uguali.
 */
export function dataNelTesto(at: number, zona: string): string {
  const ora = orologio(at, zona);
  let data = ora.endsWith(':00') ? ora.slice(0, -3) : ora;
  if ([3600, -3600, 1800, -1800].some((delta) => orologio(at + delta, zona) === ora)) {
    const [g, h] = ora.split(' ');
    const [anno, mese, giorno] = g.split('-').map(Number);
    const [hh, mm, ss] = h.split(':').map(Number);
    const minuti = Math.round((Date.UTC(anno, mese - 1, giorno, hh, mm, ss) / 1000 - at) / 60);
    const a = Math.abs(minuti);
    data += ` ${minuti < 0 ? '-' : '+'}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
  }
  return data;
}

/**
 * Il fuso dell'esempio scritto con un fuso (LegendaDeiNomi.altroFuso): uno che non è quello di chi scrive, perché
 * l'esempio mostri una data in un altro fuso.
 */
export function altroFuso(zona: string): string {
  return zona === 'America/New_York' ? 'Europe/London' : 'America/New_York';
}

/**
 * La riga del fuso e delle persone nuove, come LegendaDeiNomi: il fuso con la sua origine, domani alle 18:00 in quel
 * fuso e la stessa data in un altro; poi come si aggiunge qualcuno di nuovo. Nella demo il fuso è quello che chi guarda
 * ha scritto, o quello del server.
 */
export function regoleDelFuso(zona: string, personale: boolean, adesso: number): string {
  const esempio = esempioDiData(adesso, zona);
  const chiave = personale ? 'tasklist.modal.names.legend.zone.personal' : 'tasklist.modal.names.legend.zone.server';
  return `${testo(chiave, zona, esempio, `${esempio} ${altroFuso(zona)}`)} ${testo('tasklist.modal.names.legend.people.new')}`;
}

/** L'esempio di data della legenda (ContenutoDellaModale.esempioDiData): domani alle 18:00, nel fuso. */
export function esempioDiData(adesso: number, zona: string): string {
  const oggi = orologio(adesso, zona).slice(0, 10);
  const domani = new Date(Date.parse(`${oggi}T00:00:00Z`) + 86_400_000).toISOString().slice(0, 10);
  return `${domani} 18:00`;
}

/**
 * La legenda della modale di Bulk update (LegendaDeiNomi): in subtext, il fuso delle date, le persone nuove e una `@`
 * che non menziona nessuno. Niente elenco dei nomi: quelli che si possono usare si leggono già nel testo.
 */
export function legendaDeiNomi(rubrica: Rubrica, adesso: number): string {
  return `-# ${regoleDelFuso(rubrica.zona, rubrica.personale, adesso)}`;
}
