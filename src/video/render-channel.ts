/*
 * Il copione del video del canale (spec 2026-11-15-home-video-e-demo-design.md, §4.2): spunta il task 2 col suo
 * subtask, dà Mia come owner al task 3 col menu sotto i pulsanti, gli mette il promemoria con la modale. Ogni
 * pulsante torna grigio dopo l'azione, come il bot col default (OptionMode.DISABLED). Gli istanti sono in secondi;
 * un evento cade poco dopo il tocco del cursore che lo provoca. Gli stati della lista li danno le regole della demo
 * (demo/regole.ts), dalla lista dei video, senza owner né promemoria.
 *
 * Il menu di menzioni e la modale sono quelli della demo (demo/ui), montati come li monta demo/canale.ts e mossi coi
 * clic del cursore; quello che mandano al bot deve dare lo stato del copione (comeAtteso). La risposta del bot dopo il
 * promemoria, il fumetto con la data, resta fuori: è della demo (Demo.astro).
 */
import { accendiNelCanale, apriSelettore, disegnaLista } from '../components/home/scene-dom';
import { campiDalPromemoria, divisa, modaleDelPromemoria, vociDelMenu } from '../components/home/demo/componenti.ts';
import { MIA, PROPOSTO, ZONA, listaDeiVideo, statoIniziale } from '../components/home/demo/modello.ts';
import type { Stato } from '../components/home/demo/modello.ts';
import {
  applicaOwner, applicaPromemoria, campiDelPromemoria, spunta, validaPromemoria,
} from '../components/home/demo/regole.ts';
import { testo } from '../components/home/demo/testi.ts';
import { montaMenzioni, type Menzioni } from '../components/home/demo/ui/menzioni.ts';
import { apriModale } from '../components/home/demo/ui/modale.ts';
import { clic, clicFuori, comeAtteso, statoDopo, tra, type Copione } from './render-comune';

const q = (s: HTMLElement, k: string) => s.querySelector<HTMLElement>(`[data-k="${k}"]`)!;
const chan = (s: HTMLElement) => q(s, 'chan');

export function copioneDelCanale(): Copione {
  // Gli stati qui dentro, non nel modulo: un'azione che le regole rifiutano diventa l'errore nel titolo della pagina
  // (registrazione.ts), invece di rompere l'import prima del suo catch.
  const S0 = statoIniziale(listaDeiVideo());
  const S1 = spunta(S0, '2', true);
  const S2 = statoDopo(applicaOwner(S1, '3', [MIA], []));
  // Data e ora già proposte nella modale, adesso più dieci minuti, nel fuso del server.
  const S3 = statoDopo(applicaPromemoria(S2, '3', PROPOSTO, ZONA));
  const campi = campiDelPromemoria(S2, '3');
  if ('tipo' in campi) throw new Error('il copione aspettava la modale del promemoria, non un rifiuto');

  // Quello che la demo tiene in mano mentre il pulsante è acceso (demo/canale.ts): il menu, le persone che ha mandato
  // chiudendosi, la modale aperta e i valori del suo Submit.
  let menzioni: Menzioni | null = null;
  let carrello: string[] = [];
  let chiudiModale: (() => void) | null = null;
  let mandati: Record<string, string> | null = null;

  /** Owner blu col suo menu sotto i pulsanti, vuoto: chiudendosi manda le persone scelte (premi, montaIlMenu). */
  const owner = (c: HTMLElement, stato: Stato) => {
    menzioni?.smonta();
    carrello = [];
    accendiNelCanale(c, 'owner', 'blue');
    menzioni = montaMenzioni(q(c, 'sub'), vociDelMenu(stato), [], testo('tasklist.slct.owner'), {
      chiusura: (scelte) => {
        carrello = scelte;
      },
    });
  };
  /** La lista dopo l'azione: lo stato nuovo, i pulsanti grigi, nessun menu (spegni). */
  const fatto = (c: HTMLElement, stato: Stato) => {
    disegnaLista(c, stato);
    menzioni?.smonta();
    menzioni = null;
    carrello = [];
    const sotto = q(c, 'sub');
    sotto.replaceChildren();
    sotto.hidden = true;
    accendiNelCanale(c, null, null);
  };
  /** Il task 3 scelto con Owner blu: il bot dà il task alle persone del menu (sulTask). */
  const dalMenu = (c: HTMLElement) => {
    const { persone, ruoli } = divisa(carrello, S1);
    fatto(c, comeAtteso(applicaOwner(S1, '3', persone, ruoli), S2, 'il menu di Owner'));
  };
  /**
   * Il task 3 scelto con Reminder blu: la lista si blocca e la modale si apre coi campi proposti (scriviIlPromemoria).
   * Submit manda i valori; il bot sblocca la lista quando risponde, con quella nuova (dallaModale).
   */
  const promemoria = (c: HTMLElement) => {
    disegnaLista(c, { ...S2, bloccata: true });
    mandati = null;
    chiudiModale = apriModale(c, modaleDelPromemoria('3', campi), q(c, 'sel'), {
      invio: (valori) => {
        chiudiModale = null;
        mandati = valori;
      },
    });
  };
  /** La risposta del bot al Submit: i promemoria ricorrenti sono spenti, il default, quindi salva subito. */
  const dallaModale = (c: HTMLElement) => {
    if (!mandati) throw new Error('Submit non ha mandato la modale del promemoria');
    const scritti = campiDalPromemoria(mandati);
    const valido = validaPromemoria(scritti);
    if ('errori' in valido) throw new Error(`la modale del promemoria è stata rifiutata: ${valido.errori.join(' ')}`);
    fatto(c, comeAtteso(applicaPromemoria(S2, '3', valido.at, scritti.zona), S3, 'la modale del promemoria'));
  };

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
      { t: 4.05, fai: (s) => owner(chan(s), S1) },
      { t: 4.95, fai: (s) => clic(s, 'sub-sel') },
      { t: 5.65, fai: (s) => clic(s, 'sub-mia') },
      // Il clic fuori chiude il menu, che manda Mia: il bot la tiene finché non arriva il task.
      { t: 6.25, fai: (s) => clicFuori(s, 'msghead') },
      { t: 7.05, fai: (s) => apriSelettore(chan(s), true) },
      { t: 7.85, fai: (s) => apriSelettore(chan(s), false) },
      { t: 8.1, fai: (s) => dalMenu(chan(s)) },
      { t: 9.45, fai: (s) => accendiNelCanale(chan(s), 'reminder', 'blue') },
      { t: 10.15, fai: (s) => apriSelettore(chan(s), true) },
      { t: 10.85, fai: (s) => apriSelettore(chan(s), false) },
      { t: 11.0, fai: (s) => promemoria(chan(s)) },
      { t: 12.05, fai: (s) => clic(s, 'm-submit') },
      { t: 12.3, fai: (s) => dallaModale(chan(s)) },
    ],
    // La modale si apre in 0,15 s: opacità e scala da --in.
    continui: (s, t) => {
      s.querySelector<HTMLElement>('[data-k="modalwrap"]')?.style.setProperty('--in', String(tra(t, 11, 11.15)));
    },
    smonta: () => {
      menzioni?.smonta();
      menzioni = null;
      chiudiModale?.();
      chiudiModale = null;
    },
  };
}
