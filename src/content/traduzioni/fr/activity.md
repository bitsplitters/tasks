---
title: "L'Activity"
description: "Ouvre une liste dans une fenêtre à l'intérieur de Discord, où ton équipe travaille dessus ensemble et voit chaque changement en direct."
fonte: 3944b7fd591c
---

Essaie le mode Activity : plus fluide et libéré des limites des salons textuels, idéal pour les sessions de travail longues ou collaboratives.

L'**Activity** ouvre une liste dans une fenêtre à l'intérieur de Discord, sur ordinateur et sur mobile. Plusieurs personnes travaillent dessus en même temps et voient chaque changement en direct. Quand la dernière personne part, la liste retourne dans son salon avec un récapitulatif de ce qui a changé. Elle parle la langue de ton Discord si TTM la parle, l'anglais sinon.

Cette page parle de l'entrée et de la sortie. Comment tu travailles sur la liste une fois dedans : [Travailler sur une liste dans l'Activity](/docs/activity-list/).

## Quatre façons d'entrer

- **Depuis une liste dans un salon** : appuie sur **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, le premier bouton sous la liste. Cette liste s'ouvre. Voir [Ouvrir une liste dans l'Activity](#open-a-list-in-the-activity).
- **Depuis la barre de messages** : dans un salon textuel, ouvre le **Lanceur d'applications** de Discord, choisis Team Tasks Manager, puis **Launch**. Voir [L'accueil du salon](#the-home-of-the-channel).
- **Depuis un appel vocal** : appuie sur le bouton Activités de l'appel et choisis Team Tasks Manager. Voir [L'accueil du salon](#the-home-of-the-channel).
- **Depuis quelqu'un qui est déjà dedans** : appuie sur **Rejoindre l'Activity** sous la liste, sur **Rejoindre** de Discord dans son profil, ou sur l'invitation que cette personne t'envoie. Voir [Rejoindre les autres](#join-the-others).

Le Lanceur d'applications et l'appel vocal ouvrent l'accueil du salon, avec toutes ses listes : tu y choisis une liste, ou tu en crées une nouvelle.

## Ouvrir une liste dans l'Activity

Appuie sur **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, le premier bouton de la [première rangée](/docs/the-task-list/#row-1--acts-on-the-whole-list), dans un salon textuel ou dans le chat d'un salon vocal. Une liste plus ancienne reçoit le bouton la première fois qu'elle change.

Si la fenêtre ne se connecte pas en 30 secondes, TTM te prévient et la liste reste dans le salon.

### Quand la liste ne s'ouvre pas

Le bouton suit les règles du reste de la liste, comme les [permissions synchronisées](/docs/configuration/#sync-permissions) dans `/config app`. TTM refuse aussi, dans un message que toi seul peux voir :

- sans la permission Discord *Utiliser les Activités* sur le salon, qu'un administrateur accorde dans les *Permissions* du salon ;
- tant que la base de données ne répond pas ;
- tant que quelqu'un modifie la liste dans le salon : voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked) ;
- quand ton offre n'a plus de place libre : voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work).

## Rejoindre les autres

Tant qu'une liste est dans l'Activity, son message garde un seul bouton, **Rejoindre l'Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, et la dernière ligne dit <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *On travaille sur cette liste dans l'Activity.* Le **Rejoindre** de Discord, dans le profil d'une personne qui est dedans, marche aussi. Rien ne change la liste depuis le salon pendant ce temps.

Pour faire entrer quelqu'un, appuie sur **Inviter**, en haut à droite de l'accueil et de chaque liste, à côté des personnes présentes. Discord ouvre sa propre fenêtre, où tu choisis des amis ou un salon à qui envoyer l'invitation. Il faut la permission Discord *Créer une invitation* sur le salon : sans elle, TTM te le dit sur le bouton, et t'explique comment un administrateur l'accorde.

## Ton statut sur Discord

Pendant que tu es dans l'Activity, ton profil Discord affiche Team Tasks Manager avec *Planifie les tâches avec l'équipe*, dans ta langue. Il ne dit rien de la liste, du serveur ni du salon. Discord te le demande d'abord, dans la fenêtre où tu fais savoir à TTM qui tu es. Si tu refuses, l'Activity s'ouvre quand même, sans cette ligne.

## L'accueil du salon

Quand tu pars du **Lanceur d'applications** ou d'un **appel vocal** (voir [Quatre façons d'entrer](#four-ways-in)), TTM ouvre l'accueil du salon, avec le nom du salon pour titre. Les fils, les posts de forum, les salons d'annonces et les salons Stage sont exclus. L'accueil a trois parties :

- **Nouvelle liste**, sous le titre : un titre et les tâches, écrits comme dans [Crée ta première liste](/docs/getting-started/#2-create-your-first-list), créée ici et déjà dans l'Activity. Le récapitulatif qui la suit dans le salon commence par sa création, et peut mentionner les propriétaires de ses tâches : voir [Quand une liste est créée](/docs/configuration/#when-a-list-is-created). Les fichiers s'importent avec `/creer-liste`, dans le salon.
- **En ce moment dans l'Activity** : qui est sur chaque liste, et qui est en train de modifier. Touches-en une pour la rejoindre.
- **Dans le salon** : les autres listes, les plus récentes d'abord. Touches-en une pour la lire, puis **Emmener dans l'Activity**, qui attend tant que quelqu'un la modifie dans le salon.

Le bouton **Accueil** <img class="inline-ic" src="/icons/home.png" alt="" />, en haut à gauche de chaque liste, te ramène là.

## Retour dans le salon

**Quitter** ramène la liste quand tu es seul. Avec d'autres personnes, tu choisis :

- **Partir sans les autres** : les autres continuent ;
- **Ramener dans le salon pour tous** : l'Activity se ferme pour tout le monde.

La liste retourne aussi 30 secondes après le départ de la dernière personne, y compris en fermant la fenêtre ou en verrouillant le téléphone. **Quitter** et **Accueil** le font tout de suite.

Ensuite, un **récapitulatif** suit, une ligne par changement avec la personne qui l'a fait : dans le salon comme l'indique ton [Mode de notification](/docs/configuration/#notification-mode), et en entier dans le fil de la [timeline de l'activité](/docs/configuration/#history-tracking). Il utilise la langue de la personne qui a emmené la liste dans l'Activity.

## Ce qui reste dans le salon

**Cloner**, **Télécharger**, **Sceller**, **Supprimer**, **Déverrouiller** et l'import depuis un fichier : voir [Actions sur la liste](/docs/list-actions/). Dans l'Activity, une liste se déverrouille toute seule.

Un administrateur peut quand même **Supprimer**, **Sceller** ou **Régénérer** une liste dans l'Activity depuis [`/config lists`](/docs/config-lists/). Supprimer la retire aussi pour les personnes qui sont dedans ; Sceller la ramène d'abord dans le salon.

## Quand la base de données ne répond pas

Aucune liste n'entre dans l'Activity, et l'accueil masque **Nouvelle liste**. Une liste qui y est déjà passe en lecture seule jusqu'au retour de la base de données, et un bandeau propose de la ramener dans le salon.

## Tes réglages

L'engrenage en haut à droite a deux groupes. Sous **Pour toi, partout**, **Fuseau horaire** est ton fuseau horaire, le même que [/my timezone](/docs/my-timezone/) : TTM le propose dans le salon et sur tous les serveurs aussi, et **Revenir en automatique** l'oublie. Sous **Sur cet appareil**, **Taille du texte**, **Thème** et **Lignes espacées**, plus de place pour toucher sur un téléphone, ne s'appliquent qu'à toi, sur cet appareil.

## Pour aller plus loin

- [Travailler sur une liste dans l'Activity](/docs/activity-list/) : les cases, le panneau d'une tâche, et qui modifie quoi.
- [La liste dans le salon](/docs/the-task-list/) : chaque bouton sous la liste, dans le salon.
- [Ce que Premium débloque](/docs/premium/) : les places de ton offre, et ce qu'ajoute l'offre payante.
- [FAQ](/docs/troubleshooting/#in-the-activity) : des réponses rapides aux problèmes les plus courants.
