---
title: Configure un serveur Discord sans oublier une étape
seoTitle: Checklist de configuration d'un serveur Discord, étape par étape
name: Checklist de configuration du serveur
description: "Deux personnes ouvrent un serveur communautaire en une semaine : une liste pour les rôles, les règles, la sécurité et l'accueil, un rappel avant l'ouverture et une annonce qui se publie toute seule."
highlights: "Des propriétaires qu'on prend ou qu'on donne, des tags de salons, un rappel par message privé, un webhook qui publie l'annonce d'ouverture, l'Activity le soir de l'ouverture."
intro: |
  Ava ouvre **Pixel Harbor**, un serveur communautaire pour pixel artists, samedi soir. Leo, un ami qui modère un autre serveur, l'aide. Ils ont une semaine, du lundi 7 au dimanche 13 décembre 2026, et une liste dans un salon privé que seuls eux deux peuvent voir.
order: 1
team:
  guild: Pixel Harbor
  zone: Europe/Berlin
  people:
    - { id: "11819044175621001", name: Ava, username: ava.pixels, color: "#eb459e", about: "Propriétaire du serveur. Elle crée la liste." }
    - { id: "11819044175621002", name: Leo, username: leo.mod, color: "#3ba55c", about: "Modérateur. Nouveau dans TTM." }
  roles:
    - { id: "11819044175622001", name: Administrateurs, about: "Ava et Leo : les tâches que l'un ou l'autre peut faire.", members: ["11819044175621001", "11819044175621002"] }
  channels:
    - { id: "11819044175623001", name: setup, about: "Privé : seuls Ava et Leo le voient. La liste vit ici." }
    - { id: "11819044175623002", name: règles, about: "Les règles du serveur." }
    - { id: "11819044175623003", name: bienvenue, about: "Là où arrivent les nouveaux membres." }
    - { id: "11819044175623004", name: annonces, about: "Là où l'ouverture est annoncée." }
