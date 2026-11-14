// La pagina dei piani (/premium/, src/pages/premium.astro) sta fuori dalla collezione docs, ma la
// documentazione la elenca in fondo al gruppo Plans. Titolo e descrizione servono alla pagina, alle due barre
// laterali e all'indice della documentazione (spec della pagina Premium, §3.10 e §5.4).
export const PAGINA_PIANI = {
  title: 'Plans and pricing',
  path: '/premium/',
  description:
    'Free covers a small team. Premium lifts the limits, with one price for the whole server. ' +
    'During the open beta, every Premium feature is unlocked for every server.',
};
