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

Groups behave as a unit where it matters: checking a group checks its subtasks in cascade, and checking every subtask marks the group as done.

## Task state

Every task is either **open** or **completed**, shown by its checkbox:

- <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> **Open** — still to do.
- <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> **Completed** — done.

You flip the state from the **check / uncheck** selector above the button rows. Completing or reopening a task is what can trigger notifications and webhooks.

A task **with an owner** can be flipped only by its owner — or the members of the owner role — and by whoever has *Manage messages* on the channel. A task without an owner can be flipped by anyone who can use the list.

## Owner vs. tag

These look similar but do different jobs:

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> — the person (or role) *responsible* for the task. One owner per task — and it can be several people: TTM creates a role for them (see [The roles TTM creates](/docs/the-task-list/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — one or more users/roles *mentioned* on the task, e.g. people to notify when it is completed.

## Reminders

A **reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> attaches a schedule to a task: a date, a time and a time zone. When it comes due, TTM reminds the task's **owner** — a direct message to a person, a mention in the list's channel to a role — so nobody has to keep checking. One ping is the default, and on the Free plan it is the only kind. Repeating reminders, which add an interval and a number of repetitions, are a Premium feature that a server switches on in [Configuration](/docs/configuration/#recurring-reminders). Full details in [Reminders](/docs/reminders/).

## Notifications & history

When a task is checked or unchecked, TTM can post a notification and — if you enable it — record every action in a dedicated **history thread**. How much noise you want is entirely up to you: see [Configuration](/docs/configuration/).

## Who can use lists and commands

By default the app's commands follow Discord's own visibility rules (Server Settings → Integrations). Buttons and lists, however, stay usable by anyone unless you **sync permissions** — after which the list becomes read-only for users who are not allowed. This too lives in [Configuration](/docs/configuration/).

A few actions have a rule of their own: a task with an owner is checked by its owner (see *Task state* above), and sealing or deleting a list from its *More* panel needs *Manage messages* on the channel (from `/config lists`, the `/config` permissions apply).

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

<div class="callout"><div class="callout-t">Good to know</div>You can grant these later from <em>Server Settings → Roles → Team Tasks Manager</em>, or per channel from the channel's permission settings — except <em>Manage roles</em>, which works only on the bot's role, not per channel.</div>
