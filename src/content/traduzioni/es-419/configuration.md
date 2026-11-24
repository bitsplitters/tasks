---
title: "/config app"
description: "Personaliza notificaciones, historial, recordatorios, zona horaria y permisos con /config app."
fonte: cc3b2bd36302
---

Ejecuta el comando:

```
/config app
```

TTM abre un panel privado con un resumen de tu configuración actual: primero el botón **Consejos**, después cinco menús desplegables y otros dos botones. Nada aquí es definitivo: cámbialo cuando cambien las necesidades de tu equipo.

Por defecto, solo los miembros con el permiso *Administrar servidor* pueden usar `/config app`, igual que el resto de `/config`. Consulta [Quién puede abrir /config](/docs/config/#who-can-open-config).

Los ajustes se aplican igual a las listas del canal y de la [Activity](/docs/activity/). Cuando un ajuste cuenta solo en un lugar, o funciona de forma distinta en los dos, su sección lo dice.

## Consejos

El primer grupo del panel es un botón que muestra si los consejos están activados: verde con **Activados** cuando lo están, gris con **Desactivados** cuando no. Haz clic en él para cambiarlo. Los consejos se aplican en el canal y en la Activity.

Los consejos ayudan a quien empieza con TTM, en cuatro lugares:

- cuando alguien ejecuta `/crear-lista`, una breve explicación de cómo escribir una lista y una invitación a probar el modo Activity, con los botones **Crea tu lista** y **Tutorial**: la lista nueva ocupa el lugar de la explicación;
- bajo cada lista del canal, una pequeña línea que remite a la guía de Discord: *¿No sabes qué hacen los botones? Más → Guía*, con un enlace a [La lista en el canal](/docs/the-task-list/);
- bajo la lista en la Activity, una línea que dice dónde tocar: *¿No sabes por dónde empezar? Toca una casilla para marcar una tarea, su texto para lo demás.* Consulta [Trabajar con una lista en la Activity](/docs/activity-list/);
- en una lista nueva, la primera notificación del canal termina con una breve explicación: por qué TTM publica notificaciones, qué es el hilo del historial y dónde se configuran. Aparece una vez por lista: consulta [Cuando se crea una lista](#when-a-list-is-created).

Activados por defecto: útiles mientras el equipo aprende los botones, fáciles de desactivar cuando todos ya los conocen. Con los consejos ocultos:

- `/crear-lista` abre directamente el formulario de creación, sin el botón **Tutorial**: consulta [Primeros pasos](/docs/getting-started/#2-create-your-first-list);
- las listas terminan sin la línea de ayuda;
- las listas nuevas publican su primera notificación sin la explicación.

Una lista recoge el cambio la próxima vez que se actualiza. En cualquier caso, la [barra de progreso](/docs/the-task-list/#under-the-list) se mantiene, y una lista bloqueada sigue terminando con la línea que dice quién la está editando: consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

## Modo de notificación

Controla cuánto ruido de notificaciones deja el bot en el canal cuando se seleccionan tareas:

| Opción | Comportamiento |
| :--- | :--- |
| Eliminar todas las notificaciones excepto la última | Elimina todas las notificaciones excepto la más reciente. |
| Eliminar todas las notificaciones excepto las dos últimas | Elimina todas excepto las dos últimas. |
| No eliminar ninguna notificación | No elimina nunca las notificaciones. |
| Notificaciones desactivadas | No publica en absoluto las notificaciones de selección de tareas. |

Cuando un marcado completa toda la lista, su notificación dice **Lista completada** bajo quien marcó, y el [hilo del historial](#history-tracking) también.

En la Activity, los marcados no publican una notificación uno a uno: cuando la lista vuelve al canal, el resumen de la sesión sigue esta opción. Consulta [Volver al canal](/docs/activity/#back-to-the-channel).

### Cuando se crea una lista

Una lista nueva publica bajo sí misma su propia notificación: *he creado la lista*, con un enlace a la lista. Viene de `/crear-lista`, del Tutorial, de una importación desde un archivo, de una clonación y de **Nueva lista** en la Activity.

Una clonación la publica en el canal nuevo, y el canal de la lista original recibe la notificación habitual de la clonación. Con el modo **Notificaciones desactivadas** no se publica nada en el canal, pero el hilo del historial registra igualmente la creación.

Con [Mencionar a los propietarios en listas nuevas](#mention-owners-in-new-lists) activado, la notificación menciona a los propietarios de las tareas, así que Discord les avisa. Una lista creada en la Activity los menciona en el resumen que la sigue cuando vuelve al canal.

Con los [Consejos](#tips) activados, la primera notificación de una lista nueva termina con una explicación: por qué TTM publica notificaciones y, con el seguimiento del historial activado, qué es el hilo.

Aparece una vez por lista, y solo si los consejos y las notificaciones estaban los dos activados cuando se creó la lista: un equipo que desactivó uno de ellos ya sabe cómo moverse. Las listas creadas antes de que llegara esta explicación no la muestran.

## Seguimiento del historial

Cuando está activado, **cada acción sobre tus listas se registra en un hilo dedicado**, y tienes un rastro de quién hizo qué y cuándo. Activado por defecto. El hilo empieza con la lista: su primera línea dice quién la creó.

Las listas de los canales de voz no tienen hilo de historial, porque Discord no permite hilos ahí: consulta [Canales de voz](/docs/known-limits/#voice-channels). Una sesión en la Activity va al hilo completa, una línea por cambio, cuando la lista vuelve al canal.

## Comportamiento

Un menú desplegable con tres opciones: **Notificaciones push legibles**, **Mantener el estado tras la selección** y **Mencionar a los propietarios en listas nuevas**. Deciden qué hace TTM cuando alguien actúa sobre una lista. Marca las que quieras activar: puedes marcar las tres, algunas o ninguna.

### Notificaciones push legibles

Cuando está activada, TTM agrega texto plano junto a los embeds, para que tus **notificaciones push del celular** se lean de un vistazo. Los embeds solos suelen aparecer vacíos en la pantalla de bloqueo. Activada por defecto.

Desactivarla nunca detiene un recordatorio: llega solo con su tarjeta o, para un rol, solo con la mención. Las menciones de los propietarios salen igualmente con la opción desactivada, por su cuenta.

### Mantener el estado tras la selección

Solo en el canal. Después de usar **Propietario**, **Etiqueta** o **Recordatorio** en la segunda fila bajo la lista, esta opción decide si el botón vuelve a gris o **mantiene** el modo activo.

Desactivada por defecto: el botón vuelve a gris. Actívala cuando apliques la misma acción a varias tareas seguidas.

También cambia lo que pueden hacer **Etiqueta** y **Propietario**. Con la opción desactivada, tu elección siempre sobrescribe. Con la opción activada, también puedes editar en directo las etiquetas o el propietario existentes de una tarea. Consulta [Etiqueta](/docs/channel-tasks/#tag) para ver el detalle completo.

En la Activity, el panel de una tarea siempre funciona igual: tras una acción se queda en la tarea, con los botones en gris. Consulta [El panel de una tarea](/docs/activity-list/#the-panel-of-a-task).

### Mencionar a los propietarios en listas nuevas

Cuando alguien crea, importa o clona una lista, su primera notificación menciona a los propietarios de sus tareas: personas y roles, cada uno una vez, en el orden de la lista. Las menciones van en el texto plano de la notificación, así que Discord avisa a los propietarios.

A quien creó la lista no se le menciona: ya lo sabe. Tampoco se menciona a @everyone, aunque sea propietario de una tarea: una lista nueva no avisa a todo el servidor.

Activada por defecto, también en los servidores que agregaron TTM antes de que llegara esta opción. Una lista creada dentro de una sesión de la Activity menciona a sus propietarios en el resumen, cuando vuelve al canal. Consulta [Cuando se crea una lista](#when-a-list-is-created).

## Aspecto de las listas

Un menú desplegable con dos opciones: **Tareas completadas atenuadas** y **Espacio entre grupos**. Deciden cómo se ven las tareas en las listas. Marca las que quieras activar: las dos, una o ninguna. Una lista que ya está en un canal recoge el cambio la próxima vez que se actualiza, por ejemplo cuando alguien marca una tarea.

Las dos cambian la lista del canal. En la Activity, cada persona fija su propio aspecto con el engranaje: consulta [Tu configuración](/docs/activity/#your-settings).

### Tareas completadas atenuadas

Muestra cada tarea completada con el texto más pequeño y gris de Discord, para que lo que queda por hacer destaque. Activada por defecto; desactívala para mostrar las tareas completadas como todas las demás. Una lista recoge el cambio la próxima vez que se actualiza.

### Espacio entre grupos

Pone una línea en blanco encima y debajo de cada tarea que tiene subtareas, para que cada grupo se separe del resto de la lista.

Desactivada por defecto, para una lista más compacta: los servidores que agregaron TTM antes de la versión 2.0.0 la tienen activada hasta que un administrador la desactiva.

Cambia solo la lista: las notificaciones se quedan como están. Discord no tiene una línea en blanco más fina para una lista, así que la elección es entre una línea entera y ninguna.

## Recordatorios recurrentes

Desactivados por defecto. Cuando están desactivados, cada recordatorio es un **evento único**: crear o editar uno es un **flujo de un solo paso**: eliges fecha y hora, nada más. Más sencillo y rápido para los equipos que solo necesitan un aviso puntual.

**Actívalos** para desbloquear **repeticiones e intervalos**. En el canal, la creación de un recordatorio usa entonces el flujo de dos pasos: una [tarjeta de resumen](/docs/channel-tasks/#the-summary-card) más un formulario de repetición. En la Activity, los menús de repetición se suman a la fecha en el [panel del recordatorio](/docs/activity-list/#reminder). Consulta [Los campos de repetición](/docs/reminders/#the-repetition-fields).

Los recordatorios recurrentes son una función [Premium](/docs/premium/). En el plan Free este menú desplegable se muestra pero apagado, y su nota lo dice. Tu elección no se pierde: en Premium el menú desplegable vuelve como lo dejaste.

El emoji Premium del título del grupo aparece en todos los servidores, también en los Premium: señala una función Premium, no una función ausente.

Un recordatorio que *ya* es recurrente sigue enviándose aunque el interruptor esté desactivado, o en el plan Free. Lo que todavía puedes cambiar: consulta [Recordatorios repetidos](/docs/reminders/#repeating-reminders).

## Zona horaria

Fija la zona horaria en la que trabaja tu equipo. Los miembros pueden seguir usando la suya para los recordatorios: hasta que elijan una, TTM propone la zona de su idioma de Discord, y esta solo cuando su idioma se habla en varias zonas, como el inglés (EE. UU.). Consulta [Tu zona horaria](/docs/reminders/#your-time-zone).

Haz clic en el botón y pega el nombre oficial de una zona: búscalo en el **[mapa de zonas horarias](https://timezones.bitsplitters.app)**.

## Sincronizar permisos

Por defecto, los permisos de integración de Discord solo ocultan los *comandos*: los botones y las listas generados siguen siendo utilizables por todos. Haz clic en **Cargar permisos** para extender tus reglas de permisos también a esos componentes. Tras la sincronización, **los usuarios sin permiso ven la lista como de solo lectura**.

Define las reglas en *Configuración del servidor → Integraciones → Team Tasks Manager* y después sincroniza. También se respetan las restricciones de los canales: si un canal está vetado para un usuario, las listas que viven en él son de solo lectura para esa persona. El botón **Activity** bajo la lista sigue las mismas reglas: consulta [Cuando la lista no se abre](/docs/activity/#when-the-list-doesnt-open).

<div class="callout"><div class="callout-t">Los webhooks tienen su propio comando</div>Los webhooks no se configuran desde este panel: usa <a href="/docs/config-webhook/"><code>/config webhook</code></a>. Qué hacen: consulta <a href="/docs/webhooks/">Webhooks</a>.</div>

<div class="callout"><div class="callout-t">¿Buscas tus listas?</div>Este panel contiene la <em>configuración</em>: cómo se comporta el bot. Para ver las listas que tiene este servidor y para eliminar, sellar o regenerar una, usa <code>/config lists</code>: consulta <a href="/docs/config-lists/">/config lists</a>.</div>
