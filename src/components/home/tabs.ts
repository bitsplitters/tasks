/*
 * I tab della home, per i video in apertura e per la demo: il modello ARIA dei tab (WAI-ARIA APG, attivazione
 * automatica), col clic e coi tasti freccia, Home e Fine, e il pannello di ogni tab mostrato o nascosto. Non sa cosa
 * c'è nei pannelli: dice a chi lo usa quale tab ha scelto chi guarda.
 */
export interface Tab {
  /** Mostra il tab e il suo pannello senza chiamare `scelta`: per i cambi che non vengono da chi guarda. */
  mostra(chiave: string): void;
}

/** Dove porta ogni tasto, dal tab i fra n. */
const DOVE: Record<string, (i: number, n: number) => number> = {
  ArrowRight: (i, n) => (i + 1) % n,
  ArrowLeft: (i, n) => (i - 1 + n) % n,
  Home: () => 0,
  End: (_, n) => n - 1,
};

/**
 * Collega i tab di `lista` (gli elementi role="tab", con data-tab e aria-controls) ai loro pannelli. `scelta` riceve
 * la chiave del tab scelto da chi guarda, col clic o coi tasti, anche quando è quello già aperto.
 */
export function collegaTab(lista: HTMLElement, scelta: (chiave: string) => void): Tab {
  const tab = [...lista.querySelectorAll<HTMLElement>('[role="tab"]')];
  const mostra = (chiave: string) => {
    for (const t of tab) {
      const si = t.dataset.tab === chiave;
      t.setAttribute('aria-selected', String(si));
      t.tabIndex = si ? 0 : -1;
      const pannello = document.getElementById(t.getAttribute('aria-controls') ?? '');
      if (pannello) pannello.hidden = !si;
    }
  };
  const scegli = (t: HTMLElement) => {
    const chiave = t.dataset.tab ?? '';
    mostra(chiave);
    scelta(chiave);
  };
  lista.addEventListener('click', (e) => {
    const t = (e.target as Element).closest<HTMLElement>('[role="tab"]');
    if (t) scegli(t);
  });
  lista.addEventListener('keydown', (e) => {
    const i = tab.indexOf(e.target as HTMLElement);
    const dove = DOVE[e.key];
    if (i < 0 || !dove) return;
    e.preventDefault();
    const t = tab[dove(i, tab.length)];
    t.focus();
    scegli(t);
  });
  return { mostra };
}
