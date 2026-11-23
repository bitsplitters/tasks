---
title: "Actions sur la liste"
description: "Nettoyer, Tout rouvrir, Cloner, Télécharger, Sceller et Supprimer : ce que chacune fait à la liste entière, et où la trouver."
fonte: c473903dad41
---

Ces actions agissent sur la **liste entière**, jamais sur une seule tâche. Deux existent aux deux endroits ; les autres seulement dans le salon.

| Action | Dans le salon | Dans l'Activity |
| :--- | :---: | :---: |
| [Nettoyer](#clean) | oui | oui |
| [Tout rouvrir](#reopen-all) | oui | oui |
| [Cloner](#clone) | oui | — |
| [Télécharger](#download) | oui | — |
| [Sceller](#seal) | oui, et dans `/config lists` | seulement depuis `/config lists` |
| [Supprimer](#delete) | oui, et dans `/config lists` | seulement depuis `/config lists` |

<div class="howto" id="how-to-do-it"><div class="howto-t">Comment faire</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</span><span class="howto-d">La première rangée sous la liste, et Autre pour Cloner, Télécharger, Sceller et Supprimer.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Dans l'Activity</span><span class="howto-d">Nettoyer la liste et Tout rouvrir, en haut de la liste.</span></a></div></div>

## Nettoyer

**Nettoyer la liste** enlève toutes les tâches terminées, sous-tâches comprises, et renumérote les tâches qui restent. Un groupe non terminé reste, même quand certaines de ses sous-tâches partent.

D'abord, une confirmation te dit combien de tâches vont partir, et ce qui part avec elles. Elles partent **pour de bon**, avec leurs rappels et leurs tags, si elles en ont. Dans le salon, si la configuration de ton serveur le permet, la notification dans le salon de la liste ou dans son fil montre les tâches enlevées : voir [Mode de notification](/docs/configuration/#notification-mode). Dans l'Activity, elles finissent dans le résumé à la fin de la session.

- **Aucune tâche terminée** : il n'y a rien à enlever, et le bot te le dit tout de suite.
- **Toutes les tâches terminées** : Nettoyer refuse, car une liste ne peut pas être vide. Décoche au moins une tâche, ou supprime la liste entière avec [Supprimer](#delete), dans le salon.

## Tout rouvrir

**Tout rouvrir** remet à faire toutes les tâches terminées. Le texte, les propriétaires, les tags et les rappels restent comme ils sont. Si aucune tâche n'est terminée, le bot dit qu'il n'y a rien à rouvrir.

D'abord, le bot te demande de choisir :

- **Rouvrir** — rouvre toutes les tâches tout de suite.
- **Nouvelle date** — rouvre, et déplace les rappels des tâches que tu rouvres. Le premier de ces rappels au calendrier passe à la date que tu choisis, au moins 5 minutes à partir de maintenant. Les autres gardent le même écart avec lui. Les rappels des tâches encore à faire restent comme ils sont. Ce choix apparaît seulement quand une tâche que tu rouvres a un rappel.
- **Annuler** — laisse la liste telle quelle.

Rouvrir déclenche les **webhooks de réouverture** des tâches qu'il rouvre, et ignore les propriétaires : toute personne qui peut modifier la liste peut la rouvrir.

## Cloner

**Cloner la liste** copie la liste dans un autre salon, comme une nouvelle liste. Tu choisis :

- le salon : salons textuels et salons vocaux. Un clone dans un salon vocal n'a pas de timeline de l'activité : voir [Salons vocaux](/docs/known-limits/#voice-channels) ;
- si le clone garde les cases cochées ;
- s'il garde les rappels.

Un clone reçoit de nouveaux rappels, donc un rappel récurrent peut être refusé : voir [Rappels répétés](/docs/reminders/#repeating-reminders).

Le clone publie sa propre notification dans le nouveau salon, et peut mentionner les propriétaires de ses tâches : voir [Quand une liste est créée](/docs/configuration/#when-a-list-is-created). Le salon de la liste d'origine reçoit la notification habituelle du clone, sans mentions.

Un clone est une nouvelle liste : il lui faut une place libre, et il ne peut pas avoir plus de tâches que ton offre ne le permet. Voir [Ce que Premium débloque](/docs/premium/).

Seulement dans le salon, même quand la liste est verrouillée.

## Télécharger

**Télécharger** te donne un fichier `.txt` de la liste, écrit comme expliqué dans [Modifier une liste à la main](/docs/writing-a-list/) et envoyé **à toi seul**. Le fichier garde les codes de Discord à la place des noms : voir [Les codes derrière les noms](/docs/writing-a-list/#the-codes-behind-the-names). Garde-le comme sauvegarde, ou reconstruis la liste à partir de lui avec `/creer-liste`, même sur un autre serveur : voir [Réutiliser une liste partout](/docs/tips/#reuse-a-list-anywhere).

Un message Discord est limité à 2000 caractères, donc Télécharger ne publie jamais la liste en texte : c'est toujours un fichier.

Seulement dans le salon.

## Sceller

**Sceller la liste** garde dans le salon une liste terminée comme compte rendu, marquée *Liste scellée*, sans boutons ni menus. Ses rappels s'arrêtent, et elle libère une [place de ton offre](/docs/premium/#how-the-three-places-work). Ce qui reste et ce qui part : [Sceller](/docs/config-lists/#seal).

Sceller ne s'annule pas, et le bot te demande d'abord de confirmer. Si tu penses réutiliser la liste, télécharge-la avant de la sceller.

Dans le salon, depuis **Autre**, sceller demande *Gérer les messages* sur le salon, et une liste que quelqu'un est en train de modifier ne peut pas être scellée. Depuis [`/config lists`](/docs/config-lists/), ce sont les permissions de `/config` qui comptent, et un administrateur peut sceller même une liste dans l'Activity : elle revient d'abord dans le salon.

## Supprimer

**Supprimer la liste** retire la liste **définitivement**, avec ses tâches, propriétaires, tags et rappels. Le message est retiré, et un bref reçu prend sa place dans le salon.

Supprimer ne s'annule pas, et le bot te demande d'abord de confirmer. Les permissions sont les mêmes que pour [Sceller](#seal). Depuis `/config lists`, supprimer une liste dans l'Activity la retire aussi pour les personnes qui y sont.

<div class="callout"><div class="callout-t">Pourquoi supprimer plutôt que retirer le message ?</div>Si tu supprimes le message à la main, les données de la liste restent, et ses rappels continuent d'arriver. <strong>Supprimer la liste</strong> emporte aussi les rappels. Si un message n'existe déjà plus, <a href="/docs/config-lists/"><code>/config lists</code></a> te permet de faire le ménage, ou de ramener la liste.</div>
