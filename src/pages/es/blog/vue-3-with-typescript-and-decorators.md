---
layout: ../../../components/templates/BlogPostTemplate.astro
title: Vue 3 con Typescript y Decoradores
description: Siempre uso Typescript y algunas bibliotecas de decoradores en mis proyectos de VueJS. Me ha permitido usar una sintaxis de clase para mis componentes y almacenar archivos que, creo, es más fácil de leer que la sintaxis normal de javascript de VueJS. Pasaré por un proceso paso a paso sobre cómo lograr esto. Construiremos un componente de contador que le permitirá incrementar / disminuir un contador.
date: 2021-05-30T19:54:13.642Z
cover: /uploads/vue3-typescript.png
author: Yuniel Acosta
lang: es
tags:
  - VueJS
  - TypeScript
  - Decorators
  - VueX
  - Components
categories:
  - Programming
draft: false
---

![vue3+typescript](/uploads/vue3-typescript.png 'Vue 3 with Typescript')

Siempre uso Typescript y algunas bibliotecas de decoradores en mis proyectos de [VueJS](https://vuejs.org/). Me ha permitido usar una sintaxis de clase para mis componentes y almacenar archivos que, creo, es más fácil de leer que la sintaxis normal de javascript de VueJS. Pasaré por un proceso paso a paso sobre cómo lograr esto. Construiremos un componente de contador que le permitirá incrementar / disminuir un contador.

Primero, queremos comenzar creando un nuevo proyecto de VueJS usando la [Vue CLI](https://cli.vuejs.org/). Si aún no lo ha hecho, puede instalar fácilmente la CLI con el siguiente comando:

```shell
npm install -g @vue/cli
```

A continuación, vamos a crear un nuevo proyecto de VueJS con el comando `vue create`.

```shell
vue create vue-typescript-decorators
```

Con la última versión de la CLI, puede crear un proyecto Vue 2 o 3. Una vez que ejecute el comando `vue create`, se le solicitarán las siguientes opciones. Elegiremos `Manually select features` para que podamos crear un proyecto de TypeScript con Vue 3.

```shell
Vue CLI v4.5.9
? Please pick a preset:
  standard ([Vue 2] node-sass, babel, typescript, router, Vuex, eslint, unit-jest, e2e-cypress)
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
❯ Manually select features
```

Se le preguntará qué funciones desea agregar al proyecto. Por ahora, solo agregaremos TypeScript, Router y Vuex.

```shell
Vue CLI v4.5.9
? Please pick a preset: Manually select features
? Check the features needed for your project:
 ◉ Choose Vue version
 ◉ Babel
 ◉ TypeScript
 ◯ Progressive Web App (PWA) Support
 ◉ Router
❯◉ Vuex
 ◯ CSS Pre-processors
 ◉ Linter / Formatter
 ◯ Unit Testing
 ◯ E2E Testing
```

Se le preguntará qué versión de VueJS desea utilizar. En este ejemplo, vamos a usar la versión 3, pero este ejemplo debería funcionar bien con la versión 2 o 3 (espere cómo registra Vuex en 2 vs 3).

```shell
? Choose a version of Vue.js that you want to start the project with
  2.x
❯ 3.x (Preview)
```

Antes de comenzar a codificar, necesitamos instalar las bibliotecas que agregan soporte de decorador a nuestro proyecto. Aquí hay una lista de bibliotecas que agregaremos:

- [vue-class-component](https://github.com/vuejs/vue-class-component) utilizado para definir componentes que se instalan de forma predeterminada cuando se crea el proyecto Typescript Vue 3
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) utilizado para definir **props**, **watches**, etc.
- [vuex-class](https://github.com/ktsn/vuex-class) utilizado para importar **state**, **getters**, **mutations** y **actions** en componentes
- [vuex-class-modules](https://github.com/gertqin/vuex-class-modules) utilizado para definir **state**, **getters**, **mutations** y **actions**

```shell
 npm install vue-property-decorator vuex-class vuex-class-modules -P
```

Si miramos `Home.vue` en la carpeta views, la vista generada ya usa` vue-class-component` que usa el decorador `Options` para definir un componente Vue. Dentro del decorador `@Options`, agregué el atributo `name` y llamé a esta vista `Home`. Noté que si no hace esto, es mucho más difícil averiguar qué es qué en las herramientas de Vue al inspeccionar los diferentes componentes. También observé cómo define una clase llamada `Home` como la exportación predeterminada y se extiende desde` Vue` de la biblioteca `vue-class-component`.

```typescript
// src/views/Home.vue
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Options({
  name: "Home",
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
```

A continuación, configuraremos la Vuex store. Crearé un módulo Vuex para que puedas ver cómo se ve usando la biblioteca `vuex-class-modules`. Este contraejemplo no requiere un módulo, ya que es muy simple, pero la mayoría de los proyectos aumentan en complejidad con bastante rapidez, donde dividir los stores en módulos se vuelve importante.

Seguiremos adelante y crearemos una nueva store llamada `counter.ts` en `src/store`. Notarás que solo necesitamos exportar una clase predeterminada que extiende `VueModule` de` vuex-class-modules`. Dentro de la clase crearemos ejemplos de **state**, **getters**, **mutations** y **actions**.

- State - Dentro de la clase agregaremos una variable de nivel privado llamada `_count`. Todo el estado se definirá como variables de nivel de clase.
- Getters: creé un método getter llamado `count` para devolver el valor de la variable de nivel de clase. Todos los getters de vuex se definirán como getters de JavaScript en la clase. Este getter no era necesario para este ejemplo simple, pero lo incluí para que puedas ver ejemplos de un getter.
- Mutations: se agregan dos mutaciones, una para agregar al contador y otra para restar del contador. Estos son solo métodos estándar en la clase, pero deben decorarse con `@Mutation`.
- Actions: se agregan dos acciones, una para agregar al contador y otra para restar del contador. Cada método se ha definido con `async` ya que las acciones son funciones asincrónicas. Estos son solo métodos estándar en la clase, pero deben decorarse con `@Action`.

```typescript
// src/store/counter.ts
import { VuexModule, Module, Mutation, Action } from 'vuex-class-modules'

@Module({ generateMutationSetters: true })
export default class Counter extends VuexModule {
  // state
  private _count = 0

  // getters
  get count(): number {
    return this._count
  }

  // mutations
  @Mutation
  public addToCount() {
    this._count++
  }

  @Mutation
  public subtractFromCount() {
    if (this._count > 0) {
      this._count--
    }
  }

  // actions
  @Action
  public async add(): Promise<void> {
    this.addToCount()
  }

  @Action
  public async subtract(): Promise<void> {
    this.subtractFromCount()
  }
}
```

Ahora necesitamos registrar `counter.ts` como un módulo usando Vuex 4 (la versión 4 se usa automáticamente en un proyecto de Vue 3). Usando la nueva sintaxis de Vuex 4, creamos una store vacía con `createStore` y luego creamos una nueva instancia de `Counter` y la registramos con el nombre de módulo de `counter`. Haremos esto en `index.ts` para definir el módulo contador y cualquier módulo subsiguiente que creemos.

```typescript
// src/store/index.ts
import { createStore } from 'vuex'
import Counter from './counter'

const store = createStore({})

// tslint:disable-next-line:no-unused-expression
new Counter({ store, name: 'counter' })

export default store
```

Ahora vamos a crear el componente contador. Cree un archivo llamado `Counter.vue` en `src/components`. Comenzaremos exportando un componente de nivel de clase. Usaremos la anotación `@Options` para definir el nombre del componente como `Counter`. Por último, crearemos una constante que haga referencia al módulo Vuex `counter` usando la biblioteca `vuex-class`.

```typescript
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const counterModule = namespace("counter");

@Options({
  name: "Counter"
})
export default class Counter extends Vue {
  ...
}
</script>

```

Agregaremos una propiedad al componente `Counter` solo como un ejemplo de cómo usar el decorador `@Prop` de la biblioteca `vue-property-decorator`. Esta propiedad no tiene ningún propósito real en este ejemplo, solo le da una idea de cómo usarla. Hay una forma de definir la propiedad en el decorador `@Options` pero prefiero usar `vue-property-decorator` en su lugar.

```typescript
@Prop({ type: String })
private msg!: string;
```

Para hacer referencia al recuento en el estado de Vuex, podemos usar el decorador de espacio de nombres de `vuex-class` para crear una variable de nivel privado en el componente. También podemos hacer lo mismo con los getters en Vuex. En ambos casos, especifiqué el nombre de la propiedad en la store Vuex dentro del decorador. Esto solo es necesario si el nombre de la propiedad Vuex difiere de la variable de nivel privado que está creando.

```typescript
  @counterModule.State("_count")
  private counter!: number;

  @counterModule.Getter("count")
  private getCounter!: () => number;

```

Para hacer referencia a las acciones en la Vuex store, usaremos el decorador namespaced nuevamente para crear variables de nivel privado en el componente para hacer referencia a las acciones de Vuex.

```typescript
  @counterModule.Action
  private add!: () => Promise<void>;

  @counterModule.Action
  private subtract!: () => Promise<void>;

```

Lo último que debe hacer en el componente es crear la plantilla (template). Esto es bastante sencillo. Crearemos un `h1` que muestre la propiedad pasada, dos botones para sumar y restar del contador y dos `divs` para mostrar el contador del estado de Vuex y los getters.

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="add">+</button>
      <button @click="subtract">-</button>
    </div>
    <div>State: {{ counter }}</div>
    <div>Getter: {{ getCounter }}</div>
  </div>
</template>
```

La versión final de `Counter.vue` se debe ver así.

```html
// src/components/Counter.vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="add">+</button>
      <button @click="subtract">-</button>
    </div>
    <div>State: {{ counter }}</div>
    <div>Getter: {{ getCounter }}</div>
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import { Prop } from 'vue-property-decorator'
  import { namespace } from 'vuex-class'

  const counterModule = namespace('counter')

  @Options({
    name: 'Counter'
  })
  export default class Counter extends Vue {
    @Prop({ type: String })
    private msg!: string

    @counterModule.State('_count')
    private counter!: number

    @counterModule.Getter('count')
    private getCounter!: () => number

    @counterModule.Action
    private add!: () => Promise<void>

    @counterModule.Action
    private subtract!: () => Promise<void>
  }
</script>
```

Por último, vamos a colocar el componente `Counter` en la página de inicio. Pasaremos el mensaje de `Counter` al componente.

```html
// src/views/Home.vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Counter msg="Counter" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component'
  import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
  import Counter from '@/components/Counter.vue'

  @Options({
    name: 'Home',
    components: {
      HelloWorld,
      Counter
    }
  })
  export default class Home extends Vue {}
</script>
```

Todo lo que necesitas ahora es correr el proyecto.

```shell
npm run serve
```

Ahora simplemente vaya a <http://localhost:8080/>. Puede encontrar el código fuente de ejemplo [aquí](https://github.com/yacosta738/vue-typescript-decorators).
