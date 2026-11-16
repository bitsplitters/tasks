/*
 * Le cinque azioni del pannello del task nell'Activity della demo (piano 2026-11-15-demo-fedele, compito 11, nel repo
 * team-tasks-manager), come ContentAction, PeopleAction, ReminderAction e WebhookAction della pagina: ciò che l'area
 * mostra per ogni pulsante in blu (Save) o in rosso (Delete), quando il pulsante in fondo si accende, cosa cambia
 * premendolo. L'area è quella di parts.tsx (Area): gli avvisi che accompagnano un modulo stanno sopra, il contenuto
 * sotto, alto sempre uguale; un avviso al posto di un modulo, o la domanda sopra Delete, è il contenuto. Le funzioni
 * pure danno i testi e le scelte; montaAzione tiene l'azione viva nell'area.
 */
import type { Tasto } from '../scene-data.ts';
import type { Acceso } from './condiviso.ts';
import { escape, markdown } from './markdown.ts';
import type { Contesto } from './markdown.ts';
import { ADESSO, PROPOSTO, WEBHOOK, fusoDi, posizione } from './modello.ts';
import type { Stato, Task } from './modello.ts';
import {
  applicaOwnerActivity, applicaPromemoria, applicaTagActivity, applicaWebhook, eliminaTask, eliminaTaskConfermato,
  prosaDelTask, salvaTestoActivity, sceltaDellOwner, tagDelTesto, togliOwner, togliOwnerConfermato, togliPromemoria,
  togliTag, togliWebhook,
} from './regole.ts';
import type { Esito } from './regole.ts';
import { dispositivoDi, istanteDi, quandoDa, troppoVicina } from './quando.ts';
import type { Quando } from './quando.ts';
import { contestoDellActivity } from './righe.ts';
import { avviso, testo, testoDellaDomanda, testoDi } from './testi.ts';
import { chiave, nuovoNumero } from './ui/comune.ts';
import { montaPersone, stesseScelte } from './ui/persone.ts';
import { montaQuando } from './ui/quando.ts';
import { stessaZona } from './zone.ts';

/** Quanto la lista delle webhook del server ci mette ad arrivare (WebhookAction, list === null). */
const CARICAMENTO_MS = 300;

function taskDi(stato: Stato, pos: string): Task {
  const t = stato.lista.tasks.find((x) => posizione(x.pos) === pos);
  if (!t) throw new Error(`La demo non ha il task «${pos}»`);
  return t;
}

/** La domanda del canale senza l'ultimo paragrafo, quello della finestra da mandare o chiudere (firstParagraph). */
export function primoParagrafo(t: string): string {
  const taglio = t.indexOf('\n\n');
  return taglio < 0 ? t : t.slice(0, taglio);
}

/* In rosso: Delete. */

/** Ciò che Delete toglie, come il pulsante rosso del canale. */
function togli(stato: Stato, pos: string, tasto: Tasto): Esito {
  switch (tasto) {
    case 'content': return eliminaTask(stato, pos);
    case 'owner': return togliOwner(stato, pos);
    case 'tag': return togliTag(stato, pos);
    case 'reminder': return togliPromemoria(stato, pos);
    case 'webhook': return togliWebhook(stato, pos);
  }
}

/** L'area in rosso: l'avviso di ciò che non si può togliere, con Delete spento, o la domanda sopra Delete. */
export interface InRosso {
  avviso?: string;
  domanda?: string;
  pronto: boolean;
}

export function inRosso(stato: Stato, pos: string, tasto: Tasto): InRosso {
  const esito = togli(stato, pos, tasto);
  if (esito.tipo === 'rifiuto') {
    // L'ultimo task dice di usare il canale; un task di soli tag dice perché i tag restano (activity.*).
    if (tasto === 'content') return { avviso: avviso(testo('activity.content.last')), pronto: false };
    if (esito.testo.chiave === 'tasklist.slct.tag.delete.blank.error')
      return { avviso: avviso(testo('activity.tag.delete.blank')), pronto: false };
    return { avviso: avviso(testoDi(esito.testo)), pronto: false };
  }
  if (esito.tipo === 'domanda') return { domanda: primoParagrafo(testoDellaDomanda(esito.domanda, '')), pronto: true };
  return { pronto: true };
}

/** Delete premuto: la domanda è già nel pannello, quindi un gruppo o un owner col promemoria se ne vanno subito. */
export function eliminazione(stato: Stato, pos: string, tasto: Tasto): Esito {
  const esito = togli(stato, pos, tasto);
  if (esito.tipo !== 'domanda') return esito;
  return {
    tipo: 'fatto',
    stato: tasto === 'content' ? eliminaTaskConfermato(stato, pos) : togliOwnerConfermato(stato, pos),
  };
}

/* In blu: Save. */

/** Il testo scritto è un altro, a meno degli spazi (ContentAction, normalize). */
export function testoCambiato(task: Task, scritto: string): boolean {
  return scritto.replace(/\s+/g, ' ').trim() !== prosaDelTask(task);
}

