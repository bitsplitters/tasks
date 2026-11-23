---
title: "/my timezone"
description: "Ton fuseau horaire, choisi une fois : TTM te le propose chaque fois que tu choisis une date, sur tous les serveurs, dans le salon et dans l'Activity."
fonte: ec7d9b989675
---

Chaque fois que tu choisis une date pour un rappel, TTM te propose un fuseau horaire. Avec `/my timezone`, tu choisis **le tien** une seule fois, et TTM te le propose sur tous les serveurs, dans le salon et dans l'Activity.

Ainsi, chacun dans l'équipe raisonne dans son heure locale. La commande fonctionne seulement sur les serveurs, ne demande aucune permission, et son panneau n'est visible que par toi.

## Le panneau

`/my timezone` affiche ton fuseau actuel et d'où il vient :

- **choisi par toi**, avec **Choisir** ;
- **le dernier que tu as laissé dans un rappel** ;
- **ta langue Discord**, comme `Europe/Rome` pour l'italien ;
- **le serveur**, quand ta langue est parlée dans plusieurs fuseaux, comme l'anglais (US).

## Choisir ton fuseau

**Choisir** ouvre un formulaire. Colle le nom officiel de ton fuseau, comme `Europe/Rome`.

Pour le trouver, ouvre la **[carte des fuseaux horaires](https://timezones.bitsplitters.app)**, sélectionne ta région et copie la valeur.

À partir de là, TTM te propose ton fuseau chaque fois que tu choisis une date. Un autre fuseau dans un rappel ne vaut que pour cette date : le tien reste.

**Revenir en automatique** oublie ton choix, et TTM apprend de nouveau ton fuseau à partir de tes rappels.

## Tant que tu n'as pas choisi

TTM apprend ton fuseau tout seul. Le fuseau que tu laisses dans un rappel devient le tien, et la ligne sous le champ te le dit.

Avant ton premier rappel, le salon propose le fuseau de ta langue Discord, et l'Activity celui de ton appareil. Une langue parlée dans plusieurs fuseaux prend le fuseau du serveur : voir [Fuseau horaire](/docs/configuration/#time-zone) dans `/config app`.

## Dans l'Activity

L'engrenage en haut à droite propose le même choix : **Fuseau horaire**, sous **Pour toi, partout**. Tu peux aussi y chercher ton fuseau par ville ou par pays. Voir [Tes réglages](/docs/activity/#your-settings).
