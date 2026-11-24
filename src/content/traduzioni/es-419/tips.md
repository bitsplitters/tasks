---
title: "Trucos y consejos"
description: "Pequeños hábitos que hacen TTM más rápido y más silencioso, en el canal y en la Activity."
fonte: 6e297084b41a
---

La mayoría funcionan dondequiera que esté la lista. Los que existen en un solo lugar lo dicen debajo de su título.

## Reutiliza una lista en cualquier lugar

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</p>

Abre **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> y elige **Descargar** <img class="inline-ic" src="/icons/download.png" alt="" />: la lista llega como un archivo `.txt` que solo tú puedes ver. Después ejecuta `/crear-lista` en cualquier servidor y adjunta ese archivo a la opción `archivo`.

Las tareas, los estados de completado, los propietarios, las etiquetas, los recordatorios y los webhooks vuelven como estaban. Funciona bien para las checklists que repites, como lanzamientos, incorporaciones o eventos.

Si algo del archivo no encaja en el servidor nuevo, TTM no crea nada y lista todos los problemas de una vez. Qué comprueba: consulta [`/crear-lista`](/docs/commands/#create-list).

## Oculta los consejos

Si tu equipo ya sabe dónde presionar, oculta los **Consejos** en [/config app](/docs/configuration/#tips): sin Tutorial en `/crear-lista`, sin línea de ayuda debajo de las listas.

## Clona en lugar de reconstruir

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</p>

¿Llevas la misma lista en varios canales? **Clonar lista** <img class="inline-ic" src="/icons/clone.png" alt="" />, en el panel **Más** de la lista, la copia en un solo paso y te deja decidir si te llevas las marcas y los recordatorios.

## Aplica una acción a varias tareas

<p class="place-pill"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</p>

Activa **Mantener el estado tras la selección** en el menú **Comportamiento** de [/config app](/docs/configuration/#keep-the-state-after-a-selection). El botón activo (propietario, etiqueta o recordatorio) se queda encendido después de cada tarea, así que puedes etiquetar cinco tareas en cinco clics en lugar de quince.

## Mantén tranquilo el canal

Si las notificaciones de las tareas te parecen ruidosas, ajusta el **Modo de notificación** en [/config app](/docs/configuration/#notification-mode) para conservar solo la última, o desactívalas: la lista se mantiene actualizada en ambos casos.

## Recordatorios que sobreviven al cambio de horario

En un recordatorio recurrente, elige **Días** en el menú **Unidad** para la misma hora del día, o **Horas** para un intervalo exacto: alrededor de un cambio de horario, los dos difieren en una hora. Consulta [Los campos de repetición](/docs/reminders/#the-repetition-fields).

## Un recordatorio en dos clics

El recordatorio empieza dentro de diez minutos, así que para «recuérdamelo en un rato» guárdalo tal cual, con **Cuándo** en el canal o con **Guardar** en la Activity.

## Personaliza los webhooks con variables libres

Escribe `{{owner=alex}}` (o cualquier `{{clave=valor}}`) en el texto de una tarea y usa `{{owner}}` en el body de tu webhook. Es una forma ligera de pasar datos propios de la tarea sin codificarlos de forma fija. Consulta [Webhooks en el texto](/docs/writing-a-list/#webhooks-in-the-text).

## Haz que las listas sean de solo lectura para los invitados

Sincroniza los permisos en [/config app](/docs/configuration/#sync-permissions) para que solo tu equipo pueda editar una lista, mientras todos los demás todavía pueden leerla. El botón **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> sigue las mismas reglas.
