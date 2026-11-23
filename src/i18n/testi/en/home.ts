/*
 * I testi della home (src/pagine/Home.astro e src/components/home/), spec 2026-11-19-sito-multilingua-design.md, §4.4,
 * nel repo team-tasks-manager. Le scene della demo hanno i loro testi in demo.ts. Un `\n` nelle righe del confronto va
 * a capo dopo la frase (Compare.astro). Un testo con markup si rende con set:html.
 */
export const testi = {
  'title': 'Team Tasks Manager — Discord task list bot with reminders',
  'description':
    'Team Tasks Manager is a to-do list bot for Discord: shared task lists in your channels, with owners, tags and reminders by DM. Nothing to learn. Just click.',
  'pitch':
    '## Team Tasks Manager\nCoordinate your team where it already talks.\n- Shared checklists inside the channel\n- Tasks for people or roles\n- Automatic reminders',
  'anteprima.alt': 'A Team Tasks Manager list in a Discord channel',
  'hero.titolo': 'Coordinate your team where it already talks.',
  'hero.tagline': 'Nothing to learn. Just click.',
  'hero.lede':
    'Team Tasks Manager brings shared checklists, owners and reminders into your Discord server. Work on them right in the channel, or together in the Activity.',
  'finale.titolo': 'Give your team one place to look.',

  'video.canale.frase':
    'Video: a Team Tasks Manager list in a Discord channel. A task is ticked from the menu under the list, then another gets an owner and a reminder.',
  'video.activity.frase':
    'Video: the Activity button opens the list in a window inside Discord, where a task is ticked and another gets an owner and a reminder.',
  'video.passo1': 'Tick a task',
  'video.passo2': 'Set an owner',
  'video.passo3': 'Add a reminder',
  'video.avvia': 'Play the video',
  'video.pausa': 'Pause the video',

  'modi.label': 'Two ways to work',
  'modi.canale': 'In the channel',
  'modi.activity': 'In the Activity',

  'problema.titolo': 'Plans made in chat scroll away.',
  'problema.intro':
    "Who's booking the scrim? When's the VOD review? It was settled in the channel an hour ago, and now it's forty messages up. So someone opens another app, and half the team never does. Every update means leaving Discord, and keeping two places in sync turns into a job of its own.",
  'problema.perche':
    "We built TTM because we lived it. That's why there's no dashboard to visit and no account to create: everything happens in Discord, with the buttons and menus your team already knows.",

  'pilastri.titolo': 'So we put the plan inside the conversation.',
  'pilastri.comando': '/create-list',
  'pilastri.semplice.t': 'Simple to use',
  'pilastri.semplice.d': "One command to start. After that, it's just buttons you already know.",
  'pilastri.lingue.t': 'Multilanguage',
  'pilastri.lingue.d': 'English, Italian, German, French, Spanish and Portuguese. Your whole community feels at home.',
  'pilastri.modi.t': 'Two ways to work',
  'pilastri.modi.d':
    "Tick a task on the fly, right in the chat. When there's real work to do, open the list in the Activity and do it together.",
  'pilastri.modi.link': 'Try both',

  'casi.titolo': 'What teams use it for.',
  'casi.intro':
    'Each case follows a team through one week: the list, who owns what, the reminders that reach them and the webhooks that fire when a task is done.',
  'casi.tutti': 'See all use cases',

  'funzioni.titolo': 'Everything a team needs. Nothing it has to learn.',
  'funzioni.liste.t': 'Shared lists',
  'funzioni.liste.d':
    'One list, one version of the truth. Everyone sees the same tasks, updated the moment someone ticks one.',
  'funzioni.owner.t': 'Owners & tags',
  'funzioni.owner.d': "Every task has a name on it. Tag whoever needs to know, and they hear about it when it's done.",
  'funzioni.promemoria.t': 'Reminders',
  'funzioni.promemoria.d': 'Deadlines stop slipping: the owner gets a nudge on Discord, right when you planned it.',
  'funzioni.gruppi.t': 'Groups & subtasks',
  'funzioni.gruppi.d': 'Break big jobs into steps. Tick the last one, and the whole group is done.',
  'funzioni.cronologia.t': 'Activity timeline',
  'funzioni.cronologia.d': 'Who did what, and when. Every change to the list stays on record.',
  'funzioni.webhook.t': 'Webhooks',
  'funzioni.webhook.d':
    'Tick or reopen a task, and TTM calls your other systems: a CI, a ticket tracker, a spreadsheet, anything that takes an HTTP request.',

  'confronto.titolo': "Coordination shouldn't cost you your focus.",
  'confronto.ttm': 'Team Tasks Manager',
  'confronto.altra': 'A separate task app',
  'confronto.didascalia': 'Team Tasks Manager compared with a separate task app',
  'confronto.1.voce': 'Where the tasks are',
  'confronto.1.ttm': 'In the channel where the work is discussed.',
  'confronto.1.altra': 'In another tool, while the team talks on Discord.',
  'confronto.2.voce': 'Keeping up to date',
  'confronto.2.ttm': 'The whole team sees the same list.\nAll in real time.',
  'confronto.2.altra': 'Every update means switching windows, copying links, re-explaining status.',
  'confronto.3.voce': 'The full picture',
  'confronto.3.ttm': 'One list, in the place everyone already looks.',
  'confronto.3.altra': 'Scattered across windows: no one has the full picture.',
  'confronto.4.voce': 'Deadlines',
  'confronto.4.ttm': 'The owner gets the reminder on Discord.',
  'confronto.4.altra': 'Nobody owns the reminder, so deadlines slip.',
  'confronto.5.voce': 'Getting started',
  'confronto.5.ttm': 'Add the bot and type one command.\nNo new accounts.',
  'confronto.5.altra': 'Sign-ups for everyone, and a new tool to learn.',

  'demo.titolo': 'Two ways to work. Try them both.',
  'demo.intro': 'The real interface, right here.',
  'demo.hover': 'Hover any button to see what it does.',
  'demo.touch': 'Press and hold any button to see what it does.',
  'demo.canale.frase':
    '<strong>On the fly.</strong> The list lives in the conversation: everyone sees it, and a tick takes two clicks.',
  'demo.activity.frase':
    '<strong>Together, with room to work.</strong> A full window inside Discord, on desktop and mobile, where the team shapes the list live, for as long as the session lasts.',
  'demo.reset': 'Start over',
} as const;
