---
layout: ../layouts/Legal.astro
title: Privacy Policy
description: What data the Team Tasks Manager Discord bot collects, why, and how it is handled.
updated: "Last updated: 24 November 2026"
---

This Privacy Policy explains what data the **Team Tasks Manager** bot ("TTM") collects and how we handle it. It applies to the use of the bot on Discord, its Activity included (see [The Activity](#the-activity)), to our Discord community server (see [Our community server](#our-community-server)) and to our websites (see [Our websites](#our-websites)). For your rights under EU data-protection law, see also our [GDPR page](/gdpr/).

## Who we are

The data controller is **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Rome (RM), Italy. Italian VAT no. 18349651002, certified email (PEC): alessandro.vurro@pec.it. Contact: **info@bitsplitters.app**.

## What we collect

TTM only stores what is needed to run task lists inside your server:

- **Discord identifiers** — server (guild), channel, and message IDs; user and role IDs when you assign an owner, add a tag, or configure permissions.
- **Task content you create** — list titles and task text, including anything you type into them (mentions, links, notes).
- **Reminders** — dates, intervals, repetitions and the time zone set for the server.
- **Your personal time zone** — the time zone you choose with `/my timezone` or in the gear of the [Activity](#the-activity), or, until you choose one, the one you set in place of the proposed one when you pick a date: in a reminder, in **Clone list** with reminders, or in the new date of **Reopen all**, in the channel as in the Activity. It is stored against your Discord user ID, with whether you chose it, and reused across servers. Keeping the proposed zone stores nothing, and **Back to automatic** deletes it.
- **Your direct-message channel** — when you own a task, its reminders reach you by direct message, so the bot keeps the ID of its direct-message channel with you, to deliver them with a single request to Discord. If you don't accept direct messages, it also keeps until when not to try again (six hours after the failed attempt). Both are stored against your Discord user ID, like the time zone; the messages themselves are not stored.
- **Whether you have learned the second row** — when you press **Content** or **Reminder** under a list, the bot sends you a short tip with the next step, until the first time you pick a task from the list's menu with one of them on. From then on the tip doesn't come back, in any server: for that the bot keeps your Discord user ID and when you did it, nothing else.
- **Roles TTM creates** — when a task is given to several people, TTM creates a role and keeps its ID, the name it gave it, the user IDs of the people it gave it to, who asked for it, when, and in which of the bot's languages: to show those people when the task is edited, to delete the role when no list uses it any more, and — the language — to write the notice that comes with a reminder sent to those people by direct message when TTM can't post in the list's channel.
- **Configuration** — per-server settings such as notification mode, history logging, push option and time zone.
- **Webhooks** — the HTTP method, URL, headers and body you define, and their association to tasks.
- **Activity logs** — records of actions performed on lists (who did what, and when), when history logging is enabled.
- **The Activity** — when you open a list in the Activity, TTM's window inside Discord: who you are, a key for the window, and a record of the changes until their summary is posted. See [The Activity](#the-activity).
- **Aggregate usage statistics** — counters per server: how often each feature is used and when it was last used. Also, every day, the totals of lists, tasks, reminders and webhooks, and the server's member count. Finally, for each language of the Discord app, how many interactions, people and servers there were that day: to count each person and each server only once, TTM keeps their IDs in memory for that day only and saves just the totals. None of these statistics records who did what.

## What we do NOT collect

- We do **not** read or store your general Discord messages or direct messages. The bot uses none of Discord's privileged access: not message content, not the member list, not presence.
- We do **not** collect email addresses, passwords, or payment information through the bot. If you write to us by email, we use your address only to answer you.

## Why we use it

We process this data solely to **provide the service**: rendering and updating your lists, sending reminders and notifications, running the webhooks you configure, and maintaining and improving the bot (via aggregate statistics).

## Sharing

We do **not** sell your data. Data is processed by our infrastructure provider **OVHcloud**, which hosts the bot and its database in **France (EU)**, acting as a processor on our behalf. The bot also runs on the **Discord** platform, so your use is subject to [Discord's Privacy Policy](https://discord.com/privacy). Discord is based in the United States: see [International transfers](/gdpr/#international-transfers). **Cloudflare**, also based in the United States, hosts the page of the [Activity](#the-activity) and carries its connection to the bot. When you use webhooks, TTM sends the data you configured to the **third-party endpoints you choose** — those services are outside our control.

**Error reports.** When something fails unexpectedly, the bot sends a report to a private channel on our Discord server, which only we can see. A report holds the server and user IDs involved and the technical details of the fault. It can contain a fragment of what was being processed, such as a piece of a task. We delete these reports once the fault is fixed, and within 12 months at the latest.

## Retention

Data is kept while the bot is present and in use in your server.

**When the bot is removed from a server** we delete its content and operational data: task lists and their tasks, tags, reminders and scheduled reminder events, webhooks and their actions, the activity history, the Activity's records of changes and the records of the roles TTM created — the roles themselves stay in the server, which manages them from then on.

**What we keep** is the minimum needed to run the service and to measure its adoption: the server ID together with the settings configured for it, the dates the bot joined and left, the command-permission settings, subscription records where applicable, and non-identifying usage counters. **No task content is kept.**

**Operational logs** — to diagnose faults, the bot writes technical logs on the server where it runs. At the logging level used in production these do **not** contain the text of your tasks or your list titles; they can contain Discord identifiers, for example the user ID involved in an error. Logs are deleted automatically after **30 days**.

**Backups** — we back up the database every day, to restore the service after a fault. Backups are kept for **14 days**, in the EU. Data you delete, or that we delete when the bot leaves a server, can therefore survive in a backup for up to 14 days; then it is gone for good. A backup is only ever used to restore the service.

**Your personal time zone, direct-message channel and second row** — the time zone you chose or set in place of the proposed one (**Back to automatic** deletes it yourself), the ID of your direct-message channel with the bot (with, if you don't accept direct messages, until when not to try again), and the record that you have learned the second row are stored against your Discord user ID and are not tied to any single server, so removing the bot from a server does not delete them. Write to **info@bitsplitters.app** with your Discord user ID and we will delete them. Deleting the second-row record just makes the tip come back.

**The Activity** — the key of its window lasts 24 hours, and its fingerprint is deleted within an hour of expiring. The record of the changes made there is deleted when the list goes back to the channel. See [The Activity](#the-activity).

**You can delete a single list yourself**, without asking us: the **Delete list** button in the list's *More* panel, or `/config lists` when the list's message is no longer there. Deletion is immediate and permanent, and it takes the list's tasks, owners, tags, reminders and activity history with it.

**Seal list**, in the same panel, also removes the list's data from TTM, but leaves its message — and its timeline thread — in the channel as ordinary Discord messages, under your server's control. The roles TTM created for that list stay too, and TTM forgets them.

**A role TTM created** is forgotten — its record and the people it was given to — once no list uses it any more, as owner or as tag: if the role is still as TTM left it (the same name, no permissions, the same number of members), TTM also deletes it from the server; otherwise it leaves it to your server. TTM also forgets the roles of a list when you seal it, and all of them when the bot is removed from the server.

You can request deletion at any time (see [GDPR](/gdpr/)); we may also delete data earlier.

## The Activity

The [Activity](/docs/activity/) opens a list in a window inside Discord. On top of what the bot already handles:

- **Signing in.** When you open it, you let TTM know who you are, through Discord. Discord gives TTM the basic profile of your account — your user ID, name and avatar, the language of your Discord app and a few account details, such as your badges and your Nitro type — never your email. TTM stores only your user ID and uses the language for the texts of the window and for the daily totals per language (see [What we collect](#what-we-collect)); it does not store the rest, nor the access Discord grants it.
- **Your status on Discord.** In the same window, Discord asks whether TTM may also show on your profile that you are in the Activity. If you agree, TTM sends Discord one line, *Planning tasks with the team* in your language, which your friends and the members of your servers see while you are there. It says nothing about the list, the server or the channel, and TTM stores nothing for it. If you say no, the Activity opens all the same, without the line.
- **The key of the window.** TTM gives the window a key that lasts 24 hours, so that it reconnects by itself after a restart of the bot. TTM stores only a fingerprint of the key, with your user ID, the server and channel it is for, when it was created and when it expires. Expired fingerprints are deleted within an hour.
- **The changes.** While a list is in the Activity, TTM records each change, to write the summary posted when the list goes back to the channel: who made it and when, the number and text of the task and, depending on the change, the owners, tags or people mentioned (as Discord IDs), the date of a reminder or of **Reopen all**, the name of a webhook, the text of the tasks removed by **Clean the list**. These records are deleted when the list goes back to the channel: as soon as the summary is posted, or straight away if it can't be, for example because the channel is gone. What remains is a line with no personal data — which list, the language of its summary, when it opened and closed, and why — which goes with the list.
- **Who is there.** Who is in the Activity, and who is editing what, is kept only in memory, while the list is there. To show names, TTM keeps in memory for ten minutes those it gets from Discord — of the people in the Activity and, with **Owner** and **Tag**, of the members whose name matches what you type — so as not to ask again. It does not store them.
- **The page and its connection.** The window is a page hosted by **Cloudflare, Inc.** (United States), as a processor on our behalf, which Discord loads through its own proxy. Cloudflare also carries the connection between the window and the bot to our server. What they exchange, such as the list and its changes, goes through Discord's proxy and Cloudflare's network, encrypted on every leg: each of them decrypts it to route it, as such services do. Like our websites, the page uses no cookies; unlike them, it loads no visit statistics. In your browser it keeps your settings of the page — text size, theme and spaced rows — which stay on your device and never reach TTM. It also keeps the key of the window, in the session storage that the browser empties when you close Discord, so as not to sign in again when Discord reloads it: **Exit** deletes it at once. Like any web server, Cloudflare records technical data about each request and connection, for security and to run the service. See [Cloudflare's Privacy Policy](https://www.cloudflare.com/privacypolicy/).
- **Legal basis.** Performance of the service you ask for when you open a list in the Activity (Art. 6(1)(b) GDPR).

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
