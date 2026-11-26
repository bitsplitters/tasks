---
title: "Astuces et conseils"
description: "De petites habitudes qui rendent TTM plus rapide et plus discret, dans le salon et dans l'Activity."
fonte: 901e2ac519ca
---

La plupart fonctionnent partout où se trouve la liste. Celles qui n'existent qu'à un seul endroit le disent sous leur titre.

## Réutiliser une liste partout

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</p>

Ouvre **Autre** <img class="inline-ic" src="/icons/other.png" alt="" /> et choisis **Télécharger** <img class="inline-ic" src="/icons/download.png" alt="" /> : la liste arrive sous forme de fichier `.txt` que toi seul peux voir. Ensuite, lance `/creer-liste` sur n'importe quel serveur et joins ce fichier à son option `fichier`.

Les tâches, les états terminés, les propriétaires, les tags, les rappels et les webhooks reviennent tels qu'ils étaient. Ça marche bien pour les checklists que tu répètes, comme les releases, l'onboarding ou les événements.

Si quelque chose dans le fichier ne convient pas au nouveau serveur, TTM ne crée rien et liste tous les problèmes d'un coup. Ce qu'il vérifie : voir [`/creer-liste`](/docs/commands/#create-list).

## Masquer les astuces

Si ton équipe sait déjà où appuyer, masque les **Astuces** dans [/config app](/docs/configuration/#tips) : pas de Tutoriel dans `/creer-liste`, pas de ligne d'aide sous les listes.

## Cloner plutôt que reconstruire

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</p>

Tu gères la même liste dans plusieurs salons ? **Cloner la liste** <img class="inline-ic" src="/icons/clone.png" alt="" />, dans le panneau **Autre** de la liste, la copie en une seule étape — et te laisse décider si tu emportes les cases cochées et les rappels.

## Appliquer une action à plusieurs tâches

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />Dans le salon</p>

Coche **Conserver l'état après la sélection** dans le menu **Comportement** de [/config app](/docs/configuration/#keep-the-state-after-a-selection). Le bouton actif (propriétaire, tag ou rappel) reste allumé après chaque tâche, donc tu peux mettre un tag sur cinq tâches en cinq clics au lieu de quinze.

## Demander qui est dispo

Écris la question comme une tâche, par exemple *Qui est dispo pour un 1v1 ce soir ?*, et ajoute-toi à ses tags : dans le salon, [**Tag**](/docs/channel-tasks/#tag) en bleu et la tâche, avec le menu vide ; dans l'Activity, [**Tag**](/docs/activity-list/#tag) et **Enregistrer**. La personne dispo coche la tâche, et la notification te mentionne. Ça marche pour un scrim, une place dans le raid, une place dans la voiture. La tâche se ferme à la première réponse : qui répond en second la rouvre, et la réouverture te mentionne aussi.

## Garder le salon calme

Si les notifications des tâches te semblent bruyantes, règle le **Mode de notification** dans [/config app](/docs/configuration/#notification-mode) pour ne garder que la dernière, ou désactive-les : la liste reste à jour dans tous les cas.

## Des rappels qui survivent au changement d'heure

Sur un rappel répété, choisis **jours** dans le menu **Unité** pour garder la même heure du jour, **heures** pour un intervalle exact : autour d'un changement d'heure, les deux diffèrent d'une heure. Voir [Les champs de la répétition](/docs/reminders/#the-repetition-fields).

## Un rappel en deux clics

Le rappel commence dix minutes à partir de maintenant, donc pour un « rappelle-le-moi bientôt », enregistre-le tel quel, avec **Quand** dans le salon ou **Enregistrer** dans l'Activity.

## Personnaliser les webhooks avec des variables libres

Place `{{owner=alex}}` (ou n'importe quel `{{clé=valeur}}`) dans le texte d'une tâche et appelle `{{owner}}` dans le body de ton webhook. C'est une façon légère de transmettre des données propres à la tâche sans les écrire en dur. Voir [Les webhooks dans le texte](/docs/writing-a-list/#webhooks-in-the-text).

## Mettre les listes en lecture seule pour les invités

Synchronise les permissions dans [/config app](/docs/configuration/#sync-permissions) pour que seule ton équipe puisse modifier une liste, tandis que tous les autres peuvent quand même la lire. Le bouton **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> suit les mêmes règles.
