/*
 * I testi del bot nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 3; tutti e due nel repo team-tasks-manager): i valori
 * del bundle del bot coi riferimenti ${…} già risolti, nella lingua della pagina (demo/lingua.ts); le funzioni che li
 * compongono come fa il bot. Le tabelle stanno in testi/: l'inglese in en.ts, le altre generate dal bundle della loro
 * lingua (spec 2026-11-19-sito-multilingua-design.md, §10). scripts/demo-testi.test.ts le confronta col bundle: se il
 * bot cambia un testo, dice quale voce allineare. I testi di Discord (Cancel, Submit, i messaggi dei campi) e quelli
 * della demo stanno in scene-data.ts.
 */
import { datiDi, type Lingua } from '../../../i18n/lingue.ts';
import { linguaDellaDemo } from './lingua.ts';
import type { Domanda, Esito, Testo } from './regole.ts';
import { TESTI as EN } from './testi/en.ts';
import { TESTI as IT } from './testi/it.ts';

/**
 * Le tabelle dei testi per lingua: l'inglese scritto in testi/en.ts, le altre generate dal bundle della lingua
 * (scripts/testi-demo.mjs). Una lingua pubblicata senza tabella è un errore che il test trova.
 */
export const TABELLE: Readonly<Partial<Record<Lingua, Readonly<Record<string, string>>>>> = { en: EN, it: IT };

/** La tabella della lingua della demo. */
function tabella(): Readonly<Record<string, string>> {
  const t = TABELLE[linguaDellaDemo()];
  if (!t) throw new Error(`La demo non ha i testi in ${linguaDellaDemo()}`);
  return t;
}

type Argomento = string | number;

/** Un'emoji del bot come la scrive Discord in un testo, un'emoji custom: `<:nome:0>`. La disegna markdown.ts. */
export function emoji(nome: string): string {
  return `<:${nome}:0>`;
}

/**
 * Il testo di una chiave con gli argomenti al loro posto, come ResourceBundleUtil.format (ICU MessageFormat) e
 * replaceValues del framework. `{0}`, `{1}`… diventano gli argomenti; uno che manca resta scritto com'è.
 * `{n, plural, …}` sceglie la forma dal numero (`=k`, poi `one` per 1, poi `other`) col `#` che lo scrive; le forme
 * possono contenere altri segnaposto. Un argomento non si rilegge: un «{1}» o un «#» nel titolo restano tali. Gli
 * apostrofi sono letterali, perché nei testi della demo non ce n'è uno che ICU leggerebbe come virgolette: il test lo
 * controlla. Una chiave che la demo non ha lancia: è un errore della demo, non di chi guarda.
 */
export function testo(chiave: string, ...argomenti: Argomento[]): string {
  const t = tabella();
  if (!Object.hasOwn(t, chiave)) throw new Error(`La demo non ha il testo «${chiave}»`);
  return componi(t[chiave], 0, argomenti, NaN, false)[0];
}

/** Un numero come lo scrive ICU nella lingua della demo: 1,500 in inglese. */
const numero = (n: number) => {
  const lingua = linguaDellaDemo();
  return n.toLocaleString(lingua === 'en' ? 'en-US' : datiDi(lingua).intl);
};

/**
 * Il modello da `i` in avanti, fino alla fine o, se `annidato`, alla graffa che chiude la forma di un plurale: il
 * testo composto e dove si è fermato. `n` è il numero del plurale che contiene il pezzo, che il `#` scrive; fuori da
 * un plurale è NaN, così il `#` resta testo.
 */
function componi(m: string, i: number, argomenti: Argomento[], n: number, annidato: boolean): [string, number] {
  let fuori = '';
  while (i < m.length && !(annidato && m[i] === '}')) {
    if (m[i] === '#' && !Number.isNaN(n)) {
      fuori += numero(n);
      i++;
    } else if (m[i] === '{') {
      const [pezzo, dopo] = segnaposto(m, i, argomenti);
      fuori += pezzo;
      i = dopo;
    } else {
      fuori += m[i++];
    }
  }
  return [fuori, i];
}

