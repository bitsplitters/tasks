---
title: Release notes
description: What's new in Team Tasks Manager, newest first.
group: Reference
order: 10
---

Everything that changes in TTM lands here, newest first. Follow along to see the bot evolve.

## Unreleased — deleting and regenerating lists

- **Delete list** — a list can finally be deleted properly, and its reminders go with it. It lives in the new <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel, which has taken the place of the *Guide* button in the first row (the guide is inside it). Requires *Manage messages* on the channel: the same permission that would let you delete the list's message by hand.
- **`/config lists`** — the lists of the server, with one three-state button per row: do nothing, **regenerate** or **delete**. Mark several, press Apply, confirm once. Regeneration republishes a list whose message was deleted by mistake — with the same contents, and **keeping its activity timeline** in the same thread.
- Deleting the message of a list is no longer a dead end: see [Known limits](/docs/known-limits/) for what happens and how to clean up.

## 1.0.0 — First public release

The debut of Team Tasks Manager under the **bitsplitters** banner. Highlights:

- **Shared task lists** created from plain text, with tasks, subtasks and task groups.
- **The button panel** — a list row (clone, download, bulk update, clean, guide) and a task row (content, owner, tag, reminder, webhook) with three-state controls.
- **Reminders** with start date, interval, repetitions and time zone — daylight-saving aware.
- **Configuration** for notification mode, history tracking, push notifications, selection behavior, time zone and permission sync.
- **Webhooks** fired on task completion/reopen, with built-in and free `{{ }}` tokens and strict `https` security.
- **Localized interface**, with the UI ready for browser translation on this site.

<div class="callout"><div class="callout-t">Coming soon</div>A premium tier, an owner-only task view and a progress dashboard are on the way. This page will track every step.</div>
