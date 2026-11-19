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