/** Il promemoria del task nel suo fuso; senza, adesso più dieci minuti nel fuso di chi guarda (newWhen). */
export function quandoDi(stato: Stato, pos: string): Quando {
  const r = taskDi(stato, pos).promemoria;
  return quandoDa(r?.at ?? PROPOSTO, r?.zona ?? fusoDi(stato));
}

export interface ModuloDelPromemoria {
  at: number | null;
  /** Sopra i campi: la data che non va, poi l'owner che si prende chi salva. */
  avvisi: string[];
  pronto: boolean;
  /** Sotto i campi, in un fuso che non è quello del dispositivo: l'ora che il dispositivo mostrerà. */
  dispositivo: string | null;
}

/**
 * Il modulo del promemoria (ReminderAction): uno nuovo parte con Save acceso, uno che c'è da spento finché qualcosa non
 * cambia. Una data passata spegne Save, come una data nuova a meno di 5 minuti da adesso.
 */
export function moduloDelPromemoria(stato: Stato, pos: string, q: Quando): ModuloDelPromemoria {
  const task = taskDi(stato, pos);
  const r = task.promemoria;
  const at = istanteDi(q);
  let problema: string | null = null;
  if (at !== null && at <= ADESSO) problema = avviso(testo('activity.reminder.past'));
  else if (at !== null && at !== r?.at && at < ADESSO + 300) problema = troppoVicina();
  const avvisi = [problema, task.owner ? null : avviso(testo('activity.reminder.owner.you'))]
    .filter((a): a is string => a !== null);
  const cambiato = !r || at !== r.at || !stessaZona(q.zona, r.zona);
  return {
    at,
    avvisi,
    pronto: cambiato && at !== null && problema === null,
    dispositivo: dispositivoDi(q),
  };
}

/** Save del promemoria: il fuso scelto a mano, se non è già quello di chi guarda, diventa il suo (learn). */
export function salvaPromemoria(stato: Stato, pos: string, q: Quando): Esito {
  const at = istanteDi(q);
  if (at === null) throw new Error('La demo salva un promemoria senza data');
  return applicaPromemoria(stato, pos, at, q.zona, q.toccata && !stessaZona(q.zona, fusoDi(stato)));
}

/** Le webhook che il pannello offre: quella che il task ha e il server non più, in cima; poi quelle del server. */
export interface SceltaDelWebhook {
  nome: string;
  meta: string;
  manca: boolean;
}

export function scelteDelWebhook(task: Task): SceltaDelWebhook[] {
  const manca = task.webhook !== undefined && !WEBHOOK.some((w) => w.nome === task.webhook) ? task.webhook : null;
  return [
    ...(manca === null ? [] : [{ nome: manca, meta: testo('activity.webhook.missing'), manca: true }]),
    ...WEBHOOK.map((w) => ({ nome: w.nome, meta: testo(`activity.webhook.trigger.${w.scatta}`), manca: false })),
  ];
}

/* L'azione nell'area. */

/** L'azione montata: se Save o Delete si possono premere, cosa fanno sullo stato di quel momento. */
export interface Azione {
  pronto(): boolean;
  esito(stato: Stato): Esito;
  /** Dopo la riuscita il pannello si chiude: il task non c'è più (onDone(true)). */
  chiude: boolean;
  smonta(): void;
}

const avvisoHtml = (t: string, c: Contesto) => `<div class="sc-pnotice">${markdown(t, c)}</div>`;

/**
 * L'azione del pulsante acceso nell'area `area` del pannello. `cambio` dice che il pulsante in fondo può essere
 * cambiato: chi la monta rilegge pronto().
 */
