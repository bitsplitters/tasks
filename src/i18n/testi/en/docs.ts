/*
 * I testi della documentazione (spec 2026-11-19-sito-multilingua-design.md, §4.4, nel repo team-tasks-manager):
 * indice, menu laterale, gruppi, pillole del posto. Le pagine sono Markdown, in src/content/docs/ e, tradotte, in
 * src/content/traduzioni/<prefisso>/. Le chiavi dei gruppi sono quelle di src/lib/gruppi-docs.ts.
 */
export const fonte = '';

export const testi = {
  titolo: 'Documentation',
  title: 'Documentation — Team Tasks Manager',
  sottotitolo: 'Everything you need to run Team Tasks Manager on your Discord server.',
  sfoglia: 'Browse the docs',
  panoramica: 'Overview',
  'pagina.suffisso': '{titolo} — Team Tasks Manager docs',
  'menu.apri': 'Open documentation menu',
  'menu.pulsante': 'Documentation',
  'menu.chiudi': 'Close menu',
  'riserva': 'This page is not translated yet: here it is in English.',
  'gruppo.inizio': 'Getting started',
  'gruppo.funzioni': 'Features',
  'gruppo.funzioni.intro': 'What each feature does and its rules. They are the same in the channel and in the Activity.',
  'gruppo.canale': 'In the channel',
  'gruppo.canale.intro': 'The list as a message in a Discord channel: what you see, and which buttons to press.',
  'gruppo.activity': 'In the Activity',
  'gruppo.activity.intro':
    'The list in a window inside Discord, where you work on it together: what you see, and where to tap.',
  'gruppo.configurazione': 'Configuration',
  'gruppo.riferimento': 'Reference',
  'gruppo.piani': 'Plans',
  'gruppo.aiuto': 'Help & community',
  'posto.channel': 'In the channel',
  'posto.activity': 'In the Activity',
} as const;
