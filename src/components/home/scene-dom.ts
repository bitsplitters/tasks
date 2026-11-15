/*
 * Le funzioni che cambiano lo stato delle scene della home (ChannelScene, ActivityScene): scrivono gli attributi
 * data-* che scene.css disegna. Le usano la demo (demo.ts) e i copioni dei video (src/video/render-*.ts).
 *
 * Non tengono stato: ogni chiamata dice com'è un pezzo della scena, da capo. Così un copione può ridisegnare
 * qualunque istante e la demo non deve ricordare cosa c'era prima.
 */
import {
  FRASE_SPUNTA, FRASI, MENU_SOTTO, avanzamento, fraseDelPannello, type Colore, type Tasto,
} from './scene-data';

/** La lista com'è: cosa è fatto, se il task 3 ha Mia come owner, se ha il promemoria. */
export interface StatoLista {
  fatti: ReadonlySet<string>;
  owner: boolean;
  promemoria: boolean;
}

export type Salvataggio = 'off' | 'on' | 'pending';
export type Vista = 'owner' | 'reminder';

const k = (radice: ParentNode, chiave: string) => radice.querySelector<HTMLElement>(`[data-k="${chiave}"]`);
const attributo = (el: HTMLElement, nome: string, valore: string | null) =>
  valore === null ? el.removeAttribute(nome) : el.setAttribute(nome, valore);

/** Un px di Discord in px CSS: --u è registrata come lunghezza, quindi la si legge già calcolata. */
export function unita(el: Element): number {
  return parseFloat(getComputedStyle(el).getPropertyValue('--u')) || 1;
}

/** Il pulsante acceso fra quelli con l'attributo dato (uno alla volta), come aria-pressed: blu sì, rosso a metà. */
function accendi(radice: HTMLElement, attr: 'tasto' | 'ptasto', tasto: Tasto | null, colore: Colore | null): void {
  radice.querySelectorAll<HTMLElement>(`[data-${attr}]`).forEach((b) => {
    const acceso = tasto !== null && colore !== null && b.dataset[attr] === tasto;
    attributo(b, 'data-mode', acceso ? colore : null);
    b.setAttribute('aria-pressed', !acceso ? 'false' : colore === 'blue' ? 'true' : 'mixed');
  });
}

/**
 * La lista nel canale (.sc-chan) o nella pagina dell'Activity (.sc-win): le righe e le opzioni fatte, le caselle,
 * l'owner e il promemoria del task 3, la barra. Nell'Activity rimette anche il pannello sotto il suo task, perché
 * una riga in più o in meno (il promemoria) lo sposta.
 */
export function disegnaLista(lista: HTMLElement, s: StatoLista): void {
  lista.querySelectorAll<HTMLElement>('[data-task]').forEach((el) => {
    attributo(el, 'data-done', s.fatti.has(el.dataset.task ?? '') ? '' : null);
  });
  lista.querySelectorAll<HTMLElement>('.sc-acb').forEach((b) => {
    const id = b.closest<HTMLElement>('[data-task]')?.dataset.task ?? '';
    b.setAttribute('aria-pressed', String(s.fatti.has(id)));
  });
  attributo(lista, 'data-owner', s.owner ? '' : null);
  attributo(lista, 'data-reminder', s.promemoria ? '' : null);
  const pct = avanzamento(s.fatti);
  lista.querySelectorAll<HTMLElement>('[data-bar]').forEach((b) => {
    b.style.setProperty('--pct', `${pct}%`);
    attributo(b, 'data-empty', pct === 0 ? '' : null);
  });
  if (lista.matches('.sc-win')) posizionaPannello(lista);
}

/** Il menu del selettore aperto o chiuso. */
export function apriSelettore(chan: HTMLElement, aperto: boolean): void {
  attributo(chan, 'data-menu', aperto ? '' : null);
  k(chan, 'sel')?.setAttribute('aria-expanded', String(aperto));
}

/**
 * Il pulsante acceso della seconda riga, o nessuno (null): la frase del selettore e, con Owner, Tag o Webhook in blu,
 * il menu sotto i pulsanti con la sua frase, chiuso e senza scelte.
 */
export function tastoDelCanale(chan: HTMLElement, tasto: Tasto | null, colore: Colore | null): void {
  accendi(chan, 'tasto', tasto, colore);
  const sel = k(chan, 'sel-text');
  if (sel) sel.textContent = tasto && colore ? FRASI[tasto][colore] : FRASE_SPUNTA;
  const frase = tasto && colore === 'blue' ? MENU_SOTTO[tasto] : undefined;
  const sotto = k(chan, 'sub');
  if (sotto) sotto.hidden = frase === undefined;
  const testo = k(chan, 'sub-text');
  if (testo) testo.textContent = frase ?? '';
  menuSottoAperto(chan, false);
  sceltaNelMenuSotto(chan, null);
}

/** Il menu dell'owner sotto i pulsanti aperto o chiuso (solo nel video). */
export function menuSottoAperto(chan: HTMLElement, aperto: boolean): void {
  attributo(chan, 'data-subopen', aperto ? '' : null);
}

