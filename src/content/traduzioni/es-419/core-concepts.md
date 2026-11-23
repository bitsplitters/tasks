---
title: "Conceptos básicos"
description: "Una lista en dos lugares, el vocabulario de TTM (tareas, grupos, propietarios, etiquetas, recordatorios) y los permisos que pide."
fonte: 207fda722dce
---

Unos cuantos términos aparecen por toda la app. Apréndelos una vez y todo lo demás encaja.

## Una lista, dos lugares

Una lista vive en un mensaje de un canal de Discord, donde todos la encuentran. La **Activity** abre la misma lista en una ventana dentro de Discord, donde varias personas trabajan en ella a la vez y ven cada cambio en vivo. Es la misma lista, no una copia.

Una lista está en un solo lugar a la vez. Mientras está en la Activity, su mensaje en el canal conserva solo **Entrar a la Activity**. Cuando todos salen, la lista vuelve al canal con un resumen de lo que cambió.

Lo que puede hacer una lista es igual en los dos lugares: propietarios, etiquetas, recordatorios, webhooks, la configuración de tu servidor y los límites de tu plan. Lo que cambia es cómo lo haces. En el canal usas los menús y botones debajo del mensaje. En la Activity tocas la casilla de una tarea, o su texto. Estas páginas están divididas igual:

- **Funciones**: qué hace cada función y sus reglas, igual en los dos lugares.
- **En el canal**: el mensaje de la lista, sus menús y sus botones.
- **En la Activity**: la ventana, las casillas y el panel de cada tarea.

