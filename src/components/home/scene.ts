/**
 * La scena dell'apertura (spec della home, §4.2 e §4.3). Avanza con una tabella di passi: ognuno cambia classi sulla
 * radice, e il CSS fa le transizioni. Parte una volta sola, quando la scena si vede; si ferma se la scheda del browser
 * va nascosta e riprende dal punto in cui era; il comando la mette in pausa, la riprende o la fa ripartire.
 *
 * Lo script inline di HeroScene ha già scelto: con `data-start` la scena è al primo fotogramma e aspetta di essere
 * vista; senza, chi guarda ha chiesto meno animazioni, e resta sull'ultimo finché non preme il comando.
 */

type Modo = 'playing' | 'paused' | 'done' | 'static';
type Passo = { t: number; fai: () => void };

/** Le classi che dicono lo stato della scena: al primo fotogramma non ce n'è nessuna. */
const STATI = [
  'is-open', 'is-ticked', 'is-panel', 'tab-owner', 'is-picked',
  'has-owner', 'tab-rem', 'is-filled', 'has-reminder', 'can-save',
];

const ETICHETTE: Record<Modo, string> = {
  playing: 'Pause the animation',
  paused: 'Play the animation',
  done: 'Replay the animation',
  static: 'Play the animation',
};

export function avviaScena(): void {
  const scena = document.querySelector<HTMLElement>('[data-scene]');
  const figura = scena?.closest('figure');
  const comando = figura?.querySelector<HTMLButtonElement>('.sc-ctl');
  const etichetta = comando?.querySelector<HTMLElement>('[data-label]');
  const finestra = scena?.querySelector<HTMLElement>('.sc-window');
  const tocco = scena?.querySelector<HTMLElement>('.sc-tap');
  if (!scena || !figura || !comando || !etichetta || !finestra || !tocco) return;
  const tappe = Array.from(figura.querySelectorAll<HTMLElement>('.sc-steps li'));
  const el = (k: string) => scena.querySelector<HTMLElement>(`[data-k="${k}"]`) as HTMLElement;

  // I campi del promemoria come li propone la pagina vera: dopodomani, e il fuso del dispositivo di chi guarda.
  const dopodomani = new Date();
  dopodomani.setDate(dopodomani.getDate() + 2);
  const data = scena.querySelector('[data-v="date"]');
  const formato: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
  if (data) data.textContent = dopodomani.toLocaleDateString('en-GB', formato);
  let fuso = 'UTC';
  try {
    fuso = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    // resta UTC
  }
  scena.querySelectorAll('[data-v="zone"]').forEach((n) => { n.textContent = fuso; });

  const accendi = (n: number) => tappe.forEach((t, i) => t.classList.toggle('is-lit', i < n));
  const con = (...c: string[]) => scena.classList.add(...c);
  const senza = (...c: string[]) => scena.classList.remove(...c);

  const vaiA = (bersaglio: HTMLElement) => {
    const s = scena.getBoundingClientRect();
    const b = bersaglio.getBoundingClientRect();
    scena.style.setProperty('--cx', `${b.left - s.left + b.width * 0.55}px`);
    scena.style.setProperty('--cy', `${b.top - s.top + b.height * 0.6}px`);
  };
  const premi = (bersaglio: HTMLElement) => {
    tocco.classList.remove('is-on');
    void tocco.offsetWidth;
    tocco.classList.add('is-on');
    bersaglio.classList.add('is-press');
    window.setTimeout(() => bersaglio.classList.remove('is-press'), 180);
  };
  const lampeggia = (bersaglio: HTMLElement) => {
    bersaglio.classList.add('is-flash');
    window.setTimeout(() => bersaglio.classList.remove('is-flash'), 450);
  };
  /**
   * La finestra si apre dal rettangolo del pulsante: il ritaglio di partenza è il pulsante, quello d'arrivo è tutta.
   * Il ritaglio di partenza si applica senza transizione, e solo sulla finestra: spegnere le transizioni di tutta la
   * scena farebbe ripartire il cerchio del tocco, che a 2,3 s è ancora a metà.
   */
  const apri = () => {
    const f = finestra.getBoundingClientRect();
    const b = el('act').getBoundingClientRect();
    const px = (v: number) => `${Math.max(0, v)}px`;
    finestra.style.setProperty('--ft', px(b.top - f.top));
    finestra.style.setProperty('--fr', px(f.right - b.right));
    finestra.style.setProperty('--fb', px(f.bottom - b.bottom));
    finestra.style.setProperty('--fl', px(f.left - b.left));
    finestra.style.transition = 'none';
    void finestra.offsetWidth;
    finestra.style.transition = '';
    con('is-open');
  };

  let stato: 'idle' | Modo = 'idle';
  let indice = 0;
  let trascorso = 0;
  let ripresa = 0;
  let timer = 0;
  let sospesaDallaScheda = false;

  const mostra = (m: Modo) => {
    stato = m;
    comando.dataset.mode = m;
    etichetta.textContent = ETICHETTE[m];
    comando.title = ETICHETTE[m];
    comando.hidden = false;
    scena.classList.toggle('is-playing', m === 'playing' || m === 'paused');
  };

  // I tempi della spec (§4.2), con gli spostamenti del cursore fra un tocco e l'altro.
  const PASSI: Passo[] = [
    { t: 900, fai: () => vaiA(el('act')) },
    { t: 2000, fai: () => { premi(el('act')); accendi(1); } },
    { t: 2300, fai: apri },
    { t: 3300, fai: () => vaiA(el('cb2')) },
    { t: 4000, fai: () => { premi(el('cb2')); con('is-ticked'); accendi(2); } },
    { t: 5200, fai: () => vaiA(el('t3')) },
    { t: 6000, fai: () => { premi(el('t3')); con('is-panel'); accendi(3); } },
    { t: 6600, fai: () => vaiA(el('p-owner')) },
    { t: 7200, fai: () => { premi(el('p-owner')); con('tab-owner'); } },
    { t: 7600, fai: () => vaiA(el('mia')) },
    { t: 8200, fai: () => { premi(el('mia')); con('is-picked', 'can-save'); } },
    { t: 8400, fai: () => vaiA(el('save')) },
    {
      t: 9000,
      fai: () => {
        premi(el('save'));
        senza('tab-owner', 'is-picked', 'can-save');
        con('has-owner');
        lampeggia(el('task3'));
      },
    },
    { t: 9600, fai: () => vaiA(el('p-rem')) },
    { t: 10200, fai: () => { premi(el('p-rem')); con('tab-rem'); } },
    { t: 10400, fai: () => con('is-filled') },
    { t: 11400, fai: () => { con('can-save'); vaiA(el('save')); } },
    {
      t: 12000,
      fai: () => {
        premi(el('save'));
        senza('tab-rem', 'is-filled', 'can-save');
        con('has-reminder');
        lampeggia(el('task3'));
      },
    },
    { t: 12500, fai: () => vaiA(el('close')) },
    { t: 13000, fai: () => { premi(el('close')); senza('is-panel'); } },
    { t: 13500, fai: () => mostra('done') },
  ];

  const prossimo = () => {
    if (indice >= PASSI.length) return;
    const attesa = Math.max(0, PASSI[indice].t - (trascorso + performance.now() - ripresa));
    timer = window.setTimeout(() => {
      const passo = PASSI[indice];
      indice += 1;
      passo.fai();
      if (stato === 'playing') prossimo();
    }, attesa);
  };
  const riprendi = () => {
    ripresa = performance.now();
    mostra('playing');
    prossimo();
  };
  const sospendi = () => {
    window.clearTimeout(timer);
    trascorso += performance.now() - ripresa;
    mostra('paused');
  };
  /** Dal primo fotogramma: senza transizioni all'indietro, col cursore in basso a destra. */
  const daCapo = () => {
    window.clearTimeout(timer);
    scena.classList.add('sc-noanim');
    senza(...STATI);
    accendi(0);
    const s = scena.getBoundingClientRect();
    scena.style.setProperty('--cx', `${s.width * 0.86}px`);
    scena.style.setProperty('--cy', `${s.height * 0.88}px`);
    void scena.offsetWidth;
    scena.classList.remove('sc-noanim');
    indice = 0;
    trascorso = 0;
    riprendi();
  };

  comando.addEventListener('click', () => {
    sospesaDallaScheda = false;
    if (stato === 'playing') sospendi();
    else if (stato === 'paused') riprendi();
    else daCapo();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden && stato === 'playing') {
      sospendi();
      sospesaDallaScheda = true;
    } else if (!document.hidden && sospesaDallaScheda && stato === 'paused') {
      sospesaDallaScheda = false;
      riprendi();
    }
  });

  if (!scena.hasAttribute('data-start')) {
    mostra('static');
    return;
  }
  const osservatore = new IntersectionObserver(
    (voci) => {
      if (stato === 'idle' && voci.some((v) => v.isIntersecting)) {
        osservatore.disconnect();
        daCapo();
      }
    },
    { threshold: 0.4 },
  );
  osservatore.observe(scena);
}
