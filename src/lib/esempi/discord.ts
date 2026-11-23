/*
 * Le riproduzioni di Discord dei casi d'uso (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §3 e §5, nel repo
 * team-tasks-manager): il messaggio della lista, il promemoria come arriva, la notifica sotto la lista, ciò che manda
 * un webhook. Le righe le disegna il motore della demo della home (righe.ts, markdown.ts), coi nomi, i canali e il
 * fuso del team; i testi sono quelli del bot, con la chiave del bundle o la classe accanto. HTML statico, con le classi
 * di scene.css (sc-*) e di use-cases.css (ex-*): niente pulsanti, sembrerebbero cliccabili.
 *
 * Ogni riproduzione esce nella lingua della pagina (spec 2026-11-19-sito-multilingua-design.md, §4.3): i testi del bot
 * dal suo bundle in quella lingua (TESTI_DEL_BOT, con la chiave accanto), le date come le scrive un client Discord in
 * quella lingua, le righe sopra le schede dalla zona `casi` dei testi del sito.
 */
import { escape, markdown } from '../../components/home/demo/markdown.ts';
import type { Contesto } from '../../components/home/demo/markdown.ts';
import { daiCampi } from '../../components/home/demo/modello.ts';
import type { Lista, Task } from '../../components/home/demo/modello.ts';
import { avanzamento } from '../../components/home/demo/regole.ts';
import { righeDelCanale } from '../../components/home/demo/righe.ts';
import type { Nomi } from '../../components/home/demo/righe.ts';
import { contestoDellaSpunta, taskIn } from './controllo.ts';
import { leggi } from './testo.ts';
import { risolvi, risolviBody, risolviUrl, variabili } from './webhook.ts';
import type { Esempio, Momento, Scheda, Team, TipoDiNotifica } from './tipi.ts';
import type { Lingua } from '../../i18n/lingue.ts';
import { t } from '../../i18n/t.ts';
import { dataDiDiscord, oraDiDiscord, parti } from '../../components/home/demo/date-di-discord.ts';

/** L'istante di un momento della settimana, scritto nel fuso del team (`2026-12-08T18:00`). */
export function istante(at: string, zona: string): number {
  const [data, ora] = at.split('T');
  const [anno, mese, giorno] = data.split('-').map(Number);
  return daiCampi(giorno, mese, anno, ora, zona);
}

/** «5 minutes ago» nella lingua del client: le schede mostrano il messaggio cinque minuti dopo che è arrivato. */
const CINQUE_MINUTI_FA: Partial<Record<Lingua, string>> = {
  en: '5 minutes ago', it: '5 minuti fa', de: 'vor 5 Minuten', fr: 'il y a 5 minutes', 'es-ES': 'hace 5 minutos',
  'es-419': 'hace 5 minutos', 'pt-BR': 'há 5 minutos',
};

/**
 * Una data come la scrive un client Discord nel fuso del team (dataDiDiscord, come dataDelCanale della demo). In
 * inglese americano `<t:N>` «December 8, 2026 6:00 PM», in italiano «8 dicembre 2026 18:00». `:R` è «5 minutes ago».
 */
export function dataDelTeam(at: number, stile: string, zona: string, lingua: Lingua = 'en'): string {
  if (stile === 'R') return CINQUE_MINUTI_FA[lingua] ?? CINQUE_MINUTI_FA.en!;
  return dataDiDiscord(at, stile, zona, lingua);
}

/**
 * Il giorno e l'ora di un momento, separati: la frase sotto la lista li lega con le parole della sua lingua
 * («on Tuesday, 6:00 PM», «martedì alle 18:00»).
 */
export function giornoEOraSeparati(at: string, zona: string, lingua: Lingua = 'en'): { giorno: string; ora: string } {
  const t = istante(at, zona);
  return { giorno: parti(t, zona, lingua).weekday, ora: oraDiDiscord(t, zona, lingua) };
}

/** Il giorno e l'ora di un momento, per la linea del tempo: «Tuesday, 6:00 PM», «martedì, 18:00». */
export function giornoEOra(at: string, zona: string, lingua: Lingua = 'en'): string {
  const { giorno, ora } = giornoEOraSeparati(at, zona, lingua);
  return `${giorno}, ${ora}`;
}

export function nomiDelTeam(team: Team): Nomi {
  return {
    persona: (id) => team.people.find((p) => p.id === id)?.name,
    ruolo: (id) => team.roles.find((r) => r.id === id)?.name,
  };
}

