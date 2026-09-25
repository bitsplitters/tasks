---
title: Core concepts
description: The vocabulary of TTM — tasks, subtasks, groups, states, owners, tags and reminders — and the permissions it asks for.
group: Getting started
order: 2
---

A few terms come up throughout the app. Learn them once and everything else clicks into place.

## Tasks, subtasks and groups

| Term | What it is |
| :--- | :--- |
| **Task** | A single activity — neither a subtask nor a group. |
| **Subtask** | An activity that belongs to a larger one. |
| **Task group** | A task made of subtasks. |

You never pick these types from a menu — TTM infers them from how you write the list. A line starting with `-` is a task; spaces before the dash turn it into a subtask of the line above; a task that owns subtasks automatically becomes a **group**.

Groups behave as a unit: ticking a group ticks its subtasks too, and ticking every subtask marks the group as done.

## Task state

Every task is either **open** or **completed**, shown by its checkbox:

- <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> **Open** — still to do.
- <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> **Completed** — done.

You tick or untick a task in the **check selector**, the drop-down menu that shows the list's title. It sits above the button rows. Completing or reopening a task is what can trigger notifications and webhooks.

A task **with an owner** can be ticked only by its owner, or by the members of the owner role. Whoever has *Manage messages* on the channel can tick it too. Anyone who can use the list can tick a task without an owner. The full rule: [The check selector](/docs/the-task-list/#the-check-selector).

## Owner vs. tag

These look similar but do different jobs:

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> — the person or role *responsible* for the task. A task has one owner, and it can be several people: TTM creates a role for them (see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — one or more users or roles *mentioned* on the task, for example the people to notify when it is completed.

How to set them: [Owners and tags](/docs/owners-and-tags/).

## Reminders

A **reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> attaches a schedule to a task: a date, a time and a time zone. When it comes due, TTM reminds the task's **owner**, so nobody has to keep checking. A person gets a direct message, and a role gets a mention in the list's channel.

One ping is the default, and on the Free plan it is the only kind. Repeating reminders add an interval and a number of repetitions. They are a Premium feature that a server switches on in [Configuration](/docs/configuration/#recurring-reminders). Full details in [Reminders](/docs/reminders/).

## Notifications & history

When a task is ticked or unticked, TTM can post a notification and — if you enable it — record every action in a dedicated **history thread**. How much noise you want is entirely up to you: see [Configuration](/docs/configuration/).

## Who can use lists and commands

By default the app's commands follow Discord's own visibility rules (Server Settings → Integrations). Buttons and lists, however, stay usable by anyone unless you **sync permissions** — after which the list becomes read-only for users who are not allowed. This too lives in [Configuration](/docs/configuration/).

A few actions have a rule of their own:

- only the owner can tick or untick a task that has an owner: see [The check selector](/docs/the-task-list/#the-check-selector);
- sealing or deleting a list from its *More* panel needs *Manage messages* on the channel. From `/config lists`, the `/config` permissions apply.

## The permissions TTM asks for

When you invite the bot, Discord shows the permissions it asks for. This is what each one is for:

| Permission | Why it is needed |
| :--- | :--- |
| View channel | See the channel where the list lives |
| Send messages | Post and update the list |
| Embed links | Render the list as a rich embed |
| Manage messages | Clear the bot's own older notifications, so the channel stays readable |
| Create public threads | Create the optional timeline thread |
| Manage webhooks | Write the timeline and run the webhook feature |
| Attach files | Provide the list download |
| Read message history | Keep the list in sync |
| Mention everyone | Notify the people you tag on a task, and the role that owns a task when its reminder comes due |
| Manage roles | Create the role that makes several people the owner of a task (Premium) |
| Use external emojis | Show the bot's own icons on buttons and lists |

<div class="callout"><div class="callout-t">Good to know</div>You can grant these later from <em>Server Settings → Roles → Team Tasks Manager</em>, or per channel from the channel's permission settings. <em>Manage roles</em> is the exception: it works only on the bot's role, not per channel.</div>
