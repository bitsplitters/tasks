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

<div class="callout"><div class="callout-t">Keep the task buttons grey</div>To check or uncheck tasks, <strong>every button in the second row must be grey</strong> (off). If any task button is active (blue or red), clicking a task applies that action instead of toggling it.</div>

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
| <img class="inline-ic" src="/icons/tag.png" alt="" /> | **Tag** | Set the users/roles to notify — pick several at once (see *Two ways to tag* below). | Remove every tag on the task. |
| <img class="inline-ic" src="/icons/alertW.png" alt="" /> | **Reminder** | Add or edit a reminder (start date, interval, repetitions, time zone). | Remove the reminder. |
| <img class="inline-ic" src="/icons/api.png" alt="" /> | **Webhook** | Associate a webhook, so completing/reopening the task fires an HTTP call. | Remove the webhook association from the task. |

<div class="callout"><div class="callout-t">Remember</div>You cannot delete the very last task in a list. To remove a list entirely, delete its message manually.</div>

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

## Confirming a tag selection — desktop vs mobile

Only the **Tag** menu lets you pick several people at once, and **multi-select menus like this don't apply as you tick** — they wait for you to **confirm** the whole selection. (Single-choice pickers, such as the check selector or the owner menu, apply the moment you pick, so this doesn't concern them.) How you confirm a multi-pick differs by device, and it isn't obvious the first time:

- **On mobile**, a **Save** button appears beneath the open menu. Tap it to apply what you picked.
- **On desktop**, there is **no Save button**. Instead, **click anywhere outside the menu** to close it — closing it is what applies your selection. If your tags don't seem to take effect, this is almost always why: click away from the dropdown to commit them.

This matters most during tag **live editing**, where each time you close the menu the task updates on the spot — so on desktop, one click outside the menu is what saves each change.

## Editing while others watch

When someone opens **Bulk update**, the list is locked and its editing functions are disabled for everyone else, with a note showing who is editing. If an edit is cancelled or gets stuck, anyone can force-unlock with the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button.

<div class="callout"><div class="callout-t">Write richer tasks</div>In <strong>Bulk update</strong> and single-task edits you can add channel links, mentions and hyperlinks by hand. Learn the exact syntax in <a href="/docs/personalize-your-lists/">Personalize your lists</a>.</div>

## Where to go next

- [Personalize your lists](/docs/personalize-your-lists/) — mentions, channel links and hyperlinks.
- [Reminders](/docs/reminders/) — the full reminder form, explained field by field.
- [Configuration](/docs/configuration/) — control notifications, history and permissions.
