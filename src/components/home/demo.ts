/*
 * La demo da provare (Demo.astro; spec 2026-11-15-home-video-e-demo-design.md, §5, nel repo team-tasks-manager): le
 * scene dei video, mosse da chi guarda, in due tab. Nel canale il selettore spunta i task con la cascata dei gruppi
 * e la seconda riga passa da grigio a blu a rosso; con un pulsante acceso, scegliere un task mostra un fumetto con
 * cosa farebbe Discord, poi il pulsante torna grigio, come fa il bot col default (OptionMode.DISABLED).
 * Nell'Activity le caselle spuntano, il testo di un task apre il pannello e i suoi pulsanti cambiano colore e frase;
 * l'area resta vuota e Save spento, perché salvare è il lavoro del video. Activity ed Exit cambiano tab; gli altri
 * pulsanti hanno solo il tooltip. La lista è una sola: quello che si spunta in un tab si vede nell'altro.
 */
import { FATTI_INIZIALI, FUMETTI, prossimoColore, spunta, type Colore, type Modo, type Tasto } from './scene-data';
import {
  apriPannello, apriSelettore, chatInBasso, disegnaLista, posizionaPannello, scorrimentoPerIlPannello,
  tastoDelCanale, tastoDelPannello, unita, type StatoLista,
} from './scene-dom';
import { collegaTab } from './tabs';
import { avviaTooltip } from './tooltip';

/** Il pulsante acceso, nella seconda riga del canale o nel pannello: uno alla volta. */
interface Acceso {
  tasto: Tasto;
  colore: Colore;
}

/** Quanto resta il fumetto del canale. */
const FUMETTO_MS = 3500;
/** Il fumetto dai bordi della scena e dalla riga del task, in px: è disegnato in px, non in unità di Discord. */
const BORDO = 12;
const STACCO = 8;

/** Lo stato di partenza: il task 3 con l'owner e il promemoria, come alla fine dei video; i task 2 e 2.1 da fare. */
const iniziale = (): StatoLista => ({ fatti: new Set(FATTI_INIZIALI), owner: true, promemoria: true });

/** Grigio, blu, rosso, di nuovo grigio; un altro pulsante si accende in blu e spegne il primo. */
function dopoIlClic(prima: Acceso | null, tasto: Tasto): Acceso | null {
  const colore = prossimoColore(prima?.tasto === tasto ? prima.colore : null);
  return colore ? { tasto, colore } : null;
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
  let pannello: Acceso | null = null;
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

  /** La riga del task in vista nella chat, poi il fumetto sopra la riga (sotto, se sopra non c'è spazio). */
  function mostraFumetto(testo: string, id: string): void {
    nascondiFumetto();
    const feed = el(chan, 'feed');
    const riga = chan.querySelector<HTMLElement>(`.sc-row:not(.sc-row-rem)[data-task="${id}"]`);
    if (!riga) return;
    const f = feed.getBoundingClientRect();
    const prima = riga.getBoundingClientRect();
    if (prima.top < f.top) feed.scrollTop -= f.top - prima.top;
    else if (prima.bottom > f.bottom) feed.scrollTop += prima.bottom - f.bottom;
    fumetto.textContent = testo;
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

  function chiudiPannello(rendiIlFocus: boolean): void {
    const id = win.dataset.panel;
    if (id === undefined) return;
    pannello = null;
    apriPannello(win, null);
    if (rendiIlFocus) el(win, `a-txt-${id}`).focus();
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
      canale = null;
      tastoDelCanale(chan, null, null);
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
      apriSelettore(chan, !chan.hasAttribute('data-menu'));
    } else if (b.matches('.sc-opt')) {
      const id = b.dataset.task ?? '';
      apriSelettore(chan, false);
      if (canale) {
        // Prima si spegne il pulsante, poi il fumetto: il menu sotto i pulsanti sparisce e la chat si sposta.
        const { tasto, colore } = canale;
        canale = null;
        tastoDelCanale(chan, null, null);
        mostraFumetto(FUMETTI[tasto][colore](id), id);
      } else {
        spuntaIl(id);
        disegnaLista(chan, lista);
      }
      el(chan, 'sel').focus();
      cambiato();
    } else if (b.dataset.tasto) {
      nascondiFumetto();
      canale = dopoIlClic(canale, b.dataset.tasto as Tasto);
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
      apriPannello(win, win.dataset.panel === id ? null : id);
      if (win.dataset.panel !== undefined) {
        const top = scorrimentoPerIlPannello(win);
        el(win, 'page').scrollTo({ top, behavior: menoMovimento.matches ? 'auto' : 'smooth' });
      }
      cambiato();
    } else if (b.dataset.ptasto) {
      pannello = dopoIlClic(pannello, b.dataset.ptasto as Tasto);
      tastoDelPannello(win, pannello?.tasto ?? null, pannello?.colore ?? null);
      cambiato();
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

  // Un clic fuori chiude il menu del selettore e il pannello, come in Discord e nell'Activity.
  document.addEventListener('click', (e) => {
    const t = e.target as Element;
    if (chan.hasAttribute('data-menu') && !t.closest('.sc-selwrap')) apriSelettore(chan, false);
    if (win.dataset.panel !== undefined && !t.closest('.sc-panel, .sc-atext')) chiudiPannello(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const dentro = radice.contains(document.activeElement);
    if (chan.hasAttribute('data-menu')) {
      apriSelettore(chan, false);
      if (dentro) el(chan, 'sel').focus();
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
    canale = null;
    pannello = null;
    nascondiFumetto();
    apriSelettore(chan, false);
    tastoDelCanale(chan, null, null);
    apriPannello(win, null);
    el(win, 'page').scrollTop = 0;
    for (const l of [chan, sotto, win]) disegnaLista(l, lista);
    vaiA('channel');
    chatInBasso(scenaC);
    daCapo.hidden = true;
  });
}