/**
 * Il segnaposto che comincia in `i`, già composto, con la posizione dove finisce. Una graffa che non apre un
 * segnaposto è testo, come in replaceValues. Per un argomento che manca ICU scrive `{n}`, anche al posto di un plurale
 * intero.
 */
function segnaposto(m: string, i: number, argomenti: Argomento[]): [string, number] {
  const semplice = /^\{\s*(\d+)\s*\}/.exec(m.slice(i));
  if (semplice) {
    const a = argomenti[Number(semplice[1])];
    const pezzo = a === undefined ? `{${semplice[1]}}` : typeof a === 'number' ? numero(a) : a;
    return [pezzo, i + semplice[0].length];
  }
  const plurale = /^\{\s*(\d+)\s*,\s*plural\s*,/.exec(m.slice(i));
  if (!plurale) return ['{', i + 1];
  const a = argomenti[Number(plurale[1])];
  const quanti = a === undefined ? NaN : Number(a);
  const forme = new Map<string, string>();
  let j = i + plurale[0].length;
  for (let s = selettore(m, j); s; s = selettore(m, j)) {
    const [forma, fine] = componi(m, j + s[0].length, argomenti, quanti, true);
    forme.set(s[1], forma);
    j = fine + 1;
  }
  const chiusa = /^\s*\}/.exec(m.slice(j));
  if (!chiusa) throw new Error(`Un plurale che la demo non sa leggere: ${m}`);
  const fine = j + chiusa[0].length;
  if (a === undefined) return [`{${plurale[1]}}`, fine];
  const forma = forme.get(`=${quanti}`) ?? (quanti === 1 ? forme.get('one') : undefined) ?? forme.get('other');
  if (forma === undefined) throw new Error(`Un plurale senza la forma other: ${m}`);
  return [forma, fine];
}

