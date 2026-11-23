---
title: "Webhooks"
description: "Dispara una llamada HTTP cuando una tarea se completa o se reabre: conecta TTM con lo que quieras."
fonte: 1b865a3d554e
---

Los webhooks permiten que una tarea hable con el mundo exterior. Vincula uno a una tarea: cuando esa tarea se **completa** o se **reabre**, TTM envía una solicitud HTTP. Puede ir a un sistema de CI, a un chat, a una automatización de hojas de cálculo o a cualquier otra cosa que acepte una llamada.

Quien gestiona el servidor crea los webhooks con [/config webhook](/docs/config-webhook/): la dirección, el método y lo que envía la llamada. Después los vinculas a las tareas con el botón **Webhook**.

Los webhooks son una función [Premium](/docs/premium/).

<div class="howto" id="how-to-do-it"><div class="howto-t">Cómo se hace</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/channel-tasks/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</span><span class="howto-d">Webhook, en la segunda fila bajo la lista: elige el webhook y luego la tarea.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#webhook"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />En la Activity</span><span class="howto-d">Webhook, en el panel de una tarea: los webhooks del servidor por nombre.</span></a></div></div>

## Asociar un webhook a una tarea

Un webhook nuevo todavía no está vinculado a nada. Lo vinculas a una tarea con **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" />: en azul para vincularlo, en rojo para quitarlo.

A partir de ese momento, completar o reabrir esa tarea dispara la llamada.

## Cuándo se dispara un webhook

Un webhook se dispara cuando su tarea se **completa o se reabre**, al marcarla o con **Reabrir todo**. En el canal marcas con el menú de marcado, el menú desplegable bajo la lista. En la Activity marcas la casilla de la tarea.

- **Cada tarea que cambia** dispara su webhook: la que has elegido y las que cambian con ella. Son las subtareas marcadas en cascada o un grupo completado por su última subtarea. Una subtarea que ya estaba marcada no cambia, así que no lanza nada.
- Las llamadas salen **una tras otra**, en el orden de la lista. Todo el marcado cuenta como **un solo clic**, por muchas tareas que cambie.
- **Reabrir todo** dispara los webhooks de reapertura de las tareas que reabre.
- **Actualización en bloque** y **Editar la lista** cambian muchas tareas a la vez y **no** disparan ningún webhook.
- **La lista debe estar en uso**, es decir, ocupar una de las plazas de tu plan: consulta [Cómo funcionan las tres plazas](/docs/premium/#how-the-three-places-work).

Una lista creada durante la beta es la excepción: sus tareas todavía se pueden marcar sin que cuenten para el límite de tres listas. Mientras la lista no se convierta en una de las tres en uso, sus webhooks se quedan callados, y TTM te lo dice en privado.

## Cuando un webhook falla

Si la llamada no llega a su destino, TTM escribe un aviso en el canal de la lista. Nombra el webhook y la tarea, y luego explica el error en una frase. También dice qué revisar: la dirección, las cabeceras, el método o el servidor al que llamas.

Cuando el mismo webhook está en varias tareas que cambian a la vez, recibes un solo aviso, no uno por tarea.

Si las notificaciones están desactivadas en el servidor o TTM no puede escribir en ese canal, el aviso llega solo a quien marcó la tarea. En la Activity, el aviso llega a quien marcó la tarea, en un globo sobre su casilla.

## El webhook en el texto

El vínculo vive en la propia tarea, como el token reservado `{{wb=…}}`. Lo ves en **Actualización en bloque** y en **Editar la lista**: consulta [Webhooks en el texto](/docs/writing-a-list/#webhooks-in-the-text).

El formulario **Contenido** de una sola tarea no muestra el token, y quita el que escribas ahí, avisándote.

El texto de una tarea también puede llevar **variables libres**: escribe `{{clave=valor}}` en cualquier punto y el webhook puede usar `{{clave}}`. Así, un solo webhook puede enviar valores distintos para cada tarea. Consulta [Tokens](/docs/config-webhook/#tokens).
