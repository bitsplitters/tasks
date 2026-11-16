---
title: Release notes
description: What's new in Team Tasks Manager, newest first.
group: Reference
order: 10
---

Every change you can see in Discord is listed here, newest first. Each entry links to the page that explains it.

## 2.0.1 — Activity mode in the Tutorial

- **A lesson on Activity mode** — the Tutorial's practice list has seven lessons: before the last one, tick a task in Activity mode, smoother and free from the limits of text channels. See [Getting started](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — The Activity

- **The Activity** — a list opens in a window inside Discord, on desktop and on mobile. Several people work on it at once, and everyone sees each change as it happens. When the last person leaves, the list goes back to its channel, with a summary of the changes. See [The Activity](/docs/activity/).
- **A new first button** — <img class="inline-ic" src="/icons/activity.png" alt="" /> takes the list into the Activity, in text channels and in the chat of voice channels. It needs Discord's *Use Activities* permission on the channel. A list already in your channels gets it the next time it changes. See [Open a list in the Activity](/docs/activity/#open-a-list-in-the-activity).
- **Clone list is in More** — above **Download**, and there even while the list is locked. The Guide says so too. See [What's inside More](/docs/the-task-list/#whats-inside-more).
- **While a list is in the Activity** — its message in the channel has only **Join the Activity**, and the list can't be changed there. See [Join the others](/docs/activity/#join-the-others).
- **Launch** — Discord's **App Launcher**, or the Activities button of a voice call, opens the lists of the channel. Join one, bring another into the Activity, or create a new one. See [The lists of the channel](/docs/activity/#the-lists-of-the-channel).
- **`/config lists`** — a list in the Activity is marked *in the Activity*. **Delete** removes it for everyone, and **Seal** first brings it back to the channel. See [What stays in the channel](/docs/activity/#what-stays-in-the-channel).
- **The Founder offer** — for a limited time before the beta ends, every server can unlock the Founder badge; the first 5,000 Founders to buy get the annual plan at €20 instead of €36. See [Founder](/premium/#founder).
- **Role reminders by DM** — when the bot can't write in the list's channel, the notice that comes with the reminder is in the language of whoever chose the role's people.

## 1.5.0 — Recurrence from menus

- **Choose the recurrence from menus** — **Edit recurrence** opens a form with three menus instead of two fields to type: **How many times, in total**, **Every** and **Unit** (minutes, hours or days). There is no interval to write and no format to get wrong, and for four pings you choose 4. See [The repetition fields](/docs/reminders/#the-repetition-fields).
- **The badge counts every ping** — on the task line, `↻1d ×4` now means four pings, one a day, the first included. Before, `×` counted the repetitions after the first one. A list written before this version shows the old number until someone changes it. See [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).
- **Up to 50 times in total** — on Premium a reminder arrives at most 50 times, the first included, and a reminder that already had more keeps them. In **Bulk update** the triplet still counts the repetitions after the first: at most 49. See [Known limits](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial, lists in voice channels

- **A tutorial for your first list** — the explanation shown by `/create-list` has a **Tutorial** button next to **Create your list**. It turns the explanation into a practice list of six lessons, in your language, and sends you the Guide, the same one in **More** → **Guide**, in a message only you can see. The practice list is a normal list: delete it from **More** when you're done. The button comes with Tips on, and the welcome card and `/help` point to it. See [Getting started](/docs/getting-started/#2-create-your-first-list).
- **Button emoji have short names** — in **Bulk update**, in the form of a task's text and in the Download file, the emoji of a list button, like the ones in the Tutorial's lessons, show as `:owner:`, `:reminder:`, `:content:` and `:more:` instead of a long code. Write one of these names in a task and the list shows the emoji. See [Button emoji](/docs/writing-a-list/#button-emoji).
- **Lists in voice channels** — `/create-list` works in the chat of a voice channel, and **Clone list** offers voice channels too. A list there does everything it does in a text channel except the activity timeline, because Discord doesn't allow threads in voice channels: whoever creates one gets a short message that explains it. In a voice channel TTM needs *Connect* instead of the two timeline permissions. See [Voice channels](/docs/known-limits/#voice-channels).

## 1.3.0 — Space around groups

- **Space around groups** — a new option of `/config app`: switch it off and your lists lose the blank lines above and below the tasks that have subtasks, for a more compact list. On by default: see [Space around groups](/docs/configuration/#space-around-groups).
- **List appearance is one dropdown** — **Tips**, **Completed tasks dimmed** and **Space around groups** are now options of the same dropdown in `/config app`: tick the ones you want on. See [List appearance](/docs/configuration/#list-appearance).
- **The Guide says how to tick a task** — its first page and the page of the task buttons now say it in bold: to tick or untick a task, every button in the second row must be off. See [The check selector](/docs/the-task-list/#the-check-selector).
- **A locked list says who is editing it** — while someone edits the list, its last line says who, and how to unlock it if it stays locked: **More → Unlock list**. It takes the place of the Tips line and shows even with Tips hidden. See [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Tick a task

- **The task menu says *Tick a task*** — with every task button grey, the menu above the buttons says what it is for, instead of showing the list title. See [The second row](/docs/channel-tasks/#the-second-row).
- **The forms that lock the list say how to unlock it** — **Bulk update** and the form of a task's text end with a line: closing them with **Cancel** or the ✕ leaves the list locked, and **More → Unlock list** unlocks it. See [I pressed Cancel and the list stays locked](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Tips, progress bar, list completed

- **The task menu tells you what comes next** — while a task button is blue or red, the menu above the buttons shows the action, such as *Edit task* or *Delete task*: pick the task there. With every button grey it shows the list title again. See [The second row](/docs/channel-tasks/#the-second-row).
- **Tips under every list** — a small last line points to **Guide**, in **More**, and to this site. The legend setting of `/config app` is now called **Tips**, and switches off both the line and the explanation shown by `/create-list`: see [Tips](/docs/configuration/#tips).
- **A progress bar** — a thin green bar at the bottom of every list, in steps of 5%. It is full only when every box is ticked, and a sealed list keeps it: see [Under the list](/docs/the-task-list/#under-the-list).
- **List completed** — the tick that completes a list says so in its notification and in the history thread: see [Notification mode](/docs/configuration/#notification-mode).
- **The Guide** says what to do after pressing a task button: pick the task from the menu.
- **More** starts with **Guide** and **Download**, then **Seal list** and **Delete list**. On a locked list, **Unlock list** stays at the top: see [What's inside More](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Invite card, welcome message, tips in the status

- **`/invite`** — a public card with the logo, what the bot does and how to start (the same presentation as its App Directory page) and three buttons: add it to another server (Discord's authorization page, straight from the bot), the guide, the support server. Same name in every language: see [Commands](/docs/commands/).
- **A welcome card on the first join** — once in a server's life, in its system channel: what the bot does, three steps to start with `/create-list` and `/config app`, which permissions it asks for and why: see [Core concepts](/docs/core-concepts/#the-permissions-ttm-asks-for). Never a DM. Nothing is sent when the server has no system channel, hides join notifications there, or the bot cannot write in it.
- **`/help` says who sees the configuration commands** — the Configuration page now says that Discord shows the three `/config` subcommands only to whoever has *Manage Server*, and where an admin can change that.
- **`/config app` tells you when the time zone is still the default** — a line under the current zone, until you pick your team's.
- **Tips in the bot's status** — the line under the bot's name changes every ten minutes.
- **The Other panel** closes with the footer, like every other page.

## 1.0.1 — Translations reviewed

- **Spanish, Portuguese, French and German, reviewed in full** — one word for each feature, one tone throughout, and permission names as Discord shows them. Latin American Spanish now says *tú*, not *vos*.
- **`/config webhook` options with accents** in the languages that use them, such as *acción*, *événement* or *löschen*: see [/config webhook](/docs/webhooks/).

## 1.0.0 — First public release

The first release of Team Tasks Manager by **bitsplitters**. What it brings:

### Lists

- **Shared task lists** — you write a list as plain text, with tasks, subtasks and task groups: see [Getting started](/docs/getting-started/#2-create-your-first-list).
- **The button panel** — one row acts on the whole list, one row of three-state buttons on a single task. See [The list in the channel](/docs/the-task-list/).
- **Clean list** removes the completed tasks, after a confirmation that tells you how many they are and what goes with them: see [Clean list](/docs/the-task-list/#clean-list).
- **Reopen all** brings every completed task back to to-do, and can move the reminders to a new date: see [Reopen all](/docs/the-task-list/#reopen-all).
- **Seal list** keeps a finished list in the channel as a record without buttons, and **Delete list** removes it permanently: see [What's inside More](/docs/the-task-list/#whats-inside-more).
- **Unlock list** — a list left locked, because someone closed a form with the ✕, is unlocked from **More**: see [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).
- **Owners** — a task's owner can be one person, one role, or several people who share a role that TTM creates (Premium): see [Owners and tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Only the owner ticks a task** — or a member of the owner role, or whoever has *Manage messages* on the channel. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **Every bulk update error at once** — when a bulk update can't be saved, one message lists all the problems. See [When the text can't be saved](/docs/writing-a-list/#when-the-text-cant-be-saved).
- **`/config lists`** shows every list of the server, and regenerates, seals or deletes several of them at once: see [/config lists](/docs/config-lists/).

### Download and import

- **Download** sends you the list as a `.txt` file, in a message only you can see: see [What's inside More](/docs/the-task-list/#whats-inside-more).
- **Import a list from a file** — the `file` option of `/create-list` rebuilds a list from that file, even on another server: see [`/create-list`](/docs/commands/#create-list).

### Reminders

- **Reminders** reach the task's owner in the right minute. A person gets a direct message, a role a mention in the list's channel: see [Reminders](/docs/reminders/).
- **Recurring reminders** (Premium) add an interval and repetitions, and a server switches them on in `/config app`: see [Repeating reminders](/docs/reminders/#repeating-reminders).
- **Save only what changed** — on the summary card of an existing reminder, **Save** turns on once you change something. A reminder saved unchanged sends no notification: see [Editing or removing](/docs/channel-tasks/#editing-or-removing).
- **Reminders stay until you remove them** — TTM never removes a reminder by itself. One whose alerts are past stays on its task. One without an owner or a date, or that can't be read, stops the save, and the message names the task to fix: see [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task). Removing the owner of a task whose reminder hasn't fired yet asks you to confirm, because the reminder goes too.

### Plans, configuration and webhooks

- **The Free plan and Premium** — after the beta, the Free plan has limits and Premium lifts them: see [What Premium unlocks](/docs/premium/). What you build during the beta: see [How the beta works](/docs/beta/).
- **Configuration** — `/config app` sets notifications, the activity timeline, reminders, time zone and permissions for the server: see [/config app](/docs/configuration/).
- **Webhooks** (Premium) send an HTTP request you define when a task is completed or reopened. They take `{{ }}` tokens, and only public `https` addresses: see [/config webhook](/docs/webhooks/).
- **Told where it matters** — when TTM can't post in a list's channel, it tells the person who acted, privately. A failed webhook gets a warning too: see [The bot says a permission is missing](/docs/troubleshooting/#the-bot-says-a-permission-is-missing) and [When a webhook fails](/docs/webhooks/#when-a-webhook-fails).
- **Localized interface** — the bot's texts and some command names appear in your language: see [Command names in your language](/docs/commands/#command-names-in-your-language). This site works with your browser's translation.

<div class="callout"><div class="callout-t">Coming soon</div>An owner-only task view and a progress dashboard are on the way. This page will track every step.</div>
