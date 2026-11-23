/*
 * Il menu di menzioni di Discord, quello di Owner e Tag nel canale (piano 2026-11-15-demo-fedele, §5; spec §4.1 e
 * §4.2; nel repo team-tasks-manager), com'è nelle schermate dell'utente (owner-menu.png, owner-ruolo.png in
 * Desktop\ttm). L'elenco si apre sopra il campo; una persona ha l'avatar, il nome e lo username, un ruolo lo scudo, il
 * nome e quanti membri ha; ogni riga ha la casella. Un clic sceglie o toglie e il menu resta aperto; scrivere filtra.
 * Un clic fuori, Esc o Tab lo chiudono: è lì che Discord manda la scelta al bot. Qui arriva `chiusura`.
 */
import { discord } from '../../scene-data.ts';
import { escape } from '../markdown.ts';
import { CROCE, FRECCIA, OMINO, SCUDO, SPUNTA, chiave, inVista, nuovoNumero, senzaAccenti } from './comune.ts';

/** Una riga del menu: `sotto` è lo username di una persona o quanti membri ha un ruolo. */
export interface Voce {
  id: string;
  ruolo: boolean;
  nome: string;
  sotto: string;
  colore?: string;
  /** Il pallino verde accanto all'avatar; senza, il cerchio grigio di chi non è in linea. */
  online?: boolean;
}

export interface Menzioni {
  scelte(): string[];
  /** Rimette le etichette di prima senza avvisare: il bot ha rifiutato la scelta (tasklist.slct.owner.mixed.error). */
  ripristina(scelte: readonly string[]): void;
  /** Toglie gli ascoltatori, anche quello sul documento: chi monta il menu lo chiama prima di toglierlo. */
  smonta(): void;
}

/** Le righe che restano scrivendo: il nome, o lo username di una persona, che comincia così. */
export function filtraVoci(voci: readonly Voce[], testo: string): Voce[] {
  const cerca = senzaAccenti(testo.trim());
  if (!cerca) return [...voci];
  const comincia = (s: string) => senzaAccenti(s).startsWith(cerca);
  return voci.filter((v) => comincia(v.nome) || (!v.ruolo && comincia(v.sotto)));
}

const avatar = (voce: Voce, stato: string) =>
  `<span class="sc-av" style="--av:${voce.colore ?? 'var(--dc-blurple)'}">${escape(voce.nome.slice(0, 1))}${stato}</span>`;

/** Una riga, col contratto del §5: `sub-<nome>` (`sub-mia`, `sub-coaches`, `sub-ttm1`). */
export function htmlDellaVoce(voce: Voce, scelta: boolean, id: string): string {
  const figura = voce.ruolo
    ? `<span class="ui-mzfig">${SCUDO}</span>`
    : avatar(voce, `<span class="ui-stato"${voce.online ? ' data-on' : ''}></span>`);
  const sotto = voce.ruolo ? `${OMINO} ${escape(voce.sotto)}` : escape(voce.sotto);
  return `<div class="ui-mzvoce" data-k="sub-${chiave(voce.nome)}" role="option" id="${id}" ` +
    `aria-selected="${scelta}">${figura}<span class="ui-mztesto"><span class="ui-mznome">${escape(voce.nome)}</span> ` +
    `<span class="ui-mzsotto">${sotto}</span></span><span class="ui-cb">${SPUNTA}</span></div>`;
}

/** L'etichetta di una scelta nel campo, con la × che la toglie: `tag-<nome>`, `tagx-<nome>`. */
export function htmlDellEtichetta(voce: Voce): string {
  const k = chiave(voce.nome);
  return `<span class="ui-mztag" data-k="tag-${k}">${voce.ruolo ? SCUDO : avatar(voce, '')}` +
    `<span class="ui-mztn">${escape(voce.nome)}</span><button type="button" class="ui-mztx" data-k="tagx-${k}" ` +
    `aria-label="${escape(discord().togli(voce.nome))}" tabindex="-1">${CROCE}</button></span>`;
}

