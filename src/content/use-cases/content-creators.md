---
title: Plan your videos with the people who make them
seoTitle: "Discord Bot for Content Creators: Your Video Pipeline"
name: Content creators
description: "A video a week with an editor and a thumbnail artist: a deadline reminder that follows the work when someone is away, the mods' ping before the premiere and the new video announced by a webhook."
highlights: "Tasks given to someone else, a reminder that follows its new owner, a review owned by two people, a mailto link, a webhook that announces the video, Clone for the next video."
intro: |
  Mia makes a video a week for her channel. Leo edits, Sam draws the thumbnails, and the server's mods run the chat during the premiere. This week's video is about a tiny desk she built in a weekend. The list lives in #production, from Monday 7 to Sunday 13 December 2026, with the premiere on Saturday at 6 PM.
order: 6
team:
  guild: Mia Makes
  zone: America/Toronto
  people:
    - { id: "11869044175621001", name: Mia, username: mia.makes, color: "#f0b232", about: "Creator. She writes the list." }
    - { id: "11869044175621002", name: Leo, username: leo.edits, color: "#3ba55c", about: "Editor. Away from Tuesday to Thursday." }
    - { id: "11869044175621003", name: Sam, username: sam.thumbs, color: "#5865f2", about: "Thumbnails. He edits too." }
  roles:
    - { id: "11869044175622001", name: Mods, about: "Four moderators of the server." }
    - { id: "11869044175622002", name: TTM1, about: "Created by TTM for the final review, owned by Leo and Sam.", members: ["11869044175621002", "11869044175621003"], ttm: true }
  channels:
    - { id: "11869044175623001", name: production, about: "The team and the mods. The list lives here." }
    - { id: "11869044175623002", name: announcements, about: "Where the members hear about new videos." }
