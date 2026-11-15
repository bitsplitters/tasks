/*
 * La demo da provare (Demo.astro; spec 2026-11-15-home-video-e-demo-design.md, §5, nel repo team-tasks-manager): le
 * scene dei video, mosse da chi guarda, in due tab. Nel canale il selettore spunta i task con la cascata dei gruppi
 * e la seconda riga passa da grigio a blu a rosso. Owner e Tag cambiano davvero il task (§5.6): in blu il menu sotto
 * i pulsanti sceglie le persone, poi il selettore sceglie il task; in rosso il selettore toglie. Con Content,
 * Reminder e Webhook scegliere un task mostra un fumetto con cosa farebbe Discord. Dopo l'azione il pulsante torna
 * grigio, come fa il bot col default (OptionMode.DISABLED); dove il bot rifiuta, il fumetto dice la sua risposta e il
 * pulsante resta acceso.
 * Nell'Activity le caselle spuntano e il testo di un task apre il pannello. Owner e Tag in blu mostrano il selettore
 * delle persone e salvano con Save; in rosso Delete toglie. Con gli altri tre l'area resta vuota e Save spento, perché
 * quel lavoro lo mostra il video. Activity ed Exit cambiano tab; gli altri pulsanti hanno solo il tooltip. La lista è
 * una sola: quello che cambia in un tab si vede nell'altro.
 */
import {
  FATTI_INIZIALI, FUMETTI, MIA, RIFIUTI, fraseOwnerEPromemoria, prossimoColore, spunta, type Colore, type Modo,
  type Tasto, type TastoConFumetto,
} from './scene-data';
import {
  apriPannello, apriSelettore, avvisoNelPannello, azzeraIlPannello, chatInBasso, disegnaLista, eliminaAttivo,
  menuSottoAperto, posizionaPannello, salva, sceltaNelMenuSotto, sceltaNelPannello, scorrimentoPerIlPannello,
  scriviConGrassetto, tastoDelCanale, tastoDelPannello, unita, vistaDelPannello, type StatoLista,
} from './scene-dom';
import { collegaTab } from './tabs';
import { avviaTooltip } from './tooltip';

/** Il pulsante acceso, nella seconda riga del canale o nel pannello: uno alla volta. */
interface Acceso {
  tasto: Tasto;
  colore: Colore;
}

/** I due pulsanti che nella demo cambiano il task. */
type Persone = 'owner' | 'tag';

/** Quanto resta il fumetto del canale. */
const FUMETTO_MS = 3500;
/** Il fumetto dai bordi della scena e dalla riga del task, in px: è disegnato in px, non in unità di Discord. */
const BORDO = 12;
const STACCO = 8;

/** Lo stato di partenza: il task 3 con l'owner e il promemoria, come alla fine dei video; i task 2 e 2.1 da fare. */
const iniziale = (): StatoLista => ({
  fatti: new Set(FATTI_INIZIALI), owner: { '3': MIA.id }, tag: {}, promemoria: true,
});

/** Grigio, blu, rosso, di nuovo grigio; un altro pulsante si accende in blu e spegne il primo. */
function dopoIlClic(prima: Acceso | null, tasto: Tasto): Acceso | null {
  const colore = prossimoColore(prima?.tasto === tasto ? prima.colore : null);
  return colore ? { tasto, colore } : null;
}

const cambiaPersone = (t: Tasto | undefined): t is Persone => t === 'owner' || t === 'tag';

/** Le stesse persone, in qualunque ordine (sameMentions di PeoplePicker.tsx). */
const stesse = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((x) => b.includes(x));

/** L'owner (al più uno, nella demo) o i tag del task. */
function personeDel(s: StatoLista, tasto: Persone, id: string): string[] {
  if (tasto === 'tag') return [...(s.tag[id] ?? [])];
  const o = s.owner[id];
  return o ? [o] : [];
}

/**
 * La lista con l'owner o i tag del task cambiati: le scelte, o nessuno. Senza owner il promemoria non arriverebbe a
 * nessuno: il bot lo toglie con lui (tasklist.modal.owner.remove.question).
 */
