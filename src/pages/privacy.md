---
layout: ../layouts/Legal.astro
title: Privacy Policy
description: What data the Team Tasks Manager Discord bot collects, why, and how it is handled.
updated: "Last updated: 24 September 2026"
---

This Privacy Policy explains what data the **Team Tasks Manager** bot ("TTM") collects and how we handle it. It applies to the use of the bot on Discord. For your rights under EU data-protection law, see also our [GDPR page](/gdpr/).

## Who we are

The data controller is **bitsplitters** — Alessandro Vurro, Via di Dragone 478/B, 00126 Rome (RM), Italy. Italian VAT no. 18349651002, certified email (PEC): alessandro.vurro@pec.it. Contact: **info@bitsplitters.app**.

## What we collect

TTM only stores what is needed to run task lists inside your server:

- **Discord identifiers** — server (guild), channel, and message IDs; user and role IDs when you assign an owner, add a tag, or configure permissions.
- **Task content you create** — list titles and task text, including anything you type into them (mentions, links, notes).
- **Reminders** — dates, intervals, repetitions and the time zone set for the server.
- **Your personal time zone** — the time zone you pick while creating a reminder, stored against your Discord user ID and reused across servers.
- **Your direct-message channel** — when you own a task, its reminders reach you by direct message, so the bot keeps the ID of its direct-message channel with you, to deliver them with a single request to Discord. If you don't accept direct messages, it also keeps until when not to try again (six hours after the failed attempt). Both are stored against your Discord user ID, like the time zone; the messages themselves are not stored.
- **Roles TTM creates** — when a task is given to several people, TTM creates a role and keeps its ID, the name it gave it, the user IDs of the people it gave it to, who asked for it and when: to show those people when the task is edited, and to delete the role when no list uses it any more.
- **Configuration** — per-server settings such as notification mode, history logging, push option and time zone.
- **Webhooks** — the HTTP method, URL, headers and body you define, and their association to tasks.
- **Activity logs** — records of actions performed on lists (who did what, and when), when history logging is enabled.
- **Aggregate usage statistics** — non-identifying counters used to understand overall usage of the bot.

## What we do NOT collect

- We do **not** read or store your general Discord messages or direct messages (the bot uses no privileged "message content" access).
- We do **not** collect email addresses, passwords, or payment information.

## Why we use it

We process this data solely to **provide the service**: rendering and updating your lists, sending reminders and notifications, running the webhooks you configure, and maintaining and improving the bot (via aggregate statistics).

## Sharing

We do **not** sell your data. Data is processed by our infrastructure provider **OVHcloud**, which hosts the bot and its database in **France (EU)**, acting as a processor on our behalf. The bot also runs on the **Discord** platform, so your use is subject to [Discord's Privacy Policy](https://discord.com/privacy). When you use webhooks, TTM sends the data you configured to the **third-party endpoints you choose** — those services are outside our control.

## Retention

Data is kept while the bot is present and in use in your server.

**When the bot is removed from a server** we delete its content and operational data: task lists and their tasks, tags, reminders and scheduled reminder events, webhooks and their actions, the activity history, and the records of the roles TTM created — the roles themselves stay in the server, which manages them from then on.

**What we keep** is the minimum needed to run the service and to measure its adoption: the server ID together with the settings configured for it, the dates the bot joined and left, the command-permission settings, subscription records where applicable, and non-identifying usage counters. **No task content is kept.**

**Operational logs** — to diagnose faults, the bot writes technical logs on the server where it runs. At the logging level used in production these do **not** contain the text of your tasks or your list titles; they can contain Discord identifiers, for example the user ID involved in an error. Logs are deleted automatically after **30 days**.

**Your personal time zone and direct-message channel** — the time zone you set while creating a reminder, and the ID of your direct-message channel with the bot (with, if you don't accept direct messages, until when not to try again), are stored against your Discord user ID and are not tied to any single server, so removing the bot from a server does not delete them. Write to **info@bitsplitters.app** with your Discord user ID and we will delete them.

**You can delete a single list yourself**, without asking us: the **Delete list** button in the list's *More* panel, or `/config lists` when the list's message is no longer there. Deletion is immediate and permanent, and it takes the list's tasks, owners, tags, reminders and activity history with it.

**Seal list**, in the same panel, also removes the list's data from TTM, but leaves its message — and its timeline thread — in the channel as ordinary Discord messages, under your server's control. The roles TTM created for that list stay too, and TTM forgets them.

**A role TTM created** is forgotten — its record and the people it was given to — once no list uses it any more, as owner or as tag: if the role is still as TTM left it (the same name, no permissions, the same number of members), TTM also deletes it from the server; otherwise it leaves it to your server. TTM also forgets the roles of a list when you seal it, and all of them when the bot is removed from the server.

You can request deletion at any time (see [GDPR](/gdpr/)); we may also delete data earlier.

## Security

We apply reasonable technical and organizational measures to protect the data. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.

## Children

TTM is not directed to anyone below Discord's minimum age requirement.

## Changes

We may update this policy; the "Last updated" date reflects the latest version.

## Contact

**info@bitsplitters.app**
