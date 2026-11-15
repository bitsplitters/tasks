// I gruppi della documentazione, nell'ordine della barra laterale e dell'indice (spec
// 2026-11-15-documentazione-canale-e-activity-design.md, §4, nel repo team-tasks-manager). Prima la lista stava,
// identica, in [...slug].astro e in docs/index.astro: un gruppo nuovo aggiunto in uno solo dei due spariva dall'altro.
//
// `place` segna i due gruppi d'uso: le loro pagine dicono dove si fa una cosa, nel canale o nell'Activity, e la
// barra laterale li riconosce dallo stesso segno della pillola sotto il titolo. `intro` è la riga sotto il nome del
// gruppo nell'indice: dice che cosa c'è dentro, perché «Features» e «In the channel» parlano delle stesse funzioni.
export type Posto = 'channel' | 'activity';

export interface GruppoDocs {
  name: string;
  intro?: string;
  place?: Posto;
}

export const GRUPPI_DOCS: GruppoDocs[] = [
  { name: 'Getting started' },
  {
    name: 'Features',
    intro: 'What each feature does and its rules. They are the same in the channel and in the Activity.',
  },
  {
    name: 'In the channel',
    intro: 'The list as a message in a Discord channel: what you see, and which buttons to press.',
    place: 'channel',
  },
  {
    name: 'In the Activity',
    intro: 'The list in a window inside Discord, where you work on it together: what you see, and where to tap.',
    place: 'activity',
  },
  { name: 'Configuration' },
  { name: 'Reference' },
  { name: 'Plans' },
  { name: 'Help & community' },
];

// La pillola sotto il titolo delle pagine d'uso, e il segno dei due gruppi nella barra laterale.
export const POSTI: Record<Posto, { label: string; icon: string }> = {
  channel: { label: 'In the channel', icon: '/icons/posto-canale.svg' },
  activity: { label: 'In the Activity', icon: '/icons/activity.png' },
};