list:
  title: "Episode 42: the tiny desk"
  channel: "11869044175623001"
  at: 2026-12-11T20:00
  look: |
    Friday evening: the video is ready. The first cut and the colour pass belong to Sam now, with the cut's reminder. «Final review» belongs to TTM1, the role TTM created for Leo and Sam. The video's link waits in `{{video=…}}`, for the webhook to read on Saturday.
  text: |
    - [X] <@11869044175621001>: Write the [script](https://docs.google.com/document/d/1tiny-desk-script/edit)
    - [X] <@11869044175621001>: Film the build, both cameras
    - [X] <@11869044175621001>: [Ask the sponsor to approve the ad read](mailto:partners@example.com?subject=Episode%2042%20ad%20read)
    - [X] <t:1796922000> [0m,0m,0] <@11869044175621003>: First cut, about 12 minutes
    - [X] <@11869044175621003>: Colour and sound pass
    - [X] <@11869044175621003>: Thumbnail, three options to choose from
    - [X] <@&11869044175622002>: Final review
    - [] <t:1797112800> [0m,0m,0] <@&11869044175622001>: Premiere at 6 PM: pin the link and watch the chat
    - [] {{wb=New video}} <@11869044175621001>: Publish the video {{video=https://youtu.be/tinydesk42}}
    - [] <@11869044175621001>: Reply to the first comments
webhooks:
  - name: New video
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "New video: **I built a tiny desk in a weekend**\n{{video}}", "allowed_mentions": {"parse": []}}
    postsAs: { name: Mia Makes, channel: "11869044175623002", color: "#f0b232" }
    setup: |
      Open the settings of #announcements, then *Integrations → Webhooks → New Webhook*. Name it «Mia Makes», give it the channel's picture and press **Copy Webhook URL**: that's the URL above. Keep it secret, like a password.

      The link comes from the task: `{{video}}` reads the free variable `{{video=…}}`. Mia writes the link with **Content** once YouTube gives it to her, before the premiere. Next week she changes the title in the body with `/config webhook action:modify`, or moves it into the task too, as `{{title=…}}`.
settings:
  - setting: Tips
    choice: Off
    why: "The team knows the buttons. Without the Tutorial and the help line, the list is shorter."
  - setting: Readable push notifications
    choice: On
    why: "Sam reads the reminders on his phone. The push shows the task, not an empty card."
  - setting: Completed tasks dimmed
    choice: On
    why: "By Friday most of the list is done. The ticked tasks fade, and the premiere stands out."
week:
  - at: 2026-12-07T10:00
    text: "Mia runs `/create-list` in #production and writes the week's tasks. Then she gives each its owner with **Owner**: the notifications mention Leo, Sam and @Mods, so each of them knows what's theirs. **Reminder** sets the cut's deadline and the premiere's ping, and **Webhook** links «Publish the video» to New video. The sponsor link opens a new email, with the subject already written."
  - at: 2026-12-07T10:30
    text: "Mia gives «Final review» to Leo and Sam together: she picks both in the menu under **Owner**. TTM creates the role **TTM1** for them and makes it the owner. An owner of several people is a [Premium](/premium/) feature, unlocked for every server during the beta."
  - at: 2026-12-08T09:00
    text: "Leo is away until Thursday evening. Mia **gives** his two tasks to Sam: she picks Sam in the menu under **Owner**, confirms, then picks «First cut». She does it again for the colour pass. The notification names Leo and mentions Sam, so Discord notifies him."
    card: { kind: notice, type: updated, by: "11869044175621001", from: "11869044175621002", task: "4" }
  - at: 2026-12-10T12:00
    text: "The deadline of the first cut reaches Sam by direct message. It doesn't go to Leo any more: a reminder follows the owner of its task."
    card: { kind: reminder, task: "4" }
  - at: 2026-12-10T16:30
    text: "Sam finishes the cut and ticks it."
  - at: 2026-12-11T17:00
    text: "Leo is back. He and Sam watch the video together, and Leo ticks «Final review»: either of them can, since both have TTM1."
  - at: 2026-12-12T17:00
    text: "The premiere's reminder mentions @Mods in #production, as a reply to the list. One hour before: the reminder's date is 5 PM."
    card: { kind: reminder, task: "8" }
  - at: 2026-12-12T18:00
    text: "The premiere starts. Mia ticks «Publish the video», and the webhook posts the link in #announcements."
    card: { kind: webhook, webhook: New video, task: "9", by: "11869044175621001" }
---

## Next time

After this video, Mia opens **More** <img class="inline-ic" src="/icons/other.png" alt="" /> and presses **Clone**: the same channel, without the ticks and without the reminders. With **Bulk update** she changes the title, the tasks and the links, and removes the old video's `{{video=…}}`. Then she gives the new dates with **Reminder**. See [Clone](/docs/list-actions/#clone).

The clone keeps TTM1 as the owner of «Final review», so the role stays even if Mia deletes the old list: TTM deletes it only once no list uses it.

## What TTM doesn't do here

TTM doesn't upload, schedule or edit videos, and it doesn't read your channel's analytics. It doesn't store files: the cut and the thumbnails live in your cloud drive, and the list links to them. TTM keeps the work of the week, the deadlines and the people.

## Questions

### What if Mia had removed Leo instead of giving his tasks to Sam?

The reminder would have gone with him: a reminder without an owner reaches nobody. If it hasn't fired yet, TTM asks first, and you can close the window to keep everything. See [Owner](/docs/channel-tasks/#owner).

### Why did Sam get a mention and Mia didn't?

A notification mentions whoever gets a task from someone else. Sam got Leo's tasks from Mia. Whoever acts is never mentioned: they already know. See [Owners and tags](/docs/owners-and-tags/).

### Can the premiere's reminder come earlier, or twice?

The reminder comes at the date you give it, so one hour before means 5 PM. To ping the mods twice, an hour before and ten minutes before, make it repeat: from 5 PM, every 50 minutes, two times in all. Repeating reminders are a [Premium](/premium/) feature, unlocked for every server during the beta. See [Repeating reminders](/docs/reminders/#repeating-reminders).
