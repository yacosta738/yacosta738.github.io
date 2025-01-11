---
title: De Gridsome a Nuxt a Astro - Reconstruyendo con Astro
description: Astro es un innovador generador de sitios estáticos que se enfoca
  en la generación estática en lugar de los frameworks JS. Pero, ¿cuánto mejor
  es?
date: 2022-09-13
cover: /images/rebuild-with-astro.webp
author: es/yuniel-acosta
tags:
  - es/gridsome
  - es/astro
  - es/vuejs
  - es/nuxt
categories:
  - es/software-development
draft: false
---

![Astro es un innovador generador de sitios estáticos que se enfoca en la generación estática en lugar de los frameworks JS. Pero, ¿cuánto mejor es?](/images/rebuild-with-astro.webp 'Astro vs Gridsome/Nuxt - Rebuilding with Astro')

No recuerdo exactamente cuándo comencé a escuchar acerca de [Astro](https://astro.build), uno de los últimos generadores de sitios estáticos para ayudar a abordar el problema de crear sitios webs con menos Javascript. El problema es uno con el que todos estamos familiarizados: ¿cómo puedo crear un sitio estático (en mi caso, mi sitio personal) usando los lenguajes y las herramientas que mejor conozco, mientras el desempeño es el mejor posible? Después de migrar desde [jekyll](https://jekyllrb.com/), primero probé [Hugo](https://gohugo.io/), luego [Gridsome](https://gridsome.org/) y más recientemente [Nuxt](https://nuxtjs.org/). Todas estas son excelentes herramientas, y las recomiendo encarecidamente. Pero una cosa que es igual en todos ellos es que están vinculados a su framework específico (React o Vue).

Astro elimina eso, y es una de las cosas que realmente me atrajo del marco. Desde su sitio:

> Es hora de aceptar que las guerras de frameworks no tendrán un ganador; es por eso que Astro nos permite usar cualquier framework que desee (o ninguno de ellos). Y si la mayoría de los sitios solo tienen islas de interactividad, ¿no deberían nuestras herramientas optimizarse para eso? No somos los primeros en hacer la pregunta, pero podríamos ser los primeros con una respuesta para cada framework.

Esto captó mi interés. La idea de que las "guerras de frameworks" tuvieran un ganador nunca tuvo sentido para mí. Ninguna de estas herramientas (React, Vue, Svelte, Angular) necesita ser el ganador general para que los desarrolladores sean productivos. Tener un ganador significaría que la innovación está estancada, en el mejor de los casos. El hecho de que Astro le permita utilizar el framework que le resulte más cómodo significa que puede adaptarse a cualquier cambio que surja en el futuro y centrarse más en lo que hace mejor: crear activos estáticos.

Por lo tanto, decidí reescribir mi sitio personal de Nuxt a Astro.

## Problemas de rendimiento

Debo decir, antes de ir más lejos, que me encanta Nuxt como framework. Creo que es una herramienta increíble para crear sitios web.

Dicho esto, he estado ejecutando varios sitios con Nuxt en modo de sitio estático, y cada uno de ellos tiene algunas peculiaridades extrañas que nunca he podido resolver por completo. Un sitio, una sola página en el sentido más verdadero con solo un poco de reactividad, contiene errores en typescript en VS Code. Esto se debe a que los complementos de VS Code (ya sea Vetur o Volar) no reconocen que el método `asyncData` de Nuxt devuelve el estado al objeto Vue. Esto no es culpa de Nuxt, pero hizo las cosas molestas.

Un segundo sitio (que son puramente estáticos, casi sin interacción JS en el navegador) tenía un problema que cuando se actualizaba el código, cualquier contenido obtenido con el [módulo de contenido de Nuxt](https://content.nuxtjs.org/) no se encuentra después de que se finaliza la recarga del módulo en caliente. Encontré una solución, y no es un gran problema, pero es molesto.

Todos estos sitios, desde el más pequeño hasta el más grande, tenían un problema unificador: las puntuaciones de rendimiento de Lighthouse nunca fueron excelentes. A continuación se muestran mis puntajes de Lighthouse para este sitio antes de migrar de Nuxt:

![Puntuaciones de Lighthouse del sitio basado en Nuxt. Rendimiento: 57, Accesibilidad: 79, Mejores prácticas: 93, SEO: 100](/images/nuxt-lighthouse.webp)

Esto se hizo en mi página de inicio, en una instancia nueva de Chrome sin complementos instalados, para estar lo más cerca posible de una lectura limpia. La página de inicio está cargando un puñado de imágenes (iconos de idioma, mi imagen de perfil), mi última publicación de blog y algunos SVG para íconos sociales cortesía de Font Awesome.

Aquí está el desglose de la puntuación de rendimiento:

![Métricas de rendimiento. Primera pintura con contenido: 2,0 s, Tiempo de interacción: 6,3 s, Índice de velocidad: 2,3 s, Tiempo total de bloqueo: 150 ms, Pintura con contenido más grande: 7,4 s, Cambio de diseño acumulativo: 0,47](/images/nuxt-performance.webp)

De estos puntajes, el Largest Contentful Paint y Time to Interactive se destacaron para mí. Esta es una página principalmente estática, con varios enlaces y un solo componente interactivo para cambiar los detalles de las compañias en las que he trabajado. ¿Por qué Nuxt tardó tanto en ser interactivo?

Mirando mis solicitudes de red, me parece que Nuxt está principalmente obteniendo Javascript y luego dedica su tiempo a ejecutarlo. Tomé algunas notas para ver lo que estaba mirando. En una carga de página típica, tenía:

- 37 solicitudes únicas
- 6,7 MB de recursos cargados (imágenes incluidas)
- Tiempo de carga: 2.5s

¿Qué podría hacer para reducir toda esta obtención de datos y la ejecución de Javascript?

## Hora de menos Javascript

Aquí es donde Astro me llamó la atención. En su página de inicio, dicen:

> For a technology built on top of three different languages, the modern web seems to focus an awful lot on JavaScript. We don’t think it has to—and that’s certainly not a revolutionary concept.
>
> We’ll eagerly jump at the chance to sing JavaScript’s praises, but HTML and CSS are pretty great too. There aren’t enough modern tools which reflect that, which is why we're building Astro.

> Para una tecnología construida sobre tres lenguajes diferentes, la web moderna parece enfocarse mucho en JavaScript. No creemos que tenga que hacerlo, y ciertamente no es un concepto revolucionario.
>
> Saltaremos con alegría a la oportunidad de cantar los elogios de JavaScript, pero HTML y CSS también son geniales. No hay suficientes herramientas modernas que lo reflejen, y es por eso que estamos construyendo Astro.

Astro es un framework que se enfoca principalmente en obtener sus datos de cualquier fuente o fuentes que use, inyectarlos en una plantilla HTML y crear activos estáticos a partir de ella. Si bien Astro se basa en Javascript, no se enfoca en enviar Javascript al cliente. Todavía se puede incorporar cualquier funcionalidad que desee, ya sea Vanilla JS, React, Vue o cualquier otra cosa.

Esta forma de construir un sitio estático me resulta muy cómoda y familiar. Empecé a desarrollar web en HTML, CSS y PHP, y evité Javascript a toda costa durante muchos años (tanto antes como después de que jQuery apareciera en escena). Renderizar HTML y CSS al cliente es lo que hice, con cierta lógica involucrada para realizar tareas simples como mostrar una lista de elementos o obtener datos de una base de datos. Usando Astro, es básicamente lo mismo, solo usando Javascript en lugar de PHP.

Aquí hay un ejemplo de la página principal de mi blog, que muestra una lista de artículos. Astro usa una sintaxis única que combina la apariencia de Markdown, JSX y HTML estándar. Todo el tiempo de compilación de Javascript se maneja en un bloque similar a 'frontmatter' en la parte superior del archivo, y la plantilla estática se construye debajo de eso.

```javascript
---
import i18next, { t, changeLanguage } from "i18next";
import BlogTemplate from "templates:BlogTemplate";
import { jsonToArticle } from "@models:Article";
import ArticleSummary from "molecules:ArticleSummary";
import Paginator from "molecules:Paginator";
import SearchBox from "@components:molecules/SearchBox.vue";

changeLanguage("en");

const allPosts = await Astro.glob("./**/*.md");
const sortedPosts = allPosts
    .filter((post) => !post.frontmatter.draft && post.frontmatter.lang === i18next.language)
    .map((post) => jsonToArticle(post))
    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
export async function getStaticPaths({ paginate }) {
    const allPosts = await Astro.glob("./**/*.md");
    const sortedPosts = allPosts
        .filter((post) => !post.frontmatter.draft && post.frontmatter.lang === i18next.language)
        .map((post) => jsonToArticle(post))
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
    return paginate(sortedPosts, {
        pageSize: 5
    });
}
const { page } = Astro.props;
---

<BlogTemplate title={t('blog')} description={t('seo.blog-description')}>
	<SearchBox articles={sortedPosts} client:only/>
	<div class='container mx-auto'>
		{
			page.data.map((post) => (
				<article class='mb-20 border-b border-gray-400 mx-2 md:mx-24'>
					<ArticleSummary article={post} />
				</article>
			))
		}
		{
			page.data.length === 0 && (
				<div class='container-inner mx-auto py-16 pl-10'>
					<div class='text-center'>
						<h1 class='text-3xl font-bold'>{t('no-articles-found')}</h1>
						<p class='text-gray-600'>{t('try-again')}</p>
					</div>
				</div>
			)
		}
		<!-- pagination -->
		<Paginator page={page} />
	</div>
</BlogTemplate>

```

Esto puede parecer familiar a alguien que haya usado React antes, con solo algunas rarezas (¿ninguna key en el JSX mapeado? ¿Guiones adicionales entre el encabezado y el retorno?), pero es importante recordar que el resultado de esto es HTML puro. Nunca se analizará Javascript en el cliente a partir de este fragmento. Todos estos componentes están escritos con la sintaxis única de Astro, pero lo mismo es cierto cuando se usa React, Vue o cualquier otra cosa: solo resultaría HTML y CSS estáticos al renderizar esta página.

Pero, ¿y si quieres cargar algo de Javascript? ¿Qué sucede si necesita alguna interacción del lado del cliente?

## Hidratación Parcial

Astro promueve el concepto de [Hidratación Parcial](https://docs.astro.build/en/core-concepts/framework-components/#hydrating-interactive-components). De la documentación de Astro:

> Astro genera cada sitio web sin JavaScript del lado del cliente, de forma predeterminada. Use cualquier componente de la interfaz de usuario que desee (React, Svelte, Vue, etc.) y Astro lo procesará automáticamente en HTML en el momento de la compilación y eliminará todo el JavaScript. Esto mantiene cada sitio rápido por defecto.
>
> Pero a veces, se requiere JavaScript del lado del cliente. Esta guía muestra cómo funcionan los componentes interactivos en Astro usando una técnica llamada hidratación parcial.

La mayoría de los sitios no necesitan estar totalmente controlados por Javascript. Este concepto de hidratación parcial se apoya en eso. Usando mi sitio personal como ejemplo, la única parte dinámica del sitio es alternar el componente "Dónde he trabajado". En la versión de Nuxt del sitio, dependía del tiempo de ejecución de Nuxt para alternar las pestañas de estos componentes. Para ser franco, eso es excesivo para un sitio estático. No debería tener que renderizar un SPA completo solo para alternar estas pestañas, ¿verdad?

En su página sobre hidratación parcial, los documentos de Astro hacen referencia a la [publicación del blog de Jason Miller sobre la idea de una arquitectura de islas](https://jasonformat.com/islands-architecture/):

> En un modelo de "islas", la representación del servidor no es una optimización adicional destinada a mejorar el SEO o la experiencia de usuario. En cambio, es una parte fundamental de cómo se entregan las páginas al navegador. El código HTML devuelto en respuesta a la navegación contiene una representación significativa e inmediatamente representable del contenido que solicitó el usuario.

En lugar de cargar un SPA completo para manejar una pequeña parte de la funcionalidad, Vue puede apuntar a una sección mucho más pequeña del DOM y mostrar solo la parte de la aplicación que necesito (en este caso, un botón y algo de JS para alternar las pestañas ). Vue soporta este uso de forma predeterminada, pero en el mundo de los frameworks tendemos a olvidarlo. [La Fundación Wikimedia también usa Vue de esta manera](https://lists.wikimedia.org/hyperkitty/list/wikitech-l@lists.wikimedia.org/thread/SOZREBYR36PUNFZXMIUBVAIOQI4N7PDU/).

Cuando se ve de esta manera, el rendimiento es casi un subproducto de seguir las mejores prácticas con Astro. Para mi sitio personal, solo necesitaba un componente simple para cambiar la información de la empresa. Si bien sé que esto podría manejarse con la misma facilidad con Vanilla JS, quería intentar usar Vue para crear una isla de esta funcionalidad. Aquí está mi componente Vue:

```html
<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
  import { Job } from '../../../models/Job'
  import { inlineLinks } from '../../../util/utilities'

  defineProps({
    jobs: {
      type: Array<Job>,
      default: () => []
    }
  })

  const jobActiveTabIdKey = 'jobActiveTabId'
  const getActiveTabId = (): number => {
    if (!localStorage.getItem(jobActiveTabIdKey)) localStorage.setItem(jobActiveTabIdKey, '0')

    return Number.parseInt(localStorage.getItem(jobActiveTabIdKey) || '0')
  }

  const tabId = ref(getActiveTabId())

  const activeTabId = computed<number>({
    get: () => tabId.value,
    set: (value) => {
      tabId.value = value
      localStorage.setItem(jobActiveTabIdKey, value.toString())
    }
  })

  const breakpoints = useBreakpoints(breakpointsTailwind)
  const sm = breakpoints.smaller('sm')
  const range = (job: Job): string => {
    return `${new Date(job.startDate).toDateString()} - ${
      job.endDate ? new Date(job.endDate).toDateString() : 'Present'
    }`
  }

  onMounted(() => {
    inlineLinks('styled-tab-content')
  })
</script>

<template>
  <section id="jobs" class="styled-jobs-section">
    <h2 class="numbered-heading">Where I've Worked</h2>
    <div class="inner">
      <ul class="styled-tab-list" role="tablist" aria-label="Job tabs">
        <li v-for="(job, i) in jobs" :key="job.id">
          <button
            :id="`tab-${i}`"
            class="styled-tab-button"
            :class="{ 'text-green-500': activeTabId === i }"
            role="tab"
            :aria-selected="activeTabId === i ? 'true' : 'false'"
            :aria-controls="`panel-${i}`"
            :tabIndex="activeTabId === i ? '0' : '-1'"
            @click="activeTabId = i"
            @keyup.up.prevent.stop="
							activeTabId - 1 >= 0 ? (activeTabId -= 1) : (activeTabId = jobs.length - 1)
						"
            @keyup.down.prevent.stop="
							activeTabId + 1 >= jobs.length ? (activeTabId = 0) : (activeTabId += 1)
						"
          >
            <span>{{ job.company }}</span>
          </button>
        </li>
        <div
          class="styled-high-light"
          :style="
						sm
							? `transform: translateX(calc(${activeTabId} * 120px));`
							: `transform: translateY(calc(${activeTabId} * 42px));`
					"
        ></div>
      </ul>
      <transition name="fade" mode="out-in">
        <div>
          <div
            v-for="(job, i) in jobs"
            :id="`panel-${i}`"
            :key="job.id"
            class="styled-tab-content"
            role="tabpanel"
            :tabIndex="activeTabId === i ? 0 : -1"
            :aria-labelledby="`tab-${i}`"
            :hidden="activeTabId !== i"
          >
            <h3>
              <span>{{ job.role }}</span>
              <span class="company">
                &nbsp;@&nbsp;
                <a :href="job.url" target="_blank" class="inline-link"> {{ job.company }} </a>
              </span>
            </h3>
            <p class="range">{{ range(job) }}</p>
            <ul>
              <li v-for="(detail, index) in job.achievement" :key="index">
                <span>{{ detail }}</span>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>
```

Y aquí está un ejemplo de cómo estoy usando el componente:

```javascript
---
// Import the Vue component into an Astro component
import Jobs from "./Jobs.vue";
import { Job } from "@models:Job";
import i18next from "i18next";
const data = await Astro.glob<Job>("../../../data/jobs/**/*.json");
const jobs = data
    .filter((job) =>job.published && job.lang === i18next.language)
    .sort((a: Job, b: Job) => {
        if (a.startDate > b.startDate) return -1;
        if (a.startDate < b.startDate) return 1;
        return 0;
    });
---

<Jobs client:only jobs={jobs} />
```

Aquí, estoy usando la directiva `client:only` de Astro. Esto le dice a Astro que debe hidratar el componente en el cliente, para que se ejecute Javascript. En este caso, debido a que el componente está accediendo a `localStorage`, quiero asegurarme de que no se ejecute durante el tiempo de compilación. La mejor parte es que, dentro del componente Astro, solo pregunta como un componente normal que puede aceptar propiedades.

Astro tiene varios renderizadores, y en el reciente evento los [Días de los Vue contribuidores](https://youtu.be/gpTbH469Qog?t=5756), Fred Schott dijo que el soporte de Vue de primera clase es muy importante para el equipo de Astro, y que es 'out of the box' cuando se trabaja con Astro. Debe agregar el renderizador a su configuración de Astro, pero eso es todo lo que se requiere para habilitar los componentes de Vue.

## Los resultados

Reescribir mi sitio personal tomó alrededor de una semana. La mayor parte de mis plantillas se migró de los componentes de Vue a Astro (aunque, como se señaló anteriormente, esto no era un requisito para hacer el cambio), con un par de componentes de Vue para la interactividad. La migración en sí fue muy fluida, especialmente porque Astro admite PostCSS (y, por lo tanto, Tailwind) a través de un complemento para Snowpack. Los beneficios de obtener previamente los datos y generar HTML estático fueron obvios desde el principio, y la capacidad de combinar HTML y CSS básicos con componentes de Vue fue muy sencilla.

Después de terminar y poner en producción, ejecuté Lighthouse en la migración finalizada. Aquí están los resultados:

![Puntuaciones de Lighthouse del sitio basado en Astro: Rendimiento: 100, Accesibilidad: 95, Mejores prácticas: 100, SEO: 100](/images/astro-lighthouse.webp)

Y aquí están los resultados de rendimiento:

![Métricas de rendimiento. Primera pintura con contenido: 1,6 s, Tiempo de interacción: 1,6 s, Índice de velocidad: 1,6 s, Tiempo total de bloqueo: 0 ms, Pintura con contenido más grande: 1,6 s, Cambio de diseño acumulativo: 0](/images/astro-performance.webp)

¡Mucho mejor! Debido a que todo se carga como HTML y CSS, en lugar de utilizar un framework de JavaScript para representar la página, todo es mucho más rápido.

## Conclusiones

Astro es una herramienta relativamente nueva para construir sitios estáticos, pero ya está ganando mucha tracción. Astro ganó recientemente el [Premio a la innovación del ecosistema](https://www.netlify.com/blog/2021/10/06/jammies-award-winners-2021/) como parte de Jamstack Conf 2021. Desde la página vinculada:

> El premio a la innovación del ecosistema de este año es para Astro, una innovadora plataforma Jamstack que le permite crear sitios web más rápidos con menos JavaScript del lado del cliente. Hacen posible que los desarrolladores construyan sitios totalmente funcionales con cualquier framework de su elección o ninguno. Astro ofrece lo mejor de ambos mundos cuando se trata de generadores de sitios estáticos livianos como 11ty y alternativas con muchos paquetes como Next y Svelte Kit.

Estoy muy emocionado de ver a dónde va Astro en el futuro. Espero ver qué más sale de este proyecto tan interesante.

No dude en consultar [el repositorio de este sitio](https://github.com/yacosta738/yacosta738.github.io) para ver el código y compararlo con el equivalente de Nuxt (en el historial de Git). Si desea obtener más información sobre Astro, visite su sitio en [astro.build](https://astro.build).