Algunas acciones existen solo en el canal: Clonar, Descargar, Sellar, Eliminar, Desbloquear y la importación desde un archivo. Consulta [Qué se queda en el canal](/docs/activity/#what-stays-in-the-channel).

## Tareas, subtareas y grupos

| Término | Qué es |
| :--- | :--- |
| **Tarea** | Una sola actividad, ni subtarea ni grupo. |
| **Subtarea** | Una actividad que pertenece a otra mayor. |
| **Grupo de tareas** | Una tarea formada por subtareas. |

Nunca eliges estos tipos en un menú: TTM los deduce de cómo escribes la lista. Una línea que empieza con `-` es una tarea. Los espacios antes del guion la convierten en subtarea de la línea de arriba. Una tarea con subtareas se convierte automáticamente en un **grupo**. Cómo escribirlas: [Crea tu primera lista](/docs/getting-started/#2-create-your-first-list).

Los grupos se comportan como una unidad: marcar un grupo marca también sus subtareas, y marcar todas las subtareas marca el grupo como hecho.

## Estado de una tarea

Cada tarea está **abierta** o **completada**, y lo muestra su casilla:

- **Abierta** <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" />: pendiente.
- **Completada** <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />: hecha.

En el canal marcas o desmarcas una tarea en el [selector de marcado](/docs/the-task-list/#the-check-selector), el menú debajo de la lista. En la Activity tocas su [casilla](/docs/activity-list/#tick-a-task). Completar o reabrir una tarea es lo que puede activar notificaciones y webhooks.

### Quién puede marcar una tarea

**Una tarea con propietario solo pueden marcarla o desmarcarla:**

- el propietario, o los miembros del rol propietario;
- quien tenga *Gestionar mensajes* en el canal.

Cualquier otra persona recibe un rechazo que solo ella ve, y no cambia nada. La regla también cubre las subtareas: no puedes marcar ni desmarcar un grupo si eso cambia una subtarea que pertenece a otra persona. Cualquiera que pueda usar la lista puede marcar una tarea sin propietario.

## Propietario frente a etiqueta

Parecen similares, pero hacen trabajos distintos:

- **Propietario** <img class="inline-ic" src="/icons/owner.png" alt="" />: la persona o el rol *responsable* de la tarea. Una tarea tiene un propietario, y con Premium pueden ser varias personas: TTM crea un rol para ellas (consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates)).
- **Etiqueta** <img class="inline-ic" src="/icons/tag.png" alt="" />: uno o varios usuarios o roles *mencionados* en la tarea, por ejemplo las personas a las que hay que notificar cuando se completa.

Las reglas de ambos: [Propietarios y etiquetas](/docs/owners-and-tags/).

## Recordatorios

Un **recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" /> asocia un horario a una tarea: una fecha, una hora y una zona horaria. Cuando llega el momento, TTM le avisa al **propietario** de la tarea, para que nadie tenga que estar pendiente. Una persona recibe un mensaje directo, y un rol recibe una mención en el canal de la lista.

Un solo aviso es lo predeterminado, y con el plan Free es el único tipo. Los recordatorios repetidos agregan un intervalo y un número de repeticiones. Son una función Premium que un servidor activa en [/config app](/docs/configuration/#recurring-reminders). Todos los detalles en [Recordatorios](/docs/reminders/).

## Notificaciones e historial

Cuando se crea una lista, o se marca o desmarca una tarea, TTM puede publicar una notificación y, si lo activas, registrar cada acción en un **hilo del historial** dedicado. La notificación de una lista nueva puede mencionar a los propietarios de sus tareas, para que se enteren. Los cambios hechos en la Activity llegan como un único resumen, cuando la lista vuelve al canal. Cuánto ruido quieres depende por completo de ti: consulta [/config app](/docs/configuration/).

## Quién puede usar listas y comandos

Por defecto los comandos de la app siguen las reglas de visibilidad propias de Discord (Configuración del servidor → Integraciones). Los botones y las listas, en cambio, siguen siendo utilizables por cualquiera, salvo que **sincronices los permisos**: entonces la lista pasa a ser de solo lectura para quienes no tienen permiso, en el canal y en la Activity. Esto también se configura en [/config app](/docs/configuration/#sync-permissions).

`/config` tiene una regla propia: por defecto solo lo ven los miembros con *Administrar servidor*. Un administrador puede cambiarlo en *Configuración del servidor → Integraciones*. Consulta [Quién puede abrir /config](/docs/config/#who-can-open-config).

Algunas acciones tienen una regla propia:

- una tarea con propietario solo puede marcarla su propietario, o quien tenga *Gestionar mensajes*: consulta [Quién puede marcar una tarea](#who-can-tick-a-task);
- sellar o eliminar una lista desde su panel *Más*, en el canal, requiere *Gestionar mensajes* en el canal. Desde `/config lists`, se aplican los permisos de `/config`;
- abrir una lista en la Activity requiere el permiso *Usar actividades* de Discord en el canal: consulta [Cuando la lista no se abre](/docs/activity/#when-the-list-doesnt-open).

## Los permisos que pide TTM

Cuando invitas al bot, Discord muestra los permisos que pide. Esto es para lo que sirve cada uno:

| Permiso | Para qué se necesita |
| :--- | :--- |
| Ver canal | Ver el canal donde vive la lista |
| Enviar mensajes | Publicar y actualizar la lista |
| Insertar enlaces | Mostrar la lista como un embed enriquecido |
| Gestionar mensajes | Borrar las notificaciones antiguas del propio bot, para que el canal siga siendo legible |
| Crear hilos públicos | Crear el hilo opcional del historial, en canales de texto |
| Gestionar webhooks | Escribir en el hilo del historial, en canales de texto |
| Conectar | Publicar la lista en el chat de un canal de voz |
| Adjuntar archivos | Ofrecer la descarga de la lista |
| Leer el historial de mensajes | Mantener la lista sincronizada |
| Mencionar @everyone, @here y todos los roles | Notificar a las personas que etiquetas en una tarea, y al rol propietario de una tarea cuando vence su recordatorio |
| Gestionar roles | Crear el rol que convierte a varias personas en propietarios de una tarea (Premium) |
| Usar emojis externos | Mostrar los iconos propios del bot en botones y listas |

**En un canal de voz** una lista vive en el chat del canal, que no tiene historial, y TTM necesita *Conectar* para publicar allí: consulta [Canales de voz](/docs/known-limits/#voice-channels).

<div class="callout"><div class="callout-t">Conviene saber</div>Puedes concederlos más tarde desde <em>Configuración del servidor → Roles → Team Tasks Manager</em>, o por canal desde la configuración de permisos del canal. <em>Gestionar roles</em> es la excepción: solo funciona en el rol del bot, no por canal.</div>
