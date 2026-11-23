---
title: "Ce que Premium débloque"
description: "Ce que l'offre payante ajoute au Free, et ce que chaque limite change au quotidien."
fonte: 1ce2890c95d6
---

TTM est **entièrement débloqué pendant la bêta**, donc rien de cette page ne s'applique encore. Elle décrit l'offre Free, et ce que Premium lèvera quand la bêta se terminera. Ce qui arrive à ton serveur à la fin de la bêta est dans [Comment fonctionne la bêta](/docs/beta/).

<div class="callout"><div class="callout-t">Offres et prix</div>Les deux offres côte à côte, les prix et l'auto-hébergement sont sur la <a href="/premium/">page Premium</a>. Les prix sont hors TVA : <a href="/premium/#vat">pourquoi</a>.</div>

## Ce que chacune change, en pratique

Au-delà d'une limite du Free, tu ne peux plus rien ajouter, mais rien de ce qui existe déjà n'est supprimé ni masqué : voir [Comment fonctionne la bêta](/docs/beta/#when-the-beta-ends).

\* **Une limite fixée par Discord, pas par nous.** Elle est la même sur toutes les offres : Premium te permet de l'*atteindre*, jamais de la dépasser. Voir [Limites connues](/docs/known-limits/).

**Listes utilisées — 3 → illimitées.** Trois listes suffisent à une petite équipe : une liste de choses à faire, une liste de bugs, une checklist pour le prochain événement. Tu atteins la limite quand chaque projet, chaque équipe ou chaque réunion veut sa propre liste.

**Tâches par liste — 20 → 50 \*.** Vingt tâches font une checklist de travail, et cinquante un backlog. Aucune offre ne dépasse 50, parce qu'un message Discord ne peut contenir que quelques menus : voir [Limites connues](/docs/known-limits/).

**Rappels actifs — 10 → illimités.** La limite compte les rappels *en attente au même moment*, pas les rappels par jour. Un rappel cesse de compter après sa dernière alerte ou quand tu le retires, et un rappel répété compte une seule fois.

**Répétitions par rappel — unique seulement → jusqu'à 50.** Avec l'offre Free, chaque rappel se déclenche une fois. Avec Premium, un rappel peut arriver jusqu'à 50 fois au total, le premier compris, si un administrateur active **Rappels récurrents** dans [/config app](/docs/configuration/#recurring-reminders). Les rappels récurrents que tu as déjà continuent de se déclencher avec l'offre Free : voir [Rappels répétés](/docs/reminders/#repeating-reminders).

**Personnes par propriétaire — 1 → jusqu'à 25 \*.** Avec l'offre Free, le propriétaire d'une tâche est une personne ou un rôle. Avec Premium, ce peut être jusqu'à 25 personnes, qui partagent un rôle créé par TTM : voir [Les rôles que TTM crée](/docs/owners-and-tags/#the-roles-ttm-creates). C'est Premium parce que chaque personne coûte une requête à Discord. Discord limite les requêtes qu'un bot peut envoyer, et tous ses serveurs se partagent cette limite.

**Webhooks — aucun nouveau → jusqu'à 25 \*.** Un webhook permet à une tâche terminée d'envoyer un appel HTTP à tout ce que tu gères toi-même : un déploiement, un tableur, un système de tickets. C'est la principale chose que Premium ajoute. Voir [Webhooks](/docs/webhooks/). Avec l'offre Free, tu ne peux pas créer de nouveaux webhooks, mais ceux créés pendant la bêta restent : voir [Ce que garde une liste de la bêta](/docs/beta/#what-a-beta-list-keeps).

## Comment fonctionnent les trois places

Avec l'offre Free, un serveur a trois places pour les listes. Une liste qui en occupe une est **utilisée**, et `/config lists` la marque ainsi.

- **Une liste occupe une place la première fois que quelqu'un travaille dessus**, et la garde. Travailler sur une liste, c'est l'une de ces choses :
  - cocher ou décocher une tâche ;
  - une mise à jour groupée, ou modifier ou retirer une seule tâche ;
  - **Nettoyer la liste** ou **Tout rouvrir** ;
  - définir un propriétaire, un tag ou un rappel ;
  - associer un webhook.
- **Une nouvelle liste occupe une place** quand tu la crées, la clones ou l'importes. Régénérer une liste compte comme travailler dessus.
- **Une place n'expire pas.** Seuls sceller ou supprimer la liste la libèrent.
- **Une liste qui n'est pas utilisée reste dans le salon telle quelle.** Tu peux encore la télécharger, la sceller ou la supprimer.

Les listes créées pendant la bêta font exception : leurs tâches peuvent encore être cochées sans compter dans la limite des trois listes. Voir [Ce que garde une liste de la bêta](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">Aucune limite ne compte la fréquence d'utilisation</div>Chaque limite compte combien de choses tu as, jamais à quelle fréquence tu les utilises. Un webhook qui se déclenche mille fois par semaine compte quand même pour un seul webhook.</div>

### Ce qui arrive à une quatrième liste

Quand les trois places sont prises, TTM refuse de créer, cloner ou importer une autre liste. Il refuse aussi de travailler sur une liste qui n'est pas utilisée. Le bot te dit comment libérer une place :

- **Sceller la liste**, dans le panneau **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> d'une liste que tu as terminée. La liste reste dans le salon comme compte rendu, sans boutons.
- **Supprimer la liste**, dans le même panneau. Elle retire la liste définitivement.
- [`/config lists`](/docs/config-lists/), qui marque les listes utilisées et peut en sceller ou en supprimer plusieurs à la fois.

Supprimer à la main le message d'une liste ne libère rien : la liste reste dans TTM avec sa place, et ses rappels continuent d'arriver. Utilise plutôt **Supprimer la liste**. Si le message n'existe déjà plus, `/config lists` peut supprimer ce qui reste, ou régénérer la liste.

## Des questions ?

Rejoins le [Discord](/docs/community/) et demande-nous tout ce que tu veux sur les prix, les limites ou l'auto-hébergement.
