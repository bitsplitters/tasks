/*
 * I messaggi effimeri del bot sotto la lista, nel canale della demo (piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 10, nel repo team-tasks-manager): il ponte di Riapri tutti
 * e il pannello More, in HTML, come li compone il bot. ui/effimero.ts mette loro intorno il messaggio di TTM; i
 * pulsanti (`e-<id>`) li ascolta canale.ts.
 */
import { avvisoIllustrativo } from '../scene-data.ts';
import { escape, markdown } from './markdown.ts';
import { SAM } from './modello.ts';
import type { Stato } from './modello.ts';
import type { Domanda, Esito } from './regole.ts';
import { contestoDelCanale } from './righe.ts';
import { avviso, emoji, testo, testoDellaDomanda, testoDi } from './testi.ts';
import { riquadroAvviso } from './ui/comune.ts';

/** Gli stili dei pulsanti di Discord in questi messaggi: primario, secondario, verde (Success), rosso (Danger). */
type Stile = 'primario' | 'secondario' | 'verde' | 'rosso';

const CLASSI: Record<Stile, string> = {
  primario: 'sc-btn sc-blue', secondario: 'sc-btn', verde: 'sc-btn ui-verde', rosso: 'sc-btn ui-rosso',
};

/** Un pulsante: la sola emoji (l'icona), col nome per chi legge lo schermo, o la sola scritta. */
interface Tasto {
  id: string;
  stile: Stile;
  nome: string;
  icona?: string;
  spento?: boolean;
}

function htmlDelTasto(t: Tasto): string {
  const classe = t.icona ? CLASSI[t.stile] : `${CLASSI[t.stile]} ui-scritta`;
  const nome = t.icona ? ` aria-label="${escape(t.nome)}"` : '';
  const spento = t.spento ? ' aria-disabled="true"' : '';
  const dentro = t.icona ? `<img src="/icons/${t.icona}.png" alt="">` : escape(t.nome);
  return `<button type="button" class="${classe}" data-k="e-${t.id}"${nome}${spento}>${dentro}</button>`;
}

/** Un TextDisplay, o il testo di un embed: il Markdown del bot in HTML. */
function td(md: string, stato: Stato, classe = 'ui-td'): string {
  return `<div class="${classe}">${markdown(md, contestoDelCanale(stato))}</div>`;
}

/**
 * Un embed del bot (TTMEmbed.getStandardEmbed), con la sola descrizione: la barra verde del bot, o quella gialla di un
 * avviso (TTMEmbed.avviso).
 */
function embed(md: string, stato: Stato, barra: 'verde' | 'gialla' = 'verde'): string {
  const gialla = barra === 'gialla' ? ' data-barra="gialla"' : '';
  return `<div class="sc-embed ui-emb"${gialla}>${td(md, stato)}</div>`;
}

/**
 * Il ponte di Riapri tutti (ReopenUI): la domanda nell'embed, poi [Reopen] [New date] [Cancel]. New date c'è solo se
 * uno dei task da riaprire ha un promemoria: allora la domanda ne ha la nota (testoDellaDomanda).
 */
export function htmlDelPonte(domanda: Extract<Domanda, { tipo: 'riapri' }>, stato: Stato): string {
  const tasti: Tasto[] = [{ id: 'reopen', stile: 'primario', nome: testo('tasklist.btn.reopen.confirm') }];
  if (domanda.nuovaData) tasti.push({ id: 'newdate', stile: 'secondario', nome: testo('tasklist.btn.reopen.newdate') });
  tasti.push({ id: 'cancel', stile: 'secondario', nome: testo('tasklist.btn.reopen.cancel') });
  return embed(testoDellaDomanda(domanda, stato.lista.titolo), stato) +
    `<div class="ui-tasti">${tasti.map(htmlDelTasto).join('')}</div>`;
}

