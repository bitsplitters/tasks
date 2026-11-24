---
title: "Qué desbloquea Premium"
description: "Qué agrega el plan de pago al Free y qué cambia cada límite en el día a día."
fonte: 99b154c841ca
---

TTM está **totalmente desbloqueado durante la beta**, así que por ahora nada de esta página se aplica. Describe el plan Free y lo que Premium quitará cuando termine la beta. Lo que le pasa a tu servidor cuando termina la beta está en [Cómo funciona la beta](/docs/beta/).

<div class="callout"><div class="callout-t">Planes y precios</div>Los dos planes lado a lado, los precios y el alojamiento propio están en la <a href="/premium/">página de Premium</a>. Los precios son sin IVA: <a href="/premium/#vat">por qué</a>.</div>

## Qué cambia cada uno, en la práctica

Por encima de un límite de Free no puedes agregar más, pero nada de lo que ya existe se elimina ni se oculta: consulta [Cómo funciona la beta](/docs/beta/#when-the-beta-ends).

\* **Un límite impuesto por Discord, no por nosotros.** Es el mismo en todos los planes: Premium te permite *llegar* a él, nunca superarlo. Consulta [Límites conocidos](/docs/known-limits/).

**Listas en uso — 3 → ilimitadas.** Tres listas bastan para un equipo pequeño: una de cosas por hacer, una de bugs, una checklist para el próximo evento. Llegas al límite cuando cada proyecto, escuadra o reunión quiere su propia lista.

**Tareas por lista — 20 → 50 \*.** Veinte tareas son una checklist de trabajo y cincuenta, un backlog. Ningún plan pasa de 50, porque un mensaje de Discord solo puede contener unos pocos menús: consulta [Límites conocidos](/docs/known-limits/).

**Recordatorios activos — 10 → ilimitados.** El límite cuenta los recordatorios *que esperan al mismo tiempo*, no los recordatorios por día. Un recordatorio deja de contar después de su último aviso o cuando lo quitas, y uno repetido cuenta una sola vez.

**Repeticiones por recordatorio — solo una → hasta 50.** En el plan Free cada recordatorio se envía una vez. En Premium un recordatorio puede llegar hasta 50 veces en total, la primera incluida, si un administrador activa **Recordatorios recurrentes** en [/config app](/docs/configuration/#recurring-reminders). Los recordatorios recurrentes que ya tienes siguen saltando en el plan Free: consulta [Recordatorios](/docs/reminders/#repeating-reminders).

**Personas por propietario — 1 → hasta 25 \*.** En el plan Free el propietario de una tarea es una persona o un rol. En Premium pueden ser hasta 25 personas, que comparten un rol creado por TTM: consulta [Los roles que crea TTM](/docs/owners-and-tags/#the-roles-ttm-creates).

Es Premium porque cada persona cuesta una solicitud a Discord. Discord limita las solicitudes que puede enviar un bot, y todos sus servidores comparten ese límite.

**Webhooks — ninguno nuevo → hasta 25 \*.** Un webhook permite que una tarea completada envíe una llamada HTTP a cualquier cosa que ejecutes: un despliegue, una hoja de cálculo, un sistema de tickets. Es lo principal que agrega Premium. Consulta [Webhooks](/docs/webhooks/).

En el plan Free no puedes crear webhooks nuevos, pero los creados durante la beta se quedan: consulta [Qué conserva una lista de la beta](/docs/beta/#what-a-beta-list-keeps).

## Cómo funcionan los tres lugares

En el plan Free un servidor tiene tres lugares para listas. Una lista que ocupa uno está **en uso**, y `/config lists` la marca así.

- **Una lista ocupa un lugar la primera vez que alguien trabaja en ella** y lo conserva. Trabajar en una lista significa cualquiera de estas cosas:
  - marcar o desmarcar una tarea;
  - una actualización en bloque, o editar o quitar una sola tarea;
  - **Limpiar lista** o **Reabrir todo**;
  - asignar un propietario, una etiqueta o un recordatorio;
  - vincular un webhook.
- **Una lista nueva ocupa un lugar** cuando la creas, la clonas o la importas. Regenerar una lista cuenta como trabajar en ella.
- **Un lugar no caduca.** Solo sellar o eliminar la lista lo libera.
- **Una lista que no está en uso se queda en el canal tal cual.** Todavía puedes descargarla, sellarla o eliminarla.

Las listas creadas durante la beta son la excepción: sus tareas todavía se pueden marcar sin que cuenten para el límite de tres listas. Consulta [Qué conserva una lista de la beta](/docs/beta/#what-a-beta-list-keeps).

<div class="callout"><div class="callout-t">Ningún límite cuenta cuántas veces usas algo</div>Cada límite cuenta cuántas cosas tienes, nunca cuántas veces las usas. Un webhook que se dispara mil veces a la semana sigue contando como un solo webhook.</div>

### Qué pasa con una cuarta lista

Cuando los tres lugares están ocupados, TTM se niega a crear, clonar o importar otra lista. También se niega a trabajar en una lista que no está en uso. El bot te dice cómo liberar un lugar:

- **Sellar lista**, en el panel **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> de una lista con la que ya terminaste. La lista se queda en el canal como registro, sin botones.
- **Eliminar lista**, en el mismo panel. Quita la lista de forma permanente.
- [`/config lists`](/docs/config-lists/), que marca las listas en uso y puede sellar o eliminar varias a la vez.

Borrar a mano el mensaje de una lista no libera nada: la lista se queda en TTM con su lugar y sus recordatorios siguen llegando. Usa **Eliminar lista** en su lugar. Si el mensaje ya no existe, `/config lists` puede eliminar lo que queda o regenerar la lista.

## ¿Preguntas?

Entra al [Discord](/docs/community/) y pregúntanos lo que quieras sobre precios, límites o alojamiento propio.
