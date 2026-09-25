---
title: Commands reference
description: The complete list of slash commands — most of TTM lives in buttons, not commands.
group: Reference
order: 9.4
---

TTM keeps commands to a minimum: once a list exists, you do everything with buttons and menus. To run a command, type `/` in the message box and pick it. You can also open the **App Launcher** in the message bar and choose **Team Tasks Manager** under *Apps on this Server*.

If your Discord is in another language, some names are translated: see [Command names in your language](#command-names-in-your-language) at the bottom.

## `/create-list`

Create a task list. TTM checks that it has the permissions it needs in the channel, then posts the list with its button panel. This is the command you'll use most.

The command has one option, **`file`**, and you can leave it out. Attach the `.txt` file that a list's **Download** gives you: it is named after the list, and it can come from another server. TTM then rebuilds the list from the file instead of opening the creation form. The list comes back with its tasks and their state, owners, tags, reminders and webhooks. Like any new list, it needs a free place on your plan (see [How the three places work](/docs/premium/#how-the-three-places-work)).

TTM refuses a file straight away if it isn't a `.txt` or is bigger than **64 KB**. Otherwise TTM reads the file. If something doesn't fit, TTM creates nothing and lists every problem in one message, each with its line or its task:

- **The format** — the file isn't UTF-8 text, or it doesn't start with `#!ttm/1`. The title is missing or longer than 256 characters. A line isn't a task, a reminder is written in months (`M`), the list starts with a subtask, or there are no tasks.
- **The size** — the list is too long for one message, or it has more tasks than a list can hold or your plan allows.
- **The reminders** — a reminder has no owner or repeats more times than your plan allows. A recurring reminder is refused where new ones can't be created (see [Reminders](/docs/reminders/#repeating-reminders)). Too many reminders would be waiting at the same time.
- **This server** — a role, a channel or a webhook in the file doesn't exist here, or a user in the file isn't a member.

Reminders whose alerts are all in the past are the exception: TTM leaves them out, creates the list and tells you which ones.

→ See [The task list panel](/docs/the-task-list/), and [Tips & tricks](/docs/tips/#reuse-a-list-anywhere) for reusing a list on another server.

## `/config app`

Open the settings panel of your server: notifications, the activity timeline, the `/create-list` legend, recurring reminders, time zone, permissions and more.

→ See [/config app](/docs/configuration/).

## `/config lists`

See every list of this server, and regenerate, seal or delete several of them at once. Regenerating brings back a list whose message was deleted by mistake.

→ See [/config lists](/docs/config-lists/).

## `/config webhook`

Create, view, modify or delete a webhook, optionally limited to a **completion** or **reopen** trigger. It is the only command with options you must fill in: the **action** and the **webhook name**.

→ See [/config webhook](/docs/webhooks/#creating-a-webhook).

## `/beta`

This command shows what the beta means for your server: every feature is unlocked and free for the whole beta. It also explains what happens when the beta ends, and why there's a paid plan. A button shows what that plan will look like.

→ See [Free during the beta](/docs/beta/).

## `/help`

This command is your starting point inside Discord. It opens a panel with five buttons:

- <img class="inline-ic" src="/icons/home_blue.png" alt="" /> **Home** — an overview of the app.
- <img class="inline-ic" src="/icons/start_blue.png" alt="" /> **Get started** — a quick start, with a link to this documentation.
- <img class="inline-ic" src="/icons/config_blue.png" alt="" /> **Configuration** — what `/config app`, `/config lists` and `/config webhook` are for.
- <img class="inline-ic" src="/icons/premium_blue.png" alt="" /> **Premium** — what the paid plan will look like once the beta ends, free limits included.
- <img class="inline-ic" src="/icons/abouts_blue.png" alt="" /> **About us** — who builds TTM.

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
