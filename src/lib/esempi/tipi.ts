/*
 * I dati di un caso d'uso del sito (spec 2026-11-20-casi-d-uso-esempi-completi-design.md, §6, nel repo
 * team-tasks-manager): il team, la lista come la mostra Bulk update, i webhook, le scelte di /config app e la
 * settimana. Li scrive il frontmatter di src/content/use-cases/*.md; lo schema della collezione (content.config.ts) ne
 * controlla la forma, src/lib/esempi/controllo.ts le regole del bot. Niente di Astro qui: lo usano anche i test.
 */

export interface PersonaDelTeam {
  id: string;
  name: string;
  username: string;
  /** Il colore dell'avatar nelle riproduzioni di Discord. */
  color: string;
  /** Chi è, in poche parole: «Server owner». */
  about: string;
}

export interface RuoloDelTeam {
  id: string;
  name: string;
  about: string;
  /** I membri: servono ai ruoli `TTM<n>` che TTM crea per un owner di più persone. */
  members?: string[];
  /** Un ruolo creato da TTM per un owner di più persone (Premium). */
  ttm?: boolean;
}

export interface CanaleDelTeam {
  id: string;
  name: string;
  about: string;
  voice?: boolean;
}

export interface Team {
  /** Il nome del server, per il token `{{guild}}`. */
  guild: string;
  /** Il fuso del team: le ore della pagina e le date della lista sono scritte qui. */
  zone: string;
  people: PersonaDelTeam[];
  roles: RuoloDelTeam[];
  channels: CanaleDelTeam[];
}

export type Servizio = 'discord' | 'github' | 'make';

export interface WebhookDellEsempio {
  name: string;
  service: Servizio;
  /** `completion` per il solo completamento; `both` senza trigger nel comando, per completamento e riapertura. */
  trigger: 'completion' | 'both';
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  /** Una riga `Key: value` per header. */
  headers: string;
  /** Il body JSON, coi token. */
  body: string;
  /** Il passo dal lato del servizio, in Markdown. */
  setup: string;
  /** Per un webhook di Discord: il nome che il messaggio mostra e il canale dove arriva. */
  postsAs?: { name: string; channel: string; color: string };
}

export interface Impostazione {
  setting: string;
  choice: string;
  why: string;
  premium?: boolean;
}

/** Il tipo di una notifica nel canale: la presa, l'assegnazione, il cambio di owner, la spunta. */
export type TipoDiNotifica = 'claimed' | 'assigned' | 'updated' | 'completed';

export type Scheda =
  /** Il promemoria come arriva: in DM a una persona, nel canale a un ruolo. */
  | { kind: 'reminder'; task: string }
  /** La notifica sotto la lista. `from` è l'owner di prima, per «updated». */
  | { kind: 'notice'; type: TipoDiNotifica; by: string; task: string; from?: string }
  /** Ciò che il webhook manda quando `by` spunta il task: il messaggio postato su Discord, o la richiesta. */
  | { kind: 'webhook'; webhook: string; task: string; by: string };

export interface Momento {
  /** Data e ora nel fuso del team, `2026-12-08T18:00`. */
  at: string;
  /** Cosa succede, in Markdown. */
  text: string;
  card?: Scheda;
}

export interface Esempio {
  team: Team;
  list: {
    title: string;
    /** Il canale della lista. */
    channel: string;
    /** Il momento in cui la pagina mostra la lista, nel fuso del team: `2026-12-09T21:00`. */
    at: string;
    /** Il testo come lo mostra Bulk update. */
    text: string;
    /** Le scelte di List appearance: «Space around groups» acceso. */
    spaced?: boolean;
    /** I Tips accesi: la riga sotto la lista. */
    tips?: boolean;
  };
  webhooks: WebhookDellEsempio[];
  settings: Impostazione[];
  week: Momento[];
}
