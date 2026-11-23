---
title: "Webhooks"
description: "Déclenche un appel HTTP quand une tâche est terminée ou rouverte : connecte TTM à n'importe quoi."
fonte: 1b865a3d554e
---

Les webhooks permettent à une tâche de parler avec le monde extérieur. Associes-en un à une tâche : quand cette tâche est **terminée** ou **rouverte**, TTM envoie une requête HTTP. Elle peut aller vers un système de CI, un chat, une automatisation de tableur, ou tout ce qui accepte un appel.

Les personnes qui gèrent le serveur créent les webhooks avec [/config webhook](/docs/config-webhook/) : l'adresse, la méthode, ce que l'appel envoie. Ensuite, tu les associes aux tâches avec le bouton **Webhook**.

Les webhooks sont une fonctionnalité [Premium](/docs/premium/).

<div class="howto" id="how-to-do-it"><div class="howto-t">Comment faire</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</span><span class="howto-d">Webhook, dans la deuxième rangée sous la liste : choisis le webhook, puis la tâche.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Dans l'Activity</span><span class="howto-d">Webhook, dans le panneau d'une tâche : les webhooks du serveur par nom.</span></a></div></div>

## Associer un webhook à une tâche

Un nouveau webhook n'est encore associé à rien. Tu l'associes à une tâche avec **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> : en bleu pour l'associer, en rouge pour le détacher.

À partir de là, terminer ou rouvrir cette tâche déclenche l'appel.

## Quand un webhook se déclenche

Un webhook se déclenche quand sa tâche est **terminée ou rouverte**, par un cochage ou par **Tout rouvrir**. Dans le salon, tu coches avec le menu de cochage, le menu déroulant sous la liste. Dans l'Activity, tu coches la case de la tâche.

- **Chaque tâche qui change** déclenche son webhook : celle que tu as choisie, et celles qui changent avec elle. Ce sont les sous-tâches cochées en cascade, ou un groupe terminé par sa dernière sous-tâche. Une sous-tâche déjà cochée ne change pas, donc elle ne déclenche rien.
- Les appels partent **l'un après l'autre**, dans l'ordre de la liste. Le cochage entier compte comme **un seul clic**, quel que soit le nombre de tâches qu'il change.
- **Tout rouvrir** déclenche les webhooks de réouverture des tâches qu'il rouvre.
- **Mise à jour groupée** et **Modifier la liste** changent beaucoup de tâches d'un coup, et ne déclenchent **aucun** webhook.
- **La liste doit être utilisée**, c'est-à-dire occuper l'une des places de ton offre : voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work).

Une liste créée pendant la bêta fait exception : ses tâches peuvent encore être cochées sans compter dans la limite des trois listes. Tant que la liste ne devient pas l'une des trois utilisées, leurs webhooks restent muets, et TTM te le dit en privé.

## Quand un webhook échoue

Si l'appel n'atteint pas sa destination, TTM écrit un avertissement dans le salon de la liste. Il nomme le webhook et la tâche, puis explique l'erreur en une phrase. Il dit aussi quoi vérifier : l'adresse, les headers, la méthode, ou le serveur que tu appelles.

Quand le même webhook est sur plusieurs tâches qui changent ensemble, tu reçois un seul avertissement, pas un par tâche.

Si les notifications sont désactivées sur le serveur, ou si TTM ne peut pas écrire dans ce salon, l'avertissement n'arrive qu'à la personne qui a coché la tâche. Dans l'Activity, l'avertissement arrive à la personne qui a coché la tâche, dans une bulle sur sa case.

## Le webhook dans le texte

L'association vit dans la tâche elle-même, sous la forme du jeton réservé `{{wb=…}}`. Tu le vois dans **Mise à jour groupée** et dans **Modifier la liste** : voir [Les webhooks dans le texte](/docs/writing-a-list/#webhooks-in-the-text).

Le formulaire **Contenu** d'une seule tâche n'affiche pas le jeton, et retire celui que tu y écris, en te le disant.

Le texte d'une tâche peut aussi porter des **variables libres** : écris `{{clé=valeur}}` n'importe où dedans, et le webhook peut utiliser `{{clé}}`. Ainsi, un seul webhook peut envoyer des valeurs différentes pour chaque tâche. Voir [Jetons](/docs/config-webhook/#tokens).