/** Le stesse scelte, in qualunque ordine: riaprire e richiudere senza cambiare nulla non manda niente. */
const uguali = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((x) => b.includes(x));

/**
 * Monta il menu in `dove` (il posto `sub` sotto i pulsanti) con le `scelte` di partenza, gli id nell'ordine in cui le
 * etichette compaiono. Da tastiera: le frecce aprono e scorrono, Invio sceglie o toglie, Backspace a campo vuoto toglie
 * l'ultima etichetta, Esc e Tab chiudono. `chiusura` arriva solo se la scelta è cambiata: quando il menu si chiude
 * o dalla × di un'etichetta a menu chiuso.
 */
export function montaMenzioni(dove: HTMLElement, voci: readonly Voce[], scelte: readonly string[], segnaposto: string,
  alla: { chiusura(scelte: string[]): void }): Menzioni {
  const lista = `ui-mz${nuovoNumero()}`;
  const nome = escape(segnaposto);
  dove.innerHTML = `<div class="ui-mzcampo" data-k="sub-sel"><input type="text" class="ui-mzcerca" ` +
    `data-k="sub-search" role="combobox" aria-expanded="false" aria-controls="${lista}" aria-autocomplete="list" ` +
    `aria-label="${nome}" autocomplete="off" spellcheck="false">${FRECCIA}</div>` +
    `<div class="ui-mzmenu" id="${lista}" role="listbox" aria-multiselectable="true" aria-label="${nome}"></div>`;
  dove.hidden = false;
  const campo = dove.querySelector<HTMLElement>('.ui-mzcampo');
  const cerca = dove.querySelector<HTMLInputElement>('.ui-mzcerca');
  const menu = dove.querySelector<HTMLElement>('.ui-mzmenu');
  if (!campo || !cerca || !menu) throw new Error('montaMenzioni: il menu non si è disegnato');
  const perId = new Map(voci.map((v) => [v.id, v]));
  const ac = new AbortController();
  const { signal } = ac;
  let scelti = scelte.filter((id) => perId.has(id));
  let prima = [...scelti];
  let mostrate: Voce[] = [];
  let attiva = -1;

  const aperto = () => dove.hasAttribute('data-aperto');
  const righe = () => [...menu.querySelectorAll<HTMLElement>('.ui-mzvoce')];
  const disegnaEtichette = () => {
    campo.querySelectorAll('.ui-mztag').forEach((t) => t.remove());
    const html = scelti.map((id) => perId.get(id)).filter((v): v is Voce => v !== undefined).map(htmlDellEtichetta);
    cerca.insertAdjacentHTML('beforebegin', html.join(''));
    campo.toggleAttribute('data-pieno', scelti.length > 0);
    cerca.placeholder = scelti.length ? '' : segnaposto;
  };
  const evidenzia = (i: number, scorri = true) => {
    attiva = i;
    const tutte = righe();
    tutte.forEach((r, j) => r.toggleAttribute('data-attiva', j === i));
    const riga = tutte[i];
    if (!riga) {
      cerca.removeAttribute('aria-activedescendant');
      return;
    }
    cerca.setAttribute('aria-activedescendant', riga.id);
    if (scorri) inVista(menu, riga);
  };
  const disegnaVoci = () => {
    mostrate = filtraVoci(voci, cerca.value);
    menu.innerHTML = mostrate.length
      ? mostrate.map((v, i) => htmlDellaVoce(v, scelti.includes(v.id), `${lista}-${i}`)).join('')
      : `<div class="ui-mzvuoto">${discord().nessuno}</div>`;
    evidenzia(cerca.value.trim() && mostrate.length ? 0 : -1);
  };
  const apri = () => {
    if (aperto()) return;
    prima = [...scelti];
    dove.setAttribute('data-aperto', '');
    cerca.setAttribute('aria-expanded', 'true');
    disegnaVoci();
  };
  const chiudi = () => {
    if (!aperto()) return;
    dove.removeAttribute('data-aperto');
    cerca.setAttribute('aria-expanded', 'false');
    cerca.value = '';
    evidenzia(-1);
    if (!uguali(prima, scelti)) alla.chiusura([...scelti]);
  };
  /** Sceglie o toglie una voce; a menu aperto le caselle si aggiornano sul posto, senza perdere lo scorrimento. */
  const cambia = (id: string) => {
    scelti = scelti.includes(id) ? scelti.filter((x) => x !== id) : [...scelti, id];
    disegnaEtichette();
    righe().forEach((r, j) => r.setAttribute('aria-selected', String(scelti.includes(mostrate[j]?.id ?? ''))));
  };
  const togli = (id: string) => {
    if (aperto()) {
      cambia(id);
      return;
    }
    prima = [...scelti];
    cambia(id);
    if (!uguali(prima, scelti)) alla.chiusura([...scelti]);
  };

  // Il focus resta nel campo di ricerca: un clic su un'etichetta, sulla sua ×, sulla freccia o su una riga non lo
  // porta via (il browser lo sposta col mousedown). Così il menu non si chiude per sbaglio.
  campo.addEventListener('mousedown', (e) => {
    if (e.target !== cerca) e.preventDefault();
  }, { signal });
  campo.addEventListener('click', (e) => {
    const x = (e.target as Element).closest('.ui-mztx');
    if (x) {
      const i = [...campo.querySelectorAll('.ui-mztx')].indexOf(x);
      if (scelti[i]) togli(scelti[i]);
      return;
    }
    if ((e.target as Element).closest('.sc-chev') && aperto()) {
      chiudi();
      return;
    }
    cerca.focus();
    apri();
  }, { signal });
  cerca.addEventListener('input', () => {
    if (aperto()) disegnaVoci();
    else apri();
  }, { signal });
  cerca.addEventListener('keydown', (e) => {
    const ultima = mostrate.length - 1;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        e.preventDefault();
        if (!aperto()) apri();
        else if (ultima >= 0) evidenzia(Math.min(ultima, Math.max(0, attiva + (e.key === 'ArrowDown' ? 1 : -1))));
        break;
      case 'Enter':
        e.preventDefault();
        if (!aperto()) apri();
        else if (mostrate[attiva]) cambia(mostrate[attiva].id);
        break;
      case 'Escape':
        if (!aperto()) return;
        e.preventDefault();
        e.stopPropagation();
        chiudi();
        break;
      case 'Backspace':
        if (cerca.value !== '' || scelti.length === 0) return;
        e.preventDefault();
        togli(scelti[scelti.length - 1]);
        break;
      case 'Tab':
        chiudi();
        break;
    }
  }, { signal });
  menu.addEventListener('mousedown', (e) => e.preventDefault(), { signal });
  menu.addEventListener('click', (e) => {
    const riga = (e.target as Element).closest<HTMLElement>('.ui-mzvoce');
    const voce = riga ? mostrate[righe().indexOf(riga)] : undefined;
    if (voce) cambia(voce.id);
  }, { signal });
  menu.addEventListener('pointermove', (e) => {
    const riga = (e.target as Element).closest<HTMLElement>('.ui-mzvoce');
    if (riga && !riga.hasAttribute('data-attiva')) evidenzia(righe().indexOf(riga), false);
  }, { signal });
  document.addEventListener('pointerdown', (e) => {
    if (!dove.contains(e.target as Node)) chiudi();
  }, { signal, capture: true });
  dove.addEventListener('focusout', (e) => {
    if (!dove.contains(e.relatedTarget as Node | null)) chiudi();
  }, { signal });

  disegnaEtichette();
  return {
    scelte: () => [...scelti],
    ripristina: (di) => {
      scelti = di.filter((id) => perId.has(id));
      prima = [...scelti];
      disegnaEtichette();
      if (aperto()) disegnaVoci();
    },
    smonta: () => {
      ac.abort();
      dove.removeAttribute('data-aperto');
    },
  };
}
