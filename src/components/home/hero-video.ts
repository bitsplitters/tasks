/*
 * I video in apertura (HeroVideo.astro; spec 2026-11-15-home-video-e-demo-design.md, §4.6 e §9, nel repo
 * team-tasks-manager). Sceglie la misura (la stretta sotto i 600 px di finestra) e la carica solo quando serve: alla
 * prima visita arriva un video solo. Lo fa partire quando la pagina ha finito di caricare e del riquadro se ne vede
 * almeno un quarto; alla fine passa all'altro tab, finché chi guarda non ne sceglie uno: da lì quel video va in loop.
 * Accende i tre passi col tempo del video e tiene il comando di pausa. Con meno movimento o col risparmio dati non
 * parte da solo: resta l'immagine ferma, col comando per avviarlo.
 */
import { PASSI, type Modo } from './scene-data';
import { collegaTab } from './tabs';

/** La soglia delle sorgenti strette, la stessa di <source media> in HeroVideo.astro. */
const STRETTO = matchMedia('(max-width: 599px)');

export function avviaVideo(): void {
  const radice = document.querySelector<HTMLElement>('[data-hv]');
  if (!radice) return;
  const lista = radice.querySelector<HTMLElement>('[role="tablist"]')!;
  const ctl = radice.querySelector<HTMLButtonElement>('[data-k="ctl"]')!;
  const etichetta = ctl.querySelector<HTMLElement>('[data-label]')!;
  const video: Record<Modo, HTMLVideoElement> = {
    channel: radice.querySelector<HTMLVideoElement>('#hv-p-channel video')!,
    activity: radice.querySelector<HTMLVideoElement>('#hv-p-activity video')!,
  };
  const passi = [...radice.querySelectorAll<HTMLElement>('.hv-steps li')];
  const rete = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;

  let modo: Modo = 'channel';
  /** Il passaggio automatico da un tab all'altro: si ferma alla prima scelta di chi guarda. */
  let auto = true;
  /** Fermo per scelta: col comando, o da subito con meno movimento e col risparmio dati. */
  let inPausa = matchMedia('(prefers-reduced-motion: reduce)').matches || rete?.saveData === true;
  let visibile = false;
  let caricata = document.readyState === 'complete';
  let giro = 0;

  /** I passi accesi fino al tempo del video; tutti sull'immagine ferma, che è l'ultimo fotogramma. */
  const accendiPassi = () => {
    const v = video[modo];
    const t = v.hidden ? Infinity : v.currentTime;
    passi.forEach((li, i) => li.classList.toggle('is-lit', t >= PASSI[modo][i]));
  };

  const comando = () => {
    ctl.dataset.mode = inPausa ? 'paused' : 'playing';
    etichetta.textContent = (inPausa ? etichetta.dataset.avvia : etichetta.dataset.pausa) ?? '';
  };

  /** Il video del tab scelto parte o si ferma secondo lo stato; la sorgente arriva al primo avvio. */
  const aggiorna = () => {
    const v = video[modo];
    if (!inPausa && visibile && caricata && !document.hidden) {
      const src = (STRETTO.matches ? v.dataset.narrow : v.dataset.wide) ?? '';
      if (v.getAttribute('src') !== src) v.src = src;
      v.loop = !auto;
      v.play().catch((e: unknown) => {
        // Il browser non lo lascia partire da solo: resta l'immagine ferma, col comando. Un AbortError è un play
        // interrotto da una pausa o da un cambio di sorgente: non dice niente.
        if (e instanceof DOMException && e.name === 'NotAllowedError') {
          inPausa = true;
          comando();
        }
      });
    } else if (!v.paused) {
      v.pause();
    }
    comando();
    accendiPassi();
  };

  const tabs = collegaTab(lista, (chiave) => {
    // Chi guarda ha scelto: niente più passaggio automatico, il video scelto in loop, da capo se è l'altro.
    auto = false;
    const nuovo = chiave as Modo;
    if (nuovo !== modo) {
      video[modo].pause();
      modo = nuovo;
      video[modo].currentTime = 0;
    }
    aggiorna();
  });

  for (const k of ['channel', 'activity'] as const) {
    const v = video[k];
    v.addEventListener('playing', () => {
      v.hidden = false;
      cancelAnimationFrame(giro);
      const passo = () => {
        accendiPassi();
        giro = requestAnimationFrame(passo);
      };
      giro = requestAnimationFrame(passo);
    });
    v.addEventListener('pause', () => {
      if (k !== modo) return;
      cancelAnimationFrame(giro);
      accendiPassi();
    });
    v.addEventListener('ended', () => {
      if (!auto || k !== modo) return;
      modo = k === 'channel' ? 'activity' : 'channel';
      tabs.mostra(modo);
      video[modo].currentTime = 0;
      aggiorna();
    });
  }

  ctl.hidden = false;
  ctl.addEventListener('click', () => {
    inPausa = !inPausa;
    // Chi preme play sta guardando il riquadro, anche se se ne vede meno di un quarto.
    if (!inPausa) visibile = true;
    aggiorna();
  });
  new IntersectionObserver(
    ([voce]) => {
      visibile = voce.intersectionRatio >= 0.25;
      aggiorna();
    },
    { threshold: [0, 0.25] },
  ).observe(radice);
  document.addEventListener('visibilitychange', aggiorna);
  if (!caricata) {
    addEventListener(
      'load',
      () => {
        caricata = true;
        aggiorna();
      },
      { once: true },
    );
  }
  // La misura cambia (il telefono ruotato, la finestra ristretta): via le sorgenti, si riparte con quella giusta.
  STRETTO.addEventListener('change', () => {
    for (const v of Object.values(video)) {
      v.pause();
      v.hidden = true;
      v.removeAttribute('src');
      v.load();
    }
    aggiorna();
  });
  comando();
}
