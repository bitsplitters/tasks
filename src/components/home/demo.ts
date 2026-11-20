/*
 * La demo da provare (Demo.astro; spec 2026-11-15-home-video-e-demo-design.md §5 e 2026-11-15-demo-fedele-design.md,
 * nel repo team-tasks-manager): le scene dei video, mosse da chi guarda, in due tab. Lo stato è uno solo
 * (demo/modello.ts) e lo cambiano le regole del bot (demo/regole.ts): quello che cambia in un tab si vede nell'altro.
 * Qui c'è l'ingresso: lo stato, i tab, il fumetto, i tooltip, Start over. Cosa fa ogni clic lo dicono demo/canale.ts e
 * demo/activity.ts.
 *
 * I tab in cima sono la navigazione della demo, non un'azione del bot: funzionano sempre (piano, §1.2.11). Quello
 * dell'Activity porta lassù la lista, sbloccandola se serve; quello del canale la riporta nel messaggio.
 */
import type { Modo } from './scene-data';
import { chatInBasso, disegnaLista } from './scene-dom';
import { collegaTab } from './tabs';
import { avviaTooltip } from './tooltip';
import { montaActivity } from './demo/activity.ts';
import { montaCanale } from './demo/canale.ts';
import type { Condiviso } from './demo/condiviso.ts';
import { statoIniziale } from './demo/modello.ts';
import type { Stato } from './demo/modello.ts';
import { nelCanale, nellActivity } from './demo/regole.ts';
import type { Umore } from './demo/testi.ts';

/**
 * Quanto resta il fumetto: tre secondi e mezzo, di più per un testo lungo, che va letto (gli errori del promemoria,
 * l'avviso dei token tolti).
 */
const FUMETTO_MS = 3500;
const MS_PER_CARATTERE = 60;
/** Il fumetto dai bordi della scena e dall'elemento accanto, in px: è disegnato in px, non in unità di Discord. */
const BORDO = 12;
const STACCO = 8;
/** Nell'Activity il fumetto sta più staccato, per la punta (Bubble.tsx della pagina: offset 10, punta da 12 px). */
const STACCO_ACTIVITY = 10;
const PUNTA_DAL_BORDO = 12;

/** Gli oggetti con le chiavi in ordine: due stati uguali si scrivono uguali, comunque le regole li abbiano composti. */
const inOrdine = (_: string, v: unknown) =>
  v !== null && typeof v === 'object' && !Array.isArray(v)
    ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
    : v;

/** Lo stato come conta per Start over: dove sta la lista no, perché la spostano i tab. */
const impronta = (stato: Stato) => JSON.stringify({ ...stato, inActivity: false }, inOrdine);

/** La testa della mascotte a sinistra del testo (spec 2026-11-21-mascotte-nel-sito-design.md, §2.2): decorativa. */
function testa(umore: Umore): HTMLImageElement {
  const img = document.createElement('img');
  img.className = 'dm-testa';
  img.src = `/mascotte/testa-${umore}.svg`;
  img.alt = '';
  img.width = 34;
  img.height = 34;
  return img;
}

/** Il testo del bot, accanto alla testa. */
function testoDelFumetto(html: string): HTMLSpanElement {
  const s = document.createElement('span');
  s.className = 'dm-testo';
  s.innerHTML = html;
  return s;
}

export function avviaDemo(): void {
  const radice = document.querySelector<HTMLElement>('[data-demo]');
  if (radice) avvia(radice);
}

