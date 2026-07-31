---
title: Tips & tricks
description: Small habits that make TTM faster and quieter.
group: Help & community
order: 9
---

## Reuse a list anywhere

Use **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> to export a list as text, then paste it into a new `/create-list` on any server. Great for recurring checklists (releases, onboarding, events).

## Clone instead of rebuilding

Running the same list in several channels? **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" /> copies it in one step — and lets you decide whether to carry over selections and reminders.

## Apply one action to many tasks

Set **Behavior on selection** to *keep status* in [Configuration](/docs/configuration/). The active button (owner, tag or reminder) stays on after each task, so you can tag five tasks in five clicks instead of fifteen.

## Keep the channel quiet

If task notifications feel noisy, switch **Notification mode** to *keep last only* — or disable them entirely. Your list always stays up to date regardless.

## Reminders that survive the clock change

Use `1d` when you mean "same time tomorrow" and `24h` when you mean "exactly a day later". Around daylight-saving switches the two differ by an hour — see [Reminders](/docs/reminders/).

## Personalize webhooks with free variables

Drop `{{owner=alex}}` (or any `{{key=value}}`) into a task's text and reference `{{owner}}` in your webhook body. It's a lightweight way to pass task-specific data without hard-coding it.

## Make lists read-only for guests

Sync permissions in [Configuration](/docs/configuration/) so only your team can edit a list, while everyone else can still read it.
