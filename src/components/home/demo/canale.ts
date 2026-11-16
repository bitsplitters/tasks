/*
 * Il tab del canale della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §6, nel repo
 * team-tasks-manager): ciò che succede a ogni clic. Il selettore a riposo spunta il task scelto con la cascata dei
 * gruppi; l'Activity, il primo pulsante, porta la lista nell'altro tab. La seconda riga passa da grigio a blu a rosso
 * e il task scelto col pulsante acceso fa ciò che fa il bot (compito 9): Owner e Tag blu aprono il menu di menzioni
 * sotto i pulsanti, Webhook blu il menu dei webhook; Contenuto e Promemoria blu aprono la loro modale, che blocca la
 * lista finché non si manda; le domande del bot hanno la loro modale. Le risposte del bot vanno nel fumetto; dopo ogni
 * azione i pulsanti tornano grigi. Gli altri pulsanti della prima riga mostrano il loro tooltip fino al compito 10.
 */
import type { Tasto } from '../scene-data.ts';
import { accendiNelCanale, apriSelettore, chatInBasso } from '../scene-dom.ts';
import {
  campiDalPromemoria, divisa, modaleDelPromemoria, modaleDelTesto, modaleDellaDomanda, opzioniDeiWebhook, vociDelMenu,
} from './componenti.ts';
import { dentro, dopoIlClic, type Acceso, type Condiviso } from './condiviso.ts';
import { markdown } from './markdown.ts';
import type { Stato } from './modello.ts';
import {
  applicaOwner, applicaPromemoria, applicaTag, applicaWebhook, campiDelPromemoria, eliminaTask, eliminaTaskConfermato,
  invertiSpunta, nellActivity, pulisciConfermato, rifiutoDelCarrello, salvaTesto, togliOwner, togliOwnerConfermato,
  togliPromemoria, togliTag, togliWebhook, validaPromemoria,
} from './regole.ts';
import type { Domanda, Esito } from './regole.ts';
import { contestoDelCanale } from './righe.ts';
import { avviso, rispostaDellEsito, testo, testoDegliErrori, testoDelPromemoria, testoDi } from './testi.ts';
import { montaMenzioni, type Menzioni } from './ui/menzioni.ts';
import { apriModale, type Modale } from './ui/modale.ts';
import { montaScelta, type Scelta } from './ui/scelta.ts';

/** Il tab del canale montato: chiudi lo riporta com'è all'arrivo, senza modale, coi menu chiusi e i pulsanti grigi. */
export interface Canale {
  chiudi(): void;
}

/** Le domande che il bot fa in una modale: quella di Riapri tutti è un messaggio coi pulsanti (compito 10). */
type DomandaInModale = Exclude<Domanda, { tipo: 'riapri' }>;

/** Lo stato dopo il Submit di una domanda. */
function confermata(domanda: DomandaInModale, stato: Stato): Stato {
  switch (domanda.tipo) {
    case 'togliOwner':
      return togliOwnerConfermato(stato, domanda.pos);
    case 'eliminaGruppo':
      return eliminaTaskConfermato(stato, domanda.pos);
    case 'pulisci':
      return pulisciConfermato(stato);
  }
}