export function montaAzione(area: HTMLElement, stato: Stato, pos: string, acceso: Acceso, cambio: () => void): Azione {
  const task = taskDi(stato, pos);
  const contesto = contestoDellActivity(stato);
  area.innerHTML = '<div class="sc-pparte" data-k="p-notices"></div><div class="sc-pcontent"></div>';
  const sopra = area.querySelector<HTMLElement>('[data-k="p-notices"]')!;
  const contenuto = area.querySelector<HTMLElement>('.sc-pcontent')!;
  const avvisi = (testi: readonly string[]) => {
    sopra.innerHTML = testi.map((t) => avvisoHtml(t, contesto)).join('');
  };
  const ferma = (esito: (s: Stato) => Esito): Azione => ({ pronto: () => false, esito, chiude: false, smonta() {} });

  if (acceso.colore === 'red') {
    const r = inRosso(stato, pos, acceso.tasto);
    if (r.avviso) contenuto.innerHTML = avvisoHtml(r.avviso, contesto);
    else if (r.domanda) contenuto.innerHTML = `<div class="sc-pquestion">${markdown(r.domanda, contesto)}</div>`;
    return {
      pronto: () => r.pronto,
      esito: (s) => eliminazione(s, pos, acceso.tasto),
      chiude: acceso.tasto === 'content',
      smonta() {},
    };
  }

  switch (acceso.tasto) {
    case 'content': {
      const id = `p-text-${nuovoNumero()}`;
      contenuto.innerHTML = `<label class="sc-plabel" for="${id}">${escape(testo('activity.content.label'))}</label>` +
        `<textarea class="sc-pin sc-ptextarea" id="${id}" data-k="p-text" rows="5"></textarea>`;
      const campo = contenuto.querySelector<HTMLTextAreaElement>('textarea')!;
      campo.value = prosaDelTask(task);
      let scritto = false;
      const alTesto = () => {
        scritto = true;
        cambio();
      };
      campo.addEventListener('input', alTesto);
      return {
        pronto: () => scritto && testoCambiato(task, campo.value),
        esito: (s) => salvaTestoActivity(s, pos, campo.value),
        chiude: false,
        smonta: () => campo.removeEventListener('input', alTesto),
      };
    }
    case 'owner':
    case 'tag': {
      const modo = acceso.tasto;
      const iniziali = modo === 'owner' ? sceltaDellOwner(stato, task) : tagDelTesto(task.testo);
      const selettore = montaPersone(contenuto, stato, modo, iniziali, cambio);
      return {
        pronto: () => {
          const scelte = selettore.scelte();
          return scelte.length > 0 && !stesseScelte(scelte, iniziali);
        },
        esito: (s) => (modo === 'owner' ? applicaOwnerActivity : applicaTagActivity)(s, pos, selettore.scelte()),
        chiude: false,
        smonta: () => selettore.smonta(),
      };
    }
    case 'reminder':
      if (task.fatto) {
        contenuto.innerHTML = avvisoHtml(avviso(testo('tasklist.slct.alert.checkedtask.error')), contesto);
        return ferma((s) => salvaPromemoria(s, pos, quandoDi(s, pos)));
      }
      return promemoria(contenuto, avvisi, stato, pos, cambio);
    case 'webhook':
      return webhook(contenuto, contesto, task, pos, cambio);
  }
}

/** Data, ora e fuso (WhenFields); il fuso apre la sua vista al posto dei campi, senza gli avvisi (ZoneView). */
function promemoria(contenuto: HTMLElement, avvisi: (t: readonly string[]) => void, stato: Stato, pos: string,
  cambio: () => void): Azione {
  let q = quandoDi(stato, pos);
  let m = moduloDelPromemoria(stato, pos, q);
  avvisi(m.avvisi);
  const campi = montaQuando(contenuto, q, 'p', stato.fuso, {
    cambio: (nuovo) => {
      q = nuovo;
      m = moduloDelPromemoria(stato, pos, q);
      avvisi(m.avvisi);
      cambio();
    },
    fusi: () => avvisi([]),
  });
  return {
    pronto: () => m.pronto,
    esito: (s) => salvaPromemoria(s, pos, q),
    chiude: false,
    smonta: () => campi.smonta(),
  };
}

/** Le webhook del server dopo il loro caricamento: una scelta, quella del task già scelta (WebhookAction). */
function webhook(contenuto: HTMLElement, contesto: Contesto, task: Task, pos: string, cambio: () => void): Azione {
  contenuto.innerHTML = '<div class="sc-ploading" aria-busy="true"><i></i><i></i><i></i></div>';
  let arrivate = false;
  let scelta: string | null = task.webhook ?? null;
  const timer = window.setTimeout(() => {
    arrivate = true;
    const scelte = scelteDelWebhook(task);
    if (scelte.length === 0) {
      contenuto.innerHTML = avvisoHtml(avviso(testo('activity.webhook.none')), contesto);
      return;
    }
    const nome = `p-wb-${nuovoNumero()}`;
    const etichetta = escape(testo('tasklist.slct.activities.hint.webhook.edit'));
    contenuto.innerHTML = `<div class="sc-choices" role="radiogroup" aria-label="${etichetta}">` +
      scelte.map((s) => `<label class="sc-choice"${s.manca ? ' data-missing' : ''}>` +
        `<input type="radio" name="${nome}" value="${escape(s.nome)}" data-k="p-wb-${chiave(s.nome)}"` +
        `${s.nome === scelta ? ' checked' : ''}><span class="sc-choice-name">${escape(s.nome)}</span>` +
        `<span class="sc-choice-meta">${escape(s.meta)}</span></label>`).join('') + '</div>';
    cambio();
  }, CARICAMENTO_MS);
  const alCambio = (e: Event) => {
    const t = e.target as HTMLInputElement;
    if (t.type !== 'radio') return;
    scelta = t.value;
    cambio();
  };
  contenuto.addEventListener('change', alCambio);
  return {
    pronto: () => arrivate && scelta !== null && scelta !== (task.webhook ?? null),
    esito: (s) => applicaWebhook(s, pos, scelta),
    chiude: false,
    smonta() {
      window.clearTimeout(timer);
      contenuto.removeEventListener('change', alCambio);
    },
  };
}
