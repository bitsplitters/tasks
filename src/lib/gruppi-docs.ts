// I gruppi della documentazione, nell'ordine della barra laterale e dell'indice (spec
// 2026-11-15-documentazione-canale-e-activity-design.md, §4, nel repo team-tasks-manager). Prima la lista stava,
// identica, in [...slug].astro e in docs/index.astro: un gruppo nuovo aggiunto in uno solo dei due spariva dall'altro.
//
// `name` è il valore di `group` nel frontmatter delle pagine inglesi (le traduzioni prendono il gruppo dall'inglese);
// `chiave` porta ai testi della zona `docs`: il nome si legge da `docs.gruppo.<chiave>`, la riga sotto il nome
// nell'indice da `docs.gruppo.<chiave>.intro`, che dice che cosa c'è dentro, perché «Features» e «In the channel»
// parlano delle stesse funzioni. `place` segna i due gruppi d'uso: le loro pagine dicono dove si fa una cosa, nel
// canale o nell'Activity, e la barra laterale li riconosce dallo stesso segno della pillola sotto il titolo.
export type Posto = 'channel' | 'activity';

export interface GruppoDocs {
  name: string;
  chiave: string;
  intro?: boolean;
  place?: Posto;
}

export const GRUPPI_DOCS: GruppoDocs[] = [
  { name: 'Getting started', chiave: 'inizio' },
  { name: 'Features', chiave: 'funzioni', intro: true },
  { name: 'In the channel', chiave: 'canale', intro: true, place: 'channel' },
  { name: 'In the Activity', chiave: 'activity', intro: true, place: 'activity' },
  { name: 'Configuration', chiave: 'configurazione' },
  { name: 'Reference', chiave: 'riferimento' },
  { name: 'Plans', chiave: 'piani' },
  { name: 'Help & community', chiave: 'aiuto' },
];

// Il segno dei due posti: la pillola sotto il titolo delle pagine d'uso e i due gruppi nella barra laterale. Il nome
// sta nei testi, `docs.posto.<posto>`.
export const POSTI: Record<Posto, { icon: string }> = {
  channel: { icon: '/icons/posto-canale.svg' },
  activity: { icon: '/icons/activity.png' },
};
