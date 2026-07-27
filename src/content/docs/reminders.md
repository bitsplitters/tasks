---
title: Reminders
description: Attach a schedule to a task so TTM pings your team on time, every time.
group: Using the bot
order: 4
---

A reminder turns a task into something that reminds *you*, instead of the other way round. You set it once; TTM handles the pings.

## Adding a reminder

On the second button row, click **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> until it turns **blue** (edit mode), then pick the task from the check selector. TTM walks you through a short flow:

1. **When** — the start date and time: day, month, year and time (`HH:mm`).
2. A confirmation step with **Continue**, **Edit date** or **Cancel**.
3. **Repetition** — how the reminder repeats.

## The repetition fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| **Interval** | Time between reminders. Use days `d`, hours `h`, minutes `m` — no months. | `1d`, `24h`, `1d12h` |
| **Repetitions** | How many times it fires (minimum 1, up to the app maximum). | `5` |
| **Time zone** | The zone the schedule runs in. | `Europe/Rome` |

<div class="callout"><div class="callout-t">Daylight saving — the detail that matters</div><code>1d</code> keeps the <strong>same wall-clock time</strong> across a DST change (e.g. always 09:00). <code>24h</code> means <strong>exactly 24 hours</strong>, which can shift by an hour after the clocks change. Pick the one that matches what you mean.</div>

## Finding your time zone

TTM needs an official time-zone name like `Europe/Rome`. Look yours up on the **[Time Zone Picker](https://timezones.bitsplitters.app)**: select your area on the map, copy the value, and paste it into the field.

## Editing or removing a reminder

- **Edit** — click **Reminder** to blue, pick the task, and set the new values.
- **Remove** — click **Reminder** until it turns **red** (delete mode), then pick the task. The reminder is removed.

Completing a task also stops its reminder — no need to clean up afterwards.

## Common errors

| Message | What to fix |
| :--- | :--- |
| *Invalid reminder* | The start must be at least 5 minutes in the future. |
| *Incorrect interval* | Use the `d` / `h` / `m` pattern, e.g. `1d`, `24h`, `1d12h`. |
| *Incorrect repetitions* | Use a whole number between 1 and the maximum. |
| *Incorrect time zone* | The name doesn't match an official zone — copy it from the Time Zone Picker. |