/**
 * Il ponte chiuso dall'esito di riapriConfermato, senza pulsanti (ReopenLogic.scrivi): la riapertura che il bot non
 * rifà da lì, o il rifiuto nell'embed giallo dell'avviso.
 */
export function esitoDelPonte(esito: Esito, stato: Stato): string {
  if (esito.tipo === 'rifiuto') return embed(avviso(testoDi(esito.testo)), stato, 'gialla');
  return embed(testo('tasklist.reopen.done', emoji('reopen_blue')), stato);
}

/** Il ponte chiuso da Cancel (TaskListBtnReopenCancel). */
export function htmlDellAnnullamento(stato: Stato): string {
  return embed(testo('tasklist.reopen.cancelled'), stato);
}

const LINEA = '<div class="ui-linea"></div>';

/** Una voce del pannello More (OtherUI.voce): il nome in grassetto, la descrizione sotto, il pulsante a destra. */
function voce(t: Tasto, descrizione: string, stato: Stato): string {
  return `<div class="ui-voce">${td(`**${t.nome}**\n${descrizione}`, stato)}${htmlDelTasto(t)}</div>`;
}

/**
 * Il pannello More (OtherUI.panel), dove si apre l'Activity: Clone list sta qui, perché nella prima riga c'è il 🚀.
 * In cima l'avviso della demo, che dice perché i pulsanti delle voci sono spenti; poi Guide, Clone list, Download,
 * Seal list e Delete list, che Sam vede tutte perché gestisce i messaggi. Con la lista bloccata la prima voce è
 * Unlock list, accesa, senza Seal e Delete: a bloccarla può essere solo chi guarda, che ha aperto una modale.
 * Dopo Unlock list il pannello si ridisegna con l'esito in cima. Fra due voci una linea, davanti alla prima solo dopo
 * l'esito; in fondo uno spazio e la chiusura dei pannelli V2 (TTMEmbed.chiusuraV2): le tre emoji dei separatori, il
 * footer in grigio.
 */
export function htmlDelPannello(stato: Stato, dopoLoSblocco = false): string {
  const parti: string[] = [];
  const aggiungi = (html: string) => {
    if (parti.length > 0) parti.push(LINEA);
    parti.push(html);
  };
  if (dopoLoSblocco) parti.push(td(`${emoji('unlock_blue')}  ${testo('tasklist.btn.listunlock.done')}`, stato,
    'ui-td ui-esito'));
  if (stato.bloccata) {
    aggiungi(voce({ id: 'unlock', stile: 'primario', nome: testo('tasklist.btn.other.listunlock'), icona: 'unlock' },
      testo('tasklist.btn.listunlock.desc.who', `<@${SAM}>`), stato));
  }
  const spento = (id: string, nome: string, icona: string, stile: Stile = 'primario'): Tasto =>
    ({ id, stile, nome: testo(nome), icona, spento: true });
  aggiungi(voce(spento('guide', 'tasklist.btn.other.guide', 'doc'), testo('tasklist.btn.other.guide.desc'), stato));
  aggiungi(voce(spento('clone', 'tasklist.btn.other.clone', 'clone'), testo('tasklist.btn.clone.desc'), stato));
  aggiungi(voce(spento('download', 'tasklist.btn.other.download', 'download'), testo('tasklist.btn.download.desc'),
    stato));
  if (!stato.bloccata) {
    aggiungi(voce(spento('seal', 'tasklist.btn.other.seal', 'seal', 'verde'), testo('tasklist.btn.seal.desc'), stato));
    aggiungi(voce(spento('delete', 'tasklist.btn.other.delete', 'delete', 'rosso'), testo('tasklist.btn.delete.desc'),
      stato));
  }
  const chiusura = `${emoji('separator').repeat(3)}\n-# ${testo('embed.footer.text')}`;
  return `<div class="ui-cont">${riquadroAvviso(avvisoIllustrativo())}${parti.join('')}<div class="ui-spazio"></div>` +
    `${td(chiusura, stato)}</div>`;
}
