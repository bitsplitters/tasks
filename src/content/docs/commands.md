---
title: Commands reference
description: The complete list of slash commands — most of TTM lives in buttons, not commands.
group: Using the bot
order: 2.5
---

TTM deliberately keeps commands to a minimum: once a list exists, you drive everything from buttons. Here is the full set.

## `/create-list`

Create and manage a task list. TTM checks it has the permissions it needs in the channel, then posts the list with its button panel. This is the command you'll use most.

→ See [The task list panel](/docs/the-task-list/).

## `/config app`

Open the configuration panel: notification mode, history tracking, push notifications, the `/create-list` legend, recurring reminders, behavior on selection, time zone and permission sync.

→ See [/config app](/docs/configuration/).

## `/config lists`

The lists of this server, with two actions per list: **delete** it, or **regenerate** it — publish it again, with the same contents, when its message was deleted by mistake.

Each row has one button that cycles through three states: <img class="inline-ic" src="/icons/noaction.png" alt="" /> grey does nothing, <img class="inline-ic" src="/icons/refresh.png" alt="" /> blue regenerates, <img class="inline-ic" src="/icons/delete.png" alt="" /> red deletes. Mark as many lists as you need, then press **Apply** and confirm: the whole block runs at once.

Two things worth knowing. The panel lists **every** list this server has ever used, including those whose message no longer exists — TTM does not check Discord for each one, so open the linked channel if you want to see for yourself. And **regeneration keeps the activity timeline**: the new message reuses the same thread, so the history stays where it was.

→ See [/config lists](/docs/config-lists/).

## `/config webhook`

Create, view, modify or delete a webhook, optionally scoped to a **completion** or **reopen** trigger.

→ See [/config webhook](/docs/webhooks/).

## `/beta`

What being in beta means for you: everything unlocked, for free, for the whole beta — plus a button that shows what the paid plan will look like afterwards.

→ See [Free during the beta](/docs/beta/).

## `/help`

Your starting point inside Discord. It opens a panel with buttons:

- <img class="inline-ic" src="/icons/home_blue.png" alt="" /> **Home** — an overview of the app.
- <img class="inline-ic" src="/icons/start_blue.png" alt="" /> **Get started** — a quick start with a link to this documentation.
- <img class="inline-ic" src="/icons/config_blue.png" alt="" /> **Configuration** — points you to `/config app`.
- <img class="inline-ic" src="/icons/premium_blue.png" alt="" /> **Premium** — what the paid plan will look like once the beta ends (free limits included).
- <img class="inline-ic" src="/icons/abouts_blue.png" alt="" /> **About us** — who builds TTM.

<div class="callout"><div class="callout-t">Note</div>All commands run with no required input — one click is enough to start them.</div>
