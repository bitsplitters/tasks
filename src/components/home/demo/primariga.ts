/*
 * La prima riga dell'Activity della demo (piano 2026-11-15-demo-fedele, compito 12; spec §8.2; nel repo
 * team-tasks-manager), come FirstRow e i dialoghi di activity/src/features/dialogs: Guide con le sue cinque pagine,
 * Edit the list in sola lettura, Clean the list e Reopen all veri, Exit col dialogo, perché Mia è nella sessione. Con
 * Save acceso nel pannello Edit, Clean e Reopen all aspettano (useTaskLock): sembrano spenti e un tocco dice perché,
 * senza chiudere il pannello. Le funzioni pure danno i testi e le regole; montaPrimaRiga tiene vivi i dialoghi.
 */
import { AVVISO_ILLUSTRATIVO } from '../scene-data.ts';
import { bloccaLaPrimaRiga } from '../scene-dom.ts';
import { MAX_VALUE_LENGTH, TITOLO_MAX } from './componenti.ts';
import type { Condiviso } from './condiviso.ts';
import { escape, markdown } from './markdown.ts';
import { ADESSO, NELL_ACTIVITY, PROPOSTO, SAM, fusoDi } from './modello.ts';
import type { Stato } from './modello.ts';
import { istanteDi, quandoDa, troppoVicina } from './quando.ts';
import type { Quando } from './quando.ts';
import { conTuttiRiaperti, nelCanale, pulisci, pulisciConfermato, riapri, testoDellaLista } from './regole.ts';
import type { Esito } from './regole.ts';
import { contestoDellActivity } from './righe.ts';
import { avviso, emoji, rispostaDellEsito, testo } from './testi.ts';
import { nuovoNumero, riquadroAvviso } from './ui/comune.ts';
import { apriDialogo, inAttesa } from './ui/dialogo.ts';
import type { Dialogo, Pulsante } from './ui/dialogo.ts';
import { montaQuando } from './ui/quando.ts';
import { stessaZona } from './zone.ts';

/** Le pagine della guida (GuideDialog, PAGES). */
export const PAGINE = 5;

/** I pulsanti della prima riga nel loro ordine, col nome di ognuno: la legenda della pagina 4 (FIRST_ROW). */
const LEGENDA: readonly (readonly [string, string])[] = [
  ['doc', 'activity.btn.guide'],
  ['edit', 'activity.btn.edit'],
  ['clean', 'activity.btn.clean'],
  ['reopen', 'activity.btn.reopen'],
  ['back', 'activity.btn.exit'],
];

/** Chi altro c'è nella sessione oltre a chi guarda: Mia. */
const ALTRI = NELL_ACTIVITY.filter((id) => id !== SAM).length;

const rifiuto = (chiave: string): Esito => ({ tipo: 'rifiuto', testo: { chiave } });

/** I testi del bot in fila, uno per blocco, come RichText con block dentro dialog-text. */
function blocchi(stato: Stato, testi: readonly string[]): string {
  const c = contestoDellActivity(stato);
  return `<div class="ui-dlgtesto">${testi.map((t) => `<div>${markdown(t, c)}</div>`).join('')}</div>`;
}

/**
 * Prima di aprire Clean the list o Reopen all (ApiBot.precheck): Clean ha i suoi testi per la lista senza completati
 * e per quella tutta completata, Reopen all il rifiuto del canale. Altrimenti la domanda del dialogo.
 */
export function primaDelDialogo(stato: Stato, quale: 'clean' | 'reopen'): Esito {
  if (quale === 'reopen') return riapri(stato);
  const esito = pulisci(stato);
  if (esito.tipo !== 'rifiuto') return esito;
  return rifiuto(esito.testo.chiave === 'tasklist.btn.clean.emptylist' ? 'activity.clean.all' : 'activity.clean.none');
}

