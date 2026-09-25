---
title: The task list panel
description: Every button under your list, what it does, and how the three-state task buttons work.
group: Using the bot
order: 3
---

Once a list exists, TTM shows a **check selector** and **two rows of buttons** beneath it. This panel is the heart of the app. Almost nothing here needs a command — you just click.

## The check selector

Above the buttons sits the **check / uncheck** selector. Use it to:

1. **Mark tasks done or open** — the checkbox flips between <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> and <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Pick the task an active button will act on** (more on that below).

Selecting a group toggles its subtasks in cascade; completing all subtasks marks the group automatically.

**A task with an owner is checked by its owner.** Only the owner — or the members of the owner role — and whoever has *Manage messages* on the channel can check or uncheck it. Anyone else gets a refusal only they can see, and the list stays as it was. The cascade counts too: a group can't be checked or unchecked if that would change a subtask that belongs to someone else. A task without an owner can be checked by anyone who can use the list.

<div class="callout"><div class="callout-t">Keep the task buttons grey</div>To check or uncheck tasks, <strong>every button in the second row must be grey</strong> (off). If any task button is active (blue or red), clicking a task applies that action instead of toggling it.</div>

## Row 1 — acts on the whole list

These buttons never touch a single task; they operate on the **entire list**.

| Button | Function | What it does |
| :---: | :--- | :--- |
| <span class="dchip is-blue" role="img" aria-label="Clone list button, blue"><img src="/icons/clone.png" alt="" /></span> | **Clone list** | Clone the list into another channel. Opens a channel picker and a small set of options (see below). |
| <span class="dchip is-blue" role="img" aria-label="Bulk update button, blue"><img src="/icons/edit.png" alt="" /></span> | **Bulk update** | Edit the title and the full list in one form — the fastest way to change two or more tasks at once. While you edit, the list is temporarily locked. |
| <span class="dchip is-blue" role="img" aria-label="Clean list button, blue"><img src="/icons/clean.png" alt="" /></span> | **Clean list** | Remove every completed task, after a confirmation, and recalculate the remaining positions. |
| <span class="dchip is-blue" role="img" aria-label="Reopen all button, blue"><img src="/icons/reopen.png" alt="" /></span> | **Reopen all** | Bring every completed task back to to-do and, if you want, move the reminders to a new date. |
| <span class="dchip is-blue" role="img" aria-label="More button, blue"><img src="/icons/other.png" alt="" /></span> | **More** | Open the panel with the actions you need less often: sealing, deleting and downloading the list, and the in-Discord guide. |

### Clean list

**Clean list** removes every completed task, subtasks included, and renumbers the ones that stay. A group that isn't completed stays, even when some of its subtasks go.

It asks first: a confirmation window tells you how many completed tasks are about to leave, and that they go **for good**, together with their reminders and tags. Their text still shows in the timeline, if it's on, and in the notification until it is replaced. Submit to confirm, close the window to cancel.

- **No task completed** — nothing to remove, and the bot tells you right away.
- **Every task completed** — Clean refuses, because a list can't be left empty: uncheck at least one task, or remove the whole list with **Delete list** (see below).

### Reopen all

**Reopen all** brings every completed task back to to-do, on the same message: text, owners, tags and reminders stay as they are. If no task is completed, there is nothing to reopen and the bot says so.

Before acting, it asks you in a message only you can see:

- **Reopen** — reopen every task now.
- **New date** — reopen, and move the reminders too. It opens the **When** window: the first reminder in the calendar lands on the date you pick (at least 5 minutes from now), and the others follow at the same distance from it. It's there only when the list has reminders.
- **Cancel** — leave the list as it is.

Reopening calls **no webhook**, and it doesn't look at owners: anyone who can edit the list can reopen it.

### What's inside More

The first row is full — Discord allows five buttons per row — so the actions you need less often live one click away, in a panel only you can see:

