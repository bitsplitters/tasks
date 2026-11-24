---
title: "/config lists"
description: "Consulta todas las listas del servidor, sella o elimina las que ya terminaste, o recupera una cuyo mensaje se borró por error."
fonte: 089e6935e4f2
---

Ejecuta el comando:

```
/config lists
```

Abre un panel privado, que solo ves tú, con **todas las listas que todavía tiene este servidor**. Cada lista tiene una fila: el nombre de la lista y el canal en el que vive, como enlace en el que se puede hacer clic.

Una lista que ocupa uno de los lugares de tu plan se marca como **en uso** junto a su canal. Cuando necesites liberar un lugar, esas son las listas que debes sellar o eliminar.

Durante la beta no hay límite, así que ninguna lista se marca. Cómo ocupa un lugar una lista: consulta [Cómo funcionan los tres lugares](/docs/premium/#how-the-three-places-work).

Una lista en la que alguien está trabajando en la [Activity](/docs/activity/) se marca como **en la Activity**. Todavía puedes regenerarla, sellarla o eliminarla, y la confirmación te avisa antes: consulta [Qué se queda en el canal](/docs/activity/#what-stays-in-the-channel).

Por defecto, solo los miembros con el permiso *Administrar servidor* pueden usar `/config lists`, como el resto de `/config`. Consulta [Quién puede abrir /config](/docs/config/#who-can-open-config).

## Un botón, cuatro estados

Cada fila tiene un único botón que cambia de estado cada vez que lo presionas:

| Estado | Significado |
| :--- | :--- |
| <span class="c-grey">Gris</span> <img class="inline-ic" src="/icons/noaction.png" alt="" /> | ninguna acción |
| <span class="c-blue">Azul</span> <img class="inline-ic" src="/icons/refresh.png" alt="" /> | **regenerarla** |
| <span class="c-green">Verde</span> <img class="inline-ic" src="/icons/seal.png" alt="" /> | **sellarla** |
| <span class="c-red">Rojo</span> <img class="inline-ic" src="/icons/delete.png" alt="" /> | **eliminarla** |

Marca tantas listas como necesites (dos para eliminar, una para sellar y tres para regenerar, si es el caso) y presiona **Aplicar**. Antes de que ocurra nada, una ventana de confirmación las enumera por nombre, agrupadas por acción: envíala para seguir adelante, ciérrala para cancelar.

El bloque se ejecuta entonces **en orden**: primero las eliminaciones, luego los sellados y después las regeneraciones. Así un mismo bloque puede liberar un lugar y usarlo: una lista que eliminas o sellas cede su lugar a una lista que regeneras.

Al final recibes un resumen, por nombre: las listas eliminadas, selladas y regeneradas, y las que no se pudieron procesar.

Cada una de ellas viene con su motivo, por ejemplo una lista que ya no existe, o una regeneración sin ningún lugar libre en tu plan. El panel se redibuja entonces con las listas tal como están ahora.

**Cancelar** cierra el panel y no hace nada. Tus elecciones sobreviven a un cambio de página: el encabezado te dice cuántas marcaste en otras páginas, y la confirmación las incluye.

Las elecciones de la página que tienes delante viven en el propio panel, así que nunca caducan mientras lo piensas. Las de otras páginas se recuerdan durante una hora desde la última vez que tocas el panel.

## Regenerar

Vuelve a publicar la lista, en su canal original, con el mismo contenido: tareas, propietarios, etiquetas y recordatorios. Úsalo cuando el mensaje de la lista se borró por error: los datos seguían ahí, solo faltaba el mensaje.

Tres cosas que conviene saber:

- **el historial de actividad sigue a la lista.** El mensaje nuevo reutiliza el mismo hilo, así que el historial se queda donde estaba y nada queda huérfano;
- **el mensaje antiguo se elimina** si todavía existe. Es a propósito: un mensaje que se queda atrás aún tiene botones que funcionan. Presionarlos haría que el bot reconstruyera la lista una segunda vez, dejando dos listas que se van separando;
- **regenerar cuenta como trabajar en la lista.** Una lista que ya ocupa uno de los lugares de tu plan la conserva. Una lista sin lugar necesita uno libre, o acaba en el resumen entre las que no se procesaron.

## Sellar

Para una lista que ya terminaste pero quieres conservar como registro. La lista **se queda en el canal** con el mismo contenido, pero sin botones ni menús, y con una línea *Lista sellada* al final. Todo lo demás desaparece:

- la lista ya no se puede editar, reabrir ni descargar;
- sus recordatorios se detienen;
- libera su lugar en tu plan;
- ya no aparece en este panel, porque sus datos salen de TTM.

El historial de actividad se queda donde está. Sellar no se puede deshacer: si es posible que quieras reutilizar la lista, descárgala antes de sellarla.

La notificación en el canal y la línea del historial siguen las opciones de tu servidor: con las dos desactivadas, nada registra quién selló la lista.

Una lista cuyo mensaje ya no existe **no se puede sellar**: no queda ningún registro que conservar. Aparece en el resumen entre las que no se procesaron, con el motivo, y el resto del bloque se ejecuta igualmente. Para quitarla, márcala en rojo para **eliminarla**.

Es el mismo sellado que obtienes con **Sellar lista** en el panel **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> de una lista.

## Eliminar

Quita la lista de forma permanente: tareas, propietarios, etiquetas, recordatorios y el historial de actividad. Se publica un recibo en el canal de la lista, y la última línea del historial registra la eliminación antes de dejar el hilo en paz.

Es la misma eliminación que obtienes con **Eliminar lista** en el panel **Más** <img class="inline-ic" src="/icons/other.png" alt="" /> de una lista. Usa este comando cuando el mensaje de la lista ya no está para hacer clic en él.

<div class="callout"><div class="callout-t">¿Por qué el bot no sabe qué listas están muertas?</div>Distinguir una lista viva de una eliminada significa preguntarle a Discord por cada lista, cada vez que se abre el panel. TTM no lo hace: te muestra lo que existe y enlaza cada canal, para que mires tú. Adivinar a partir del silencio es justo como se destruyen datos por accidente.</div>

## Si la base de datos no está disponible

Si la base de datos no está disponible, el comando se niega a abrirse y lo dice. Cada fila de ese panel sale de la base de datos. Una eliminación que no pudiera quitar los datos dejaría recordatorios activos para una lista que ya no aparece en ningún lugar.
