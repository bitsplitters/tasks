/*
 * La legenda sotto il testo di un caso d'uso (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §3 punto 4, nel
 * repo team-tasks-manager): le sole forme che il testo di quell'esempio usa, nell'ordine di «Writing a list», ognuna
 * con la sua sezione. La pagina mostra il testo coi nomi (coiNomi, 2.5.0), la legenda lo riconosce dal testo con gli
 * id del frontmatter. I testi sono in HTML, già sicuri: stanno nella zona `casi` dei testi del sito (legenda.*), non
 * nel frontmatter. I link portano alla sezione nella lingua della pagina; le ancore sono le stesse in ogni lingua.
 */
import type { Lingua } from '../../i18n/lingue.ts';
import { percorso } from '../../i18n/percorsi.ts';
import { t } from '../../i18n/t.ts';

export interface VoceDellaLegenda {
  /** La forma come si scrive, per la colonna di sinistra. */
  codice: string;
  /** Cosa fa, in una frase (HTML). */
  spiega: string;
  /** La sezione della documentazione. */
  link: string;
}

const W = '/docs/writing-a-list/';

/** Le voci nell'ordine di «Writing a list», con la loro sezione. */
const VOCI: ReadonlyArray<[string, string]> = [
  ['subtask', `${W}#tasks-and-subtasks`],
  ['done', `${W}#tasks-and-subtasks`],
  ['owner', `${W}#owners-the-mention-with-a-colon`],
  ['tag', `${W}#mentioning-people-and-roles`],
  ['channel', `${W}#linking-channels`],
  ['link', `${W}#adding-a-hyperlink`],
  ['message', `${W}#adding-a-hyperlink`],
  ['emoji', `${W}#button-emoji`],
  ['reminder', `${W}#reminders-in-the-text`],
  ['recurring', `${W}#reminders-in-the-text`],
  ['webhook', `${W}#webhooks-in-the-text`],
  ['variable', '/docs/webhooks/#tokens'],
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

/** Le voci della legenda per questo testo, nell'ordine di «Writing a list», nella lingua della pagina. */
export function legenda(testo: string, lingua: Lingua = 'en'): VoceDellaLegenda[] {
  const u = usati(testo);
  return VOCI.filter(([chiave]) => u.has(chiave)).map(([chiave, link]) => {
    const voce = {
      codice: t(lingua, `casi.legenda.${chiave}.codice`),
      spiega: t(lingua, `casi.legenda.${chiave}.spiega`),
      link: percorso(lingua, link),
    };
    return chiave === 'recurring' ? ricorrente(testo, voce, lingua) : voce;
  });
}

/** La voce del promemoria ricorrente coi numeri del primo che il testo usa: `[0m,15m,2]`, «every 15 minutes». */
function ricorrente(testo: string, voce: VoceDellaLegenda, lingua: Lingua): VoceDellaLegenda {
  const m = /<t:\d+> \[(\w+),((\d+)([dhm])),(\d+)\]/.exec(testo.replace(/<t:\d+> \[\w+,0m,0\]/g, ''));
  if (!m) return voce;
  const [, distanza, intervallo, n, unita, volte] = m;
  return {
    ...voce,
    codice: `[${distanza},${intervallo},${volte}]`,
    spiega: t(lingua, 'casi.legenda.ricorrente', {
      ogni: t(lingua, `casi.legenda.unita.${unita}`, { n: Number(n) }),
      dopo: t(lingua, 'casi.legenda.dopo', { n: Number(volte) }),
      mostra: `↻${intervallo} ×${Number(volte) + 1}`,
    }),
  };
}
