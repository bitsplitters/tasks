/*
 * Il menu a scelta singola di Discord nella demo (piano 2026-11-15-demo-fedele, §5; spec §3.5 e §6.3; nel repo
 * team-tasks-manager): il webhook da associare sotto i pulsanti, il mese nella modale del promemoria. Un clic sceglie e
 * chiude. Niente caselle né spunte, come nei menu veri (segnalazione dell'utente del 15/11): la voce scelta è in
 * grassetto bianco, le altre grigie. Sotto la lista si apre sopra il campo, come in fondo alla chat; nella modale
 * sotto. Lo decide il CSS.
 */
import { escape } from '../markdown.ts';
import { FRECCIA, chiave, inVista, nuovoNumero } from './comune.ts';

export interface Opzione {
  valore: string;
  testo: string;
}

export interface Scelta {
  valore(): string | null;
  /** Toglie gli ascoltatori, anche quello sul documento: chi monta il menu lo chiama prima di toglierlo. */
  smonta(): void;
}

/** Il menu spento, in una modale in sola lettura; l'etichetta è l'id del testo che dà il nome al campo. */
export interface Extra {
  spento?: boolean;
  etichetta?: string;
}

/**
 * Il campo e le voci col contratto del §5: `<k>-sel` il campo, `<k>-<prima parola del testo>` le voci (`wb-scrim`,
 * `m-month-november`). `n` tiene unici gli id. Senza una scelta il campo mostra il segnaposto.
 */
export function htmlDellaScelta(k: string, opzioni: readonly Opzione[], segnaposto: string, scelto: string | null,
  n: number, extra: Extra = {}): string {
  const lista = `ui-sc-${n}`;
  const voce = opzioni.find((o) => o.valore === scelto);
  const nome = extra.etichetta ? `aria-labelledby="${extra.etichetta}"` : `aria-label="${escape(segnaposto)}"`;
  const campo = `<div class="ui-scelta" data-k="${k}-sel" role="combobox" tabindex="0" aria-haspopup="listbox" ` +
    `aria-expanded="false" aria-controls="${lista}" ${nome}${extra.spento ? ' aria-disabled="true"' : ''}` +
    `${voce ? ' data-scelto' : ''}><span class="ui-sctesto">${escape(voce ? voce.testo : segnaposto)}</span>` +
    `${FRECCIA}</div>`;
  const voci = opzioni.map((o, i) => `<div class="ui-scvoce" data-k="${k}-${chiave(o.testo)}" role="option" ` +
    `id="${lista}-${i}" aria-selected="${o.valore === scelto}">${escape(o.testo)}</div>`).join('');
  return `${campo}<div class="ui-scmenu" id="${lista}" role="listbox">${voci}</div>`;
}

/**
 * Monta il menu in `dove`, che dà il prefisso dei data-k (`wb`, `m-month`). `scelta` arriva solo quando la scelta
 * cambia. Da tastiera: Invio, Spazio e le frecce aprono; le frecce, Inizio e Fine scorrono; Invio o Spazio scelgono;
 * Esc chiude senza arrivare alla modale intorno; Tab chiude e va avanti.
 */
export function montaScelta(dove: HTMLElement, opzioni: readonly Opzione[], segnaposto: string,
  alla: { scelta(valore: string): void }, iniziale: Extra & { scelto?: string | null } = {}): Scelta {
  let scelto = iniziale.scelto ?? null;
  dove.innerHTML = htmlDellaScelta(dove.dataset.k ?? '', opzioni, segnaposto, scelto, nuovoNumero(), iniziale);
  dove.hidden = false;
  const campo = dove.querySelector<HTMLElement>('.ui-scelta');
  const menu = dove.querySelector<HTMLElement>('.ui-scmenu');
  if (!campo || !menu) throw new Error('montaScelta: il menu non si è disegnato');
  const voci = [...menu.querySelectorAll<HTMLElement>('.ui-scvoce')];
  const ac = new AbortController();
  const { signal } = ac;
  let attiva = -1;

  const aperto = () => dove.hasAttribute('data-aperto');
  const evidenzia = (i: number, scorri = true) => {
    attiva = i;
    voci.forEach((v, j) => v.toggleAttribute('data-attiva', j === i));
    if (i < 0) {
      campo.removeAttribute('aria-activedescendant');
      return;
    }
    campo.setAttribute('aria-activedescendant', voci[i].id);
    if (scorri) inVista(menu, voci[i]);
  };
  const apri = () => {
    if (aperto() || iniziale.spento || voci.length === 0) return;
    dove.setAttribute('data-aperto', '');
    campo.setAttribute('aria-expanded', 'true');
    evidenzia(Math.max(0, opzioni.findIndex((o) => o.valore === scelto)));
  };
  const chiudi = () => {
    if (!aperto()) return;
    dove.removeAttribute('data-aperto');
    campo.setAttribute('aria-expanded', 'false');
    evidenzia(-1);
  };
  const scegli = (i: number) => {
    chiudi();
    const o = opzioni[i];
    if (!o || o.valore === scelto) return;
    scelto = o.valore;
    voci.forEach((v, j) => v.setAttribute('aria-selected', String(j === i)));
    campo.setAttribute('data-scelto', '');
    const testo = campo.querySelector('.ui-sctesto');
    if (testo) testo.textContent = o.testo;
    alla.scelta(o.valore);
  };

  campo.addEventListener('click', () => (aperto() ? chiudi() : apri()), { signal });
  campo.addEventListener('keydown', (e) => {
    if (iniziale.spento) return;
    const ultima = voci.length - 1;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!aperto()) apri();
        else evidenzia(Math.min(ultima, Math.max(0, attiva + (e.key === 'ArrowDown' ? 1 : -1))));
        break;
      case 'Home':
      case 'End':
        if (!aperto()) return;
        e.preventDefault();
        evidenzia(e.key === 'Home' ? 0 : ultima);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (aperto() && attiva >= 0) scegli(attiva);
        else apri();
        break;
      case 'Escape':
        if (!aperto()) return;
        e.preventDefault();
        e.stopPropagation();
        chiudi();
        break;
      case 'Tab':
        chiudi();
        break;
    }
  }, { signal });
  // Il focus resta sul campo: un clic su una voce non lo porta via (il browser lo sposta col mousedown).
  menu.addEventListener('mousedown', (e) => e.preventDefault(), { signal });
  menu.addEventListener('click', (e) => {
    const voce = (e.target as Element).closest<HTMLElement>('.ui-scvoce');
    if (voce) scegli(voci.indexOf(voce));
  }, { signal });
  menu.addEventListener('pointermove', (e) => {
    const voce = (e.target as Element).closest<HTMLElement>('.ui-scvoce');
    if (voce && !voce.hasAttribute('data-attiva')) evidenzia(voci.indexOf(voce), false);
  }, { signal });
  document.addEventListener('pointerdown', (e) => {
    if (!dove.contains(e.target as Node)) chiudi();
  }, { signal, capture: true });
  dove.addEventListener('focusout', (e) => {
    if (!dove.contains(e.relatedTarget as Node | null)) chiudi();
  }, { signal });

  return {
    valore: () => scelto,
    smonta: () => {
      chiudi();
      ac.abort();
    },
  };
}