function avvia(radice: HTMLElement): void {
  const scene: Record<Modo, HTMLElement> = {
    channel: radice.querySelector<HTMLElement>('[data-scene="channel"]')!,
    activity: radice.querySelector<HTMLElement>('[data-scene="activity"]')!,
  };
  const daCapo = radice.querySelector<HTMLElement>('[data-k="reset"]')!;
  const tooltip = avviaTooltip(radice);
  const partenza = impronta(statoIniziale());
  let stato = statoIniziale();
  let modo: Modo = 'channel';
  let timerFumetto = 0;
  // Le due teste del fumetto, caricate prima che servano: il primo fumetto non deve comparire senza.
  for (const u of ['sorpreso', 'contento'] as const) new Image().src = `/mascotte/testa-${u}.svg`;

  function nascondiFumetto(): void {
    clearTimeout(timerFumetto);
    radice.querySelectorAll<HTMLElement>('.dm-bubble').forEach((f) => f.replaceChildren());
  }

  // Ogni gesto nella demo toglie il fumetto di prima, che parlava di un'altra azione. Gira prima di tutti (su window,
  // in cattura): il gesto può così mostrarne uno nuovo, anche il rifiuto del menu di menzioni che si chiude.
  for (const tipo of ['pointerdown', 'keydown'] as const) {
    window.addEventListener(tipo, (e) => {
      if (e.target instanceof Node && radice.contains(e.target)) nascondiFumetto();
    }, true);
  }

  /**
   * Il fumetto nella scena del tab aperto: sopra l'elemento accanto, a partire dal suo bordo sinistro, o sotto se
   * sopra non c'è spazio; senza elemento, in cima al centro. Sempre dentro la scena. Prende il posto del tooltip, anche
   * di quello in arrivo: sopra lo stesso pulsante starebbero uno sull'altro.
   * Nell'Activity è quello della pagina (Bubble.tsx): bianco, centrato sull'elemento, con la punta verso di lui
   * (decisione dell'utente del 2026-11-20). La punta va dove sta il centro dell'elemento, anche quando il fumetto è
   * spinto dentro la scena; senza elemento non c'è.
   */
  function fumetto(html: string, umore: Umore, accanto?: Element): void {
    nascondiFumetto();
    tooltip.nascondi();
    const scena = scene[modo];
    const f = scena.querySelector<HTMLElement>('.dm-bubble');
    if (!f) return;
    f.replaceChildren(testa(umore), testoDelFumetto(html));
    const s = scena.getBoundingClientRect();
    const x0 = s.left + scena.clientLeft;
    const y0 = s.top + scena.clientTop;
    const w = f.offsetWidth;
    const h = f.offsetHeight;
    const nellActivity = modo === 'activity';
    const stacco = nellActivity ? STACCO_ACTIVITY : STACCO;
    let left = (scena.clientWidth - w) / 2;
    let top = BORDO;
    let lato: 'top' | 'bottom' | null = null;
    let centro = 0;
    if (accanto) {
      const r = accanto.getBoundingClientRect();
      centro = r.left + r.width / 2 - x0;
      left = nellActivity ? centro - w / 2 : r.left - x0;
      top = r.top - y0 - h - stacco;
      lato = 'top';
      if (top < BORDO) {
        top = r.bottom - y0 + stacco;
        lato = 'bottom';
      }
    }
    left = Math.max(BORDO, Math.min(left, scena.clientWidth - w - BORDO));
    f.style.left = `${left}px`;
    f.style.top = `${Math.max(BORDO, Math.min(top, scena.clientHeight - h - BORDO))}px`;
    if (nellActivity && lato) {
      f.dataset.placement = lato;
      f.style.setProperty('--punta', `${Math.max(PUNTA_DAL_BORDO, Math.min(centro - left, w - PUNTA_DAL_BORDO))}px`);
    } else {
      delete f.dataset.placement;
    }
    const lettura = (f.textContent ?? '').length * MS_PER_CARATTERE;
    timerFumetto = window.setTimeout(nascondiFumetto, Math.max(FUMETTO_MS, lettura));
  }

  /** La lista nei due tab, il canale sotto la finestra compreso; Start over se non è più quella di partenza. */
  function disegna(): void {
    radice.querySelectorAll<HTMLElement>('.sc-chan, .sc-win').forEach((l) => disegnaLista(l, stato));
    daCapo.hidden = impronta(stato) === partenza;
  }

  const condiviso: Condiviso = {
    stato: () => stato,
    cambia(nuovo) {
      stato = nuovo;
      disegna();
    },
    fumetto,
    vaiA,
    tooltip: (b) => tooltip.mostra(b),
  };
  const moduli = { channel: montaCanale(scene.channel, condiviso), activity: montaActivity(scene.activity, condiviso) };

  /** Entrando in un tab: chiuso quello che resta aperto dove si esce, la chat in fondo dove si arriva. */
  function entra(nuovo: Modo): void {
    if (nuovo === modo) return;
    moduli[modo].chiudi();
    modo = nuovo;
    tooltip.nascondi();
    nascondiFumetto();
    chatInBasso(scene[modo]);
  }

  const tabs = collegaTab(radice.querySelector<HTMLElement>('[role="tablist"]')!, (k) => {
    const nuovo = k as Modo;
    condiviso.cambia(nuovo === 'activity' ? nellActivity(stato) : nelCanale(stato));
    entra(nuovo);
  });

  /** L'Activity, Join the Activity ed Exit: il tab cambia come se lo avesse scelto chi guarda, col focus sul tab. */
  function vaiA(nuovo: Modo): void {
    tabs.mostra(nuovo);
    entra(nuovo);
    radice.querySelector<HTMLElement>(`#dm-t-${nuovo}`)?.focus();
  }

  daCapo.addEventListener('click', () => {
    moduli.channel.chiudi();
    moduli.activity.chiudi();
    nascondiFumetto();
    const pagina = scene.activity.querySelector<HTMLElement>('[data-k="page"]');
    if (pagina) pagina.scrollTop = 0;
    condiviso.cambia(statoIniziale());
    vaiA('channel');
    chatInBasso(scene.channel);
  });
}
