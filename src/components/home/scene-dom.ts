/*
 * Le funzioni che cambiano lo stato delle scene della home (ChannelScene, ActivityScene). disegnaLista riscrive la
 * lista da uno Stato della demo: le righe, le opzioni del selettore, la barra, i pulsanti spenti. Le altre scrivono
 * gli attributi data-* che scene.css disegna. Le usano la demo (demo.ts, demo/canale.ts, demo/activity.ts) e i
 * copioni dei video (src/video/render-*.ts).
 *
 * Non tengono stato: ogni chiamata dice com'è un pezzo della scena, da capo. Così un copione può ridisegnare
 * qualunque istante e la demo non deve ricordare cosa c'era prima.
 */
import { FRASE_SPUNTA, FRASI, MENU_SOTTO, fraseDelPannello, type Colore, type Tasto } from './scene-data';
import type { Stato } from './demo/modello.ts';
import { avanzamento, pulsantiAccesi } from './demo/regole.ts';
import { nomiDi, opzioniDelSelettore, righeDelCanale, righeDellActivity } from './demo/righe.ts';

export type Salvataggio = 'off' | 'on' | 'pending';
/** Cosa mostra l'area del pannello: il selettore delle persone (owner, tag) o i campi del promemoria. */
export type Vista = 'owner' | 'tag' | 'reminder';

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

/** L'HTML scritto per ultimo in ogni contenitore: lo stesso non si riscrive. */
const SCRITTO = new WeakMap<HTMLElement, string>();

/**
 * Il contenuto di un contenitore, riscritto se è cambiato. Se il focus era dentro torna sull'elemento nuovo con lo
 * stesso data-k: chi usa la tastiera non perde il posto a ogni spunta.
 */
function riscrivi(contenitore: HTMLElement, html: string): void {
  if (SCRITTO.get(contenitore) === html) return;
  const attivo = document.activeElement;
  const chiave = attivo instanceof HTMLElement && contenitore.contains(attivo) ? attivo.dataset.k : undefined;
  contenitore.innerHTML = html;
  SCRITTO.set(contenitore, html);
  if (chiave) k(contenitore, chiave)?.focus({ preventScroll: true });
}

/**
 * La lista dello stato nel canale (.sc-chan) o nella pagina dell'Activity (.sc-win): il titolo, le righe (righe.ts),
 * la barra. Nel canale anche le opzioni del selettore e i pulsanti spenti dove il bot li spegne (pulsantiAccesi); con
 * la lista nell'Activity resta «Join the Activity» al posto dei pulsanti, coi menu chiusi. Nella pagina rimette il
 * pannello sotto il suo task, perché una riga in più o in meno lo sposta.
 */
export function disegnaLista(radice: HTMLElement, stato: Stato): void {
  const nellaPagina = radice.matches('.sc-win');
  const nomi = nomiDi(stato);
  const titolo = radice.querySelector<HTMLElement>('.sc-title');
  if (titolo) titolo.textContent = stato.lista.titolo;
  const righe = radice.querySelector<HTMLElement>(nellaPagina ? '.sc-arows' : '.sc-rows');
  if (righe) riscrivi(righe, (nellaPagina ? righeDellActivity : righeDelCanale)(stato.lista, nomi));
  const pct = avanzamento(stato.lista);
  radice.querySelectorAll<HTMLElement>('[data-bar]').forEach((b) => {
    b.style.setProperty('--pct', `${pct}%`);
    attributo(b, 'data-empty', pct === 0 ? '' : null);
  });
  if (nellaPagina) {
    posizionaPannello(radice);
    return;
  }
  const menu = k(radice, 'menu');
  if (menu) riscrivi(menu, opzioniDelSelettore(stato.lista));
  const accesi = pulsantiAccesi(stato);
  radice.querySelectorAll<HTMLElement>('[data-k="sel"], [data-k^="b-"]').forEach((b) => {
    const nome = b.dataset.k === 'sel' ? 'sel' : (b.dataset.k ?? '').slice(2);
    b.setAttribute('aria-disabled', String(!accesi.has(nome)));
  });
  attributo(radice, 'data-inact', stato.inActivity ? '' : null);
  if (stato.inActivity) {
    apriSelettore(radice, false);
    menuSottoAperto(radice, false);
  }
}

/** Il menu del selettore aperto o chiuso. */
export function apriSelettore(chan: HTMLElement, aperto: boolean): void {
  attributo(chan, 'data-menu', aperto ? '' : null);
  k(chan, 'sel')?.setAttribute('aria-expanded', String(aperto));
}