function cambia(s: StatoLista, tasto: Persone, id: string, scelte: readonly string[]): StatoLista {
  if (tasto === 'tag') {
    const tag = { ...s.tag };
    if (scelte.length > 0) tag[id] = [...scelte];
    else delete tag[id];
    return { ...s, tag };
  }
  const owner = { ...s.owner };
  if (scelte.length > 0) owner[id] = scelte[0];
  else delete owner[id];
  return { ...s, owner, promemoria: s.promemoria && !(id === '3' && scelte.length === 0) };
}

/**
 * Perché il bot non applica: in blu senza scelte, o con l'owner che c'è già; in rosso se non c'è niente da togliere.
 * Null se applica.
 */
function rifiuto(s: StatoLista, tasto: Persone, colore: Colore, id: string, scelte: readonly string[]): string | null {
  const prima = personeDel(s, tasto, id);
  if (colore === 'red') {
    if (prima.length > 0) return null;
    return tasto === 'owner' ? RIFIUTI.ownerAssente : RIFIUTI.tagAssenti;
  }
  if (scelte.length === 0) return tasto === 'owner' ? RIFIUTI.ownerNessuno : RIFIUTI.tagNessuno;
  return tasto === 'owner' && stesse(scelte, prima) ? RIFIUTI.ownerUguale : null;
}