/** Il fumetto su Edit, Clean e Reopen all col task `pos` in modifica (activity.lock.mine). */
export function bloccoDellaPrimaRiga(pos: string): string {
  return avviso(testo('activity.lock.mine', emoji('tip'), pos));
}

/** Il dialogo di Clean the list (CleanDialog): la domanda del canale col titolo della lista, poi la nota. */
export function corpoDellaPulizia(stato: Stato, completati: number): string {
  return blocchi(stato, [
    testo('tasklist.modal.clean.question', emoji('clean_blue'), completati, stato.lista.titolo),
    testo('activity.clean.note'),
  ]);
}

/** Il dialogo di Reopen all (ReopenDialog): la domanda; il suggerimento di New date finché i campi sono chiusi. */
export function corpoDellaRiapertura(stato: Stato, spuntati: number, suggerimento: boolean): string {
  const domanda = testo('tasklist.reopen.bridge.question', emoji('reopen_blue'), spuntati, stato.lista.titolo);
  return blocchi(stato, suggerimento ? [domanda, `-# ${testo('tasklist.reopen.bridge.date')}`] : [domanda]);
}

/** Il dialogo di Exit con altri nella sessione (ExitDialog): quanti sono, poi ciò che si fa solo nel canale. */
export function corpoDellUscita(stato: Stato): string {
  return blocchi(stato, [testo('activity.exit.question', ALTRI), testo('activity.exit.channel.only')]);
}

/** Il dialogo di Exit con altri nella sessione (ExitDialog): il titolo, il corpo, i due pulsanti. */
export function dialogoDellUscita(stato: Stato): Dialogo {
  return {
    titolo: testo('activity.exit.title'),
    corpo: corpoDellUscita(stato),
    piede: [
      { id: 'all', testo: testo('activity.exit.all'), stile: 'grigio' },
      { id: 'me', testo: testo('activity.exit.me'), stile: 'blu' },
    ],
  };
}

/**
 * Il dialogo di Edit the list in sola lettura (EditDialog; spec §8.2 e §8.3): l'avviso in cima, poi il titolo e il
 * testo della lista come li scrive la pagina, che non si scrivono. La riga del blocco non c'è: la lista non si blocca.
 */
export function corpoDellaModifica(stato: Stato, n: number): string {
  const campo = (k: string, etichetta: string, controllo: string) =>
    `<div class="sc-field"><label class="sc-flabel" for="${k}-${n}">${escape(testo(etichetta))}</label>` +
    `${controllo}</div>`;
  return riquadroAvviso(AVVISO_ILLUSTRATIVO) +
    campo('d-title', 'tasklist.modal.edit.txt.title.label', `<input class="sc-pin" type="text" id="d-title-${n}" ` +
      `data-k="d-title" value="${escape(stato.lista.titolo)}" maxlength="${TITOLO_MAX}" readonly>`) +
    campo('d-list', 'tasklist.modal.edit.txt.list.label', `<textarea class="sc-pin ui-edittesto" id="d-list-${n}" ` +
      `data-k="d-list" rows="12" maxlength="${MAX_VALUE_LENGTH}" spellcheck="false" readonly>` +
      `${escape(testoDellaLista(stato.lista))}</textarea>`);
}

/** La guida (GuideDialog): le pagine una sull'altra, la prima in vista; a pagina 4 la legenda della prima riga. */
export function htmlDellaGuida(stato: Stato): string {
  const c = contestoDellActivity(stato);
  const legenda = '<ul class="ui-legenda" role="list">' + LEGENDA.map(([icona, nome]) =>
    `<li><img class="ui-legicona" src="/icons/${icona}.png" alt="${escape(testo(nome))}" draggable="false">` +
    `<span>${escape(testo(`activity.guide.4.${icona}`))}</span></li>`).join('') + '</ul>';
  const fogli = Array.from({ length: PAGINE }, (_, i) => i + 1).map((n) =>
    `<div class="ui-foglio" data-pagina="${n}"${n === 1 ? ' data-current' : ''}>` +
    `${markdown(testo(`activity.guide.${n}`), c)}${n === 4 ? legenda : ''}</div>`);
  return `<div class="ui-dlgtesto ui-guida">${fogli.join('')}</div>`;
}

