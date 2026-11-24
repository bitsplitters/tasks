---
title: "/my timezone"
description: "Ton fuseau horaire, choisi une fois : TTM te le propose chaque fois que tu choisis une date, sur tous les serveurs, dans le salon et dans l'Activity."
fonte: 95eefd9352af
---

Chaque fois que tu choisis une date pour un rappel, TTM te propose un fuseau horaire. Avec `/my timezone`, tu choisis **le tien** une seule fois, et TTM te le propose sur tous les serveurs, dans le salon et dans l'Activity.

Ainsi, chacun dans l'équipe raisonne dans son heure locale. La commande fonctionne seulement sur les serveurs, ne demande aucune permission, et son panneau n'est visible que par toi.

## Le panneau

`/my timezone` affiche ton fuseau actuel et d'où il vient :

- **choisi par toi**, avec **Choisir** ;
- **ta langue Discord**, comme `Europe/Rome` pour l'italien ;
- **le serveur**, quand ta langue est parlée dans plusieurs fuseaux, comme l'anglais (US).

## Choisir ton fuseau

**Choisir** ouvre un formulaire. Colle le nom officiel de ton fuseau, comme `Europe/Rome`.

Pour le trouver, ouvre la **[carte des fuseaux horaires](https://timezones.bitsplitters.app)**, sélectionne ta région et copie la valeur.

À partir de là, TTM te propose ton fuseau chaque fois que tu choisis une date. Un autre fuseau dans un rappel ne vaut que pour cette date : le tien reste.

**Retirer mon fuseau** oublie ton choix, et TTM propose de nouveau le fuseau qu'il utilise [tant que tu n'as pas choisi](#until-you-choose).

## Tant que tu n'as pas choisi

TTM ne change pas ton fuseau tout seul : un autre fuseau dans un rappel ne vaut que pour cette date.

Le salon propose le fuseau de ta langue Discord, et l'Activity celui de ton appareil. Une langue parlée dans plusieurs fuseaux prend le fuseau du serveur : voir [Fuseau horaire](/docs/configuration/#time-zone) dans `/config app`. La ligne sous le champ te dit d'où vient le fuseau et comment définir le tien.

## Dans l'Activity

L'engrenage en haut à droite propose le même choix : **Fuseau horaire**, sous **Pour toi, partout**. Tu peux aussi y chercher ton fuseau par ville ou par pays. Voir [Tes réglages](/docs/activity/#your-settings).
