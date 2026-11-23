---
title: Release notes
description: What's new in Team Tasks Manager, newest first.
group: Reference
order: 10
# Ogni release diventa un riquadro che si apre: README, «Release notes».
releases: true
---

Every change you can see in Discord is listed here, newest first. Each entry links to the page that explains it.

## 2.6.0 — Your time zone, everywhere

Released 2026-11-24

- **Choose your time zone once** — **/my timezone**, in any server, shows your time zone and where it comes from. **Choose** sets yours, and TTM proposes it in every server, in the channel and in the Activity. **Back to automatic** goes back to the proposed one. See [/my timezone](/docs/my-timezone/).
- **A different zone is for that date only** — with a zone of your own, the one you leave in a reminder no longer replaces it. Under the time zone of **When**, a line tells you whether it's yours or how to choose it. See [/my timezone](/docs/my-timezone/).
- **In the Activity too** — the gear has your time zone under **For you, everywhere**, the same as `/my timezone`. Under the time zone of a reminder, the line links to it. See [Your settings](/docs/activity/#your-settings).

## 2.5.0 — Names instead of codes

Released 2026-11-23

- **People, roles and channels by name** — **Bulk update** shows `@Ava`, `@Moderators` and `#general` instead of Discord's codes, and the **Content** form shows channels by name. Write `@` and a name for every role and channel, and for anyone already in the list. Add someone new with **Owner** or **Tag**, or write their code. A name TTM doesn't know stays text, except as an owner: then TTM tells you, and saves nothing. See [People, roles and channels by name](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **Content is only the text** — the **Content** form no longer shows the task's tags, as in the Activity: they stay on the task, and **Tag** changes them. A tag typed in the form is removed, and TTM tells you. See [Content](/docs/channel-tasks/#content).
- **Reminder dates you can read** — in the text of a list, the date of a reminder is `2026-12-08 18:00`, in your time zone, instead of a code. Change it and save, and the reminder moves. To keep a time someone gave you in their zone, write the zone after it: `2026-12-08 18:00 America/New_York`. See [Reminders in the text](/docs/writing-a-list/#reminders-in-the-text).
- **The guide one click away** — under the text of **Bulk update** and `/create-list`, a line says how to add someone new and links to the guide. When a name or a date can't be saved, the message links to the part of the guide that explains it. See [People, roles and channels by name](/docs/writing-a-list/#people-roles-and-channels-by-name).
- **In the Activity too** — **Edit the list** shows the names and the dates in your time zone. Under the text, **Edit the list** and **New list** have the same line, with the link to the guide. Links open now, in the text of a task and in messages: Discord asks before taking you out of it. See [Edit the list](/docs/activity-list/#edit-the-list).
- **Codes still work** — a code you write or paste is saved as it is, and the Download file keeps the codes, so files from before import as they are. See [The codes behind the names](/docs/writing-a-list/#the-codes-behind-the-names).

## 2.4.1 — Webhooks and dates, fixed

Released 2026-11-21

- **Webhooks with quotes in the text** — a task, a variable or a name with quotes, a backslash or a line break no longer breaks the body of the call: TTM escapes the value, so the service gets valid JSON. See [Tokens](/docs/webhooks/#tokens).
- **Every `@time` format sets the reminder** — dates in Discord's `s` and `S` styles, the short date with the time, now count as the date of the reminder. `S` is the first format in the `@time` menu: until now TTM didn't see it, so the reminder was counted from when you saved, and the date stayed in the text. See [Reminders in the text](/docs/writing-a-list/#reminders-in-the-text).

## 2.4.0 — The second row shows you the way

Released 2026-11-20

- **Red shows only what you can remove** — with **Owner**, **Tag**, **Reminder** or **Webhook** red, the task selector lists only the tasks that have an owner, tags, a reminder or a webhook to remove. If none has, the selector is off and says so, for example *No owner to remove*, and you get a note on what to do instead. See [The second row](/docs/channel-tasks/#the-second-row).
- **The Activity says it too** — in red mode, the panel of a task with nothing to remove says so at the top, and **Delete** stays off. See [The panel of a task](/docs/activity-list/#the-panel-of-a-task).
- **Content and Reminder tell you what's next** — press **Content** or **Reminder** and a message only you can see says which task to pick in the selector above the buttons, with a button that takes you back to the list. It stops once you've picked a task that way, on any server. See [The second row](/docs/channel-tasks/#the-second-row).

## 2.3.0 — New lists announce themselves

Released 2026-11-19

- **A new list announces itself** — creating, importing or cloning a list posts a notification under it, with a link to the list. It mentions the owners of the tasks, so Discord notifies them. With history tracking on, the thread starts with the list. See [When a list is created](/docs/configuration/#when-a-list-is-created).
- **One explanation per list** — with tips on, the first notification of a new list explains why TTM posts notifications and where to set them up, once. See [Tips](/docs/configuration/#tips).
- **`/config app` in a new order** — **Tips** come first, with a green or grey button. **Behavior** gathers readable push notifications, keeping the state after a selection and the new **Mention owners in new lists**, on by default. Recurring reminders show the Premium emoji. See [/config app](/docs/configuration/).
- **Every task that changes fires its webhook** — tick the last subtask and the group is completed too: now both fire their webhooks. Tick a group and its subtasks fire theirs. The calls go out in the order of the list, and the whole tick counts as one click. See [When a webhook fires](/docs/webhooks/#when-a-webhook-fires).
- **Reopen all fires the reopening webhooks** — of the tasks it reopens, in the channel and in the Activity. See [When a webhook fires](/docs/webhooks/#when-a-webhook-fires).
- **One warning per webhook** — when the same webhook is on several tasks that change together and the call fails, you get one warning. See [When a webhook fails](/docs/webhooks/#when-a-webhook-fails).
- **Reminders start in your time zone** — until you choose a time zone, the **When** form proposes the one of your Discord language: `America/Sao_Paulo` in Brazilian Portuguese, `Europe/Rome` in Italian. Reminders you write in the text of a list use it too, in the channel and in the Activity. A language spoken across several zones, such as English (US), keeps the server's zone. See [Your time zone](/docs/reminders/#your-time-zone).
- **Invite from the Activity** — **Invite**, at the top right of the home and of every list, opens Discord's window to invite friends or send the invite to a channel. See [Join the others](/docs/activity/#join-the-others).
- **Your Discord status shows the Activity** — while you're in it, your profile says *Planning tasks with the team*, in your language, and nothing about the list. Discord asks you first: if you say no, the Activity opens all the same. See [Your status on Discord](/docs/activity/#your-status-on-discord).

## 2.2.0 — Take a task

Released 2026-11-18

- **Take a task yourself** — click **Owner** until it turns blue, then pick a task without choosing anyone: it's yours, and the channel shows who took it. A task that already has an owner stays as it is: to replace them, choose yourself in the menu first. With **Keep status after selection**, take one task after another without clicking **Owner** again. See [Owner](/docs/channel-tasks/#owner).
- **Take a task in the Activity** — on a task with no owner, **Owner** opens with your name already chosen: **Save** makes it yours. See [Owner](/docs/activity-list/#owner).
- **Whoever gets a task hears about it** — give a task to someone else, or to a role, and the notification in the channel mentions them, so Discord notifies them. When you take a task yourself, nobody is mentioned. See [Owner](/docs/channel-tasks/#owner).

## 2.1.0 — News in the bot

Released 2026-11-17

- **`/news`** — the latest news about Team Tasks Manager, in your language, in a message only you can see. Under each piece of news, **Discord server** opens our support server and **Release notes** opens that release on this page. The **Previous** and **Next** buttons go to older and newer news. See [`/news`](/docs/commands/#news).
- **Every release in `/news`** — from 1.0.0 onwards, each with the day it came out: go back with **Previous**. See [`/news`](/docs/commands/#news).
- **A line for news nobody has read** — when there's news nobody in your server has opened yet, the last line of the bot's panels says so until someone opens `/news`: then it goes away for everyone in the server. See [`/news`](/docs/commands/#news).

## 2.0.1 — Activity mode in the Tutorial

Released 2026-11-16

- **A lesson on Activity mode** — the Tutorial's practice list has seven lessons: before the last one, tick a task in Activity mode, smoother and free from the limits of text channels. See [Getting started](/docs/getting-started/#2-create-your-first-list).

## 2.0.0 — The Activity

Released 2026-11-15

- **The Activity** — a list opens in a window inside Discord, on desktop and on mobile. Several people work on it at once, and everyone sees each change as it happens. When the last person leaves, the list goes back to its channel, with a summary of the changes. See [The Activity](/docs/activity/).
- **A new first button** — **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> takes the list into the Activity, in text channels and in the chat of voice channels. It needs Discord's *Use Activities* permission on the channel. A list already in your channels gets it the next time it changes. See [Open a list in the Activity](/docs/activity/#open-a-list-in-the-activity).
- **Clone list is in More** — above **Download**, and there even while the list is locked. The Guide says so too. See [What's inside More](/docs/the-task-list/#whats-inside-more).
- **While a list is in the Activity** — its message in the channel has only **Join the Activity**, and the list can't be changed there. See [Join the others](/docs/activity/#join-the-others).
- **Launch** — Discord's **App Launcher**, or the Activities button of a voice call, opens the lists of the channel. Join one, bring another into the Activity, or create a new one. See [The home of the channel](/docs/activity/#the-home-of-the-channel).
- **`/config lists`** — a list in the Activity is marked *in the Activity*. **Delete** removes it for everyone, and **Seal** first brings it back to the channel. See [What stays in the channel](/docs/activity/#what-stays-in-the-channel).
- **The Founder offer** — for a limited time before the beta ends, every server can unlock the Founder badge; the first 5,000 Founders to buy get the annual plan at €20 instead of €36, before VAT. See [Founder](/premium/#founder).
- **Role reminders by DM** — when the bot can't write in the list's channel, the notice that comes with the reminder is in the language of whoever chose the role's people.

## 1.5.0 — Recurrence from menus

Released 2026-11-07

- **Choose the recurrence from menus** — **Edit recurrence** opens a form with three menus instead of two fields to type: **How many times, in total**, **Every** and **Unit** (minutes, hours or days). There is no interval to write and no format to get wrong, and for four pings you choose 4. See [The repetition fields](/docs/reminders/#the-repetition-fields).
- **The badge counts every ping** — on the task line, `↻1d ×4` now means four pings, one a day, the first included. Before, `×` counted the repetitions after the first one. A list written before this version shows the old number until someone changes it. See [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).
- **Up to 50 times in total** — on Premium a reminder arrives at most 50 times, the first included, and a reminder that already had more keeps them. In **Bulk update** the triplet still counts the repetitions after the first: at most 49. See [Known limits](/docs/known-limits/#reminders).

## 1.4.0 — Tutorial, lists in voice channels

Released 2026-11-05

- **A tutorial for your first list** — the explanation shown by `/create-list` has a **Tutorial** button next to **Create your list**. It turns the explanation into a practice list of six lessons, in your language, and sends you the Guide, the same one in **More** → **Guide**, in a message only you can see. The practice list is a normal list: delete it from **More** when you're done. The button comes with Tips on, and the welcome card and `/help` point to it. See [Getting started](/docs/getting-started/#2-create-your-first-list).
- **Button emoji have short names** — in **Bulk update**, in the form of a task's text and in the Download file, the emoji of a list button, like the ones in the Tutorial's lessons, show as `:owner:`, `:reminder:`, `:content:` and `:more:` instead of a long code. Write one of these names in a task and the list shows the emoji. See [Button emoji](/docs/writing-a-list/#button-emoji).
- **Lists in voice channels** — `/create-list` works in the chat of a voice channel, and **Clone list** offers voice channels too. A list there does everything it does in a text channel except the activity timeline, because Discord doesn't allow threads in voice channels: whoever creates one gets a short message that explains it. In a voice channel TTM needs *Connect* instead of the two timeline permissions. See [Voice channels](/docs/known-limits/#voice-channels).

## 1.3.0 — Space around groups

Released 2026-11-03

- **Space around groups** — a new option of `/config app`: switch it off and your lists lose the blank lines above and below the tasks that have subtasks, for a more compact list. On by default: see [Space around groups](/docs/configuration/#space-around-groups).
- **List appearance is one dropdown** — **Tips**, **Completed tasks dimmed** and **Space around groups** are now options of the same dropdown in `/config app`: tick the ones you want on. See [Tips and list appearance](/docs/configuration/#list-appearance).
- **The Guide says how to tick a task** — its first page and the page of the task buttons now say it in bold: to tick or untick a task, every button in the second row must be off. See [The check selector](/docs/the-task-list/#the-check-selector).
- **A locked list says who is editing it** — while someone edits the list, its last line says who, and how to unlock it if it stays locked: **More → Unlock list**. It takes the place of the Tips line and shows even with Tips hidden. See [When the list is locked](/docs/the-task-list/#when-the-list-is-locked).

## 1.2.1 — Tick a task

Released 2026-11-01

- **The task menu says *Tick a task*** — with every task button grey, the menu above the buttons says what it is for, instead of showing the list title. See [The second row](/docs/channel-tasks/#the-second-row).
- **The forms that lock the list say how to unlock it** — **Bulk update** and the form of a task's text end with a line: closing them with **Cancel** or the ✕ leaves the list locked, and **More → Unlock list** unlocks it. See [I pressed Cancel and the list stays locked](/docs/troubleshooting/#i-pressed-cancel-and-the-list-stays-locked).

## 1.2.0 — Tips, progress bar, list completed

Released 2026-11-01

- **The task menu tells you what comes next** — while a task button is blue or red, the menu above the buttons shows the action, such as *Edit task* or *Delete task*: pick the task there. With every button grey it shows the list title again. See [The second row](/docs/channel-tasks/#the-second-row).
- **Tips under every list** — a small last line points to **Guide**, in **More**, and to this site. The legend setting of `/config app` is now called **Tips**, and switches off both the line and the explanation shown by `/create-list`: see [Tips](/docs/configuration/#tips).
- **A progress bar** — a thin green bar at the bottom of every list, in steps of 5%. It is full only when every box is ticked, and a sealed list keeps it: see [Under the list](/docs/the-task-list/#under-the-list).
- **List completed** — the tick that completes a list says so in its notification and in the history thread: see [Notification mode](/docs/configuration/#notification-mode).
- **The Guide** says what to do after pressing a task button: pick the task from the menu.
- **More** starts with **Guide** and **Download**, then **Seal list** and **Delete list**. On a locked list, **Unlock list** stays at the top: see [What's inside More](/docs/the-task-list/#whats-inside-more).

## 1.1.0 — Invite card, welcome message, tips in the status

Released 2026-10-26

- **`/invite`** — a public card with the logo, what the bot does and how to start (the same presentation as its App Directory page) and three buttons: add it to another server (Discord's authorization page, straight from the bot), the guide, the support server. Same name in every language: see [Commands](/docs/commands/).
- **A welcome card on the first join** — once in a server's life, in its system channel: what the bot does, three steps to start with `/create-list` and `/config app`, which permissions it asks for and why: see [Core concepts](/docs/core-concepts/#the-permissions-ttm-asks-for). Never a DM. Nothing is sent when the server has no system channel, hides join notifications there, or the bot cannot write in it.
- **`/help` says who sees the configuration commands** — the Configuration page now says that Discord shows the three `/config` subcommands only to whoever has *Manage Server*, and where an admin can change that.
- **`/config app` tells you when the time zone is still the default** — a line under the current zone, until you pick your team's.
- **Tips in the bot's status** — the line under the bot's name changes every ten minutes.
- **The Other panel** closes with the footer, like every other page.

## 1.0.1 — Translations reviewed

Released 2026-10-24

- **Spanish, Portuguese, French and German, reviewed in full** — one word for each feature, one tone throughout, and permission names as Discord shows them. Latin American Spanish now says *tú*, not *vos*.
- **`/config webhook` options with accents** in the languages that use them, such as *acción*, *événement* or *löschen*: see [/config webhook](/docs/webhooks/).

## 1.0.0 — First public release

Released 2026-10-23

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

---

<div class="callout"><div class="callout-t">Coming soon</div>An owner-only task view and a progress dashboard are on the way. This page will track every step.</div>
