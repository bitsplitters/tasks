/*
 * Il selettore dell'owner e dei tag nel pannello dell'Activity della demo (piano 2026-11-15-demo-fedele, compito 11,
 * nel repo team-tasks-manager), come PeoplePicker.tsx della pagina: le scelte in alto come pillole piene con la ×, la
 * ricerca su persone e ruoli del server, sotto, prima di scrivere, chi è nell'Activity come pillole vuote col +. Le
 * persone le cerca il bot dopo una pausa nella scrittura (Bot.searchPeople); nel frattempo il selettore mostra quelle
 * che la pagina conosce e restringe da sé l'ultima risposta. Le funzioni pure danno la vista e l'HTML; montaPersone la
 * tiene viva nel DOM.
 */
import { escape } from '../markdown.ts';
import { NELL_ACTIVITY, PERSONE, SAM } from '../modello.ts';
import type { Persona, Stato } from '../modello.ts';
import { tagDelTesto } from '../regole.ts';
import type { Menzione } from '../regole.ts';
import { testo } from '../testi.ts';
import { chiave, senzaAccenti } from './comune.ts';

/** Owner: più persone o un ruolo, mai le due cose. Tag: persone e ruoli insieme, al più 25. */
export type Modo = 'owner' | 'tag';

/** I tag di un task, come MAX_TAGS di PeopleAction.tsx. */
const MAX_TAG = 25;

/** La pausa nella scrittura prima che il selettore chieda le persone al bot (SEARCH_PAUSE_MS). */
const PAUSA_MS = 300;

/** La risposta di una ricerca, col testo a cui ha risposto. */
export interface Trovate {
  testo: string;
  persone: readonly Persona[];
}

/** Una pillola: la menzione, il nome come lo scrive la pagina, il data-k, l'avatar di una persona. */
export interface Voce {
  m: Menzione;
  nome: string;
  chiave: string;
  persona?: Persona;
}

export interface VistaDellePersone {
  scelte: Voce[];
  pieno: boolean;
  nota: string | null;
  suggerite: Voce[];
}

const chiaveDi = (m: Menzione) => `${m.ruolo ? 'r' : 'p'}:${m.id}`;

function massimo(modo: Modo): number | undefined {
  return modo === 'tag' ? MAX_TAG : undefined;
}

/**
 * Le persone che la pagina conosce, nell'ordine del selettore: chi è nell'Activity, chi le ricerche hanno trovato, chi
 * la lista nomina (ApiBot.directory: gli owner, le persone dei ruoli di TTM che sono owner, i tag). Una volta ciascuna.
 */
export function personeNote(stato: Stato, trovati: readonly Persona[] = []): Persona[] {
  const nominate: string[] = [];
  for (const t of stato.lista.tasks) {
    const owner = t.owner;
    if (owner?.tipo === 'persona') nominate.push(owner.id);
    else if (owner) nominate.push(...(stato.ruoli.find((r) => r.id === owner.id && r.diTtm)?.membri ?? []));
    for (const m of tagDelTesto(t.testo)) if (!m.ruolo) nominate.push(m.id);
  }
  const fuori = new Map<string, Persona>();
  const ids = [...NELL_ACTIVITY, ...trovati.map((p) => p.id), ...nominate];
  for (const id of ids) {
    const p = PERSONE.find((x) => x.id === id);
    if (p && !fuori.has(id)) fuori.set(id, p);
  }
  return [...fuori.values()];
}

/** La ricerca del bot, che Discord fa per prefisso: il nome o lo username che cominciano col testo, al più 25. */
export function cercaPersone(scritto: string): Persona[] {
  const q = senzaAccenti(scritto.trim());
  if (q === '') return [];
  return PERSONE.filter((p) => senzaAccenti(p.nome).startsWith(q) || senzaAccenti(p.username).startsWith(q))
    .slice(0, 25);
}

/** La scelta col nuovo: un ruolo prende il posto delle persone, una persona quello del ruolo (PeoplePicker.add). */
export function aggiungi(modo: Modo, scelte: readonly Menzione[], m: Menzione): Menzione[] {
  const max = massimo(modo);
  const giaScelta = scelte.some((s) => chiaveDi(s) === chiaveDi(m));
  if (giaScelta || (max !== undefined && scelte.length >= max)) return [...scelte];
  if (modo === 'tag') return [...scelte, m];
  if (m.ruolo || scelte.some((s) => s.ruolo)) return [m];
  return [...scelte, m];
}

export function togli(scelte: readonly Menzione[], m: Menzione): Menzione[] {
  return scelte.filter((s) => chiaveDi(s) !== chiaveDi(m));
}