export function avviaDemo(): void {
  const radice = document.querySelector<HTMLElement>('[data-demo]');
  if (!radice) return;
  const el = (r: ParentNode, chiave: string) => r.querySelector<HTMLElement>(`[data-k="${chiave}"]`)!;
  const scenaC = radice.querySelector<HTMLElement>('[data-scene="channel"]')!;
  const scenaA = radice.querySelector<HTMLElement>('[data-scene="activity"]')!;
  const chan = el(scenaC, 'chan');
  /** Il canale sotto la finestra dell'Activity: inerte, mostra la lista com'è. */
  const sotto = el(scenaA, 'chan');
  const win = el(scenaA, 'win');
  const fumetto = el(scenaC, 'bubble');
  const daCapo = el(radice, 'reset');
  const tooltip = avviaTooltip(radice);
  const menoMovimento = matchMedia('(prefers-reduced-motion: reduce)');

  let modo: Modo = 'channel';
  let lista = iniziale();
  let canale: Acceso | null = null;
  /** Le persone scelte nel menu sotto i pulsanti del canale. */
  let scelteCanale: string[] = [];
  let pannello: Acceso | null = null;
  /** Le persone scelte nel selettore del pannello. */
  let sceltePannello: string[] = [];
  let timerFumetto = 0;

  const cambiato = () => {
    daCapo.hidden = false;
  };
  const idDi = (b: HTMLElement) => b.closest<HTMLElement>('[data-task]')?.dataset.task ?? '';
  const spuntaIl = (id: string) => {
    lista = { ...lista, fatti: spunta(lista.fatti, id, !lista.fatti.has(id)) };
  };

  function nascondiFumetto(): void {
    clearTimeout(timerFumetto);
    fumetto.textContent = '';
  }

  /** La riga del task in vista nella chat. */
  function rigaInVista(id: string): HTMLElement | null {
    const feed = el(chan, 'feed');
    const riga = chan.querySelector<HTMLElement>(`.sc-row:not(.sc-row-rem)[data-task="${id}"]`);
    if (!riga) return null;
    const f = feed.getBoundingClientRect();
    const r = riga.getBoundingClientRect();
    if (r.top < f.top) feed.scrollTop -= f.top - r.top;
    else if (r.bottom > f.bottom) feed.scrollTop += r.bottom - f.bottom;
    return riga;
  }

  /** La riga del task in vista, poi il fumetto sopra la riga (sotto, se sopra non c'è spazio). */
  function mostraFumetto(testo: string, id: string): void {
    nascondiFumetto();
    const riga = rigaInVista(id);
    if (!riga) return;
    scriviConGrassetto(fumetto, testo);
    const s = scenaC.getBoundingClientRect();
    const r = riga.getBoundingClientRect();
    const x0 = s.left + scenaC.clientLeft;
    const y0 = s.top + scenaC.clientTop;
    const w = fumetto.offsetWidth;
    const h = fumetto.offsetHeight;
    let top = r.top - y0 - h - STACCO;
    if (top < BORDO) top = r.bottom - y0 + STACCO;
    top = Math.min(top, scenaC.clientHeight - h - BORDO);
    // a partire dal testo del task, dopo il numero
    const left = Math.min(Math.max(BORDO, r.left - x0 + 24 * unita(scenaC)), scenaC.clientWidth - w - BORDO);
    fumetto.style.left = `${left}px`;
    fumetto.style.top = `${top}px`;
    timerFumetto = window.setTimeout(nascondiFumetto, FUMETTO_MS);
  }

  /** Il pulsante della seconda riga spento: il menu sotto i pulsanti sparisce con le sue scelte. */
  function spegniIlCanale(): void {
    canale = null;
    scelteCanale = [];
    tastoDelCanale(chan, null, null);
  }

  /**
   * Il task scelto nel selettore con Owner o Tag acceso. Rifiutato, il fumetto dice la risposta del bot e il pulsante
   * resta acceso, con le scelte; applicato, il pulsante si spegne e la riga cambia. Se va via anche il promemoria, il
   * fumetto lo dice.
   */
  function applicaNelCanale(tasto: Persone, colore: Colore, id: string): void {
    const no = rifiuto(lista, tasto, colore, id, scelteCanale);
    if (no) {
      mostraFumetto(no, id);
      return;
    }
    const conPromemoria = lista.promemoria;
    lista = cambia(lista, tasto, id, colore === 'blue' ? scelteCanale : []);
    spegniIlCanale();
    disegnaLista(chan, lista);
    if (conPromemoria && !lista.promemoria) mostraFumetto(fraseOwnerEPromemoria(id), id);
    else rigaInVista(id);
  }

  function chiudiPannello(rendiIlFocus: boolean): void {
    const id = win.dataset.panel;
    if (id === undefined) return;
    pannello = null;
    sceltePannello = [];
    apriPannello(win, null);
    if (rendiIlFocus) el(win, `a-txt-${id}`).focus();
  }

  /**
   * Il pulsante acceso del pannello e quello che mostra l'area. Owner e Tag in blu: il selettore, che parte dalle
   * scelte di adesso (useEdit di PeopleAction.tsx), con Save spento. In rosso: Delete acceso se c'è qualcosa da
   * togliere, altrimenti l'avviso del bot; togliendo l'owner del task col promemoria, la domanda della modale.
   */
  function mostraAzione(): void {
    const id = win.dataset.panel ?? '';
    sceltePannello = [];
    azzeraIlPannello(win);
    tastoDelPannello(win, pannello?.tasto ?? null, pannello?.colore ?? null);
    if (!pannello || !cambiaPersone(pannello.tasto)) return;
    const { tasto, colore } = pannello;
    const prima = personeDel(lista, tasto, id);
    if (colore === 'blue') {
      sceltePannello = prima;
      vistaDelPannello(win, tasto);
      sceltaNelPannello(win, sceltePannello);
      return;
    }
    const no = rifiuto(lista, tasto, colore, id, []);
    if (no) {
      avvisoNelPannello(win, 'notice', no);
      return;
    }
    if (tasto === 'owner' && id === '3' && lista.promemoria) {
      avvisoNelPannello(win, 'question', fraseOwnerEPromemoria(id));
    }
    eliminaAttivo(win, true);
  }

  /** Save acceso con almeno una scelta diversa da quelle di adesso (PeopleAction.tsx, changed). */
  function aggiornaSave(): void {
    if (!pannello || !cambiaPersone(pannello.tasto)) return;
    const prima = personeDel(lista, pannello.tasto, win.dataset.panel ?? '');
    salva(win, sceltePannello.length > 0 && !stesse(sceltePannello, prima) ? 'on' : 'off');
  }

  /** Save o Delete: la lista cambia nei due tab, il pannello resta aperto e torna com'era all'apertura. */
  function applicaNelPannello(scelte: readonly string[]): void {
    if (!pannello || !cambiaPersone(pannello.tasto)) return;
    const tasto = pannello.tasto;
    lista = cambia(lista, tasto, win.dataset.panel ?? '', scelte);
    pannello = null;
    sceltePannello = [];
    azzeraIlPannello(win);
    disegnaLista(win, lista);
    disegnaLista(sotto, lista);
    el(win, `p-${tasto}`).focus();
    const top = scorrimentoPerIlPannello(win);
    el(win, 'page').scrollTo({ top, behavior: menoMovimento.matches ? 'auto' : 'smooth' });
    cambiato();
  }

  /** Entrando in un tab: la lista ridisegnata dove si arriva, chiuso quello che resta aperto dove si esce. */
  function entra(nuovo: Modo): void {
    if (nuovo === modo) return;
    modo = nuovo;
    tooltip.nascondi();
    nascondiFumetto();
    if (modo === 'activity') {
      // La lista va nell'Activity: all'uscita il bot rimette il messaggio coi pulsanti grigi.
      apriSelettore(chan, false);
      spegniIlCanale();
      disegnaLista(sotto, lista);
      disegnaLista(win, lista);
      chatInBasso(scenaA);
    } else {
      chiudiPannello(false);
      disegnaLista(chan, lista);
      chatInBasso(scenaC);
    }
  }

  const tabs = collegaTab(radice.querySelector<HTMLElement>('[role="tablist"]')!, (k) => entra(k as Modo));

  /** Activity ed Exit: il tab cambia come se lo avesse scelto chi guarda, e il focus va sul tab. */
  function vaiA(nuovo: Modo): void {
    tabs.mostra(nuovo);
    entra(nuovo);
    radice.querySelector<HTMLElement>(`#dm-t-${nuovo}`)?.focus();
  }

  scenaC.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    const k = b.dataset.k ?? '';
    if (k === 'sel') {
      nascondiFumetto();
      menuSottoAperto(chan, false);
      apriSelettore(chan, !chan.hasAttribute('data-menu'));
    } else if (b.matches('.sc-opt')) {
      const id = b.dataset.task ?? '';
      apriSelettore(chan, false);
      if (canale && cambiaPersone(canale.tasto)) {
        applicaNelCanale(canale.tasto, canale.colore, id);
      } else if (canale) {
        // Prima si spegne il pulsante, poi il fumetto: il menu sotto i pulsanti sparisce e la chat si sposta.
        const { tasto, colore } = canale;
        spegniIlCanale();
        mostraFumetto(FUMETTI[tasto as TastoConFumetto][colore](id), id);
      } else {
        spuntaIl(id);
        disegnaLista(chan, lista);
      }
      el(chan, 'sel').focus();
      cambiato();
    } else if (k === 'sub-sel') {
      if (b.getAttribute('aria-disabled') === 'true') return;
      nascondiFumetto();
      apriSelettore(chan, false);
      menuSottoAperto(chan, !chan.hasAttribute('data-subopen'));
    } else if (b.matches('.sc-subopt')) {
      // Owner: una persona, che prende il posto dell'altra. Tag: ogni clic mette o toglie.
      const p = b.dataset.persona ?? '';
      if (canale?.tasto === 'owner') scelteCanale = scelteCanale.includes(p) ? [] : [p];
      else scelteCanale = scelteCanale.includes(p) ? scelteCanale.filter((x) => x !== p) : [...scelteCanale, p];
      sceltaNelMenuSotto(chan, scelteCanale);
      cambiato();
    } else if (b.dataset.tasto) {
      nascondiFumetto();
      canale = dopoIlClic(canale, b.dataset.tasto as Tasto);
      scelteCanale = [];
      tastoDelCanale(chan, canale?.tasto ?? null, canale?.colore ?? null);
      cambiato();
    } else if (k === 'b-activity') {
      vaiA('activity');
    } else if (b.dataset.tt) {
      tooltip.mostra(b);
    }
  });

  scenaA.addEventListener('click', (e) => {
    const b = (e.target as Element).closest<HTMLElement>('button');
    if (!b) return;
    const k = b.dataset.k ?? '';
    if (b.matches('.sc-acb')) {
      spuntaIl(idDi(b));
      disegnaLista(win, lista);
      disegnaLista(sotto, lista);
      cambiato();
    } else if (b.matches('.sc-atext')) {
      const id = idDi(b);
      pannello = null;
      sceltePannello = [];
      apriPannello(win, win.dataset.panel === id ? null : id);
      if (win.dataset.panel !== undefined) {
        const top = scorrimentoPerIlPannello(win);
        el(win, 'page').scrollTo({ top, behavior: menoMovimento.matches ? 'auto' : 'smooth' });
      }
      cambiato();
    } else if (b.dataset.ptasto) {
      pannello = dopoIlClic(pannello, b.dataset.ptasto as Tasto);
      mostraAzione();
      cambiato();
    } else if (b.matches('.sc-pill')) {
      // Il + porta su fra le scelte (Owner: al posto di chi c'era), la × riporta giù.
      const aggiungi = b.closest<HTMLElement>('[data-sugg]')?.dataset.sugg;
      const togli = b.closest<HTMLElement>('[data-pick]')?.dataset.pick;
      if (aggiungi) sceltePannello = pannello?.tasto === 'owner' ? [aggiungi] : [...sceltePannello, aggiungi];
      else if (togli) sceltePannello = sceltePannello.filter((x) => x !== togli);
      sceltaNelPannello(win, sceltePannello);
      aggiornaSave();
      cambiato();
    } else if (k === 'p-save') {
      if (win.dataset.save === 'on') applicaNelPannello(sceltePannello);
    } else if (k === 'p-delete') {
      if (b.getAttribute('aria-disabled') !== 'true') applicaNelPannello([]);
    } else if (k === 'p-close' || k === 'p-x') {
      chiudiPannello(true);
    } else if (k === 'a-exit') {
      vaiA('channel');
    } else if (b.dataset.tt) {
      // Fuori dal pannello il clic lo chiude: prima del tooltip, che così si mette dove il pulsante resta quando la
      // pagina, più corta, risale.
      if (!b.closest('.sc-panel')) chiudiPannello(false);
      tooltip.mostra(b);
    }
  });

  // Un clic fuori chiude i menu del canale e il pannello, come in Discord e nell'Activity.
  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (chan.hasAttribute('data-menu') && !t.closest('.sc-selwrap')) apriSelettore(chan, false);
    if (chan.hasAttribute('data-subopen') && !t.closest('.sc-submenu')) menuSottoAperto(chan, false);
    if (win.dataset.panel !== undefined && !t.closest('.sc-panel, .sc-atext')) chiudiPannello(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const dentro = radice.contains(document.activeElement);
    if (chan.hasAttribute('data-menu')) {
      apriSelettore(chan, false);
      if (dentro) el(chan, 'sel').focus();
    }
    if (chan.hasAttribute('data-subopen')) {
      menuSottoAperto(chan, false);
      if (dentro) el(chan, 'sub-sel').focus();
    }
    chiudiPannello(dentro);
  });

  // La chat in fondo e il pannello sotto il suo task, quando la scena cambia misura o torna visibile col suo tab.
  new ResizeObserver(() => chatInBasso(scenaC)).observe(scenaC);
  new ResizeObserver(() => {
    chatInBasso(scenaA);
    posizionaPannello(win);
  }).observe(scenaA);

  daCapo.addEventListener('click', () => {
    lista = iniziale();
    pannello = null;
    sceltePannello = [];
    nascondiFumetto();
    apriSelettore(chan, false);
    spegniIlCanale();
    apriPannello(win, null);
    el(win, 'page').scrollTop = 0;
    for (const l of [chan, sotto, win]) disegnaLista(l, lista);
    vaiA('channel');
    chatInBasso(scenaC);
    daCapo.hidden = true;
  });
}
