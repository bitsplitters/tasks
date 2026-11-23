---
title: "/config lists"
description: "Vois toutes les listes du serveur, scelle ou supprime celles dont tu as fini, ou ramène celle dont le message a été supprimé par erreur."
fonte: 0da09921c70a
---

Lance la commande :

```
/config lists
```

Elle ouvre un panneau privé, que toi seul peux voir, avec **toutes les listes que ce serveur a encore**. Chaque liste a une ligne : le nom de la liste, et le salon où elle vit sous forme de lien cliquable.

Une liste qui occupe l'une des places de ton offre est marquée **utilisée** à côté de son salon. Quand tu dois libérer une place, ce sont les listes à sceller ou à supprimer. Pendant la bêta, il n'y a aucune limite, donc aucune liste n'est marquée. Comment une liste prend une place : voir [Comment fonctionnent les trois places](/docs/premium/#how-the-three-places-work).

Une liste sur laquelle quelqu'un travaille dans l'[Activity](/docs/activity/) est marquée **dans l'Activity**. Tu peux quand même la régénérer, la sceller ou la supprimer, et la confirmation te prévient d'abord : voir [Ce qui reste dans le salon](/docs/activity/#what-stays-in-the-channel).

Par défaut, seuls les membres qui ont la permission *Gérer le serveur* peuvent utiliser `/config lists`, comme le reste de `/config`. Voir [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

## Un bouton, quatre états

Chaque ligne a un seul bouton qui change d'état à chaque appui :

| État | Signification |
| :--- | :--- |
| <span class="c-grey">Gris</span> <img class="inline-ic" src="/icons/noaction.png" alt="" /> | aucune action |
| <span class="c-blue">Bleu</span> <img class="inline-ic" src="/icons/refresh.png" alt="" /> | la **régénérer** |
| <span class="c-green">Vert</span> <img class="inline-ic" src="/icons/seal.png" alt="" /> | la **sceller** |
| <span class="c-red">Rouge</span> <img class="inline-ic" src="/icons/delete.png" alt="" /> | la **supprimer** |

Marque autant de listes que tu veux (deux à supprimer, une à sceller et trois à régénérer, par exemple), puis appuie sur **Appliquer**. Avant que quoi que ce soit se passe, une fenêtre de confirmation les liste par nom, regroupées par action : envoie-la pour continuer, ferme-la pour annuler.

Le lot s'exécute alors **dans l'ordre** : d'abord les suppressions, puis les scellements, puis les régénérations. Un même lot peut donc libérer une place et l'utiliser : une liste que tu supprimes ou scelles cède sa place à une liste que tu régénères.

À la fin, tu reçois un récapitulatif, par nom : les listes supprimées, scellées et régénérées, et celles qui n'ont pas pu être traitées. Chacune de ces dernières vient avec sa raison, par exemple une liste qui n'existe plus, ou une régénération sans place restante dans ton offre. Le panneau se redessine ensuite avec les listes telles qu'elles sont maintenant.

**Annuler** ferme le panneau et ne fait rien. Tes choix survivent à un changement de page : l'en-tête te dit combien tu en as marqué sur d'autres pages, et la confirmation les inclut. Les choix de la page que tu as devant les yeux vivent dans le panneau lui-même, donc ils n'expirent jamais pendant que tu réfléchis. Ceux des autres pages sont retenus pendant une heure après ta dernière action sur le panneau.

## Régénérer

Publie de nouveau la liste, dans son salon d'origine, avec le même contenu : tâches, propriétaires, tags et rappels. Utilise-le quand le message de la liste a été supprimé par erreur : les données étaient toujours là, seul le message avait disparu.

Trois choses à savoir :

- **la timeline de l'activité suit la liste.** Le nouveau message réutilise le même fil, donc l'historique reste où il était et rien n'est orphelin ;
- **l'ancien message est supprimé** s'il existe encore. C'est voulu : un message laissé derrière a encore des boutons qui marchent. Appuyer dessus ferait reconstruire la liste une seconde fois par le bot, ce qui laisserait deux listes qui divergent ;
- **régénérer compte comme travailler sur la liste.** Une liste qui occupe déjà l'une des places de ton offre la garde. Une liste sans place a besoin d'une place libre, sinon elle finit dans le récapitulatif parmi celles qui n'ont pas été traitées.

## Sceller

Pour une liste dont tu as fini mais que tu veux garder comme compte rendu. La liste **reste dans le salon** avec le même contenu, mais sans boutons ni menus, et avec une ligne *Liste scellée* en bas. Tout le reste disparaît :

- la liste ne peut plus être modifiée, rouverte ni téléchargée ;
- ses rappels s'arrêtent ;
- elle libère sa place dans ton offre ;
- elle n'apparaît plus dans ce panneau, car ses données quittent TTM.

La timeline de l'activité reste où elle est. Sceller est irréversible : si tu penses pouvoir réutiliser la liste, télécharge-la avant de la sceller.

La notification dans le salon et la ligne dans la timeline suivent les options de ton serveur : avec les deux désactivées, rien n'enregistre qui a scellé la liste.

Une liste dont le message n'existe plus **ne peut pas être scellée** : il ne reste aucun compte rendu à garder. Elle apparaît dans le récapitulatif parmi celles qui n'ont pas été traitées, avec la raison, et le reste du lot s'exécute quand même. Pour la retirer, marque-la en rouge pour la **supprimer**.

C'est le même scellement que celui de **Sceller la liste** dans le panneau **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> d'une liste.

## Supprimer

Retire la liste définitivement : tâches, propriétaires, tags, rappels et historique d'activité. Un reçu est publié dans le salon de la liste, et la dernière ligne de la timeline enregistre la suppression avant que le fil ne soit laissé tranquille.

C'est la même suppression que celle de **Supprimer la liste** dans le panneau **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> d'une liste. Utilise cette commande quand le message de la liste n'est plus là pour cliquer dessus.

<div class="callout"><div class="callout-t">Pourquoi le bot ne sait-il pas quelles listes sont mortes ?</div>Distinguer une liste vivante d'une liste supprimée demande d'interroger Discord sur chaque liste, à chaque ouverture du panneau. TTM ne le fait pas : il te montre ce qui existe et met un lien vers chaque salon, pour que tu puisses regarder toi-même. Deviner à partir d'un silence, c'est exactement comme ça que des données sont détruites par accident.</div>

## Si la base de données est injoignable

Si la base de données est injoignable, la commande refuse de s'ouvrir, et le dit. Chaque ligne de ce panneau vient de la base de données. Une suppression qui ne pourrait pas retirer les données laisserait des rappels se déclencher pour une liste qui n'apparaît plus nulle part.
