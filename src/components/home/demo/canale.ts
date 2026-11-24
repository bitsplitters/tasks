/*
 * Il tab del canale della demo (piano docs/superpowers/plans/2026-11-15-demo-fedele.md, §6, nel repo
 * team-tasks-manager): ciò che succede a ogni clic. Il selettore a riposo spunta il task scelto con la cascata dei
 * gruppi. La seconda riga passa da grigio a blu a rosso e il task scelto col pulsante acceso fa ciò che fa il bot
 * (compito 9): Owner e Tag blu aprono il menu di menzioni sotto i pulsanti, Webhook blu il menu dei webhook;
 * Contenuto e Promemoria blu aprono la loro modale, che blocca la lista finché non si manda; le domande del bot hanno
 * la loro modale. La prima riga (compito 10): il 🚀 porta la lista nell'altro tab; Pulisci chiede nella sua modale;
 * Riapri tutti e More rispondono con un messaggio effimero sotto la lista, coi suoi pulsanti; Modifica in blocco apre
 * la sua modale in sola lettura. Le risposte brevi del bot vanno nel fumetto; dopo ogni azione sulla lista i pulsanti
 * tornano grigi.
 */
import type { Tasto } from '../scene-data.ts';
import { accendiNelCanale, apriSelettore, chatInBasso } from '../scene-dom.ts';
import {
  campiDalPromemoria, divisa, modaleDelPromemoria, modaleDelTesto, modaleDellaDomanda, modaleDellaNuovaData,
  modaleDiModificaInBlocco, opzioniDeiWebhook, vociDelMenu,
} from './componenti.ts';
import { dentro, dopoIlClic, type Acceso, type Condiviso } from './condiviso.ts';
import { markdown } from './markdown.ts';
import { esitoDelPonte, htmlDellAnnullamento, htmlDelPannello, htmlDelPonte } from './messaggi.ts';
import { coiCodici, rubricaDi } from './nomi.ts';
import { posizione } from './modello.ts';
import type { Stato } from './modello.ts';
import {
  applicaOwner, applicaPromemoria, applicaTag, applicaWebhook, campiDellaNuovaData, campiDelPromemoria, eliminaTask,
  eliminaTaskConfermato, invertiSpunta, nellActivity, pulisci, pulisciConfermato, riapri, riapriConfermato,
  prosaDelTask, rifiutoDelCarrello, salvaTesto, togliOwner, togliOwnerConfermato,
  togliPromemoria,
  togliTag, togliWebhook, validaNuovaData, validaPromemoria,
} from './regole.ts';
import type { Domanda, Esito } from './regole.ts';
import { contestoDelCanale } from './righe.ts';
import {
  avviso, rispostaDellEsito, testo, testoDegliErrori, testoDelPromemoria, testoDi, umoreDelFumetto,
} from './testi.ts';
import { mostraEffimero, togliEffimero } from './ui/effimero.ts';
import { montaMenzioni, type Menzioni } from './ui/menzioni.ts';
import { apriModale, type Modale } from './ui/modale.ts';
import { montaScelta, type Scelta } from './ui/scelta.ts';

/**
 * Il tab del canale montato: chiudi lo riporta com'è all'arrivo, senza modale né messaggio effimero, coi menu chiusi e
 * i pulsanti grigi.
 */
export interface Canale {
  chiudi(): void;
}

