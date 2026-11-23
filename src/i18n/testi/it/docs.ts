// I testi della documentazione in italiano: le chiavi di src/i18n/testi/en/docs.ts. `fonte` è l'impronta dell'inglese
// tradotto (npm run traduzioni -- --firma).
export const fonte = '9c3ddc506cca';

export const testi = {
  titolo: 'Documentazione',
  title: 'Documentazione — Team Tasks Manager',
  sottotitolo: 'Tutto quello che serve per usare Team Tasks Manager nel tuo server Discord.',
  sfoglia: 'Sfoglia la documentazione',
  panoramica: 'Panoramica',
  'pagina.suffisso': '{titolo} — Documentazione di Team Tasks Manager',
  'menu.apri': 'Apri il menu della documentazione',
  'menu.pulsante': 'Documentazione',
  'menu.chiudi': 'Chiudi il menu',
  'riserva': 'Questa pagina non è ancora tradotta: eccola in inglese.',
  'copia': 'Copia',
  'copiato': 'Copiato',
  'gruppo.inizio': 'Per iniziare',
  'gruppo.funzioni': 'Funzioni',
  'gruppo.funzioni.intro': "Cosa fa ogni funzione e con quali regole. Sono le stesse nel canale e nell'Activity.",
  'gruppo.canale': 'Nel canale',
  'gruppo.canale.intro': 'La lista come messaggio in un canale Discord: cosa vedi e quali pulsanti premere.',
  'gruppo.activity': "Nell'Activity",
  'gruppo.activity.intro':
    'La lista in una finestra dentro Discord, dove ci lavorate insieme: cosa vedi e dove toccare.',
  'gruppo.perte': 'Per te',
  'gruppo.perte.intro': "Quello che TTM tiene solo per te, uguale in ogni server e nell'Activity.",
  'gruppo.configurazione': 'Impostazioni del server',
  'gruppo.configurazione.intro':
    "Le imposta chi gestisce il server con /config, da qualunque canale. Valgono per le liste nel canale e nell'Activity.",
  'gruppo.riferimento': 'Riferimento',
  'gruppo.piani': 'Piani',
  'gruppo.aiuto': 'Aiuto e community',
  'posto.channel': 'Nel canale',
  'posto.activity': "Nell'Activity",
} as const;
