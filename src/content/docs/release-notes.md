---
title: Release notes
description: What's new in Team Tasks Manager, newest first.
group: Reference
order: 10
---

Every change to TTM is listed here, newest first. Each entry links to the page that explains it.

## 1.0.0 — First public release

The first release of Team Tasks Manager by **bitsplitters**. What it brings:

### Lists

- **Shared task lists** — you write a list as plain text, with tasks, subtasks and task groups: see [Getting started](/docs/getting-started/#2-create-your-first-list).
- **The button panel** — one row of buttons acts on the whole list, and one row of three-state buttons acts on a single task: see [The task list panel](/docs/the-task-list/).
- **Clean list** removes the completed tasks, after a confirmation that tells you how many they are: see [Clean list](/docs/the-task-list/#clean-list).
- **Reopen all** brings every completed task back to to-do, and can move the reminders to a new date: see [Reopen all](/docs/the-task-list/#reopen-all).
- **Seal list** keeps a finished list in the channel as a record without buttons, and **Delete list** removes it permanently: see [What's inside More](/docs/the-task-list/#whats-inside-more).
- **Owners** — a task's owner can be one person, one role, or several people who share a role that TTM creates (Premium): see [Owners and tags](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).
- **Only the owner ticks a task** — a task with an owner can be ticked by its owner, the members of the owner role and whoever has *Manage messages* on the channel: see [The check selector](/docs/the-task-list/#the-check-selector).
- **Every bulk update error at once** — when a bulk update can't be saved, one message lists all the problems: see [When a bulk update can't be saved](/docs/the-task-list/#when-a-bulk-update-cant-be-saved).
- **`/config lists`** shows every list of the server, and regenerates, seals or deletes several of them at once: see [/config lists](/docs/config-lists/).

### Download and import

- **Download** sends you the list as a `.txt` file, in a message only you can see: see [What's inside More](/docs/the-task-list/#whats-inside-more).
- **Import a list from a file** — the `file` option of `/create-list` rebuilds a list from that file, even on another server: see [`/create-list`](/docs/commands/#create-list).

### Reminders

- **Reminders** reach the task's owner in the right minute, by direct message to a person or as a mention in the list's channel to a role: see [Reminders](/docs/reminders/).
- **Recurring reminders** (Premium) add an interval and repetitions, and a server switches them on in `/config app`: see [Repeating reminders](/docs/reminders/#repeating-reminders).
- **Discarded reminders are explained** — a reminder that could never fire is removed, the list is saved, and TTM tells you which tasks and why: see [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

### Plans, configuration and webhooks

- **The Free plan and Premium** — after the beta, the Free plan has limits and Premium lifts them: see [What Premium unlocks](/docs/premium/). What you build during the beta: see [Free during the beta](/docs/beta/).
- **Configuration** — `/config app` sets notifications, the activity timeline, reminders, time zone and permissions for the server: see [/config app](/docs/configuration/).
- **Webhooks** (Premium) send an HTTP request you define when a task is completed or reopened, with `{{ }}` tokens and public `https` addresses only: see [/config webhook](/docs/webhooks/).
- **Localized interface** — the bot's texts and some command names appear in your language, and this site works with your browser's translation: see [Command names in your language](/docs/commands/#command-names-in-your-language).

<div class="callout"><div class="callout-t">Coming soon</div>An owner-only task view and a progress dashboard are on the way. This page will track every step.</div>