list:
  title: Ouverture de Pixel Harbor
  channel: "11819044175623001"
  at: 2026-12-11T12:00
  tips: true
  look: |
    Les tâches cochées sont plus petites et grises, donc ce qui reste ressort. Chaque tâche a un propriétaire : Leo pour celles qu'il a prises ou reçues, Ava pour les siennes, @Administrateurs pour celles que l'un ou l'autre peut faire. « Annoncer l'ouverture » a son rappel, et « Ouvrir les portes » montre son webhook, que seul TTM voit.
  text: |
    - [X] <@11819044175621001>: Activer Communauté dans les paramètres du serveur, avec le [guide de Discord](https://support.discord.com/hc/en-us/articles/360047132851)
    - [X] <@&11819044175622001>: Écrire les règles dans <#11819044175623002>
    - [X] <@11819044175621002>: Configurer AutoMod : spam, liens et filtre de mots
    - [] <@11819044175621002>: Écrire le message de bienvenue pour <#11819044175623003>
    - [X] <@&11819044175622001>: Créer les rôles
     - [X] Membre, Artiste, Modérateur
     - [X] Couleurs et ordre dans la liste des rôles
    - [] <@&11819044175622001>: Régler les permissions de chaque catégorie
    - [] <@&11819044175622001>: Tester le serveur avec un compte qui n'a que Membre
    - [] <@11819044175621002>: Épingler un mode d'emploi pour les futurs modérateurs : :owner: puis une tâche à prendre, :reminder: pour un ping le jour J
    - [] <t:1797008400> [0m,0m,0] <@11819044175621001>: Annoncer l'ouverture sur nos réseaux et les serveurs partenaires
    - [] {{wb=Post d'ouverture}} <@11819044175621001>: Ouvrir les portes
webhooks:
  - name: Post d'ouverture
    service: discord
    trigger: completion
    method: POST
    url: https://discord.com/api/webhooks/<id>/<token>
    headers: "Content-Type: application/json"
    body: |
      {"content": "**{{guild}} est ouvert !**\nCommence par <#11819044175623002>, puis dis bonjour dans <#11819044175623003>. On a hâte de voir tes créations.", "allowed_mentions": {"parse": []}}
    postsAs: { name: Pixel Harbor, channel: "11819044175623004", color: "#f0b232" }
    setup: |
      Ouvre les paramètres de #annonces, puis *Intégrations → Webhooks → Nouveau webhook*. Donne-lui un nom, mets-y l'icône du serveur et appuie sur **Copier l'URL du webhook** : c'est l'URL ci-dessus. L'URL est un mot de passe pour le salon : toute personne qui l'a peut y publier, donc colle-la seulement dans `/config webhook`.

      Le body est le message, écrit et vérifié plusieurs jours avant l'ouverture. `allowed_mentions` avec un `parse` vide signifie que le message ne mentionne personne, même si quelqu'un y ajoute plus tard une mention.
settings:
  - setting: Astuces
    choice: Activées, puis désactivées
    why: "Leo est nouveau dans TTM : le Tutoriel et la ligne d'aide sous la liste lui montrent où appuyer. Ava les désactive samedi soir, une fois le serveur ouvert et les boutons connus de Leo."
  - setting: Synchroniser les permissions
    choice: Chargées
    why: "Dans *Paramètres du serveur → Intégrations*, seuls les @Administrateurs peuvent utiliser TTM. Après la synchronisation, un modérateur ajouté plus tard voit la liste en lecture seule jusqu'à ce qu'Ava lui donne le rôle."
week:
  - at: 2026-12-07T10:00
    text: "Ava lance `/creer-liste` dans #setup et écrit seulement les tâches. Puis elle donne les propriétaires avec **Propriétaire** : @Administrateurs pour les tâches que l'un ou l'autre peut faire, Leo pour le mode d'emploi, elle-même pour Communauté et « Ouvrir les portes ». Avec **Webhook**, elle associe « Ouvrir les portes » à Post d'ouverture."
  - at: 2026-12-07T10:20
    text: "Leo **prend** « Configurer AutoMod » : il appuie sur **Propriétaire** jusqu'à ce qu'il devienne bleu, puis choisit la tâche sans choisir personne. La tâche devient la sienne, et le salon dit qui l'a prise."
    card: { kind: notice, type: claimed, by: "11819044175621002", task: "3" }
  - at: 2026-12-07T19:40
    text: "Ava active Communauté et écrit les règles avec Leo. Elle colle le lien de #règles, copié avec *Copier le lien du salon* : TTM le transforme en tag de salon."
  - at: 2026-12-08T09:00
    text: "Ava **donne** « Écrire le message de bienvenue » à Leo : elle le choisit dans le menu sous **Propriétaire**, puis choisit la tâche. La notification le mentionne, donc Discord le prévient."
    card: { kind: notice, type: assigned, by: "11819044175621001", task: "4" }
  - at: 2026-12-09T21:00
    text: "Ava coche le groupe « Créer les rôles ». Ses deux sous-tâches sont cochées avec lui."
  - at: 2026-12-10T22:10
    text: "Ava met un rappel sur « Annoncer l'ouverture », pour vendredi à 18 h. La tâche n'avait pas de propriétaire, et un rappel va au propriétaire : l'enregistrer fait d'Ava la propriétaire."
  - at: 2026-12-11T18:00
    text: "Le rappel arrive à Ava par message privé. Le bouton qui l'accompagne ouvre la liste."
    card: { kind: reminder, task: "9" }
  - at: 2026-12-12T17:30
    text: "Ava ouvre la liste avec **Activity** <img class=\"inline-ic\" src=\"/icons/activity.png\" alt=\"\" />, le premier bouton sous la liste. Leo la rejoint avec **Rejoindre l'Activity**. Ils testent le serveur ensemble, en cochant les dernières tâches au fur et à mesure."
  - at: 2026-12-12T18:00
    text: "Ava coche « Ouvrir les portes ». Le webhook publie l'annonce dans #annonces, sous le nom et l'icône du webhook."
    card: { kind: webhook, webhook: Post d'ouverture, task: "10", by: "11819044175621001" }
  - at: 2026-12-12T18:40
    text: "Ava et Leo quittent l'Activity. La liste retourne dans #setup avec un résumé de ce qu'ils ont changé, et le fil de la liste enregistre chaque changement avec la personne qui l'a fait. Ava désactive les **Astuces** dans `/config app`."
fonte: 46fb8aa39338
---

## La prochaine fois

Ava garde la liste pour le prochain serveur qu'elle ouvrira : dans **Autre** <img class="inline-ic" src="/icons/other.png" alt="" />, **Télécharger** <img class="inline-ic" src="/icons/download.png" alt="" /> lui donne la liste sous forme de fichier `.txt`, écrit comme le texte ci-dessus. Sur le nouveau serveur, elle lance `/creer-liste` et joint le fichier.

Les rôles et les salons de Pixel Harbor n'y existent pas. TTM vérifie chaque mention avant de rien créer, et liste toutes celles que le nouveau serveur n'a pas : Ava les remplace dans le fichier par les nouvelles et importe de nouveau. Le fichier garde aussi les cases cochées, et un rappel dont la date est passée revient sans se déclencher. Donc elle change `[X]` en `[]` et donne au rappel une nouvelle date avec **Rappel**. Voir [Réutiliser une liste partout](/docs/tips/#reuse-a-list-anywhere).

## Ce que TTM ne fait pas ici

TTM suit le travail, et c'est toi qui fais la configuration. Il ne crée pas tes salons, ne change pas les permissions et ne configure pas AutoMod : tout cela vit dans les *Paramètres du serveur*. Il ne copie pas non plus un serveur. Pour un serveur avec les mêmes salons et rôles, Discord a ses propres modèles de serveur, dans les *Paramètres du serveur*.

## Questions

### Dois-je écrire les codes ?

Non. Les boutons les écrivent : **Propriétaire** pour le propriétaire, **Tag** pour les tags, **Rappel** pour le rappel, **Webhook** pour le webhook. Tu écris seulement les tâches. Les codes comptent quand tu copies une liste, ou quand tu préfères taper plutôt que cliquer : voir [Modifier une liste à la main](/docs/writing-a-list/).

### Pourquoi Leo a-t-il reçu une mention et pas Ava ?

Une notification mentionne la personne qui *reçoit* une tâche de quelqu'un d'autre, pour que Discord la prévienne. Leo a reçu « Écrire le message de bienvenue » d'Ava. Quand il a pris « Configurer AutoMod » lui-même, personne n'a été mentionné : il le savait déjà. Voir [Propriétaires et tags](/docs/owners-and-tags/).

### Les membres verront-ils la liste ?

Toute personne qui peut lire son salon la voit. Dans un salon privé, seules les personnes qui y ont accès la voient. Pour garder les listes en lecture seule pour certaines d'entre elles, voir [Synchroniser les permissions](/docs/configuration/#sync-permissions).
