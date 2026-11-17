/*
 * Il copione del video di Esplora sull'Activity (spec 2026-11-17-video-activity-esplora-design.md, §4 e §6, nel
 * repo team-tasks-manager), nel motore dei video della home (render-comune.ts). Sam apre la lista nell'Activity;
 * entra Mia e spunta il task 2; Sam tocca il task 3, ci mette Mia come owner e un promemoria; poi riporta la lista
 * nel canale per tutti, con ogni modifica. I clic di Sam cadono sui battiti del brano (esplora-tempi.ts).
 *
 * I pezzi della demo si montano come li monta lei: le azioni del pannello (montaAzione) e il dialogo di Exit
 * (dialogoDellUscita, apriDialogo). Gli stati si controllano con le sue regole: se un pezzo manda altro da quello
 * che il copione racconta, il copione si ferma con un errore (comeAtteso). Le quattro funzioni del pannello (via,
 * premi, manda, salvato) sono quelle di render-activity.ts, ripetute qui per non toccare il copione dei video della
 * home, che sono pubblicati.
 *
 * Le azioni di Mia non hanno cursore (§6): le segna un cerchio del suo colore (.esp-mia), come il tocco ma senza la
 * freccia. Il conteggio di chi c'è parte da Sam solo e passa a due quando entra Mia; i suggerimenti del selettore e
 * il dialogo di Exit sono quelli della demo, che ha Sam e Mia nella sessione.
 */
import {
  apriPannello, azzeraIlPannello, bloccaLaPrimaRiga, disegnaLista, salva, scorrimentoPerIlPannello, tastoDelPannello,
  unita,
} from '../components/home/scene-dom';
import type { Tasto } from '../components/home/scene-data';
import { MIA, NELL_ACTIVITY, PERSONE, SAM, listaDeiVideo, statoIniziale } from '../components/home/demo/modello.ts';
import type { Stato } from '../components/home/demo/modello.ts';
import { montaAzione, quandoDi, salvaPromemoria, type Azione } from '../components/home/demo/pannello.ts';
import { dialogoDellUscita } from '../components/home/demo/primariga.ts';
import { applicaOwnerActivity, nelCanale, spunta } from '../components/home/demo/regole.ts';
import { testo } from '../components/home/demo/testi.ts';
import { apriDialogo, inAttesa } from '../components/home/demo/ui/dialogo.ts';
import { battuta as b } from './esplora-tempi';
import { clic, comeAtteso, easeInOutCubic, easeOut, statoDopo, tra, type Copione } from './render-comune';

const q = (s: ParentNode, k: string) => s.querySelector<HTMLElement>(`[data-k="${k}"]`)!;
const win = (s: HTMLElement) => q(s, 'win');

/** Il clic arriva 50 ms dopo il cursore, come nei video della home. */
const E = 0.05;
/** La finestra esce dal pulsante dell'Activity in 0,45 s, come nel video della home, e ci rientra nello stesso tempo. */
const FINESTRA = 0.45;
/** La risposta del bot a Save e a Exit (ATTESA_MS della demo): intanto i puntini sul pulsante. */
const ATTESA = 0.4;
/** Il cerchio di Mia: più lungo e più acceso del tocco (0,4 s da 0,55), perché senza la freccia è il solo segno. */
const CERCHIO = 0.6;

/** I clic di Sam e le azioni di Mia; le scene cominciano sugli attacchi delle battute 3, 5, 8, 11 e 14. */
const T = {
  activity: b(3, 4),
  entraMia: b(5, 3),
  spuntaMia: b(6, 4),
  task: b(8, 2),
  owner: b(8, 4),
  mia: b(9, 3),
  salvaOwner: b(10),
  promemoria: b(11, 2),
  salvaPromemoria: b(12, 2),
  chiudi: b(13, 2),
  esci: b(14),
  perTutti: b(15),
};
/** La finestra esce dopo il clic sull'Activity; rientra quando il bot risponde a Bring back. */
const APRE = T.activity + E;
const RIENTRA = T.perTutti + E + ATTESA;

