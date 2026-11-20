/*
 * I token dei webhook come li sostituisce il bot (WebhookTokenResolver, VariabiliWebhook in ttm-business; spec
 * 2026-11-20-casi-d-uso-esempi-completi-design.md, §5, nel repo team-tasks-manager): prima le variabili libere del task,
 * poi i token predefiniti; una chiave sconosciuta diventa vuota; nell'URL ogni valore è percent-encoded, nel body ha
 * l'escape delle stringhe JSON (resolveBody, da ttm-business 4bc111e: §13 della spec), negli header entra così com'è.
 * Le pagine mostrano così ciò che il webhook manderebbe davvero.
 */
import { conOwner, senzaSpaziInPiu } from '../../components/home/demo/regole.ts';
import type { Task } from '../../components/home/demo/modello.ts';

/** `{{chiave=valore}}` (Patterns.WEBHOOK_VAR_DEFINITION) e `{{chiave}}` (WEBHOOK_VAR_USAGE). */
const DEFINIZIONE = /\{\{([^{}=]+)=([^{}]*)\}\}/g;
const USO = /\{\{([^{}=]+)\}\}/g;

/** Le variabili libere del testo del task: chiave e valore senza spazi ai bordi, l'ultima definizione vince. */
export function variabili(testo: string): Map<string, string> {
  const v = new Map<string, string>();
  for (const m of testo.matchAll(DEFINIZIONE)) v.set(m[1].trim(), m[2].trim());
  return v;
}

/** Il testo per `{{task}}`: con l'owner in testa, senza le definizioni, con gli spazi normalizzati. */
export function testoPerIlToken(task: Task): string {
  return senzaSpaziInPiu(conOwner(task).replace(DEFINIZIONE, ''));
}

/** I valori dei token predefiniti (WebhookContext). */
export interface ContestoDelWebhook {
  task: string;
  /** `completed` o `reopened` (WebhookTrigger). */
  state: string;
  list: string;
  /** Il nome di chi ha spuntato, quello che il server mostra (Member.getEffectiveName). */
  user: string;
  user_id: string;
  /** ISO-8601, Instant.toString. */
  when: string;
  guild: string;
  guild_id: string;
  channel: string;
  channel_id: string;
}

function risolviCon(modello: string, ctx: ContestoDelWebhook, vars: Map<string, string>,
  codifica: (v: string) => string): string {
  const predefiniti = ctx as unknown as Record<string, string>;
  return modello.replace(USO, (_, chiave: string) => codifica(
    vars.get(chiave) ?? (Object.hasOwn(predefiniti, chiave) ? predefiniti[chiave] : '')));
}

/** Un header coi token sostituiti: i valori entrano così come sono. */
export function risolvi(modello: string, ctx: ContestoDelWebhook, vars: Map<string, string>): string {
  return risolviCon(modello, ctx, vars, (v) => v);
}

/**
 * Il body coi token sostituiti: ogni valore con l'escape delle stringhe JSON (virgolette, barre rovesciate, caratteri
 * di controllo), come JsonStringEncoder.quoteAsString nel bot. Il bot scrive in maiuscolo le cifre esadecimali dei
 * caratteri di controllo senza un nome breve: il JSON letto è lo stesso.
 */
export function risolviBody(modello: string, ctx: ContestoDelWebhook, vars: Map<string, string>): string {
  return risolviCon(modello, ctx, vars, (v) => JSON.stringify(v).slice(1, -1));
}

/**
 * URLEncoder.encode in UTF-8 col `+` riportato a `%20`: restano solo lettere, cifre e `. - * _`. encodeURIComponent
 * lascia anche `! ' ( ) ~`, che URLEncoder codifica.
 */
export function percentEncode(valore: string): string {
  return encodeURIComponent(valore).replace(/[!'()~]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
}

/** L'URL coi token sostituiti: ogni valore percent-encoded, i caratteri scritti attorno restano. */
export function risolviUrl(modello: string, ctx: ContestoDelWebhook, vars: Map<string, string>): string {
  return risolviCon(modello, ctx, vars, percentEncode);
}
