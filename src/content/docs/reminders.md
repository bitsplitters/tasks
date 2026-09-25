---
title: Reminders
description: Attach a schedule to a task so TTM pings its owner on time, every time.
group: Using the bot
order: 5
---

A reminder turns a task into something that reminds *you*, instead of the other way round. You set it once; TTM handles the pings.

## Adding a reminder

On the second button row, click **Reminder** <img class="inline-ic" src="/icons/alertW.png" alt="" /> until it turns **blue** (edit mode), then pick the task from the check selector — one that isn't ticked yet. TTM opens the **When** form, titled *Set reminder for task …*:

| Field | Format | Notes |
| :--- | :--- | :--- |
| **Day** | a number (1–31) | pre-filled |
| **Month** | a dropdown, in your language | no `dd/mm` ambiguity to worry about |
| **Year** | a number | pre-filled |
| **Time** | `HH:mm`, 24-hour | e.g. `15:30` |
| **Time zone** | an official zone name | pre-filled with *your* zone |

Everything arrives pre-filled with **ten minutes from now**, so a reminder for "in a moment" needs no typing at all: submit it, and the task shows the scheduled time. The reminder fires **once**. With recurring reminders on, a summary card follows: press **Save** (see [Repeating reminders](#repeating-reminders)).

The start must be at least **5 minutes** in the future.

<div class="callout"><div class="callout-t">Your time zone is remembered</div>The first time, the field proposes the server's zone. Change it and TTM stores <strong>your</strong> choice: from then on it proposes your personal zone, so every member of the team can think in their own local time.</div>

**Who gets it.** The reminder goes to the task's owner, by direct message if the owner is a person. If the task has no owner yet, you become it: from then on only you, and whoever has *Manage messages* on the channel, can tick that task. To give it to someone else, set the owner with **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> before or after creating the reminder. Owners, and what they can do: see [Owners and tags](/docs/owners-and-tags/). Nothing arrived? The owner must accept direct messages from members of that server: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).

## Finding your time zone

TTM needs an official time-zone name like `Europe/Rome`. Look yours up on the **[time zone map](https://timezones.bitsplitters.app)**: select your area on the map, copy the value, and paste it into the field.

## How the reminder arrives

When the time comes, TTM reminds the task's owner, with the task, the date it was due for and a button that jumps straight to the list.

- If the owner is a **person**, the reminder is a **direct message**.
- If the owner is a **role**, it is a **message in the list's channel** that mentions the role, as a reply to the list. Discord notifies everyone who has that role and can see the channel.

Either way, it arrives **within about ten seconds** of the scheduled time, and always in the right minute: TTM spreads the sends out to stay within Discord's limits. With [Push notification](/docs/configuration/#push-notification) off it still arrives, without the plain text that makes phone previews readable.

A direct message can be refused, and then TTM waits some hours before it tries that person again: see [Reminders by direct message](/docs/known-limits/#reminders-by-direct-message).

A role is notified only if it can be mentioned. When that is the case, and what happens with @everyone or a deleted role: see [Reminders to a role](/docs/known-limits/#reminders-to-a-role).

## Editing or removing a reminder

- **Edit** — click **Reminder** to blue, pick the task, and set the new values. You land straight on the summary card if the task already has a *repeating* reminder, or any reminder when recurring reminders are on (see [Repeating reminders](#repeating-reminders)). The card shows the current date and badge ([Reading a reminder on the task](#reading-a-reminder-on-the-task)), so you can change only what you need. Otherwise **When** opens, pre-filled with the current date.
- **Remove** — click **Reminder** until it turns **red** (delete mode), then pick the task. The reminder is removed.

Completing a task also stops its reminder — no need to clean up afterwards.

<div class="callout"><div class="callout-t">Closing a form is not cancelling</div>Discord never tells a bot that you closed a form with the ✕, so TTM cannot know: the list stays locked. Use <strong>Cancel</strong> on the <a href="#repeating-reminders">summary card</a> when it's there, and the <img class="inline-ic" src="/icons/unlock.png" alt="" /> unlock button if you closed a form the hard way.</div>

## Repeating reminders

By default every reminder is a **single event** — one form, one ping, nothing else to decide. Repetitions are a **Premium** feature, like webhooks: on the Free plan every reminder is single (see [What Premium unlocks](/docs/premium/); during the [beta](/docs/beta/) everything is unlocked). On a plan that includes them they are still an opt-in: a server manager enables **Recurring reminders** in [Configuration](/docs/configuration/).

<div class="callout"><div class="callout-t">Recurring reminders you already have keep working</div>A reminder that was already recurring, for example one created during the beta, keeps firing on the Free plan. It also keeps firing on Premium while the toggle is off. It stays editable: you can change its date, move it to another task or lower its repetitions. What you can't do is raise them, or add new recurring reminders.<br><br>Cloning or importing a list creates new reminders. So where new recurring reminders can't be created, on the Free plan or with the toggle off, a recurring reminder is refused there. Clone without reminders, or set its repetitions to <code>0</code>.</div>

With recurring reminders on, submitting **When** doesn't save yet. TTM shows you a private summary card with the date it understood and four buttons:

| Button | What it does |
| :--- | :--- |
| **Save** | Store the reminder exactly as the card shows it. |
| **Edit date** | Reopen **When**, pre-filled with the current values. |
| **Edit recurrence** | Open the repetition form (repetitions + interval). |
| **Cancel** | Drop the whole thing — the list is unlocked and the unlock message removed. |

<div class="callout"><div class="callout-t">Nothing is saved until you press Save</div>Editing the date or the recurrence only updates the card. You can change them as often as you need, and <strong>Cancel</strong> really cancels.</div>

With recurring reminders off, or on the Free plan, the card appears only when you edit a reminder that is **already recurring**. That way the reminder doesn't lose its repetitions: **Edit recurrence** lets you keep them or lower them, never go above the number it already has. A new reminder goes straight through **When** and is saved as a single event.

### The repetition fields

| Field | Meaning | Example |
| :--- | :--- | :--- |
| **Repetitions** | Extra repeats **after** the first reminder. `0` fires it **once only**. `N` adds `N` more, so `N + 1` in total. The maximum is shown in the field: 50 on Premium, or the repetitions the reminder already has where they can't grow. | `0`, `3` |
| **Interval** | Time between repeats. **Optional** — only needed when repetitions are `1` or more. Use days `d`, hours `h`, minutes `m` — there are no weeks or months: a week is `7d`. | `1d`, `7d` (weekly), `24h`, `1d12h` |

<div class="callout"><div class="callout-t">Daylight saving — the detail that matters</div><code>1d</code> keeps the <strong>same wall-clock time</strong> across a DST change (e.g. always 09:00). <code>24h</code> means <strong>exactly 24 hours</strong>, which can shift by an hour after the clocks change. Pick the one that matches what you mean.</div>

## Reading a reminder on the task

On the task line the reminder always shows the date of the **first** ping, rendered by Discord in each reader's local time. A repeating reminder adds two compact values:

`↻` interval · `×` repetitions

So `↻1h ×3` means: after the first ping it repeats every hour, three more times. A single event shows **just the timestamp** — there is no badge, because there is nothing to repeat.

In **Bulk update** the same reminder appears as a timestamp followed by a triplet:

```
- [] <t:1726497546> [2d3h,1h,3] Ship the release notes
```

The triplet is `[distance,interval,repetitions]`. The first value lets you create a reminder **from text**, without an absolute date: it is counted from the moment you save the list. A single event uses the sentinel interval `0m` and `0` repetitions — `[2d3h,0m,0]`. Distance and interval use only `d`, `h` and `m`: a value in months, such as `[1M,0m,0]`, is refused and the line is marked with an arrow.

The same rules apply as in the forms. Where new recurring reminders can't be created, a triplet with repetitions above `0` is accepted only for a reminder the list already had. Even then, the limits in [Repeating reminders](#repeating-reminders) apply. If several reminders break a rule, one message lists them all, one paragraph each. The same message also lists any other problem in the text, such as a list that's too long or has too many tasks.

A reminder that could never arrive is taken out of the task's text. This happens in two cases:

- the task has **no owner**. Reminders go to the owner, and a mention without the colon is only a tag: see [Owners: the mention with a colon](/docs/personalize-your-lists/#owners-the-mention-with-a-colon);
- all its alerts are **in the past**.

The list is saved anyway. A message that only you can see tells you which tasks lost their reminder, and why.

## Common errors

| Message | What to fix |
| :--- | :--- |
| *Invalid reminder* | The start must be at least 5 minutes in the future. |
| *The reminder to work must be created on a task to be performed* | Pick a task that isn't ticked yet: a completed task can't get a reminder. |
| *The date does not exist* | Check day, month and year together (e.g. 31 February). |
| *Invalid time* | Use the 24-hour format `HH:mm`, e.g. `15:30`. |
| *Incorrect interval* | Use the `d` / `h` / `m` pattern, e.g. `1d`, `24h`, `1d12h`. |
| *Incorrect repetitions* | Use a whole number between 0 and the maximum shown in the field (`0` = once only). |
| *Repetitions over the plan* | On the Free plan recurring reminders are Premium: a reminder that was already recurring can keep its repetitions or go lower, not higher. |
| *Repetitions over what is allowed* | Recurring reminders are turned off on this server: a reminder that was already recurring can keep its repetitions or go lower. An admin can turn them on in `/config app`. |
| *Incorrect time zone* | The name doesn't match an official zone — copy it from the time zone map. |

A reminder didn't arrive, or something else went wrong? See [Something not working?](/docs/troubleshooting/)
