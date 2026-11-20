# tasks.bitsplitters.app

Documentation site for **Team Tasks Manager (TTM)**, built with [Astro](https://astro.build) and served on GitHub Pages at `tasks.bitsplitters.app`.

## Editing content

All the docs are plain **Markdown** in `src/content/docs/`. To change wording, open the `.md` file and edit the text — no code involved.

Each file starts with a small header:

```yaml
---
title: Getting started
description: One-line summary shown under the title and in the docs index.
group: Getting started   # Getting started | Using the bot | Configuration | Reference | Plans | Help & community
order: 1                 # position within the group
---
```

### Add a page
Create a new `.md` file in `src/content/docs/` with the header above. It appears in the sidebar automatically, in the right group and order. A **new group** must also be added to `groupsOrder` in both `src/pages/docs/index.astro` and `src/pages/docs/[...slug].astro`: a page whose group isn't listed there doesn't show in the sidebar.

### Release notes
`src/content/docs/release-notes.md` has `releases: true` in its header: each release becomes a box that opens, with
its date and a preview (decided 2026-11-19). Keep writing plain Markdown, with three rules:

- **Under each `## X.Y.Z — Title`, a line `Released YYYY-MM-DD`:** the day the release came out, the same one `/news`
  shows. The page shows it as *19 November 2026*.
- **Every item starts with its title in bold:** `- **A new list announces itself** — …`. The closed box shows the
  bold titles of the first three items, then how many more there are: write the items in order of importance.
- **A `---` line after the last release:** what follows it (the *Coming soon* box) stays outside the boxes.

Never change the title of a published release: `/news` links each release by the anchor made from its title. The
build stops if a release has no date, has a wrong one, or has an item without a bold title. The newest release is
open; a link to another one opens it.

### Use cases
`src/content/use-cases/*.md` are the pages under `/use-cases/`: each one follows a team through one week with TTM,
from Monday 7 to Sunday 13 December 2026 (spec `2026-11-20-casi-d-uso-esempi-completi-design.md` in
`team-tasks-manager`). They are examples, not templates: nothing is meant to be pasted as it is.

The header carries `title` (the H1), `seoTitle` (the browser title), `name` (the short name in the index),
`description`, `highlights` (what the case shows, for the index, the home and *Other use cases*), `intro` and `order`,
then the data of the story:

- `team`: the server's name, the time zone, and the people, roles and channels, each with an id of 17 to 20 digits. A
  role with `ttm: true` is one that TTM created for an owner of several people, with its `members`.
- `list`: the title, the channel, the moment the page shows it (`at`, in the team's zone), the text as **Bulk update**
  shows it, codes included, `spaced` and `tips` for the settings that change its look, and `look`, which says what to
  notice.
- `webhooks`: the fields of `/config webhook`, the trigger (`completion` or `both`), the setup on the service's side
  and, for Discord, the name and channel the message `postsAs`.
- `settings`: the choices of `/config app`, with the reason.
- `week`: the moments of the week. A `card` reproduces one: a `reminder` as it arrives, a `notice` under the list
  (`claimed`, `assigned`, `updated` with the owner `from` before, `completed`), or what a `webhook` sends when `by`
  ticks the task.

The body is the rest of the page: *Next time*, *What TTM doesn't do here*, *Questions*. A new page also shows up by
itself in the index and in the home's *What teams use it for*, in the order of `order`.

The list is drawn at build time by the engine of the home's demo, so it looks as the bot draws it. **The build
stops** when the bot would refuse the story: more than 20 tasks, 4000 characters or a title over 90; a line it can't
read; a mention, owner or channel that isn't in the team; a reminder without an owner or with more than 49
repetitions; a recurring reminder with *Recurring reminders* missing from `settings`; a `{{wb=…}}` naming a webhook
the page doesn't have, or a body that isn't JSON once its tokens are replaced; a moment outside the week, out of order,
or with a card on a task that doesn't fit it. The check is `src/lib/esempi/controllo.ts`, the tests are
`scripts/esempi.test.ts`. Write the ids as placeholders while drafting, then replace them: any 17-digit number works,
as long as each one is used for one person, role or channel only.

### Icons
Button/feature icons live in `public/icons/`: they are the bot's emoji. One rule for every page (decided 2026-11-19):

- **A function is its name in bold, then its white icon**, as tall as the text:
  `**More** <img class="inline-ic" src="/icons/other.png" alt="" />`. The same order in prose, in lists and in tables:
  never the icon before the name, never a blue icon, never a drawn Discord button.
- The icon goes where it helps to find the button: the first time a function appears in a section, and in lists and
  tables of buttons. Not on every repetition.
- A button's color is a word: `<span class="c-blue">Blue</span>` (also `c-grey`, `c-green`, `c-red`).
- One exception: when a page shows what Discord displays (the text of a task, a line of a message), the emoji stays as
  it is there, blue and in its place (`*_blue.png`), like the «In the text» column of *Writing a list*.
- Places are not functions: the *In the channel* and *In the Activity* badges (`place-ic`, `place-pill`) keep their
  own style.
- A white icon that is missing here comes from `team-tasks-manager/selfhost/emoji/`, where the bot's emoji are.
- In the light theme the white icons darken by themselves (`--icon-filter`); the blue ones (`*_blue.png`) and the
  checkboxes don't, because they show what Discord displays.

### Colors
The site has a dark theme, the default for everyone, and a light one chosen with the switch in the header (decided
2026-11-19). One rule for every page:

- **A color that changes with the theme is a variable in `src/styles/global.css`,** defined in both blocks: `:root`
  (dark) and `:root[data-theme="light"]`. Pages don't write colors by hand.
- **Amber as text, border or focus ring is `--accent-text`;** amber as a background is `--accent`, with `--on-accent`
  text on it: the brand amber on white is 2.1:1, too low for text. The bot's green works the same way (`--bot-text`,
  `--bot`).
- **Discord's colors are the `--dc-*` constants of `src/styles/discord.css`:** Discord reproductions (the demo, the
  illustrations, the tooltips, the place badges) stay dark in both themes.
- **A tint is `color-mix(in srgb, var(--x) N%, transparent)`** from a variable, never a hand-written `rgba()`.
- **A new color comes with its contrast measured in both themes:** at least 4.5:1 for text, 3:1 for large text and
  for the focus ring.

## Local preview

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages.

Repo settings needed once: **Settings → Pages → Source = GitHub Actions**, and a DNS record `CNAME tasks → bitsplitters.github.io` (DNS only) on Cloudflare.
