---
title: "/config"
description: "El comando para quien administra TTM en un servidor: tres paneles (configuración, listas y webhooks) y quién puede abrirlos."
fonte: 2d6f9fe746d2
---

`/config` es el comando para quien se ocupa de TTM en tu servidor. Tiene tres subcomandos, cada uno con su función:

| Subcomando | Para qué sirve |
| :--- | :--- |
| [`/config app`](/docs/configuration/) | Cómo se comporta el bot aquí: notificaciones, historial, los consejos para los recién llegados, recordatorios, zona horaria y permisos. |
| [`/config lists`](/docs/config-lists/) | Todas las listas del servidor: regenera una lista eliminada, sella o elimina las que ya terminaste. |
| [`/config webhook`](/docs/config-webhook/) <a class="premium-tag" href="/docs/premium/" title="Desbloqueado para todos los servidores durante la beta">Premium</a> | Crea, consulta, edita o elimina los webhooks a los que llaman tus tareas cuando se completan o se reabren. |

Las tareas en sí nunca se administran desde aquí: todo lo que tiene que ver con una sola lista está en sus botones, en el canal y en la Activity. Consulta [La lista en el canal](/docs/the-task-list/) y [Trabajar con una lista en la Activity](/docs/activity-list/).

## Quién puede abrir /config

Por defecto, solo los miembros con el permiso *Administrar servidor* ven `/config`. Esto se aplica por igual a `/config app`, `/config lists` y `/config webhook`.

Un administrador puede abrirlo a otros roles o miembros, o cerrarlo en algunos canales. Se hace en *Configuración del servidor → Integraciones → Team Tasks Manager*, en el comando `/config`. Discord fija estas reglas para todo el comando, no para cada subcomando: quien puede abrir `/config` puede usar todos sus paneles.

Los permisos que sincronizas con **Cargar permisos** en `/config app` se aplican a tus listas, no para `/config`. Consulta [Sincronizar permisos](/docs/configuration/#sync-permissions).
