/*
 * Il Markdown di Discord nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md, §3.3;
 * piano docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 4; tutti e due nel repo team-tasks-manager): un testo
 * del bot, o di chi guarda, diventa HTML sicuro con la parte di Markdown che quei testi usano. Il grassetto, il
 * corsivo, il codice in linea, gli a capo, la riga -#, le voci di un elenco, i link verso http, https, mailto:, tel: e
 * sms: (come in «Writing a list»), le menzioni, le date, le emoji del bot e la barra che fa testo il segno che la segue.
 * Tutto il resto si scrive com'è, con l'escape.
 */

/** I nomi del server della demo e il formato delle date del posto (il canale, l'Activity). */
export interface Contesto {
  /** Il nome da mostrare; undefined per chi non è nel server. */
  persona(id: string): string | undefined;
  ruolo(id: string): string | undefined;
  canale(id: string): string | undefined;
  /** La data di `<t:N>` (stile ''), di `<t:N:F>` (stile 'F') o l'ora di `<t:N:t>` (stile 't'); gli altri come ''. */
  data(at: number, stile: string): string;
}

/** Le emoji del bot con l'immagine in /icons/: le altre si scrivono col nome, `:nome:`. */
export const EMOJI: ReadonlySet<string> = new Set([
  'tip', 'owner_blue', 'task_blue', 'clean_blue', 'reopen_blue', 'unlock_blue', 'separator', 'other', 'doc',
  'alert_blue', 'other_blue', 'activity_blue', 'doc_blue',
]);

const ENTITA: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };

/** Il testo pronto per stare in HTML, anche fra le virgolette di un attributo. */
export function escape(testo: string): string {
  return testo.replace(/[&<>"]/g, (c) => ENTITA[c]);
}

/** Un segnaposto: il numero di un pezzo già pronto fra due caratteri nulli, che l'ingresso non può contenere. */
const SEGNAPOSTO = /\u0000(\d+)\u0000/g;

/**
 * Il testo in HTML. I pezzi speciali (il codice, i link, le menzioni, le date, le emoji) escono per primi, ognuno al
 * posto di un segnaposto; poi le righe, coi loro blocchi, l'escape, il grassetto e il corsivo; alla fine i pezzi
 * rientrano. Il codice esce prima di tutto: dentro non c'è altro Markdown. Con `inLinea` il testo sta in mezzo a una
 * riga, come quello di un task nell'embed dopo il numero e la casella: niente blocchi.
 */
export function markdown(testo: string, contesto: Contesto, inLinea = false): string {
  const pezzi: string[] = [];
  const metti = (html: string) => `\u0000${pezzi.push(html) - 1}\u0000`;
  const ripristina = (s: string) => s.replace(SEGNAPOSTO, (_, n: string) => pezzi[Number(n)]);
  const menzione = (nome: string) => metti(`<span class="sc-mention">${escape(nome)}</span>`);
  const t = testo.replace(/\u0000/g, '').replace(/\r\n?/g, '\n')
    .replace(/``([^`]+?)``|`([^`]+)`/g, (_, doppio?: string, singolo?: string) =>
      metti(`<code>${escape(doppio ?? singolo ?? '')}</code>`))
    // La barra fa testo il segno che segue, come in Discord: `\@Leo` non menziona (segnaposto leggibili, 2.5.0).
    .replace(/\\([^0-9A-Za-z\s])/g, (_, segno: string) => metti(escape(segno)))
    .replace(/\[([^\]\n]+)\]\(((?:https?:\/\/|mailto:|tel:|sms:)[^\s)]+)\)/g, (_, nome: string, url: string) =>
      metti(`<a href="${escape(url)}" target="_blank" rel="noopener">${ripristina(inline(nome))}</a>`))
    .replace(/<@!?(\d+)>/g, (_, id: string) => menzione(`@${contesto.persona(id) ?? 'unknown-user'}`))
    .replace(/<@&(\d+)>/g, (_, id: string) => menzione(`@${contesto.ruolo(id) ?? 'deleted-role'}`))
    .replace(/<#(\d+)>/g, (_, id: string) => menzione(`#${contesto.canale(id) ?? 'unknown'}`))
    .replace(/<t:(-?\d{1,17})(?::([tTdDfFRsS]))?>/g, (_, at: string, stile?: string) =>
      metti(`<span class="sc-ts">${escape(contesto.data(Number(at), stile ?? ''))}</span>`))
    .replace(/<a?:(\w+):\d+>/g, (_, nome: string) =>
      EMOJI.has(nome) ? metti(`<img class="sc-emoji" src="/icons/${nome}.png" alt="">`) : `:${nome}:`);
  return ripristina(inLinea ? t.split('\n').map(inline).join('<br>') : righe(t));
}

/** Una riga: se è un blocco, la sua classe e ciò che segue il segno; altrimenti tutta, senza classe. */
function blocco(riga: string): { classe: string | null; html: string } {
  const sotto = /^-# (.*)$/.exec(riga);
  if (sotto) return { classe: 'sc-subtext', html: inline(sotto[1]) };
  const voce = /^[-*] (.*)$/.exec(riga);
  if (voce) return { classe: 'sc-li', html: inline(voce[1]) };
  return { classe: null, html: inline(riga) };
}

/**
 * Le righe in HTML. La riga -# e la voce di un elenco sono blocchi loro, come in Discord: cominciano e finiscono una
 * riga da sé, quindi gli a capo attorno non servono. Ne serve uno solo davanti a un blocco preceduto da una riga vuota,
 * perché la riga vuota si veda. Una voce si prende le righe che la seguono fino a una riga vuota o alla voce dopo,
 * come negli elenchi di simple-markdown, da cui vengono quelli di Discord: gli errori del promemoria si uniscono con
 * un a capo, quindi dopo l'errore del fuso, che è una voce, «Invalid year.» resta rientrato sotto di lei.
 */
function righe(t: string): string {
  const tutte: ReturnType<typeof blocco>[] = [];
  for (const riga of t.split('\n')) {
    const r = blocco(riga);
    const prima = tutte.at(-1);
    if (prima?.classe === 'sc-li' && !r.classe && riga.trim() !== '') prima.html += `<br>${r.html}`;
    else tutte.push(r);
  }
  let html = '';
  tutte.forEach((r, i) => {
    html += r.classe ? `<span class="${r.classe}">${r.html}</span>` : r.html;
    const dopo = tutte[i + 1];
    if (dopo && !r.classe && (!dopo.classe || r.html.trim() === '')) html += '<br>';
  });
  return html;
}

/**
 * Il grassetto e il corsivo di una riga, dopo l'escape: `***`, `**`, `*`, col testo che non comincia e non finisce con
 * uno spazio, come in Discord («5 * 3 * 2» resta com'è).
 */
function inline(riga: string): string {
  return escape(riga)
    .replace(/\*\*\*(?=\S)([^\n]*?\S)\*\*\*/g, '<em><strong>$1</strong></em>')
    .replace(/\*\*(?=\S)([^\n]*?\S)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(?=\S)([^\n]*?\S)\*/g, '<em>$1</em>');
}
