---
title: "Acciones sobre la lista"
description: "Limpiar, Reabrir todo, Clonar, Descargar, Sellar y Eliminar: qué hace cada una con la lista entera y dónde la encuentras."
fonte: d65f7aaf1e14
---

Estas acciones trabajan sobre la **lista entera**, nunca sobre una sola tarea. Dos existen en los dos sitios; las demás, solo en el canal.

| Acción | En el canal | En la Activity |
| :--- | :---: | :---: |
| [Limpiar](#clean) | sí | sí |
| [Reabrir todo](#reopen-all) | sí | sí |
| [Clonar](#clone) | sí | — |
| [Descargar](#download) | sí | — |
| [Sellar](#seal) | sí, y en `/config lists` | solo desde `/config lists` |
| [Eliminar](#delete) | sí, y en `/config lists` | solo desde `/config lists` |

<div class="howto" id="how-to-do-it"><div class="howto-t">Cómo se hace</div><div class="howto-grid"><a class="howto-go is-channel" href="/docs/the-task-list/#row-1--acts-on-the-whole-list"><span class="howto-k"><img class="place-ic" src="/icons/posto-canale.svg" alt="" />En el canal</span><span class="howto-d">La primera fila bajo la lista, y Más para Clonar, Descargar, Sellar y Eliminar.</span></a><a class="howto-go is-activity" href="/docs/activity-list/#the-first-row"><span class="howto-k"><img class="place-ic" src="/icons/activity.png" alt="" />En la Activity</span><span class="howto-d">Limpiar la lista y Reabrir todo, arriba en la lista.</span></a></div></div>

## Limpiar

**Limpiar lista** quita todas las tareas completadas, subtareas incluidas, y renumera las tareas que se quedan. Un grupo que no está completado se queda, aunque algunas de sus subtareas se vayan.

Primero, una confirmación te dice cuántas tareas se irán y qué se va con ellas. Se van **para siempre**, con sus recordatorios y etiquetas, si los tienen.

En el canal, si la configuración de tu servidor lo permite, la notificación en el canal de la lista o en su hilo muestra las tareas quitadas: consulta [Modo de notificación](/docs/configuration/#notification-mode). En la Activity acaban en el resumen del final de la sesión.

- **Ninguna tarea completada**: no hay nada que quitar, y el bot te lo dice al instante.
- **Todas las tareas completadas**: Limpiar se niega, porque una lista no puede quedarse vacía. Desmarca al menos una tarea, o elimina la lista entera con [Eliminar](#delete), en el canal.

## Reabrir todo

**Reabrir todo** devuelve a pendiente cada tarea completada. El texto, los propietarios, las etiquetas y los recordatorios se quedan como están. Si ninguna tarea está completada, el bot te dice que no hay nada que reabrir.

Primero, el bot te pide que elijas:

- **Reabrir**: reabre todas las tareas ahora.
- **Nueva fecha**: reabre y mueve los recordatorios de las tareas que reabres. El primero de esos recordatorios en el calendario se mueve a la fecha que elijas, al menos 5 minutos después de ahora. Los demás mantienen la misma distancia respecto a él.

  Los recordatorios de las tareas aún pendientes se quedan como están. Esta opción solo aparece cuando una tarea que reabres tiene un recordatorio.
- **Cancelar**: deja la lista como está.

Al reabrir se activan los **webhooks de reapertura** de las tareas que reabre, y se ignoran los propietarios: cualquiera que pueda editar la lista puede reabrirla.

## Clonar

**Clonar lista** copia la lista en otro canal, como una lista nueva. Tú eliges:

- el canal: canales de texto y canales de voz. Un clon en un canal de voz no tiene historial de actividad: consulta [Canales de voz](/docs/known-limits/#voice-channels);
- si el clon conserva las marcas;
- si conserva los recordatorios.

Un clon recibe recordatorios nuevos, así que un recordatorio recurrente puede ser rechazado: consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).

El clon publica su propia notificación en el canal nuevo y puede mencionar a los propietarios de sus tareas: consulta [Cuando se crea una lista](/docs/configuration/#when-a-list-is-created). El canal de la lista original recibe la notificación habitual del clon, sin menciones.

Un clon es una lista nueva: necesita una plaza libre y no puede tener más tareas de las que permite tu plan. Consulta [Qué desbloquea Premium](/docs/premium/).

Solo en el canal, incluso con la lista bloqueada.

## Descargar

**Descargar** te da un archivo `.txt` de la lista, escrito como se explica en [Editar una lista a mano](/docs/writing-a-list/) y enviado **solo a ti**. El archivo conserva los códigos de Discord en lugar de los nombres: consulta [Los códigos detrás de los nombres](/docs/writing-a-list/#the-codes-behind-the-names).

Guárdalo como copia de seguridad, o reconstruye la lista a partir de él con `/crear-lista`, incluso en otro servidor: consulta [Reutiliza una lista en cualquier sitio](/docs/tips/#reuse-a-list-anywhere).

Un mensaje de Discord está limitado a 2000 caracteres, así que Descargar nunca publica la lista como texto: siempre es un archivo.

Solo en el canal.

## Sellar

**Sellar lista** conserva en el canal una lista terminada como registro, con la marca *Lista sellada*, sin botones ni menús. Sus recordatorios se detienen y libera una [plaza de tu plan](/docs/premium/#how-the-three-places-work). Qué se queda y qué se va: [Sellar](/docs/config-lists/#seal).

Sellar no se puede deshacer, y el bot te pide confirmación antes. Si es posible que quieras reutilizar la lista, descárgala antes de sellarla.

En el canal, desde **Más**, sellar requiere *Gestionar mensajes* en el canal, y una lista que alguien está editando no se puede sellar. Desde [`/config lists`](/docs/config-lists/) valen los permisos de `/config`, y un administrador puede sellar incluso una lista que está en la Activity: antes vuelve al canal.

## Eliminar

**Eliminar lista** quita la lista **de forma permanente**, con sus tareas, propietarios, etiquetas y recordatorios. El mensaje se quita y, en su lugar, aparece en el canal un breve recibo.

Eliminar no se puede deshacer, y el bot te pide confirmación antes. Los permisos son los mismos que para [Sellar](#seal). Desde `/config lists`, eliminar una lista que está en la Activity se la quita también a quienes están dentro.

<div class="callout"><div class="callout-t">¿Por qué eliminar en lugar de quitar el mensaje?</div>Si borras el mensaje a mano, los datos de la lista se quedan y sus recordatorios siguen llegando. <strong>Eliminar lista</strong> se lleva también los recordatorios. Si un mensaje ya no existe, <a href="/docs/config-lists/"><code>/config lists</code></a> te permite limpiar, o recuperar la lista.</div>
