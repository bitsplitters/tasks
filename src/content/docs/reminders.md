---
title: Reminders
description: Attach a schedule to a task so TTM pings its owner on time, every time.
group: Using the bot
order: 5
---

A reminder turns a task into something that reminds *you*, instead of the other way round. You set it once; TTM handles the pings.

## Adding a reminder

On the second button row, click **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> until it turns **blue** (edit mode), then pick the task from the check selector. TTM opens the **When** form:

| Field | Format | Notes |
| :--- | :--- | :--- |
| **Day** | a number (1–31) | pre-filled |
| **Month** | a dropdown, in your language | no `dd/mm` ambiguity to worry about |
| **Year** | a number | pre-filled |
| **Time** | `HH:mm`, 24-hour | e.g. `15:30` |
| **Time zone** | an official zone name | pre-filled with *your* zone |

Everything arrives pre-filled with **ten minutes from now**, so a reminder for "in a moment" needs no typing at all — just submit. Submit and you're done: the task shows the scheduled time and the reminder fires **once**.

The start must be at least **5 minutes** in the future.

<div class="callout"><div class="callout-t">Your time zone is remembered</div>The first time, the field proposes the server's zone. Change it and TTM stores <strong>your</strong> choice: from then on it proposes your personal zone, so every member of the team can think in their own local time.</div>

## Repeating reminders

By default every reminder is a **single event** — one form, one ping, nothing else to decide. Repetitions are an opt-in: a server manager enables **Recurring reminders** in [Configuration](/docs/configuration/). A reminder that's already recurring keeps its repetitions even while the toggle is off.

With recurring reminders on, submitting **When** doesn't save yet. TTM shows you a private summary card with the date it understood and four buttons:

| Button | What it does |
| :--- | :--- |
| **Save** | Store the reminder exactly as the card shows it. |
| **Edit date** | Reopen **When**, pre-filled with the current values. |
| **Edit recurrence** | Open the repetition form (repetitions + interval). |
| **Cancel** | Drop the whole thing — the list is unlocked and the unlock message removed. |

<div class="callout"><div class="callout-t">Nothing is saved until you press Save</div>Editing the date or the recurrence only updates the card, so you can go back and forth as much as you like — and <strong>Cancel</strong> really cancels.</div>

### The repetition fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| **Repetitions** | Extra repeats **after** the first reminder. `0` fires it **once only**; `N` adds `N` more (so `N + 1` in total), up to the app maximum. | `0`, `3` |
| **Interval** | Time between repeats. **Optional** — only needed when repetitions are `1` or more. Use days `d`, hours `h`, minutes `m` (no months). | `1d`, `24h`, `1d12h` |

<div class="callout"><div class="callout-t">Daylight saving — the detail that matters</div><code>1d</code> keeps the <strong>same wall-clock time</strong> across a DST change (e.g. always 09:00). <code>24h</code> means <strong>exactly 24 hours</strong>, which can shift by an hour after the clocks change. Pick the one that matches what you mean.</div>

## How the reminder arrives

When the time comes, TTM sends a **direct message to the task's owner**, with the task, the date it was due for and a button that jumps straight to the list.

If the task had no owner yet, whoever sets the reminder **becomes its owner** — a reminder always has someone to reach. Set a different owner with the **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> button before or after creating the reminder.

## Reading a reminder on the task

On the task line the reminder always shows the date of the **first** ping, rendered by Discord in each reader's local time. A repeating reminder adds two compact values:

`↻` interval · `×` repetitions

So `↻1h ×3` means: after the first ping it repeats every hour, three more times. A single event shows **just the timestamp** — there is no badge, because there is nothing to repeat.

In **Bulk update** the same reminder appears as a timestamp followed by a triplet:

```
- [] <t:1726497546> [2d3h,1h,3] Ship the release notes
```

The triplet is `[distance,interval,repetitions]`. The first value lets you create a reminder **from text**, without an absolute date: it is counted from the moment you save the list. A single event uses the sentinel interval `0m` and `0` repetitions — `[2d3h,0m,0]`.

## Finding your time zone

TTM needs an official time-zone name like `Europe/Rome`. Look yours up on the **[time zone map](https://timezones.bitsplitters.app)**: select your area on the map, copy the value, and paste it into the field.

## Editing or removing a reminder

- **Edit** — click **Reminder** to blue, pick the task, and set the new values. If the task already has a *repeating* reminder you land straight on the summary card, with the current date and badge, so you can change only what you need.
- **Remove** — click **Reminder** until it turns **red** (delete mode), then pick the task. The reminder is removed.

Completing a task also stops its reminder — no need to clean up afterwards.

<div class="callout"><div class="callout-t">Closing a form is not cancelling</div>Discord never tells a bot that you closed a form with the ✕, so TTM cannot know: the list stays locked. Use <strong>Cancel</strong> on the summary card when it's there, and the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button if you closed a form the hard way.</div>

## Common errors

| Message | What to fix |
| :--- | :--- |
| *Invalid reminder* | The start must be at least 5 minutes in the future. |
| *The date does not exist* | Check day, month and year together (e.g. 31 February). |
| *Invalid time* | Use the 24-hour format `HH:mm`, e.g. `15:30`. |
| *Incorrect interval* | Use the `d` / `h` / `m` pattern, e.g. `1d`, `24h`, `1d12h`. |
| *Incorrect repetitions* | Use a whole number between 0 and the maximum (`0` = once only). |
| *Incorrect time zone* | The name doesn't match an official zone — copy it from the time zone map. |
