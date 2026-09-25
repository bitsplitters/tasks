---
title: Free during the beta
description: TTM is completely free while it's in beta — and even after, you'll never lose what you've built.
group: Plans
order: 0.5
---

Team Tasks Manager is in **open beta**. Every feature is unlocked and free, for every server, for the entire beta: lists, reminders, webhooks and everything else. There is no trial period, no credit card to enter and no locked button.

## When the beta ends

When TTM leaves beta it becomes **freemium**: a Free plan, plus a paid plan called Premium. Here is exactly what happens, with no hidden conditions:

- **Nothing you've built is ever deleted or hidden.** Your lists, tasks and reminders stay exactly where they are.
- **The Free plan stays free, forever.** A small team can keep using TTM without paying.
- **Above the free limits, you can't add more** until you make room or upgrade. Everything already there stays.
- **What you built during the beta stays**, even above the limits: its reminders keep arriving and its tasks can still be ticked. Any other change to a list needs a free place: see [What a beta list keeps](#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">We will never switch the bot off to make you pay.</div>A task manager that stops working is useless, and we know it.</div>

## What a beta list keeps

On the Free plan a server has [three places for lists](/docs/premium/#how-the-three-places-work), and a list that holds one is **in use**. The bot's Premium table calls them *active lists*. When the beta ends, no list holds a place yet. A list created during the beta:

- **stays in the channel as it is.** Its reminders keep arriving, and you can still download it.
- **lets you check or uncheck its tasks**, without taking a place. Its webhooks stay silent until the list takes a place.
- **takes a place for any other work**, such as a bulk update, Clean list, owners or reminders. Without a free place, that work is refused: see [What happens to a fourth list](/docs/premium/#what-happens-to-a-fourth-list).
- **keeps its recurring reminders firing.** [Reminders](/docs/reminders/#repeating-reminders) explains what you can still change.

A list with more than twenty tasks keeps all of them. On the Free plan, **Bulk update** can save it again only with twenty tasks or fewer. You can still edit or remove a single task: like any other work, it takes a place.

**Webhooks created during the beta stay.** You can still change or delete them. On the Free plan you can't create new ones.

To free a place, use **Seal list** or **Delete list** on a list you're done with, or [`/config lists`](/docs/config-lists/).

## The Free plan, after beta

The Free plan gives every server:

- three lists in use at a time;
- twenty tasks per list;
- ten reminders waiting at a time, single ones only;
- one person or one role as the owner of a task;
- no new webhooks.

The full table, what Premium lifts and the planned price are on one page:

**→ [What Premium unlocks](/docs/premium/)**

Rather run TTM yourself? You can host it for free, with every Premium feature unlocked, but not offer it as a service to others. See [Rather run it yourself?](/docs/premium/#rather-run-it-yourself)

## Questions?

Join the [Discord](/docs/community/) and ask us anything about the beta, pricing or self-hosting.
