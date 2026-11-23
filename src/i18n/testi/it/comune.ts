// I testi comuni in italiano: le chiavi di src/i18n/testi/en/comune.ts. `fonte` è l'impronta dell'inglese tradotto
// (npm run traduzioni -- --firma).
export const fonte = '';

export const testi = {
  'nav.label': 'Sito',
  'nav.docs': 'Docs',
  'nav.casi': "Casi d'uso",
  'nav.premium': 'Premium',
  'nav.beta': 'Beta',
  'nav.note': 'Novità',
  'piede.terms': 'Termini',
  'piede.privacy': 'Privacy',
  'piede.gdpr': 'GDPR',
  'piede.license': 'Licenza',
  'piede.lingue': 'Lingue',
  'piede.fazier': 'Badge di Fazier',
  'tema.chiaro': 'Passa al tema chiaro',
  'tema.scuro': 'Passa al tema scuro',
  'selettore.label': 'Lingua: {nome}',
  'ricerca.segnaposto': 'Cerca in italiano',
  'anteprima.descrizione':
    'Team Tasks Manager porta il coordinamento dei task dentro Discord: liste condivise, promemoria e ruoli, senza uscire dal tuo server.',
  'anteprima.card': 'Team Tasks Manager: coordina il tuo team dove già parla.',
  'anteprima.logo': 'Logo di Team Tasks Manager',
  'anteprima.aggiungi': 'Aggiungi a Discord',
  'anteprima.docs': 'Documentazione di Team Tasks Manager',
  'anteprima.leggi': 'Leggi la guida',
  'link.esterno': ' (si apre in una nuova scheda)',
  'premium.titolo': 'Sbloccata per ogni server durante la beta',
  'premium.funzione': 'Funzione Premium: vedi i piani',
  'note.altre': { one: "un'altra", other: 'altre {n}' },
  'note.modifiche': { one: '{n} modifica', other: '{n} modifiche' },
} as const;
