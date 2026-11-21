/*
 * I testi del bot nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 3; tutti e due nel repo team-tasks-manager): i valori
 * inglesi del bundle del bot (slash-resource.properties) coi riferimenti ${…} già risolti; le funzioni che li
 * compongono come fa il bot. La tabella sta in fondo al file. scripts/demo-testi.test.ts la confronta col bundle: se il
 * bot cambia un testo, dice quale voce allineare. I testi di Discord (Cancel, Submit, i messaggi dei campi) e quelli
 * della demo stanno in scene-data.ts.
 */
import type { Domanda, Esito, Testo } from './regole.ts';

type Argomento = string | number;

/** Un'emoji del bot come la scrive Discord in un testo, un'emoji custom: `<:nome:0>`. La disegna markdown.ts. */
export function emoji(nome: string): string {
  return `<:${nome}:0>`;
}

/**
 * Il testo di una chiave con gli argomenti al loro posto, come ResourceBundleUtil.format (ICU MessageFormat) e
 * replaceValues del framework. `{0}`, `{1}`… diventano gli argomenti; uno che manca resta scritto com'è.
 * `{n, plural, …}` sceglie la forma dal numero (`=k`, poi `one` per 1, poi `other`) col `#` che lo scrive; le forme
 * possono contenere altri segnaposto. Un argomento non si rilegge: un «{1}» o un «#» nel titolo restano tali. Gli
 * apostrofi sono letterali, perché nei testi della demo non ce n'è uno che ICU leggerebbe come virgolette: il test lo
 * controlla. Una chiave che la demo non ha lancia: è un errore della demo, non di chi guarda.
 */
export function testo(chiave: string, ...argomenti: Argomento[]): string {
  if (!Object.hasOwn(TESTI, chiave)) throw new Error(`La demo non ha il testo «${chiave}»`);
  return componi(TESTI[chiave], 0, argomenti, NaN, false)[0];
}

/** Un numero come lo scrive ICU in inglese: 1,500. */
const numero = (n: number) => n.toLocaleString('en-US');

/**
 * Il modello da `i` in avanti, fino alla fine o, se `annidato`, alla graffa che chiude la forma di un plurale: il
 * testo composto e dove si è fermato. `n` è il numero del plurale che contiene il pezzo, che il `#` scrive; fuori da
 * un plurale è NaN, così il `#` resta testo.
 */
function componi(m: string, i: number, argomenti: Argomento[], n: number, annidato: boolean): [string, number] {
  let fuori = '';
  while (i < m.length && !(annidato && m[i] === '}')) {
    if (m[i] === '#' && !Number.isNaN(n)) {
      fuori += numero(n);
      i++;
    } else if (m[i] === '{') {
      const [pezzo, dopo] = segnaposto(m, i, argomenti);
      fuori += pezzo;
      i = dopo;
    } else {
      fuori += m[i++];
    }
  }
  return [fuori, i];
}

/**
 * Il segnaposto che comincia in `i`, già composto, con la posizione dove finisce. Una graffa che non apre un
 * segnaposto è testo, come in replaceValues. Per un argomento che manca ICU scrive `{n}`, anche al posto di un plurale
 * intero.
 */
function segnaposto(m: string, i: number, argomenti: Argomento[]): [string, number] {
  const semplice = /^\{\s*(\d+)\s*\}/.exec(m.slice(i));
  if (semplice) {
    const a = argomenti[Number(semplice[1])];
    const pezzo = a === undefined ? `{${semplice[1]}}` : typeof a === 'number' ? numero(a) : a;
    return [pezzo, i + semplice[0].length];
  }
  const plurale = /^\{\s*(\d+)\s*,\s*plural\s*,/.exec(m.slice(i));
  if (!plurale) return ['{', i + 1];
  const a = argomenti[Number(plurale[1])];
  const quanti = a === undefined ? NaN : Number(a);
  const forme = new Map<string, string>();
  let j = i + plurale[0].length;
  for (let s = selettore(m, j); s; s = selettore(m, j)) {
    const [forma, fine] = componi(m, j + s[0].length, argomenti, quanti, true);
    forme.set(s[1], forma);
    j = fine + 1;
  }
  const chiusa = /^\s*\}/.exec(m.slice(j));
  if (!chiusa) throw new Error(`Un plurale che la demo non sa leggere: ${m}`);
  const fine = j + chiusa[0].length;
  if (a === undefined) return [`{${plurale[1]}}`, fine];
  const forma = forme.get(`=${quanti}`) ?? (quanti === 1 ? forme.get('one') : undefined) ?? forme.get('other');
  if (forma === undefined) throw new Error(`Un plurale senza la forma other: ${m}`);
  return [forma, fine];
}

