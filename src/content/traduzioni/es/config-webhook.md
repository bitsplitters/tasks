---
title: "/config webhook"
description: "Crea los webhooks de tu servidor: la llamada HTTP, los tokens que puede llevar y las direcciones que TTM acepta."
fonte: d05440cda658
---

`/config webhook` crea los webhooks de tu servidor: la llamada HTTP que envía una tarea cuando se completa o se reabre. Qué hace un webhook y cómo vincularlo a una tarea: consulta [Webhooks](/docs/webhooks/).

Por defecto, solo los miembros con el permiso *Gestionar servidor* pueden usar `/config webhook`, como el resto de `/config`. Consulta [Quién puede abrir /config](/docs/config/#who-can-open-config).

Los webhooks son **Premium**, desbloqueados para todos los servidores durante la beta. Después de la beta, en el plan Free los webhooks que ya tienes se quedan y todavía puedes modificarlos o eliminarlos, pero no puedes crear otros nuevos: consulta [Qué conserva una lista de la beta](/docs/beta/#what-a-beta-list-keeps).

## Crear un webhook

```
/config webhook
```

El comando tiene algunas opciones:

| Opción | ¿Obligatoria? | Valores | Notas |
| :--- | :--- | :--- | :--- |
| **acción** | Obligatoria | ver · crear · editar · eliminar | Lo que quieres hacer. |
| **webhook** | Obligatoria | un nombre | El webhook sobre el que actuar, hasta 96 caracteres. |
| **evento** | Opcional | finalización · reapertura | Omítela para actuar sobre **ambas** direcciones a la vez. |

Al elegir **crear** o **editar** se abre un formulario con cuatro campos:

- **Método HTTP**: `GET`, `POST`, `PUT` o `DELETE`.
- **URL**: una dirección `https` pública.
- **Headers**: una línea `Key: value` por línea.
- **Body**: JSON.

Un webhook es en realidad un **par de acciones**, una para la finalización y otra para la reapertura, bajo un único nombre. El evento elige una de las dos. Si lo omites, un solo comando cubre las dos:

| Acción | Sin evento |
| :--- | :--- |
| **crear** | Configura finalización y reapertura con la misma configuración. Los tokens `{{state}}` y `{{when}}` distinguen los dos eventos. |
| **ver** | Muestra ambas. |
| **editar** | Rellena el formulario con la acción de finalización y sobrescribe ambas. |
| **eliminar** | Quita el webhook por completo, con todas sus acciones. |

Cada servidor puede tener hasta **25** webhooks. ¿Has llegado al tope? Elimina uno que ya no uses: TTM los enumera todos en el mensaje de error.

Un webhook nuevo todavía no está vinculado a ninguna tarea: consulta [Asociar un webhook a una tarea](/docs/webhooks/#associating-a-webhook-with-a-task).

## Tokens

Dentro de la URL, los headers y el body puedes insertar tokens `{{ }}`, que TTM sustituye en el momento del envío.

En el body, un token va dentro de una cadena JSON, entre comillas. TTM escapa el valor, así que una tarea con comillas o un salto de línea sigue enviando un JSON válido.

En la URL, cada valor se codifica en porcentaje: un espacio se convierte en `%20`.

**Tokens integrados**

| Token | Valor |
| :--- | :--- |
| `{{task}}` | El texto de la tarea |
| `{{state}}` | El estado: completada o reabierta |
| `{{list}}` | El título de la lista |
| `{{user}}` / `{{user_id}}` | Nombre / id de quien cambió el estado de la tarea |
| `{{when}}` | Fecha y hora (ISO-8601) |
| `{{guild}}` / `{{guild_id}}` | Nombre / id del servidor |
| `{{channel}}` / `{{channel_id}}` | Nombre / id del canal |

**Variables libres**: define `{{clave=valor}}` en cualquier punto del texto de una tarea y usa `{{clave}}` en el webhook. Los tokens desconocidos se convierten simplemente en una cadena vacía.

## Ejemplo

Un `POST` que anuncia una finalización:

```
Método:  POST
URL:     https://example.com/hooks/ttm
Headers: Content-Type: application/json
Body:
{
  "text": "{{user}} {{state}} \"{{task}}\" in {{list}}",
  "at": "{{when}}"
}
```

## Seguridad

Por la seguridad de todos, TTM solo acepta **URL `https` públicas**. Los destinos internos o no enrutables (`localhost`, rangos de IP privadas, direcciones link-local) están bloqueados.

El body debe ser un JSON válido y cada línea de headers debe respetar el formato `Key: value`.
