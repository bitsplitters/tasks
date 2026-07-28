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

## Row 1 — acts on the whole list

These buttons never touch a single task; they operate on the **entire list**.

| Button | Function | What it does |
| :---: | :--- | :--- |
| <img class="inline-ic" src="/icons/clone.png" alt="" /> | **Clone list** | Clone the list into another channel. Opens a channel picker and a small set of options (see below). |
| <img class="inline-ic" src="/icons/download.png" alt="" /> | **Download** | Download a text file of the list, ready to copy-paste into other lists — even on other servers. |
| <img class="inline-ic" src="/icons/edit.png" alt="" /> | **Bulk update** | Edit the title and the full list in one form — the fastest way to change two or more tasks at once. While you edit, the list is temporarily locked. |
| <img class="inline-ic" src="/icons/clean.png" alt="" /> | **Clean list** | Remove all currently selected tasks and recalculate the remaining positions. |
| <img class="inline-ic" src="/icons/doc.png" alt="" /> | **Guide** | Open a quick in-Discord guide, with a link back to this documentation. |

### Clone options

When you start **Clone list**, the first row is replaced by the cloning controls:

- **Create list** — start cloning into the channel you picked from the dropdown.
- **Selection option** — clone keeping the current check selections, or not.
- **Reminder option** — clone keeping the reminders, or not.
- **Exit** — restore the normal list panel.

## Row 2 — acts on a single task

Each button in the second row is a **three-state switch**. Click it to cycle through the same colors Discord uses for its buttons:

- <span class="c-grey">Grey</span> — off / inactive.
- <span class="c-blue">Blue</span> — active in <span class="c-blue">edit</span> mode.
- <span class="c-red">Red</span> — active in <span class="c-red">delete</span> mode.

The workflow is always the same: **turn a button blue or red, then pick the task** from the check selector. TTM applies the action to that task.

| Button | Function | <span class="c-blue">Blue (edit)</span> | <span class="c-red">Red (delete)</span> |
| :---: | :--- | :--- | :--- |
| <img class="inline-ic" src="/icons/task.png" alt="" /> | **Content** | Change the task text (opens a form). | Delete the task. |
| <img class="inline-ic" src="/icons/owner.png" alt="" /> | **Owner** | Set or change the task owner (pick a user/role). | Remove the owner. |
| <img class="inline-ic" src="/icons/tag.png" alt="" /> | **Tag** | Add a user/role to notify at the end of the task text. | Remove every tag on the task. |
| <img class="inline-ic" src="/icons/alertW.png" alt="" /> | **Reminder** | Add or edit a reminder (start date, interval, repetitions, time zone). | Remove the reminder. |
| <img class="inline-ic" src="/icons/api.png" alt="" /> | **Webhook** | Associate a webhook, so completing/reopening the task fires an HTTP call. | Remove the webhook association from the task. |

<div class="callout"><div class="callout-t">Remember</div>You cannot delete the very last task in a list. To remove a list entirely, delete its message manually.</div>

## Editing while others watch

When someone opens **Bulk update**, the list is locked and its editing functions are disabled for everyone else, with a note showing who is editing. If an edit is cancelled or gets stuck, anyone can force-unlock with the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button.

<div class="callout"><div class="callout-t">Write richer tasks</div>In <strong>Bulk update</strong> and single-task edits you can add channel links, mentions and hyperlinks by hand. Learn the exact syntax in <a href="/docs/personalize-your-lists/">Personalize your lists</a>.</div>

## Where to go next

- [Personalize your lists](/docs/personalize-your-lists/) — mentions, channel links and hyperlinks.
- [Reminders](/docs/reminders/) — the full reminder form, explained field by field.
- [Configuration](/docs/configuration/) — control notifications, history and permissions.