/** Il selettore di una forma del plurale che comincia in `j` (`one {`, `=0 {`), con la graffa che la apre. */
function selettore(m: string, j: number): RegExpExecArray | null {
  return /^\s*(=\d+|[a-z]+)\s*\{/.exec(m.slice(j));
}

/**
 * Ciò che un testo può avere in testa al posto dell'emoji di un avviso: un'emoji custom, anche animata, o una fra ⚠️ ❗
 * ❌, con gli spazi attorno (TTMEmbed.EMOJI_INIZIALE, gli spazi di `\s` in Java); e il `{0}`, che nel bot è sempre
 * l'emoji tip, mentre qui un testo composto senza argomenti lo lascia scritto.
 */
const IN_TESTA = /^[ \t\n\v\f\r]*(?:<a?:\w+:\d+>|[⚠❗❌]️?|\{0\})[ \t\n\v\f\r]*/;

/** Un avviso del bot (TTMEmbed.avviso): l'emoji tip, uno spazio, il testo senza ciò che aveva in testa. */
export function avviso(messaggio: string): string {
  let corpo = messaggio.trimStart();
  for (let m = IN_TESTA.exec(corpo); m; m = IN_TESTA.exec(corpo)) corpo = corpo.slice(m[0].length);
  return `${emoji('tip')} ${corpo}`;
}

/** La faccia della mascotte nel fumetto della demo (spec 2026-11-21-mascotte-nel-sito-design.md, §2.2). */
export type Umore = 'sorpreso' | 'contento';

/** Sorpresa per un avviso del bot (avviso(): l'emoji tip in testa), contenta per le altre risposte. */
export function umoreDelFumetto(md: string): Umore {
  return md.startsWith(`${emoji('tip')} `) ? 'sorpreso' : 'contento';
}

/** Oltre questa lunghezza l'elenco dei token tolti si chiude con «…» (TokenTolti.ELENCO_MAX). */
const ELENCO_MAX = 1500;

/**
 * L'elenco dei token tolti dal testo di un task, per `tasklist.modal.task.filtered.warning`, come TokenTolti.testo:
 * ogni token fra apici inversi, così una menzione si legge com'è scritta (gli apici che aveva diventano apostrofi); le
 * voci unite da «, »; al posto di quella che porterebbe l'elenco oltre i 1500 caratteri, «…» chiude l'elenco.
 */
export function elencoDeiTolti(tolti: string[]): string {
  const voci: string[] = [];
  let lunghezza = 0;
  for (const tolto of tolti) {
    const voce = `\`${tolto.replaceAll('`', "'")}\``;
    if (lunghezza + voce.length > ELENCO_MAX) {
      voci.push('…');
      break;
    }
    voci.push(voce);
    lunghezza += voce.length + 2;
  }
  return voci.join(', ');
}

/**
 * Il testo di una domanda del bot, con l'emoji che il bot le passa: TaskListMdlOwnerRemoveConfirm (l'owner di un task
 * col promemoria), TaskListMdlTaskDeleteConfirm (un gruppo: i subtask vanno sotto quello sopra, o diventano
 * principali), TaskListMdlCleanConfirm (Pulisci: la domanda, poi l'avvertenza), ReopenUI.testo (Riapri tutti: la
 * domanda, poi la nota su New date se c'è un promemoria da spostare). Il ramo generico di Pulisci, per un titolo vuoto
 * o un embed che non si legge, non serve: nella demo il titolo c'è sempre.
 */
export function testoDellaDomanda(domanda: Domanda, titolo: string): string {
  switch (domanda.tipo) {
    case 'togliOwner':
      return testo('tasklist.modal.owner.remove.question', emoji('owner_blue'), domanda.pos);
    case 'eliminaGruppo':
      return domanda.sopra === null
        ? testo('tasklist.modal.task.delete.question.first', emoji('task_blue'), domanda.pos)
        : testo('tasklist.modal.task.delete.question.group', emoji('task_blue'), domanda.pos, String(domanda.sopra));
    case 'pulisci':
      return `${testo('tasklist.modal.clean.question', emoji('clean_blue'), domanda.completati, titolo.trim())}\n\n`
        + testo(`tasklist.modal.clean.warning.${domanda.avvertenza}`, domanda.completati);
    case 'riapri': {
      const d = testo('tasklist.reopen.bridge.question', emoji('reopen_blue'), domanda.spuntati, titolo.trim());
      return domanda.nuovaData ? `${d}\n\n${testo('tasklist.reopen.bridge.date')}` : d;
    }
  }
}

/** L'avviso di una modale del promemoria rifiutata (TaskListMdlWhen): gli errori uno per riga, nell'ordine dato. */
export function testoDegliErrori(chiavi: string[]): string {
  return avviso(testo('tasklist.modal.alert.errors', chiavi.map((k) => testo(k)).join('\n')));
}

/** Il testo di una regola (regole.ts), con i suoi argomenti. */
export function testoDi(t: Testo): string {
  return testo(t.chiave, ...(t.argomenti ?? []));
}

/**
 * Il testo di un promemoria salvato, come ReminderSaver: il calendario e la data per esteso. Senza badge: nella demo il
 * promemoria è sempre un evento singolo (ReminderDisplay.toBadge).
 */
export function testoDelPromemoria(at: number): string {
  return `📅 <t:${at}:F>`;
}

/**
 * Ciò che il bot risponde all'esito di un'azione, che la demo mostra nel fumetto. Il rifiuto e l'avviso sono avvisi
 * (TTMEmbed.avviso); il messaggio si scrive com'è, senza emoji, al posto della riuscita (ReminderSaver: «No changes» è
 * un embed semplice). La riuscita è quella data, per le azioni che ne scrivono una (il promemoria salvato). Null per le
 * altre, che ridisegnano la lista e basta; null anche per una domanda, che apre la sua modale.
 */
export function rispostaDellEsito(esito: Esito, riuscita: string | null = null): string | null {
  if (esito.tipo === 'rifiuto') return avviso(testoDi(esito.testo));
  if (esito.tipo === 'domanda') return null;
  if (esito.avviso) return avviso(testoDi(esito.avviso));
  return esito.messaggio ? testoDi(esito.messaggio) : riuscita;
}

/**
 * I testi inglesi del bot che la demo usa, per chiave, nell'ordine dei gruppi. Generati dal bundle, coi riferimenti
 * ${…} risolti dal bundle stesso come PropertyResolver: non si correggono a mano, si allineano al bundle.
 */
export const TESTI: Readonly<Record<string, string>> = Object.freeze({
  // Owner
  'tasklist.slct.owner': 'Pick a task in the menu above to take it, or choose who gets it',
  'tasklist.slct.owner.sameselection.error': 'What you chose is already the owner of the task.',
  'tasklist.slct.owner.claim.yours.error':
    "This task is already yours. To leave it, press **Owner** until it's red, then pick the task.",
  'tasklist.slct.owner.claim.taken.error':
    'This task already has an owner: {0}. Replacing them takes an explicit choice: choose yourself, other people or a ' +
    'role in the menu under the buttons, then pick the task again.',
  'tasklist.slct.owner.mixed.error':
    '{0} A task has one owner: several people or one role — not people and roles together, and not more than one ' +
    'role.',
  'tasklist.slct.owner.delete.notpresent.error': 'The selected task has no owner.',
  'tasklist.modal.owner.remove.title': 'Remove the owner?',
  'tasklist.modal.owner.remove.question':
    '{0} Task **{1}** has a reminder: without an owner it would reach no one, so the reminder is removed too.\n\n' +
    'Submit to remove the owner and its reminder, or close the window to leave everything as it is.',
  // I tag
  'tasklist.slct.tag': 'Choose the tag, then the task',
  'tasklist.slct.tag.noselection.error': 'Select a role or user to add to the task.',
  'tasklist.slct.tag.delete.notpresent.error': 'There are no tags in the selected task.',
  'tasklist.slct.tag.delete.blank.error':
    'The task contains only tags: removing them would leave it without text, so they stay. No change applied.',
  // Il contenuto
  'tasklist.modal.task.title': 'Edit the content of your task',
  'tasklist.modal.task.label': 'Mandatory field',
  'tasklist.modal.task.blank.error':
    'The task was left without text, so the change was not saved. Reminders, owners and webhooks don\'t count as ' +
    'text: you set them with their buttons.',
  'tasklist.modal.task.months.error':
    'The task text contains a reminder in months (`M`), which aren\'t accepted, so the change was not saved. A ' +
    'task\'s reminder is set with its button, in days, hours or minutes.',
  'tasklist.modal.task.filtered.warning':
    'I removed {0} from the task text.\n\nThis form only changes the task\'s content: owners, tags, reminders and ' +
    'webhooks have their own buttons.',
  'tasklist.modal.task.delete.title': 'Delete the group?',
  'tasklist.modal.task.delete.question.group':
    '{0} Task **{1}** has subtasks. If you delete it, its subtasks stay where they are and become subtasks of task ' +
    '**{2}**, the group right above.\n\nSubmit to delete the task, or close the window to leave everything as it is.',
  'tasklist.modal.task.delete.question.first':
    '{0} Task **{1}** has subtasks. If you delete it, its subtasks stay where they are and, with no group above, all ' +
    'become main tasks.\n\nSubmit to delete the task, or close the window to leave everything as it is.',
  'tasklist.modal.lock.hint':
    '-# Closing this form with *Cancel* or ✕ leaves the list locked: unlock it from **More → Unlock list**.',
  'tasklist.modal.names.legend.people': 'People: {0}',
  'tasklist.modal.names.legend.roles': 'Roles: {0}',
  'tasklist.modal.names.legend.channels': 'Channels: {0}',
  'tasklist.modal.names.legend.rules':
    'Dates in **{0}**, like `{1}`. Someone new: `@` and their name. To write @ without a mention: `\\@`',
  'tasklist.slct.task.last.error':
    'It is not possible to delete the last remaining task. To delete the list, use **Delete list** in **More**.',
  // Il promemoria
  'tasklist.modal.alert.title': 'Set reminder for task {0}',
  'tasklist.modal.alert.timezone': 'Time zone at: timezones.bitsplitters.app',
  'tasklist.modal.alert.timezone.placeholder': 'Example: Europe/Rome',
  'tasklist.modal.alert.date.minutes.error':
    '- **Invalid reminder**. Reminder must be at least 5 minutes away from now.',
  'tasklist.modal.alert.timezone.error':
    '- **Incorrect time zone**. There is no match between the official time zones and the one you entered. Copy and ' +
    'paste your zone by searching for it on [Time Zone Picker](https://timezones.bitsplitters.app).',
  'tasklist.modal.alert.errors': '**Unable to create reminder due to the following errors:**\n\n{0}',
  'tasklist.modal.when.day': 'Day',
  'tasklist.modal.when.month': 'Month',
  'tasklist.modal.when.year': 'Year (yyyy)',
  'tasklist.modal.when.time': 'Time (HH:mm)',
  'tasklist.modal.when.date.error': 'The date does not exist: check day, month and year.',
  'tasklist.modal.when.time.error': 'Invalid time: use the 24h format HH:mm (e.g. 15:30).',
  'tasklist.modal.when.year.error': 'Invalid year.',
  'tasklist.modal.when.month.error': 'Invalid month: pick one from the list.',
  'tasklist.slct.alert.checkedtask.error': "A completed task can't have a reminder. Untick it first if it's still to do.",
  'tasklist.slct.alert.noreminder.error': 'There is no reminder in the selected task.',
  'tasklist.reminder.unchanged': 'No changes: the reminder stays as it was.',
  // Il webhook
  'tasklist.slct.webhook': 'Choose the webhook to associate',
  'tasklist.slct.webhook.none': 'Choose a webhook first, then select the task to associate it with.',
  'tasklist.slct.webhook.delete.notpresent.error': 'There is no webhook in the selected task.',
  // La prima riga del canale
  'tasklist.btn.activity.enter': 'Join the Activity',
  'tasklist.modal.edit.title': 'Edit your activities list',
  'tasklist.modal.edit.txt.title.label': 'List title',
  'tasklist.modal.edit.txt.list.label': 'List of activities',
  'tasklist.btn.clean.noselection': 'No tasks selected.',
  'tasklist.btn.clean.emptylist':
    'Unable to proceed! Please deselect at least one task, or delete the list with **Delete list**.',
  'tasklist.modal.clean.title': 'Clean the list',
  'tasklist.modal.clean.question':
    '{0} {1, plural, one {Remove the only completed task of **{2}**?} other {Remove the # completed tasks of ' +
    '**{2}**?}}',
  'tasklist.modal.clean.warning.all':
    '{0, plural, one {It leaves the list for good, together with its reminder and tags. If your server\'s ' +
    'configuration allows it, the notification in the list\'s channel or in its own thread will show the removed ' +
    'task.} other {They leave the list for good, together with their reminders and tags. If your server\'s ' +
    'configuration allows it, the notification in the list\'s channel or in its own thread will show the removed ' +
    'tasks.}}\n-# Submit to confirm, close this window to cancel.',
  'tasklist.modal.clean.warning.reminders':
    '{0, plural, one {It leaves the list for good, together with its reminder. If your server\'s configuration ' +
    'allows it, the notification in the list\'s channel or in its own thread will show the removed task.} other ' +
    '{They leave the list for good, together with their reminders. If your server\'s configuration allows it, the ' +
    'notification in the list\'s channel or in its own thread will show the removed tasks.}}\n-# Submit to confirm, ' +
    'close this window to cancel.',
  'tasklist.modal.clean.warning.tags':
    '{0, plural, one {It leaves the list for good, together with its tags. If your server\'s configuration allows ' +
    'it, the notification in the list\'s channel or in its own thread will show the removed task.} other {They leave ' +
    'the list for good, together with their tags. If your server\'s configuration allows it, the notification in the ' +
    'list\'s channel or in its own thread will show the removed tasks.}}\n-# Submit to confirm, close this window to ' +
    'cancel.',
  'tasklist.modal.clean.warning.plain':
    '{0, plural, one {It leaves the list for good. If your server\'s configuration allows it, the notification in ' +
    'the list\'s channel or in its own thread will show the removed task.} other {They leave the list for good. If ' +
    'your server\'s configuration allows it, the notification in the list\'s channel or in its own thread will show ' +
    'the removed tasks.}}\n-# Submit to confirm, close this window to cancel.',
  'tasklist.reopen.bridge.question':
    '{0} {1, plural, one {Reopen the only completed task of **{2}**?} other {Reopen the # completed tasks of ' +
    '**{2}**?}}\n\nEvery task goes back to to-do: those with a webhook call it.',
  'tasklist.reopen.bridge.date':
    'With **New date** you also move the reminders of the tasks you reopen: the first one in the calendar lands on ' +
    'the date you pick, the others follow at the same distance from it. The reminders of tasks still to do stay as ' +
    'they are.',
  'tasklist.reopen.none.error': '{0} No task is completed: there is nothing to reopen.',
  'tasklist.reopen.done': '{0} *List reopened: every task is to-do again.*',
  'tasklist.reopen.cancelled': 'Reopening cancelled.',
  'tasklist.modal.reopen': 'New date for the reminders',
  'tasklist.modal.clone.date.now.error':
    '- **Invalid date**. The base date must be at least 5 minutes away from now.',
  'tasklist.btn.reopen.confirm': 'Reopen',
  'tasklist.btn.reopen.newdate': 'New date',
  'tasklist.btn.reopen.cancel': 'Cancel',
  'tasklist.modal.activity.error':
    'In the meantime the list moved into the Activity: the change was not saved. To continue there, use ' +
    '**Join the Activity** under the list.',
  'tasklist.action.unavailable.error':
    "{0} This list can't be changed right now: someone is editing it, or it has been sealed.",
  // More
  'tasklist.btn.other.listunlock': 'Unlock list',
  'tasklist.btn.listunlock.desc.who':
    '{0} is editing the list: its buttons are off. If they closed without saving, turn it back on for everyone here.',
  'tasklist.btn.listunlock.done': 'List unlocked: its buttons work again.',
  'tasklist.tips.line':
    '-# Not sure what the buttons do? {0} More → {1} Guide · [Full docs](https://tasks.bitsplitters.app/docs/the-task-list/)',
  'tasklist.btn.other.guide': 'Guide',
  'tasklist.btn.other.guide.desc': 'How every button of the list works, in short.',
  'tasklist.btn.other.clone': 'Clone list',
  'tasklist.btn.clone.desc':
    'Copies the list into another channel: you pick the channel from the menu that appears under the list.',
  'tasklist.btn.other.download': 'Download',
  'tasklist.btn.download.desc': 'Downloads the list as a .txt file, which you can import again with /create-list.',
  'tasklist.btn.other.seal': 'Seal list',
  'tasklist.btn.seal.desc':
    'The list stays in the channel as a record, without buttons; it leaves the database and frees its slot.',
  'tasklist.btn.other.delete': 'Delete list',
  'tasklist.btn.delete.desc': 'Deletes the list and its reminders.',
  'embed.footer.text': 'Team Tasks Manager is in beta. What does it mean? /beta',
  // Il selettore dei task
  'tasklist.slct.activities.hint.check': 'Tick a task',
  'tasklist.slct.activities.hint.content.edit': 'Edit task',
  'tasklist.slct.activities.hint.content.delete': 'Delete task',
  'tasklist.slct.activities.hint.owner.edit': 'Edit owner',
  'tasklist.slct.activities.hint.owner.delete': 'Remove owner',
  'tasklist.slct.activities.hint.owner.take': 'Take or assign a task',
  'tasklist.slct.activities.hint.tag.edit': 'Edit tags',
  'tasklist.slct.activities.hint.tag.delete': 'Remove tags',
  'tasklist.slct.activities.hint.reminder.edit': 'Edit reminder',
  'tasklist.slct.activities.hint.reminder.delete': 'Remove reminder',
  'tasklist.slct.activities.hint.webhook.edit': 'Link webhook',
  'tasklist.slct.activities.hint.webhook.delete': 'Unlink webhook',
  // L'Activity
  'activity.tips.line':
    '-# Not sure where to start? Tap a box to tick a task, tap its text for the rest. {0} Guide · '
    + '[Docs](https://tasks.bitsplitters.app/docs/activity/)',
  'activity.btn.guide': 'Guide',
  'activity.btn.edit': 'Edit the list',
  'activity.btn.clean': 'Clean the list',
  'activity.btn.reopen': 'Reopen all',
  'activity.btn.exit': 'Exit',
  'activity.here.list': '{0, plural, one {# person in this list} other {# people in this list}}',
  'activity.panel.choose': 'Choose what to change in task {0}',
  'activity.panel.label': 'Task {0}',
  'activity.panel.save': 'Save',
  'activity.panel.delete': 'Delete',
  'activity.panel.close': 'Close',
  'activity.content.label': 'Text of the task',
  'activity.content.help': '-# A channel: `#` and its name. To write # or @ without a mention: `\\#` `\\@`',
  'activity.content.last':
    '{0} This is the last task of the list, and a list can\'t be left empty. To delete the whole list, use the ' +
    'channel.',
  'activity.picker.here': 'Now in the Activity',
  'activity.picker.search': 'Search people and roles',
  'activity.picker.none': 'Nobody matches «{0}»',
  'activity.picker.you': 'you',
  'activity.picker.add': 'Add {0}',
  'activity.picker.remove': 'Remove {0}',
  'activity.picker.full': '25 tags at most: remove one to add another.',
  'activity.tag.delete.blank': 'The task contains only tags: removing them would leave it without text, so they stay.',
  'activity.reminder.date': 'Date',
  'activity.reminder.time': 'Time',
  'activity.reminder.zone': 'Time zone',
  'activity.reminder.device': 'On this device: {0}',
  'activity.reminder.past': '**The date has already passed.** Choose a new one to save.',
  'activity.reminder.owner.you': '{0} The task has no owner: saving the reminder makes you its owner automatically.',
  'activity.zone.title': 'Time zone',
  'activity.zone.back': 'Back',
  'activity.zone.search': 'City, country, Europe/Rome or +5:30',
  'activity.zone.yours': 'Your time zones',
  'activity.zone.reason.device': 'this device',
  'activity.zone.reason.chosen': 'chosen by you',
  'activity.zone.reason.server': 'the server',
  'activity.zone.none': 'No time zone matches «{0}»',
  'activity.webhook.trigger.completion': 'on completion',
  'activity.webhook.trigger.both': 'always',
  'activity.webhook.none':
    '{0} The server has no webhooks yet. They are created in the channel with **/config webhook**, by whoever ' +
    'manages the server.',
  'activity.webhook.missing': 'no longer exists',
  'activity.exit.title': 'Exit the Activity',
  'activity.exit.question':
    '{0, plural, one {Someone else is working on the list with you.} other {# other people are working on the list ' +
    'with you.}} You can leave on your own and let the others carry on, or bring the list back to the channel for ' +
    'everyone.',
  'activity.exit.channel.only':
    '-# Only in the channel: Clone, Download, Seal, Delete, Unlock and the import from a file.',
  'activity.exit.me': 'Leave on your own',
  'activity.exit.all': 'Bring back to the channel for everyone',
  'activity.exit.hint':
    '⚠️ **Important**:\nTo leave this mode properly, tap {0} **Exit**: this lets TTM update the list in the channel ' +
    'instantly.',
  'activity.dialog.close': 'Close',
  'activity.dialog.cancel': 'Cancel',
  'activity.guide.page': '{0} of {1}',
  'activity.guide.prev': 'Previous page',
  'activity.guide.next': 'Next page',
  'activity.guide.1':
    '**Tick a task by tapping its box.**\n\nA group carries its subtasks along and follows their state, as in the ' +
    'channel.',
  'activity.guide.2':
    '**Tap the text of a task** to open its panel, with the buttons of the channel: content, owner, tags, reminder ' +
    'and webhook.\n\nOne tap turns a button blue, to change; a second turns it red, to delete.\n\nNothing is deleted ' +
    'until you tap **Delete**.',
  'activity.guide.3':
    '**While you change a task**, whoever is with you sees it locked, but can work on every other task.\n\nEdit, ' +
    'Clean and Reopen all wait until you are done.',
  'activity.guide.4': '**The first row** works on the whole list:',
  'activity.guide.4.doc': 'this guide',
  'activity.guide.4.edit': 'edit the list as text',
  'activity.guide.4.clean': 'clean the completed tasks',
  'activity.guide.4.reopen': 'reopen the completed tasks',
  'activity.guide.4.back': 'exit',
  'activity.guide.5':
    '**Exit** brings the list back to the channel when you are alone.\n\nWith others you choose: leave on your own, ' +
    'or bring the list back for everyone.\n\n**Only in the channel:** Clone, Download, Seal, Delete, Unlock and the ' +
    'import from a file.\n\n[The guide on our site](https://tasks.bitsplitters.app/docs/activity/) covers everything.',
  'activity.edit.locked': '-# 🔒 The list is locked for the others until you save or cancel.',
  'activity.clean.note': '-# The summary at the end of the session records how many tasks you removed.',
  'activity.clean.confirm': 'Clean',
  'activity.clean.none': '{0} No task is completed: there is nothing to clean.',
  'activity.clean.all':
    '{0} All the tasks are completed: cleaning would leave the list empty. To delete a list, use the channel.',
  'activity.lock.mine':
    '{0} You are changing task {1}: Edit, Clean and Reopen all wait until you save or close its panel.',
});
