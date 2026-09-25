---
title: Commands reference
description: The complete list of slash commands — most of TTM lives in buttons, not commands.
group: Reference
order: 9.4
---

TTM deliberately keeps commands to a minimum: once a list exists, you drive everything from buttons. To run one, type `/` in the message box and pick it, or open the **App Launcher** in the message bar and choose **Team Tasks Manager** under *Apps on this Server*. If your Discord is in another language, some names are translated: see [Command names in your language](#command-names-in-your-language) at the bottom.

Here is the full set.

## `/create-list`

Create and manage a task list. TTM checks it has the permissions it needs in the channel, then posts the list with its button panel. This is the command you'll use most.

It has one option, **`file`**, and you can leave it out. Attach the `.txt` file a list's **Download** gives you — up to 64 KB, even one downloaded on another server — and TTM rebuilds the list from it instead of opening the creation form: tasks with their state, owners, tags, reminders and webhooks. Like any new list, it needs a free place on your plan.

If something in the file doesn't fit, nothing is created, and TTM lists every problem at once, each with its line or its task: a file it doesn't recognise, a role, channel, member or webhook this server doesn't have, a reminder with no owner, a list too big for a message, or a limit — tasks per list, recurring reminders where they aren't allowed, repetitions, reminders waiting at the same time. Reminders whose alerts are all in the past are the exception: they are left out, the list is created, and TTM tells you which ones. A file that isn't a `.txt`, or is bigger than 64 KB, is refused straight away.

→ See [The task list panel](/docs/the-task-list/), and [Tips & tricks](/docs/tips/#reuse-a-list-anywhere) for reusing a list on another server.

## `/config app`

Open the configuration panel: notification mode, history tracking, push notifications, the `/create-list` legend, dimmed completed tasks, recurring reminders (a Premium feature — on the Free plan every reminder is a single event), behavior on selection, time zone and permission sync.

→ See [/config app](/docs/configuration/).

## `/config lists`

The lists of this server, with three actions per list: **regenerate** it — publish it again, with the same contents, when its message was deleted by mistake — **seal** it, so it stays in the channel as a record without buttons, or **delete** it.

Each row has one button that cycles through four states: <img class="inline-ic" src="/icons/noaction.png" alt="" /> grey does nothing, <img class="inline-ic" src="/icons/refresh.png" alt="" /> blue regenerates, <img class="inline-ic" src="/icons/seal.png" alt="" /> green seals, <img class="inline-ic" src="/icons/delete.png" alt="" /> red deletes. Mark as many lists as you need, then press **Apply** and confirm: the whole block runs in one go — deletions first, then seals, then regenerations — and a summary tells you which lists were done, and which weren't and why.

Two things worth knowing. The panel lists **every** list this server has ever used, including those whose message no longer exists — TTM does not check Discord for each one, so open the linked channel if you want to see for yourself. And **regeneration keeps the activity timeline**: the new message reuses the same thread, so the history stays where it was.

→ See [/config lists](/docs/config-lists/).

## `/config webhook`

Create, view, modify or delete a webhook, optionally scoped to a **completion** or **reopen** trigger.

→ See [/config webhook](/docs/webhooks/).

## `/beta`

What being in beta means for you: everything unlocked, for free, for the whole beta; what happens when it ends, and why there's a paid plan at all — plus a button that shows what that plan will look like.

→ See [Free during the beta](/docs/beta/).

## `/help`

Your starting point inside Discord. It opens a panel with buttons:

- <img class="inline-ic" src="/icons/home_blue.png" alt="" /> **Home** — an overview of the app.
- <img class="inline-ic" src="/icons/start_blue.png" alt="" /> **Get started** — a quick start with a link to this documentation.
- <img class="inline-ic" src="/icons/config_blue.png" alt="" /> **Configuration** — points you to `/config app`.
- <img class="inline-ic" src="/icons/premium_blue.png" alt="" /> **Premium** — what the paid plan will look like once the beta ends (free limits included).
- <img class="inline-ic" src="/icons/abouts_blue.png" alt="" /> **About us** — who builds TTM.

<div class="callout"><div class="callout-t">Note</div>Every command starts with one click, with a single exception: <code>/config webhook</code> asks for the <strong>action</strong> and the <strong>webhook name</strong> up front — see <a href="/docs/webhooks/#creating-a-webhook">/config webhook</a>. The <code>file</code> of <code>/create-list</code> is optional: leave it out and the command starts with one click like the rest. Everything else you configure from buttons and menus, not from typed arguments.</div>

## Command names in your language

Discord shows each command in the language of your Discord app, and in English for a language TTM isn't translated into. `/config app`, `/config lists`, `/config webhook` (with its `webhook` option), `/beta` and `/help` keep the same name everywhere.

| Language | `/create-list` | its `file` option | `/config webhook` options |
| :--- | :--- | :--- | :--- |
| English, and any other language | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `accion` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `acao` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `evenement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

The choices inside the options — view, create, modify, delete; completion, reopen — appear in your language too.
