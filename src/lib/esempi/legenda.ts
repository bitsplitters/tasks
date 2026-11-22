/*
 * La legenda sotto il testo di un caso d'uso (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §3 punto 4, nel
 * repo team-tasks-manager): le sole forme che il testo di quell'esempio usa, nell'ordine di «Writing a list», ognuna
 * con la sua sezione. La pagina mostra il testo coi nomi (coiNomi, 2.5.0), la legenda lo riconosce dal testo con gli
 * id del frontmatter. I testi sono in HTML, già sicuri: li scrive questo file, non il frontmatter.
 */

export interface VoceDellaLegenda {
  /** La forma come si scrive, per la colonna di sinistra. */
  codice: string;
  /** Cosa fa, in una frase (HTML). */
  spiega: string;
  /** La sezione della documentazione. */
  link: string;
}

const W = '/docs/writing-a-list/';

const VOCI: ReadonlyArray<[string, VoceDellaLegenda]> = [
  ['subtask', { codice: ' - [] ', spiega: 'A space before the dash makes a subtask of the task above. A task with subtasks is a group.', link: `${W}#tasks-and-subtasks` }],
  ['done', { codice: '[X]', spiega: 'A completed task. <code>[]</code> is a task to do.', link: `${W}#tasks-and-subtasks` }],
  ['owner', { codice: '@Name: ', spiega: 'The owner: <code>@</code> and the name, followed by a colon, at the start of the task. A person or a role.', link: `${W}#owners-the-mention-with-a-colon` }],
  ['tag', { codice: '@Name', spiega: 'A tag: <code>@</code> and the name of a person or a role, without the colon.', link: `${W}#mentioning-people-and-roles` }],
  ['channel', { codice: '#channel', spiega: 'A channel: <code>#</code> and its name. The link from <em>Copy Link</em> on the channel works too.', link: `${W}#linking-channels` }],
  ['link', { codice: '[text](https://…)', spiega: 'A link. <code>mailto:</code>, <code>tel:</code> and <code>sms:</code> work too.', link: `${W}#adding-a-hyperlink` }],
  ['message', { codice: '[text](https://discord.com/channels/…)', spiega: 'A link to a message, from <em>Copy Message Link</em>. It stays a link.', link: `${W}#adding-a-hyperlink` }],
  ['emoji', { codice: ':owner:', spiega: 'The emoji of a list button, written as a short name.', link: `${W}#button-emoji` }],
  ['reminder', { codice: 'YYYY-MM-DD HH:mm [0m,0m,0]', spiega: 'A reminder: the date in your time zone, then distance, interval and repetitions. <code>0m,0</code> is a single event. Writing a list from scratch, put the distance instead of the date: <code>[1d,0m,0]</code> is one day after you save.', link: `${W}#reminders-in-the-text` }],
  ['recurring', { codice: '[0m,7d,3]', spiega: 'A recurring reminder: every 7 days, 3 times after the first. The list shows <code>↻7d ×4</code>.', link: `${W}#reminders-in-the-text` }],
  ['webhook', { codice: '{{wb=name}}', spiega: 'The webhook of the task. It doesn\'t show in the list.', link: `${W}#webhooks-in-the-text` }],
  ['variable', { codice: '{{key=value}}', spiega: 'A free variable: the webhook reads it as <code>{{key}}</code>. It stays in the text.', link: '/docs/webhooks/#tokens' }],
];

/** Le forme che il testo usa, cercate nel testo con gli id. */
function usati(testo: string): Set<string> {
  const u = new Set<string>();
  const su = (chiave: string, re: RegExp) => { if (re.test(testo)) u.add(chiave); };
  su('subtask', /^ +- /m);
  su('done', /^ *- \[X\]/m);
  su('owner', /<@&?\d+>: /);
  su('tag', /<@&?\d+>(?!: )/);
  su('channel', /<#\d+>/);
  su('link', /\]\((?!https:\/\/discord\.com\/channels\/)(https?:|mailto:|tel:|sms:)/);
  su('message', /\]\(https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+\)/);
  su('emoji', /:(owner|reminder|content|more|activity):/);
  su('reminder', /<t:\d+> \[/);
  su('recurring', /<t:\d+> \[\w+,(?!0m,0\])\w+,\d+\]/);
  su('webhook', /\{\{wb=/);
  su('variable', /\{\{(?!wb=)[^{}=]+=[^{}]*\}\}/);
  return u;
}

/** Le voci della legenda per questo testo, nell'ordine di «Writing a list». */
export function legenda(testo: string): VoceDellaLegenda[] {
  const u = usati(testo);
  return VOCI.filter(([chiave]) => u.has(chiave)).map(([chiave, voce]) => (chiave === 'recurring' ? ricorrente(testo, voce) : voce));
}

const UNITA: Record<string, [string, string]> = { d: ['day', 'days'], h: ['hour', 'hours'], m: ['minute', 'minutes'] };

/** La voce del promemoria ricorrente coi numeri del primo che il testo usa: `[0m,15m,2]`, «every 15 minutes». */
function ricorrente(testo: string, voce: VoceDellaLegenda): VoceDellaLegenda {
  const m = /<t:\d+> \[(\w+),((\d+)([dhm])),(\d+)\]/.exec(testo.replace(/<t:\d+> \[\w+,0m,0\]/g, ''));
  if (!m) return voce;
  const [, distanza, intervallo, n, unita, volte] = m;
  const parola = UNITA[unita][Number(n) === 1 ? 0 : 1];
  const dopo = Number(volte) === 1 ? 'once after the first' : `${volte} times after the first`;
  return {
    ...voce,
    codice: `[${distanza},${intervallo},${volte}]`,
    spiega: `A recurring reminder: every ${n} ${parola}, ${dopo}. The list shows <code>↻${intervallo} ×${Number(volte) + 1}</code>.`,
  };
}
