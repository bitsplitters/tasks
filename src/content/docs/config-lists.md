---
title: /config lists
description: See every list of the server, seal or delete the ones you are done with, or bring back one whose message was deleted by mistake.
group: Configuration
order: 2
---

Run the command:

```
/config lists
```

It opens a private panel, which only you can see, with **every list this server has ever used**. Each list has one row: the list name, and the channel it lives in as a clickable link.

A list that holds one of the places of your plan is marked **in use** next to its channel. When you need to free a place, those are the lists to seal or delete. During the beta there is no limit, so no list is marked. How a list takes a place: see [How the three places work](/docs/premium/#how-the-three-places-work).

## One button, four states

Each row has a single button that cycles every time you press it:

| State | Meaning |
| :---: | :--- |
| <span class="dchip is-grey" role="img" aria-label="Grey button"><img src="/icons/noaction.png" alt="" /></span> | nothing happens to this list |
| <span class="dchip is-blue" role="img" aria-label="Blue button"><img src="/icons/refresh.png" alt="" /></span> | **regenerate** it |
| <span class="dchip is-green" role="img" aria-label="Green button"><img src="/icons/seal.png" alt="" /></span> | **seal** it |
| <span class="dchip is-red" role="img" aria-label="Red button"><img src="/icons/delete.png" alt="" /></span> | **delete** it |

Mark as many lists as you need — two to delete, one to seal and three to regenerate, if that's the case — then press **Apply**. Before anything happens, a confirmation window lists them by name, grouped by action: submit it to go ahead, close it to cancel.

The block then runs **in order**: deletions first, then seals, then regenerations. So one block can free a place and use it: a list you delete or seal hands its place to a list you regenerate.

At the end you get a summary, by name: the lists deleted, sealed and regenerated, and the ones that couldn't be handled. Each of those comes with its reason, for example a list that no longer exists, or a regeneration with no place left on your plan. The panel then redraws itself with the lists as they are now.

**Cancel** closes the panel and does nothing. Your choices survive a change of page: the header tells you how many you have marked on other pages, and the confirmation includes them. The choices on the page in front of you live in the panel itself, so they never expire while you think. Those on other pages are remembered for an hour after you last touch the panel.

## Regenerate

Publishes the list again, in its original channel, with the same contents: tasks, owners, tags and reminders. Use it when the list's message was deleted by mistake — the data was still there, only the message was gone.

Three things worth knowing:

- **the activity timeline follows the list.** The new message reuses the same thread, so the history stays where it was and nothing is orphaned;
- **the old message is removed** if it still exists. That's deliberate: a message left behind still has working buttons. Pressing them would make the bot rebuild the list a second time, leaving two lists that drift apart;
- **regenerating counts as working on the list.** A list that already holds one of your plan's places keeps it. A list without a place needs a free one, or it ends up in the summary among the ones not done.

## Seal

For a list you are done with but want to keep as a record. The list **stays in the channel** with the same contents, but without buttons or menus, and with a *Sealed list* line at the bottom. Everything else goes:

- the list can no longer be edited, reopened or downloaded;
- its reminders stop;
- it frees its place on your plan;
- it no longer appears in this panel, because its data leaves TTM.

The activity timeline stays where it is. Sealing cannot be undone: if you may want to reuse the list, download it before you seal it.

The notification in the channel and the line in the timeline follow your server's options: with both off, nothing records who sealed the list.

A list whose message no longer exists **can't be sealed**: there is no record left to keep. It shows up in the summary among the ones not done, with the reason, and the rest of the block runs anyway. To remove it, mark it red to **delete** it.

It is the same sealing you get from **Seal list** in the <img class="inline-ic" src="/icons/other.png" alt="" /> *More* panel of a list.

## Delete

Removes the list permanently: tasks, owners, tags, reminders and the activity history. A receipt is posted in the list's channel, and the last line of the timeline records the deletion before the thread is left alone.

It is the same deletion you get from **Delete list** in the <img class="inline-ic" src="/icons/other.png" alt="" /> *More* panel of a list. Use this command when the list's message is no longer there to click.

<div class="callout"><div class="callout-t">Why doesn't the bot know which lists are dead?</div>Telling a live list from a deleted one means asking Discord about every list, every time the panel opens. TTM doesn't: it shows you what exists and links each channel, so you can look for yourself. Guessing from silence is exactly how data gets destroyed by accident.</div>

## Who can use it

The same as the rest of `/config`: server administrators, or whoever you have authorized through the permission panel of [`/config app`](/docs/configuration/).

If the database is unreachable, the command refuses to open, and says so. Every row of that panel comes from the database. A deletion that can't remove the data would leave reminders firing for a list that no longer appears anywhere.