- <img class="inline-ic" src="/icons/seal.png" alt="" /> **Seal list** — for a list you are done with but want to keep as a record. The list stays in the channel with the same contents, but without buttons or menus, and marked *Sealed list*. It can no longer be edited, its reminders stop, and it frees one of the places of your plan (see [What Premium unlocks](/docs/premium/)). The activity timeline stays. It cannot be undone, and you are asked to confirm first.
- <img class="inline-ic" src="/icons/delete.png" alt="" /> **Delete list** — deletes the list **for good**: tasks, owners, tags and reminders go with it, the message is removed and a short receipt takes its place in the channel. It cannot be undone, and you are asked to confirm first.
- <img class="inline-ic" src="/icons/download.png" alt="" /> **Download** — a `.txt` file of the list, sent **only to you**. It holds the title and the tasks written as in the Bulk update form, with owners, reminders, tags and webhooks. Use it as a backup, or bring the list back — even on another server — with the `file` option of `/create-list` (see [Getting started](/docs/getting-started/#import-a-list-from-a-file)).
- <img class="inline-ic" src="/icons/doc.png" alt="" /> **Guide** — the quick in-Discord guide, with a link back to this documentation.

**Sealing and deleting need *Manage messages* on the channel** — the same permission that would let you delete the list's message by hand. If you don't have it, those two entries simply aren't there. Download and Guide are there for everyone.

Sealing posts a notification and a line in the timeline only if your server has them on: with both off, nothing records who sealed the list. **Delete list** always leaves its receipt in the channel.

<div class="callout"><div class="callout-t">Why delete instead of removing the message?</div>Deleting the message hides the list but leaves its data behind — and its reminders keep arriving, pointing at a message that no longer exists. <strong>Delete list</strong> takes the reminders with it. If a message has already been deleted by hand, <code>/config lists</code> lets you clean up (or bring the list back).</div>

### Clone options

When you start **Clone list**, the first row is replaced by the cloning controls:

- **Create list** — start cloning into the channel you picked from the dropdown.
- **Selection option** — clone keeping the current check selections, or not.
- **Reminder option** — clone keeping the reminders, or not.
- **Exit** — restore the normal list panel.

A clone gets **new** reminders, so they follow today's rules: where recurring reminders aren't allowed — on the Free plan, or with them switched off — clone a list that has a recurring reminder without its reminders.

## Row 2 — acts on a single task

Each button in the second row is a **three-state switch**. Click it to cycle through the same colors Discord uses for its buttons:

- <span class="c-grey">Grey</span> — off / inactive.
- <span class="c-blue">Blue</span> — active in <span class="c-blue">edit</span> mode.
- <span class="c-red">Red</span> — active in <span class="c-red">delete</span> mode.

The workflow is always the same: **turn a button blue or red, then pick the task** from the check selector. TTM applies the action to that task.

| Button | Function | <span class="c-blue">Blue (edit)</span> | <span class="c-red">Red (delete)</span> |
| :---: | :--- | :--- | :--- |
| <span class="dchip is-grey" role="img" aria-label="Content button, grey"><img src="/icons/task.png" alt="" /></span> | **Content** | Change the task text (opens a form). | Delete the task. |
| <span class="dchip is-grey" role="img" aria-label="Owner button, grey"><img src="/icons/owner.png" alt="" /></span> | **Owner** | Set or change the task owner: one person, one role, or several people (see *Owner* below). | Remove the owner — and its reminder, which has no one left to reach. |
| <span class="dchip is-grey" role="img" aria-label="Tag button, grey"><img src="/icons/tag.png" alt="" /></span> | **Tag** | Set the users/roles to notify — pick several at once (see *Two ways to tag* below). | Remove every tag on the task. |
| <span class="dchip is-grey" role="img" aria-label="Reminder button, grey"><img src="/icons/alertW.png" alt="" /></span> | **Reminder** | Add or edit a reminder (start date and time zone — plus interval and repetitions when recurring reminders are on: a Premium feature, switched on in [Configuration](/docs/configuration/#recurring-reminders)). | Remove the reminder. |
| <span class="dchip is-grey" role="img" aria-label="Webhook button, grey"><img src="/icons/api.png" alt="" /></span> | **Webhook** | Associate a webhook, so completing/reopening the task fires an HTTP call. | Remove the webhook association from the task. |

<div class="callout"><div class="callout-t">Remember</div>You cannot delete the very last task in a list. To remove a list entirely, use <strong>Delete list</strong> in <strong>More</strong> — or <strong>Seal list</strong>, to keep it in the channel as a record.</div>

### Two ways to tag

How **Tag** behaves depends entirely on one setting — **Behavior on selection** in [Configuration](/docs/configuration/), the toggle that decides whether task buttons *reset* after each action or *keep* their active mode. Tag reads very differently in the two cases, so it's worth knowing both. The short version: with the setting **off**, tagging always **overwrites**; with it **on**, you also unlock a second mode, **live editing**.

#### With "keep status" off — the default

The button resets after every action, and Tag has just one behaviour: it **always overwrites**. Turn Tag blue, choose up to 25 users/roles in the selector — say *Anna* and *@Devs* — then pick the task. The task is now tagged Anna + @Devs and nothing else: this **replaces** the whole set, it doesn't add to it, so anyone previously tagged that you didn't re-pick is removed.

You must pick people **before** the task. Choosing a task with an empty selector isn't a shortcut here — it shows an error asking you to select at least one tag first.

#### With "keep status" on — two modes

Now the button stays active after each action, and what Tag does depends on one question: **did you pick people before picking the task?** People first means **assign**; task first, with the selector still empty, means **live editing**.

**Assign — pick people, then the task.** Exactly the overwrite behaviour above: choose the users/roles, pick the task, and its tags become precisely your selection. Because the button stays active, your picks also stay in the selector — so you can stamp the same set onto the next task, and the next, without re-choosing.

**Live editing — pick the task, selector empty.** Turn Tag blue and, without picking anyone, choose the task you want to re-tag. That's not a mistake: its current tags load into the selector, already ticked, and you are now editing that task directly. Every time you close the menu the task updates instantly — untick someone and they vanish from the task, tick someone and they appear. There is no confirmation step and nothing overwrites: you're adjusting the existing set, not replacing it. Untick everyone to remove all tags. Picking a different task simply moves the editing there; turn Tag off (grey) to finish — the next activation starts fresh.

<div class="callout"><div class="callout-t">In one line</div><strong>Off</strong>: tagging always overwrites, and you must pick people first. <strong>On</strong>: pick people first to <em>overwrite</em> (assign), or pick the task first to <em>edit its tags live</em>.</div>

### Owner: a person, a role, or several people

The owner is who a task belongs to — who can check it, and who gets its reminder. Pick it in the owner menu:

- **One person** — they own the task, and its reminder reaches them by direct message.
- **One role** — everyone with that role owns the task: any of them can check it, and its reminder is a message in the list's channel that mentions the role.
- **Several people** — TTM creates a role for them, gives it to exactly those people and makes it the owner. From then on it works like any role owner. *Several people as owner is a Premium feature: on the Free plan the owner is one person or one role* (see [What Premium unlocks](/docs/premium/)).

People and roles can't be mixed, and you can pick one role at most: a task has one owner.

The owner menu works like the Tag menu (see *Two ways to tag* above). With "keep status" off, pick the owner, then the task. With it on, you can also **pick the task first**, with the menu empty: its owner loads into the menu — for a role TTM created, the people it gave the role to — and every change you confirm applies to that task straight away. Emptying the menu removes the owner — and its reminder — like the red mode does.

### The roles TTM creates

When you give a task to several people, TTM:

- creates a role called **TTM** followed by the first free number — TTM1, TTM2, and so on — **mentionable** and **with no permissions**, at the bottom of the role list;
- gives it to the people you picked, one at a time: with many people it can take a few seconds;
- makes it the owner of the task.

Rename it and it becomes one of your server's roles, to use anywhere. A new colour or a new position doesn't change that: TTM would still delete it when no list uses it any more — so to keep a role, rename it.

**TTM never changes a role once it has created it.** Picking different people — one more, one less — creates a new role; picking exactly the same people as the current owner changes nothing. With "keep status" on, the same selection applied to several tasks in a row reuses the role it created for the first one.

**When a role stops being TTM's.** TTM remembers the roles it creates and the people it gave them to. A role stays TTM's only while it still looks the way TTM left it: the same name, no permissions — neither on the server nor on a channel — and the same number of members. Rename it, give it a permission, use it to open a channel, or add or remove a member, and it becomes one of your server's roles. TTM looks when a role would be deleted, and when the owner menu loads its people: a role that's no longer TTM's is never deleted, and the menu shows the role instead of the people. TTM can see *how many* members a role has, but not *who* they are — so if you swap one member for another, it can't tell.

**When TTM deletes a role.** A role TTM created is deleted — from the server, too — when **no list uses it any more**, as owner or as tag, nor any command permission, **and** it still looks TTM's. TTM checks every ten minutes, and never touches a role created less than ten minutes ago. The roles used by a **sealed** list are kept, because the sealed message still shows them, and when the bot is **removed** from a server, every role it created stays there.

**What it needs.** The bot needs the *Manage Roles* permission, which the invite link includes; on a server that added the bot before, an admin may have to grant it to the bot's role, in *Server Settings → Roles* — not on a channel, where the same permission means something else. While the bot doesn't have it, TTM neither creates nor deletes roles. A server can have at most **250 roles** — a Discord limit: when it's reached, TTM can't create the role and says so.

## Confirming a tag selection — desktop vs mobile

The **Tag** and **Owner** menus let you pick several at once, and **multi-select menus like these don't apply as you tick** — they wait for you to **confirm** the whole selection. (Single-choice pickers, such as the check selector, apply the moment you pick, so this doesn't concern them.) How you confirm a multi-pick differs by device, and it isn't obvious the first time:

- **On mobile**, a **Save** button appears beneath the open menu. Tap it to apply what you picked.
- **On desktop**, there is **no Save button**. Instead, **click anywhere outside the menu** to close it — closing it is what applies your selection. If your tags don't seem to take effect, this is almost always why: click away from the dropdown to commit them.

This matters most during **live editing** of tags or owner, where each time you close the menu the task updates on the spot — so on desktop, one click outside the menu is what saves each change.

## Editing while others watch

When someone opens **Bulk update**, the list is locked and its editing functions — Bulk update, Clean list, Reopen all and the task buttons — are disabled for everyone else, with a note showing who is editing. If an edit is cancelled or gets stuck, anyone can force-unlock with the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button.

If the list is locked or sealed while your Clean confirmation or your Reopen question is still open, confirming only tells you that *this list can't be changed right now*, and nothing changes.

<div class="callout"><div class="callout-t">Write richer tasks</div>In <strong>Bulk update</strong> and single-task edits you can add channel links, mentions and hyperlinks by hand. Learn the exact syntax in <a href="/docs/personalize-your-lists/">Personalize your lists</a>.</div>

## When a bulk update can't be saved

The list title can be up to **256 characters**. If what you wrote can't be read as a list, the bot shows it back with the wrong lines marked by an arrow. Otherwise, when the list can't be saved, **one message lists every problem at once**, one per paragraph: a list too long, more tasks than a list can hold or your plan allows, and every reminder over the limits — recurring where recurring reminders aren't allowed, repetitions over your plan, too many reminders waiting at the same time. Fix them all and submit again.

A reminder that could never fire is **discarded** instead: one on a task without an owner, or one whose alerts are all in the past. It is removed from the task text, the list is saved, and a message only you can see names each task and the reason. Remember that the owner is a mention followed by a colon (`<@id>:`): without the colon, the mention is a tag.

## Where to go next

- [Personalize your lists](/docs/personalize-your-lists/) — mentions, channel links and hyperlinks.
- [Reminders](/docs/reminders/) — the full reminder form, explained field by field.
- [Configuration](/docs/configuration/) — control notifications, history and permissions.
