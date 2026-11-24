---
title: "Concepts de base"
description: "Une liste à deux endroits, le vocabulaire de TTM (tâches, groupes, propriétaires, tags, rappels) et les permissions qu'il demande."
fonte: 193335652dfb
---

Quelques termes reviennent dans toute l'app. Apprends-les une fois et le reste devient clair.

## Une liste, deux endroits

Une liste vit dans un message d'un salon Discord, où tout le monde la trouve. L'**Activity** ouvre la même liste dans une fenêtre à l'intérieur de Discord, où plusieurs personnes travaillent dessus ensemble et voient chaque changement en direct. C'est la même liste, pas une copie.

Une liste est à un seul endroit à la fois. Tant qu'elle est dans l'Activity, son message dans le salon ne garde que **Rejoindre l'Activity**. Quand tout le monde est parti, la liste retourne dans le salon avec un récapitulatif de ce qui a changé.

Ce qu'une liste peut faire est identique dans les deux endroits : propriétaires, tags, rappels, webhooks, les réglages de ton serveur et les limites de ton offre. Ce qui change, c'est la façon de le faire.

Dans le salon, tu utilises les menus et les boutons sous le message. Dans l'Activity, tu touches la case d'une tâche, ou son texte. Ces pages sont divisées de la même façon :

- **Fonctionnalités** : ce que fait chaque fonctionnalité et ses règles, les mêmes dans les deux endroits.
- **Dans le salon** : le message de la liste, ses menus et ses boutons.
- **Dans l'Activity** : la fenêtre, les cases et le panneau de chaque tâche.

