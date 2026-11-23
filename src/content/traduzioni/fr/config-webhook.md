---
title: "/config webhook"
description: "Crée les webhooks de ton serveur : l'appel HTTP, les jetons qu'il peut porter et les adresses que TTM accepte."
fonte: d05440cda658
---

`/config webhook` crée les webhooks de ton serveur : l'appel HTTP qu'une tâche envoie quand elle est terminée ou rouverte. Ce que fait un webhook et comment l'associer à une tâche : voir [Webhooks](/docs/webhooks/).

Par défaut, seuls les membres ayant la permission *Gérer le serveur* peuvent utiliser `/config webhook`, comme le reste de `/config`. Voir [Qui peut ouvrir /config](/docs/config/#who-can-open-config).

Les webhooks sont **Premium**, débloqués pour chaque serveur pendant la bêta. Après la bêta, avec l'offre Free, les webhooks que tu as déjà restent, et tu peux encore les modifier ou les supprimer, mais tu ne peux pas en créer de nouveaux : voir [Ce que garde une liste de la bêta](/docs/beta/#what-a-beta-list-keeps).

## Créer un webhook

```
/config webhook
```

La commande prend quelques options :

| Option | Obligatoire ? | Valeurs | Notes |
| :--- | :--- | :--- | :--- |
| **action** | Obligatoire | voir · créer · modifier · supprimer | Ce que tu veux faire. |
| **webhook** | Obligatoire | un nom | Le webhook visé, jusqu'à 96 caractères. |
| **événement** | Facultative | achèvement · réouverture | Omets-la pour agir sur **les deux** sens à la fois. |

Choisir **créer** ou **modifier** ouvre un formulaire à quatre champs :

- **Méthode HTTP** — `GET`, `POST`, `PUT` ou `DELETE`.
- **URL** — une adresse `https` publique.
- **Headers** — un `Key: value` par ligne.
- **Body** — JSON.

Un webhook est en réalité une **paire d'actions**, une pour l'achèvement et une pour la réouverture, sous un seul nom. L'événement en choisit une. Si tu l'omets, une seule commande couvre les deux :

| Action | Sans événement |
| :--- | :--- |
| **créer** | Définit l'achèvement et la réouverture avec la même configuration. Les jetons `{{state}}` et `{{when}}` distinguent les deux événements. |
| **voir** | Affiche les deux. |
| **modifier** | Préremplit à partir de l'action d'achèvement, et écrase les deux. |
| **supprimer** | Retire entièrement le webhook, avec toutes ses actions. |

Chaque serveur peut garder jusqu'à **25** webhooks. Tu as atteint le plafond ? Supprime-en un que tu n'utilises plus : TTM les liste tous dans l'erreur.

Un nouveau webhook n'est encore associé à aucune tâche : voir [Associer un webhook à une tâche](/docs/webhooks/#associating-a-webhook-with-a-task).

## Jetons

Dans l'URL, les headers et le body, tu peux placer des jetons `{{ }}`, que TTM remplace au moment de l'envoi.

Dans le body, un jeton se place dans une chaîne JSON, entre guillemets. TTM échappe la valeur, donc une tâche avec des guillemets ou un retour à la ligne envoie quand même un JSON valide.

Dans l'URL, chaque valeur est encodée en pourcentage : un espace devient `%20`.

**Jetons intégrés**

| Jeton | Valeur |
| :--- | :--- |
| `{{task}}` | Le texte de la tâche |
| `{{state}}` | L'état : terminée ou rouverte |
| `{{list}}` | Le titre de la liste |
| `{{user}}` / `{{user_id}}` | Nom / id de la personne qui a changé l'état de la tâche |
| `{{when}}` | Date et heure (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Nom / id du serveur |
| `{{channel}}` / `{{channel_id}}` | Nom / id du salon |

**Variables libres** — définis `{{clé=valeur}}` n'importe où dans le texte d'une tâche, et appelle `{{clé}}` dans le webhook. Les jetons inconnus deviennent simplement une chaîne vide.

## Exemple

Un `POST` qui annonce un achèvement :

```
Méthode: POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Sécurité

Pour la sécurité de tous, TTM n'accepte que des **URL `https` publiques**. Les destinations internes ou non routables (`localhost`, plages d'IP privées, adresses link-local) sont bloquées.

Le body doit être un JSON valide, et chaque ligne de header doit respecter le format `Key: value`.