/** La persona scelta nel menu dell'owner, o nessuna. */
export function sceltaNelMenuSotto(chan: HTMLElement, id: string | null): void {
  attributo(chan, 'data-subpick', id);
}

/** La modale del promemoria aperta o chiusa. */
export function modale(chan: HTMLElement, aperta: boolean): void {
  attributo(chan, 'data-modal', aperta ? '' : null);
}

/** La lista è nell'Activity: nel canale al posto dei pulsanti resta «Join the Activity». */
export function inActivity(chan: HTMLElement, dentro: boolean): void {
  attributo(chan, 'data-inact', dentro ? '' : null);
  if (dentro) apriSelettore(chan, false);
}

/** Il pannello aperto sul task id, da capo (pulsanti grigi, area vuota, Save spento), o chiuso (null). */
export function apriPannello(win: HTMLElement, id: string | null): void {
  attributo(win, 'data-panel', id);
  k(win, 'panel')?.setAttribute('aria-label', `Task ${id ?? ''}`);
  tastoDelPannello(win, null, null);
  vistaDelPannello(win, null);
  sceltaNelPannello(win, null);
  salva(win, 'off');
  posizionaPannello(win);
}

/**
 * Il pannello sotto le righe visibili del suo task (TaskPanel.tsx, rowsOf e unionRect), le righe del task scelte, e
 * la colonna alta abbastanza da farlo scorrere fino in fondo: un elemento assoluto non allunga il suo contenitore.
 */
export function posizionaPannello(win: HTMLElement): void {
  const id = win.dataset.panel ?? null;
  win.querySelectorAll<HTMLElement>('.sc-arow').forEach((r) => {
    attributo(r, 'data-selected', id !== null && r.dataset.task === id ? '' : null);
  });
  const pannello = k(win, 'panel');
  const colonna = k(win, 'page-in');
  if (!pannello || !colonna) return;
  if (id === null) {
    pannello.style.removeProperty('top');
    colonna.style.removeProperty('min-height');
    return;
  }
  const righe = [...win.querySelectorAll<HTMLElement>(`.sc-arow[data-task="${id}"]`)].filter(
    (r) => r.getClientRects().length > 0,
  );
  if (righe.length === 0) return;
  const fondo = Math.max(...righe.map((r) => r.getBoundingClientRect().bottom));
  const top = fondo - colonna.getBoundingClientRect().top;
  const u = unita(win);
  pannello.style.top = `${top}px`;
  colonna.style.minHeight = `${top + 6 * u + pannello.offsetHeight + 16 * u}px`;
}

/** Il pulsante acceso del pannello, o nessuno: la frase in cima e, in rosso, Delete al posto di Save. */
export function tastoDelPannello(win: HTMLElement, tasto: Tasto | null, colore: Colore | null): void {
  accendi(win, 'ptasto', tasto, colore);
  const frase = k(win, 'p-phrase');
  if (frase) frase.textContent = tasto && colore ? FRASI[tasto][colore] : fraseDelPannello(win.dataset.panel ?? '');
  attributo(win, 'data-delete', colore === 'red' ? '' : null);
}

/** Cosa mostra l'area del pannello: il selettore delle persone, i campi del promemoria o niente (solo nel video). */
export function vistaDelPannello(win: HTMLElement, vista: Vista | null): void {
  attributo(win, 'data-view', vista);
}

/** La persona scelta nel selettore del pannello: la sua pillola sale fra le scelte. */
export function sceltaNelPannello(win: HTMLElement, id: string | null): void {
  attributo(win, 'data-picked', id);
}

/** Save spento, acceso o in attesa (i tre puntini). */
export function salva(win: HTMLElement, stato: Salvataggio): void {
  win.dataset.save = stato;
  k(win, 'p-save')?.setAttribute('aria-disabled', String(stato !== 'on'));
}

/**
 * Dove deve arrivare lo scorrimento della pagina perché il pannello si veda tutto, 16 px di margine compresi, come
 * scrollIntoView({ block: 'nearest' }): in giù se esce sotto, in su se esce sopra, altrimenti dov'è.
 */
export function scorrimentoPerIlPannello(win: HTMLElement): number {
  const pagina = k(win, 'page');
  const pannello = k(win, 'panel');
  if (!pagina) return 0;
  if (!pannello || win.dataset.panel === undefined) return pagina.scrollTop;
  const vista = pagina.getBoundingClientRect();
  const p = pannello.getBoundingClientRect();
  const margine = 16 * unita(win);
  if (p.bottom + margine > vista.bottom) return pagina.scrollTop + p.bottom + margine - vista.bottom;
  if (p.top - margine < vista.top) return Math.max(0, pagina.scrollTop + p.top - margine - vista.top);
  return pagina.scrollTop;
}

/** La chat del canale in fondo, come Discord all'arrivo di un messaggio. */
export function chatInBasso(scena: HTMLElement): void {
  scena.querySelectorAll<HTMLElement>('[data-k="feed"]').forEach((f) => {
    f.scrollTop = f.scrollHeight;
  });
}