/**
 * Il pulsante acceso della seconda riga, o nessuno (null): la frase del selettore e, con Owner, Tag o Webhook in blu,
 * il menu sotto i pulsanti con la sua frase, chiuso e senza scelte. Quello del webhook resta chiuso.
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
  k(chan, 'sub-sel')?.setAttribute('aria-disabled', String(tasto === 'webhook'));
  menuSottoAperto(chan, false);
  sceltaNelMenuSotto(chan, []);
}

/** Il menu delle persone sotto i pulsanti aperto o chiuso. */
export function menuSottoAperto(chan: HTMLElement, aperto: boolean): void {
  attributo(chan, 'data-subopen', aperto ? '' : null);
  k(chan, 'sub-sel')?.setAttribute('aria-expanded', String(aperto));
}

/** Le persone scelte nel menu sotto i pulsanti: le loro pillole nel selettore e la spunta nel menu. */
export function sceltaNelMenuSotto(chan: HTMLElement, ids: readonly string[]): void {
  attributo(chan, 'data-subpick', ids.length > 0 ? ids.join(' ') : null);
  chan.querySelectorAll<HTMLElement>('.sc-subchosen').forEach((c) => {
    const i = ids.indexOf(c.dataset.persona ?? '');
    c.hidden = i < 0;
    c.style.order = String(i);
  });
  chan.querySelectorAll<HTMLElement>('.sc-subopt').forEach((o) => {
    const scelta = ids.includes(o.dataset.persona ?? '');
    attributo(o, 'data-on', scelta ? '' : null);
    o.setAttribute('aria-pressed', String(scelta));
  });
}

/** La modale del promemoria aperta o chiusa. */
export function modale(chan: HTMLElement, aperta: boolean): void {
  attributo(chan, 'data-modal', aperta ? '' : null);
}

/** Il pannello aperto sul task id, da capo (pulsanti grigi, area vuota, Save spento), o chiuso (null). */
export function apriPannello(win: HTMLElement, id: string | null): void {
  attributo(win, 'data-panel', id);
  k(win, 'panel')?.setAttribute('aria-label', `Task ${id ?? ''}`);
  azzeraIlPannello(win);
  posizionaPannello(win);
}

/** I pulsanti del pannello grigi, l'area vuota, Save e Delete spenti: com'è all'apertura e dopo un salvataggio. */
export function azzeraIlPannello(win: HTMLElement): void {
  tastoDelPannello(win, null, null);
  vistaDelPannello(win, null);
  sceltaNelPannello(win, []);
  avvisoNelPannello(win, null);
  salva(win, 'off');
  eliminaAttivo(win, false);
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

/** Cosa mostra l'area del pannello: il selettore delle persone, i campi del promemoria (solo nel video) o niente. */
export function vistaDelPannello(win: HTMLElement, vista: Vista | null): void {
  attributo(win, 'data-view', vista);
}

/**
 * Le persone scelte nel selettore del pannello: le loro pillole salgono fra le scelte nell'ordine della scelta;
 * spariscono da quelle di chi è nell'Activity.
 */
export function sceltaNelPannello(win: HTMLElement, ids: readonly string[]): void {
  attributo(win, 'data-picked', ids.length > 0 ? ids.join(' ') : null);
  win.querySelectorAll<HTMLElement>('[data-pick]').forEach((p) => {
    const i = ids.indexOf(p.dataset.pick ?? '');
    p.hidden = i < 0;
    p.style.order = String(i);
  });
  win.querySelectorAll<HTMLElement>('[data-sugg]').forEach((p) => {
    p.hidden = ids.includes(p.dataset.sugg ?? '');
  });
}

/** Il testo nell'elemento, con le parti fra «**» in grassetto, come il bot scrive il numero del task. */
export function scriviConGrassetto(el: HTMLElement, testo: string): void {
  el.replaceChildren(...testo.split('**').map((p, i) => {
    if (i % 2 === 0) return p;
    const b = document.createElement('strong');
    b.textContent = p;
    return b;
  }));
}

/**
 * Nell'area del pannello: l'avviso del bot nel riquadro bianco, con l'emoji del consiglio (NoticeBox), o la domanda
 * della modale del canale sopra Delete (Question), o niente.
 */
export function avvisoNelPannello(win: HTMLElement, tipo: 'notice' | 'question' | null, testo = ''): void {
  for (const t of ['notice', 'question'] as const) {
    const box = k(win, `p-${t}`);
    if (box) box.hidden = tipo !== t;
    const scritta = k(win, `p-${t}-text`);
    if (scritta) scriviConGrassetto(scritta, tipo === t ? testo : '');
  }
}

/** Save spento, acceso o in attesa (i tre puntini). */
export function salva(win: HTMLElement, stato: Salvataggio): void {
  win.dataset.save = stato;
  k(win, 'p-save')?.setAttribute('aria-disabled', String(stato !== 'on'));
}

/** Delete, in rosso al posto di Save: acceso solo se c'è qualcosa da togliere. */
export function eliminaAttivo(win: HTMLElement, attivo: boolean): void {
  k(win, 'p-delete')?.setAttribute('aria-disabled', String(!attivo));
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
