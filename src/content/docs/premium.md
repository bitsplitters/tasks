---
title: What Premium unlocks
description: The paid plan lifts the free limits — here is exactly which ones, what that changes day to day, and what it will cost.
group: Plans
order: 0.6
---

TTM is **free and fully unlocked during the beta**, so nothing on this page applies yet. It describes the Free plan, and what Premium will lift once the beta ends. What happens to your server when the beta ends is on [Free during the beta](/docs/beta/).

## The limits, side by side

| | Free | Premium |
| :--- | :--- | :--- |
| Lists in use (active lists) per server | **3** | Unlimited |
| Tasks per list | **20** | 50 \* |
| Active reminders | **10** | Unlimited |
| Repetitions per reminder | — (single reminders only) | 50 |
| Webhooks | no new ones | 25 \* |
| People per owner | **1** (a person or a role) | 25 \* |

*These are the planned limits and may be tuned before launch.*

Above a Free limit you can't add more, but nothing already there is deleted or hidden: see [Free during the beta](/docs/beta/#when-the-beta-ends).

\* **A limit set by Discord, not by us.** It is the same on every plan: Premium lets you *reach* it, never go past it. See [Known limits](/docs/known-limits/).

## What each one changes, in practice

**Lists in use — 3 → unlimited.** Three lists cover a small team: a to-do, a bug list, a checklist for the next event. You reach the limit when every project, squad or meeting wants its own list.

**Tasks per list — 20 → 50 \*.** Twenty tasks make a working checklist, and fifty make a backlog. No plan goes above 50, because a Discord message can hold only a few menus: see [Known limits](/docs/known-limits/).

**Active reminders — 10 → unlimited.** The limit counts reminders *waiting at the same time*, not reminders per day. A reminder stops counting after its last ping or when you remove it, and a repeating one counts once.

**Repetitions per reminder — single only → up to 50.** On the Free plan every reminder fires once. On Premium a reminder can repeat up to 50 times after the first, if an admin turns on **Recurring reminders** in [Configuration](/docs/configuration/#recurring-reminders). Recurring reminders you already have keep firing on the Free plan: see [Reminders](/docs/reminders/#repeating-reminders).

**People per owner — 1 → up to 25 \*.** On the Free plan a task's owner is one person or one role. On Premium it can be up to 25 people, who share a role that TTM creates: see [The roles TTM creates](/docs/owners-and-tags/#the-roles-ttm-creates). It is Premium because each person costs a Discord request. Discord limits the requests a bot can send, and all its servers share that limit.

**Webhooks — no new ones → up to 25 \*.** A webhook lets a completed task send an HTTP call to anything you run: a deploy, a spreadsheet, a ticket system. It is the main thing Premium adds. See [Webhooks](/docs/webhooks/). On the Free plan you can't create new webhooks, but the ones created during the beta stay: see [What a beta list keeps](/docs/beta/#what-a-beta-list-keeps).

## How the three places work

On the Free plan a server has three places for lists. A list that holds one is **in use**, and `/config lists` marks it that way.

- **A list takes a place the first time someone works on it**, and keeps it. Working on a list means any of these:
  - checking or unchecking a task;
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

## Why there's a paid plan

We're a small independent team, and we want to share what we've built with as many communities as we can. That's why the Free plan is hosted by us and stays free, forever. So here, plainly, is where the Premium money goes.

**Running TTM has costs, and they grow with every server that uses it:**

- the machines it runs on;
- the database and its backups;
- the share of every payment that Discord keeps for handling the subscriptions.

But the biggest cost never shows up on an invoice: it's our time. It goes into new features and fixes, one update after another, and into answering your questions in the community.

**Hosting your server, by itself, costs us very little:** a single Premium server covers the hosting of many free ones. That's why the Free plan can last, and why we will never switch the bot off to make you pay.

**What Premium really pays for is the rest: our work.** It's for the servers that need more: unlimited lists and reminders, recurring reminders, webhooks, several people per owner. And everyone benefits: every fix and every update reaches the Free plan too.

On the Free plan or on Premium, the work of running TTM is ours. If you'd rather take it on yourself, you can, with every Premium feature unlocked: see [Rather run it yourself?](#rather-run-it-yourself) below.

## What it will cost

| | Price | Works out at |
| :--- | :--- | :--- |
| Monthly | **€5 / month** | €5 per month |
| Annual | **€36 / year** | **€3 per month** |

One price for the **whole server**, with no cost per member. The annual plan is the same product: it costs less because you pay for a whole year up front, not because it gives you more.

*Planned prices, not final until the beta ends.*

When the beta ends, we'll open a **Founder** offer for the servers that came early: a full year at roughly **half price**, as a thank-you.

## Rather run it yourself?

You can, and this is the point: **you'll never be trapped.** Join our [Discord server](/docs/community/), download the executable and its configuration, and run it on your own machine. It is free forever, with every Premium feature unlocked, and every update is published there.

**What "free forever" covers.** You can run TTM for as long as you like, at no cost, for yourself, your community or your own company. It doesn't cover offering TTM to other people as a service, or passing the executable on to someone else. The terms are in the [self-hosting licence](/license/), which you accept before you get the package: read it before you decide.

<div class="callout"><div class="callout-t">The honest maths</div>Self-hosting saves you €3 a month. For that, you pay for a server, which costs about as much or more unless you already have one. You keep a database running and backed up. At every update you stop the bot, download the new release, update its configuration if needed and start it again. And when the bot breaks at night, you are the one who fixes it.<br><br>For €3 a month, under 10 cents a day, we do all of that for you, and every update reaches you the moment it ships. Now that you know the trade-offs, the choice is yours.</div>

## Questions?

Join the [Discord](/docs/community/) and ask us anything about pricing, the limits or self-hosting.
