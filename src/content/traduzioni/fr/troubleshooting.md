---
title: "FAQ"
description: "Questions fréquentes : des réponses rapides aux problèmes les plus courants, chacune avec un lien vers la page qui l'explique en entier."
fonte: c80b5664452a
---

Trouve ci-dessous le problème que tu rencontres. Chaque réponse est courte et renvoie à la page qui l'explique en entier. Les problèmes de la liste sont répartis par endroit : [dans le salon](#in-the-channel) et [dans l'Activity](#in-the-activity).

La recherche fonctionne avec des mots français : essaie *cocher*, *propriétaire*, *rappel*.

## Dans le salon

### Je ne trouve pas la commande `/creer-liste`

Discord affiche chaque commande dans la langue de ton app Discord. En français, la commande est `/creer-liste`, en anglais `/create-list`. Tous les noms traduits sont dans [Noms des commandes dans ta langue](/docs/commands/#command-names-in-your-language).

### Je n'arrive pas à cocher une tâche

Vérifie ces points, dans cet ordre :

- **Un bouton de la deuxième rangée est bleu ou rouge.** Clique dessus jusqu'à ce qu'il soit éteint. Tant qu'un bouton est actif, choisir une tâche applique l'action de ce bouton. Voir [Le menu de cochage](/docs/the-task-list/#the-check-selector).
- **La tâche a un propriétaire.** Seuls le propriétaire, les membres du rôle propriétaire et ceux qui ont *Gérer les messages* sur le salon peuvent la cocher. Voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).
- **Le menu est désactivé.** Quelqu'un est en train de modifier la liste, elle est donc verrouillée : voir [J'ai appuyé sur Annuler et la liste reste verrouillée](#i-pressed-cancel-and-the-list-stays-locked) plus bas.
- **Le bot dit *Tu n'es pas autorisé à utiliser cette fonction sur ce serveur*.** Ton serveur a synchronisé ses permissions et, pour toi, la liste est en lecture seule. Demande à un administrateur. Voir [Synchroniser les permissions](/docs/configuration/#sync-permissions).
- **La bêta est terminée et ton serveur est sur l'offre Free.** Quand toutes les places de ton offre sont prises, une liste qui n'en fait pas partie refuse le cochage. Une liste créée pendant la bêta fait exception : ses tâches peuvent toujours être cochées. Voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work) et [Ce que garde une liste de la bêta](/docs/beta/#what-a-beta-list-keeps).

### J'ai appuyé sur Annuler et la liste reste verrouillée

TTM verrouille une liste pendant que quelqu'un la modifie, et fermer le formulaire avec **Annuler** ou avec la ✕ ne la déverrouille pas, parce que Discord ne le dit pas au bot. N'importe qui peut la déverrouiller : ouvre **Autre** sous la liste et appuie sur **Déverrouiller la liste** <img class="inline-ic" src="/icons/unlock.png" alt="" />. Voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).

### Mes tags ou mon propriétaire n'ont pas été enregistrés

Les menus **Tag** et **Propriétaire** attendent que tu confirmes ton choix. Sur mobile, touche **Enregistrer** sous le menu ouvert. Sur ordinateur, il n'y a pas de bouton Enregistrer : clique n'importe où en dehors du menu, et le fermer applique ton choix. Voir [Confirmer une sélection](/docs/channel-tasks/#confirming-a-selection--desktop-vs-mobile).

Avec **Conserver l'état après la sélection** désactivé (c'est le cas par défaut), choisis d'abord les personnes, puis la tâche. Voir [Tag](/docs/channel-tasks/#tag).

Si une tâche est devenue la tienne au lieu d'aller aux personnes que tu avais choisies, le menu était encore vide quand tu as choisi la tâche : avec le menu vide, **Propriétaire** te donne la tâche. Pour corriger :

1. Clique sur **Propriétaire** jusqu'à ce qu'il soit rouge et choisis la tâche, pour retirer le propriétaire.
2. Clique sur **Propriétaire** jusqu'à ce qu'il soit bleu, choisis les personnes et confirme.
3. Choisis à nouveau la tâche.

### Je veux donner une tâche à plusieurs personnes

Clique sur **Propriétaire** jusqu'à ce qu'il devienne bleu. Dans le menu sous les boutons, dont le texte est *Choisis une tâche dans le menu au-dessus pour la prendre, ou choisis à qui la donner*, choisis les personnes. Confirme ton choix, puis choisis la tâche. TTM crée un rôle pour ces personnes et en fait le propriétaire. Dans l'Activity, choisis-les dans le panneau de la tâche : voir [Propriétaire](/docs/activity-list/#owner).

C'est une fonctionnalité [Premium](/docs/premium/). Le bot a besoin de la permission *Gérer les rôles* : un administrateur l'accorde au rôle du bot dans *Paramètres du serveur → Rôles*, pas sur un salon. Voir [Propriétaire : une personne, un rôle ou plusieurs personnes](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

### J'ai supprimé le message de la liste par erreur

Les données de la liste sont toujours dans TTM et ses rappels continuent d'arriver. Lance `/config lists` et appuie sur le bouton de cette liste jusqu'à ce qu'il soit bleu (**régénérer**). Appuie ensuite sur **Appliquer** et confirme. TTM publie à nouveau la liste dans son salon, avec le même contenu et la même timeline. Voir [Régénérer](/docs/config-lists/#regenerate).

## Dans l'Activity

### L'Activity ne s'ouvre pas

Vérifie ces points, dans cet ordre :

- **Le premier bouton sous la liste est encore Cloner la liste.** La liste a été publiée avant l'arrivée de l'Activity : elle aura le bouton de l'Activity à sa prochaine modification.
- **Le bouton de l'Activity est éteint.** Quelqu'un est en train de modifier la liste dans le salon. Le bouton s'allume quand la liste est déverrouillée : voir [Quand la liste est verrouillée](/docs/the-task-list/#when-the-list-is-locked).
- **Le bot dit qu'il te faut *Utiliser les Activités*.** C'est une permission Discord sur le salon, qu'un administrateur du serveur active pour toi dans les *Permissions* du salon.
- **Le bot dit *Je ne vois pas encore l'Activity*.** Ton app Discord ne prend peut-être pas en charge l'Activity. Mets-la à jour ou essaie un autre appareil.

Voir [Quand la liste ne s'ouvre pas](/docs/activity/#when-the-list-doesnt-open).

### La liste n'affiche que Rejoindre l'Activity

La liste est dans l'[Activity](/docs/activity/) et, tant qu'elle y est, elle ne peut pas être modifiée dans le salon. Appuie sur **Rejoindre l'Activity** pour y travailler avec les autres. Quand tout le monde est parti, la liste revient dans le salon avec tous ses boutons. Voir [Rejoindre les autres](/docs/activity/#join-the-others).

### Je n'arrive pas à cocher une tâche dans l'Activity

TTM te dit pourquoi. En général :

- **La tâche a un propriétaire.** Une bulle sur la case l'indique. La règle est la même que dans le salon : voir [Qui peut cocher une tâche](/docs/core-concepts/#who-can-tick-a-task).
- **Quelqu'un est en train de modifier cette tâche.** Un appui sur sa case te dit qui. Les autres tâches restent libres.
- **Quelqu'un est en train de modifier toute la liste** avec **Modifier la liste**. La ligne sous la liste dit qui, et les cases reviennent quand cette personne a fini. Voir [Qui modifie quoi](/docs/activity-list/#who-is-editing-what).
- **La base de données ne répond pas.** Une bande l'indique et la liste est en lecture seule jusqu'à son retour : voir [Quand la base de données ne répond pas](/docs/activity/#when-the-database-isnt-responding).

### La liste met du temps à revenir de l'Activity

L'Activity a été fermée sans appuyer sur **Quitter**. Pour TTM, une fenêtre fermée ressemble à une connexion coupée un instant : il attend 30 secondes que tu reviennes, puis ramène la liste dans le salon. Avec un téléphone laissé en arrière-plan ou verrouillé, cela peut prendre jusqu'à une minute, parce que le bot doit d'abord remarquer que la page a cessé de répondre.

**Quitter** dit tout de suite au bot que tu as fini : si tu es le dernier dans la liste, elle revient aussitôt dans le salon. Voir [Revenir dans le salon](/docs/activity/#back-to-the-channel).

### L'Activity se recharge quand je change le thème de Discord

Quand tu changes son thème, Discord recharge l'Activity de lui-même, parfois jusqu'à une minute plus tard : TTM ne peut pas l'empêcher. La liste revient toute seule en un instant, avec le thème que tu avais.

Si ton thème était **Comme Discord**, il devient le thème que tu voyais. Pour suivre de nouveau Discord, choisis **Comme Discord** avec l'engrenage : voir [Tes réglages](/docs/activity/#your-settings).

Après un rechargement, **Quitter** te fait toujours sortir de la liste, mais à cause d'un bug de Discord il ne peut pas fermer la fenêtre : ferme-la depuis Discord.

## Rappels

### Mon rappel n'est pas arrivé

- **Le rappel va au propriétaire de la tâche.** Ce n'est toi que si la tâche n'avait pas de propriétaire quand tu as défini le rappel. Une personne reçoit un message privé, un rôle reçoit une mention dans le salon de la liste. Voir [Les règles](/docs/reminders/#the-rules).
- **Le propriétaire doit autoriser les messages privés des membres du serveur**, dans les *Paramètres de confidentialité* du serveur. Voir [Rappels par message privé](/docs/known-limits/#reminders-by-direct-message).
- **Le propriétaire est un rôle qui ne peut pas être mentionné.** Le rappel apparaît dans le salon, mais personne ne reçoit de notification. Voir [Rappels à un rôle](/docs/known-limits/#reminders-to-a-role).
- **Le rôle propriétaire a été supprimé.** Le rappel n'est envoyé à personne. Choisis un autre propriétaire pour la tâche. Voir [Rappels à un rôle](/docs/known-limits/#reminders-to-a-role).
- **TTM ne peut pas écrire dans le salon de la liste.** Voir [Les permissions que demande TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
  - Un rôle que TTM a créé pour plusieurs personnes : chacune reçoit le rappel par message privé, avec la raison.
  - Tout autre rôle : le rappel n'est pas remis tant qu'un administrateur n'accorde pas la permission.
- **Le propriétaire a été retiré, ou la liste a été scellée.** Dans ces cas, le rappel disparaît. Avant de retirer un propriétaire dont le rappel n'a pas encore été envoyé, TTM te demande de confirmer. Voir [Propriétaires et tags](/docs/owners-and-tags/) et [Sceller](/docs/config-lists/#seal).
- **La tâche est cochée.** Terminer une tâche arrête son rappel, et une tâche cochée ne peut pas en recevoir de nouveau.

### Je veux un rappel hebdomadaire

TTM n'a pas d'unité pour les semaines, donc une semaine, c'est 7 jours. Pour commencer, un administrateur active **Rappels récurrents** dans [`/config app`](/docs/configuration/#recurring-reminders) (une fonctionnalité [Premium](/docs/premium/)).

Dans le salon :

1. Clique sur **Rappel** jusqu'à ce qu'il soit bleu, choisis la tâche et envoie le formulaire **Quand**.
2. Sur la carte qui apparaît, appuie sur **Modifier la récurrence**.
3. Choisis **Intervalle** 7 et **Unité** jours, et dans **Combien de fois, au total** le nombre de semaines, par ex. 4 pour quatre semaines. Envoie ensuite le formulaire.
4. Appuie sur **Enregistrer** sur la carte.

Dans l'Activity, touche le texte de la tâche, puis **Rappel** : les trois mêmes menus sont dans le panneau, sous la date. Choisis-les, puis touche **Enregistrer**.

Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

## Offres et permissions

### Je n'arrive pas à créer une liste, ou le bot me dit de libérer une place

Pendant la bêta, il n'y a aucune limite de listes. Ensuite, l'offre Free te laisse travailler sur trois listes à la fois, et TTM refuse une quatrième tant que tu n'en scelles pas ou n'en supprimes pas une : voir [Ce qui arrive à une quatrième liste](/docs/premium/#what-happens-to-a-fourth-list).

### Qui peut sceller ou supprimer une liste ?

Dans le panneau **Autre** d'une liste, seuls les membres qui ont *Gérer les messages* sur le salon voient **Sceller la liste** et **Supprimer la liste**. Dans `/config lists`, la règle de `/config` s'applique : par défaut, les membres qui ont *Gérer le serveur*. Voir [Ce qu'il y a dans Autre](/docs/the-task-list/#whats-inside-more) et [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

### Je ne trouve pas la commande `/config`

Par défaut, seuls les membres qui ont la permission *Gérer le serveur* voient `/config`. Un administrateur peut l'ouvrir à ton rôle dans *Paramètres du serveur → Intégrations → Team Tasks Manager*. Voir [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

### Le bot dit qu'une permission manque

Il y a deux cas différents :

- **Il manque une permission au bot.** Son message nomme la permission et les étapes pour l'accorder. Quand le bot ne peut pas écrire dans le salon de la liste, le message n'arrive qu'à toi, et au plus une fois par heure. À quoi sert chaque permission : [Les permissions que demande TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).
- **Tu n'es pas autorisé à utiliser une fonction.** Cette règle est définie par les administrateurs du serveur, pas par le bot. Voir [Synchroniser les permissions](/docs/configuration/#sync-permissions).

---

Tu es toujours bloqué ? Demande-nous sur le [serveur Discord](/docs/community/). Des étapes claires et une capture d'écran nous aident à répondre vite.
