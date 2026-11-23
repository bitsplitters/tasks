---
title: "Editar una tarea en el canal"
description: "La segunda fila de botones bajo la lista — Contenido, Propietario, Etiqueta, Recordatorio y Webhook — con sus formularios y menús."
fonte: b7393a97a79d
---

La segunda fila bajo la lista actúa sobre **una tarea a la vez**: su texto, su propietario, sus etiquetas, su recordatorio y su webhook. Esta página muestra dónde hacer clic. Qué hace cada función y sus reglas: [Propietarios y etiquetas](/docs/owners-and-tags/), [Recordatorios](/docs/reminders/), [Webhooks](/docs/webhooks/).

## La segunda fila

Cada botón de la segunda fila es un **interruptor de tres estados**. Haz clic para pasar por los mismos colores que usa Discord en sus botones:

- <span class="c-grey">Gris</span> — apagado.
- <span class="c-blue">Azul</span> — activo en modo <span class="c-blue">edición</span>.
- <span class="c-red">Rojo</span> — activo en modo <span class="c-red">eliminación</span>.

El procedimiento es siempre el mismo: **pon un botón en azul o en rojo y luego elige la tarea** en el [menú de marcado](/docs/the-task-list/#the-check-selector). TTM aplica la acción a esa tarea. Mientras un botón está azul o rojo, el selector dice qué va a pasar, por ejemplo *Editar tarea* o *Eliminar tarea*; con todos los botones apagados dice *Marcar tarea*: elige ahí una tarea para marcarla o desmarcarla.

Hasta que hayas elegido una tarea así una vez, poner **Contenido** o **Recordatorio** en azul o en rojo te envía un mensaje que solo ves tú. Dice qué tarea elegir y qué hace volver a pulsar el botón. Cuando ya has elegido una tarea con un botón de la segunda fila encendido, el mensaje deja de salir, en todos los servidores.

| Botón | <span class="c-blue">Azul (editar)</span> | <span class="c-red">Rojo (eliminar)</span> |
| :--- | :--- | :--- |
| [**Contenido**](#content) <img class="inline-ic" src="/icons/task.png" alt="" /> | Cambia el texto de la tarea, en un formulario. | Elimina la tarea. |
| [**Propietario**](#owner) <img class="inline-ic" src="/icons/owner.png" alt="" /> | Fija o cambia el propietario: una persona o un rol. Con [Premium](/docs/premium/), también varias personas. | Quita el propietario, y su recordatorio también. |
| [**Etiqueta**](#tag) <img class="inline-ic" src="/icons/tag.png" alt="" /> | Fija los usuarios y roles a los que avisar, varios a la vez. | Quita todas las etiquetas de la tarea. |
| [**Recordatorio**](#reminder) <img class="inline-ic" src="/icons/alertW.png" alt="" /> | Añade o edita un recordatorio. | Quita el recordatorio. |
| [**Webhook**](#webhook) <img class="inline-ic" src="/icons/api.png" alt="" /> <a class="premium-tag" href="/docs/premium/" title="Desbloqueado para todos los servidores durante la beta">Premium</a> | Vincula un webhook a la tarea. | Quita el webhook de la tarea. |

Con **Propietario**, **Etiqueta**, **Recordatorio** o **Webhook** en rojo, el selector lista solo las tareas que tienen algo que quitar: un propietario, etiquetas, un recordatorio o un webhook. Una tarea hecha solo de etiquetas no aparece, porque sin ellas se quedaría sin texto. Si ninguna tarea tiene algo que quitar, el selector está apagado y lo dice, por ejemplo *Ningún propietario que quitar*, y recibes una nota sobre cómo añadir uno.

Después de usar **Propietario**, **Etiqueta** o **Recordatorio**, el botón vuelve a gris, o se queda encendido para la tarea siguiente: lo decide tu servidor, con **Mantener el estado tras la selección** en el menú **Comportamiento** de [/config app](/docs/configuration/#keep-the-state-after-a-selection). Mantener el estado cambia lo que pueden hacer Propietario y Etiqueta: consulta [Propietario](#owner) y [Etiqueta](#tag).

## Contenido

**Azul** abre un formulario con el texto de la tarea. Sus etiquetas no están en el formulario: se quedan en la tarea, al final del texto, y el botón **Etiqueta** las cambia.

- Los saltos de línea se convierten en espacios, y los canales se muestran por su nombre, como en **Actualización en bloque**.
- Los propietarios, etiquetas, recordatorios y webhooks que escribas ahí se quitan, y TTM te dice qué quitó: tienen sus propios botones.
- Un texto vacío, o uno que dejaría la lista demasiado larga, no se guarda.

Canales, enlaces y emoji en el texto: consulta [Editar una lista a mano](/docs/writing-a-list/).

Mientras el formulario está abierto, la lista queda bloqueada para los demás. Guardar la desbloquea; la ✕ no: consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

**Rojo** elimina la tarea. Eliminar un grupo con subtareas te lo pregunta antes. Sus subtareas se quedan en su sitio: pasan al grupo de arriba, o se convierten en tareas si no hay ninguno. No puedes eliminar la última tarea: usa **Eliminar lista** o **Sellar lista** en [Más](/docs/the-task-list/#whats-inside-more).

## Propietario

**Azul** muestra un menú bajo los botones, con la etiqueta *Elige una tarea en el menú de arriba para tomarla, o elige a quién dársela*.

**Para tomar una tarea**, haz clic en **Propietario** hasta que se ponga azul y elige la tarea en el menú de marcado sin elegir a nadie: pasa a ser tuya, y el canal muestra quién la tomó. Una tarea que ya es tuya, o que tiene otro propietario, se queda como está, y TTM te dice por qué. Para quitarle una tarea a otra persona, elígete a ti en el menú, confirma la selección y luego elige la tarea: sustituir a un propietario requiere una elección explícita.

**Para dar una tarea a alguien**, elige al propietario en el menú, confirma la selección y luego elige la tarea. Para dar una tarea a varias personas, una función [Premium](/docs/premium/):

1. Haz clic en **Propietario** hasta que se ponga azul.
2. Elige a las personas.
3. Confirma la selección: toca **Guardar** en el móvil, o haz clic fuera del menú en el ordenador (consulta [Confirmar una selección](#confirming-a-selection--desktop-vs-mobile)).
4. Elige la tarea en el menú de marcado.
5. TTM crea el rol (TTM1, TTM2…) y se lo da.

**Quien recibe la tarea se entera.** La notificación del canal menciona al nuevo propietario, así que Discord le avisa: a la persona, o a todos los del rol. Cuando tomas una tarea tú mismo, no se menciona a nadie, porque ya lo sabes. Con el [Modo de notificación](/docs/configuration/#notification-mode) en *Notificaciones desactivadas*, no se publica ninguna notificación, como con cualquier otra acción.

Qué puede ser un propietario, y los roles que crea TTM: [Propietarios y etiquetas](/docs/owners-and-tags/#owner-a-person-a-role-or-several-people).

Con **Mantener el estado tras la selección** activado, **Propietario** sigue azul después de tomar una tarea, y el menú se queda vacío: elige la tarea siguiente para tomarla también.

- Una tarea que tiene otro propietario carga a ese propietario en el menú; para un rol creado por TTM, el menú muestra a las personas a las que se dio el rol.
- Cada cambio que confirmas se aplica a esa tarea al instante.
- Si vacías el menú, se quita el propietario, y su recordatorio también, como en el modo rojo.

Para volver a tomar tareas, haz clic en **Propietario** hasta que vuelva a estar azul.

**Rojo** quita el propietario, y su recordatorio también: ya no queda nadie que lo reciba. Si el recordatorio aún no ha llegado, TTM te pide confirmación antes.

## Etiqueta

**Azul** muestra un menú bajo los botones. Por defecto, elige ahí hasta 25 usuarios o roles, confirma la selección (consulta [Confirmar una selección](#confirming-a-selection--desktop-vs-mobile)) y luego elige la tarea:

- elige a *Anna* y *@Devs*, y la tarea queda etiquetada con Anna y @Devs, nada más: tu elección **sustituye** las etiquetas de la tarea;
- elige a las personas **antes** que la tarea: con el menú vacío, TTM te pide que selecciones antes al menos una etiqueta.

**Rojo** quita todas las etiquetas de la tarea.

### Con el estado mantenido — dos modos

Con **Mantener el estado tras la selección** activado, en el menú **Comportamiento** de [/config app](/docs/configuration/#keep-the-state-after-a-selection), el botón sigue azul después de cada tarea. Lo que hace Etiqueta entonces depende de lo que elijas primero:

- **Primero las personas** significa **asignar**.
- **Primero la tarea**, con el menú todavía vacío, significa **edición en vivo**.

**Asignar — elige personas y luego la tarea.** Las etiquetas de la tarea pasan a ser exactamente tu elección, como arriba. Tus elecciones se quedan en el menú, así que puedes aplicar el mismo conjunto a la tarea siguiente, y a la siguiente, sin elegir de nuevo.

**Edición en vivo — elige la tarea, menú vacío.** Pon Etiqueta en azul y elige la tarea que quieres reetiquetar, sin elegir a nadie. No es un error: las etiquetas actuales de la tarea se cargan en el menú, ya marcadas. Ahora editas esa tarea directamente:

- cada vez que cierras el menú, la tarea se actualiza al instante;
- desmarca a alguien y deja la tarea; marca a alguien y se une a ella;
- no hay paso de confirmación, y no se sobrescribe nada: ajustas el conjunto existente;
- desmarca a todos para quitar todas las etiquetas.

Si eliges otra tarea, la edición pasa a ella. Pon Etiqueta en gris para terminar: la próxima activación empieza de cero.

### Confirmar una selección — ordenador y móvil

Los menús de **Etiqueta** y **Propietario** permiten elegir varios a la vez. Estos menús de selección múltiple **no aplican una elección en cuanto la marcas**: esperan a que **confirmes** toda la selección. Los menús de elección única, como el menú de marcado, se aplican en cuanto eliges. Cómo confirmas depende del dispositivo:

- **En el móvil**, aparece un botón **Guardar** bajo el menú abierto. Tócalo para aplicar tus elecciones.
- **En el ordenador**, **no hay botón Guardar**. **Haz clic en cualquier sitio fuera del menú** para cerrarlo: cerrar el menú aplica tu selección. Si tus etiquetas no parecen aplicarse, casi siempre es por esto.

Esto importa sobre todo en la edición en vivo de etiquetas o del propietario: en el ordenador, cada clic fuera del menú guarda un cambio.

## Recordatorio

Haz clic en **Recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" /> hasta que se ponga **azul**. Luego elige la tarea en el menú de marcado: una que aún no esté marcada. TTM abre el formulario **Cuándo**, titulado *Recordatorio para la tarea …*:

| Campo | Formato | Notas |
| :--- | :--- | :--- |
| **Día** | un número (1–31) | rellenado |
| **Mes** | un desplegable, en tu idioma | sin ambigüedad `dd/mm` de la que preocuparse |
| **Año** | un número | rellenado |
| **Hora** | `HH:mm`, 24 horas | p. ej. `15:30` |
| **Zona horaria** | un nombre de zona oficial | rellenada con *tu* zona (hasta que la cambies, la de tu idioma de Discord, o la del servidor) |

Todo llega rellenado con **diez minutos a partir de ahora**. Envíalo, y la tarea muestra la hora programada. Mientras el formulario está abierto, la lista queda bloqueada para los demás. Quién recibe el recordatorio y la zona horaria: consulta [Recordatorios](/docs/reminders/#the-rules).

### La tarjeta resumen

Con los [recordatorios recurrentes](/docs/reminders/#repeating-reminders) activados (una función Premium), enviar **Cuándo** todavía no guarda. TTM te muestra una tarjeta resumen privada con la fecha que entendió, una línea **Recurrencia** y cuatro botones. La línea dice *ninguna* para un recordatorio único, o muestra la insignia de recurrencia:

| Botón | Qué hace |
| :--- | :--- |
| **Guardar** | Guarda el recordatorio exactamente como lo muestra la tarjeta. Cuando editas un recordatorio existente, se activa cuando cambias algo. |
| **Editar fecha** | Vuelve a abrir **Cuándo**, rellenado con los valores actuales. |
| **Editar recurrencia** | Abre el formulario de repetición, con sus tres menús: consulta [Los campos de la repetición](/docs/reminders/#the-repetition-fields). Para un recordatorio único se abre en 2 veces, cada 1 día. Con **1 vez** el recordatorio sigue siendo único. |
| **Cancelar** | Descarta todo — la lista se desbloquea. |

<div class="callout"><div class="callout-t">No se guarda nada hasta que pulsas Guardar</div>Editar la fecha o la recurrencia solo actualiza la tarjeta. Puedes cambiarlas tantas veces como necesites, y <strong>Cancelar</strong> cancela de verdad.</div>

Con los recordatorios recurrentes desactivados, o en el plan Free, la tarjeta aparece solo cuando editas un recordatorio que **ya es recurrente**, para que conserve sus repeticiones: consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders). Un recordatorio nuevo pasa directamente por **Cuándo** y se guarda como evento único.

### Editar o quitar

- **Editar** — pon **Recordatorio** en azul y elige la tarea:
  - si la tarea ya tiene un recordatorio *repetido*, o los recordatorios recurrentes están activados, llegas a la tarjeta resumen, con la fecha y la insignia actuales: cambia solo lo que necesites;
  - si no, se abre **Cuándo**, rellenado con la fecha actual;
  - la misma fecha y recurrencia que ya tiene el recordatorio no cambian nada: TTM te lo dice, y no envía ninguna notificación.
- **Quitar** — haz clic en **Recordatorio** hasta que se ponga **rojo** (modo eliminación) y elige la tarea. El recordatorio se quita.

<div class="callout"><div class="callout-t">Cerrar un formulario no es cancelar</div>Un formulario cerrado con la ✕ deja la lista bloqueada. Usa <strong>Cancelar</strong> en la <a href="#the-summary-card">tarjeta resumen</a> cuando esté; si no, mira <a href="/docs/the-task-list/#when-the-list-is-locked">Cuando la lista está bloqueada</a>.</div>

## Webhook

Los webhooks son una función [Premium](/docs/premium/).

Haz clic en **Webhook** <img class="inline-ic" src="/icons/api.png" alt="" /> hasta que se ponga **azul**, elige el webhook en el selector que aparece y luego elige la tarea. A partir de entonces, completar o reabrir esa tarea dispara la llamada. Haz clic en **Webhook** hasta que se ponga **rojo** y elige la tarea para quitar el vínculo.

Los webhooks en sí se crean con [/config webhook](/docs/config-webhook/), por quien gestiona el servidor. El formulario **Contenido** no muestra el webhook de una tarea, y quita el que escribas ahí, avisándote. En **Actualización en bloque** se muestra como un token: consulta [Webhooks en el texto](/docs/writing-a-list/#webhooks-in-the-text).

## Adónde ir después

- [La lista en el canal](/docs/the-task-list/) — el menú de marcado, la primera fila y Más.
- [Trabajar con una lista en la Activity](/docs/activity-list/) — los mismos cinco botones, en el panel de una tarea.
- [FAQ](/docs/troubleshooting/#in-the-channel) — respuestas rápidas a los problemas más comunes.
