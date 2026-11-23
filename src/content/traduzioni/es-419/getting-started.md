---
title: "Primeros pasos"
description: "Invita al bot, crea una lista, marca una tarea y pon un recordatorio, en el canal o en la Activity."
fonte: 65c887766b9d
---

Team Tasks Manager (TTM) permite que tu equipo comparta y administre tareas **sin salir de Discord**. Esta página te lleva de cero a una lista funcionando: crearla, marcar una tarea, poner un recordatorio.

<div class="callout"><div class="callout-t">Todas las funciones están desbloqueadas durante la beta</div>Todas las funciones están desbloqueadas, para todos los servidores. Donde estas páginas hablan del plan Free o de Premium, se aplica solo después de la beta: consulta <a href="/docs/beta/">Cómo funciona la beta</a>.</div>

## 1. Invita al bot

<p><a class="btn" href="/invite">Agregar a Discord</a></p>

Ese botón invita a Team Tasks Manager a tu servidor. Conserva los permisos que pide: TTM los necesita para publicar listas, ejecutar recordatorios y escribir el historial. Si omites alguno, el bot te dice exactamente qué permiso falta cuando lo necesita. Para qué sirve cada permiso: [Los permisos que pide TTM](/docs/core-concepts/#the-permissions-ttm-asks-for).

## 2. Crea tu primera lista

Escribe `/` en el cuadro de mensajes y elige el comando, o empieza a escribir su nombre:

```
/crear-lista
```

Si tu Discord está en otro idioma, el comando tiene un nombre traducido: en inglés es `/create-list`. Todos los nombres están en [Referencia de comandos](/docs/commands/#command-names-in-your-language).

TTM responde con una breve explicación de cómo escribir una lista y un botón **Crea tu lista**. Haz clic en él: se abre un formulario con dos campos, el **título de la lista** y la **lista de actividades**. Escribe una actividad por línea, cada una empezando con un guion `-`. Por ejemplo, con el título *Torneo del sábado*:

```
- Reservar los canales de voz
- Preparar las llaves
  - Reunir las inscripciones
  - Sortear los equipos
- Publicar las reglas
- Transmitir la final
```

Las reglas:

- **Una línea que empieza con `-` es una tarea.**
- **Los espacios antes del guion la convierten en subtarea** de la tarea de arriba. Una tarea con subtareas se convierte en un **grupo**.
- El título puede tener hasta **90 caracteres**, la lista unos **4000 caracteres** y **50 tareas**, subtareas incluidas: consulta [Límites conocidos](/docs/known-limits/).

Envía el formulario y la lista aparece en el canal. Aquí tienes la misma lista después de unos pasos. La primera tarea está marcada, *Preparar las llaves* tiene propietario y *Transmitir la final* tiene un recordatorio.

<picture class="screen">
  <source media="(max-width: 640px)" srcset="/screens/list-mobile.png" width="795" height="1059" />
  <img src="/screens/list-desktop.png" width="456" height="418" loading="lazy" alt="La lista Torneo del sábado en Discord: seis tareas numeradas con casillas. La primera está marcada y atenuada; Preparar las llaves tiene dos subtareas y un propietario; Transmitir la final tiene un propietario y una fecha de recordatorio. Debajo de las tareas, una pequeña línea remite a Más, Guía y la documentación completa, y una barra verde muestra cuánto está hecho. Debajo de la lista están el menú desplegable, Marcar tarea, y dos filas de botones." />
</picture>

¿Prefieres aprender haciendo? Junto a **Crea tu lista** hay un botón **Tutorial**: convierte la explicación en una lista de práctica de siete lecciones en tu idioma, y te envía la Guía en un mensaje que solo ves tú. Haz las lecciones en orden: cada una nombra un botón con su icono y te pide que hagas algo con él, desde marcarlo hasta abrirlo en la Activity.

La lista de práctica es una lista normal: cuando termines, elimínala desde **Más** → **Eliminar lista**.

Ahora elige dónde trabajar en ella. La lista es la misma en los dos lugares, y está [en un solo lugar a la vez](/docs/core-concepts/#one-list-two-places).

## <img class="place-ic" src="/icons/posto-canale.svg" alt="" />3. En el canal

### Marcar una tarea

Debajo de la lista está el **selector de marcado**, un menú desplegable que muestra el título de la lista, y dos filas de botones. Abre el menú y elige una tarea: su casilla pasa de <img class="inline-ic" src="/icons/checkbox_empty.png" alt="" /> a <img class="inline-ic" src="/icons/checkbox_marked.png" alt="" />, y la lista se actualiza para todos. Elígela otra vez para reabrirla. Marcar un grupo marca también sus subtareas. Según tu [configuración](/docs/configuration/), TTM también puede publicar un breve aviso debajo de la lista y registrar el cambio en un hilo del historial.

<div class="callout"><div class="callout-t">¿No puedes marcar una tarea?</div>Todos los botones de la segunda fila deben estar <strong>apagados</strong>: si uno está azul o rojo, elegir una tarea aplica la acción de ese botón. Y una tarea con propietario solo puede marcarla su propietario, y quien tenga <em>Gestionar mensajes</em> en el canal.</div>

### Poner un recordatorio

En la segunda fila:

1. Haz clic una vez en **Recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" />, el cuarto botón: se pone **azul**.
2. Elige una tarea que **todavía no esté marcada**. Se abre un formulario titulado *Recordatorio para la tarea …*, completado con diez minutos a partir de ahora.
3. Envíalo tal cual. Si tu servidor activó los recordatorios recurrentes, sigue una tarjeta de resumen: presiona **Guardar**.

La tarea muestra la hora, y el recordatorio llega una vez. Hasta que lo cambies, la zona horaria del último campo es la del servidor: cámbiala si la tuya es distinta.

**¿Cerraste el formulario con ✕?** La lista se queda bloqueada: abre **Más** debajo de la lista y presiona **Desbloquear lista**. Consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked).

Cada botón debajo de la lista: [La lista en el canal](/docs/the-task-list/) y [Editar una tarea en el canal](/docs/channel-tasks/).

## <img class="place-ic is-activity" src="/icons/activity.png" alt="" />4. En la Activity

En la Activity trabajas en la lista en una ventana dentro de Discord, con casillas y paneles en lugar de menús. Presiona **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, el primer botón debajo de la lista. Los demás del canal pueden unirse a ti allí. También puedes empezar desde el Lanzador de aplicaciones de Discord o desde una llamada de voz: consulta [Cuatro formas de entrar](/docs/activity/#four-ways-in).

### Marcar una tarea

Toca la casilla de una tarea. La lista se actualiza para todos en la ventana, y un grupo marca también sus subtareas.

### Poner un recordatorio

Toca el texto de una tarea que todavía no esté marcada: se abre su panel. Toca **Recordatorio** <img class="inline-ic" src="/icons/alertW.png" alt="" /> una vez: se pone **azul**, y aparecen la fecha, la hora y la zona horaria, fijadas a diez minutos a partir de ahora en la zona horaria de tu dispositivo. Toca **Guardar**.

Cuando termines, presiona **Salir**: la lista vuelve al canal, con un resumen de lo que cambió.

Todo lo de la ventana: [La Activity](/docs/activity/) y [Trabajar con una lista en la Activity](/docs/activity-list/).

## Conviene saber antes del primer recordatorio

- **El recordatorio va al propietario de la tarea**, por mensaje directo si el propietario es una persona.
- **Si la tarea todavía no tiene propietario, te conviertes en él**, así que el recordatorio te llega a ti: consulta [Las reglas](/docs/reminders/#the-rules).
- **¿No llegó nada?** Permite los mensajes directos de los miembros del servidor: consulta [Recordatorios por mensaje directo](/docs/known-limits/#reminders-by-direct-message).

## Próximos pasos

- [Conceptos básicos](/docs/core-concepts/): una lista en dos lugares, propietarios, etiquetas, grupos y permisos.
- [Propietarios y etiquetas](/docs/owners-and-tags/): asigna una tarea a una persona, a un rol o a varias personas, y etiqueta a quién notificar.
- [Recordatorios](/docs/reminders/): quién los recibe, zonas horarias, recordatorios repetidos.
- [Trucos y consejos](/docs/tips/): pequeños hábitos que ahorran tiempo, como reutilizar una lista en otro servidor.
- [/config app](/docs/configuration/): notificaciones, los consejos, zona horaria y más.
- [FAQ](/docs/troubleshooting/): respuestas rápidas a los problemas más comunes.
