---
title: Commands reference
description: Every slash command in one place, with the page that explains it — most of TTM lives in buttons, not commands.
group: Reference
order: 9.4
---

TTM keeps commands to a minimum: once a list exists, you do everything with buttons and menus. To run a command, type `/` in the message box and pick it. You can also open the **App Launcher** in the message bar and choose **Team Tasks Manager** under *Apps on this Server*.

If your Discord is in another language, some names are translated: see [Command names in your language](#command-names-in-your-language) at the bottom.

| Command | What it's for | Where it's explained |
| :--- | :--- | :--- |
| `/create-list` | Create a list, or rebuild one from a file | [Create your first list](/docs/getting-started/#2-create-your-first-list); the file [below](#create-list) |
| `/config` | The three commands for whoever looks after TTM on the server | [/config](/docs/config/) |
| `/config app` | The server's settings: notifications, history, tips, reminders, time zone, permissions | [/config app](/docs/configuration/) |
| `/config lists` | Every list of the server: regenerate, seal or delete several at once | [/config lists](/docs/config-lists/) |
| `/config webhook` | Create, view, modify or delete a webhook | [/config webhook](/docs/config-webhook/) |
| `/my timezone` | Your time zone, the same in every server | [/my timezone](/docs/my-timezone/) |
| `/beta` | What the beta means for your server | [How the beta works](/docs/beta/) |
| `/help` | Your starting point inside Discord | [Below](#help) |
| `/invite` | A card to add TTM to another server | [Below](#invite) |
| `/news` | The latest news about TTM | [Below](#news) |

## `/create-list`

To create a list from scratch, see [Create your first list](/docs/getting-started/#2-create-your-first-list). This section is about the command's only option, **`file`**, which you can leave out.

Attach the `.txt` file that a list's **Download** gives you. It is named after the list, and it can come from another server. TTM then rebuilds the list from the file instead of opening the creation form.

The list comes back with its tasks and their state, owners, tags, reminders and webhooks. Like any new list, it needs a free place on your plan (see [How the three places work](/docs/premium/#how-the-three-places-work)).

TTM refuses a file straight away if it isn't a `.txt` or is bigger than **64 KB**. Otherwise TTM reads the file. If something doesn't fit, TTM creates nothing and lists every problem in one message, each with its line or its task:

- **The format** — the file isn't UTF-8 text, or it doesn't start with `#!ttm/1`. The title is missing or longer than 90 characters.

  A line isn't a task, or a reminder is written in months (`M`) or written badly. A webhook is linked to a task with no text, the list starts with a subtask, or there are no tasks.
- **The size** — the list is too long for one message, or it has more tasks than a list can hold or your plan allows.
- **The reminders** — a reminder has no owner, has no date and a distance of zero, or repeats more times than your plan allows. A recurring reminder is refused where new ones can't be created (see [Reminders](/docs/reminders/#repeating-reminders)). Too many reminders would be waiting at the same time.
- **This server** — a role, a channel or a webhook in the file doesn't exist here, or a user in the file isn't a member.

Reminders whose alerts are all in the past are not a problem: they come back on their tasks, and send nothing more.

→ See [Reuse a list anywhere](/docs/tips/#reuse-a-list-anywhere).

## `/help`

This command is your starting point inside Discord. It opens a panel with five buttons:

- **Home** <img class="inline-ic" src="/icons/home.png" alt="" /> — an overview of the app.
- **Get started** <img class="inline-ic" src="/icons/start.png" alt="" /> — a quick start, with a link to this documentation.
- **Configuration** <img class="inline-ic" src="/icons/config.png" alt="" /> — what `/config app`, `/config lists` and `/config webhook` are for.
- **Premium** <img class="inline-ic" src="/icons/premium.png" alt="" /> — what the paid plan will look like once the beta ends, free limits included.
- **About us** <img class="inline-ic" src="/icons/aboutus.png" alt="" /> — who builds TTM.

## `/invite`

Shows a card to add Team Tasks Manager to another server: the same presentation as its App Directory page (what it does, how to start), the **Add to Discord** button, the guide and the support server.

**Add to Discord** opens Discord's authorization page for the bot, with the same permissions as https://tasks.bitsplitters.app/invite.

The card is visible to everyone in the channel, so you can run it where the people who will set up the other server can see it. It reads nothing from the server and needs no permission.

## `/news`

The latest news about Team Tasks Manager, in your language: what's new in the bot and how to use it. The news opens in a message only you can see, with its date under the title.

Under the text, **Discord server** opens our support server and **Release notes** opens that release on the [Release notes](/docs/release-notes/) page. When there's older or newer news, the **Previous** and **Next** buttons take you to it.

Going back, you find every release since the first one, 1.0.0, each with the day it came out. It works in servers only, and needs no permission.

When there's news nobody in your server has read yet, the last line of the bot's panels says so, in place of the usual footer: in `/help`, the Guide, **More**, `/config app` and the explanation that `/create-list` shows.

As soon as someone in the server opens `/news`, the line goes away for everyone. A server that adds TTM after a piece of news doesn't get the line: the news is in `/news`.

## Command names in your language

Discord shows each command in the language of your Discord app, and in English for a language TTM isn't translated into. `/config app`, `/config lists`, `/config webhook` (with its `webhook` option), `/my timezone`, `/beta`, `/help`, `/invite` and `/news` keep the same name everywhere.

| Language | `/create-list` | its `file` option | `/config webhook` options |
| :--- | :--- | :--- | :--- |
| English, and any other language | `/create-list` | `file` | `action` · `trigger` |
| Italiano | `/crea-lista` | `file` | `azione` · `evento` |
| Español | `/crear-lista` | `archivo` | `acción` · `evento` |
| Português (Brasil) | `/criar-lista` | `arquivo` | `ação` · `evento` |
| Français | `/creer-liste` | `fichier` | `action` · `événement` |
| Deutsch | `/liste-erstellen` | `datei` | `aktion` · `ereignis` |

The choices inside the options — view, create, modify, delete; completion, reopen — appear in your language too.