export function contestoDelTeam(team: Team, lingua: Lingua = 'en'): Contesto {
  const nomi = nomiDelTeam(team);
  return {
    persona: nomi.persona,
    ruolo: nomi.ruolo,
    canale: (id) => team.channels.find((c) => c.id === id)?.name,
    data: (at, stile) => dataDelTeam(at, stile, team.zone, lingua),
  };
}

/** La lista dell'esempio nel modello: il controllo al build ha già detto che si legge. */
export function listaDellEsempio(esempio: Esempio): Lista {
  return { titolo: esempio.list.title, tasks: leggi(esempio.list.text, esempio.team.zone).tasks };
}

const icona = (nome: string, classe = 'sc-emoji') => `<img class="${classe}" src="/icons/${nome}.png" alt="">`;

/** L'avatar di una persona o di un webhook: un tondo col colore e l'iniziale. */
function avatar(nome: string, colore: string, classe = 'sc-avatar ex-avatar'): string {
  return `<span class="${classe}" style="background:${escape(colore)}" aria-hidden="true">${escape(nome.slice(0, 1))}</span>`;
}

/** Un messaggio: l'avatar, il nome con APP, l'ora; poi il corpo. */
function messaggio(corpo: string, ora: string, mittente?: { nome: string; colore: string }): string {
  const testa = mittente
    ? `${avatar(mittente.nome, mittente.colore)}<p class="sc-mhead"><span class="sc-name">${escape(mittente.nome)}</span>`
    : `<img class="sc-avatar" src="/icons/ttm-avatar.png" alt=""><p class="sc-mhead"><span class="sc-name">Team Tasks Manager</span>`;
  return `<div class="sc-msg">${testa}<span class="sc-app">APP</span><span class="sc-time">${escape(ora)}</span></p>`
    + `${corpo}</div>`;
}

/**
 * I testi del bot nelle riproduzioni, per lingua: i valori del suo bundle (slash-resource*.properties), con la chiave
 * accanto e i riferimenti ${…} già risolti. Una lingua che non c'è prende l'inglese.
 */
interface TestiDelBot {
  /** La riga dei Tips sotto la lista (tasklist.tips.line, con OTHER_BLUE e DOC_BLUE come EmbedDellaLista). */
  tips: string;
  /** Le frasi della notifica (tasklist.slct.owner.*, tasklist.slct.activities.completed) e della push (*.push). */
  frasi: Record<TipoDiNotifica, { frase: string; push: string; emoji: boolean }>;
  /** La riga sotto il testo push (config.slct.push.msg). */
  push: string;
}

