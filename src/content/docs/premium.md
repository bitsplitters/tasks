---
title: What Premium unlocks
description: "The paid plan lifts the Free limits: here is exactly which ones, and what that changes day to day."
group: Plans
order: 0.6
---

TTM is **fully unlocked during the beta**, so nothing on this page applies yet. It describes the Free plan, and what Premium will lift once the beta ends. What happens to your server when the beta ends is on [How the beta works](/docs/beta/).

<div class="callout"><div class="callout-t">Plans and prices</div>The two plans side by side, the prices and self-hosting are on the <a href="/premium/">Premium page</a>.</div>

## What each one changes, in practice

Above a Free limit you can't add more, but nothing already there is deleted or hidden: see [How the beta works](/docs/beta/#when-the-beta-ends).

\* **A limit set by Discord, not by us.** It is the same on every plan: Premium lets you *reach* it, never go past it. See [Known limits](/docs/known-limits/).

**Lists in use — 3 → unlimited.** Three lists cover a small team: a to-do, a bug list, a checklist for the next event. You reach the limit when every project, squad or meeting wants its own list.

**Tasks per list — 20 → 50 \*.** Twenty tasks make a working checklist, and fifty make a backlog. No plan goes above 50, because a Discord message can hold only a few menus: see [Known limits](/docs/known-limits/).

**Active reminders — 10 → unlimited.** The limit counts reminders *waiting at the same time*, not reminders per day. A reminder stops counting after its last ping or when you remove it, and a repeating one counts once.

**Repetitions per reminder — single only → up to 50.** On the Free plan every reminder fires once. On Premium a reminder can arrive up to 50 times in total, the first included, if an admin turns on **Recurring reminders** in [Configuration](/docs/configuration/#recurring-reminders). Recurring reminders you already have keep firing on the Free plan: see [Reminders](/docs/reminders/#repeating-reminders).

**People per owner — 1 → up to 25 \*.** On the Free plan a task's owner is one person or one role. On Premium it can be up to 25 people, who share a role that TTM creates: see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates). It is Premium because each person costs a Discord request. Discord limits the requests a bot can send, and all its servers share that limit.

**Webhooks — no new ones → up to 25 \*.** A webhook lets a completed task send an HTTP call to anything you run: a deploy, a spreadsheet, a ticket system. It is the main thing Premium adds. See [Webhooks](/docs/webhooks/). On the Free plan you can't create new webhooks, but the ones created during the beta stay: see [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

## How the three places work

On the Free plan a server has three places for lists. A list that holds one is **in use**, and `/config lists` marks it that way.

- **A list takes a place the first time someone works on it**, and keeps it. Working on a list means any of these:
  - ticking or unticking a task;
  - a bulk update, or editing or removing a single task;
  - **Clean list** or **Reopen all**;
  - setting an owner, a tag or a reminder;
  - linking a webhook.
- **A new list takes a place** when you create, clone or import it. Regenerating a list counts as working on it.
- **A place doesn't expire.** Only sealing or deleting the list frees it.
- **A list that isn't in use stays in the channel as it is.** You can still download it, seal it or delete it.

Lists created during the beta are the exception: their tasks can still be ticked without a place. See [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">No limit counts how often you use something</div>Every limit counts how many things you have, never how often you use them. A webhook that fires a thousand times a week still counts as one webhook.</div>

### What happens to a fourth list

When all three places are taken, TTM refuses to create, clone or import another list. It also refuses to work on a list that isn't in use. The bot tells you how to free a place:

- **Seal list**, in the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel of a list you're done with. The list stays in the channel as a record, without buttons.
- **Delete list**, in the same panel. It removes the list permanently.
- [`/config lists`](/docs/config-lists/), which marks the lists in use and can seal or delete several at once.

## Questions?

Join the [Discord](/docs/community/) and ask us anything about pricing, the limits or self-hosting.
