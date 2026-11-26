---
title: "Trabajar con una lista en la Activity"
description: "Las casillas, la primera fila, el panel de una tarea (Contenido, Propietario, Etiqueta, Recordatorio y Webhook) y quién está editando qué."
fonte: 0f9b0e6b28e5
---

Dentro de la Activity la lista es una página propia: una casilla delante de cada tarea, una fila de botones arriba y un panel para cada tarea. Las reglas son las del canal: propietarios, configuración del servidor, límites del plan. Qué hace cada función: [Propietarios y etiquetas](/docs/owners-and-tags/), [Recordatorios](/docs/reminders/), [Webhooks](/docs/webhooks/), [Acciones sobre la lista](/docs/list-actions/).

Bajo la lista, una línea ayuda a quien empieza: *¿No sabes por dónde empezar? Toca una casilla para marcar una tarea, su texto para lo demás.* Sigue los [Consejos](/docs/configuration/#tips) del servidor, como en el canal.

## La primera fila

Estos botones actúan sobre toda la lista.

| Botón | Qué hace |
| :--- | :--- |
| **Guía** <img class="inline-ic" src="/icons/doc.png" alt="" /> | Una breve guía de la Activity, en cinco páginas. |
| **Editar la lista** <img class="inline-ic" src="/icons/edit.png" alt="" /> | El título y toda la lista como texto: consulta [Editar la lista](#edit-the-list). |
| **Limpiar la lista** <img class="inline-ic" src="/icons/clean.png" alt="" /> | Quita las tareas completadas: consulta [Limpiar la lista y Reabrir todo](#clean-the-list-and-reopen-all). |
| **Reabrir todo** <img class="inline-ic" src="/icons/reopen.png" alt="" /> | Devuelve a pendientes las tareas completadas; **Nueva fecha** mueve sus recordatorios. |
| **Salir** <img class="inline-ic" src="/icons/back.png" alt="" /> | Devuelve la lista al canal: consulta [Volver al canal](/docs/activity/#back-to-the-channel). |

Sobre la fila, **Inicio** te lleva al [inicio del canal](/docs/activity/#the-home-of-the-channel) y el engranaje abre [tu configuración](/docs/activity/#your-settings). Clonar, Descargar, Sellar, Eliminar y Desbloquear no están aquí: [se quedan en el canal](/docs/activity/#what-stays-in-the-channel).

## Marcar una tarea

**Toca la casilla** delante de una tarea para marcarla y tócala otra vez para reabrirla. Un grupo arrastra a sus subtareas y queda marcado cuando lo están todas, como en el canal. Cada tarea que cambia dispara su [webhook](#webhook), subtareas y grupo incluidos, como en el canal.

Cuando se rechaza un marcado, un globo sobre la casilla te dice por qué: una tarea con propietario solo puede marcarla su propietario y quien tenga *Gestionar mensajes* en el canal (consulta [Quién puede marcar una tarea](/docs/core-concepts/#who-can-tick-a-task)). En una tarea que otra persona está editando, el globo dice quién.

## El panel de una tarea

**Toca el texto de una tarea** para abrir su panel, titulado *Elige qué cambiar en la tarea …*. Tiene los cinco botones de la segunda fila del canal: **Contenido**, **Propietario**, **Etiqueta**, **Recordatorio** y **Webhook**. Cada uno pasa por tres colores:

- <span class="c-grey">Gris</span>: apagado.
- <span class="c-blue">Azul</span>: editar; el panel muestra los campos y **Guardar**.
- <span class="c-red">Rojo</span>: eliminar; el panel muestra **Eliminar**. En una tarea que no tiene nada que eliminar, la frase de arriba lo dice, por ejemplo *Ningún propietario que quitar*, y **Eliminar** se queda apagado.

Un tercer toque vuelve a poner el botón en gris. No pasa nada hasta que tocas **Guardar** o **Eliminar**. Tras una acción, el panel se queda en la misma tarea, con los botones en gris, listo para el siguiente cambio. Se cierra con **Cerrar**, con un toque fuera de él o solo, tras 30 segundos sin actividad.

Mientras el panel está abierto, la tarea está bloqueada para los demás: consulta [Quién está editando qué](#who-is-editing-what).

## Contenido

**Azul** muestra el texto de la tarea, para cambiarlo, con los canales por su nombre, como `#general`. Los propietarios, las etiquetas, los recordatorios y los webhooks escritos ahí se quitan: tienen sus propios botones. Un propietario que TTM no conoce no se guarda: el mensaje te lleva a **Propietario**.

**Rojo** elimina la tarea. Eliminar un grupo con subtareas te pide confirmación antes, como en el canal. La última tarea de una lista no se puede eliminar: una lista no puede quedarse vacía. Para eliminar toda la lista, usa el canal.

## Propietario

**Azul** muestra una búsqueda entre las personas y los roles del servidor, con quienes están en la Activity primero. Toca un nombre para agregarlo, tócalo otra vez para quitarlo y después **Guardar**. Quita todos los nombres y **Guardar** elimina el propietario, igual que **Rojo**.

**Para tomar una tarea** sin propietario, presiona **Propietario** hasta que se ponga azul: tu nombre ya está elegido, así que **Guardar** hace tuya la tarea.

Para dársela a otra persona, toca su nombre: ocupa el lugar del tuyo. Una tarea que ya tiene propietario lo muestra, y solo cambia si eliges a alguien.

- Una persona o un rol bastan con cualquier plan.
- Varias personas se convierten en un rol que crea TTM, en Premium: consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates). Cuando falta algo, **Guardar** se queda apagado y el panel dice por qué.

**Rojo** quita el propietario, y también su recordatorio: no queda nadie que lo reciba. Si el recordatorio aún no se envió, el panel te pide confirmación antes.

## Etiqueta

**Azul** muestra las etiquetas que la tarea tiene ahora, ya elegidas. Agrega y quita personas o roles desde la búsqueda, hasta 25, y después **Guardar**: la tarea recibe exactamente el conjunto que ves. No hay modo de sobrescritura ni edición en directo: siempre partes de las etiquetas actuales.

**Para agregarte**, presiona **Etiqueta** hasta que se ponga azul: si no estás entre las etiquetas, tu nombre ya está agregado después de ellas, así que **Guardar** te agrega. Para etiquetar a otra persona, toca su nombre: ocupa el lugar del tuyo. Si alguien cambia las etiquetas mientras miras, **Guardar** te agrega igual a las nuevas.

Quítalas todas y **Guardar** elimina todas las etiquetas, igual que **Rojo**.

**Rojo** quita todas las etiquetas. En ambos casos, una tarea formada solo por etiquetas las conserva, porque sin ellas se quedaría sin texto.

## Recordatorio

**Azul** muestra juntas la **Fecha**, la **Hora** y la **Zona horaria**, y las repeticiones cuando corresponden.

- Un recordatorio **nuevo** parte de diez minutos desde ahora, con **Guardar** ya encendido.
- Un recordatorio **existente** muestra sus valores. **Guardar** se queda apagado hasta que cambies algo.
- **Guardar** se queda apagado con una fecha pasada o a menos de 5 minutos de ahora: *La fecha ya pasó* te dice que elijas una nueva.

Toca **Zona horaria** para elegirla: busca por ciudad, por país, por un nombre como `Europe/Rome` o por una diferencia como `+5:30`.

- *Tus zonas horarias* enumera las que te importan: la de este dispositivo, la tuya, la del servidor.
- Una línea bajo el campo te dice de dónde viene la zona: la tuya, la de este dispositivo o la del servidor, con **Configuración** para elegir la tuya. Una zona distinta se aplica solo a esa fecha: consulta [Tu zona horaria](/docs/reminders/#your-time-zone).
- *En este dispositivo* muestra el mismo momento en la hora de tu dispositivo, cuando la zona es distinta.

Los tres menús de repetición aparecen en Premium, con el interruptor de los [recordatorios repetidos](/docs/reminders/#repeating-reminders) activado, o cuando el recordatorio ya se repite: consulta [Los campos de repetición](/docs/reminders/#the-repetition-fields).

Una tarea marcada no puede tener recordatorio. En una tarea sin propietario, el panel dice que al guardar te conviertes en su propietario.

**Rojo** quita el recordatorio.

## Webhook

Los webhooks son una función [Premium](/docs/premium/).

**Azul** enumera los webhooks del servidor por nombre, cada uno con el momento en que se dispara: *al completarse*, *al reabrirse* o *siempre*. La dirección nunca se muestra. Elige uno y después **Guardar**.

Un webhook que ya no existe aparece arriba, marcado como *ya no existe*, para que puedas elegir otro. Si el servidor no tiene ninguno, el panel dice que se crean con [/config webhook](/docs/config-webhook/).

**Rojo** quita el webhook de la tarea.

## Editar la lista

**Editar la lista** muestra el título y cada tarea como texto, en el formato explicado en [Editar una lista a mano](/docs/writing-a-list/): el mismo texto que la **Actualización en bloque** del canal, leído con las mismas reglas: personas, roles y canales por su nombre, fechas de los recordatorios en tu zona horaria.

Una línea bajo el texto explica cómo agregar a alguien nuevo y enlaza a [Editar una lista a mano](/docs/writing-a-list/#people-roles-and-channels-by-name). Cambia lo que necesites y guarda.

La lista está bloqueada para los demás desde el momento en que se abre hasta que guardas o cancelas: **Cancelar**, la ✕ y un toque fuera la desbloquean. Se cierra sola tras 30 segundos sin actividad. Si el texto no se puede guardar, los problemas aparecen debajo: consulta [Cuando el texto no se puede guardar](/docs/writing-a-list/#when-the-text-cant-be-saved).

## Limpiar la lista y Reabrir todo

**Limpiar la lista** te pide confirmación antes. El resumen del final de la sesión registra cuántas tareas quitaste. Si no hay ninguna tarea completada, o si lo están todas, lo dice y no cambia nada.

**Reabrir todo** te pide confirmación cada vez. **Nueva fecha**, en la misma ventana, mueve los recordatorios de las tareas que reabres. Reabrir dispara los webhooks de reapertura de las tareas que reabres. Qué cambian las dos acciones: [Acciones sobre la lista](/docs/list-actions/).

## Quién está editando qué

Dos personas nunca cambian lo mismo a la vez:

- Tu primer cambio en una tarea la bloquea para los demás. Un toque en su casilla les dice quién la está editando; las demás tareas siguen libres.
- Mientras alguien cambia una tarea, **Editar la lista**, **Limpiar la lista** y **Reabrir todo** esperan y dicen a quién esperan.
- **Editar la lista** bloquea toda la lista: las casillas vuelven cuando termina.

Una edición que se queda quieta 20 segundos pregunta *¿Sigues ahí? La edición se cierra en 10 segundos*; a los 30 se cierra y lo que no se había guardado se pierde. La lectura no tiene límite de tiempo.

Si alguien cambia lo mismo justo antes de que guardes, eliges tú: **Sobrescribir**, que guarda tu cambio y pierde el suyo; **Recargar**, con tu texto conservado debajo para copiarlo; o **Cancelar**.

## Adónde ir después

- [La Activity](/docs/activity/): cómo entrar, el inicio del canal y cómo volver al canal.
- [Editar una tarea en el canal](/docs/channel-tasks/): los mismos cinco botones, bajo la lista en el canal.
- [FAQ](/docs/troubleshooting/#in-the-activity): respuestas rápidas a los problemas más comunes.
