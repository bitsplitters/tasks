/*
 * Il controllo al build di un caso d'uso (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §5 e §9, nel repo
 * team-tasks-manager), al posto di src/lib/lista-pronta.ts: il testo della lista si legge come lo legge il bot, e deve
 * rispettare le regole di «Writing a list»; ogni id è del team; ogni webhook nominato esiste e il suo body, coi token
 * sostituiti, è ancora JSON; ogni scheda della settimana nomina un task che c'è. Lo chiama lo schema della collezione
 * (content.config.ts): un problema ferma il build e dice dove.
 */
import { posizione } from '../../components/home/demo/modello.ts';
import type { Task } from '../../components/home/demo/modello.ts';
import { leggi } from './testo.ts';
import { risolvi, risolviUrl, testoPerIlToken, variabili } from './webhook.ts';
import type { ContestoDelWebhook } from './webhook.ts';
import type { Esempio, WebhookDellEsempio } from './tipi.ts';

/** Le regole del bot (Config, «Writing a list»): task, caratteri del testo, del titolo; ripetizioni. */
const TASK_MASSIMI = 20;
const TESTO_MASSIMO = 4000;
const TITOLO_MASSIMO = 90;
const RIPETIZIONI_MASSIME = 49;

const ID = /^\d{17,20}$/;
const MENZIONI = /<(@&|@|#)(\d+)>/g;

/** Il task in quella posizione («3», «2.1»). */
export function taskIn(tasks: readonly Task[], pos: string): Task | undefined {
  return tasks.find((t) => posizione(t.pos) === pos);
}

/** Il contesto dei token per una spunta di `chi` su questo task, alle `quando` (ISO, UTC). */
export function contestoDellaSpunta(esempio: Esempio, task: Task, chi: string, quando: string): ContestoDelWebhook {
  const canale = esempio.team.channels.find((c) => c.id === esempio.list.channel);
  return {
    task: testoPerIlToken(task),
    state: 'completed',
    list: esempio.list.title,
    user: esempio.team.people.find((p) => p.id === chi)?.name ?? '',
    user_id: chi,
    when: quando,
    guild: esempio.team.guild,
    guild_id: '1181730456203940000',
    channel: canale?.name ?? '',
    channel_id: esempio.list.channel,
  };
}

/** I problemi di un webhook su un task: l'URL, gli header, il body che non è più JSON coi token sostituiti. */
function problemiDelWebhook(esempio: Esempio, w: WebhookDellEsempio, task: Task): string[] {
  const dove = `webhook «${w.name}» sul task ${posizione(task.pos)}`;
  const chi = task.owner?.tipo === 'persona' ? task.owner.id : esempio.team.people[0].id;
  const ctx = contestoDellaSpunta(esempio, task, chi, '2026-12-07T10:00:00Z');
  const vars = variabili(task.testo);
  const problemi: string[] = [];
  if (!/^https:\/\/[^\s/]+\//.test(risolviUrl(w.url, ctx, vars))) problemi.push(`${dove}: l'URL non è https`);
  for (const riga of w.headers.trim().split('\n').filter((r) => r.trim())) {
    if (!/^[\w-]+: \S/.test(riga)) problemi.push(`${dove}: l'header «${riga}» non è «Key: value»`);
  }
  try {
    JSON.parse(risolvi(w.body, ctx, vars));
  } catch {
    problemi.push(`${dove}: coi token sostituiti il body non è JSON (una virgoletta nel testo?)`);
  }
  return problemi;
}

/** I problemi di un esempio; vuoto se va bene. */
export function problemi(esempio: Esempio): string[] {
  const { team, list } = esempio;
  const p: string[] = [];
  const persone = new Set(team.people.map((x) => x.id));
  const ruoli = new Set(team.roles.map((x) => x.id));
  const canali = new Set(team.channels.map((x) => x.id));
  for (const id of [...persone, ...ruoli, ...canali]) if (!ID.test(id)) p.push(`team: l'id ${id} non ha da 17 a 20 cifre`);
  for (const r of team.roles) {
    for (const m of r.members ?? []) if (!persone.has(m)) p.push(`team: ${r.name} ha un membro che non è del team`);
    if (r.ttm && (r.members ?? []).length < 2) p.push(`team: ${r.name} è un ruolo di TTM, per più persone`);
  }
  if (!canali.has(list.channel)) p.push('list: il canale della lista non è del team');
  if (list.title.length > TITOLO_MASSIMO) p.push(`list: il titolo supera i ${TITOLO_MASSIMO} caratteri`);
  if (list.text.length > TESTO_MASSIMO) p.push(`list: il testo supera i ${TESTO_MASSIMO} caratteri`);

  const { tasks, errori } = leggi(list.text, team.zone);
  p.push(...errori.map((e) => `list: ${e}`));
  if (tasks.length > TASK_MASSIMI) p.push(`list: ${tasks.length} task, il piano Free ne tiene ${TASK_MASSIMI}`);

  const webhook = new Map(esempio.webhooks.map((w) => [w.name, w]));
  for (const t of tasks) {
    const dove = `list: task ${posizione(t.pos)}`;
    for (const m of t.testo.matchAll(MENZIONI)) {
      const insieme = m[1] === '@' ? persone : m[1] === '@&' ? ruoli : canali;
      if (!insieme.has(m[2])) p.push(`${dove}: ${m[0]} non è del team`);
    }
    if (t.owner && !(t.owner.tipo === 'persona' ? persone : ruoli).has(t.owner.id)) {
      p.push(`${dove}: l'owner non è del team`);
    }
    if (t.promemoria && !t.owner) p.push(`${dove}: un promemoria senza owner non si salva`);
    const r = t.promemoria?.ricorrenza;
    if (r && r.ripetizioni > RIPETIZIONI_MASSIME) p.push(`${dove}: più di ${RIPETIZIONI_MASSIME} ripetizioni`);
    if (r && r.ripetizioni > 0 && r.intervallo === '0m') p.push(`${dove}: ripetizioni senza intervallo`);
    if (t.webhook !== undefined) {
      const w = webhook.get(t.webhook);
      if (!w) p.push(`${dove}: il webhook «${t.webhook}» non è fra quelli dell'esempio`);
      else p.push(...problemiDelWebhook(esempio, w, t));
    }
  }
  const ricorrenti = tasks.some((t) => (t.promemoria?.ricorrenza?.ripetizioni ?? 0) > 0);
  if (ricorrenti && !esempio.settings.some((s) => s.setting === 'Recurring reminders')) {
    p.push('settings: la lista ha promemoria ricorrenti, la tabella non dice che sono accesi');
  }
  for (const w of esempio.webhooks) {
    if (!tasks.some((t) => t.webhook === w.name)) p.push(`webhooks: «${w.name}» non è su nessun task`);
    if (w.service === 'discord' && (!w.postsAs || !canali.has(w.postsAs.channel))) {
      p.push(`webhooks: «${w.name}» di Discord senza il canale dove posta`);
    }
  }

  let prima = '';
  esempio.week.forEach((m, i) => {
    const dove = `week ${i + 1} (${m.at})`;
    if (!/^2026-12-(0[7-9]|1[0-3])T\d\d:\d\d$/.test(m.at)) p.push(`${dove}: fuori dalla settimana dal 7 al 13 dicembre`);
    if (m.at < prima) p.push(`${dove}: viene prima del momento precedente`);
    prima = m.at;
    const c = m.card;
    if (!c) return;
    const t = taskIn(tasks, c.task);
    if (!t) {
      p.push(`${dove}: il task ${c.task} non c'è`);
      return;
    }
    if (c.kind === 'reminder' && !t.promemoria) p.push(`${dove}: il task ${c.task} non ha un promemoria`);
    if (c.kind !== 'reminder' && !persone.has(c.by)) p.push(`${dove}: chi agisce non è del team`);
    if (c.kind === 'notice' && c.type === 'updated' && !c.from) p.push(`${dove}: «updated» senza l'owner di prima`);
    if (c.kind === 'webhook' && t.webhook !== c.webhook) p.push(`${dove}: il task ${c.task} non ha «${c.webhook}»`);
  });
  return p;
}
