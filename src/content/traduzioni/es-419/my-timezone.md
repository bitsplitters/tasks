---
title: "/my timezone"
description: "Tu zona horaria, elegida una sola vez: TTM te la propone cada vez que eliges una fecha, en cada servidor, en el canal y en la Activity."
fonte: ec7d9b989675
---

Cada vez que eliges una fecha para un recordatorio, TTM te propone una zona horaria. Con `/my timezone` eliges **la tuya** una sola vez, y TTM te la propone en todos los servidores, en el canal y en la Activity.

Así cada persona del equipo piensa en su propia hora local. El comando funciona solo en servidores, no requiere permisos y su panel solo lo ves tú.

## El panel

`/my timezone` muestra tu zona actual y de dónde viene:

- **elegida por ti**, con **Elegir**;
- **la última que dejaste en un recordatorio**;
- **el idioma de tu Discord**, como `Europe/Rome` para el italiano;
- **el servidor**, cuando tu idioma se habla en varias zonas, como el inglés (EE. UU.).

## Elegir tu zona

**Elegir** abre un formulario. Pega el nombre oficial de tu zona, como `Europe/Rome`.

Para encontrarlo, abre el **[mapa de zonas horarias](https://timezones.bitsplitters.app)**, selecciona tu área y copia el valor.

A partir de ese momento TTM te propone tu zona cada vez que eliges una fecha. Una zona distinta en un recordatorio se aplica solo a esa fecha: la tuya se queda.

**Volver a automática** olvida tu elección, y TTM vuelve a aprender tu zona a partir de tus recordatorios.

## Hasta que elijas

TTM aprende tu zona por sí solo. La zona que dejas en un recordatorio pasa a ser la tuya, y la línea debajo del campo te lo dice.

Antes de tu primer recordatorio, el canal propone la zona del idioma de tu Discord, y la Activity la zona de tu dispositivo. Un idioma que se habla en varias zonas toma la zona del servidor: consulta [Zona horaria](/docs/configuration/#time-zone) en `/config app`.

## En la Activity

El engranaje de arriba a la derecha tiene la misma opción: **Zona horaria**, debajo de **Para ti, en todas partes**. Ahí también puedes buscar tu zona por ciudad o país. Consulta [Tu configuración](/docs/activity/#your-settings).