/** Chi è nella pagina: i primi n di NELL_ACTIVITY, col markup di ActivityScene.astro e il testo del bundle. */
function chiCe(s: HTMLElement, n: number): void {
  const qui = NELL_ACTIVITY.slice(0, n).map((id) => PERSONE.find((p) => p.id === id)!);
  q(s, 'a-people').innerHTML = '<span class="sc-whoav" aria-hidden="true">' +
    qui.map((p) => `<span class="sc-av" style="--av: ${p.colore}">${p.nome[0]}</span>`).join('') +
    `</span><span>${testo('activity.here.list', n)}</span>`;
}

/** Dove Mia fa qualcosa: sul suo avatar quando entra, sulla casella del task 2 quando la spunta. */
const MOSSE_DI_MIA: readonly { t: number; dove: (s: HTMLElement) => HTMLElement }[] = [
  { t: T.entraMia, dove: (s) => q(s, 'a-people').querySelector<HTMLElement>('.sc-av:last-child')! },
  { t: T.spuntaMia, dove: (s) => q(s, 'a-cb-2') },
];

/** Il cerchio di Mia all'istante t: si allarga e sparisce come il tocco, centrato dove lei ha agito. */
function cerchioDiMia(s: HTMLElement, t: number): void {
  const cerchio = s.querySelector<HTMLElement>('.esp-mia');
  if (!cerchio) return;
  const mossa = MOSSE_DI_MIA.filter((m) => t >= m.t).pop();
  const p = mossa ? (t - mossa.t) / CERCHIO : 1;
  if (!mossa || p >= 1) {
    cerchio.style.opacity = '0';
    return;
  }
  const r = mossa.dove(s).getBoundingClientRect();
  const sc = s.getBoundingClientRect();
  const lato = cerchio.offsetWidth;
  const x = r.left + r.width / 2 - sc.left;
  const y = r.top + r.height / 2 - sc.top;
  cerchio.style.opacity = String(0.9 * (1 - p));
  cerchio.style.transform = `translate(${x - lato / 2}px, ${y - lato / 2}px) scale(${0.4 + 1.2 * p})`;
}

