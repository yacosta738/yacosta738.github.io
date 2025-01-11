---
title: Comprendiendo CORS en el Desarrollo Web
description: Este artículo explica CORS (Compartición de Recursos de Origen
  Cruzado) - una característica de seguridad integrada en navegadores web que
  permite a las páginas web hacer solicitudes XMLHttpRequest a otro dominio. Se
  explica qué es CORS, por qué es importante y cómo funciona. El artículo hace
  hincapié en la importancia de comprender CORS para construir aplicaciones web
  modernas que requieren solicitudes entre dominios.
date: 2023-04-03T08:06:22.454Z
cover: /images/understanding-cors-in-web-development.png
author: es/yuniel-acosta
tags:
  - es/cors
categories:
  - es/software-development
draft: false
---

![CORS](/images/cors.png 'CORS')

## Comprendiendo CORS

El Compartir Recursos de Origen Cruzado (CORS) es un mecanismo que permite que una página web haga solicitudes XMLHttpRequest a otro dominio. En otras palabras, es una característica de seguridad incorporada en los navegadores web para evitar que sitios web maliciosos hagan solicitudes a otros sitios web en nombre del usuario.

### ¿Qué es CORS?

CORS es una característica de seguridad incorporada en los navegadores web que evita que sitios web maliciosos hagan solicitudes a otros sitios web en nombre del usuario. Es un mecanismo que permite que una página web haga solicitudes XMLHttpRequest a otro dominio, lo cual normalmente está prohibido por la política del mismo origen.

### ¿Por qué es importante CORS?

CORS es importante porque permite que los sitios web compartan recursos con otros dominios, lo cual es esencial para construir aplicaciones web modernas. Sin CORS, las páginas web estarían limitadas a hacer solicitudes solo al mismo dominio, lo cual limitaría severamente la funcionalidad de la web.

### ¿Cómo funciona CORS?

Cuando una página web hace una solicitud a otro dominio, el navegador primero enviará una solicitud de pre-vuelo al servidor para determinar si es seguro hacer la solicitud. Si el servidor aprueba la solicitud de pre-vuelo, el navegador hará la solicitud real al servidor y devolverá la respuesta a la página web.

### Conclusión

CORS es una importante característica de seguridad incorporada en los navegadores web que permite que los sitios web compartan recursos con otros dominios. Sin CORS, la funcionalidad de la web estaría severamente limitada. Comprender cómo funciona CORS es esencial para construir aplicaciones web modernas que requieren solicitudes de origen cruzado.
