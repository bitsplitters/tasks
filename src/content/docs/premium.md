---
title: What Premium unlocks
description: The paid plan lifts the free limits — here is exactly which ones, what that changes day to day, and what it will cost.
group: Plans
order: 0.6
---

TTM is **free and fully unlocked during the beta**, so nothing on this page applies yet. It describes what the paid plan will lift once the beta ends — and, just as importantly, what the free tier keeps doing forever.

If you're here from the bot, start with [Free during the beta](/docs/beta/): it explains what happens to *your* server when the beta closes. This page is the numbers.

## The limits, side by side

| | Free | Premium |
| :--- | :--- | :--- |
| Active lists per server | **3** | Unlimited |
| Tasks per list | **20** | 50 \* |
| Active reminders | **10** | Unlimited |
| Repetitions per reminder | — (single reminders only) | 50 |
| Webhooks | — | 25 \* |
| People per owner | **1** (a person or a role) | 25 \* |

*These are the planned limits and may be tuned before launch.*

\* **A limit set by Discord, not by us** — it's the same on every plan, and Premium can only let you *reach* it, never go past. See [Known limits](/docs/known-limits/).

## What each one changes, in practice

**Active lists — 3 → unlimited.** Three lists cover a small team with one thing going on: a to-do, a bug list, a checklist for the next event. You hit the ceiling when lists start belonging to *people or channels* rather than to the server — one per project, one per squad, one per recurring meeting. The free tier isn't a trial that runs out; it's the size at which one list per topic still fits in your head.

On the free tier the three places are fixed. A list takes one the first time someone works on it — checks a task, runs a bulk update, edits or removes a task, cleans it, reopens it, sets an owner, a tag or a reminder, or links a webhook — and keeps it. A quiet week doesn't give the place back. Creating, cloning, importing or regenerating a list gives the place to the *new* list. When all three are taken, a list outside them refuses those actions and tells you how to free a place: **Seal list** (the list stays in the channel as a record, without buttons) or **Delete list**, both in the <img class="inline-ic" src="/icons/other.png" alt="" /> **More** panel of a list you're done with, or [`/config lists`](/docs/config-lists/), which also shows which lists are in use.

**Tasks per list — 20 → 50.** Twenty is a working checklist. Fifty is a backlog you groom. Above that neither plan can go, and that isn't us: a Discord message has a hard size limit, and a list *is* a message. [Known limits](/docs/known-limits/) has the details.

**Active reminders — 10 → unlimited.** Ten reminders *waiting at the same time* — not ten a day. A reminder stops counting the moment it has fired for the last time, so the slot comes back on its own; and a repeating reminder — like one set up during the beta — takes **one** slot, not one per repetition. Ten is plenty for deadlines that matter. It becomes the binding limit when reminders stop being exceptions and become the rhythm of the server — stand-ups, shift handovers, recurring checks on a dozen lists.

**Repetitions per reminder — single only → up to 50.** On the free tier every reminder is a single event: it arrives once, at the time you choose. Recurring reminders — repetitions and an interval — are a Premium feature: one reminder can repeat up to 50 times after the first, a drumbeat for something that genuinely must not be missed. On Premium an admin still switches them on in [Configuration](/docs/configuration/#recurring-reminders), where they are off by default. Recurring reminders you already have, from the beta for example, keep firing on the free tier and stay editable: you can move them or lower their repetitions, not raise them. See [Reminders](/docs/reminders/).

**People per owner — 1 → up to 25.** On the free tier a task's owner is one person, or one role of your server. On Premium you can pick several people as the owner: TTM creates a role for them, gives it to them and makes it the owner, so they can all check the task and its reminder mentions all of them in the list's channel. It is Premium because it costs Discord requests — one for the role, one for each person — and those come from the same budget as everything else the bot does. Up to 25, because that's as many as the owner menu lets you pick. How those roles are named, kept and deleted: [The roles TTM creates](/docs/the-task-list/#the-roles-ttm-creates).

**Webhooks — none → up to 25.** Like recurring reminders, this row unlocks a *capability* rather than a bigger number. Webhooks let a completed task fire an HTTP call to anything you run: a deploy, a spreadsheet, a ticket system, your own service. It is the feature that turns TTM from a checklist into a piece of your workflow, and it's the main reason the paid plan exists. See [Webhooks](/docs/webhooks/).

<div class="callout"><div class="callout-t">No limit on this page counts how often you use something</div>The clearest case is webhooks: you can create up to 25 per server, and each one can fire as many times as you like — a webhook that runs a thousand times a week still counts as one. Same everywhere else: three lists means three lists you are <em>working on</em> — a list outside them still sits in the channel and still downloads, and one created during the beta can still be ticked without taking a place. Nothing in TTM is metered by use: a place, once taken, doesn't count how often you work on its list.</div>

<div class="callout"><div class="callout-t">The free tier is not a countdown</div>Everything above the line keeps working for as long as you use TTM. If your server outgrows a free limit you can't add <em>more</em> beyond it until you upgrade — but nothing already there is deleted or hidden. That promise, and exactly what a beta list outside your three places can still do, is spelled out in <a href="/docs/beta/">Free during the beta</a>.</div>

## What it will cost

| | Price | Works out at |
| :--- | :--- | :--- |
| Monthly | **€5 / month** | €5 per month |
| Annual | **€36 / year** | **€3 per month** |

One price for the **whole server** — everyone on it included, no per-seat maths, no counting members. The annual plan is the same product paid once: it costs less because it saves us a year of billing, not because it gives you more.

*Planned prices, not final until the beta ends.*

And for being here first: when the beta winds down we'll open a **Founder** offer — a full year at roughly **half price**, as a thank-you to the servers that showed up early.

## Rather run it yourself?

You can — and this is the point: **you'll never be trapped.** If you'd prefer to host TTM on your own machine, join our [Discord server](/docs/community/), download the executable and its configuration, and run it free, for good. Every time we ship an update, the new executable is waiting for you there.

**What "free, for good" covers.** Run TTM as long as you like, for yourself or for your own company, at no cost — that part has no expiry and no catch. What it doesn't cover is offering TTM to other people as a service of your own, or passing the executable on to someone else. The full text is the [self-hosting licence](/license/) — read it here before you decide; it also ships inside the package, and you'll be asked to accept it before you get it.

<div class="callout"><div class="callout-t">The honest maths</div>Self-hosting to save €3/month — €36 for a whole year — means: paying for a server that costs <em>more</em> than €3/month; keeping a database running and backed up; and stopping the bot, downloading each release, reconfiguring it and starting it again — <em>every single update</em> — while you're the one on call when it falls over at 2 a.m.<br><br>€3/month — less than one coffee — is us doing all of that for you, forever, with every update live the moment it ships. The self-host door is always open — with the trade-offs laid out, is it worth walking through? That's yours to decide.</div>

## Questions?

Join the [Discord](/docs/community/) and ask us anything about pricing, the limits or self-hosting.
