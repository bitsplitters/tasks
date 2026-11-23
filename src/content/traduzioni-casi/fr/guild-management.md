---
title: Prépare ta guilde pour la soirée raid
seoTitle: "Bot Discord de gestion de guilde : soirées raid et tâches de clan"
name: Guildes et clans
description: "La semaine d'une guilde autour de la soirée raid : un rappel qui se répète chaque mercredi pendant des mois, les essais des recrues pris à la suite, et une feuille de roster qui se remplit toute seule via Make et Google Sheets."
highlights: "Un rappel récurrent en jours, des essais pris les uns après les autres, un webhook vers Make et Google Sheets, des variables libres, Tout rouvrir avec une nouvelle date."
intro: |
  Ava dirige **Ember Vanguard**, une guilde de raid d'une soixantaine de joueurs. Leo mène les raids, chaque mercredi à 20 h. Les officiers recrutent, et chaque recrue fait un raid d'essai avant de rejoindre la guilde. Les membres jouent des deux côtés de l'Atlantique. Voici la semaine de la guilde, du lundi 7 au dimanche 13 décembre 2026.
order: 5
team:
  guild: Ember Vanguard
  zone: America/Chicago
  people:
    - { id: "11859044175621001", name: Ava, username: ava.ember, color: "#eb459e", about: "Cheffe de guilde. Elle écrit la liste." }
    - { id: "11859044175621002", name: Leo, username: leo.raids, color: "#3ba55c", about: "Chef de raid, et officier." }
    - { id: "11859044175621003", name: Kai, username: kai.ember, color: "#1abc9c", about: "Officier." }
  roles:
    - { id: "11859044175622001", name: Officiers, about: "Ava, Leo, Kai et deux autres." }
    - { id: "11859044175622002", name: Raiders, about: "L'équipe de raid, une trentaine de joueurs." }
  channels:
    - { id: "11859044175623001", name: raids, about: "Là où parlent les raiders. La liste vit ici." }
    - { id: "11859044175623002", name: officiers, about: "Privé pour les officiers." }
list:
  title: "Ember Vanguard : la semaine"
  channel: "11859044175623001"
  at: 2026-12-10T22:00
  look: |
    Le rappel du raid affiche `↻7d ×16` : chaque mercredi jusqu'à fin mars. Les trois essais portent le nom et la classe de la recrue comme variables libres ; leur webhook ne s'affiche pas. « Réapprovisionner la banque de guilde » a un seul rappel, qui se déplace chaque semaine.
  text: |
    - [] <t:1796866200> [0m,7d,15] <@&11859044175622002>: Soirée raid à 20 h : en vocal à 19 h 45, avec nourriture et potions
    - [X] <t:1796857200> [0m,0m,0] <@&11859044175622001>: Réapprovisionner la banque de guilde avant le raid
    - [X] <@11859044175621002>: Publier le roster du raid
    - [X] <@&11859044175622001>: Examiner les candidatures de la semaine
    - [X] {{wb=Feuille de roster}} <@11859044175621002>: Raid d'essai : Mirel, {{class=healer}} {{recruit=Mirel}}
    - [X] {{wb=Feuille de roster}} <@11859044175621002>: Raid d'essai : Thorn, {{class=tank}} {{recruit=Thorn}}
    - [] {{wb=Feuille de roster}} <@11859044175621002>: Raid d'essai : Vesk, {{class=mage}} {{recruit=Vesk}}
    - [] <@&11859044175622001>: Répondre à chaque candidat, accepté ou non
    - [] <@11859044175621001>: Planifier l'événement de fin d'année de la guilde
webhooks:
  - name: Feuille de roster
    service: make
    trigger: both
    method: POST
    url: https://hook.us1.make.com/<id>
    headers: "Content-Type: application/json"
    body: |
      {"recruit": "{{recruit}}", "class": "{{class}}", "officer": "{{user}}", "state": "{{state}}", "when": "{{when}}", "list": "{{list}}"}
    setup: |
      Dans Make, Ava crée un scénario à deux modules. Le premier est *Webhooks → Custom webhook* : Make génère son URL, celle ci-dessus, et elle la colle dans `/config webhook`. Le second est *Google Sheets → Add a row*, sur la feuille de roster de la guilde.

      Make apprend la forme des données à partir d'une première requête. Ava appuie sur **Run once** dans le scénario, associe le webhook à une tâche de test et la coche. Maintenant, les champs `recruit`, `class`, `officer`, `state` et `when` peuvent être reliés aux colonnes de la feuille. Make désactive un webhook qui n'a pas de scénario pendant cinq jours, donc le scénario passe en premier.

      Sans événement, le webhook se déclenche dans les deux sens. Un essai coché par erreur puis rouvert ajoute une deuxième ligne, avec `reopened` dans la colonne d'état : la feuille garde les deux.
