/*
 * Il testo di una lista come lo mostra Bulk update, letto nel modello della demo della home e riscritto (spec
 * 2026-11-20-casi-d-uso-esempi-completi-design.md, §5, nel repo team-tasks-manager). Una riga per task, come
 * ModalUITaskConverter.taskToText: il trattino (con uno spazio davanti per un subtask), la casella, il webhook
 * `{{wb=nome}}`, il promemoria `<t:N> [distanza,intervallo,ripetizioni]`, l'owner `<@id>: ` o `<@&id>: `, il testo. Le
 * emoji dei pulsanti stanno nel testo coi loro nomi brevi (EmojiNellaForm), nel modello come emoji del bot, che il
 * disegno della demo sa mostrare. Il giro `scrivi(leggi(t))` torna il testo di partenza: il test lo controlla.
 */
import { rinumera } from '../../components/home/demo/regole.ts';
import type { Owner, Task } from '../../components/home/demo/modello.ts';
import { coiNomi as nomiDellaModale } from '../../components/home/demo/nomi.ts';
import type { Team } from './tipi.ts';

/** I nomi brevi delle emoji dei pulsanti («Writing a list», Button emoji) e l'icona del bot di ciascuno. */
export const EMOJI_DEI_PULSANTI: Readonly<Record<string, string>> = {
  owner: 'owner_blue', reminder: 'alert_blue', content: 'task_blue', more: 'other_blue', activity: 'activity_blue',
};

const NOMI_BREVI = new RegExp(`:(${Object.keys(EMOJI_DEI_PULSANTI).join('|')}):`, 'g');
const ICONE = new RegExp(`<:(${Object.values(EMOJI_DEI_PULSANTI).join('|')}):0>`, 'g');
const NOME_DELL_ICONA = Object.fromEntries(Object.entries(EMOJI_DEI_PULSANTI).map(([nome, icona]) => [icona, nome]));

const RIGA = /^( ?)- \[(X?)\] (.*)$/;
const WEBHOOK = /^\{\{wb=([^{}]*)\}\} /;
/** Distanza e intervallo solo in d, h, m (il bot rifiuta i mesi), le ripetizioni come cifre. */
const PROMEMORIA = /^<t:(\d+)> \[([\ddhm]+),([\ddhm]+),(\d+)\] /;
const OWNER = /^<@(&?)(\d{17,20})>: /;

export interface Lettura {
  tasks: Task[];
  errori: string[];
}

/** Il testo della lista nel modello della demo. `zona` è il fuso dei promemoria: quello del team. */
export function leggi(testo: string, zona: string): Lettura {
  const errori: string[] = [];
  const tasks: Task[] = [];
  testo.replace(/\n$/, '').split('\n').forEach((riga, i) => {
    const n = i + 1;
    const m = RIGA.exec(riga);
    if (!m) {
      errori.push(`riga ${n}: non comincia con «- []», «- [X]» o « - […]»: ${riga}`);
      return;
    }
    const sub = m[1] === ' ';
    if (sub && tasks.length === 0) errori.push(`riga ${n}: la prima riga non può essere un subtask`);
    let resto = m[3];
    const task: Task = { pos: { main: 0, sub: sub ? 1 : 0 }, testo: '', fatto: m[2] === 'X' };
    const wb = WEBHOOK.exec(resto);
    if (wb) {
      task.webhook = wb[1];
      resto = resto.slice(wb[0].length);
    }
    const pr = PROMEMORIA.exec(resto);
    if (pr) {
      const ripetizioni = Number(pr[4]);
      task.promemoria = { at: Number(pr[1]), zona };
      if (pr[2] !== '0m') errori.push(`riga ${n}: con la data, la distanza si scrive 0m, come la scrive Bulk update`);
      if (ripetizioni > 0 || pr[3] !== '0m') task.promemoria.ricorrenza = { intervallo: pr[3], ripetizioni };
      resto = resto.slice(pr[0].length);
    }
    const ow = OWNER.exec(resto);
    if (ow) {
      task.owner = { tipo: ow[1] ? 'ruolo' : 'persona', id: ow[2] } satisfies Owner;
      resto = resto.slice(ow[0].length);
    }
    if (resto.trim() === '') errori.push(`riga ${n}: il task non ha testo`);
    task.testo = resto.replace(NOMI_BREVI, (_, nome: string) => `<:${EMOJI_DEI_PULSANTI[nome]}:0>`);
    tasks.push(task);
  });
  return { tasks: rinumera(tasks), errori };
}

/** La tripletta del promemoria: la distanza 0m, l'intervallo e le ripetizioni, o l'evento singolo `0m,0`. */
function tripletta(task: Task): string {
  const r = task.promemoria?.ricorrenza;
  return r ? `[0m,${r.intervallo},${r.ripetizioni}]` : '[0m,0m,0]';
}

/** Il testo della lista dal modello, come lo scrive Bulk update. */
export function scrivi(tasks: readonly Task[]): string {
  return tasks.map((t) => {
    const parti = [t.pos.sub ? ' -' : '-', t.fatto ? '[X]' : '[]'];
    if (t.webhook !== undefined) parti.push(`{{wb=${t.webhook}}}`);
    if (t.promemoria) parti.push(`<t:${t.promemoria.at}> ${tripletta(t)}`);
    const owner = t.owner ? `<@${t.owner.tipo === 'ruolo' ? '&' : ''}${t.owner.id}>: ` : '';
    parti.push(owner + t.testo.replace(ICONE, (_, icona: string) => `:${NOME_DELL_ICONA[icona]}:`));
    return parti.join(' ');
  }).join('\n');
}

/**
 * Il testo come lo mostra Bulk update dalla 2.5.0 (segnaposto leggibili; NomiNellaModale.perLaModale nella business):
 * i codici diventano i nomi del team, la data del promemoria quella del suo fuso. Il testo dei casi d'uso resta scritto
 * con gli id; questa è la forma che la pagina mostra.
 */
export function coiNomi(testo: string, team: Team): string {
  return nomiDellaModale(testo, {
    persone: team.people.map((p) => ({ id: p.id, nome: p.name, username: p.username })),
    ruoli: team.roles.map((r) => ({ id: r.id, nome: r.name })),
    canali: team.channels.map((c) => ({ id: c.id, nome: c.name })),
    zona: team.zone,
  });
}
