---
title: Livre ton jeu avec l'équipe à qui tu parles déjà
seoTitle: Bot Discord de gestion de projet pour équipes de développement de jeux
name: Projets de jeux vidéo
description: "Trois développeurs et leurs testeurs, un jalon à la fois : une passation quand quelqu'un tombe malade, la build de playtest lancée sur GitHub Actions en cochant une tâche, et le ping aux testeurs le jour du playtest."
highlights: "Un jalon par groupe, une tâche reprise à quelqu'un d'autre, un rappel qui suit son nouveau propriétaire, un webhook qui lance une build GitHub Actions, la réunion hebdomadaire dans l'Activity."
intro: |
  Ava, Leo et Sam font **Lantern Keep**, un petit roguelike, pendant leurs soirées. Ava écrit le code, Leo dessine, Sam fait la musique. Cinq joueurs de leur communauté testent chaque build. La liste vit dans #dev depuis le début du projet ; voici la semaine du lundi 7 au dimanche 13 décembre 2026, avec un playtest vendredi.
order: 4
team:
  guild: Lantern Keep
  zone: Europe/Stockholm
  people:
    - { id: "11849044175621001", name: Ava, username: ava.codes, color: "#eb459e", about: "Le code. Elle dirige le projet." }
    - { id: "11849044175621002", name: Leo, username: leo.draws, color: "#3ba55c", about: "L'art." }
    - { id: "11849044175621003", name: Sam, username: sam.sound, color: "#5865f2", about: "Musique et son. Malade cette semaine." }
  roles:
    - { id: "11849044175622001", name: Testeurs, about: "Cinq joueurs de la communauté." }
  channels:
    - { id: "11849044175623001", name: dev, about: "Le salon de l'équipe ; les testeurs peuvent le lire. La liste vit ici." }
    - { id: "11849044175623002", name: devlog, about: "Là où les joueurs lisent les nouvelles du jeu." }
    - { id: "11849044175623003", name: playtest, about: "Là où les testeurs signalent les bugs." }
