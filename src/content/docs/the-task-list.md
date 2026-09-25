---
title: The task list panel
description: Every button under your list, what it does, and how the three-state task buttons work.
group: Using the bot
order: 3
---

Once a list exists, TTM shows a **check selector** and **two rows of buttons** beneath it. This panel is the heart of the app: almost nothing here needs a command, you just click.

## The check selector

Above the buttons sits the **check selector**: the drop-down menu that shows the list's title. A list with more than 25 tasks has two menus, each labelled with the position of its last task. Use it to:

1. **Mark tasks done or open** — tick a task to complete it, untick it to reopen it. Its checkbox shows <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> or <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Pick the task that an active button acts on** (see [Row 2](#row-2--acts-on-a-single-task)).

Ticking or unticking a group does the same to its subtasks. Completing all its subtasks completes the group.

**Only the owner can tick or untick a task that has an owner.** These people can do it:

- the owner, or the members of the owner role;
- whoever has *Manage messages* on the channel.

Anyone else gets a refusal that only they can see, and nothing changes. The rule covers subtasks too: you can't tick or untick a group if that changes a subtask that belongs to someone else. Anyone who can use the list can tick a task without an owner.

<div class="callout"><div class="callout-t">Keep the task buttons grey</div>To tick or untick tasks, <strong>every button in the second row must be grey</strong> (off). If any task button is active (blue or red), picking a task applies that action instead of ticking it.</div>

## Row 1 — acts on the whole list

These buttons never touch a single task: they act on the **entire list**.

| Button | Function | What it does |
| :---: | :--- | :--- |
| <span class="dchip is-blue" role="img" aria-label="Clone list button, blue"><img src="/icons/clone.png" alt="" /></span> | **Clone list** | Clone the list into another channel. It opens a channel picker and a few options (see [Clone options](#clone-options)). |
| <span class="dchip is-blue" role="img" aria-label="Bulk update button, blue"><img src="/icons/edit.png" alt="" /></span> | **Bulk update** | Edit the title and the whole list in one form: the fastest way to change two or more tasks. While you edit, the list is locked. |
| <span class="dchip is-blue" role="img" aria-label="Clean list button, blue"><img src="/icons/clean.png" alt="" /></span> | **Clean list** | Remove every completed task, after a confirmation. |
| <span class="dchip is-blue" role="img" aria-label="Reopen all button, blue"><img src="/icons/reopen.png" alt="" /></span> | **Reopen all** | Bring every completed task back to to-do. You can also move the reminders to a new date. |
| <span class="dchip is-blue" role="img" aria-label="More button, blue"><img src="/icons/other.png" alt="" /></span> | **More** | Open a panel with the actions you need less often: seal, delete or download the list, and the in-Discord guide. |

### Clean list

**Clean list** removes every completed task, subtasks included, and renumbers the tasks that stay. A group that isn't completed stays, even when some of its subtasks go.

First, a confirmation window tells you how many tasks will go. They go **permanently**, with their reminders and tags. Their text still shows in the timeline, if it's on. It also shows in the channel notification, as long as your [notification mode](/docs/configuration/#notification-mode) keeps it. Submit to confirm, or close the window to cancel.

- **No task completed**: there is nothing to remove, and the bot says so at once.
- **Every task completed**: Clean refuses, because a list can't be empty. Untick at least one task, or remove the whole list with **Delete list** in [More](#whats-inside-more).

### Reopen all

**Reopen all** brings every completed task back to to-do, on the same message. Text, owners, tags and reminders stay as they are. If no task is completed, the bot says there is nothing to reopen.

First, the bot asks you in a message that only you can see:

- **Reopen** — reopen every task now.
- **New date** — reopen, and move the reminders too. The **When** window opens: the first reminder in the calendar moves to the date you pick, at least 5 minutes from now. The other reminders keep the same distance from it. This choice appears only when the list has reminders.
- **Cancel** — leave the list as it is.

Reopening calls **no webhook**, and it ignores owners: anyone who can edit the list can reopen it.

If someone locks or seals the list before you confirm, nothing changes: see [When the list is locked](#when-the-list-is-locked).

### What's inside More

Discord allows five buttons per row, so the actions you need less often sit in a panel that only you can see:

- <img class="inline-ic" src="/icons/seal.png" alt="" /> **Seal list** — keeps a finished list in the channel as a record, marked *Sealed list*, without buttons or menus. Its reminders stop, and it frees a [place on your plan](/docs/premium/#how-the-three-places-work). What stays and what goes: [Seal](/docs/config-lists/#seal).
- <img class="inline-ic" src="/icons/delete.png" alt="" /> **Delete list** — deletes the list **permanently**, with its tasks, owners, tags and reminders. The message is removed, and a short receipt takes its place in the channel.
- <img class="inline-ic" src="/icons/download.png" alt="" /> **Download** — a `.txt` file of the list, written as in the Bulk update form and sent **only to you**. Keep it as a backup, or rebuild the list from it with `/create-list`, even on another server: see [Reuse a list anywhere](/docs/tips/#reuse-a-list-anywhere).
- <img class="inline-ic" src="/icons/doc.png" alt="" /> **Guide** — the quick in-Discord guide, with a link back to this documentation.

Sealing and deleting can't be undone, and the bot asks you to confirm first. Both need *Manage messages* on the channel: the same permission that lets you delete the list's message by hand. Without it, those two entries aren't there. Download and Guide are there for everyone.

<div class="callout"><div class="callout-t">Why delete instead of removing the message?</div>If you delete the message by hand, the list's data stays, and its reminders keep arriving. <strong>Delete list</strong> takes the reminders with it. If a message is already gone, <a href="/docs/config-lists/"><code>/config lists</code></a> lets you clean up, or bring the list back.</div>

### Clone options

When you start **Clone list**, the cloning controls replace the first row:

- **Create list** — start cloning into the channel you picked in the dropdown.
- **Selection option** — keep the ticks in the clone, or not.
- **Reminder option** — keep the reminders in the clone, or not.
- **Exit** — go back to the normal list panel.

A clone gets new reminders, so a recurring reminder can be refused: see [Repeating reminders](/docs/reminders/#repeating-reminders).

A clone is a new list, so it follows your plan like any new list: it needs a free place, and it can't have more tasks than your plan allows. On the Free plan, a list with more than twenty tasks can't be cloned: see [What Premium unlocks](/docs/premium/).

## Row 2 — acts on a single task

Each button in the second row is a **three-state switch**. Click it to cycle through the same colors Discord uses for its buttons:

- <span class="c-grey">Grey</span> — off.
- <span class="c-blue">Blue</span> — active in <span class="c-blue">edit</span> mode.
- <span class="c-red">Red</span> — active in <span class="c-red">delete</span> mode.

The workflow is always the same: **turn a button blue or red, then pick the task** in the check selector. TTM applies the action to that task.

| Button | Function | <span class="c-blue">Blue (edit)</span> | <span class="c-red">Red (delete)</span> |
| :---: | :--- | :--- | :--- |
| <span class="dchip is-grey" role="img" aria-label="Content button, grey"><img src="/icons/task.png" alt="" /></span> | **Content** | Change the task text (opens a form). | Delete the task. You can't delete the last task: use **Delete list** or **Seal list** in [More](#whats-inside-more). |
| <span class="dchip is-grey" role="img" aria-label="Owner button, grey"><img src="/icons/owner.png" alt="" /></span> | **Owner** | Set or change the owner: one person, one role, or several people (see [Owner](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people)). | Remove the owner, and its reminder too: nobody is left to receive it. |
| <span class="dchip is-grey" role="img" aria-label="Tag button, grey"><img src="/icons/tag.png" alt="" /></span> | **Tag** | Set the users and roles to notify. You can pick several at once (see [Two ways to tag](/docs/owners-and-tags/#two-ways-to-tag)). | Remove every tag on the task. |
| <span class="dchip is-grey" role="img" aria-label="Reminder button, grey"><img src="/icons/alertW.png" alt="" /></span> | **Reminder** | Add or edit a reminder: start date and time zone. Interval and repetitions come with recurring reminders, a Premium feature switched on in [Configuration](/docs/configuration/#recurring-reminders). | Remove the reminder. |
| <span class="dchip is-grey" role="img" aria-label="Webhook button, grey"><img src="/icons/api.png" alt="" /></span> | **Webhook** | Link a webhook: completing or reopening the task then fires an HTTP call (see [Webhooks](/docs/webhooks/)). | Remove the webhook from the task. |

### Confirming a tag selection — desktop vs mobile

The **Tag** and **Owner** menus let you pick several at once. These multi-select menus **don't apply a choice as soon as you tick it**: they wait for you to **confirm** the whole selection. Single-choice menus, like the check selector, apply as soon as you pick. How you confirm depends on the device:

- **On mobile**, a **Save** button appears under the open menu. Tap it to apply your picks.
- **On desktop**, there is **no Save button**. **Click anywhere outside the menu** to close it: closing the menu applies your selection. If your tags don't seem to apply, this is almost always the reason.

This matters most in live editing of tags or owner: on desktop, each click outside the menu saves one change.

### Owners and tags

**Owner** and **Tag** have their own page: [Owners and tags](/docs/owners-and-tags/), with the owner menu, the two ways to tag and the roles TTM creates. How Tag behaves depends on **Behavior on selection** in [/config app](/docs/configuration/#behavior-on-selection):

<div class="callout"><div class="callout-t">In one line</div>With <strong>Reset status after selection</strong> (the default), tagging always overwrites, and you must pick people first. With <strong>Keep status after selection</strong>, pick people first to <em>overwrite</em> (assign), or pick the task first to <em>edit its tags live</em>.</div>

## When the list is locked

TTM locks the list while someone edits it:

- in **Bulk update**;
- in the form of a task's text;
- in a reminder form.

For everyone else, these turn off: the check selector, **Bulk update**, **Clean list**, **Reopen all** and the task buttons. A note shows who is editing. If an edit is cancelled or gets stuck, anyone can unlock the list with the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button.

If the list gets locked or sealed before you confirm Clean or Reopen, nothing changes. The bot tells you: *This list can't be changed right now*.

## When a bulk update can't be saved

The list title can be up to **256 characters**. If the bot can't read your text as a list, it shows the text back, with an arrow on each wrong line: a line without a dash, a list that starts with a subtask, or a reminder written in months (`M`). Otherwise, **one message lists every problem at once**, one per paragraph:

- the list is too long;
- the list has more tasks than a list can hold, or than your plan allows;
- a reminder is over a limit: recurring where recurring reminders aren't allowed, repetitions over your plan, or too many reminders waiting at the same time.

Fix them all and submit again.

A reminder that could never arrive doesn't stop the save: TTM removes it and tells you privately. Which reminders, and why: [Reading a reminder on the task](/docs/reminders/#reading-a-reminder-on-the-task).

## Where to go next

- [Owners and tags](/docs/owners-and-tags/) — the owner menu, the two ways to tag, and the roles TTM creates.
- [Reminders](/docs/reminders/) — the full reminder form, explained field by field.
- [Personalize your lists](/docs/personalize-your-lists/) — write mentions, channel links and hyperlinks by hand, in Bulk update and in task edits.
- [Configuration](/docs/configuration/) — control notifications, history and permissions.
- [Something not working?](/docs/troubleshooting/) — quick answers to the most common problems.