/** Il fondo della guida: ‹ spenta a pagina 1, › all'ultima, in mezzo il numero della pagina. */
export function htmlDelPiedeDellaGuida(pagina: number): string {
  const freccia = (k: string, icona: string, titolo: string, spenta: boolean) => {
    const t = escape(testo(titolo));
    return `<button type="button" class="sc-abtn sc-raised" data-k="${k}" aria-label="${t}" title="${t}"` +
      `${spenta ? ' disabled' : ''}><img src="/icons/${icona}.png" alt="" draggable="false"></button>`;
  };
  return '<div class="ui-guidanav">' + freccia('d-prev', 'prev', 'activity.guide.prev', pagina === 1) +
    `<span class="ui-guidapag" data-k="d-page" aria-live="polite">${testo('activity.guide.page', pagina, PAGINE)}` +
    '</span>' + freccia('d-next', 'next', 'activity.guide.next', pagina === PAGINE) + '</div>';
}

/** New date parte da adesso più dieci minuti, al minuto, nel fuso che la pagina propone (newWhen). */
export function nuovaDataProposta(stato: Stato): Quando {
  return quandoDa(PROPOSTO, fusoDi(stato));
}

/** La data di New date a meno di 5 minuti da adesso, anche passata: l'avviso sopra i campi (tooSoon). */
export function problemaDellaNuovaData(q: Quando): string | null {
  const at = istanteDi(q);
  return at !== null && at < ADESSO + 300 ? troppoVicina() : null;
}

/** Reopen si preme senza i campi di New date, o con una data intera e lontana almeno 5 minuti (ready). */
export function riaperturaPronta(q: Quando | null): boolean {
  return q === null || (istanteDi(q) !== null && problemaDellaNuovaData(q) === null);
}

/**
 * Reopen nell'Activity (ApiBot.reopen): tutti i task da fare, la lista resta nella sessione. Con i campi di New date i
 * promemoria dei riaperti si spostano; il fuso diventa quello di chi guarda solo se l'ha cambiato con uno che la
 * pagina non proponeva (learn).
 */
export function riapriNellActivity(stato: Stato, q: Quando | null): Stato {
  const at = q === null ? null : istanteDi(q);
  if (q === null || at === null) return conTuttiRiaperti(stato);
  return conTuttiRiaperti(stato, { at, zona: q.zona }, q.toccata && !stessaZona(q.zona, fusoDi(stato)));
}

/* I dialoghi nella finestra. */

/** I data-k dei pulsanti della prima riga, che montaPrimaRiga prende in carico. */
export const TASTI_DELLA_PRIMA_RIGA: ReadonlySet<string> =
  new Set(['a-guide', 'a-edit', 'a-clean', 'a-reopen', 'a-exit']);

/** Quanto il bot ci mette a rispondere a Clean, Reopen ed Exit: intanto i puntini sul pulsante premuto (useRun). */
const ATTESA_MS = 400;

export interface PrimaRiga {
  /** Un pulsante della prima riga premuto (uno di TASTI_DELLA_PRIMA_RIGA). */
  premi(b: HTMLElement): void;
  /** Edit, Clean e Reopen all in attesa che il task in modifica si salvi o si chiuda, o di nuovo liberi. */
  blocca(bloccata: boolean): void;
  /** Il tab lasciato o Start over: il dialogo chiuso; una risposta in viaggio arriva subito, senza cambiare tab. */
  chiudi(): void;
}

/**
 * La prima riga nella scena dell'Activity. Il pannello del task lo tiene activity.ts: `chiudiIlPannello` lo chiude
 * prima di un dialogo, come un clic fuori (useClosing); `taskInModifica` dice quale task ha il pannello aperto.
 */
