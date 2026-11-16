/*
 * Il copione del video dell'Activity (spec 2026-11-15-home-video-e-demo-design.md, §4.3): dal pulsante del canale si
 * apre la finestra, il canale si scurisce e tiene il solo «Join the Activity»; nella pagina si spunta il task 2, poi
 * il testo del task 3 apre il pannello, Owner sceglie Mia, Save; Reminder propone data, ora e fuso, Save; Close.
 * I pulsanti tornano grigi dopo il salvataggio, come nella pagina vera. Gli stati della lista li danno le regole della
 * demo (demo/regole.ts), dalla lista dei video, senza owner né promemoria.
 *
 * Le azioni nell'area del pannello sono quelle della demo (demo/pannello.ts), montate come le monta demo/activity.ts
 * e mosse coi clic del cursore; quello che Save manda deve dare lo stato del copione (comeAtteso).
 */
import {
  apriPannello, azzeraIlPannello, bloccaLaPrimaRiga, disegnaLista, salva, scorrimentoPerIlPannello, tastoDelPannello,
  unita,
} from '../components/home/scene-dom';
import type { Tasto } from '../components/home/scene-data';
import { MIA, listaDeiVideo, statoIniziale } from '../components/home/demo/modello.ts';
import type { Stato } from '../components/home/demo/modello.ts';
import { montaAzione, quandoDi, salvaPromemoria, type Azione } from '../components/home/demo/pannello.ts';
import { applicaOwnerActivity, spunta } from '../components/home/demo/regole.ts';
import { clic, comeAtteso, easeInOutCubic, easeOut, statoDopo, tra, type Copione } from './render-comune';

const q = (s: HTMLElement, k: string) => s.querySelector<HTMLElement>(`[data-k="${k}"]`)!;
const win = (s: HTMLElement) => q(s, 'win');

export function copioneDellActivity(): Copione {
  // Gli stati qui dentro, non nel modulo: un'azione che le regole rifiutano diventa l'errore nel titolo della pagina
  // (registrazione.ts), invece di rompere l'import prima del suo catch.
  const SA0 = statoIniziale(listaDeiVideo());
  const SA1 = spunta(SA0, '2', true);
  const SA2 = statoDopo(applicaOwnerActivity(SA1, '3', [{ ruolo: false, id: MIA }]));
  // Data e ora proposte, adesso più dieci minuti, nel fuso del dispositivo: quello del server.
  const SA3 = statoDopo(salvaPromemoria(SA2, '3', quandoDi(SA2, '3')));

  // L'azione del pulsante acceso, come la tiene demo/activity.ts.
  let azione: Azione | null = null;

  /** L'azione tolta dall'area: la prima riga torna libera (via). */
  const via = (w: HTMLElement) => {
    azione?.smonta();
    azione = null;
    bloccaLaPrimaRiga(w, false);
  };
  /**
   * Un pulsante del pannello premuto: blu, con la sua azione nell'area. Save si accende quando l'azione si può
   * mandare; intanto Edit, Clean e Reopen all aspettano (premi, piede).
   */
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
  /** Save premuto: i puntini al posto della scritta (manda). */
  const manda = (w: HTMLElement) => {
    if (!azione?.pronto()) throw new Error('il copione preme Save, ma Save è spento');
    salva(w, 'pending');
  };
  /** La risposta del bot: la lista nuova, l'azione tolta, i pulsanti grigi, l'area vuota, Save spento (rispondi). */
  const salvato = (w: HTMLElement, prima: Stato, atteso: Stato, cosa: string) => {
    if (!azione) throw new Error(`${cosa}: non c'è l'azione da salvare`);
    disegnaLista(w, comeAtteso(azione.esito(prima), atteso, cosa));
    via(w);
    azzeraIlPannello(w);
  };

  return {
    fermate: [
      { t: 0, x: 0.62, y: 0.3 },
      { t: 1.5, k: 'b-activity' },
      { t: 3.9, k: 'a-cb-2' },
      { t: 5.75, k: 'a-txt-3' },
      { t: 6.65, k: 'p-owner' },
      { t: 7.55, k: 'pk-mia' },
      { t: 8.45, k: 'p-save' },
      { t: 9.95, k: 'p-reminder' },
      { t: 11.25, k: 'p-save' },
      { t: 13.55, k: 'p-close' },
    ],
    eventi: [
      { t: 1.7, fai: (s) => win(s).toggleAttribute('data-open', true) },
      // Il canale passa all'Activity quando la finestra è aperta: fino ad allora il ritaglio parte dal pulsante.
      { t: 2.15, fai: (s) => disegnaLista(q(s, 'chan'), { ...SA0, inActivity: true }) },
      { t: 4.0, fai: (s) => disegnaLista(win(s), SA1) },
      { t: 5.8, fai: (s) => apriPannello(win(s), '3') },
      { t: 6.7, fai: (s) => premi(win(s), SA1, 'owner') },
      { t: 7.6, fai: (s) => clic(s, 'pk-mia') },
      { t: 8.5, fai: (s) => manda(win(s)) },
      { t: 8.9, fai: (s) => salvato(win(s), SA1, SA2, 'il pannello di Owner') },
      // Data e ora proposte (adesso + 10 minuti) e il fuso del dispositivo: Save si accende subito.
      { t: 10.0, fai: (s) => premi(win(s), SA2, 'reminder') },
      { t: 11.3, fai: (s) => manda(win(s)) },
      { t: 11.7, fai: (s) => salvato(win(s), SA2, SA3, 'il pannello del promemoria') },
      { t: 13.6, fai: (s) => { via(win(s)); apriPannello(win(s), null); } },
    ],
    continui: (s, t) => {
      const w = win(s);
      const apertura = easeOut(tra(t, 1.7, 2.15));
      q(s, 'shade').style.opacity = String(apertura);
      // La finestra esce dal pulsante dell'Activity: il ritaglio va dal suo rettangolo a tutta la finestra.
      if (w.hasAttribute('data-open') && apertura < 1) {
        const b = q(s, 'b-activity').getBoundingClientRect();
        const r = w.getBoundingClientRect();
        const resto = 1 - apertura;
        const raggio = (8 + 4 * apertura) * unita(w);
        w.style.clipPath = `inset(${(b.top - r.top) * resto}px ${(r.right - b.right) * resto}px `
          + `${(r.bottom - b.bottom) * resto}px ${(b.left - r.left) * resto}px round ${raggio}px)`;
      } else {
        w.style.removeProperty('clip-path');
      }
      // Il pannello compare in 0,12 s, come nella pagina (bubble-in).
      q(s, 'panel').style.opacity = String(tra(t, 5.8, 5.92));
      // La pagina scorre quanto basta perché il pannello si veda tutto. Da zero, per non partire dallo
      // scorrimento del fotogramma prima.
      const pagina = q(s, 'page');
      pagina.scrollTop = 0;
      if (w.dataset.panel !== undefined) {
        pagina.scrollTop = scorrimentoPerIlPannello(w) * easeInOutCubic(tra(t, 5.8, 6.2));
      }
    },
    smonta: () => {
      azione?.smonta();
      azione = null;
    },
  };
}
