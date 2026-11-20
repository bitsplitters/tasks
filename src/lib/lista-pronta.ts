// Le liste pronte dei casi d'uso (spec 2026-11-20-casi-d-uso-sito-design.md, §5, nel repo team-tasks-manager).
//
// Una lista pronta si incolla nella finestra di /create-list, o si importa come file con la sua opzione `file`.
// Deve quindi passare dal bot su qualunque server, anche sul piano Free dopo la beta. Il controllo sta qui e lo
// chiama lo schema della collezione (content.config.ts): una lista che il bot rifiuterebbe ferma la build, invece
// di arrivare sul sito.
//
// Le regole del bot stanno in ttm-business: ModalUITaskListValidator.classifica per le righe, FormatoFileLista per
// il file. Qui se ne ripete il sottoinsieme che serve, più stretto: un task per riga, i subtask con due spazi,
// niente box, niente codici (menzioni, date, webhook, emoji dei pulsanti), niente markdown di Discord.

/** Il piano Free: 20 task per lista, subtask compresi (premium.md). */
export const TASK_MASSIMI = 20;
/** La finestra di Discord tiene 4000 caratteri; il bot conta le unità UTF-16, come `length`. */
export const CARATTERI_MASSIMI = 4000;
/** TaskList.TITLE_MAX_LENGTH, in unità UTF-16. */
export const TITOLO_MASSIMO = 90;

const RIGA = /^( {2})?- \S/;
// Caratteri che nel bot diventano altro: menzioni e canali (<@…>, <#…>), box e triplette ([]), webhook ({{…}}),
// markdown di Discord (* _ ~ ` | #), «@everyone».
const VIETATI = /[[\]<>{}@*_~`|#\\]/;
// `:owner:`, `:more:`… diventano le emoji dei pulsanti (writing-a-list.md, «Button emoji»).
const EMOJI = /:[a-z]+:/i;

/** Le righe dei task, senza quelle vuote. */
export function righe(lista: string): string[] {
  return lista.split('\n').filter((r) => r.trim() !== '');
}

/** I problemi di una lista pronta: vuoto se il bot la accetta su ogni piano. */
export function problemi(titolo: string, lista: string): string[] {
  const p: string[] = [];
  if (!titolo.trim()) p.push('il titolo è vuoto');
  if (titolo.length > TITOLO_MASSIMO) p.push(`il titolo ha ${titolo.length} caratteri, più di ${TITOLO_MASSIMO}`);
  if (VIETATI.test(titolo) || EMOJI.test(titolo)) p.push(`il titolo contiene un codice: «${titolo}»`);
  if (lista.length > CARATTERI_MASSIMI) p.push(`la lista ha ${lista.length} caratteri, più di ${CARATTERI_MASSIMI}`);

  const tutte = righe(lista);
  if (tutte.length === 0) p.push('la lista non ha task');
  if (tutte.length > TASK_MASSIMI) p.push(`la lista ha ${tutte.length} task, più di ${TASK_MASSIMI}`);
  if (tutte[0]?.startsWith(' ')) p.push('la prima riga è un subtask');
  for (const r of tutte) {
    if (!RIGA.test(r)) p.push(`riga che non è un task o un subtask a due spazi: «${r}»`);
    else if (VIETATI.test(r) || EMOJI.test(r)) p.push(`riga con un codice: «${r}»`);
  }
  return p;
}

/** Quanti task, subtask compresi. */
export const quantiTask = (lista: string) => righe(lista).length;

/**
 * Il file da importare con /create-list: il formato del Download (FormatoFileLista in ttm-business), col BOM in
 * testa come il Download, così il Blocco note lo apre in UTF-8. La riga `#!` è un metadato libero: qui dice da
 * dove viene la lista, al posto dell'avviso del Download.
 */
export function file(titolo: string, lista: string): string {
  return '﻿#!ttm/1\n'
    + '#! A ready-made list from tasks.bitsplitters.app: import it with /create-list.\n'
    + `## ${titolo}\n\n`
    + righe(lista).join('\n') + '\n';
}

/** Il nome del file salvato: il titolo senza i caratteri che un file system rifiuta, come FormatoFileLista.nomeFile. */
export function nomeFile(titolo: string): string {
  const base = titolo.replace(/[\\/:*?"<>|\p{Cc}]/gu, '_').replace(/^[.\s]+|[.\s]+$/g, '');
  return (base || 'tasklist') + '.txt';
}
