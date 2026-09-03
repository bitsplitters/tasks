---
title: /config lists
description: See every list of the server, delete the ones you no longer want, or bring back one whose message was deleted by mistake.
group: Configuration
order: 2
---

Run the command:

```
/config lists
```

It opens a private panel — only you see it — with **every list this server has ever used**, one row each: the list name and the channel it lives in, as a clickable link.

## One button, three states

Each row has a single button that cycles every time you press it:

| State | Meaning |
| :---: | :--- |
| <img class="inline-ic" src="/icons/noaction.png" alt="" /> grey | nothing happens to this list |
| <img class="inline-ic" src="/icons/refresh.png" alt="" /> blue | **regenerate** it |
| <img class="inline-ic" src="/icons/delete.png" alt="" /> red | **delete** it |

Mark as many lists as you need — two to delete and three to regenerate, if that's the case — then press **Apply** and confirm once. The whole block runs together, and the panel tells you how each list went.

**Cancel** closes the panel and does nothing. Changing page clears the choices made on the page you leave: the selection lives in the panel itself, not in the bot's memory, which is also why it never expires while you think about it.

## Regenerate

Publishes the list again, in its original channel, with the same contents: tasks, owners, tags and reminders. Use it when the list's message was deleted by mistake — the data was still there, only the message was gone.

Two things worth knowing:

- **the activity timeline follows the list.** The new message reuses the same thread, so the history stays where it was and nothing is orphaned;
- **the old message is removed** if it still exists. That's deliberate: a message left behind still has working buttons, and pressing them would make the bot rebuild the list a second time — leaving you with two lists that drift apart.

## Delete

Removes the list for good: tasks, owners, tags, reminders and the activity history. A receipt is posted in the list's channel, and the last line of the timeline records the deletion before the thread is left alone.

It is the same deletion you get from **Delete list** in the <img class="inline-ic" src="/icons/other.png" alt="" /> *More* panel of a list — use this command when the list's message is no longer there to click.

<div class="callout"><div class="callout-t">Why doesn't the bot know which lists are dead?</div>Telling a live list from a deleted one means asking Discord about every list, every time the panel opens. TTM doesn't: it shows you what exists and links each channel, so you can look for yourself. Guessing from silence is exactly how data gets destroyed by accident.</div>

## Who can use it

The same as the rest of `/config`: server administrators, or whoever you have authorized through the permission panel of [`/config app`](/docs/configuration/).

If the database is unreachable the command refuses to open, and says so: every row of that panel comes from there, and a deletion that cannot remove the data would leave reminders firing for a list that no longer appears anywhere.
