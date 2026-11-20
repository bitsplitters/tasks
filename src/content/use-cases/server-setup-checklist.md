---
title: Set up a Discord server without missing a step
seoTitle: Discord Server Setup Checklist, Ready to Paste
name: Server setup checklist
description: "A checklist for a new community server: roles, channels, safety and onboarding, split among your team and ticked off as you go."
order: 1
listTitle: Server setup checklist
list: |
  - Roles and permissions
    - Create the staff roles: admin, moderator, helper
    - Keep members out of the staff channels
    - Require 2FA for moderator actions
  - Channels
    - Write the rules channel
    - Set up the welcome channel
    - Create the announcements channel
  - Safety
    - Pick a verification level
    - Turn on AutoMod for spam and banned words
    - Choose a moderation bot and test it
  - Onboarding
    - Enable Community in Server Settings
    - Set up the Onboarding questions
    - Pick the default channels for new members
  - Launch
    - Ask two friends to test the join flow
    - Post the first announcement
---

## What you get

- **Groups and subtasks** <img class="inline-ic" src="/icons/single_task.png" alt="" /> turn each part of the setup into one task, with its steps under it. Tick the last step, and the whole group is done.
- **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" /> puts a name on every group, so two admins never set up AutoMod twice.
- One list for the whole team, in the channel or in the [Activity](/docs/activity/). Everyone sees the same ticks, the moment they happen.
- **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> keeps the list as a file, so your next server starts from it.

## Recommended setup

- **Create the list in a staff-only channel.** Members don't need to watch the setup, and the notifications stay among the staff.
- **Give each group an owner** with **Owner** <img class="inline-ic" src="/icons/owner.png" alt="" />. A task with an owner can be ticked only by its owner, or by someone with *Manage messages* on the channel: see [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
- **Add a reminder to *Launch*.** Its owner gets a direct message on the day you pick: see [Reminders](/docs/reminders/).
- **When the server is live, seal the list** with **Seal list** <img class="inline-ic" src="/icons/seal.png" alt="" />, in **More**. It stays in the channel as a record, without buttons, and frees a place on your plan. Download it first if another server is coming: see [Seal](/docs/list-actions/#seal).

## Small server, big server

- **Two admins:** leave the owners out. Anyone who can use the list ticks any task, and the setup fits in an evening.
- **A team of ten or more:** one owner per group, and the [activity timeline](/docs/configuration/#history-tracking) on, so you can see who ticked what. Several people on one group? Choose them all as owner, and TTM creates a role for them. It's a Premium feature, unlocked for every server during the beta: see [Owners and tags](/docs/owners-and-tags/).

## What TTM doesn't do here

TTM tracks the work, and you do the setup. It doesn't create your channels, change permissions or configure AutoMod: those live in *Server Settings*. It doesn't copy a server either. For a server with the same channels and roles, Discord has its own server templates, in *Server Settings*.

## Questions

### Can I change the list before I create it?

Yes. The form is plain text: rename tasks, delete lines, add your own. A line that starts with `-` is a task, and two spaces before the dash make it a subtask. All the rules: [Writing a list](/docs/writing-a-list/).

### Can I add tasks once the list exists?

Yes. **Bulk update** <img class="inline-ic" src="/icons/edit.png" alt="" /> rewrites the whole list in the channel: see [Bulk update](/docs/the-task-list/#bulk-update). In the Activity, **Edit the list** does the same: see [Edit the list](/docs/activity-list/#edit-the-list).

### Can I use it on my next server?

Yes. Download your list, then attach the file to `/create-list` on the new server. Owners and tags point to people and roles of the first server: if the new one doesn't have them, TTM creates nothing and lists what's missing. For a clean start, use the file of this page again.

### Will members see the list?

Anyone who can read its channel sees it. In a staff-only channel, only the staff do. To keep lists read-only for some members, see [Sync permissions](/docs/configuration/#sync-permissions).
