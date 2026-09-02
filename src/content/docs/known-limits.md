---
title: Known limits
description: The ceilings on lists, tasks, reminders and more — most come from Discord itself, and how to work within them.
group: Reference
order: 9.5
---

Team Tasks Manager works entirely inside Discord, so most of the limits below aren't TTM's choice — they come from Discord itself: how long a message can be, how many menus fit in one message, how far back messages can be deleted in bulk. Where a limit is Discord's, we say so.

## Lists and tasks

| Limit | Value | Why |
| :--- | :--- | :--- |
| Characters per list | **4000** | The whole list is edited inside a single Discord field, and Discord caps that field at 4000 characters. This counts *everything shown* — task text, checkboxes, any reminder time and one line break per row — not just what you type. TTM keeps a small safety margin below the hard limit. |
| Items per list | **50** (tasks + subtasks) | Discord allows 5 component rows per message and up to 25 options per dropdown. TTM reserves rows for the action buttons, which leaves room for 50 selectable items in total — subtasks included. |

<div class="callout"><div class="callout-t">Hitting a ceiling?</div>Split the work across several lists. Two focused lists are easier to read than one that's maxed out — and each gets its own reminders, owners and tags.</div>

**Very long lists are sent as a file.** A normal Discord message is capped at 2000 characters. When a list is too long to post as text, TTM delivers it as a `.txt` attachment instead — nothing is lost, it just arrives as a download.

**Deleting the message is not the same as deleting the list.** A list lives in its message, but its data — tasks, owners, tags and above all **reminders** — lives in TTM. If you delete the message by hand, the list disappears from the channel while its reminders keep arriving, pointing at a message that is no longer there.

Two ways out, both under your control:

- **Delete list**, inside the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel of the list itself: the ordinary way, which takes the reminders with it. Needs *Manage messages* on the channel.
- **`/config lists`**, when the message is already gone: it shows every list of the server and lets you delete the leftovers — or **regenerate** the list, if the message was deleted by mistake.

TTM does not detect the deletion of a message on its own: doing so would mean asking Discord about every list, every time, and guessing from silence is exactly how data gets destroyed by accident. The panel shows you what exists and leaves the decision to you.

## Reminders

| Limit | Value | Why |
| :--- | :--- | :--- |
| Repetitions per reminder | **up to 50** | A single reminder can repeat at most 50 times after the first one (51 pings in total). Set repetitions to `0` for a one-time reminder. |
| How soon a reminder can fire | **5 minutes** from now | The start date must be at least five minutes in the future, so the scheduler has time to pick it up. |

Repetitions are only offered when **Recurring reminders** is enabled in [Configuration](/docs/configuration/); by default every reminder is a single event. See [Reminders](/docs/reminders/) for how repetitions and intervals work.

## Owners and tags

Each task has **one owner** — a single user or role, the person responsible. A task can carry **up to 25 tags** (users or roles to notify): 25 is Discord's per-menu maximum for the tag picker.

## Webhooks

| Limit | Value |
| :--- | :--- |
| Webhooks per server | **25** — the picker is a Discord dropdown, and 25 options is its maximum, so that is also the cap |
| Webhook name | up to **100** characters |
| Webhook URL | up to **2000** characters |

## The activity timeline

When the timeline is on, TTM posts each action into a thread next to the list, through a Discord webhook. Discord allows **15 webhooks per channel**, so TTM creates **one webhook per channel** and reuses it for every list in that channel — the name and picture you see on each message are set per message, so nothing changes visually.

If a channel has already reached Discord's 15 (because of other bots or integrations), the timeline for a new list can't start. Free one up in **Channel settings → Integrations → Webhooks**.

## Notifications

When TTM tidies up its own notification messages, Discord only allows bulk-deleting messages from the **last 14 days**. Older notifications may stay in the channel — you can remove them manually.

---

These numbers reflect the current version of the bot. Anything that changes will be noted in the [Release notes](/docs/release-notes/).