export function copioneDiEsplora(): Copione {
  if (NELL_ACTIVITY.join() !== [SAM, MIA].join()) {
    throw new Error('il video racconta Sam e poi Mia: NELL_ACTIVITY della demo è cambiato');
  }
  // Gli stati qui dentro, non nel modulo: un'azione che le regole rifiutano diventa l'errore nel titolo della pagina
  // (registrazione-esplora.ts), invece di rompere l'import prima del suo catch.
  const SA0 = statoIniziale(listaDeiVideo());
  const SA1 = spunta(SA0, '2', true);
  const SA2 = statoDopo(applicaOwnerActivity(SA1, '3', [{ ruolo: false, id: MIA }]));
  // Data e ora proposte, adesso più dieci minuti, nel fuso del dispositivo: quello del server.
  const SA3 = statoDopo(salvaPromemoria(SA2, '3', quandoDi(SA2, '3')));
  let azione: Azione | null = null;
  let chiudiIlDialogo: (() => void) | null = null;

  /** L'azione tolta dall'area: la prima riga torna libera. */
  const via = (w: HTMLElement) => {
    azione?.smonta();
    azione = null;
    bloccaLaPrimaRiga(w, false);
  };
  /** Un pulsante del pannello premuto: blu, con la sua azione nell'area; Save si accende quando si può mandare. */
  const premi = (w: HTMLElement, stato: Stato, tasto: Tasto) => {
    via(w);
    azzeraIlPannello(w);
    tastoDelPannello(w, tasto, 'blue');
    const piede = () => {
      const pronto = azione?.pronto() ?? false;
      salva(w, pronto ? 'on' : 'off');
      bloccaLaPrimaRiga(w, pronto);
    };
    azione = montaAzione(q(w, 'p-form'), stato, '3', { tasto, colore: 'blue' }, piede);
    piede();
  };
  /** Save premuto: i puntini al posto della scritta. */
  const manda = (w: HTMLElement) => {
    if (!azione?.pronto()) throw new Error('il copione preme Save, ma Save è spento');
    salva(w, 'pending');
  };
  /** La risposta del bot: la lista nuova, l'azione tolta, i pulsanti grigi, l'area vuota, Save spento. */
  const salvato = (w: HTMLElement, prima: Stato, atteso: Stato, cosa: string) => {
    if (!azione) throw new Error(`${cosa}: non c'è l'azione da salvare`);
    disegnaLista(w, comeAtteso(azione.esito(prima), atteso, cosa));
    via(w);
    azzeraIlPannello(w);
  };
  /**
   * Close: il pannello si chiude e la pagina torna su da dove l'aveva portata il pannello (continui). La colonna
   * resta alta finché la pagina non è in cima: senza il pannello posizionaPannello la accorcia, e lo scorrimento
   * salterebbe a zero.
   */
  const chiudiIlPannello = (w: HTMLElement) => {
    const pagina = q(w, 'page');
    pagina.scrollTop = 0;
    pagina.dataset.via = String(scorrimentoPerIlPannello(w));
    const colonna = q(w, 'page-in');
    const alta = colonna.style.minHeight;
    via(w);
    apriPannello(w, null);
    colonna.style.minHeight = alta;
  };
  /** Exit: il dialogo della demo, con Mia nella sessione; Bring back aspetta la risposta, l'altro si spegne. */
  const esci = (w: HTMLElement) => {
    const dove = q(w, 'dlg');
    chiudiIlDialogo = apriDialogo(dove, dialogoDellUscita(SA3), q(w, 'a-exit'), {
      clic: (id) => {
        if (id !== 'all') return;
        inAttesa(q(dove, 'd-all'), true);
        dove.querySelector<HTMLButtonElement>('[data-k="d-me"]')!.disabled = true;
      },
    });
  };
  /**
   * Il clic su Bring back passa dal dialogo: se non l'ha preso, il pulsante non aspetta e il copione si ferma. Il
   * controllo sta qui e non nell'ascoltatore del dialogo, perché un errore lanciato da un ascoltatore non arriva a
   * chi ha mandato l'evento.
   */
  const perTutti = (s: HTMLElement) => {
    clic(s, 'd-all');
    if (q(s, 'd-all').getAttribute('aria-busy') !== 'true') {
      throw new Error('il dialogo di Exit non ha preso il clic su Bring back');
    }
  };
  /** La risposta a Bring back: il dialogo si chiude e il canale riprende la lista coi pulsanti e ogni modifica. */
  const rientra = (s: HTMLElement) => {
    chiudiIlDialogo?.();
    chiudiIlDialogo = null;
    disegnaLista(q(s, 'chan'), nelCanale(SA3));
  };

  return {
    chatFerma: true,
    fermate: [
      { t: 0, x: 0.62, y: 0.3 },
      { t: T.activity, k: 'b-activity' },
      // Sam lascia il mouse a lato, fuori dalla colonna della pagina: le azioni che seguono sono di Mia.
      { t: b(4, 3), x: 0.9, y: 0.62 },
      { t: T.task, k: 'a-txt-3' },
      { t: T.owner, k: 'p-owner' },
      { t: T.mia, k: 'pk-mia' },
      { t: T.salvaOwner, k: 'p-save' },
      { t: T.promemoria, k: 'p-reminder' },
      { t: T.salvaPromemoria, k: 'p-save' },
      { t: T.chiudi, k: 'p-close' },
      { t: T.esci, k: 'a-exit' },
      { t: T.perTutti, k: 'd-all' },
      // E lo toglie dalla lista tornata nel canale.
      { t: b(16), x: 0.9, y: 0.2 },
    ],
    eventi: [
      { t: 0, fai: (s) => chiCe(s, 1) },
      { t: APRE, fai: (s) => win(s).toggleAttribute('data-open', true) },
      // Il canale passa all'Activity quando la finestra è aperta: fino ad allora il ritaglio parte dal pulsante.
      { t: APRE + FINESTRA, fai: (s) => disegnaLista(q(s, 'chan'), { ...SA0, inActivity: true }) },
      { t: T.entraMia, fai: (s) => chiCe(s, 2) },
      { t: T.spuntaMia, fai: (s) => disegnaLista(win(s), SA1) },
      { t: T.task + E, fai: (s) => apriPannello(win(s), '3') },
      { t: T.owner + E, fai: (s) => premi(win(s), SA1, 'owner') },
      { t: T.mia + E, fai: (s) => clic(s, 'pk-mia') },
      { t: T.salvaOwner + E, fai: (s) => manda(win(s)) },
      { t: T.salvaOwner + E + ATTESA, fai: (s) => salvato(win(s), SA1, SA2, 'il pannello di Owner') },
      // Data e ora proposte (adesso + 10 minuti) e il fuso del dispositivo: Save si accende subito.
      { t: T.promemoria + E, fai: (s) => premi(win(s), SA2, 'reminder') },
      { t: T.salvaPromemoria + E, fai: (s) => manda(win(s)) },
      { t: T.salvaPromemoria + E + ATTESA, fai: (s) => salvato(win(s), SA2, SA3, 'il pannello del promemoria') },
      { t: T.chiudi + E, fai: (s) => chiudiIlPannello(win(s)) },
      { t: T.esci + E, fai: (s) => esci(win(s)) },
      { t: T.perTutti + E, fai: perTutti },
      { t: RIENTRA, fai: rientra },
      { t: RIENTRA + FINESTRA, fai: (s) => win(s).removeAttribute('data-open') },
    ],
    continui: (s, t) => {
      const w = win(s);
      // La finestra esce dal pulsante dell'Activity e alla fine ci rientra, all'indietro. resto è quanto della
      // finestra è ancora (o già) nel pulsante: 0 la finestra intera, 1 il pulsante.
      const apertura = easeOut(tra(t, APRE, APRE + FINESTRA));
      const chiusura = 1 - easeOut(1 - tra(t, RIENTRA, RIENTRA + FINESTRA));
      q(s, 'shade').style.opacity = String(apertura * (1 - chiusura));
      const resto = Math.max(1 - apertura, chiusura);
      if (w.hasAttribute('data-open') && resto > 0) {
        const p = q(s, 'b-activity').getBoundingClientRect();
        const r = w.getBoundingClientRect();
        const raggio = (12 - 4 * resto) * unita(w);
        w.style.clipPath = `inset(${(p.top - r.top) * resto}px ${(r.right - p.right) * resto}px ` +
          `${(r.bottom - p.bottom) * resto}px ${(p.left - r.left) * resto}px round ${raggio}px)`;
      } else {
        w.style.removeProperty('clip-path');
      }
      // Il pannello compare in 0,12 s; la pagina scorre fin dove si vede tutto e, dopo Close, torna su in 0,4 s.
      q(s, 'panel').style.opacity = String(tra(t, T.task + E, T.task + E + 0.12));
      const pagina = q(s, 'page');
      pagina.scrollTop = 0;
      if (w.dataset.panel !== undefined) {
        pagina.scrollTop = scorrimentoPerIlPannello(w) * easeInOutCubic(tra(t, T.task + E, T.task + E + 0.4));
      } else if (pagina.dataset.via) {
        const su = easeInOutCubic(tra(t, T.chiudi + E, T.chiudi + E + 0.4));
        pagina.scrollTop = Number(pagina.dataset.via) * (1 - su);
        if (su === 1) q(w, 'page-in').style.removeProperty('min-height');
      }
      cerchioDiMia(s, t);
    },
    smonta: () => {
      azione?.smonta();
      azione = null;
      chiudiIlDialogo?.();
      chiudiIlDialogo = null;
    },
  };
}