/** Le stesse persone e gli stessi ruoli, in qualunque ordine (sameMentions). */
export function stesseScelte(a: readonly Menzione[], b: readonly Menzione[]): boolean {
  if (a.length !== b.length) return false;
  const chiavi = new Set(a.map(chiaveDi));
  return b.every((m) => chiavi.has(chiaveDi(m)));
}

/** La pillola di una menzione: chi guarda è «(you)»; un ruolo ha la chiocciola, che @everyone ha già. */
function voce(stato: Stato, m: Menzione): Voce {
  const persona = m.ruolo ? undefined : PERSONE.find((p) => p.id === m.id);
  let nome: string;
  if (persona) nome = persona.id === SAM ? `${persona.nome} (${testo('activity.picker.you')})` : persona.nome;
  else {
    const suo = (m.ruolo ? stato.ruoli.find((r) => r.id === m.id)?.nome : undefined) ?? m.id;
    nome = suo.startsWith('@') ? suo : `@${suo}`;
  }
  return persona ? { m, nome, chiave: chiave(nome), persona } : { m, nome, chiave: chiave(nome) };
}

/**
 * Ciò che il selettore mostra (PeoplePicker): la risposta per questo testo mostra tutti quelli che ha trovato, anche
 * chi corrisponde per lo username; quella per un testo più corto si restringe col nome, finché non arriva la prossima.
 * Senza la risposta per questo testo, nessun risultato non vuol dire nessuno: la nota «Nobody matches» aspetta.
 */
export function vistaDellePersone(stato: Stato, modo: Modo, scelte: readonly Menzione[], scritto: string,
  trovate: Trovate | null, trovati: readonly Persona[] = []): VistaDellePersone {
  const max = massimo(modo);
  const pieno = max !== undefined && scelte.length >= max;
  const testoScritto = scritto.trim();
  const q = senzaAccenti(testoScritto);
  const risposta = trovate ? senzaAccenti(trovate.testo) : null;
  const corrisponde = (nome: string) => senzaAccenti(nome).includes(q);
  const cercate = trovate === null || risposta === null || !q.startsWith(risposta)
    ? []
    : risposta === q ? trovate.persone : trovate.persone.filter((p) => corrisponde(p.nome));
  const persone = new Map<string, Persona>();
  for (const p of personeNote(stato, trovati).filter((x) => corrisponde(x.nome))) persone.set(p.id, p);
  for (const p of cercate) if (!persone.has(p.id)) persone.set(p.id, p);
  const attesa = q !== '' && risposta !== q;
  const scelto = new Set(scelte.map(chiaveDi));
  const candidate: Menzione[] = q
    ? [
      ...[...persone.keys()].map((id) => ({ ruolo: false, id })),
      ...stato.ruoli.filter((r) => corrisponde(r.nome)).map((r) => ({ ruolo: true, id: r.id })),
    ]
    : NELL_ACTIVITY.map((id) => ({ ruolo: false, id }));
  const suggerite = candidate.filter((m) => !scelto.has(chiaveDi(m)));
  let nota: string | null = null;
  if (pieno) nota = testo('activity.picker.full');
  else if (!q && suggerite.length > 0) nota = testo('activity.picker.here');
  else if (q && !attesa && suggerite.length === 0) nota = testo('activity.picker.none', testoScritto);
  return {
    scelte: scelte.map((m) => voce(stato, m)),
    pieno,
    nota,
    suggerite: pieno ? [] : suggerite.map((m) => voce(stato, m)),
  };
}

function pillola(v: Voce, scelta: boolean): string {
  const k = `${scelta ? 'pc' : 'pk'}-${v.chiave}`;
  const etichetta = testo(scelta ? 'activity.picker.remove' : 'activity.picker.add', v.nome);
  const av = v.persona
    ? `<span class="sc-av" style="--av: ${v.persona.colore}" aria-hidden="true">${escape(v.persona.nome[0])}</span>`
    : '';
  const nome = `<span class="sc-pname">${escape(v.nome)}</span>`;
  const segno = `<span class="sc-pmark" aria-hidden="true">${scelta ? '×' : '+'}</span>`;
  return `<li><button type="button" class="sc-pill"${scelta ? ' data-chosen' : ''}${v.m.ruolo ? ' data-role' : ''} ` +
    `data-k="${k}" data-m="${chiaveDi(v.m)}" aria-label="${escape(etichetta)}">` +
    `${scelta ? av + nome + segno : segno + av + nome}</button></li>`;
}