/** Le domande che il bot fa in una modale: quella di Riapri tutti è un messaggio coi pulsanti. */
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
  const eph = el('eph')!;
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
  /** La chat era in fondo all'ultimo scorrimento: un messaggio che cresce la tiene lì (gli osservatori in fondo). */
  let inFondo = true;
  /** Chi ha fatto comparire l'effimero da fuori: Dismiss gli rende il focus, come una modale che si chiude. */
  let apritoreDellEffimero: HTMLElement | null = null;

  /** La risposta del bot nel fumetto, accanto al selettore dei task o all'elemento dato. */
  function rispondi(md: string | null, accanto: Element = sel): void {
    if (md) condiviso.fumetto(markdown(md, contestoDelCanale(stato())), umoreDelFumetto(md), accanto);
  }

  /**
   * La risposta del bot in un messaggio effimero sotto la lista, al posto di quello di prima. Se ci sta, la chat va in
   * fondo, come in Discord; se è più alto del canale, si ferma al suo inizio, perché lì c'è ciò che conta: l'avviso
   * della demo nel pannello More. Sul telefono il canale cresce col messaggio: con la stessa regola scorre la pagina
   * (`nearest`), solo se il messaggio non è già in vista.
   */
  function mostra(html: string): void {
    // Un effimero che ne sostituisce un altro da un suo pulsante tiene l'apritore di prima.
    const attivo = document.activeElement;
    if (!eph.contains(attivo)) {
      apritoreDellEffimero = attivo instanceof HTMLElement && scena.contains(attivo) ? attivo : null;
    }
    mostraEffimero(eph, html, { dismiss: dopoIlDismiss });
    if (feed.scrollHeight > feed.clientHeight) {
      const inizio = feed.scrollTop + eph.getBoundingClientRect().top - feed.getBoundingClientRect().top;
      feed.scrollTop = eph.offsetHeight <= feed.clientHeight ? feed.scrollHeight : inizio;
    } else {
      eph.scrollIntoView({ block: 'nearest' });
    }
    inFondo = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 2;
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

  /**
   * Una modale del bot sopra il canale: Submit manda i valori, chiuderla niente. Il focus torna a chi l'ha aperta, il
   * selettore dei task se non si dice.
   */
  function apri(modale: Modale, invio: (valori: Record<string, string>) => void, apritore: HTMLElement = sel): void {
    chiudiModale = apriModale(chan, modale, apritore, {
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
  function chiedi(domanda: DomandaInModale, apritore: HTMLElement = sel): void {
    apri(modaleDellaDomanda(domanda, stato()), () => {
      condiviso.cambia(confermata(domanda, stato()));
      spegni();
    }, apritore);
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
    // Il testo con gli id con cui la modale si apre: la prosa senza i tag, che hanno il loro menu. Una persona scritta
    // per nome resta testo: le persone si aggiungono con Owner e Tag. Anche `@nome:` in testa è testo: il Contenuto non
    // ha l'owner (scelta dell'utente del 2026-11-22).
    const task = stato().lista.tasks.find((t) => posizione(t.pos) === pos);
    const aperto = task ? prosaDelTask(task) : '';
    condiviso.cambia({ ...stato(), bloccata: true });
    apri(modale, (valori) => {
      condiviso.cambia({ ...stato(), bloccata: false });
      esegui(salvaTesto(stato(), pos, coiCodici(valori.task ?? '', rubricaDi(stato()), aperto, 'contenuto').testo));
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

  /**
   * Pulisci (TaskListBtnClean): la domanda nella sua modale, o il rifiuto nel fumetto. Un rifiuto della prima riga non
   * ridisegna la lista: il pulsante acceso resta com'è, a differenza di un rifiuto dal task scelto (spec §6.5).
   */
  function pulisciLaLista(pulsante: HTMLElement): void {
    const esito = pulisci(stato());
    if (esito.tipo === 'domanda' && esito.domanda.tipo !== 'riapri') chiedi(esito.domanda, pulsante);
    else rispondi(rispostaDellEsito(esito), pulsante);
  }

  /** Riapri tutti (ReopenLogic.ponte): il ponte sotto la lista, o il rifiuto nel fumetto, come per Pulisci. */
  function riapriTutti(pulsante: HTMLElement): void {
    const esito = riapri(stato());
    if (esito.tipo === 'domanda' && esito.domanda.tipo === 'riapri') {
      mostra(htmlDelPonte(esito.domanda, stato()));
    } else {
      rispondi(rispostaDellEsito(esito), pulsante);
    }
  }

  /**
   * Il focus dopo un pulsante che il messaggio ridisegnato ha tolto: sul primo acceso che resta, o Dismiss message.
   * Senza scorrere: la chat l'ha già messa a posto mostra.
   */
  function focusNelMessaggio(): void {
    eph.querySelector<HTMLElement>('button:not([aria-disabled="true"])')?.focus({ preventScroll: true });
  }

  /**
   * Dismiss message col focus sopra (da tastiera, o col clic dove il pulsante lo prende): il focus torna a chi ha fatto
   * comparire il messaggio, o al selettore dei task se quello non c'è più, invece di cadere sulla pagina.
   */
  function dopoIlDismiss(conIlFocus: boolean): void {
    if (!conIlFocus) return;
    (apritoreDellEffimero?.isConnected ? apritoreDellEffimero : sel).focus();
  }

  /**
   * Reopen, o il Submit di New date: il ponte si chiude con l'esito (ReopenLogic.riapertura). Riaperta, la lista si
   * ridisegna coi pulsanti grigi; se intanto è cambiata, il rifiuto sta nel ponte.
   */
  function chiudiIlPonte(esito: Esito): void {
    if (esito.tipo === 'fatto') {
      condiviso.cambia(esito.stato);
      spegni();
    }
    mostra(esitoDelPonte(esito, stato()));
    focusNelMessaggio();
  }

  /**
   * New date (TaskListBtnReopenNewDate): la modale coi campi proposti, col ponte che resta aperto. Gli errori vanno nel
   * fumetto accanto a New date, che si può ripremere (il bot li dice in un effimero a parte, TaskListMdlReopenWhen);
   * altrimenti la riapertura con la data scelta.
   */
  function nuovaData(pulsante: HTMLElement): void {
    apri(modaleDellaNuovaData(campiDellaNuovaData()), (valori) => {
      const scritti = campiDalPromemoria(valori);
      const valido = validaNuovaData(scritti);
      if ('errori' in valido) rispondi(testoDegliErrori(valido.errori), pulsante);
      else chiudiIlPonte(riapriConfermato(stato(), { at: valido.at, zona: scritti.zona }));
    }, pulsante);
  }

  /** Unlock list (TaskListBtnListUnlock): la lista sbloccata coi pulsanti grigi, il pannello di nuovo con l'esito. */
  function sblocca(): void {
    condiviso.cambia({ ...stato(), bloccata: false });
    spegni();
    mostra(htmlDelPannello(stato(), true));
    focusNelMessaggio();
  }

  function chiudi(): void {
    apriSelettore(chan, false);
    chiudiModale?.();
    chiudiModale = null;
    togliEffimero(eph);
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
    } else if (k === 'b-bulk') {
      // In sola lettura: Submit è spento, quindi niente da mandare.
      apri(modaleDiModificaInBlocco(stato()), () => undefined, b);
    } else if (k === 'b-clean') {
      pulisciLaLista(b);
    } else if (k === 'b-reopen') {
      riapriTutti(b);
    } else if (k === 'b-more') {
      mostra(htmlDelPannello(stato()));
    } else if (k === 'e-reopen') {
      chiudiIlPonte(riapriConfermato(stato()));
    } else if (k === 'e-newdate') {
      nuovaData(b);
    } else if (k === 'e-cancel') {
      mostra(htmlDellAnnullamento(stato()));
      focusNelMessaggio();
    } else if (k === 'e-unlock') {
      sblocca();
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
