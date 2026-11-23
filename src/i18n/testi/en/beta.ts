/*
 * I testi della pagina della beta (src/pagine/Beta.astro e src/components/beta/), spec
 * 2026-11-19-sito-multilingua-design.md, §4.4, nel repo team-tasks-manager. Lo stato del Founder sta in premium.ts
 * (`fd.stato`): lo scrivono tutte e due le pagine.
 */
export const testi = {
  'titolo': 'Open beta',
  'descrizione':
    'Every feature of Team Tasks Manager is unlocked during the open beta, on every server. What you build now stays yours when the beta ends.',
  'anteprima.vedi': 'See the beta',
  'hero.titolo1': 'Everything unlocked.',
  'hero.titolo2': 'Nothing to lose.',
  'hero.intro':
    'Team Tasks Manager is in open beta: every feature works on every server, with no trial clock and no locked buttons. What you build now stays yours when the beta ends.',

  'sbloccato.titolo': 'Unlocked for you, right now.',
  'sbloccato.1.t': 'Unlimited lists',
  'sbloccato.1.d': 'Every project, squad or event gets its own list.',
  'sbloccato.2.t': '50 tasks per list',
  'sbloccato.2.d': 'Room for a real backlog, subtasks included.',
  'sbloccato.3.t': 'Reminders without a cap',
  'sbloccato.3.d': 'As many waiting at once as your team needs.',
  'sbloccato.4.t': 'Repeating reminders',
  'sbloccato.4.d': 'Up to 50 pings, every day or every two hours. An admin turns them on first.',
  'sbloccato.5.t': 'A team as owner',
  'sbloccato.5.d': 'Up to 25 people share a task, through a role TTM creates.',
  'sbloccato.6.t': 'Webhooks',
  'sbloccato.6.d': 'A ticked task calls your deploy, your spreadsheet or your ticket system.',
  'sbloccato.dopo':
    'After the beta, these are what <a class="h-link" href="{premium}">Premium</a> adds. What you set up during the beta stays: see <a class="h-link" href="#promise">our promise</a> below.',

  'promessa.titolo': 'Our promise for when the beta ends.',
  'promessa.1.t': 'Nothing is deleted or hidden.',
  'promessa.1.d': 'Your lists, tasks and reminders stay exactly where they are.',
  'promessa.2.t': 'What you build now stays.',
  'promessa.2.d': 'Even above the Free limits: its reminders keep arriving, and its tasks can still be ticked.',
  'promessa.3.t': 'The Free plan stays, forever.',
  'promessa.3.d': 'Hosted by us. A small team can keep using TTM for good.',
  'promessa.riquadro.t': 'We will never switch the bot off to make you pay.',
  'promessa.riquadro': 'A task manager that stops working is useless, and we know it.',
  'promessa.dettagli': 'All the details: How the beta works',

  'tempi.titolo': 'No surprises, step by step.',
  'tempi.ora': 'Now',
  'tempi.ora.t': 'Open beta',
  'tempi.ora.d': 'Every feature, on every server. Add TTM, build your lists, set your reminders.',
  'tempi.fd.quando': 'Before the beta ends',
  'tempi.fd.evento': 'Limited-time event',
  'tempi.fd.t': 'The Founder window',
  'tempi.fd.d':
    'For a limited time, any server can unlock the Founder badge. It opens the Founder price on Premium and a numbered badge, while spots last. Once, never again.',
  'tempi.fd.link': 'How Founder works',
  'tempi.dopo': 'After the beta',
  'tempi.dopo.t': 'Free and Premium',
  'tempi.dopo.d': 'The Free plan stays, forever. Premium lifts the limits for the servers that need more.',

  'voce.titolo': 'Shape what comes next.',
  'voce.intro':
    "The beta is when your voice counts most. Ask questions, report bugs and tell us what's missing on our Discord server: it's where we decide what comes next.",
  'voce.ritmo': 'A new release almost every week since launch.',
  'voce.note': 'See the release notes',

  'finale.titolo': 'Start while everything is unlocked.',
} as const;
