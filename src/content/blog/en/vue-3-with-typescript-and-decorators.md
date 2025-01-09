---
title: Vue 3 with Typescript and Decorators
description: I use Typescript and decorator libraries for VueJS. This allows me
  to use a class syntax that's easier to read. I'll show you how to build a
  counter component that can increment and decrement.
date: 2021-05-30T19:54:13.642Z
cover: /images/vue3-typescript.webp
author: en/yuniel-acosta
tags:
  - Vuejs
  - TypeScript
  - Decorators
  - VueX
categories:
  - Software Development
draft: false
---

![vue3+typescript](/images/vue3-typescript.webp 'Vue 3 with Typescript')

I always use Typescript and some decorator libraries on my [VueJS](https://vuejs.org/) projects. It has allowed me to use a class syntax for my components and store files which, I feel, is easier to read than the normal VueJS javascript syntax. I'll be going through a step by step process on how to achieve this. We will be building a counter component that will allow you to increment/decrement a counter.

First we want to start off by creating a new VueJS project using the [Vue CLI](https://cli.vuejs.org/). If you haven't already done so, you can easily install the CLI with the following command:

```shell
npm install -g @vue/cli
```

Next, we are going to create a new VueJS project with the `vue create` command.

```shell
vue create vue-typescript-decorators
```

With the latest version of the CLI, you can create a Vue 2 or 3 project. Once you run the `vue create` command, you will be prompted with the following options. We will pick `Manually select features` so that we can create a Typescript project with Vue 3.

```shell
Vue CLI v4.5.9
? Please pick a preset:
  standard ([Vue 2] node-sass, babel, typescript, router, vuex, eslint, unit-jest, e2e-cypress)
  Default ([Vue 2] babel, eslint)
  Default (Vue 3 Preview) ([Vue 3] babel, eslint)
❯ Manually select features
```

You will be prompted with which features you want to add to the project. For now, we will just add Typescript, Router and Vuex.

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

You will be prompted with which version of VueJS you want to use. In this example, we are going to use version 3 but this example should work just fine with version 2 or 3 (expect for how you register Vuex in 2 vs 3).

```shell
? Choose a version of Vue.js that you want to start the project with
  2.x
❯ 3.x (Preview)
```

Before we start coding, we need to install the libraries that add decorator support to our project. Here is a list of libraries we will be adding:

- [vue-class-component](https://github.com/vuejs/vue-class-component) used to define components which is installed by default when Typescript Vue 3 project created
- [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) used to define props, watches, etc.
- [vuex-class](https://github.com/ktsn/vuex-class) used to import state, getters, mutations and actions in components
- [vuex-class-modules](https://github.com/gertqin/vuex-class-modules) used to define state, getters, mutations and actions

```shell
 npm install vue-property-decorator vuex-class vuex-class-modules -P
```

If we look at the `Home.vue` view, the generated view already uses `vue-class-component` which uses the `Options` decorator to define a Vue component. Inside the `@Options` decorator, I added the `name` attribute and called this view `Home`. I noticed that if you do not do this, it is much harder to figure out what is what in the Vue tools when inspecting the different components. Also notice how you define a class called `Home` as the default export and extend from `Vue` from the `vue-class-component` library.

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

Next we are going to setup the Vuex store. I will create a vuex module so you can see what that looks like using the `vuex-class-modules` libary. This counter example doesn't require a module since it is so simple but most projects increase in complexity pretty quickly where splitting out your stores into modules becomes important.

We will go ahead and create a new store called `counter.ts` under `src/store`. You will notice that we just need to export a default class that extends `VueModule` from `vuex-class-modules`. Inside the class we will create examples of state, getters, mutations and actions.

- State - Inside the class we will add a private level variable called `_count`. All state will be defined as class level variables.
- Getters - I created a getter method called `count` to return the value of the class level variable. All vuex getters will be defined as javascript getters in the class. This getter was not necessary for this simple example but I threw it in there so that you can see examples of a getter.
- Mutations - Two mutations are added, one to add to the counter and one to subtract from the counter. These are just standard methods in the class but need to be decorated with `@Mutation`.
- Actions - Two actions are added, one to add to the counter and one to subtract from the counter. Each method has been defined with `async` since actions are asynchronous functions. These are just standard methods in the class but need to be decorated with `@Action`.

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

We now need to register `counter.ts` as a module using Vuex 4 (version 4 is used automatically in a Vue 3 project). Using the new Vuex 4 syntax, we create an empty store with `createStore` and then create a new instance of `Counter` and register it with the module name of `counter`. We will do this in `index.ts` to define the counter module and any subsequent modules we create.

```typescript
// src/store/index.ts
import { createStore } from 'vuex'
import Counter from './counter'

const store = createStore({})

// tslint:disable-next-line:no-unused-expression
new Counter({ store, name: 'counter' })

export default store
```

We are now going to create the counter component. Create a file called `Counter.vue` under `src/components`. We'll start by exporting a class level component. We will use the `@Options` annotation to define the name of the component as `Counter`. Last, we will create a constant that makes a reference to the `counter` Vuex module using the `vuex-class` library.

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

We'll add a property to the `Counter` component just as an example of how to use the `@Prop` decorator from the `vue-property-decorator` library. This property serves no real purpose in this example but just gives you an idea on how to use it. There is a way to define the property in the `@Options` decorator but I prefer to use `vue-property-decorator` instead.

```typescript
@Prop({ type: String })
private msg!: string;
```

To reference the count in the Vuex state, we can use the namespaced decorator from `vuex-class` to create a private level variable in the component. We can also do the same thing for the getters in Vuex. In both cases, I specified the name of the property in the Vuex store inside the decorator. This is only necessary if the name of the Vuex property differs from private level variable you are creating.

```typescript
  @counterModule.State("_count")
  private counter!: number;

  @counterModule.Getter("count")
  private getCounter!: () => number;

```

To reference the actions in the Vuex store, we will use the namespaced decorator again to create private level variables in the component to reference the Vuex actions.

```typescript
  @counterModule.Action
  private add!: () => Promise<void>;

  @counterModule.Action
  private subtract!: () => Promise<void>;

```

Last thing to do in the component is to create the template. This is pretty straight forward. We will create an `h1` that displays the passed property, two buttons for adding and subtracting from the counter and two `divs` to display the counter from the Vuex state and getters.

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

The final version of `Counter.vue` should look like this.

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

Lastly, we are going to drop in the `Counter` component onto the home page. We will pass the message of `Counter` to the component.

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

All you need to do now is run the project.

```shell
npm run serve

```

Now just go to <http://localhost:8080/>. You can find the example source code [here](https://github.com/yacosta738/vue-typescript-decorators).
