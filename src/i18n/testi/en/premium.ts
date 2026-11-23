/*
 * I testi della pagina dei piani (src/pagine/Premium.astro e src/components/premium/), spec
 * 2026-11-19-sito-multilingua-design.md, §4.4, nel repo team-tasks-manager. `pagina.*` serve anche alla
 * documentazione (lib/pagina-piani.ts). I link dei testi con markup arrivano come segnaposto ({community}, {note}…):
 * il componente ci mette l'indirizzo nella lingua della pagina. Gli importi sono testi: in italiano il simbolo dell'euro
 * va dopo la cifra.
 */
export const testi = {
  'pagina.titolo': 'Plans and pricing',
  'pagina.descrizione':
    'Free covers a small team. Premium gives growing teams more room and connects your lists to your tools with webhooks. One price for the whole server. During the open beta, every Premium feature is unlocked for every server.',
  'anteprima.vedi': 'See the plans',
  'iva': '+ VAT',
  'limite.discord': ' (Discord limit)',

  'beta.label': 'Open beta',
  'beta.testo':
    '<strong>Open beta.</strong> Every Premium feature is unlocked, for every server. Prices apply when the beta ends. <a class="h-link" href="{beta}">Why start now</a>',
  'hero.titolo1': 'Start on Free.',
  'hero.titolo2': 'Grow into Premium.',
  'hero.intro':
    'Free covers a small team, and stays free. Premium gives growing teams more room and connects your lists to your tools with webhooks. One price for the whole server, no cost per member.',

  'piani.periodo': 'Billing period',
  'piani.mensile': 'Monthly',
  'piani.annuale': 'Annual',
  'piani.risparmio': 'save 40%',
  'free.nome': 'Free',
  'free.importo': '€0',
  'free.nota': 'For small teams, for good.',
  'free.1': '3 lists in use',
  'free.2': '20 tasks per list',
  'free.3': '10 reminders waiting at a time',
  'free.4': 'Single reminders',
  'premium.nome': 'Premium',
  'premium.annuale.importo': '€3',
  'premium.mensile.importo': '€5',
  'premium.al.mese': '/ month',
  'premium.annuale.nota': '€36 billed once a year · or €5 month to month',
  'premium.mensile.nota': 'Billed every month · or €3 a month on the annual plan',
  'premium.tagline': 'One price for the whole server, with no cost per member.',
  'premium.1': 'Unlimited lists',
  'premium.2': '50 tasks per list',
  'premium.3': 'Unlimited reminders',
  'premium.4': 'Repeating reminders, up to 50 times',
  'premium.5': 'Tasks for several people, with a role created for them',
  'premium.6': 'Up to 25 webhooks',
  'premium.incluso': 'Active on every server now, for the whole beta',
  'fine.iva':
    '<strong>Prices are before VAT.</strong> VAT depends on the country you buy from: in the EU it goes from 17% to 27%. So the price before VAT is the same for everyone, and the checkout adds your country\'s rate, in your currency, before you pay. Discord handles payments for apps the same way: <a class="h-link" href="https://support-dev.discord.com/hc/en-us/articles/23810643331735-Premium-Apps-Required-Support-for-Monetizing-Apps" target="_blank" rel="noopener noreferrer">all taxes are paid by the buyer<span class="sr-only"> (opens in a new tab)</span></a>.',
  'fine.prezzi':
    'Planned prices and limits, final when the beta ends. The annual plan is the same product: it costs less because you pay for a year up front.',
  'fine.limiti': 'What each limit changes, in practice',
  'fine.discord':
    'A limit set by Discord, not by us. Premium lets you reach it, never go past it. See <a class="h-link" href="{limiti}">Known limits</a>.',


  'inclusi.titolo': 'Included in both.',
  'inclusi.intro': 'Every plan gets the whole bot.',
  'inclusi.1.t': 'The Activity',
  'inclusi.1.d': 'Open a list in a window inside Discord and work on it together, live.',
  'inclusi.2.t': 'Owners and tags',
  'inclusi.2.d': 'Give each task an owner, and tag the people or roles to notify.',
  'inclusi.3.t': 'Reminders',
  'inclusi.3.d': 'A ping when a task is due, in your time zone.',
  'inclusi.4.t': 'Groups and subtasks',
  'inclusi.4.d': 'Indent a line and it becomes a subtask. Groups are recognized automatically.',
  'inclusi.5.t': 'Activity timeline',
  'inclusi.5.d': 'Every change to a list, with who made it, in a dedicated thread.',
  'inclusi.6.t': 'Six languages',
  'inclusi.6.d': 'English, Italian, German, French, Spanish and Portuguese.',
  'inclusi.dopo': 'Every fix and every update reaches Free too.',

  'chi.titolo': 'Made by people you can talk to.',
  'chi.1':
    'Team Tasks Manager is made by <a class="h-link" href="https://bitsplitters.app">bitsplitters</a>, a small independent studio. We opened it to every Discord server because we believe teams work best where they already talk.',
  'chi.2':
    'Alex works on TTM full time, writing the code and answering on our <a class="h-link" href="{community}">Discord server</a>. Your idea reaches the person who can build it.',
  'chi.3':
    'TTM gets better every week: 15 releases in under a month, all in the <a class="h-link" href="{note}">release notes</a>. Every update reaches every server, including those on the Free plan.',
  'chi.4':
    'Premium gives growing teams more room, connects your lists to your tools with webhooks, and funds the next update for everyone. If you believe in TTM too, the <a class="h-link" href="#founder">Founder badge</a> is the best way to tell us.',
  'chi.alt': 'Portrait of Alex',
  'chi.ruolo': 'Developer and community manager',

  'self.titolo': 'Rather run it yourself?',
  'self.1':
    'You can, with every Premium feature unlocked, at no cost and for good. The one thing it doesn\'t include is the Activity, which only the bot we host has. The package will be on our <a class="h-link" href="{community}">Discord server</a> shortly before the beta ends: you download it and run TTM on your own machine, and every update is published there.',
  'self.2':
    'It covers you, your community or your own company. It doesn\'t cover offering TTM to others as a service, or passing the package on. The terms are in the <a class="h-link" href="{licenza}">self-hosting licence</a>, which you accept before you download it.',
  'self.conti.t': 'The honest maths',
  'self.conti':
    'Self-hosting saves you €3 a month. For that, you pay for a server, keep a database running and backed up, update the bot by hand and fix it when it breaks at night. For €3 a month <a class="h-link" href="#vat">before VAT</a>, under 10 cents a day, we do all of that for you.',

  'fd.evento': 'Limited-time event',
  'fd.quando': 'only before the beta ends',
  'fd.titolo': 'Get your exclusive Founder badge.',
  'fd.stato':
    '<strong>Not live yet.</strong> Join our <a class="h-link" href="{community}">Discord server</a> so you don\'t miss a single update.',
  'fd.lead': 'We love our community, and we want to reward the servers that believed in us first.',
  'fd.prezzo.t': 'Founder price',
  'fd.importo': '€20',
  'fd.all.anno': '/year',
  'fd.invece': 'instead of ',
  'fd.era': '€36',
  'fd.prezzo.nota': 'A full year of Premium, for Founders only.',
  'fd.badge': 'Founder badge',
  'fd.fino.a': ' to ',
  'fd.1.t': 'Once, never again.',
  'fd.1.d': 'Badges unlock in a limited window before the beta ends. When it closes, it never reopens.',
  'fd.2.t': 'Only 1000 numbers.',
  'fd.2.d':
    "The first 1000 Founders who buy get the Founder price and a numbered badge, #1 to #1000. A reservation alone doesn't hold one.",
  'fd.3.t': 'Yours for good.',
  'fd.3.d':
    'Missed the 1000? Buy at the standard price within 30 days and keep your Founder badge, without a number. Either way, it stays in the bot and on our Founders wall.',
  'fd.fine':
    'No badge, no Founder price. When Premium opens, Founders have 30 days to buy, at €20 while spots last or at the standard price, and keep their badge. No other Founder perks are planned today.',

  'domande.titolo': 'Questions?',
  'domande.intro': 'Ask us anything about plans, limits or self-hosting.',
  'domande.limiti': 'How the limits work',
} as const;
