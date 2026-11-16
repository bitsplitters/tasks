/*
 * Il copione del video del canale (spec 2026-11-15-home-video-e-demo-design.md, §4.2): spunta il task 2 col suo
 * subtask, dà Mia come owner al task 3 col menu sotto i pulsanti, gli mette il promemoria con la modale. Ogni
 * pulsante torna grigio dopo l'azione, come il bot col default (OptionMode.DISABLED). Gli istanti sono in secondi;
 * un evento cade poco dopo il tocco del cursore che lo provoca. Gli stati della lista li danno le regole della demo
 * (demo/regole.ts), dalla lista dei video, senza owner né promemoria.
 */
import {
  apriSelettore, disegnaLista, menuSottoAperto, modale, sceltaNelMenuSotto, tastoDelCanale,
} from '../components/home/scene-dom';
import { MIA, PROPOSTO, ZONA, listaDeiVideo, statoIniziale } from '../components/home/demo/modello.ts';
import { applicaOwner, applicaPromemoria, spunta } from '../components/home/demo/regole.ts';
import { statoDopo, tra, type Copione } from './render-comune';

const S0 = statoIniziale(listaDeiVideo());
const S1 = spunta(S0, '2', true);
const S2 = statoDopo(applicaOwner(S1, '3', [MIA], []));
// Data e ora già proposte nella modale, adesso più dieci minuti, nel fuso del server.
const S3 = statoDopo(applicaPromemoria(S2, '3', PROPOSTO, ZONA));

const chan = (s: HTMLElement) => s.querySelector<HTMLElement>('[data-k="chan"]')!;

export function copioneDelCanale(): Copione {
  return {
    // Il messaggio resta fermo dall'inizio alla fine: crescendo, prima, saliva a ogni riga in più (segnalazione
    // dell'utente del 15/11).
    chatFerma: true,
    fermate: [
      { t: 0, x: 0.62, y: 0.3 },
      { t: 1.2, k: 'sel' },
      { t: 2.3, k: 'opt-2' },
      { t: 3.9, k: 'b-owner' },
      { t: 4.9, k: 'sub-sel' },
      { t: 5.6, k: 'sub-mia' },
      { t: 6.2, k: 'msghead' },
      { t: 7.0, k: 'sel' },
      { t: 7.8, k: 'opt-3' },
      { t: 9.3, k: 'b-reminder' },
      { t: 10.1, k: 'sel' },
      { t: 10.8, k: 'opt-3' },
      { t: 12.0, k: 'm-submit' },
    ],
    eventi: [
      { t: 1.25, fai: (s) => apriSelettore(chan(s), true) },
      { t: 2.35, fai: (s) => apriSelettore(chan(s), false) },
      { t: 2.6, fai: (s) => disegnaLista(chan(s), S1) },
      { t: 4.05, fai: (s) => tastoDelCanale(chan(s), 'owner', 'blue') },
      { t: 4.95, fai: (s) => menuSottoAperto(chan(s), true) },
      { t: 5.65, fai: (s) => sceltaNelMenuSotto(chan(s), [MIA]) },
      // Il clic fuori chiude il menu: la scelta resta, il selettore dice «Edit owner».
      { t: 6.25, fai: (s) => menuSottoAperto(chan(s), false) },
      { t: 7.05, fai: (s) => apriSelettore(chan(s), true) },
      { t: 7.85, fai: (s) => apriSelettore(chan(s), false) },
      { t: 8.1, fai: (s) => { disegnaLista(chan(s), S2); tastoDelCanale(chan(s), null, null); } },
      { t: 9.45, fai: (s) => tastoDelCanale(chan(s), 'reminder', 'blue') },
      { t: 10.15, fai: (s) => apriSelettore(chan(s), true) },
      { t: 10.85, fai: (s) => apriSelettore(chan(s), false) },
      { t: 11.0, fai: (s) => modale(chan(s), true) },
      // Coi promemoria ricorrenti spenti, il default, la modale salva subito (AlertLogic).
      { t: 12.05, fai: (s) => modale(chan(s), false) },
      { t: 12.3, fai: (s) => { disegnaLista(chan(s), S3); tastoDelCanale(chan(s), null, null); } },
    ],
    // La modale si apre in 0,15 s: opacità e scala da --in.
    continui: (s, t) => {
      s.querySelector<HTMLElement>('[data-k="modalwrap"]')?.style.setProperty('--in', String(tra(t, 11, 11.15)));
    },
  };
}
