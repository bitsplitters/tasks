/*
 * I tooltip della demo (Demo.astro; spec 2026-11-15-home-video-e-demo-design.md, §5.4, nel repo team-tasks-manager):
 * il fumetto scuro di Discord sopra i pulsanti con data-tt, col nome, cosa fa e, sui pulsanti dei task, la nota sui
 * colori (i testi sono in scene-data.ts, TOOLTIP).
 *
 * Col mouse fermo sopra o col focus da tastiera compare dopo 500 ms; se ne è appena sparito un altro (meno di 300 ms
 * fa), subito, come in Discord lungo una fila di pulsanti. Sparisce quando il mouse esce, col blur, con Esc, quando
 * qualcosa scorre e quando si preme altrove. Sui telefoni compare tenendo premuto 500 ms, e il clic che segue non
 * fa l'azione. Ce n'è uno solo, in fondo al body, position fixed: sopra tutto.
 *
 * aria-describedby si mette appena arrivano il puntatore o il focus: un elemento nascosto, se citato per id, vale
 * comunque come descrizione.
 */
import { TOOLTIP } from './scene-data';

const ATTESA = 500;
const SUBITO = 300;
/** Lo spazio fra il pulsante e il fumetto (la freccia ci sta dentro) e quello dai bordi della finestra. */
const STACCO = 10;
const MARGINE = 8;

export interface Tooltips {
  /** Mostra subito il tooltip del pulsante: il tocco breve sui pulsanti che hanno solo quello. */
  mostra(b: HTMLElement): void;
  nascondi(): void;
}

export function avviaTooltip(radice: HTMLElement): Tooltips {
  const tt = document.createElement('div');
  tt.className = 'tt';
  tt.id = 'dm-tooltip';
  tt.setAttribute('role', 'tooltip');
  tt.hidden = true;
  const riga = (classe: string) => {
    const s = document.createElement('span');
    s.className = classe;
    return s;
  };
  const nome = riga('tt-name');
  const testo = riga('tt-text');
  const nota = riga('tt-note');
  tt.append(nome, testo, nota);
  document.body.append(tt);

  let corrente: HTMLElement | null = null;
  let timer = 0;
  let premuto = 0;
  let chiusoAlle = -Infinity;
  /** Il clic che segue un tocco lungo non fa l'azione. */
  let sopprimi = false;

  const pulsante = (t: EventTarget | null) => {
    const b = t instanceof Element ? t.closest<HTMLElement>('[data-tt]') : null;
    return b && radice.contains(b) ? b : null;
  };

  function prepara(b: HTMLElement): void {
    if (corrente === b) return;
    corrente?.removeAttribute('aria-describedby');
    corrente = b;
    const voce = TOOLTIP[b.dataset.tt ?? ''];
    nome.textContent = voce?.nome ?? '';
    testo.textContent = voce?.testo ?? '';
    nota.textContent = voce?.nota ?? '';
    b.setAttribute('aria-describedby', tt.id);
  }

  /** Sopra il pulsante, centrato e dentro la finestra; sotto, se sopra non c'è spazio. La freccia segue il centro. */
  function mostra(b: HTMLElement): void {
    clearTimeout(timer);
    prepara(b);
    tt.hidden = false;
    const r = b.getBoundingClientRect();
    const w = tt.offsetWidth;
    const h = tt.offsetHeight;
    const sopra = r.top - h - STACCO >= MARGINE;
    const centro = r.left + r.width / 2;
    const left = Math.min(Math.max(MARGINE, centro - w / 2), document.documentElement.clientWidth - w - MARGINE);
    tt.dataset.side = sopra ? 'top' : 'bottom';
    tt.style.left = `${left}px`;
    tt.style.top = `${sopra ? r.top - h - STACCO : r.bottom + STACCO}px`;
    tt.style.setProperty('--ax', `${Math.min(Math.max(12, centro - left), w - 12)}px`);
  }

  function programma(b: HTMLElement): void {
    clearTimeout(timer);
    prepara(b);
    if (!tt.hidden || performance.now() - chiusoAlle < SUBITO) mostra(b);
    else timer = window.setTimeout(() => mostra(b), ATTESA);
  }

  function nascondi(): void {
    clearTimeout(timer);
    if (tt.hidden) return;
    tt.hidden = true;
    chiusoAlle = performance.now();
  }

  // il mouse (e la penna)
  radice.addEventListener('pointerover', (e) => {
    const b = pulsante(e.target);
    if (b && e.pointerType !== 'touch' && !b.contains(e.relatedTarget as Node | null)) programma(b);
  });
  radice.addEventListener('pointerout', (e) => {
    const b = pulsante(e.target);
    if (b && e.pointerType !== 'touch' && !b.contains(e.relatedTarget as Node | null)) nascondi();
  });
  // la tastiera: solo il focus visibile, così il tocco breve, che dà il focus al pulsante, non lo apre
  radice.addEventListener('focusin', (e) => {
    const b = pulsante(e.target);
    if (b?.matches(':focus-visible')) programma(b);
  });
  radice.addEventListener('focusout', (e) => {
    if (pulsante(e.target)) nascondi();
  });
  // premere altrove chiude; il tocco lungo apre
  document.addEventListener('pointerdown', (e) => {
    sopprimi = false;
    clearTimeout(premuto);
    const b = pulsante(e.target);
    if (b !== corrente) nascondi();
    if (b && e.pointerType === 'touch') {
      premuto = window.setTimeout(() => {
        mostra(b);
        sopprimi = true;
      }, ATTESA);
    }
  });
  const lascia = () => clearTimeout(premuto);
  document.addEventListener('pointerup', lascia);
  document.addEventListener('pointercancel', lascia);
  radice.addEventListener(
    'click',
    (e) => {
      if (!sopprimi) return;
      sopprimi = false;
      e.preventDefault();
      e.stopPropagation();
    },
    true,
  );
  // il menu del tasto lungo del browser
  radice.addEventListener('contextmenu', (e) => {
    if (pulsante(e.target)) e.preventDefault();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') nascondi();
  });
  addEventListener('scroll', nascondi, { capture: true, passive: true });

  return { mostra, nascondi };
}