export function montaCanale(scena: HTMLElement, condiviso: Condiviso): Canale {
  const el = (chiave: string) => scena.querySelector<HTMLElement>(`[data-k="${chiave}"]`);
  const chan = el('chan')!;
  const sel = el('sel')!;
  const sub = el('sub')!;
  const wb = el('wb')!;
  const feed = el('feed')!;
  const stato = () => condiviso.stato();
  let acceso: Acceso | null = null;
  /** Il menu di menzioni di Owner o Tag blu, con l'ultima scelta che il bot ha preso: quella che riceve il task. */
  let menzioni: Menzioni | null = null;
  let carrello: string[] = [];
  /** Il menu di Webhook blu, col webhook scelto. */
  let menuWb: Scelta | null = null;
  let webhook: string | null = null;
  /** La modale aperta, da chiudere senza avvisi quando si cambia tab. */
  let chiudiModale: (() => void) | null = null;

  /** La risposta del bot nel fumetto, accanto al selettore dei task o all'elemento dato. */
  function rispondi(md: string | null, accanto: Element = sel): void {
    if (md) condiviso.fumetto(markdown(md, contestoDelCanale(stato())), accanto);
  }

  /** I menu sotto i pulsanti tolti, con le loro scelte. */
  function smontaIMenu(): void {
    menzioni?.smonta();
    menuWb?.smonta();
    menzioni = null;
    menuWb = null;
    carrello = [];
    webhook = null;
    for (const posto of [sub, wb]) {
      posto.replaceChildren();
      posto.hidden = true;
    }
  }

  /** I pulsanti grigi, nessun menu, il selettore col suo segnaposto: la lista dopo ogni azione (piano, §6). */
  function spegni(): void {
    acceso = null;
    smontaIMenu();
    accendiNelCanale(chan, null, null);
  }

  /**
   * Il menu di menzioni di Owner o Tag: Discord manda la scelta al bot quando il menu si chiude. Per l'owner il bot
   * rifiuta persone e ruoli insieme, o più ruoli (TaskListSlctOwner): lo dice, poi il campo torna com'era.
   */
  function montaIlMenu(tasto: 'owner' | 'tag'): void {
    menzioni = montaMenzioni(sub, vociDelMenu(stato()), [], testo(`tasklist.slct.${tasto}`), {
      chiusura: (scelte) => {
        const { persone, ruoli } = divisa(scelte, stato());
        const no = tasto === 'owner' ? rifiutoDelCarrello(persone, ruoli) : null;
        if (!no) {
          carrello = scelte;
          return;
        }
        menzioni?.ripristina(carrello);
        rispondi(avviso(testoDi(no)), sub);
      },
    });
  }

  /** Il pulsante della seconda riga premuto: il colore dopo e, in blu, il suo menu sotto i pulsanti. */
  function premi(tasto: Tasto): void {
    const dopo = dopoIlClic(acceso, tasto);
    smontaIMenu();
    acceso = dopo;
    accendiNelCanale(chan, dopo?.tasto ?? null, dopo?.colore ?? null);
    if (dopo?.colore !== 'blue') return;
    if (dopo.tasto === 'owner' || dopo.tasto === 'tag') {
      montaIlMenu(dopo.tasto);
    } else if (dopo.tasto === 'webhook') {
      menuWb = montaScelta(wb, opzioniDeiWebhook(), testo('tasklist.slct.webhook'), {
        scelta: (valore) => {
          webhook = valore;
        },
      });
    }
  }

  /** Una modale del bot sopra il canale, aperta dal selettore dei task: Submit manda i valori, chiuderla niente. */
  function apri(modale: Modale, invio: (valori: Record<string, string>) => void): void {
    chiudiModale = apriModale(chan, modale, sel, {
      invio: (valori) => {
        chiudiModale = null;
        invio(valori);
      },
      chiusura: () => {
        chiudiModale = null;
      },
    });
  }

  /**
   * La domanda del bot nella sua modale. Submit fa l'azione; chiuderla non manda niente al bot, che quindi non
   * ridisegna la lista: il pulsante resta acceso.
   */
  function chiedi(domanda: DomandaInModale): void {
    apri(modaleDellaDomanda(domanda, stato()), () => {
      condiviso.cambia(confermata(domanda, stato()));
      spegni();
    });
  }

  /** L'esito di una regola: lo stato nuovo, i pulsanti grigi, la risposta del bot; una domanda apre la sua modale. */
  function esegui(esito: Esito, riuscita: string | null = null): void {
    if (esito.tipo === 'domanda') {
      if (esito.domanda.tipo !== 'riapri') chiedi(esito.domanda);
      return;
    }
    if (esito.tipo === 'fatto') condiviso.cambia(esito.stato);
    spegni();
    rispondi(rispostaDellEsito(esito, riuscita));
  }

  /**
   * Contenuto blu sul task: la modale col testo; la lista si blocca (TaskLogic.updateTask). Submit la sblocca, anche
   * quando il bot rifiuta il testo (TaskListMdlTask). Cancel e la ✕ non mandano niente: la lista resta bloccata, col
   * pulsante acceso e spento come gli altri, finché More → Unlock list non la sblocca.
   */
  function modificaIlTesto(pos: string): void {
    const modale = modaleDelTesto(stato(), pos);
    condiviso.cambia({ ...stato(), bloccata: true });
    apri(modale, (valori) => {
      condiviso.cambia({ ...stato(), bloccata: false });
      esegui(salvaTesto(stato(), pos, valori.task ?? ''));
    });
  }

  /**
   * Promemoria blu sul task: la modale coi campi proposti; la lista si blocca (AlertLogic.openWhenModal). Submit la
   * sblocca: con un errore il bot lo dice e rimette i pulsanti com'erano (TaskListMdlWhen), altrimenti salva subito,
   * perché i promemoria ricorrenti sono spenti (ReminderSaver). Cancel e la ✕ la lasciano bloccata, come il contenuto.
   */
  function scriviIlPromemoria(pos: string): void {
    const campi = campiDelPromemoria(stato(), pos);
    if ('tipo' in campi) {
      esegui(campi);
      return;
    }
    condiviso.cambia({ ...stato(), bloccata: true });
    apri(modaleDelPromemoria(pos, campi), (valori) => {
      condiviso.cambia({ ...stato(), bloccata: false });
      const scritti = campiDalPromemoria(valori);
      const valido = validaPromemoria(scritti);
      if ('errori' in valido) {
        spegni();
        rispondi(testoDegliErrori(valido.errori));
        return;
      }
      esegui(applicaPromemoria(stato(), pos, valido.at, scritti.zona), testoDelPromemoria(valido.at));
    });
  }

  /** Il task scelto col pulsante acceso: ciò che fa il bot con quel pulsante e quel colore. */
  function sulTask(pos: string, a: Acceso): void {
    const s = stato();
    const rosso = a.colore === 'red';
    const { persone, ruoli } = divisa(carrello, s);
    switch (a.tasto) {
      case 'owner':
        esegui(rosso ? togliOwner(s, pos) : applicaOwner(s, pos, persone, ruoli));
        break;
      case 'tag':
        esegui(rosso ? togliTag(s, pos) : applicaTag(s, pos, persone, ruoli));
        break;
      case 'content':
        if (rosso) esegui(eliminaTask(s, pos));
        else modificaIlTesto(pos);
        break;
      case 'reminder':
        if (rosso) esegui(togliPromemoria(s, pos));
        else scriviIlPromemoria(pos);
        break;
      case 'webhook':
        esegui(rosso ? togliWebhook(s, pos) : applicaWebhook(s, pos, webhook));
        break;
    }
  }

  function chiudi(): void {
    apriSelettore(chan, false);
    chiudiModale?.();
    chiudiModale = null;
    spegni();
  }

  scena.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    const k = b.dataset.k ?? '';
    if (b.getAttribute('aria-disabled') === 'true') {
      // Spento dal bot: niente azione, come in Discord; il tooltip dice comunque cosa fa.
      if (b.dataset.tt) condiviso.tooltip(b);
    } else if (k === 'sel') {
      apriSelettore(chan, !chan.hasAttribute('data-menu'));
    } else if (b.matches('.sc-opt')) {
      apriSelettore(chan, false);
      sel.focus();
      const pos = b.dataset.pos ?? '';
      if (acceso) sulTask(pos, acceso);
      else condiviso.cambia(invertiSpunta(stato(), pos));
    } else if (b.dataset.tasto) {
      premi(b.dataset.tasto as Tasto);
    } else if (k === 'b-activity') {
      chiudi();
      condiviso.cambia(nellActivity(stato()));
      condiviso.vaiA('activity');
    } else if (k === 'b-join') {
      condiviso.vaiA('activity');
    } else if (b.dataset.tt) {
      condiviso.tooltip(b);
    }
  });

  // Un clic fuori o Esc chiudono il selettore, come in Discord; i menu sotto i pulsanti e la modale fanno da sé.
  document.addEventListener('click', (e) => {
    if (chan.hasAttribute('data-menu') && !dentro(e, '.sc-selwrap')) apriSelettore(chan, false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !chan.hasAttribute('data-menu')) return;
    apriSelettore(chan, false);
    if (scena.contains(document.activeElement)) sel.focus();
  });

  // La chat in fondo, come Discord: quando la scena cambia misura o torna visibile col suo tab; quando il messaggio
  // cresce (il menu sotto i pulsanti, un'etichetta in più) mentre in fondo c'era già.
  let inFondo = true;
  feed.addEventListener('scroll', () => {
    inFondo = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 2;
  }, { passive: true });
  new ResizeObserver(() => chatInBasso(scena)).observe(scena);
  const cresce = new ResizeObserver(() => {
    if (inFondo) chatInBasso(scena);
  });
  for (const figlio of feed.children) cresce.observe(figlio);

  return { chiudi };
}