const TESTI_DEL_BOT: Partial<Record<Lingua, TestiDelBot>> = {
  en: {
    tips: '-# Not sure what the buttons do? <:other_blue:0> More → <:doc_blue:0> Guide · '
      + '[Full docs](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'I took the following task', push: 'I took a task..', emoji: true },
      assigned: { frase: 'I assigned the owner to the following task', push: 'I assigned the owner to a task..', emoji: true },
      updated: { frase: 'I updated the owner {2} of the following task', push: 'I updated the owner of a task..', emoji: true },
      completed: { frase: 'I completed the following task:', push: 'I completed the following task..', emoji: false },
    },
    push: 'Push notification',
  },
  it: {
    tips: '-# Non sai cosa fanno i pulsanti? <:other_blue:0> Altro → <:doc_blue:0> Guida · '
      + '[Documentazione](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'ho preso il seguente task', push: 'ho preso un task..', emoji: true },
      assigned: { frase: 'ho assegnato il proprietario al seguente task', push: 'ho assegnato il proprietario a un task..', emoji: true },
      updated: { frase: 'ho aggiornato il proprietario {2} nel seguente task', push: 'ho aggiornato il proprietario di un task..', emoji: true },
      completed: { frase: 'ho completato il seguente task:', push: 'ho completato il seguente task..', emoji: false },
    },
    push: 'Notifica push',
  },
  de: {
    tips: '-# Du weißt nicht, was die Buttons machen? <:other_blue:0> Mehr → <:doc_blue:0> Anleitung · [Dokumentation](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'ich habe die folgende Aufgabe übernommen', push: 'ich habe eine Aufgabe übernommen..', emoji: true },
      assigned: { frase: 'ich habe der folgenden Aufgabe einen Besitzer zugewiesen', push: 'ich habe einer Aufgabe einen Besitzer zugewiesen..', emoji: true },
      updated: { frase: 'ich habe den Besitzer {2} der folgenden Aufgabe aktualisiert', push: 'ich habe den Besitzer einer Aufgabe aktualisiert..', emoji: true },
      completed: { frase: 'ich habe die folgende Aufgabe abgeschlossen:', push: 'ich habe die folgende Aufgabe abgeschlossen..', emoji: false },
    },
    push: 'Push-Benachrichtigung',
  },
  fr: {
    tips: '-# Tu ne sais pas à quoi servent les boutons ? <:other_blue:0> Autre → <:doc_blue:0> Guide · [Documentation](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'J\'ai pris la tâche suivante', push: 'J\'ai pris une tâche..', emoji: true },
      assigned: { frase: 'J\'ai attribué le propriétaire à la tâche suivante', push: 'J\'ai attribué le propriétaire à une tâche..', emoji: true },
      updated: { frase: 'J\'ai mis à jour le propriétaire {2} de la tâche suivante', push: 'J\'ai mis à jour le propriétaire d\'une tâche..', emoji: true },
      completed: { frase: 'j\'ai terminé la tâche suivante :', push: 'j\'ai terminé la tâche suivante..', emoji: false },
    },
    push: 'Notification push',
  },
  'es-ES': {
    tips: '-# ¿No sabes qué hacen los botones? <:other_blue:0> Más → <:doc_blue:0> Guía · [Documentación](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'He tomado la siguiente tarea', push: 'He tomado una tarea..', emoji: true },
      assigned: { frase: 'He asignado el propietario a la siguiente tarea', push: 'He asignado el propietario a una tarea..', emoji: true },
      updated: { frase: 'He actualizado el propietario {2} de la siguiente tarea', push: 'He actualizado el propietario de una tarea..', emoji: true },
      completed: { frase: 'he completado la siguiente tarea:', push: 'he completado la siguiente tarea..', emoji: false },
    },
    push: 'Notificación push',
  },
  'es-419': {
    tips: '-# ¿No sabes qué hacen los botones? <:other_blue:0> Más → <:doc_blue:0> Guía · [Documentación](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'He tomado la siguiente tarea', push: 'He tomado una tarea..', emoji: true },
      assigned: { frase: 'He asignado el propietario a la siguiente tarea', push: 'He asignado el propietario a una tarea..', emoji: true },
      updated: { frase: 'He actualizado el propietario {2} de la siguiente tarea', push: 'He actualizado el propietario de una tarea..', emoji: true },
      completed: { frase: 'he completado la siguiente tarea:', push: 'he completado la siguiente tarea..', emoji: false },
    },
    push: 'Notificación push',
  },
  'pt-BR': {
    tips: '-# Não sabe o que os botões fazem? <:other_blue:0> Mais → <:doc_blue:0> Guia · [Documentação](https://tasks.bitsplitters.app/docs/the-task-list/)',
    frasi: {
      claimed: { frase: 'Peguei a seguinte tarefa', push: 'Peguei uma tarefa..', emoji: true },
      assigned: { frase: 'Atribuí o proprietário à seguinte tarefa', push: 'Atribuí o proprietário a uma tarefa..', emoji: true },
      updated: { frase: 'Atualizei o proprietário {2} da seguinte tarefa', push: 'Atualizei o proprietário de uma tarefa..', emoji: true },
      completed: { frase: 'concluí a seguinte tarefa:', push: 'concluí a seguinte tarefa..', emoji: false },
    },
    push: 'Notificação push',
  },
};

const delBot = (lingua: Lingua): TestiDelBot => TESTI_DEL_BOT[lingua] ?? TESTI_DEL_BOT.en!;

/** Il messaggio della lista nel canale, fermo: il titolo, le righe, la riga dei Tips se sono accesi, la barra. */
export function htmlDellaLista(esempio: Esempio, lingua: Lingua = 'en'): string {
  const lista = listaDellEsempio(esempio);
  const ctx = contestoDelTeam(esempio.team, lingua);
  const righe = righeDelCanale(lista, nomiDelTeam(esempio.team), { contesto: ctx, spazi: esempio.list.spaced });
  const tips = esempio.list.tips ? `<div class="ex-tips">${markdown(delBot(lingua).tips, ctx)}</div>` : '';
  const pct = avanzamento(lista);
  const ora = dataDelTeam(istante(esempio.list.at, esempio.team.zone), 't', esempio.team.zone, lingua);
  return messaggio(`<div class="sc-embed"><p class="sc-title">${escape(lista.titolo)}</p>`
    + `<div class="sc-rows">${righe}</div>${tips}`
    + `<div class="sc-bar"${pct === 0 ? ' data-empty' : ''} style="--pct: ${pct}%"><div class="sc-bar-fill"></div></div>`
    + '</div>', ora);
}

