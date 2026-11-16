/*
 * Il copione del video dell'Activity (spec 2026-11-15-home-video-e-demo-design.md, §4.3): dal pulsante del canale si
 * apre la finestra, il canale si scurisce e tiene il solo «Join the Activity»; nella pagina si spunta il task 2, poi
 * il testo del task 3 apre il pannello, Owner sceglie Mia, Save; Reminder propone data, ora e fuso, Save; Close.
 * I pulsanti tornano grigi dopo il salvataggio, come nella pagina vera. Gli stati della lista li danno le regole della
 * demo (demo/regole.ts), dalla lista dei video, senza owner né promemoria.
 */
import {
  apriPannello, disegnaLista, salva, sceltaNelPannello, scorrimentoPerIlPannello, tastoDelPannello, unita,
  vistaDelPannello,
} from '../components/home/scene-dom';
import { MIA, PROPOSTO, ZONA, listaDeiVideo, statoIniziale } from '../components/home/demo/modello.ts';
import { applicaOwnerActivity, applicaPromemoria, spunta } from '../components/home/demo/regole.ts';
import { easeInOutCubic, easeOut, statoDopo, tra, type Copione } from './render-comune';

const SA0 = statoIniziale(listaDeiVideo());
const SA1 = spunta(SA0, '2', true);
const SA2 = statoDopo(applicaOwnerActivity(SA1, '3', [{ ruolo: false, id: MIA }]));
// Data e ora proposte, adesso più dieci minuti, nel fuso del dispositivo: quello del server.
const SA3 = statoDopo(applicaPromemoria(SA2, '3', PROPOSTO, ZONA));

const q = (s: HTMLElement, k: string) => s.querySelector<HTMLElement>(`[data-k="${k}"]`)!;
const win = (s: HTMLElement) => q(s, 'win');

/** Dopo il salvataggio: i pulsanti grigi, l'area vuota, Save spento. */
function dopoIlSalvataggio(w: HTMLElement): void {
  tastoDelPannello(w, null, null);
  vistaDelPannello(w, null);
  sceltaNelPannello(w, []);
  salva(w, 'off');
}

export function copioneDellActivity(): Copione {
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
      { t: 6.7, fai: (s) => { tastoDelPannello(win(s), 'owner', 'blue'); vistaDelPannello(win(s), 'owner'); } },
      { t: 7.6, fai: (s) => { sceltaNelPannello(win(s), [MIA]); salva(win(s), 'on'); } },
      { t: 8.5, fai: (s) => salva(win(s), 'pending') },
      { t: 8.9, fai: (s) => { disegnaLista(win(s), SA2); dopoIlSalvataggio(win(s)); } },
      // Data e ora proposte (adesso + 10 minuti) e il fuso del dispositivo: Save è già acceso.
      {
        t: 10.0,
        fai: (s) => {
          tastoDelPannello(win(s), 'reminder', 'blue');
          vistaDelPannello(win(s), 'reminder');
          salva(win(s), 'on');
        },
      },
      { t: 11.3, fai: (s) => salva(win(s), 'pending') },
      { t: 11.7, fai: (s) => { disegnaLista(win(s), SA3); dopoIlSalvataggio(win(s)); } },
      { t: 13.6, fai: (s) => apriPannello(win(s), null) },
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
  };
}
