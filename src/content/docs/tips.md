---
title: Tips & tricks
description: Small habits that make TTM faster and quieter, in the channel and in the Activity.
group: Help & community
order: 8.6
---

Most of these work wherever the list is. The ones that exist in a single place say so under their title.

## Reuse a list anywhere

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Open **More** <img class="inline-ic" src="/icons/other.png" alt="" /> and pick **Download** <img class="inline-ic" src="/icons/download.png" alt="" />: the list arrives as a `.txt` file that only you can see. Then run `/create-list` on any server and attach that file to its `file` option. Tasks, completed states, owners, tags, reminders and webhooks come back as they were. It works well for checklists you repeat, like releases, onboarding or events.

If something in the file doesn't fit the new server, TTM creates nothing and lists every problem at once. What it checks: see [`/create-list`](/docs/commands/#create-list).

## Hide the tips

If your team already knows where to press, hide the **Tips** in [/config app](/docs/configuration/#tips): no Tutorial in `/create-list`, no help line under the lists.

## Clone instead of rebuilding

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Running the same list in several channels? **Clone list** <img class="inline-ic" src="/icons/clone.png" alt="" />, in the **More** panel of the list, copies it in one step — and lets you decide whether to carry over selections and reminders.

## Apply one action to many tasks

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />In the channel</p>

Tick **Keep the state after a selection** in the **Behavior** menu of [/config app](/docs/configuration/#keep-the-state-after-a-selection). The active button (owner, tag or reminder) stays on after each task, so you can tag five tasks in five clicks instead of fifteen.

## Keep the channel quiet

If task notifications feel noisy, set **Notification mode** in [/config app](/docs/configuration/#notification-mode) to keep only the last one, or turn them off: the list stays up to date either way.

## Reminders that survive the clock change

On a repeating reminder, pick **Days** in the **Unit** menu for the same time of day, **Hours** for an exact interval: around a clock change the two differ by an hour. See [The repetition fields](/docs/reminders/#the-repetition-fields).

## A reminder in two clicks

The reminder starts ten minutes from now, so for "remind me shortly" just save it as it is, with **When** in the channel or **Save** in the Activity.

## Personalize webhooks with free variables

Drop `{{owner=alex}}` (or any `{{key=value}}`) into a task's text and reference `{{owner}}` in your webhook body. It's a lightweight way to pass task-specific data without hard-coding it. See [Webhooks in the text](/docs/writing-a-list/#webhooks-in-the-text).

## Make lists read-only for guests

Sync permissions in [/config app](/docs/configuration/#sync-permissions) so only your team can edit a list, while everyone else can still read it. The **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> button follows the same rules.