settings:
  - setting: Conserver l'état après la sélection
    choice: Activé
    why: "Leo prend trois essais à la suite : **Propriétaire** reste bleu après chacun."
  - setting: Mode de notification
    choice: Supprimer toutes les notifications sauf les deux dernières
    why: "#raids est très actif. Les deux dernières notifications restent sous la liste, et les plus anciennes partent."
  - setting: Fuseau horaire
    choice: America/Chicago
    why: "Le raid est à 20 h, heure de Chicago. Discord affiche l'heure dans le fuseau de chaque lecteur, donc un raider à Lisbonne lit 2 h du matin."
  - setting: Rappels récurrents
    choice: Récurrents activés
    premium: true
    why: "Un seul rappel pour chaque raid jusqu'à fin mars, au lieu d'un nouveau chaque semaine."
week:
  - at: 2026-12-07T20:00
    text: "Ava ajoute trois essais avec **Mise à jour groupée** <img class=\"inline-ic\" src=\"/icons/edit.png\" alt=\"\" />, une tâche par recrue, avec le nom et la classe comme variables libres : `{{recruit=…}}` et `{{class=…}}`. Puis elle associe chaque essai à Feuille de roster avec **Webhook**."
  - at: 2026-12-08T19:00
    text: "Leo **prend** les trois essais. Il appuie sur **Propriétaire** jusqu'à ce qu'il devienne bleu, puis choisit le premier essai, le deuxième et le troisième, sans choisir personne. Avec *Conserver l'état après la sélection*, **Propriétaire** reste bleu entre eux, et chaque tâche devient la sienne."
    card: { kind: notice, type: claimed, by: "11859044175621002", task: "7" }
  - at: 2026-12-09T17:00
    text: "Le rappel des officiers mentionne @Officiers dans #raids. Kai réapprovisionne la banque de guilde et coche la tâche."
  - at: 2026-12-09T19:30
    text: "Le rappel du raid mentionne @Raiders dans #raids, en réponse à la liste. Il reviendra chaque mercredi à 19 h 30 jusqu'à fin mars."
    card: { kind: reminder, task: "1" }
  - at: 2026-12-09T22:40
    text: "L'essai de Mirel s'est bien passé. Leo coche sa tâche, et le webhook envoie à Make la ligne pour la feuille de roster."
    card: { kind: webhook, webhook: Feuille de roster, task: "5", by: "11859044175621002" }
  - at: 2026-12-10T21:30
    text: "Thorn fait un deuxième essai jeudi, avec un groupe plus petit. Leo le coche : une ligne de plus sur la feuille."
fonte: 0d0a1a51d2e4
---

## La prochaine fois

Chaque lundi, Ava remplace d'abord les essais terminés par les nouvelles recrues, avec **Mise à jour groupée**, qui ne déclenche aucun webhook. Puis elle appuie sur **Tout rouvrir** <img class="inline-ic" src="/icons/reopen.png" alt="" /> et choisit **Nouvelle date**, avec mercredi prochain à 17 h : le rappel de la banque s'y déplace. **Tout rouvrir** déclenche les webhooks des tâches qu'il rouvre : avec les essais terminés encore là, la feuille recevrait une ligne « reopened » pour chacun.

Personne ne coche le raid : cocher une tâche arrête son rappel. Le rappel du raid revient tout seul chaque mercredi. Voir [Tout rouvrir](/docs/list-actions/#reopen-all).

## Ce que TTM ne fait pas ici

TTM ne lit pas le jeu. Il n'a ni inscriptions aux raids, ni présences, ni suivi du butin, ni calendrier avec réponses : un bot de planification de raids s'en charge. TTM garde le travail de la guilde, prévient l'équipe de raid à l'heure et envoie à la feuille ce que les officiers décident.

## Questions

### Pourquoi des jours et pas des heures ?

Le 14 mars 2027, les horloges de Chicago avancent d'une heure. Ava a choisi **jours** dans le menu **Unité**, donc le rappel reste à 19 h 30 après le changement. Avec **heures**, il arriverait à 20 h 30, quand le raid a déjà commencé. Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

### Comment envoyer le propriétaire de la tâche à la feuille ?

`{{user}}` est la personne qui coche la tâche, ici Leo. Pour envoyer le propriétaire même quand un autre officier coche, écris-le dans la tâche comme variable libre, `{{owner=Leo}}`, et utilise `{{owner}}` dans le body. `{{task}}` ne porte le propriétaire que sous forme de code Discord, `<@id>`, qu'une feuille ne sait pas lire. Voir [Personnaliser les webhooks avec des variables libres](/docs/tips/#personalize-webhooks-with-free-variables).

### Un raider peut-il cocher un essai ?

Non : chaque essai appartient à Leo. Un raider qui essaie reçoit un refus que lui seul voit. Les officiers qui gèrent les messages du salon le peuvent, avec *Gérer les messages*. Voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).
