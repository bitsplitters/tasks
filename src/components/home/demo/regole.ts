/*
 * Le regole del bot nella demo della home (spec docs/superpowers/specs/2026-11-15-demo-fedele-design.md; piano
 * docs/superpowers/plans/2026-11-15-demo-fedele.md, compito 5; tutti e due nel repo team-tasks-manager): funzioni pure
 * che ricevono lo stato con la scelta di chi guarda e restituiscono un esito, cioè lo stato nuovo, un rifiuto oppure
 * una domanda. Qui anche i tipi che le regole condividono coi testi (testi.ts) e con l'interfaccia.
 */
import type { Stato } from './modello.ts';

/** Un testo del bot per chiave, con gli argomenti: lo compone `testo` di testi.ts. */
export interface Testo {
  chiave: string;
  argomenti?: (string | number)[];
}

/** Una persona o un ruolo scelto in un menu di menzioni. */
export interface Menzione {
  ruolo: boolean;
  id: string;
}

/**
 * Una domanda del bot prima di un'azione che toglie qualcosa: l'owner di un task col promemoria, un gruppo coi suoi
 * subtask, i task completati (Pulisci), i completati da riaprire (Riapri tutti). Le posizioni sono scritte come nella
 * riga ('2.1'); `sopra` è il gruppo che riceve i subtask, `null` se non ce n'è uno.
 */
export type Domanda =
  | { tipo: 'togliOwner'; pos: string }
  | { tipo: 'eliminaGruppo'; pos: string; sopra: number | null }
  | { tipo: 'pulisci'; completati: number; avvertenza: 'all' | 'reminders' | 'tags' | 'plain' }
  | { tipo: 'riapri'; spuntati: number; nuovaData: boolean };

/** L'esito di una regola: lo stato nuovo, a volte con un avviso; un rifiuto (lo stato non cambia); una domanda. */
export type Esito =
  | { tipo: 'fatto'; stato: Stato; avviso?: Testo }
  | { tipo: 'rifiuto'; testo: Testo }
  | { tipo: 'domanda'; domanda: Domanda };
