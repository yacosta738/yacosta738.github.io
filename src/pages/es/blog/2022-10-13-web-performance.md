---
title: Rendimiento Web
description: La percepción del usuario sobre la velocidad del sitio es más
  importante que el tiempo de carga en milisegundos. En este artículo,
  analizamos varias métricas y mejores prácticas para mejorar la percepción del
  usuario. La suavidad del desplazamiento y las animaciones, el tiempo de carga
  en tiempo real y la capacidad de respuesta a la interacción del usuario
  afectan la percepción.
date: 2022-10-13T12:33:43.553Z
lang: es
cover: /uploads/wep-performance.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - web
  - html
  - javascript
categories:
  - Desarrollo de software
draft: false
---

![web performance](/uploads/wep-performance.webp 'web performance')

El RENDIMIENTO WEB es uno de los temas más importantes para el ÉXITO de tu página. Pero casi nadie conoce las métricas MÁS IMPORTANTES. Te las explico. ↓

### 📡 Time to First Byte (TTFB)

Mide el tiempo desde que el navegador hace la petición de la página hasta que el primer byte es recibido.

🆗 Bastante importante, ya que afecta a todas las demás.

✅ <600ms

Se extrae de datos de laboratorio 🧪 y usuarios reales 👨‍👩‍👧‍👦

### 🎨 First Contentful Paint (FCP)

Señala el tiempo que se ha tardado en renderizar cualquier texto o imagen (incluido fondos)

🆗 Le dice al usuario si realmente la web funciona y pueda empezar a consumir la web.

✅ <1.8s

Datos de laboratorio 🧪 y usuarios reales 👨‍👩‍👧‍👦

### 🖼 Largest Contentful Paint (LCP)

El tiempo que tarda en renderizarse la pieza de contenido más grande que está en el viewport.

🆗 Es una de las tres Web Vitals de Google.

👀 Visualmente impacta mucho al usuario.

✅ <2.5s

Datos de laboratorio 🧪 y usuarios reales 👨‍👩‍👧‍👦

### 📈 Speed Index (SI)

Calcula cómo de rapido el contenido visual se ha renderizado progresivamente en el viewport.

🆗 No es lo mismo que una página en blanco 3 segundos y se muestre todo de golpe, a hacerlo progresivamente. Se percibe distinto.

✅ <2.5s

Sólo en laboratorio 🧪

### ☝️ First Input Delay (FID)

Mide el tiempo que tarda en responder la interfaz a la primera interacción del usuario.

🆗 Es la Web Vital de interactividad. ¿Sabes cuando haces clic y no responde la web? Pues eso.

✅ <100ms

Fiable en datos de campo de usuarios reales 👨‍👩‍👧‍👦

### 🛑 Total Blocking Time (TBT)

Suma la duración de las tareas largas (más de 50ms) de JS que han bloqueado el hilo principal después del FCP.

🆗 Cuanto más tiempo está bloqueado el hilo, menos usable es la página.

✅ <200ms

Datos de laboratorio 🧪

### 👐 Max Potential First Input Delay (mFID)

Mide el máximo FID posible teniendo en cuenta el tiempo que el hilo principal está bloqueado.

🆗 Interesante para detectar en pruebas posibles valores del FID.

✅ <130ms

Datos de laboratorio 🧪

### 🎡 Cumulative Layout Shift (CLS)

Mide los saltos que ha dado el layout de tu página mientras se cargaba.

🆗 La Web Vital de estabilidad visual. Suele pasar con imágenes y banners de publicidad.

✅ <0.1

Datos de laboratorio 🧪 y usuarios reales 👨‍👩‍👧‍👦

### 🏃‍♀️ Time to Interactive (TTI)

El tiempo que tarda la página en haber mostrado todo el contenido útil, los eventos de los elementos más visibles han sido registrados y la página responde a interacciones en 50ms.

🆗 Inestable, mejor mirar el TBT.

✅ <3.8s

Datos de laboratorio 🧪

Los datos que extraes con [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) o herramientas similares desde tu máquina o una máquina preparada.

Datos de campo con usuarios reales 👨‍👩‍👧‍👦

Usando la Performance API puedes extraer las métricas y enviarlas a un servicio. También con Chrome UX Report.
