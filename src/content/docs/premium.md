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
| Repetitions per reminder | **5** | 50 |
| Webhooks | — | 25 \* |

*These are the planned limits and may be tuned before launch.*

\* **A limit set by Discord, not by us** — it's the same on every plan, and Premium can only let you *reach* it, never go past. See [Known limits](/docs/known-limits/).

## What each one changes, in practice

**Active lists — 3 → unlimited.** Three lists cover a small team with one thing going on: a to-do, a bug list, a checklist for the next event. You hit the ceiling when lists start belonging to *people or channels* rather than to the server — one per project, one per squad, one per recurring meeting. The free tier isn't a trial that runs out; it's the size at which one list per topic still fits in your head.

**Tasks per list — 20 → 50.** Twenty is a working checklist. Fifty is a backlog you groom. Above that neither plan can go, and that isn't us: a Discord message has a hard size limit, and a list *is* a message. [Known limits](/docs/known-limits/) has the details.

**Active reminders — 10 → unlimited.** Ten reminders *waiting at the same time* — not ten a day. A reminder stops counting the moment it has fired for the last time, so the slot comes back on its own; and a repeating reminder takes **one** slot, not one per repetition. Ten is plenty for deadlines that matter. It becomes the binding limit when reminders stop being exceptions and become the rhythm of the server — stand-ups, shift handovers, recurring checks on a dozen lists.

**Repetitions per reminder — 5 → 50.** How many times a single reminder repeats before it gives up. Five is a nudge; fifty is a drumbeat for something that genuinely must not be missed.

**Webhooks — none → up to 25.** This is the only row where Premium unlocks a *capability* rather than a bigger number. Webhooks let a completed task fire an HTTP call to anything you run: a deploy, a spreadsheet, a ticket system, your own service. It is the feature that turns TTM from a checklist into a piece of your workflow, and it's the reason the paid plan exists. See [Webhooks](/docs/webhooks/).

<div class="callout"><div class="callout-t">Every limit on this page is a limit on <em>creating</em>, never on <em>using</em></div>The clearest case is webhooks: you can create up to 25 per server, and each one can fire as many times as you like — a webhook that runs a thousand times a week still counts as one. Same everywhere else: three lists means three lists you are <em>working on</em> — and a list you are not working on still opens, still ticks, still downloads. Nothing in TTM is metered by use.</div>

<div class="callout"><div class="callout-t">The free tier is not a countdown</div>Everything above the line keeps working for as long as you use TTM. If your server outgrows a free limit you can't add <em>more</em> beyond it until you upgrade — but nothing already there is deleted, hidden, or degraded. That promise is spelled out in <a href="/docs/beta/">Free during the beta</a>.</div>

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

<div class="callout"><div class="callout-t">The honest maths</div>Self-hosting to save €3/month — €36 for a whole year — means: paying for a server that costs <em>more</em> than €3/month; keeping a database running and backed up; and stopping the bot, downloading each release, reconfiguring it and starting it again — <em>every single update</em> — while you're the one on call when it falls over at 2 a.m.<br><br>€3/month — less than one coffee — is us doing all of that for you, forever, with every update live the moment it ships. The self-host door is always open — with the trade-offs laid out, is it worth walking through? That's yours to decide.</div>

## Questions?

Join the [Discord](/docs/community/) and ask us anything about pricing, the limits or self-hosting.