/** Il numero del task nel messaggio del promemoria, come getTaskNumberToEmbed: «2 », «2 .1 ». */
function numeroDelPromemoria(task: Task): string {
  const { main, sub } = task.pos;
  if (!sub) return `${main}${main >= 10 ? '' : ' '}`;
  return `${main}${main >= 10 ? '.' : ' .'}${sub}${sub >= 10 ? '' : ' '}`;
}

/** Il testo senza le emoji custom e con gli spazi normalizzati (ReminderNotificationHandler.testoDm). */
function senzaEmoji(testo: string): string {
  return testo.replace(/<a?:\w+:\d+>/g, '').replace(/\s+/g, ' ').trim();
}

/** Dove arriva una scheda, detto sopra la riproduzione. */
export interface Riproduzione {
  dove: string;
  html: string;
}

/**
 * Readable push notifications è accesa, se la tabella dell'esempio non la dice spenta. Si legge dall'esempio inglese:
 * nelle traduzioni nome e scelta dell'impostazione sono tradotti.
 */
export function pushAccesa(esempio: Esempio): boolean {
  return !esempio.settings.some((s) => s.setting === 'Readable push notifications' && s.choice === 'Off');
}

/** Come si rende una riproduzione: la lingua della pagina, e se il testo push è acceso (pushAccesa). */
export interface Opzioni {
  lingua: Lingua;
  push: boolean;
}

/**
 * Il promemoria come arriva (ReminderNotificationHandler, ReminderSender): in DM a una persona, nel canale della
 * lista a un ruolo, come risposta alla lista, con la menzione del ruolo. Il testo fuori dall'embed c'è con Readable
 * push notifications accesa: in DM la prosa, nel canale la menzione e la prosa. Il pulsante porta alla lista, col suo
 * titolo.
 */
function promemoria(esempio: Esempio, task: Task, ctx: Contesto, { lingua, push }: Opzioni): Riproduzione {
  const { team } = esempio;
  const at = task.promemoria!.at;
  const ruolo = task.owner!.tipo === 'ruolo';
  const prosa = senzaEmoji(task.testo);
  const testo = !push ? (ruolo ? `<@&${task.owner!.id}>` : '') : ruolo ? `<@&${task.owner!.id}> ${prosa}` : prosa;
  const segno = '\u0001';
  const descrizione = markdown(`-# ${esempio.list.title}\n\n**\`${numeroDelPromemoria(task)}\` ${task.testo}**\n\n\n`
    + `-# ${segno}A <t:${at}:F>\n-# ${segno}B <t:${at}:R>`, ctx)
    .replace(`${segno}A`, icona('alert'))
    .replace(`${segno}B`, '<span class="ex-blank"></span>');
  const html = messaggio((testo ? `<div class="ex-content">${markdown(testo, ctx)}</div>` : '')
    + `<div class="sc-embed ex-embed">${descrizione}</div>`
    + `<div class="ex-btns"><span class="ex-link">${escape(esempio.list.title)}${ESTERNO}</span></div>`,
  dataDelTeam(at, 't', team.zone, lingua));
  const canale = team.channels.find((c) => c.id === esempio.list.channel)!.name;
  const nome = ruolo ? team.roles.find((r) => r.id === task.owner!.id)!.name : team.people.find((p) => p.id === task.owner!.id)!.name;
  const dove = ruolo ? t(lingua, 'casi.dove.promemoria.ruolo', { canale, nome }) : t(lingua, 'casi.dove.promemoria.persona', { nome });
  return { dove, html };
}

const ESTERNO = '<svg class="ex-ext" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M15 2a1 1 0 1 0 0 2h3.59l-7.3 7.3a1 1 0 0 0 1.42 1.4L20 5.42V9a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1h-6ZM5 3a3 3 0 0 0-3 3v13a3 3 0 0 0 3 3h13a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"/></svg>';

/**
 * La notifica sotto la lista (NotificaAzione): l'embed con chi ha agito come autore, la frase citata, le righe del
 * task. Il testo in chiaro è la frase push col nome, poi la menzione del nuovo owner se a dargli il task è un altro
 * (ChiAvvisareDellOwner), poi «-# Push notification» (config.slct.push.msg).
 */