/** Le scelte in alto, con la ×; niente se non ce n'è. */
export function htmlDelleScelte(v: VistaDellePersone): string {
  if (v.scelte.length === 0) return '';
  return `<ul class="sc-pills" data-kind="chosen">${v.scelte.map((x) => pillola(x, true)).join('')}</ul>`;
}

/** Sotto il campo: la nota, poi i suggerimenti col +. */
export function htmlDeiSuggerimenti(v: VistaDellePersone): string {
  const nota = v.nota === null ? '' : `<div class="sc-pnote">${escape(v.nota)}</div>`;
  const elenco = v.suggerite.length === 0
    ? ''
    : `<ul class="sc-pills" data-kind="suggested">${v.suggerite.map((x) => pillola(x, false)).join('')}</ul>`;
  return nota + elenco;
}

/** Chi le ricerche hanno trovato in questa pagina: la pagina lo ricorda, per i nomi delle scelte (ApiBot.found). */
const TROVATI = new Map<string, Persona>();

export interface Persone {
  scelte(): Menzione[];
  smonta(): void;
}

/**
 * Il selettore nel DOM. Le scelte e i suggerimenti si ridisegnano nei loro involucri: il campo resta, col suo testo e
 * il suo focus. Chi le ricerche hanno trovato entra fra le persone note quando le scelte cambiano, come la directory
 * che PeopleAction rilegge a ogni scelta. Con la tastiera, dopo un + o una × il focus torna al campo: la pillola
 * premuta si sposta e non c'è più.
 */
export function montaPersone(dove: HTMLElement, stato: Stato, modo: Modo, iniziali: readonly Menzione[],
  cambio: (scelte: Menzione[]) => void): Persone {
  let scelte = [...iniziali];
  let trovate: Trovate | null = null;
  let trovati = [...TROVATI.values()];
  let chiesto = '';
  let timer = 0;
  let vista: VistaDellePersone;
  const cerca = escape(testo('activity.picker.search'));
  dove.innerHTML = '<div class="sc-picker"><div class="sc-pparte"></div>' +
    `<input class="sc-pin" type="search" data-k="pk-search" placeholder="${cerca}" aria-label="${cerca}" ` +
    'autocomplete="off"><div class="sc-pparte"></div></div>';
  const [sopra, sotto] = [...dove.querySelectorAll<HTMLElement>('.sc-pparte')];
  const campo = dove.querySelector<HTMLInputElement>('[data-k="pk-search"]')!;

  function disegna(): void {
    vista = vistaDellePersone(stato, modo, scelte, campo.value, trovate, trovati);
    sopra.innerHTML = htmlDelleScelte(vista);
    sotto.innerHTML = htmlDeiSuggerimenti(vista);
    campo.disabled = vista.pieno;
  }

  /** Il testo cambiato: la ricerca di prima non parte, quella nuova dopo la pausa (l'effetto su `text`). */
  function scritto(): void {
    const t = campo.value.trim();
    if (t !== chiesto) {
      window.clearTimeout(timer);
      chiesto = t;
      if (t !== '') {
        timer = window.setTimeout(() => {
          const persone = cercaPersone(t);
          for (const p of persone) TROVATI.set(p.id, p);
          trovate = { testo: t, persone };
          disegna();
        }, PAUSA_MS);
      }
    }
    disegna();
  }

  function scegli(nuove: Menzione[]): void {
    scelte = nuove;
    trovati = [...TROVATI.values()];
    cambio([...scelte]);
  }

  function aggiungiQui(m: Menzione): void {
    if (vista.pieno || scelte.some((s) => chiaveDi(s) === chiaveDi(m))) return;
    scegli(aggiungi(modo, scelte, m));
    campo.value = '';
    scritto();
  }

  const alClic = (e: MouseEvent) => {
    const b = (e.target as Element).closest<HTMLButtonElement>('button.sc-pill');
    if (!b) return;
    const [tipo, id] = (b.dataset.m ?? '').split(':');
    const m = { ruolo: tipo === 'r', id };
    if (b.hasAttribute('data-chosen')) {
      scegli(togli(scelte, m));
      disegna();
    } else aggiungiQui(m);
    if (e.detail === 0 && !campo.disabled) campo.focus();
  };
  const alTasto = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && vista.suggerite.length > 0) {
      e.preventDefault();
      aggiungiQui(vista.suggerite[0].m);
    }
  };
  dove.addEventListener('click', alClic);
  campo.addEventListener('input', scritto);
  campo.addEventListener('keydown', alTasto);
  disegna();
  return {
    scelte: () => [...scelte],
    smonta() {
      window.clearTimeout(timer);
      dove.removeEventListener('click', alClic);
      campo.removeEventListener('input', scritto);
      campo.removeEventListener('keydown', alTasto);
    },
  };
}
