/*
 * I testi comuni a ogni pagina (spec 2026-11-19-sito-multilingua-design.md, §4.4, nel repo team-tasks-manager):
 * intestazione, piè di pagina, switch del tema, selettore, ricerca, anteprime, note di rilascio. Le traduzioni stanno in
 * src/i18n/testi/<lingua>/comune.ts, con le stesse chiavi e gli stessi segnaposto.
 */
export const testi = {
  'nav.label': 'Site',
  'nav.docs': 'Docs',
  'nav.casi': 'Use cases',
  'nav.premium': 'Premium',
  'nav.beta': 'Beta',
  'nav.note': 'Release notes',
  'piede.terms': 'Terms',
  'piede.privacy': 'Privacy',
  'piede.gdpr': 'GDPR',
  'piede.license': 'Licence',
  'piede.lingue': 'Languages',
  'piede.fazier': 'Fazier badge',
  'tema.chiaro': 'Switch to light theme',
  'tema.scuro': 'Switch to dark theme',
  'selettore.label': 'Language: {nome}',
  'ricerca.segnaposto': 'Search in English',
  'anteprima.descrizione':
    'Team Tasks Manager brings task coordination inside Discord: shared checklists, reminders and roles, without leaving your server.',
  'anteprima.card': 'Team Tasks Manager: coordinate your team where it already talks.',
  'anteprima.logo': 'Team Tasks Manager logo',
  'anteprima.aggiungi': 'Add to Discord',
  'anteprima.docs': 'Team Tasks Manager docs',
  'anteprima.leggi': 'Read the guide',
  'link.esterno': ' (opens in a new tab)',
  'premium.titolo': 'Unlocked for every server during the beta',
  'premium.funzione': 'Premium feature: see the plans',
  'note.altre': { one: '{n} more', other: '{n} more' },
  'note.modifiche': { one: '{n} change', other: '{n} changes' },
} as const;
