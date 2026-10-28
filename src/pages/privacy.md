---
layout: ../layouts/Legal.astro
title: Privacy Policy
description: What data the Team Tasks Manager Discord bot collects, why, and how it is handled.
updated: "Last updated: 28 October 2026"
lang: en
alt: /it/privacy/
---

This Privacy Policy explains what data the **Team Tasks Manager** bot ("TTM") collects and how we handle it. It applies to the use of the bot on Discord, to our Discord community server (see [Our community server](#our-community-server)) and to our websites (see [Our websites](#our-websites)). For your rights under EU data-protection law, see also our [GDPR page](/gdpr/).

## Who we are

The data controller is **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Rome (RM), Italy. Italian VAT no. 18349651002, certified email (PEC): alessandro.vurro@pec.it. Contact: **info@bitsplitters.app**.

## What we collect

TTM only stores what is needed to run task lists inside your server:

- **Discord identifiers** — server (guild), channel, and message IDs; user and role IDs when you assign an owner, add a tag, or configure permissions.
- **Task content you create** — list titles and task text, including anything you type into them (mentions, links, notes).
- **Reminders** — dates, intervals, repetitions and the time zone set for the server.
- **Your personal time zone** — the time zone you write in place of the proposed one when you pick a date: in a reminder, in **Clone list** with reminders, or in the new date of **Reopen all**. It is stored against your Discord user ID and reused across servers. Keeping the proposed zone stores nothing.
- **Your direct-message channel** — when you own a task, its reminders reach you by direct message, so the bot keeps the ID of its direct-message channel with you, to deliver them with a single request to Discord. If you don't accept direct messages, it also keeps until when not to try again (six hours after the failed attempt). Both are stored against your Discord user ID, like the time zone; the messages themselves are not stored.
- **Roles TTM creates** — when a task is given to several people, TTM creates a role and keeps its ID, the name it gave it, the user IDs of the people it gave it to, who asked for it and when: to show those people when the task is edited, and to delete the role when no list uses it any more.
- **Configuration** — per-server settings such as notification mode, history logging, push option and time zone.
- **Webhooks** — the HTTP method, URL, headers and body you define, and their association to tasks.
- **Activity logs** — records of actions performed on lists (who did what, and when), when history logging is enabled.
- **Aggregate usage statistics** — counters per server: how often each feature is used and when it was last used. Also, every day, the totals of lists, tasks, reminders and webhooks, and the server's member count. They never count individual users.

## What we do NOT collect

- We do **not** read or store your general Discord messages or direct messages. The bot uses none of Discord's privileged access: not message content, not the member list, not presence.
- We do **not** collect email addresses, passwords, or payment information through the bot. If you write to us by email, we use your address only to answer you.

## Why we use it

We process this data solely to **provide the service**: rendering and updating your lists, sending reminders and notifications, running the webhooks you configure, and maintaining and improving the bot (via aggregate statistics).

## Sharing

We do **not** sell your data. Data is processed by our infrastructure provider **OVHcloud**, which hosts the bot and its database in **France (EU)**, acting as a processor on our behalf. The bot also runs on the **Discord** platform, so your use is subject to [Discord's Privacy Policy](https://discord.com/privacy). Discord is based in the United States: see [International transfers](/gdpr/#international-transfers). When you use webhooks, TTM sends the data you configured to the **third-party endpoints you choose** — those services are outside our control.

**Error reports.** When something fails unexpectedly, the bot sends a report to a private channel on our Discord server, which only we can see. A report holds the server and user IDs involved and the technical details of the fault. It can contain a fragment of what was being processed, such as a piece of a task. We delete these reports once the fault is fixed, and within 12 months at the latest.

## Retention

Data is kept while the bot is present and in use in your server.

**When the bot is removed from a server** we delete its content and operational data: task lists and their tasks, tags, reminders and scheduled reminder events, webhooks and their actions, the activity history, and the records of the roles TTM created — the roles themselves stay in the server, which manages them from then on.

**What we keep** is the minimum needed to run the service and to measure its adoption: the server ID together with the settings configured for it, the dates the bot joined and left, the command-permission settings, subscription records where applicable, and non-identifying usage counters. **No task content is kept.**

**Operational logs** — to diagnose faults, the bot writes technical logs on the server where it runs. At the logging level used in production these do **not** contain the text of your tasks or your list titles; they can contain Discord identifiers, for example the user ID involved in an error. Logs are deleted automatically after **30 days**.

**Backups** — we back up the database every day, to restore the service after a fault. Backups are kept for **14 days**, in the EU. Data you delete, or that we delete when the bot leaves a server, can therefore survive in a backup for up to 14 days; then it is gone for good. A backup is only ever used to restore the service.

**Your personal time zone and direct-message channel** — the time zone you set in place of the proposed one, and the ID of your direct-message channel with the bot (with, if you don't accept direct messages, until when not to try again), are stored against your Discord user ID and are not tied to any single server, so removing the bot from a server does not delete them. Write to **info@bitsplitters.app** with your Discord user ID and we will delete them.

**You can delete a single list yourself**, without asking us: the **Delete list** button in the list's *More* panel, or `/config lists` when the list's message is no longer there. Deletion is immediate and permanent, and it takes the list's tasks, owners, tags, reminders and activity history with it.

**Seal list**, in the same panel, also removes the list's data from TTM, but leaves its message — and its timeline thread — in the channel as ordinary Discord messages, under your server's control. The roles TTM created for that list stay too, and TTM forgets them.

**A role TTM created** is forgotten — its record and the people it was given to — once no list uses it any more, as owner or as tag: if the role is still as TTM left it (the same name, no permissions, the same number of members), TTM also deletes it from the server; otherwise it leaves it to your server. TTM also forgets the roles of a list when you seal it, and all of them when the bot is removed from the server.

You can request deletion at any time (see [GDPR](/gdpr/)); we may also delete data earlier.

## Our community server

We run a Discord server for TTM users ([how to join](/docs/community/)). Joining it is optional, and it is separate from using the bot: the bot does not need it.

- **What we see.** As on any Discord server, its administrators and moderators can see your Discord username, avatar and profile as shown in the server, the roles you have there, and the messages you post in its channels. We do not copy them anywhere else, apart from the ticket transcripts described below.
- **Moderation, roles and tickets.** The server uses **MEE6**, a third-party Discord bot, to give roles (for example the member role once you accept the rules), to help moderate and to run tickets. MEE6 processes the data it needs for that under [its own privacy policy](https://mee6.xyz/privacy.html).
- **Tickets.** Ambassador applications, collaboration proposals and support requests that need privacy go through tickets: a private channel visible only to you and to the staff. When a ticket is closed, MEE6 makes a **transcript** — a copy of the messages in that ticket, with the names and Discord IDs of whoever wrote them — so we can follow up on the same request. MEE6 keeps it on its own website, where it opens only after signing in with Discord, and posts the link to it in a channel only the staff can see. We delete that link, and any copy we have downloaded, within **12 months**, or earlier if you ask us. How long MEE6 keeps its copy is up to MEE6: if you want it deleted, tell us and we will ask MEE6 to delete it.
- **Legal basis.** Our legitimate interest in running a support and discussion space for the bot, in reviewing the applications and proposals sent to us there, and in keeping it safe (Art. 6(1)(f) GDPR).

Discord remains the provider of the platform, and what it collects is governed by [Discord's Privacy Policy](https://discord.com/privacy).

## Our websites

Our websites — bitsplitters.app, tasks.bitsplitters.app and timezones.bitsplitters.app — use no cookies and store nothing in your browser.

- **Hosting.** They are hosted on **GitHub Pages**, a service of GitHub, Inc. (United States). Like any web server, GitHub records technical data about each visit, including your IP address, for security and to run the service. See [GitHub's Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement).
- **Visit statistics.** To count visits and see which sites send people to us, our pages load a script from **Cloudflare Web Analytics**, a service of Cloudflare, Inc. (United States). For each page view it records the page, the site you came from, your country, browser, operating system and type of device, and how long the page took to load. It sets no cookies, stores nothing in your browser and does not identify you: we only see totals, never individual visitors. Cloudflare receives your IP address with the request, as any web server does, and does not use it to recognise you. See [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy/).
- **The time zone map.** The map on timezones.bitsplitters.app loads its images from **OpenStreetMap**'s servers, which therefore receive your IP address. See the [OpenStreetMap Foundation's privacy policy](https://osmfoundation.org/wiki/Privacy_Policy).
- **Legal basis.** Our legitimate interest in publishing the documentation and the tools that go with the bot, and in knowing, in aggregate, how many people read them and where they come from (Art. 6(1)(f) GDPR).

## Security

We apply reasonable technical and organizational measures to protect the data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.

## Children

TTM is not directed to anyone below Discord's minimum age requirement.

## Changes

We may update this policy; the "Last updated" date reflects the latest version.

## Contact

**info@bitsplitters.app**
