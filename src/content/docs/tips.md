---
title: Tips & tricks
description: Small habits that make TTM faster and quieter, in the channel and in the Activity.
group: Help & community
order: 8
---

Most of these work wherever the list is. The ones that exist in a single place say so under their title.

## Reuse a list anywhere

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Open **More** <img class="inline-ic" src="/icons/other.png" alt="" /> and pick **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: the list arrives as a `.txt` file that only you can see. Then run `/create-list` on any server and attach that file to its `file` option. Tasks, completed states, owners, tags, reminders and webhooks come back as they were. It works well for checklists you repeat, like releases, onboarding or events.

If something in the file doesn't fit the new server, TTM creates nothing and lists every problem at once. What it checks: see [`/create-list`](/docs/commands/#create-list).

## Hide the tips

If your team already knows how to write a list and where to press, hide the **Tips** in [Configuration](/docs/configuration/#tips). `/create-list` then opens the creation form straight away, without the **Tutorial**, and lists end without the help line, in the channel and in the Activity.

## Clone instead of rebuilding

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Running the same list in several channels? **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" />, in the **More** panel of the list, copies it in one step — and lets you decide whether to carry over selections and reminders.

## Apply one action to many tasks

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Set **Behavior on selection** to **Keep status after selection** in [Configuration](/docs/configuration/#behavior-on-selection). The active button (owner, tag or reminder) stays on after each task, so you can tag five tasks in five clicks instead of fifteen.

## Keep the channel quiet

If task notifications feel noisy, switch **Notification mode** to *keep last only* — or disable them entirely. Your list always stays up to date regardless. The summary of a session in the Activity follows the same setting.

## Reminders that survive the clock change

On a *repeating* reminder (a Premium feature), choose **days** when you mean "same time tomorrow" and **hours** when you mean "exactly a day later": in the text of a list, `1d` and `24h`. Around daylight-saving switches the two differ by an hour — see [Reminders](/docs/reminders/#the-repetition-fields).

## A reminder in two clicks

The reminder starts from ten minutes from now, in your time zone. For "remind me shortly", save it as it is, without typing anything: in the channel, submit the **When** form; in the Activity, tap **Save** in the reminder panel. Every reminder is a single event unless your server has turned on recurring reminders, a Premium feature that is off by default.

## Link a channel without hunting for its ID

Right-click the channel → **Copy Link**, paste it into the task: TTM turns it into a proper `#channel` tag by itself. No Developer Mode needed — see [Writing a list](/docs/writing-a-list/).

## Personalize webhooks with free variables

Drop `{{owner=alex}}` (or any `{{key=value}}`) into a task's text and reference `{{owner}}` in your webhook body. It's a lightweight way to pass task-specific data without hard-coding it. See [Webhooks in the text](/docs/writing-a-list/#webhooks-in-the-text).

## Make lists read-only for guests

Sync permissions in [Configuration](/docs/configuration/#sync-permissions) so only your team can edit a list, while everyone else can still read it. The <span class="dchip is-blue" role="img" aria-label="Activity button, blue"><img src="/icons/activity.png" alt="" /></span> button follows the same rules.
