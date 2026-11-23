---
title: "La lista en el canal"
description: "El mensaje de la lista en un canal de Discord: el selector de marcado, la primera fila de botones, Más y qué pasa mientras alguien la edita."
fonte: 6656d50714c3
---

Cuando una lista existe, TTM muestra un **selector de marcado** y **dos filas de botones** debajo. Casi nada aquí necesita un comando: basta con hacer clic. La primera fila actúa sobre toda la lista y se explica aquí. La segunda actúa sobre una sola tarea: consulta [Editar una tarea en el canal](/docs/channel-tasks/).

## Bajo la lista

La lista termina con una fina **barra de progreso**: la proporción de casillas marcadas, tareas y subtareas juntas, en pasos del 5 %. Se mueve en cuanto marcas una casilla y solo está llena cuando lo están todas. Una lista sellada la conserva y muestra dónde terminó la lista.

Sobre la barra, una pequeña línea ayuda a quien empieza: *¿No sabes qué hacen los botones? Más → Guía*. **Guía**, en [Más](#whats-inside-more), explica cada botón sin salir de Discord. Si tu equipo no la necesita, oculta los **Consejos** en [/config app](/docs/configuration/#tips): la línea desaparece y la barra se queda. Mientras la lista está bloqueada, esa misma línea dice quién la está editando y cómo desbloquearla, incluso con los Consejos ocultos: consulta [Cuando la lista está bloqueada](#when-the-list-is-locked).

Mientras la lista está en la [Activity](/docs/activity/), la línea lo dice y **Entrar a la Activity** es el único botón bajo la lista.

## El selector de marcado

Sobre los botones está el **selector de marcado**: el menú desplegable que muestra el título de la lista. Una lista con más de 25 tareas tiene dos menús, cada uno con la etiqueta de la posición de su última tarea. Sirve para:

1. **Marcar tareas como hechas o pendientes**: marca una tarea para completarla, desmárcala para reabrirla. Su casilla muestra <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> o <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />.
2. **Elegir la tarea sobre la que actúa un botón activo** (consulta [la segunda fila](/docs/channel-tasks/#the-second-row)).

Marcar o desmarcar un grupo hace lo mismo con sus subtareas. Completar todas sus subtareas completa el grupo. Una tarea con propietario solo puede marcarla su propietario y quien tenga *Gestionar mensajes* en el canal: consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task). Un rechazo llega solo a quien eligió la tarea.

<div class="callout"><div class="callout-t">Mantén apagados los botones de las tareas</div>Para marcar o desmarcar tareas, <strong>todos los botones de la segunda fila deben estar apagados</strong>. Si algún botón de tarea está activo (azul o rojo), elegir una tarea aplica esa acción en lugar de marcarla.</div>

## Fila 1: actúa sobre toda la lista

Estos botones nunca tocan una sola tarea: actúan sobre **toda la lista**. Qué hace cada acción, en los dos lugares: [Acciones sobre la lista](/docs/list-actions/).

| Botón | Qué hace |
| :--- | :--- |
| **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" /> | Abre la lista en la Activity, una ventana dentro de Discord donde trabajan en ella juntos. Consulta [La Activity](/docs/activity/). |
| **Actualización en bloque** <img class="inline-ic" src="/icons/edit.png" alt="" /> | Edita el título y toda la lista como texto, en un único formulario. Para una sola tarea, usa la [segunda fila](#row-2--acts-on-a-single-task). Consulta [Actualización en bloque](#bulk-update). |
| **Limpiar lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Quita todas las tareas completadas, tras una confirmación. |
| **Reabrir todo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Devuelve a pendientes todas las tareas completadas. También puedes mover sus recordatorios a una nueva fecha. |
| **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> | Abre un panel con las acciones que necesitas menos a menudo: la guía dentro de Discord y clonar, descargar, sellar o eliminar la lista. Cuando la lista está bloqueada, se desbloquea desde aquí. |

### Actualización en bloque

**Actualización en bloque** abre un formulario con el título y toda la lista como texto: una línea por tarea, en el formato explicado en [Editar una lista a mano](/docs/writing-a-list/). Cambia lo que necesites y envía.

- Las personas, los roles y los canales aparecen por su nombre, y las fechas de los recordatorios en tu zona horaria.
- Una línea bajo el texto explica cómo agregar a alguien nuevo: consulta [Personas, roles y canales por su nombre](/docs/writing-a-list/#people-roles-and-channels-by-name).
- Mientras el formulario está abierto, la lista está bloqueada para todos los demás: consulta [Cuando la lista está bloqueada](#when-the-list-is-locked).

Si la lista cambió mientras la editabas, TTM te pregunta qué hacer antes de guardar: consulta [Cuando la lista cambia mientras la editas](#when-the-list-changes-while-you-edit-it). Si el texto no se puede guardar, TTM te lo muestra de nuevo con todos los problemas: consulta [Cuando el texto no se puede guardar](/docs/writing-a-list/#when-the-text-cant-be-saved).

### Limpiar lista

Una ventana de confirmación te dice cuántas tareas se van y qué se va con ellas. Envíala para confirmar, o cierra la ventana para cancelar. Qué quita Limpiar y qué conserva: [Limpiar](/docs/list-actions/#clean).

### Reabrir todo

El bot te pregunta en un mensaje que solo tú puedes ver: **Reabrir**, **Nueva fecha** o **Cancelar**. **Nueva fecha** abre la ventana **Cuándo**, la misma que la de un [recordatorio](/docs/channel-tasks/#reminder): elige la fecha a la que se mueve el primer recordatorio. Qué cambia Reabrir todo: [Reabrir todo](/docs/list-actions/#reopen-all).

Si alguien bloquea o sella la lista antes de que confirmes, no cambia nada: consulta [Cuando la lista está bloqueada](#when-the-list-is-locked).

### Qué hay dentro de Más

Discord permite cinco botones por fila, así que las acciones que necesitas menos a menudo están en un panel que solo tú puedes ver:

- **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />: solo mientras la lista está bloqueada. Muestra quién la está editando y vuelve a encender los botones de la lista para todos. Consulta [Cuando la lista está bloqueada](#when-the-list-is-locked).
- **Guía** <img class="inline-ic" src="/icons/doc.png" alt="" />: la guía rápida dentro de Discord, con un enlace de vuelta a esta documentación.
- **Clonar lista** <img class="inline-ic" src="/icons/clone.png" alt="" />: clona la lista en otro canal, incluso mientras la lista está bloqueada. Consulta [Opciones de clonación](#clone-options).
- **Descargar** <img class="inline-ic" src="/icons/download.png" alt="" />: un archivo `.txt` de la lista, enviado **solo a ti**. Consulta [Descargar](/docs/list-actions/#download).
- **Sellar lista** <img class="inline-ic" src="/icons/seal.png" alt="" />: conserva en el canal una lista terminada como registro, sin botones ni menús. Consulta [Sellar](/docs/list-actions/#seal).
- **Eliminar lista** <img class="inline-ic" src="/icons/delete.png" alt="" />: elimina la lista **de forma permanente**. Consulta [Eliminar](/docs/list-actions/#delete).

Sellar y eliminar no se pueden deshacer, y el bot te pide confirmación antes. Las dos necesitan *Gestionar mensajes* en el canal: el mismo permiso que te permite eliminar a mano el mensaje de la lista. Sin él, esas dos entradas no aparecen. Guía, Clonar lista y Descargar están para todos, y también Desbloquear lista cuando la lista está bloqueada.

Mientras la lista está bloqueada, Sellar lista y Eliminar lista no aparecen. Quien la está editando guardaría sobre una lista que ya no existe.

### Opciones de clonación

Cuando presionas **Clonar lista** en **Más**, los controles de la clonación ocupan el lugar de la primera fila bajo la lista, y el panel te lleva a la lista:

- **Crear lista**: inicia la clonación en el canal elegido en el menú desplegable.
- **Opción de selección**: conserva las marcas en la copia, o no.
- **Opción de recordatorios**: conserva los recordatorios en la copia, o no.
- **Salir**: vuelve al panel de la lista como estaba. Si alguien estaba editando la lista, sigue bloqueada.

El menú desplegable ofrece los canales de texto y los canales de voz. Qué conserva una copia y los límites de tu plan: [Clonar](/docs/list-actions/#clone).

## Fila 2: actúa sobre una sola tarea

La segunda fila tiene cinco botones (Contenido, Propietario, Etiqueta, Recordatorio y Webhook) y cada uno es un interruptor de tres estados: apagado, editar o eliminar. Enciende uno y después elige la tarea. Cada botón, sus formularios y sus menús: [Editar una tarea en el canal](/docs/channel-tasks/).

## Cuando la lista está bloqueada

TTM bloquea la lista mientras alguien la edita:

- en **Actualización en bloque**;
- en el formulario del texto de una tarea;
- en un formulario de recordatorio.

Para todos los demás se apagan: el selector de marcado, el botón de la Activity, **Actualización en bloque**, **Limpiar lista**, **Reabrir todo** y los botones de las tareas. **Más** se queda encendido, con **Clonar lista** dentro. **Más** muestra quién está editando, y una lista bloqueada no se puede sellar ni eliminar desde ahí.

La última línea de la lista también lo dice: *🔒 @nombre está editando la lista. ¿Se quedó bloqueada? Más → Desbloquear lista*. Ocupa el lugar de la línea de los Consejos y aparece incluso cuando tu servidor oculta los Consejos. La mención muestra el nombre y no avisa a nadie. Cuando la lista se desbloquea, la línea de los Consejos vuelve, si tu servidor la muestra.

Bloquear la lista también apaga **Propietario**, **Etiqueta** y **Webhook** si uno de ellos estaba encendido: ábrelo de nuevo desde su botón cuando lo necesites.

Guardar el formulario desbloquea la lista. Cerrarlo con **Cancelar** o con la ✕ no, porque Discord no se lo comunica al bot: **Actualización en bloque** y el formulario del texto de una tarea lo dicen en su última línea. Entonces cualquiera puede desbloquear la lista: abre **Más** y presiona **Desbloquear lista** <img class="inline-ic" src="/icons/unlock.png" alt="" />.

Un administrador puede, aun así, sellar, eliminar o regenerar una lista bloqueada desde [`/config lists`](/docs/config-lists/). Si eso ocurre mientras la estás editando, tu cambio no se guarda. El bot te lo dice y te devuelve el texto que habías escrito.

### Cuando la lista cambia mientras la editas

Alguien puede haber iniciado una acción antes de que bloquearas la lista: un recordatorio o el texto de una tarea. Cuando termina, su cambio se aplica, pero la lista sigue bloqueada para ti. **Más** dice entonces quién la actualizó mientras tanto.

Cuando guardas **Actualización en bloque**, TTM comprueba si la lista sigue siendo la que abriste. Si cambió, todavía no se guarda nada. Un mensaje que solo tú puedes ver lo dice, muestra el texto que escribiste y ofrece tres opciones:

- **Sobrescribir**: guarda tu texto. Las actualizaciones hechas mientras tanto se pierden.
- **Recargar**: vuelve a abrir **Actualización en bloque** con la lista actualizada. Tu texto se queda en el mensaje, para copiarlo.
- **Cancelar**: deja la lista como está, con las actualizaciones, y la desbloquea.

Si la lista se bloquea o se sella antes de que confirmes Limpiar o Reabrir, no cambia nada. El bot te lo dice: *Ahora esta lista no se puede tocar: alguien la está editando, o fue sellada.*

## Adónde ir después

- [Editar una tarea en el canal](/docs/channel-tasks/): la segunda fila, es decir, contenido, propietario, etiquetas, recordatorio y webhook.
- [La Activity](/docs/activity/): trabajen juntos en una lista, en una ventana dentro de Discord.
- [Editar una lista a mano](/docs/writing-a-list/): menciones, propietarios, enlaces y recordatorios en el texto de Actualización en bloque.
- [/config app](/docs/configuration/): controla notificaciones, historial y permisos.
- [FAQ](/docs/troubleshooting/#in-the-channel): respuestas rápidas a los problemas más comunes.
