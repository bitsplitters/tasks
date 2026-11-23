/*
 * I testi della demo della home e dei video che non sono del bot (spec 2026-11-19-sito-multilingua-design.md, §10, nel
 * repo team-tasks-manager): i tooltip dei pulsanti (§8 della spec 2026-11-15-home-video-e-demo-design.md), i testi del
 * client Discord, l'avviso della sola lettura e la lista della demo coi nomi del suo server. Li legge scene-data.ts
 * nella lingua della pagina; quelli del bot stanno in src/components/home/demo/testi/. `{n}` e `{nome}` sono
 * segnaposto.
 */
export const testi = {
  // Cosa fanno i pulsanti, nei tooltip: la prima riga del canale
  'tooltip.activity': 'Open the list in a window inside Discord and work on it together.',
  'tooltip.bulk': 'Edit the title and every task at once.',
  'tooltip.clean': 'Clear away the completed tasks.',
  'tooltip.reopen': 'Bring every completed task back to to-do.',
  'tooltip.more': 'Clone, download, seal or delete the list, plus the guide to every button.',
  // La seconda riga e il pannello dell'Activity
  'tooltip.content': 'Edit or delete a task.',
  'tooltip.owner': 'Give a task its owner: a person, a role, or several people.',
  'tooltip.tag': 'Choose who hears about it when the task is done.',
  'tooltip.reminder': 'Set when the owner gets reminded.',
  'tooltip.webhook': 'Let your other systems know when the task is ticked or reopened.',
  'tooltip.colori': 'Blue edits, red deletes.',
  // L'Activity
  'tooltip.guide': 'What every button does.',
  'tooltip.exit': 'Leave the Activity. The last one out sends the list back to the channel, with a summary.',
  'tooltip.lists.nome': 'Lists',
  'tooltip.lists': 'See the other lists of this channel.',
  'tooltip.people.nome': 'People here',
  'tooltip.people': "Who's working on the list right now.",
  'tooltip.settings': 'Your theme and text size, just for you.',

  // Il client Discord in questa lingua
  'discord.annulla': 'Cancel',
  'discord.invia': 'Submit',
  'discord.chiudi': 'Close',
  'discord.obbligatorio': 'This field is required.',
  'discord.almeno': 'Must be at least {n} characters long.',
  'discord.togli': 'Remove {nome}',
  'discord.nessuno': 'No results found',
  'discord.soloTu': 'Only you can see this',
  'discord.dismiss': 'Dismiss message',
  'discord.scrivi': 'Message #{nome}',

  'avviso': "For illustration only: this demo doesn't fully replicate how TTM works.",

  // La lista della demo e dei video, coi nomi del server
  'lista.titolo': 'Roster & scrims — week 12',
  'lista.task.1': "Confirm the five-man roster for Saturday's scrim block",
  'lista.task.2': 'Lock the scrim block vs. Nova Collective',
  'lista.task.2.1': 'Clip the three teamfights for the review',
  'lista.task.3': 'VOD review: mid rotations, game 3',
  'lista.task.4': 'Publish the match-day graphic',
  'lista.webhook.risultati': 'Scrim results',
  'lista.webhook.staff': 'Staff alerts',
  'lista.ruolo': 'Coaches',
};
