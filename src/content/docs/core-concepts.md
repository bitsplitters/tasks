---
title: Core concepts
description: The vocabulary of TTM — tasks, subtasks, groups, states, owners, tags and reminders.
group: Start
order: 2
---

A few terms come up throughout the app. Learn them once and everything else clicks into place.

## Tasks, subtasks and groups

| Term | What it is |
| :--- | :--- |
| **Task** | A single activity — neither a subtask nor a group. |
| **Subtask** | An activity that belongs to a larger one. |
| **Task group** | A task made of subtasks. |

You never pick these types from a menu — TTM infers them from how you write the list. A line starting with `-` is a task; adding spaces after the dash turns it into a subtask of the line above; a task that owns subtasks automatically becomes a **group**.

Groups behave as a unit where it matters: checking a group checks its subtasks in cascade, and checking every subtask marks the group as done.

## Task state

Every task is either **open** or **completed**, shown by its checkbox:

- <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> **Open** — still to do.
- <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> **Completed** — done.

You flip the state from the **check / uncheck** selector above the button rows. Completing or reopening a task is what can trigger notifications and webhooks.

## Owner vs. tag

These look similar but do different jobs:

- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> — the person (or role) *responsible* for the task. One owner per task.
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> — one or more users/roles *mentioned* on the task, e.g. people to notify when it is completed.

## Reminders

A **reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> attaches a schedule to a task: a start date, an interval between reminders, a number of repetitions and a time zone. TTM then pings on time, so nobody has to keep checking. Full details in [Reminders](/docs/reminders/).

## Notifications & history

When a task is checked or unchecked, TTM can post a notification and — if you enable it — record every action in a dedicated **history thread**. How much noise you want is entirely up to you: see [Configuration](/docs/configuration/).

## Permissions

By default the app's commands follow Discord's own visibility rules (Server Settings → Integrations). Buttons and lists, however, stay usable by anyone unless you **sync permissions** — after which the list becomes read-only for users who are not allowed. This too lives in [Configuration](/docs/configuration/).
