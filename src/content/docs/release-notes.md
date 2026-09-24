---
title: Release notes
description: What's new in Team Tasks Manager, newest first.
group: Reference
order: 10
---

Everything that changes in TTM lands here, newest first. Follow along to see the bot evolve.

## 1.0.0 — First public release

The debut of Team Tasks Manager under the **bitsplitters** banner. Highlights:

### Lists

- **Shared task lists** created from plain text, with tasks, subtasks and task groups, and titles up to 256 characters.
- **The button panel** — a list row (**Clone**, **Bulk update**, **Clean**, **Reopen all** and <img class="inline-ic" src="/icons/other.png" alt="" /> **More**) and a task row (content, owner, tag, reminder, webhook) with three-state controls. More opens a panel only you can see, with **Seal list**, **Delete list**, **Download** and **Guide**.
- **Clean** removes the completed tasks after a confirmation that tells you how many they are, and that their reminders and tags go with them.
- **Reopen all** brings every completed task back to to-do on the same message, keeping text, owners, tags and reminders. With **New date** the reminders move too: the first reminder in the calendar lands on the date you pick, the others follow at the same distance from it. No webhook is called.
- **Seal list** keeps a list you are done with in the channel as a record — same contents, no buttons or menus, marked *Sealed list* — while its data leaves TTM, its reminders stop and it frees one of the places of your plan. The activity timeline stays. **Delete list** removes the list for good, reminders included. Both require *Manage messages* on the channel: the same permission that would let you delete the list's message by hand.
- **Several people as owner** (Premium) — pick several people in the owner menu: TTM creates a role for them (TTM1, TTM2…), gives it to them and makes it the owner. It never changes the role afterwards, and deletes it when no list uses it any more and it's still as TTM left it. The owner menu also accepts roles, and works like the Tag menu. See [The roles TTM creates](/docs/the-task-list/#the-roles-ttm-creates).
- **Only the owner checks a task** — a task with an owner can be checked or unchecked by the owner (or the members of the owner role) and by whoever has *Manage messages* on the channel; everyone else gets a private refusal. A task without an owner is open to anyone who can use the list.
- **Every bulk update error at once** — when a bulk update can't be saved, one message lists all the problems: a list too long, too many tasks, and every reminder over the limits (recurring where it isn't allowed, repetitions over your plan, too many reminders waiting).
- **`/config lists`** — the lists of the server, with one button per row that cycles through four states: grey does nothing, blue **regenerates**, green **seals**, red **deletes**. Mark several, press Apply, confirm once; the lists holding a place are marked *in use*. Regeneration republishes a list whose message was deleted by mistake — with the same contents, and **keeping its activity timeline** in the same thread.
- Deleting the message of a list by hand is not a dead end: see [Known limits](/docs/known-limits/) for what happens and how to clean up.

### Download and import

- **Download** — a `.txt` of the list, in a message only you can see: the `#!ttm/1` marker, then the title and the tasks written as in the bulk update form. The file is named after the list.
- **Import a list from a file** — the `file` option of `/create-list` reads that file back (up to 64 KB), and the list returns with its states, owners, tags, reminders and webhooks — even on another server. If something doesn't fit — the format, roles, channels, members or webhooks missing from this server, the limits of your plan — you get every problem in one message, each with its line or task.

### Reminders

- **Reminders** with a start date and a time zone — daylight-saving aware — sent to the task's owner within about ten seconds of their time, so in the right minute: by DM to a person, as a mention in the list's channel to a role. If a person doesn't accept direct messages, TTM waits six hours before trying again, instead of failing at every repetition.
- **Recurring reminders** — interval and repetitions — are a Premium feature, switched on per server in `/config app`.
- **Discarded reminders are explained** — a reminder that could never fire (it has no owner, or all its alerts are already in the past) is removed from the task text, the list is saved, and a message only you can see tells you which tasks and why. Remember: a mention without the colon is a tag, not an owner.

### Plans, configuration and webhooks

- **The Free plan** — three lists in use at a time, twenty tasks each, ten reminders waiting, single reminders. Checking tasks, bulk update, editing or deleting a task, Clean, Reopen all, owners, tags, reminders and webhooks all count as working on a list, and a new list — created, cloned, imported or regenerated — takes a place too. On a fourth list the bot tells you how to free one: **Seal list**, **Delete list**, or `/config lists`. What Premium lifts is on [What Premium unlocks](/docs/premium/); what a list created during the beta keeps is on [Free during the beta](/docs/beta/).
- **Configuration** for notification mode, history tracking, push notifications, the `/create-list` legend, dimmed completed tasks, selection behavior, recurring reminders, time zone and permission sync.
- **Webhooks** (Premium) fired on task completion/reopen, with built-in and free `{{ }}` tokens and strict `https` security.
- **Localized interface**, with the UI ready for browser translation on this site.

<div class="callout"><div class="callout-t">Coming soon</div>A premium tier, an owner-only task view and a progress dashboard are on the way. This page will track every step.</div>