list:
  title: "Lantern Keep : 0.4 et 0.5"
  channel: "11849044175623001"
  at: 2026-12-10T19:00
  spaced: true
  look: |
    Chaque jalon est un groupe, avec une ligne vide autour. Ce qui est fait s'estompe, donc ce qui reste de la 0.4 ressort : le playtest. « Mixer la musique de la bande-annonce » appartient maintenant à Ava, avec son rappel. Le webhook de « Compiler la version de playtest » ne s'affiche pas, mais `{{version=0.4.0}}` oui, et la build l'a lu.
  text: |
    - [] Jalon 0.4 : le playtest
     - [X] <@11849044175621001>: Pêche : lancer, attendre, ramener
     - [X] <@11849044175621002>: Sprites des six poissons
     - [X] <@11849044175621001>: Corriger les bugs du dernier playtest, dans [le rapport des testeurs](https://discord.com/channels/1184904417562000000/11849044175623003/1184904417562399001)
     - [X] {{wb=Build de playtest}} <@11849044175621001>: Compiler la version de playtest {{version=0.4.0}}
     - [] <t:1797008400> [0m,0m,0] <@&11849044175622001>: Playtest à 18 h, puis rapport dans <#11849044175623003>
    - [] Jalon 0.5 : la bande-annonce
     - [] <t:1797073200> [0m,0m,0] <@11849044175621001>: Mixer la musique de la bande-annonce
     - [] <@11849044175621002>: Capturer les extraits de gameplay
     - [] <@11849044175621003>: Effets sonores de la pêche
     - [] <@11849044175621002>: Monter la bande-annonce, 45 secondes
    - [] <@11849044175621001>: Planifier le jalon 0.6 dans le [document de conception](https://docs.google.com/document/d/1lantern-keep-design/edit)
    - [] <@11849044175621001>: Publier le devlog dans <#11849044175623002>
webhooks:
  - name: Build de playtest
    service: github
    trigger: completion
    method: POST
    url: https://api.github.com/repos/lantern-keep/game/actions/workflows/playtest.yml/dispatches
    headers: |
      Accept: application/vnd.github+json
      Authorization: Bearer <ton jeton>
      X-GitHub-Api-Version: 2026-03-10
      Content-Type: application/json
    body: |
      {"ref": "main", "inputs": {"version": "{{version}}", "requested_by": "{{user}}"}}
    setup: |
      Le workflow qui compile le jeu commence par `workflow_dispatch`, et déclare les deux inputs que le body envoie. Il doit se trouver sur la branche par défaut du dépôt :

      ```yaml
      on:
        workflow_dispatch:
          inputs:
            version:
              required: true
            requested_by:
              required: false
      ```

      Les étapes lisent ensuite `${{ inputs.version }}`. Le jeton va dans le header `Authorization`. Ava crée un jeton d'accès personnel *fine-grained* dans *GitHub → Settings → Developer settings*, limité à ce seul dépôt, avec seulement la permission *Actions*, en lecture et écriture. Un jeton qui fuite peut lancer une build, et rien d'autre.

      L'événement est seulement l'achèvement : rouvrir la tâche par erreur ne lance pas une deuxième build.
settings:
  - setting: Tâches terminées estompées
    choice: Activé
    why: "Les parties terminées d'un jalon s'estompent, et ce qui reste ressort."
  - setting: Espace autour des groupes
    choice: Activé
    why: "Chaque jalon est un groupe : une ligne vide montre où l'un finit et où le suivant commence."
week:
  - at: 2026-12-07T20:00
    text: "Ava ajoute le jalon 0.5 avec **Mise à jour groupée** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" /> : la bande-annonce, en quatre tâches. Puis elle donne à chacune son propriétaire avec **Propriétaire**, et à la musique son échéance avec **Rappel**."
  - at: 2026-12-08T09:15
    text: "Sam est malade toute la semaine, et la musique de la bande-annonce est due samedi. Ava **prend** « Mixer la musique de la bande-annonce » à Sam : elle appuie sur **Propriétaire**, se choisit dans le menu, confirme, puis choisit la tâche. Choisir seulement la tâche ne suffirait pas : remplacer un propriétaire demande un choix explicite. La notification nomme Sam et ne mentionne personne, parce qu'Ava est au courant. Le rappel de la tâche va maintenant à elle."
    card: { kind: notice, type: updated, by: "11849044175621001", from: "11849044175621003", task: "2.1" }
  - at: 2026-12-09T20:00
    text: "La réunion hebdomadaire, en appel vocal. Ava ouvre la liste avec **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, et Leo la rejoint avec **Rejoindre l'Activity**. Avec **Modifier la liste**, ils déplacent les corrections de bugs avant la build, et ajoutent le lien vers le rapport des testeurs. Pendant qu'elle modifie, toute la liste est verrouillée pour Leo : les cases reviennent quand elle enregistre."
  - at: 2026-12-10T18:30
    text: "Les bugs sont corrigés. Ava coche « Compiler la version de playtest », et le webhook lance la build sur GitHub Actions, avec la version écrite dans la tâche."
    card: { kind: webhook, webhook: Build de playtest, task: "1.4", by: "11849044175621001" }
  - at: 2026-12-11T18:00
    text: "Le rappel des testeurs arrive dans #dev, en réponse à la liste, et mentionne @Testeurs. N'importe lequel d'entre eux peut cocher le playtest une fois qu'il a joué et fait son rapport."
    card: { kind: reminder, task: "1.5" }
  - at: 2026-12-12T12:00
    text: "Le rappel de la musique de la bande-annonce arrive à Ava par message privé, pas à Sam : un rappel suit le propriétaire de sa tâche."
    card: { kind: reminder, task: "2.1" }
fonte: e78bad9b590a
---

## La prochaine fois

Quand la 0.4 est terminée, Ava appuie sur **Nettoyer la liste** : le jalon terminé part, avec ses sous-tâches, et la 0.5 remonte. Avec **Mise à jour groupée**, elle écrit la 0.6 en dessous, à partir du document de conception. Le webhook reste sur le serveur : elle l'associe à la prochaine tâche de build avec **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />, et écrit `{{version=0.5.0}}` dans son texte avec **Contenu**. Voir [Nettoyer](/docs/list-actions/#clean).

## Ce que TTM ne fait pas ici

TTM n'est pas un outil de suivi de tickets. Il ne lit pas ton dépôt, ne ferme pas les tickets et n'affiche pas de burndown : GitHub, GitLab et Jira le font. Il lance la build, et n'attend pas son résultat. Si l'équipe veut le résultat dans Discord, le workflow peut le publier dans un salon avec un webhook Discord à lui.

## Questions

### Pourquoi Ava n'a-t-elle pas simplement choisi la tâche pour la prendre ?

Choisir une tâche sans rien avoir sélectionné ne la prend que si elle est libre. Une tâche qui appartient à quelqu'un d'autre reste à cette personne, et TTM dit pourquoi. Pour remplacer un propriétaire, tu choisis d'abord le nouveau dans le menu. Voir [Propriétaire](/docs/channel-tasks/#owner).

### Rouvrir la tâche lance-t-il une autre build ?

Non. Le webhook a été créé avec `événement:achèvement`, donc seul l'achèvement le déclenche. Sans événement, il se déclencherait dans les deux cas. Voir [Quand un webhook se déclenche](/docs/webhooks/#when-a-webhook-fires).

### Un testeur peut-il cocher le playtest ?

Oui : la tâche appartient à @Testeurs, donc tout membre du rôle peut la cocher. Ava le peut aussi, avec *Gérer les messages* sur le salon. Voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).