export function montaPrimaRiga(scena: HTMLElement, condiviso: Condiviso,
  alla: { chiudiIlPannello(): void; taskInModifica(): string | null }): PrimaRiga {
  const dove = scena.querySelector<HTMLElement>('[data-k="dlg"]')!;
  /** Il dialogo aperto, con la funzione che lo chiude. */
  let chiudiIlDialogo: (() => void) | null = null;
  /** La risposta in viaggio: chi lascia il tab la fa arrivare subito (interrotta), senza le sue conseguenze sul tab. */
  let attesa: { timer: number; risposta(interrotta: boolean): void } | null = null;

  const tasto = (id: string) => dove.querySelector<HTMLButtonElement>(`[data-k="d-${id}"]`);
  const fumetto = (md: string, accanto: Element) =>
    condiviso.fumetto(markdown(md, contestoDellActivity(condiviso.stato())), accanto);

  /** Il dialogo chiuso da Esc, dalla ✕ o dal velo: non c'è più niente da chiudere. */
  const dimentica = () => {
    chiudiIlDialogo = null;
  };

  function chiudiDialogo(): void {
    const chiudi = chiudiIlDialogo;
    chiudiIlDialogo = null;
    chiudi?.();
  }

  /**
   * Il pulsante `id` del dialogo premuto: i puntini, poi la risposta del bot sulla lista di quel momento (useRun). La
   * riuscita chiude il dialogo; un rifiuto va nel fumetto sul pulsante, o sul pulsante della prima riga se intanto il
   * dialogo si è chiuso, che non ferma la richiesta: il bot l'ha già ricevuta.
   */
  function manda(id: string, apritore: HTMLElement, esito: (s: Stato) => Esito): void {
    const premuto = tasto(id);
    if (!premuto || attesa) return;
    inAttesa(premuto, true);
    const aperto = chiudiIlDialogo;
    const risposta = (interrotta: boolean) => {
      attesa = null;
      inAttesa(premuto, false);
      const e = esito(condiviso.stato());
      if (e.tipo === 'fatto') {
        condiviso.cambia(e.stato);
        if (chiudiIlDialogo === aperto) chiudiDialogo();
      }
      const md = rispostaDellEsito(e);
      if (md && !interrotta) fumetto(md, premuto.isConnected ? premuto : apritore);
    };
    attesa = { timer: window.setTimeout(() => risposta(false), ATTESA_MS), risposta };
  }

  function guida(apritore: HTMLElement): void {
    let pagina = 1;
    const volta = (dopo: number) => {
      if (dopo < 1 || dopo > PAGINE) return;
      pagina = dopo;
      dove.querySelectorAll<HTMLElement>('.ui-foglio').forEach((f) => {
        f.toggleAttribute('data-current', Number(f.dataset.pagina) === pagina);
      });
      const numero = dove.querySelector<HTMLElement>('[data-k="d-page"]');
      if (numero) numero.textContent = testo('activity.guide.page', pagina, PAGINE);
      const prima = tasto('prev');
      const poi = tasto('next');
      if (!prima || !poi) return;
      const conIlFocus = document.activeElement;
      prima.disabled = pagina === 1;
      poi.disabled = pagina === PAGINE;
      // La freccia che si spegne sotto il dito lascia il focus all'altra, che si può premere.
      if (conIlFocus === prima && prima.disabled) poi.focus();
      else if (conIlFocus === poi && poi.disabled) prima.focus();
    };
    chiudiIlDialogo = apriDialogo(dove, {
      titolo: testo('activity.btn.guide'),
      corpo: htmlDellaGuida(condiviso.stato()),
      piede: htmlDelPiedeDellaGuida(pagina),
    }, apritore, {
      clic: (id) => {
        if (id === 'prev') volta(pagina - 1);
        else if (id === 'next') volta(pagina + 1);
      },
      chiusura: dimentica,
    });
  }

  function modifica(apritore: HTMLElement): void {
    chiudiIlDialogo = apriDialogo(dove, {
      titolo: testo('tasklist.modal.edit.title'),
      corpo: corpoDellaModifica(condiviso.stato(), nuovoNumero()),
      piede: [
        { id: 'cancel', testo: testo('activity.dialog.cancel'), stile: 'grigio' },
        { id: 'save', testo: testo('activity.panel.save'), stile: 'blu', spento: true },
      ],
      largo: true,
    }, apritore, {
      clic: (id) => {
        if (id === 'cancel') chiudiDialogo();
      },
      chiusura: dimentica,
    });
  }

  function pulizia(apritore: HTMLElement): void {
    const esito = primaDelDialogo(condiviso.stato(), 'clean');
    if (esito.tipo !== 'domanda' || esito.domanda.tipo !== 'pulisci') {
      const md = rispostaDellEsito(esito);
      if (md) fumetto(md, apritore);
      return;
    }
    chiudiIlDialogo = apriDialogo(dove, {
      titolo: testo('tasklist.modal.clean.title'),
      corpo: corpoDellaPulizia(condiviso.stato(), esito.domanda.completati),
      piede: [
        { id: 'cancel', testo: testo('activity.dialog.cancel'), stile: 'grigio' },
        { id: 'clean', testo: testo('activity.clean.confirm'), stile: 'rosso' },
      ],
    }, apritore, {
      clic: (id) => {
        if (id === 'cancel') chiudiDialogo();
        else if (id === 'clean') {
          manda('clean', apritore, (s) => {
            const prima = primaDelDialogo(s, 'clean');
            return prima.tipo === 'rifiuto' ? prima : { tipo: 'fatto', stato: pulisciConfermato(s) };
          });
        }
      },
      chiusura: dimentica,
    });
  }

  function riapertura(apritore: HTMLElement): void {
    const stato = condiviso.stato();
    const esito = primaDelDialogo(stato, 'reopen');
    if (esito.tipo !== 'domanda' || esito.domanda.tipo !== 'riapri') {
      const md = rispostaDellEsito(esito);
      if (md) fumetto(md, apritore);
      return;
    }
    const { spuntati, nuovaData: spostabile } = esito.domanda;
    /**
     * New date premuto coi campi aperti; la vista dei fusi al posto dei campi; la data, che resta fra un giro e
     * l'altro.
     */
    let spostando = false;
    let scegliendo = false;
    let q = nuovaDataProposta(stato);
    let campi: { smonta(): void } | null = null;
    const contesto = contestoDellActivity(stato);

    /** L'avviso della data sopra i campi, non sulla vista dei fusi; Reopen acceso se la data va. */
    const aggiorna = () => {
      const avvisi = dove.querySelector<HTMLElement>('[data-k="d-notices"]');
      const problema = spostando && !scegliendo ? problemaDellaNuovaData(q) : null;
      if (avvisi) avvisi.innerHTML = problema ? `<div class="sc-pnotice">${markdown(problema, contesto)}</div>` : '';
      const reopen = tasto('reopen');
      if (reopen) reopen.disabled = !riaperturaPronta(spostando ? q : null);
    };

    const sposta = (si: boolean) => {
      spostando = si;
      scegliendo = false;
      const nuova = tasto('newdate');
      if (nuova) {
        nuova.classList.toggle('sc-blue', si);
        nuova.classList.toggle('sc-raised', !si);
        nuova.setAttribute('aria-pressed', String(si));
      }
      const domanda = dove.querySelector('.ui-dlgtesto');
      if (domanda) domanda.outerHTML = corpoDellaRiapertura(stato, spuntati, spostabile && !si);
      const quando = dove.querySelector<HTMLElement>('[data-k="d-when"]');
      campi?.smonta();
      campi = null;
      if (quando) {
        quando.replaceChildren();
        if (si) {
          campi = montaQuando(quando, q, 'r', stato.fuso, {
            cambio: (nuovo) => {
              q = nuovo;
              scegliendo = false;
              aggiorna();
              // Tornando dai fusi il campo che aveva il focus non c'è più: il focus resta nel dialogo.
              const box = dove.querySelector<HTMLElement>('.ui-dlg');
              if (box && !box.contains(document.activeElement)) box.focus({ preventScroll: true });
            },
            fusi: () => {
              scegliendo = true;
              aggiorna();
            },
          });
        }
      }
      aggiorna();
    };

    const piede: Pulsante[] = [{ id: 'cancel', testo: testo('tasklist.btn.reopen.cancel'), stile: 'grigio' }];
    if (spostabile) {
      piede.push({ id: 'newdate', testo: testo('tasklist.btn.reopen.newdate'), stile: 'grigio', premuto: false });
    }
    piede.push({ id: 'reopen', testo: testo('tasklist.btn.reopen.confirm'), stile: 'blu' });
    chiudiIlDialogo = apriDialogo(dove, {
      titolo: testo('activity.btn.reopen'),
      corpo: corpoDellaRiapertura(stato, spuntati, spostabile) +
        '<div class="sc-pparte" data-k="d-notices"></div><div class="sc-pparte" data-k="d-when"></div>',
      piede,
    }, apritore, {
      clic: (id) => {
        if (id === 'cancel') chiudiDialogo();
        else if (id === 'newdate') sposta(!spostando);
        else if (id === 'reopen') {
          const scelta = spostando ? q : null;
          manda('reopen', apritore, (s) => {
            const prima = riapri(s);
            return prima.tipo === 'rifiuto' ? prima : { tipo: 'fatto', stato: riapriNellActivity(s, scelta) };
          });
        }
      },
      chiusura: dimentica,
    });
  }

  /**
   * Exit con Mia nella sessione (ExitDialog): il pulsante premuto aspetta, l'altro si spegne. Poi il tab del canale:
   * da soli la lista resta nell'Activity, con «Join the Activity»; per tutti torna nel canale coi pulsanti grigi.
   */
  function uscita(apritore: HTMLElement): void {
    const esci = (perTutti: boolean) => {
      const premuto = tasto(perTutti ? 'all' : 'me');
      const altro = tasto(perTutti ? 'me' : 'all');
      if (!premuto || !altro || attesa) return;
      inAttesa(premuto, true);
      altro.disabled = true;
      const risposta = (interrotta: boolean) => {
        attesa = null;
        chiudiDialogo();
        if (perTutti) condiviso.cambia(nelCanale(condiviso.stato()));
        if (!interrotta) condiviso.vaiA('channel');
      };
      attesa = { timer: window.setTimeout(() => risposta(false), ATTESA_MS), risposta };
    };
    chiudiIlDialogo = apriDialogo(dove, dialogoDellUscita(condiviso.stato()), apritore, {
      clic: (id) => {
        if (id === 'all' || id === 'me') esci(id === 'all');
      },
      chiusura: dimentica,
    });
  }

  function premi(b: HTMLElement): void {
    if (b.hasAttribute('data-locked')) {
      const pos = alla.taskInModifica();
      if (pos !== null) fumetto(bloccoDellaPrimaRiga(pos), b);
      return;
    }
    // Una risposta in viaggio, col dialogo già chiuso: la prima riga aspetta che arrivi.
    if (attesa) return;
    alla.chiudiIlPannello();
    switch (b.dataset.k) {
      case 'a-guide': return guida(b);
      case 'a-edit': return modifica(b);
      case 'a-clean': return pulizia(b);
      case 'a-reopen': return riapertura(b);
      case 'a-exit': return uscita(b);
    }
  }

  function chiudi(): void {
    if (attesa) {
      window.clearTimeout(attesa.timer);
      attesa.risposta(true);
    }
    chiudiDialogo();
  }

  return { premi, blocca: (bloccata) => bloccaLaPrimaRiga(scena, bloccata), chiudi };
}