/** Il selettore di una forma del plurale che comincia in `j` (`one {`, `=0 {`), con la graffa che la apre. */
function selettore(m: string, j: number): RegExpExecArray | null {
  return /^\s*(=\d+|[a-z]+)\s*\{/.exec(m.slice(j));
}

/**
 * Ciò che un testo può avere in testa al posto dell'emoji di un avviso: un'emoji custom, anche animata, o una fra ⚠️ ❗
 * ❌, con gli spazi attorno (TTMEmbed.EMOJI_INIZIALE, gli spazi di `\s` in Java); e il `{0}`, che nel bot è sempre
 * l'emoji tip, mentre qui un testo composto senza argomenti lo lascia scritto.
 */
const IN_TESTA = /^[ \t\n\v\f\r]*(?:<a?:\w+:\d+>|[⚠❗❌]️?|\{0\})[ \t\n\v\f\r]*/;

/** Un avviso del bot (TTMEmbed.avviso): l'emoji tip, uno spazio, il testo senza ciò che aveva in testa. */
export function avviso(messaggio: string): string {
  let corpo = messaggio.trimStart();
  for (let m = IN_TESTA.exec(corpo); m; m = IN_TESTA.exec(corpo)) corpo = corpo.slice(m[0].length);
  return `${emoji('tip')} ${corpo}`;
}

/** La faccia della mascotte nel fumetto della demo (spec 2026-11-21-mascotte-nel-sito-design.md, §2.2). */
export type Umore = 'sorpreso' | 'contento';

/** Sorpresa per un avviso del bot (avviso(): l'emoji tip in testa), contenta per le altre risposte. */
export function umoreDelFumetto(md: string): Umore {
  return md.startsWith(`${emoji('tip')} `) ? 'sorpreso' : 'contento';
}

/** Oltre questa lunghezza l'elenco dei token tolti si chiude con «…» (TokenTolti.ELENCO_MAX). */
const ELENCO_MAX = 1500;

/**
 * L'elenco dei token tolti dal testo di un task, per `tasklist.modal.task.filtered.warning`, come TokenTolti.testo:
 * ogni token fra apici inversi, così una menzione si legge com'è scritta (gli apici che aveva diventano apostrofi); le
 * voci unite da «, »; al posto di quella che porterebbe l'elenco oltre i 1500 caratteri, «…» chiude l'elenco.
 */
export function elencoDeiTolti(tolti: string[]): string {
  const voci: string[] = [];
  let lunghezza = 0;
  for (const tolto of tolti) {
    const voce = `\`${tolto.replaceAll('`', "'")}\``;
    if (lunghezza + voce.length > ELENCO_MAX) {
      voci.push('…');
      break;
    }
    voci.push(voce);
    lunghezza += voce.length + 2;
  }
  return voci.join(', ');
}

/**
 * Il testo di una domanda del bot, con l'emoji che il bot le passa: TaskListMdlOwnerRemoveConfirm (l'owner di un task
 * col promemoria), TaskListMdlTaskDeleteConfirm (un gruppo: i subtask vanno sotto quello sopra, o diventano
 * principali), TaskListMdlCleanConfirm (Pulisci: la domanda, poi l'avvertenza), ReopenUI.testo (Riapri tutti: la
 * domanda, poi la nota su New date se c'è un promemoria da spostare). Il ramo generico di Pulisci, per un titolo vuoto
 * o un embed che non si legge, non serve: nella demo il titolo c'è sempre.
 */
export function testoDellaDomanda(domanda: Domanda, titolo: string): string {
  switch (domanda.tipo) {
    case 'togliOwner':
      return testo('tasklist.modal.owner.remove.question', emoji('owner_blue'), domanda.pos);
    case 'eliminaGruppo':
      return domanda.sopra === null
        ? testo('tasklist.modal.task.delete.question.first', emoji('task_blue'), domanda.pos)
        : testo('tasklist.modal.task.delete.question.group', emoji('task_blue'), domanda.pos, String(domanda.sopra));
    case 'pulisci':
      return `${testo('tasklist.modal.clean.question', emoji('clean_blue'), domanda.completati, titolo.trim())}\n\n`
        + testo(`tasklist.modal.clean.warning.${domanda.avvertenza}`, domanda.completati);
    case 'riapri': {
      const d = testo('tasklist.reopen.bridge.question', emoji('reopen_blue'), domanda.spuntati, titolo.trim());
      return domanda.nuovaData ? `${d}\n\n${testo('tasklist.reopen.bridge.date')}` : d;
    }
  }
}

/** L'avviso di una modale del promemoria rifiutata (TaskListMdlWhen): gli errori uno per riga, nell'ordine dato. */
export function testoDegliErrori(chiavi: string[]): string {
  return avviso(testo('tasklist.modal.alert.errors', chiavi.map((k) => testo(k)).join('\n')));
}

/** Il testo di una regola (regole.ts), con i suoi argomenti. */
export function testoDi(t: Testo): string {
  return testo(t.chiave, ...(t.argomenti ?? []));
}

/**
 * Il testo di un promemoria salvato, come ReminderSaver: il calendario e la data per esteso. Senza badge: nella demo il
 * promemoria è sempre un evento singolo (ReminderDisplay.toBadge).
 */
export function testoDelPromemoria(at: number): string {
  return `📅 <t:${at}:F>`;
}

/**
 * Ciò che il bot risponde all'esito di un'azione, che la demo mostra nel fumetto. Il rifiuto e l'avviso sono avvisi
 * (TTMEmbed.avviso); il messaggio si scrive com'è, senza emoji, al posto della riuscita (ReminderSaver: «No changes» è
 * un embed semplice). La riuscita è quella data, per le azioni che ne scrivono una (il promemoria salvato). Null per le
 * altre, che ridisegnano la lista e basta; null anche per una domanda, che apre la sua modale.
 */
export function rispostaDellEsito(esito: Esito, riuscita: string | null = null): string | null {
  if (esito.tipo === 'rifiuto') return avviso(testoDi(esito.testo));
  if (esito.tipo === 'domanda') return null;
  if (esito.avviso) return avviso(testoDi(esito.avviso));
  return esito.messaggio ? testoDi(esito.messaggio) : riuscita;
}
