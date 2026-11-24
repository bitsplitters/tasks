---
title: "La Activity"
description: "Abre una lista en una ventana dentro de Discord, donde tu equipo trabaja en ella a la vez y ve cada cambio al instante."
fonte: 38c066c5c9af
---

Prueba el modo Activity: más fluido y libre de los límites de los canales de texto, ideal para sesiones de trabajo largas o colaborativas.

La **Activity** abre una lista en una ventana dentro de Discord, en ordenador y en móvil. Varias personas trabajan en ella a la vez y ven cada cambio en directo. Cuando sale la última, la lista vuelve a su canal con un resumen de lo que cambió. Habla tu idioma de Discord si TTM lo tiene, y si no, inglés.

Esta página trata de cómo entrar y salir. Cómo trabajas en la lista una vez dentro: [Trabajar con una lista en la Activity](/docs/activity-list/).

## Cuatro formas de entrar

- **Desde una lista en un canal**: pulsa **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, el primer botón bajo la lista. Se abre esa lista. Consulta [Abrir una lista en la Activity](#open-a-list-in-the-activity).
- **Desde la barra de mensajes**: en un canal de texto, abre el **Lanzador de aplicaciones** de Discord, elige Team Tasks Manager y luego **Launch**. Consulta [El inicio del canal](#the-home-of-the-channel).
- **Desde una llamada de voz**: pulsa el botón de Actividades de la llamada y elige Team Tasks Manager. Consulta [El inicio del canal](#the-home-of-the-channel).
- **Desde alguien que ya está dentro**: pulsa **Entrar en la Activity** bajo la lista, el **Unirse** de Discord en su perfil, o la invitación que te envíe. Consulta [Únete a los demás](#join-the-others).

El Lanzador de aplicaciones y la llamada de voz abren el inicio del canal, con todas sus listas: allí eliges una, o creas una nueva.

## Abrir una lista en la Activity

Pulsa **Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, el primer botón de la [primera fila](/docs/the-task-list/#row-1--acts-on-the-whole-list), en un canal de texto o en el chat de un canal de voz. Una lista más antigua recibe el botón la primera vez que cambia.

Si la ventana no conecta en 30 segundos, TTM te avisa y la lista se queda en el canal.

### Cuando la lista no se abre

El botón sigue las reglas del resto de la lista, como los [permisos sincronizados](/docs/configuration/#sync-permissions) en `/config app`. TTM también la rechaza, en un mensaje que solo ves tú:

- sin el permiso *Usar actividades* de Discord en el canal, que un administrador concede en los *Permisos* del canal;
- mientras la base de datos no responde;
- mientras alguien está editando la lista en el canal: consulta [Cuando la lista está bloqueada](/docs/the-task-list/#when-the-list-is-locked);
- cuando tu plan no tiene ninguna plaza libre: consulta [Cómo funcionan las tres plazas](/docs/premium/#how-the-three-places-work).

## Únete a los demás

Mientras una lista está en la Activity, su mensaje conserva un único botón, **Entrar en la Activity** <img class="inline-ic" src="/icons/activity.png" alt="" />, y la última línea dice <img class="inline-ic" src="/icons/activity_blue.png" alt="" /> *Se está trabajando en esta lista en la Activity*. El **Unirse** de Discord, en el perfil de alguien que está dentro, también funciona. Mientras tanto, nada cambia la lista desde el canal.

Para traer a alguien, pulsa **Invitar**, arriba a la derecha del inicio y de cada lista, junto a quienes están allí. Discord abre su propia ventana, donde eliges amigos o un canal al que enviar la invitación.

Necesita el permiso *Crear invitación* de Discord en el canal: sin él, TTM te lo dice en el botón, y cómo lo concede un administrador.

## Tu estado en Discord

Mientras estás en la Activity, tu perfil de Discord muestra Team Tasks Manager con *Planificando tareas con el equipo*, en tu idioma. No dice nada de la lista, el servidor ni el canal.

Discord te lo pregunta antes, en la ventana donde dejas que TTM sepa quién eres. Si dices que no, la Activity se abre igualmente, sin esa línea.

## El inicio del canal

Cuando empiezas desde el **Lanzador de aplicaciones** o desde una **llamada de voz** (consulta [Cuatro formas de entrar](#four-ways-in)), TTM abre el inicio del canal, con el nombre del canal como título. Los hilos, las publicaciones de foros, los canales de anuncios y los de escenario quedan fuera. El inicio tiene tres partes:

- **Nueva lista**, bajo el título: un título y las tareas, escritos como en [Crea tu primera lista](/docs/getting-started/#2-create-your-first-list), que se crea aquí y ya está en la Activity.

  El resumen que la acompaña de vuelta al canal empieza por su creación, y puede mencionar a los propietarios de sus tareas: consulta [Cuando se crea una lista](/docs/configuration/#when-a-list-is-created). Los archivos se importan con `/crear-lista`, en el canal.
- **Ahora en la Activity**: quién está en cada lista y quién está editando. Toca una para unirte.
- **En el canal**: las demás listas, las más recientes primero. Toca una para leerla y luego **Llevar a la Activity**, que espera mientras alguien la edita en el canal.

El botón **Inicio** <img class="inline-ic" src="/icons/home.png" alt="" />, arriba a la izquierda de cada lista, te lleva de vuelta allí.

## Volver al canal

**Salir** devuelve la lista cuando estás solo. Si hay más gente, eliges:

- **Salir sin los demás**: los demás siguen;
- **Devolver al canal para todos**: la Activity se cierra para todos.

La lista también vuelve 30 segundos después de que salga la última persona, incluido cerrar la ventana o bloquear el móvil. **Salir** e **Inicio** lo hacen al instante.

Después llega un **resumen**, una línea por cambio con quién lo hizo: en el canal según indique tu [Modo de notificación](/docs/configuration/#notification-mode), y completo en el hilo del [historial de actividad](/docs/configuration/#history-tracking). Usa el idioma de quien llevó la lista a la Activity.

## Qué se queda en el canal

**Clonar**, **Descargar**, **Sellar**, **Eliminar**, **Desbloquear** y la importación desde un archivo: consulta [Acciones sobre la lista](/docs/list-actions/). En la Activity una lista se desbloquea sola.

Un admin aún puede **Eliminar**, **Sellar** o **Regenerar** una lista en la Activity desde [`/config lists`](/docs/config-lists/). Eliminar la quita también para las personas que están dentro; Sellar la devuelve primero al canal.

## Cuando la base de datos no responde

Ninguna lista entra en la Activity, y el inicio oculta **Nueva lista**. Una lista que ya está dentro pasa a ser de solo lectura hasta que la base de datos vuelva, y una franja ofrece devolverla al canal.

## Tus ajustes

La rueda dentada arriba a la derecha tiene dos grupos. En **Para ti, en todas partes**, **Zona horaria** es tu zona horaria, la misma que en [/my timezone](/docs/my-timezone/): TTM la propone en el canal y también en todos los servidores, y **Quitar mi zona horaria** la olvida.

En **En este dispositivo**, **Tamaño del texto**, **Tema** y **Filas espaciadas**, más espacio para tocar en un móvil, se aplican solo a ti, en ese dispositivo.

## Adónde ir después

- [Trabajar con una lista en la Activity](/docs/activity-list/): las casillas, el panel de una tarea y quién está editando qué.
- [La lista en el canal](/docs/the-task-list/): cada botón bajo la lista, en el canal.
- [Qué desbloquea Premium](/docs/premium/): las plazas de tu plan y lo que añade el plan de pago.
- [FAQ](/docs/troubleshooting/#in-the-activity): respuestas rápidas a los problemas más comunes.
