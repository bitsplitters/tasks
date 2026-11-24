---
title: "Rappels"
description: "Associe un horaire à une tâche pour que TTM prévienne son propriétaire à temps : qui le reçoit, les fuseaux horaires, les répétitions."
fonte: 6ce351a678ab
---

Un rappel fait d'une tâche quelque chose qui te rappelle *à toi*, et non l'inverse. Tu le définis une fois, et TTM s'occupe des alertes. Tu en ajoutes un avec **Rappel** <img class="inline-ic" src="/icons/alertW.png" alt="" /> : dans le salon, dans la deuxième rangée sous la liste ; dans l'Activity, dans le panneau d'une tâche.

<div class="howto" id="how-to-do-it"><div class="howto-t">Comment faire</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</span><span class="howto-d">Rappel, dans la deuxième rangée sous la liste : le formulaire **Quand** et la carte récapitulative.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#reminder"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />Dans l'Activity</span><span class="howto-d">Rappel, dans le panneau d'une tâche : date, heure, fuseau horaire et répétitions ensemble.</span></a></div></div>

## Les règles

- **Un rappel a une date, une heure et un fuseau horaire.** Il part **une seule fois**, sauf si ton serveur utilise les [rappels répétés](#repeating-reminders), une fonctionnalité Premium.
- **Le début doit être au moins 5 minutes dans le futur.** Le formulaire part de dix minutes à partir de maintenant, donc un rappel « dans un instant » n'a besoin d'aucune saisie.
- **Seule une tâche encore à faire peut en recevoir un.** Terminer une tâche arrête son rappel : pas besoin de nettoyer ensuite.
- **Le rappel va au propriétaire de la tâche**, par message privé si le propriétaire est une personne. Si la tâche n'a pas encore de propriétaire, **tu le deviens** quand tu enregistres le rappel.

  À partir de là, toi et ceux qui ont *Gérer les messages* sur le salon êtes les seuls à pouvoir cocher cette tâche. Pour la donner à quelqu'un d'autre, définis le propriétaire avant ou après avoir créé le rappel : voir [Propriétaires et tags](/docs/owners-and-tags/).
- **Rien ne change tant que tu n'enregistres pas.** Quand tu modifies un rappel, Enregistrer reste éteint tant que tu ne changes pas la date ou la récurrence.
- **Retirer le propriétaire retire le rappel**, parce que plus personne ne peut le recevoir.

Rien n'est arrivé ? Le propriétaire doit accepter les messages privés des membres de ce serveur : voir [Rappels par message privé](/docs/known-limits/#reminders-by-direct-message).

## Ton fuseau horaire

TTM a besoin d'un nom de fuseau horaire officiel comme `Europe/Paris`. Cherche le tien sur la **[carte des fuseaux horaires](https://timezones.bitsplitters.app)** : sélectionne ta région sur la carte, copie la valeur et colle-la dans le champ. L'Activity te permet aussi de chercher par ville ou par pays.

<div class="callout"><div class="callout-t">Choisis ton fuseau horaire</div>Utilise <a href="/docs/my-timezone/"><strong>/my timezone</strong></a> sur n'importe quel serveur, ou l'engrenage dans l'Activity, et TTM te propose <strong>ton</strong> fuseau partout, dans le salon et dans l'Activity. Tant que tu n'en as pas choisi un, TTM propose le fuseau de ta langue Discord, de ton appareil ou du serveur, et la ligne sous le champ te dit lequel. Un autre fuseau dans un rappel ne vaut que pour cette date. Les rappels que tu écris dans le texte d'une liste utilisent le même fuseau.</div>

## Comment arrive le rappel

Quand l'heure arrive, TTM prévient le propriétaire de la tâche. Le rappel montre la tâche, la date pour laquelle il était prévu et un bouton qui renvoie directement à la liste.

- Si le propriétaire est une **personne**, le rappel est un **message privé**.
- Si le propriétaire est un **rôle**, c'est un **message dans le salon de la liste** qui mentionne le rôle, en réponse à la liste. Discord prévient tous ceux qui ont ce rôle et peuvent voir le salon.

Dans les deux cas, il arrive **à environ dix secondes près** de l'heure prévue, et toujours dans la bonne minute. TTM étale les envois pour rester dans les limites de Discord. Avec les [Notifications push lisibles](/docs/configuration/#readable-push-notifications) désactivées, il arrive quand même, sans le texte simple qui rend lisibles les aperçus sur téléphone.

Un message privé peut être refusé, et TTM attend alors quelques heures avant de réessayer avec cette personne : voir [Rappels par message privé](/docs/known-limits/#reminders-by-direct-message).

### Tu ne veux pas de rappels par message privé ?

Tu décides, depuis les réglages de Discord :

- **Les garder, sans notification.** Fais un clic droit sur ta conversation avec TTM et choisis *Mettre en sourdine*. Les rappels arrivent quand même, en silence.
- **Les arrêter.** Clique sur le nom du serveur, puis *Paramètres de confidentialité*, et désactive *Messages privés*. Cela arrête les messages privés de tous les membres de ce serveur, pas seulement de TTM.
- **Passer la main.** Demande à la personne qui gère la liste de donner la tâche à quelqu'un d'autre, avec **Propriétaire** <img class="inline-ic" src="/icons/owner.png" alt="" />.

Mettre le serveur en sourdine ne suffit pas : cela réduit au silence les salons du serveur, pas tes messages privés.

Un rôle n'est prévenu que s'il peut être mentionné. Quand c'est le cas, et ce qui se passe avec @everyone ou un rôle supprimé : voir [Rappels à un rôle](/docs/known-limits/#reminders-to-a-role).

## Rappels répétés

Par défaut, chaque rappel est un **événement unique** : une seule alerte, rien d'autre à décider. Les répétitions sont une fonctionnalité [Premium](/docs/premium/) : sur l'offre Free, chaque rappel est unique.

Sur une offre qui les inclut, elles restent facultatives : une personne qui gère le serveur active **Rappels récurrents** dans [/config app](/docs/configuration/#recurring-reminders). Jusque-là, seul un rappel déjà récurrent affiche les menus de répétition.

<div class="callout"><div class="callout-t">Les rappels récurrents que tu as déjà continuent de fonctionner</div>Un rappel qui était déjà récurrent continue de partir sur l'offre Free, et sur Premium tant que l'interrupteur est désactivé : tu peux changer sa date, le déplacer vers une autre tâche ou baisser le nombre de fois où il arrive, mais pas l'augmenter. Cloner ou importer une liste crée de nouveaux rappels : là où l'on ne peut pas créer de nouveaux rappels récurrents, un clone ou un import refuse un rappel récurrent. Clone sans les rappels, ou mets ses répétitions à <code>0</code>.</div>

### Les champs de la répétition

Il y a trois menus, dans le salon et dans l'Activity : il n'y a donc rien à saisir et aucun format à rater.

| Menu | Signification | Choix |
| :--- | :--- | :--- |
| **Combien de fois, au total** | Combien d'alertes envoie le rappel, **la première comprise**. **1 fois** est un rappel unique. Le maximum est 50 sur Premium. Là où les rappels récurrents ne peuvent pas augmenter, sur l'offre Free ou avec l'interrupteur désactivé, le menu s'arrête au nombre que le rappel a déjà, et le formulaire dit pourquoi. | de 1 à 10, puis de 15 à 50 par pas de 5 |
| **Intervalle** | Le temps entre deux alertes, dans l'unité du menu suivant. Il ne compte pas avec **1 fois**. | de 1 à 10, 12, 14, puis de 15 à 50 par pas de 5, 60 et 90 |
| **Unité** | Minutes, heures ou jours. Il n'y a ni semaines ni mois : une semaine, c'est 7 jours. | minutes, heures, jours |

En passant d'une fois à plusieurs, **Intervalle** part de 1 jour. Les menus proposent toujours les valeurs que le rappel a déjà, même si elles ne sont pas dans la liste :

- un rappel écrit dans le texte d'une liste peut s'exécuter 37 fois, ou toutes les 48 heures ;
- un rappel qui s'exécute déjà plus de 50 fois garde son nombre ;
- un intervalle qui mélange les unités, comme `1d12h`, s'affiche dans sa plus petite unité, 36 heures : laisse **Intervalle** et **Unité** tels quels et il reste `1d12h`.

<div class="callout"><div class="callout-t">Heure d'été : le détail qui compte</div>Dans le menu <strong>Unité</strong>, les <strong>jours</strong> gardent la <strong>même heure sur l'horloge</strong> à travers un changement d'heure, par exemple toujours 09:00. Les <strong>heures</strong> sont <strong>exactes</strong> : toutes les 24 heures peut se décaler d'une heure après le changement d'heure. Choisis celle qui correspond à ce que tu veux dire.</div>

## Lire un rappel sur la tâche

Sur la ligne de la tâche, le rappel affiche toujours la date de la **première** alerte, rendue par Discord à l'heure locale de chaque lecteur. Un rappel répété ajoute deux valeurs compactes :

`↻` intervalle · `×` fois au total

Ainsi `↻1h ×4` signifie quatre alertes, une par heure, la première comprise. Un événement unique n'affiche que **l'horodatage** : il n'y a pas de badge, parce qu'il n'y a rien à répéter.

TTM ne retire jamais un rappel de lui-même. Un rappel dont toutes les alertes sont **dans le passé** reste sur sa tâche, comme trace. Il n'envoie plus rien, et il ne compte pas parmi les rappels en attente. Pour le définir de nouveau, choisis une nouvelle date : jusque-là, Enregistrer reste éteint.

Dans le texte d'une liste, le même rappel est une date dans ton fuseau horaire et un triplet, comme `2026-12-08 18:00 [0m,0m,0]` : voir [Les rappels dans le texte](/docs/writing-a-list/#reminders-in-the-text).

## Erreurs courantes

Plusieurs viennent du formulaire **Quand** du salon, où tu saisis la date, l'heure et le fuseau. Dans l'Activity, tu les choisis dans des menus : elles ne peuvent donc pas s'y produire.

| Message | Ce qu'il faut corriger |
| :--- | :--- |
| *Rappel invalide* | Le début doit être au moins 5 minutes dans le futur. |
| *Une tâche terminée ne peut pas avoir de rappel* | Décoche d'abord la tâche, si elle est encore à faire ; ou choisis une tâche qui n'est pas cochée. |
| *La date n'existe pas* | Vérifie ensemble le jour, le mois et l'année (par ex. 31 février). |
| *Heure invalide* | Utilise le format 24 h `HH:mm`, par ex. `15:30`. |
| *Au-delà de l'offre* ou *Au-delà de ce qui est permis* | Les rappels récurrents ne sont pas disponibles ici : sur l'offre Free, ou désactivés dans `/config app`. Un rappel qui était déjà récurrent peut garder le nombre de fois où il arrive, ou le baisser. Tu le vois si l'offre ou le réglage a changé pendant que le formulaire était ouvert : rouvre les répétitions. |
| *Fuseau horaire incorrect* | Le nom ne correspond à aucun fuseau officiel : copie-le depuis la carte des fuseaux horaires. |

Un rappel n'est pas arrivé, ou autre chose s'est mal passé ? Voir la [FAQ](/docs/troubleshooting/#reminders).
