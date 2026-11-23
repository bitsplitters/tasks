---
title: Set up a Discord server without missing a step
seoTitle: Discord Server Setup Checklist, Step by Step
name: Server setup checklist
description: "Two people open a community server in a week: one list for roles, rules, safety and the welcome, a reminder before the opening and an announcement that posts itself."
highlights: "Owners you take or give, channel tags, a reminder by direct message, a webhook that posts the opening announcement, the Activity on opening night."
intro: |
  Ava is opening **Pixel Harbor**, a community server for pixel artists, on Saturday evening. Leo, a friend who moderates another server, is helping her. They have one week, from Monday 7 to Sunday 13 December 2026, and one list in a private channel that only the two of them can see.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Owner of the server. She creates the list." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Moderator. New to TTM." }
  roles:
    - { id: "11819044175622001", name: Admins, about: "Ava and Leo: the jobs either of them can do.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: setup, about: "Private: only Ava and Leo see it. The list lives here." }
    - { id: "11819044175623002", name: rules, about: "The rules of the server." }
    - { id: "11819044175623003", name: welcome, about: "Where new members land." }
    - { id: "11819044175623004", name: announcements, about: "Where the opening is announced." }
list:
  title: Opening Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    Ticked tasks are smaller and grey, so what's left stands out. Every task has an owner: Leo for the jobs he took or was given, Ava for hers, @Admins for those either of them can do. «Announce the opening» has its reminder, and «Open the doors» shows its webhook, which only TTM sees.
  text: |
    - [X] <@11819044175621001>: Turn on Community in Server Settings, with [Discord's guide](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Write the rules in <#11819044175623002>
    - [X] <@11819044175621002>: Set up AutoMod: spam, links and the word filter
    - [] <@11819044175621002>: Write the welcome message for <#11819044175623003>
    - [X] <@&11819044175622001>: Create the roles
     - [X] Member, Artist, Moderator
     - [X] Colours and order in the role list
    - [] <@&11819044175622001>: Set the permissions of every category
    - [] <@&11819044175622001>: Test the server with an account that has only Member
    - [] <@11819044175621002>: Pin a how-to for future mods: :owner: then a task to take it, :reminder: for a ping on the day
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Announce the opening on our socials and partner servers
    - [] {{wb=Opening post}} <@11819044175621001>: Open the doors
webhooks:
  - name: Opening post
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**{{guild}} is open!**\nStart with <#11819044175623002>, then say hi in <#11819044175623003>. We can't wait to see your art.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Open the settings of #announcements, then *Integrations → Webhooks → New Webhook*. Name it, give it the server's icon, and press **Copy Webhook URL**: that's the URL above. The URL is a password for the channel: anyone who has it can post there, so paste it only into `/config webhook`.

      The body is the message, written and checked days before the opening. `allowed_mentions` with an empty `parse` means the message pings nobody, even if someone later adds a mention to it.
settings:
  - setting: Tips
    choice: On, then Off
    why: "Leo is new to TTM: the Tutorial and the help line under the list show him where to press. Ava turns them off on Saturday night, once the server is open and he knows the buttons."
  - setting: Sync permissions
    choice: Loaded
    why: "In *Server Settings → Integrations*, only @Admins can use TTM. After the sync, a moderator added later sees the list read-only until Ava gives them the role."
week:
  - at: 2026-12-07T10:00
    text: "Ava runs `/create-list` in #setup and writes only the tasks. Then she gives the owners with **Owner**: @Admins for the jobs either of them can do, Leo for the how-to, herself for Community and «Open the doors». With **Webhook** she links «Open the doors» to Opening post."
  - at: 2026-12-07T10:20
    text: "Leo **takes** «Set up AutoMod»: he presses **Owner** until it turns blue, then picks the task without choosing anyone. The task becomes his, and the channel says who took it."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "Ava turns on Community and writes the rules with Leo. She pastes the link of #rules, copied with *Copy Link* on the channel: TTM turns it into a channel tag."
  - at: 2026-12-08T09:00
    text: "Ava **gives** «Write the welcome message» to Leo: she picks him in the menu under **Owner**, then picks the task. The notification mentions him, so Discord notifies him."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "Ava ticks the group «Create the roles». Its two subtasks are ticked with it."
  - at: 2026-12-10T22:10
    text: "Ava puts a reminder on «Announce the opening», for Friday at 6:00 PM. The task had no owner, and a reminder goes to the owner: saving it makes Ava the owner."
  - at: 2026-12-11T18:00
    text: "The reminder reaches Ava by direct message. The button under it opens the list."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "Ava opens the list with **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, the first button under it. Leo joins with **Join the Activity**. They test the server together, ticking the last tasks as they go."
  - at: 2026-12-12T18:00
    text: "Ava ticks «Open the doors». The webhook posts the announcement in #announcements, under the name and icon of the webhook."
    card: { kind: webhook, webhook: Opening post, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "Ava and Leo leave the Activity. The list goes back to #setup with a summary of what they changed, and the thread of the list records each change with who made it. Ava turns **Tips** off in `/config app`."
---

## Next time

Ava keeps the list for the next server she opens: in **More** <img class="inline-ic" src="/icons/other.png" alt="" />, **Download** <img class="inline-ic" src="/icons/download.png" alt="" /> gives her the list as a `.txt` file, written like the text above. On the new server she runs `/create-list` and attaches the file.

The roles and channels of Pixel Harbor don't exist there. TTM checks every mention before it creates anything, and lists all the ones the new server doesn't have: Ava swaps them in the file for the new ones and imports again. The file also keeps the ticks, and a reminder whose date has passed comes back without firing. So she changes `[X]` to `[]` and gives the reminder a new date with **Reminder**. See [Reuse a list anywhere](/docs/tips/#reuse-a-list-anywhere).

## What TTM doesn't do here

TTM tracks the work, and you do the setup. It doesn't create your channels, change permissions or configure AutoMod: those live in *Server Settings*. It doesn't copy a server either. For a server with the same channels and roles, Discord has its own server templates, in *Server Settings*.

## Questions

### Do I need to write the codes?

No. The buttons write them: **Owner** for the owner, **Tag** for the tags, **Reminder** for the reminder, **Webhook** for the webhook. You write only the tasks. The codes matter when you copy a list, or when you'd rather type than click: see [Editing a list by hand](/docs/writing-a-list/).

### Why did Leo get a mention and Ava didn't?

A notification mentions whoever *gets* a task from someone else, so Discord tells them. Leo got «Write the welcome message» from Ava. When he took «Set up AutoMod» himself, nobody was mentioned: he already knew. See [Owners and tags](/docs/owners-and-tags/).

### Will members see the list?

Anyone who can read its channel sees it. In a private channel, only the people with access do. To keep lists read-only for some of them, see [Sync permissions](/docs/configuration/#sync-permissions).
