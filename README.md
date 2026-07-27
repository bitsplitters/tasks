# tasks.bitsplitters.app

Documentation site for **Team Tasks Manager (TTM)**, built with [Astro](https://astro.build) and served on GitHub Pages at `tasks.bitsplitters.app`.

## Editing content

All the docs are plain **Markdown** in `src/content/docs/`. To change wording, open the `.md` file and edit the text — no code involved.

Each file starts with a small header:

```yaml
---
title: Getting started
description: One-line summary shown under the title and in the docs index.
group: Start          # sidebar group: Start | Using the bot | More
order: 1              # position within the group
---
```

### Add a page
Create a new `.md` file in `src/content/docs/` with the header above. It appears in the sidebar automatically, in the right group and order.

### Icons
Button/feature icons live in `public/icons/`. Use them inline in Markdown:
`<img class="inline-ic" src="/icons/owner.png" alt="" />`

## Local preview

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

## Deploy

Push to `main`. GitHub Actions (`.github/workflows/deploy.yml`) builds the site and publishes it to GitHub Pages.

Repo settings needed once: **Settings → Pages → Source = GitHub Actions**, and a DNS record `CNAME tasks → bitsplitters.github.io` (DNS only) on Cloudflare.