function notifica(esempio: Esempio, c: Extract<Scheda, { kind: 'notice' }>, task: Task, quando: number,
  ctx: Contesto, lingua: Lingua): Riproduzione {
  const { team } = esempio;
  const chi = team.people.find((p) => p.id === c.by)!;
  const bot = delBot(lingua);
  const f = bot.frasi[c.type];
  const dopo: Task = { ...task, fatto: c.type === 'completed' };
  const prima = c.from ? (team.roles.some((r) => r.id === c.from) ? `<@&${c.from}>` : `<@${c.from}>`) : '';
  const frase = markdown(f.frase.replace('{2}', prima), ctx, true);
  const nuovo = task.owner && c.type !== 'completed' && c.type !== 'claimed'
    && (task.owner.tipo === 'ruolo' || task.owner.id !== c.by)
    ? ` ${task.owner.tipo === 'ruolo' ? '<@&' : '<@'}${task.owner.id}>` : '';
  const testo = `${chi.name}: ${f.push}${nuovo}\n-# ${bot.push}`;
  const righe = righeDelCanale({ titolo: '', tasks: [dopo] }, nomiDelTeam(team), { contesto: ctx });
  const html = messaggio(`<div class="ex-content">${markdown(testo, ctx)}</div>`
    + `<div class="sc-embed ex-embed"><p class="ex-author">${avatar(chi.name, chi.color, 'ex-av')}${escape(chi.name)}</p>`
    + `<div class="ex-quote">${f.emoji ? icona('owner_blue') : ''}<em>${frase}</em></div>`
    + `<div class="sc-rows ex-gap">${righe}</div></div>`, dataDelTeam(quando, 't', team.zone, lingua));
  const canale = team.channels.find((x) => x.id === esempio.list.channel)!.name;
  return { dove: t(lingua, 'casi.dove.notifica', { canale }), html };
}

/** Il JSON con due spazi, per leggere la richiesta. */
function bello(json: string): string {
  return JSON.stringify(JSON.parse(json), null, 2);
}

/**
 * Ciò che manda il webhook quando `by` spunta il task: per un webhook di Discord il messaggio che il canale riceve
 * (il `content` del body risolto, col nome del webhook); per gli altri servizi la richiesta, coi token sostituiti.
 */
function webhook(esempio: Esempio, c: Extract<Scheda, { kind: 'webhook' }>, task: Task, quando: number,
  ctx: Contesto, lingua: Lingua): Riproduzione {
  const w = esempio.webhooks.find((x) => x.name === c.webhook)!;
  const tctx = contestoDellaSpunta(esempio, task, c.by, new Date(quando * 1000).toISOString().replace('.000Z', 'Z'));
  const vars = variabili(task.testo);
  const body = risolviBody(w.body, tctx, vars);
  if (w.service === 'discord' && w.postsAs) {
    const content = String((JSON.parse(body) as { content?: string }).content ?? '');
    const canale = esempio.team.channels.find((x) => x.id === w.postsAs!.channel)!.name;
    const html = messaggio(`<div class="ex-content">${markdown(content, ctx)}</div>`,
      dataDelTeam(quando, 't', esempio.team.zone, lingua), { nome: w.postsAs.name, colore: w.postsAs.color });
    return { dove: t(lingua, 'casi.dove.webhook', { canale }), html };
  }
  const intestazioni = w.headers.trim().split('\n').map((r) => risolvi(r, tctx, vars)).join('\n');
  const richiesta = `${w.method} ${risolviUrl(w.url, tctx, vars)}\n${intestazioni}\n\n${bello(body)}`;
  return { dove: t(lingua, 'casi.dove.richiesta'), html: `<pre class="ex-req"><code>${escape(richiesta)}</code></pre>` };
}

/**
 * La riproduzione della scheda di un momento, o null se il momento non ne ha. Senza opzioni è in inglese, col testo
 * push letto dall'esempio stesso.
 */
export function riproduzione(esempio: Esempio, m: Momento, opzioni?: Opzioni): Riproduzione | null {
  const c = m.card;
  if (!c) return null;
  const o = opzioni ?? { lingua: 'en', push: pushAccesa(esempio) };
  const tasks = listaDellEsempio(esempio).tasks;
  const task = taskIn(tasks, c.task)!;
  const ctx = contestoDelTeam(esempio.team, o.lingua);
  const quando = istante(m.at, esempio.team.zone);
  if (c.kind === 'reminder') return promemoria(esempio, task, ctx, o);
  if (c.kind === 'notice') return notifica(esempio, c, task, quando, ctx, o.lingua);
  return webhook(esempio, c, task, quando, ctx, o.lingua);
}