Quelques actions n'existent que dans le salon : Cloner, Télécharger, Sceller, Supprimer, Déverrouiller et l'import depuis un fichier. Voir [Ce qui reste dans le salon](/docs/activity/#what-stays-in-the-channel).

## Tâches, sous-tâches et groupes

| Terme | Ce que c'est |
| :--- | :--- |
| **Tâche** | Une seule activité, ni une sous-tâche ni un groupe. |
| **Sous-tâche** | Une activité qui appartient à une plus grande. |
| **Groupe de tâches** | Une tâche faite de sous-tâches. |

Tu ne choisis jamais ces types dans un menu : TTM les déduit de la façon dont tu écris la liste. Une ligne qui commence par `-` est une tâche. Des espaces avant le tiret en font une sous-tâche de la ligne au-dessus. Une tâche avec des sous-tâches devient automatiquement un **groupe**. Comment les écrire : [Crée ta première liste](/docs/getting-started/#2-create-your-first-list).

Les groupes se comportent comme un tout : cocher un groupe coche aussi ses sous-tâches, et cocher toutes les sous-tâches marque le groupe comme terminé.

## État d'une tâche

Chaque tâche est soit **ouverte**, soit **terminée**, ce que montre sa case :

- **Ouverte** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> : reste à faire.
- **Terminée** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" /> : faite.

Dans le salon, tu coches ou décoches une tâche dans le [menu de cochage](/docs/the-task-list/#the-check-selector), le menu sous la liste. Dans l'Activity, tu touches sa [case](/docs/activity-list/#tick-a-task). Terminer ou rouvrir une tâche peut déclencher des notifications et des webhooks.

### Qui peut cocher une tâche

**Une tâche qui a un propriétaire ne peut être cochée ou décochée que par :**

- le propriétaire, ou les membres du rôle propriétaire ;
- toute personne qui a *Gérer les messages* sur le salon.

Toute autre personne reçoit un refus que seule elle voit, et rien ne change. La règle vaut aussi pour les sous-tâches : tu ne peux pas cocher ou décocher un groupe si cela change une sous-tâche qui appartient à quelqu'un d'autre. Toute personne qui peut utiliser la liste peut cocher une tâche sans propriétaire.

## Propriétaire ou tag

Les deux se ressemblent mais font des choses différentes :

- **Propriétaire** <img class="inline-ic" src="/icons/owner.png" alt="" /> : la personne ou le rôle *responsable* de la tâche. Une tâche n'a qu'un propriétaire, et avec Premium ce peut être plusieurs personnes : TTM crée un rôle pour elles (voir [Les rôles que TTM crée](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Tag** <img class="inline-ic" src="/icons/tag.png" alt="" /> : un ou plusieurs utilisateurs ou rôles *mentionnés* sur la tâche, par exemple les personnes à prévenir quand elle est terminée.

Les règles des deux : [Propriétaires et tags](/docs/owners-and-tags/).

## Rappels

Un **rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" /> associe un horaire à une tâche : une date, une heure et un fuseau horaire. Quand il arrive à échéance, TTM rappelle la tâche à son **propriétaire**, donc personne n'a besoin de vérifier sans cesse. Une personne reçoit un message privé, et un rôle reçoit une mention dans le salon de la liste.

Par défaut, un rappel ne sonne qu'une fois, et avec l'offre Free c'est le seul type possible. Les rappels récurrents ajoutent un intervalle et un nombre de répétitions. C'est une fonctionnalité Premium qu'un serveur active dans [/config app](/docs/configuration/#recurring-reminders). Tous les détails dans [Rappels](/docs/reminders/).

## Notifications et historique

Quand une liste est créée, ou qu'une tâche est cochée ou décochée, TTM peut publier une notification et, si tu l'actives, enregistrer chaque action dans un **fil d'historique** dédié. La notification d'une nouvelle liste peut mentionner les propriétaires de ses tâches, pour qu'ils l'apprennent.

Les changements faits dans l'Activity arrivent sous forme d'un seul récapitulatif, quand la liste retourne dans le salon. Le niveau de bruit que tu veux dépend entièrement de toi : voir [/config app](/docs/configuration/).

## Qui peut utiliser les listes et les commandes

Par défaut, les commandes de l'app suivent les règles de visibilité propres à Discord (Paramètres du serveur → Intégrations). Les boutons et les listes, en revanche, restent utilisables par tout le monde, sauf si tu **synchronises les permissions** : la liste devient alors en lecture seule pour les utilisateurs non autorisés, dans le salon et dans l'Activity. Cela aussi se règle dans [/config app](/docs/configuration/#sync-permissions).

`/config` a une règle à part : par défaut, seuls les membres qui ont *Gérer le serveur* la voient. Un administrateur peut changer cela dans *Paramètres du serveur → Intégrations*. Voir [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

Quelques actions ont leur propre règle :

- une tâche qui a un propriétaire ne peut être cochée que par son propriétaire, ou par toute personne qui a *Gérer les messages* : voir [Qui peut cocher une tâche](#who-can-tick-a-task) ;
- sceller ou supprimer une liste depuis son panneau *Autre*, dans le salon, demande *Gérer les messages* sur le salon. Depuis `/config lists`, ce sont les permissions de `/config` qui s'appliquent ;
- ouvrir une liste dans l'Activity demande la permission Discord *Utiliser les Activités* sur le salon : voir [Quand la liste ne s'ouvre pas](/docs/activity/#when-the-list-doesnt-open).

## Les permissions que TTM demande

Quand tu invites le bot, Discord affiche les permissions qu'il demande. Voici à quoi sert chacune :

| Permission | Pourquoi elle est nécessaire |
| :--- | :--- |
| Voir le salon | Voir le salon où vit la liste |
| Envoyer des messages | Publier et mettre à jour la liste |
| Intégrer des liens | Afficher la liste sous forme d'embed |
| Gérer les messages | Effacer les anciennes notifications du bot, pour que le salon reste lisible |
| Créer des fils publics | Créer le fil de timeline facultatif, dans les salons textuels |
| Gérer les webhooks | Écrire dans le fil de timeline, dans les salons textuels |
| Se connecter | Publier la liste dans le chat d'un salon vocal |
| Joindre des fichiers | Fournir le téléchargement de la liste |
| Lire l'historique des messages | Garder la liste synchronisée |
| Mentionner @everyone, @here et tous les rôles | Notifier les personnes que tu tagues sur une tâche, et le rôle propriétaire d'une tâche quand son rappel arrive à échéance |
| Gérer les rôles | Créer le rôle qui fait de plusieurs personnes le propriétaire d'une tâche (Premium) |
| Utiliser des émojis externes | Afficher les icônes du bot sur les boutons et les listes |

**Dans un salon vocal**, une liste vit dans le chat du salon, qui n'a pas de timeline, et TTM a besoin de *Se connecter* pour y publier : voir [Salons vocaux](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Bon à savoir</div>Tu peux les accorder plus tard depuis <em>Paramètres du serveur → Rôles → Team Tasks Manager</em>, ou salon par salon depuis les paramètres de permissions du salon. <em>Gérer les rôles</em> fait exception : elle ne marche que sur le rôle du bot, pas salon par salon.</div>
