---
title: Known limits
description: The ceilings on lists, tasks, reminders and more — most come from Discord itself, and how to work within them.
group: Reference
order: 9.5
---

Team Tasks Manager works entirely inside Discord, so most of the limits below aren't TTM's choice. They come from Discord itself. For example: how long a message can be, how many menus fit in one message, how far back messages can be deleted in bulk. Where a limit is Discord's, we say so.

## Lists and tasks

| Limit | Value | Why |
| :--- | :--- | :--- |
| Lists in use per server | **3** on the Free plan | See [How the three places work](/docs/premium/#how-the-three-places-work). |
| Characters per list | **4000** | The whole list is edited inside a single Discord field, and Discord caps that field at 4000 characters. This counts *everything shown* — task text, checkboxes, any reminder time and one line break per row — not just what you type. TTM keeps a small safety margin below the hard limit. |
| Items per list | **50** (tasks + subtasks) | Discord allows 5 component rows per message and up to 25 options per dropdown. TTM reserves rows for the action buttons, which leaves room for 50 selectable items in total — subtasks included. Your plan can stop lower: see [What Premium unlocks](/docs/premium/). |
| List title | **256** characters | The create, edit and clone windows don't let you type more. |
| Imported file | `.txt`, up to **64 KB** | `/create-list` imports only the file made by **Download**. What else it checks: see [`/create-list`](/docs/commands/#create-list). |

<div class="callout"><div class="callout-t">Hitting a ceiling?</div>Split the work across several lists. Two focused lists are easier to read than one that's maxed out — and each gets its own reminders, owners and tags.</div>

**Download always gives you a file.** A normal Discord message is capped at 2000 characters. So **Download**, in the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel, never posts the list as text. It sends a `.txt` file to you alone, in a message only you can see. It's the same file `/create-list` can import back.

**Deleting the message is not the same as deleting the list.** A list lives in its message, but its data lives in TTM: tasks, owners, tags and above all **reminders**. If you delete the message by hand, the list disappears from the channel. Its reminders keep arriving, and they point to a message that no longer exists.

TTM doesn't notice on its own that a message is gone: [/config lists](/docs/config-lists/) explains why. You have three ways out:

- **Delete list**, in the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel of the list: the ordinary way, and it takes the reminders with it.
- **Seal list**, in the same panel, to keep the message as a record. Sealing is final: see [Seal](/docs/config-lists/#seal).
- **`/config lists`**, when the message is already gone. It can delete the leftovers, or **regenerate** the list if you deleted the message by mistake. It can't seal a list whose message is gone.

**Delete list** and **Seal list** need *Manage messages* on the channel.

## Reminders

| Limit | Value | Why |
| :--- | :--- | :--- |
| Reminders waiting at a time | **10** on the Free plan | See [What Premium unlocks](/docs/premium/). |
| Repetitions per reminder | **up to 50** on Premium, none on Free | Recurring reminders are a Premium feature: on the Free plan every reminder is a single event. On Premium a reminder can repeat at most 50 times after the first one: 51 pings in total. Set repetitions to `0` for a one-time reminder. |
| How soon a reminder can fire | **5 minutes** from now | The start date must be at least five minutes in the future, so the scheduler has time to pick it up. |
| How punctual a reminder is | within about **10 seconds** | Reminders due together are spread over up to ten seconds, to stay within Discord's rate limits. The reminder still arrives within the right minute. |

Repetitions are offered only on a plan that includes recurring reminders, and only when **Recurring reminders** is on in [Configuration](/docs/configuration/#recurring-reminders). By default every reminder is a single event. Recurring reminders you already have keep firing either way: see [Repeating reminders](/docs/reminders/#repeating-reminders).

### Reminders by direct message

A person's reminder arrives by direct message, so it depends on the owner's DM settings. If the owner doesn't accept direct messages from server members, Discord refuses the message, and that reminder doesn't arrive. The same happens if the owner no longer shares a server with the bot.

To accept direct messages from a server's members, click the server name, then *Privacy Settings*.

After a refused message, TTM remembers it and doesn't try that person again for **6 hours**. After that it tries again, and the first DM that gets through clears the pause.

### Reminders to a role

When a task's owner is a role, the reminder is a message in the list's channel that mentions the role. Discord turns the mention into a notification only in one of these cases:

- the role lets anyone mention it: in *Server Settings → Roles*, the role can be @mentioned by anyone;
- the bot has the *Mention @everyone, @here and All Roles* permission in the list's channel. The invite link grants it.

Otherwise the message appears in the channel, and nobody gets a notification. TTM warns you when you set such a reminder. It also warns you when you make such a role the owner of a task with a reminder.

- **@everyone as owner**: only the bot's permission counts.
- **A role TTM creates** for several owners is born mentionable. Its reminders notify it even without the permission, unless someone turns that setting off.
- **A deleted role** gets no reminder at all. TTM tells you, and the fix is to choose another owner.

In every case, only the members who can see the list's channel are notified.

## Owners and tags

Each task has **one owner**: a person or a role. On Premium it can also be up to 25 people, who share a role TTM creates for them. 25 is the maximum of the owner menu. A task can carry **up to 25 tags**, the users or roles to notify: 25 is Discord's maximum for one menu.

**Roles TTM creates count toward Discord's 250 roles per server.** At 250 roles, TTM can't create a new one, and it says so. When TTM deletes its roles: see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates).

**TTM sees how many members a role has, not who they are.** What this means for the roles TTM creates: see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates).

## Webhooks

| Limit | Value |
| :--- | :--- |
| Webhooks per server | **25** on Premium, no new ones on the Free plan. The picker is a Discord dropdown, and 25 options is its maximum. |
| Webhook name | up to **96** characters \* |
| Webhook URL | up to **2000** characters |

\* Discord's own cap is 100, but the name travels inside the form field's identifier together with a
short marker, and those characters count too: TTM checks 96 and says so if you go over. The error
message quotes the same number you read here.

## The activity timeline

When the timeline is on, TTM posts each action into a thread next to the list, through a Discord webhook. Discord allows **15 webhooks per channel**, so TTM creates **one webhook per channel** and reuses it for every list in that channel. The name and picture you see on each message are set per message, so nothing changes visually.

If a channel has already reached Discord's 15 (because of other bots or integrations), the timeline for a new list can't start. Free one up in **Channel settings → Integrations → Webhooks**.

## Notifications

When TTM tidies up its own notification messages, Discord only allows bulk-deleting messages from the **last 14 days**. Older notifications may stay in the channel — you can remove them manually.

---

These numbers reflect the current version of the bot. Anything that changes will be noted in the [Release notes](/docs/release-notes/).
