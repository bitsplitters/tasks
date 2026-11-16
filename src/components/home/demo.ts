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

/** Quanto resta il fumetto. */
const FUMETTO_MS = 3500;
/** Il fumetto dai bordi della scena e dall'elemento accanto, in px: è disegnato in px, non in unità di Discord. */
const BORDO = 12;
const STACCO = 8;

/** Gli oggetti con le chiavi in ordine: due stati uguali si scrivono uguali, comunque le regole li abbiano composti. */
const inOrdine = (_: string, v: unknown) =>
  v !== null && typeof v === 'object' && !Array.isArray(v)
    ? Object.fromEntries(Object.entries(v).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)))
    : v;

/** Lo stato come conta per Start over: dove sta la lista no, perché la spostano i tab. */
const impronta = (stato: Stato) => JSON.stringify({ ...stato, inActivity: false }, inOrdine);

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

  function nascondiFumetto(): void {
    clearTimeout(timerFumetto);
    radice.querySelectorAll<HTMLElement>('.dm-bubble').forEach((f) => f.replaceChildren());
  }

  /**
   * Il fumetto nella scena del tab aperto: sopra l'elemento accanto, a partire dal suo bordo sinistro, o sotto se
   * sopra non c'è spazio; senza elemento, in cima al centro. Sempre dentro la scena.
   */
  function fumetto(html: string, accanto?: Element): void {
    nascondiFumetto();
    const scena = scene[modo];
    const f = scena.querySelector<HTMLElement>('.dm-bubble');
    if (!f) return;
    f.innerHTML = html;
    const s = scena.getBoundingClientRect();
    const x0 = s.left + scena.clientLeft;
    const y0 = s.top + scena.clientTop;
    const w = f.offsetWidth;
    const h = f.offsetHeight;
    let left = (scena.clientWidth - w) / 2;
    let top = BORDO;
    if (accanto) {
      const r = accanto.getBoundingClientRect();
      left = r.left - x0;
      top = r.top - y0 - h - STACCO;
      if (top < BORDO) top = r.bottom - y0 + STACCO;
    }
    f.style.left = `${Math.max(BORDO, Math.min(left, scena.clientWidth - w - BORDO))}px`;
    f.style.top = `${Math.max(BORDO, Math.min(top, scena.clientHeight - h - BORDO))}px`;
    timerFumetto = window.setTimeout(nascondiFumetto, FUMETTO_MS);
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
