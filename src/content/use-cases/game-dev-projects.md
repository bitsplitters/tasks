---
title: Ship your game with the team you already talk to
seoTitle: Discord Project Management Bot for Game Dev Teams
name: Game dev projects
description: "Three developers and their testers, one milestone at a time: a hand-over when someone falls ill, the playtest build started on GitHub Actions by a tick, and the testers' ping on playtest day."
highlights: "A milestone per group, a task taken from someone else, a reminder that follows its new owner, a webhook that starts a GitHub Actions build, the weekly meeting in the Activity."
intro: |
  Ava, Leo and Sam make **Lantern Keep**, a small roguelike, in their evenings. Ava writes the code, Leo draws, Sam makes the music. Five players from their community test every build. The list has lived in #dev since the project started; this is the week of Monday 7 to Sunday 13 December 2026, with a playtest on Friday.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Code. She leads the project." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "Art." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Music and sound. Ill this week." }
  roles:
    - { id: "11849044175622001", name: Testers, about: "Five players from the community." }
  channels:
    - { id: "11849044175623001", name: dev, about: "The team's channel; the testers can read it. The list lives here." }
    - { id: "11849044175623002", name: devlog, about: "Where the players read the news of the game." }
    - { id: "11849044175623003", name: playtest, about: "Where the testers report bugs." }
list:
  title: "Lantern Keep: 0.4 and 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Each milestone is a group, with a blank line around it. What's done fades, so what's left of 0.4 stands out: the playtest. «Mix the trailer music» now belongs to Ava, with its reminder. The webhook of «Build the playtest version» doesn't show; `{{version=0.4.0}}` does, and the build read it.
  text: |
    - [] Milestone 0.4: the playtest
     - [X] <@11849044175621001>: Fishing: cast, wait, reel in
     - [X] <@11849044175621002>: Sprites for the six fish
     - [X] <@11849044175621001>: Fix the bugs from the last playtest, in [the testers' report](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Playtest build}} <@11849044175621001>: Build the playtest version {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest at 6 PM, then report in <#11849044175623003>
    - [] Milestone 0.5: the trailer
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Mix the trailer music
     - [] <@11849044175621002>: Capture the gameplay clips
     - [] <@11849044175621003>: Sound effects for the fishing
     - [] <@11849044175621002>: Cut the trailer, 45 seconds
    - [] <@11849044175621001>: Plan milestone 0.6 in the [design doc](https://docs.google.com/document/d/1lantern-keep-design/edit)
    - [] <@11849044175621001>: Post the devlog in <#11849044175623002>
webhooks:
  - name: Playtest build
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <your token>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      The workflow that builds the game starts with `workflow_dispatch`, and declares the two inputs the body sends. It must be on the repository's default branch:

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      The steps then read `${{ inputs.version }}`. The token goes in the `Authorization` header. Ava creates a *fine-grained* personal access token in *GitHub → Settings → Developer settings*, limited to this one repository, with only the *Actions* permission, in read and write. A leaked token can start a build and nothing else.

      The trigger is the completion only: reopening the task by mistake doesn't start a second build.
settings:
  - setting: Completed tasks dimmed
    choice: On
    why: "The done parts of a milestone fade, and what's left stands out."
  - setting: Space around groups
    choice: On
    why: "Every milestone is a group: a blank line shows where one ends and the next begins."
week:
  - at: 2026-12-07T20:00
    text: "Ava adds milestone 0.5 with **Bulk update** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />: the trailer, in four tasks, each with its owner."
  - at: 2026-12-08T09:15
    text: "Sam is ill for the week, and the trailer music is due on Saturday. Ava **takes** «Mix the trailer music» from him: she presses **Owner**, chooses herself in the menu, confirms, then picks the task. Picking the task alone wouldn't do: replacing an owner takes an explicit choice. The notification names Sam and mentions nobody, because Ava knows. The task's reminder now goes to her."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "The weekly meeting, on a voice call. Ava opens the list with **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, and Leo joins with **Join the Activity**. With **Edit the list** they move the bug fixes before the build, and add the link to the testers' report. While she edits, the whole list is locked for Leo: the boxes come back when she saves."
  - at: 2026-12-10T18:30
    text: "The bugs are fixed. Ava ticks «Build the playtest version», and the webhook starts the build on GitHub Actions, with the version written in the task."
    card: { kind: webhook, webhook: Playtest build, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "The testers' reminder arrives in #dev, as a reply to the list, and mentions @Testers. Any of them can tick the playtest once they've played and reported."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "The reminder of the trailer music reaches Ava by direct message, not Sam: a reminder follows the owner of its task."
    card: { kind: reminder, task: "2.1" }
---

## Next time

When 0.4 is done, Ava presses **Clean**: the finished milestone goes, with its subtasks, and 0.5 moves up. With **Bulk update** she writes 0.6 under it, from the design doc. The webhook stays on the server: she links it to the next build task with **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, or writes `{{wb=Playtest build}}` and `{{version=0.5.0}}` in the text. See [Clean](/docs/list-actions/#clean).

## What TTM doesn't do here

TTM isn't an issue tracker. It doesn't read your repository, close issues or show a burndown: GitHub, GitLab and Jira do that. It starts the build, and doesn't wait for its result. If the team wants the result in Discord, the workflow can post it to a channel with a Discord webhook of its own.

## Questions

### Why didn't Ava just pick the task to take it?

Picking a task with nothing chosen takes it only when it's free. A task someone else owns stays theirs, and TTM says why. To replace an owner, you choose the new one in the menu first. See [Owner](/docs/channel-tasks/#owner).

### Does reopening the task start another build?

No. The webhook was created with `trigger:completion`, so only the completion fires it. Without a trigger, it would fire on both. See [When a webhook fires](/docs/webhooks/#when-a-webhook-fires).

### Can a tester tick the playtest?

Yes: the task belongs to @Testers, so any member of the role can tick it. Ava can too, with *Manage messages* on the channel. See [Who can tick a task](/docs/core-concepts/#who-can-tick-a-task).
