---
title: Introducción a Gridsome
description: Gridsome es un generador de sitios web estáticos con tecnología
  Vue.js para crear los sitios web lo más rápido posible para cualquier CMS, API
  o archivos Markdown. Gridsome hace que sea fácil y divertido para los
  desarrolladores crear sitios web hermosos y rápidos sin necesidad de
  convertirse en un experto en rendimiento.
date: 2019-04-08
lang: es
cover: /uploads/gridsome-portada.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - frontend
  - gridsome
  - Vuejs
categories:
  - Desarrollo de software
draft: false
---
![Introducción a Gridsome](/uploads/gridsome-portada.webp "Introducción a Gridsome")

Gridsome es un generador de sitios web estáticos con tecnología Vue.js para crear los sitios web lo más rápido posible para cualquier CMS, API o archivos Markdown. Gridsome hace que sea fácil y divertido para los desarrolladores crear sitios web hermosos y rápidos sin necesidad de convertirse en un experto en rendimiento.

### ¿Por qué Gridsome?

* **Complementos de fuente de datos** - Úselo para cualquier CMS, API o archivos Markdown populares sin cabeza.
* **Enrutamiento de páginas basado en archivos** - Cree y administre rápidamente rutas con archivos.
* **Gestión de datos centralizada** - Extraiga datos en una capa de datos GraphQL local y unificada.
* **Vue.js para frontend**: un framework de front-end ligero y accesible.
* **Código optimizado automáticamente**: obtenga la división de código y la optimización de activos de forma inmediata.
* **Generación de archivos estáticos** - Implemente de forma segura en cualquier CDN o alojamiento web estático.

[Aprenda más de cómo Gridsome funciona](https://gridsome.org/docs/#how-it-works)

```js
<template>
  <Layout>
    <div class="container-inner mx-auto my-16">
      <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
      <div class="text-xl text-gray-600 mb-8">{{ $page.post.date }}</div>
      <div class="markdown-body" v-html="$page.post.content" />
    </div>
  </Layout>
</template>
```

### Prerrequisitos

Debe tener conocimientos básicos sobre HTML, CSS, [Vue.js](https://vuejs.org) y cómo utilizar la [Terminal](https://www.linode.com/docs/tools-reference/tools/using-the-terminal/). Saber cómo funcionan los [componentes de Vue Single File](https://vuejs.org/v2/guide/single-file-components.html) y [GraphQL](https://www.graphql.com/) es una ventaja, pero no es obligatorio. Gridsome es una excelente manera de aprender ambos.

Gridsome requiere **Node.js** y recomienda **Yarn**. [Cómo configurar](https://gridsome.org/docs/#prerequisites)

![background](/uploads/gridsome-stack.png)

### 1. Instalar la herramienta CLI de Gridsome

Usando yarn:
`yarn global add @gridsome/cli`

Usando npm:
`npm install --global @gridsome/cli`

### 2. Crear un proyecto Gridsome

1. `gridsome create my-gridsome-site` para crear un nuevo proyecto </li>
2. `cd my-gridsome-site` para abrir la carpeta
3. `gridsome develop` para iniciar el servidor de desarrollo en `http://localhost:8080`
4. Feliz codificación 🎉🙌

### 3. Siguientes pasos

1. Cree componentes `.vue` en el directorio `/pages` para crear rutas de página.
2. Utilice `gridsome build` para generar archivos estáticos en una carpeta `/dist`

* [Cómo funciona](https://gridsome.org/docs/#how-it-works)
* [Cómo funcionan las páginas](https://gridsome.org/docs/pages/)
* [Cómo implementar](https://gridsome.org/docs/deployment/)