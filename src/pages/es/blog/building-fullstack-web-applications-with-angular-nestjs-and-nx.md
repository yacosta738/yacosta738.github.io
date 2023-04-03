---
title: Creación de apps web FullStack con Angular, NestJS y Nx
description: Angular es uno de los frameworks front-end más recomendados, pero
  solo cubre la mitad de los requerimientos para crear una aplicación web
  completa. NestJS se complementa bien con Angular para un desarrollo completo
  de aplicaciones web.
date: 2021-05-22T23:32:13.655Z
lang: es
cover: /uploads/nx.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Angular
  - NestJS
  - Nx
  - TypeScript
categories:
  - Desarrollo de software
draft: false
---

![nx](/uploads/nx.webp 'angular + nestjs + nx')

## ¿Por qué esta publicación?

Angular es uno de los frameworks frontend más recomendados en la industria del software. Sin embargo, si desea crear una aplicación web fullStack, solo cubre la mitad de los requisitos. Por un tiempo, lo he estado emparejando con [NestJS](https://nestjs.com/) y ha funcionado muy bien en múltiples proyectos.

Sigo recomendando esta combinación a amigos y compañeros de trabajo, así que finalmente quería escribir la configuración que uso como referencia / punto de partida. Quizás esta publicación te inspire a que también la pruebes. Si es así, hágamelo saber cómo le funcionó.

[Angular](https://angular.io/) será nuestro framework frontend para este ejemplo, usaremos [NestJS](https://nestjs.com/) para nuestro backend, y todo esto funcionará como un espacio de trabajo completo dentro de [Nx](https://nx.dev/). Introduciremos algunas mejoras en la calidad de vida y agruparemos ambos proyectos en un solo paquete.

[NestJS](https://nestjs.com/) es una capa de abstracción que se encuentra encima de [Express](https://expressjs.com/es/) o [Fastify](https://www.fastify.io/), ambos frameworks REST impulsados por NodeJS. Está escrito en TypeScript y sigue muchos de los mismos patrones que se encuentran en Angular (anotaciones, DI, etc.). Nx es un conjunto de herramientas desarrolladas por ex-Googlers que ayudan a desarrollar en Monorepos. También ofrecen opciones predeterminadas bastante sensatas y anulaciones de configuración.

¿Estás listo? ¡Vamos!

# Scaffolding

Primero, configuraremos un nuevo espacio de trabajo Nx y crearemos una aplicación Angular y NestJS dentro de él:

```shell
❯ npx create-nx-workspace@latest
✔ Workspace name (e.g., org name)     · hn-feed
✔ What to create in the new workspace · angular-nest
✔ Application name                    · client
✔ Default stylesheet format           · css
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

Cuando termine, esto habrá hecho lo siguiente:

1. crea un nuevo directorio con el nombre del espacio de trabajo
2. generar un nuevo proyecto Angular ubicado en `apps/client`
3. cree un nuevo proyecto de NestJS ubicado en `apps/api`
4. generar una biblioteca de typescript de muestra dentro del espacio de trabajo, para ser utilizada tanto por el cliente como por la API (ubicada en `libs/api-interfaces`)

Lo que también es interesante es que Nx viene con herramientas mejoradas para ambos proyectos, como:

- usando Jest over Karma como corredor de prueba de unidad
- uso de Cypress sobre Protractor para pruebas E2E specs (solo Angular)
- usando Prettier para formatear el código automáticamente
- Configuración de TSLint decente para todo el espacio de trabajo

Hay [toneladas más de funciones](https://nx.dev/angular/getting-started/why-nx#10-minute-nx-overview) ofrecidas por Nx, pero esas son las que quería señalar en este momento.

# Ejecutando los proyectos

Ahora que tenemos los proyectos básicos configurados, es hora de iniciarlos. Abra 2 ventanas de Terminal y ejecute los siguientes comandos:

```shell
`[Terminal 1]: npm run nx -- serve client `

`[Terminal 2]: npm run nx -- serve api`
```

El primer comando ejecutará el servidor de desarrollo Angular predeterminado, compilará y entregará la interfaz en [](http://localhost:4200/)<http://localhost:4200>. El segundo iniciará el dev-server de NestJS, compilará el TypeScript en JavaScript compatible con NodeJS y mostrará el resultado en [](http://localhost:3333/api)<http://localhost:3333/api>. Como una buena ventaja, Nx ha agregado una configuración de proxy para el servidor de desarrollo Angular, que enviará solicitudes de proxy a [](http://localhost:4200/api)<http://localhost:4200/api> al servidor de desarrollo de NestJS para nosotros, para que no nos encontremos con ningún problema de CORS durante el desarrollo. La configuración del proxy se puede encontrar en `apps/client/proxy.conf.json` y se hace referencia a ella dentro del archivo de definición del proyecto` angular.json`.

Si abre ahora su navegador en [](http://localhost:4200/)<http://localhost:4200>, debería ver una página similar a esta:

![localhost:4200](/uploads/localhost.webp 'App corriendo en localhost')

Si inspecciona la red y actualiza, verá una solicitud XHR a [](http://localhost:4200/api/hello)<http://localhost:4200/api/hello> mostrando que el proxy ha sido configurado correctamente.

## ¿Esperar, qué?

Déjame explicarte lo que está pasando:

El proyecto NestJS se configuró con un prefijo para usar con todos los controladores. Este prefijo se definió de la siguiente manera en (`apps/api/src/main.ts`)

```typescript
const globalPrefix = 'api'
app.setGlobalPrefix(globalPrefix)
```

Nx también generó un controlador REST de muestra, llamado AppController (`apps/api/src/app/app.controller.ts`) que actualmente sirve una parte estática de datos, en nuestro caso un objeto de la interfaz `Message` escrita en Typecript y definida así (`libs/api-interfaces/src/lib/api-interfaces.ts`):

```typescript
export interface Message {
  message: string
}
```

Debido a que la interfaz `Message` está definida en la biblioteca compartida, puede ser utilizada tanto por frontend como por backend. ¡Dulce seguridad de tipos en ambos proyectos!

El método AppController está anotado con

```typescript
 @Get('hello')
  getData(): Message {
    return this.appService.getData();
  }
```

que le dice a NestJS que exponga un nuevo GET-endpoint en [](http://localhost:3333/api/hello)<http://localhost:3333/api/hello> y devuelva nuestro objeto mensaje, cuando el servidor se está ejecutando.

En el otro extremo del stack tenemos el proyecto Angular, que se configuró para realizar una solicitud GET de muestra a este endpoint exacto. El código de muestra se puede encontrar en AppComponent de la interfaz en `apps/client/src/app/app.component.ts`

```typescript
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello')
  constructor(private http: HttpClient) {}
}
```

y se invoca usando la tubería asíncrona directamente en la plantilla:

```html
<div>Message: {{ hello$ | async | json }}</div>
```

Ahora, dado que el servidor de desarrollo Angular se está ejecutando en [](http://localhost:4200/)<http://localhost:4200>, la solicitud irá a [](http://localhost/4200/api/hello)<http://localhost/4200/api/hello> debido a la ruta relativa en la llamada `httpClient`. Esto es recogido por la configuración del proxy angular y se reenvía a nuestro servidor NestJS. Impresionante 🎉

# Ajustar la aplicación para el desarrollo

Felicitaciones, ahora tenemos un espacio de trabajo con NestJS y Angular ejecutándose uno al lado del otro, así como un código de muestra sobre cómo llamar al backend desde el frontend. ¡Eso ya está bastante bien!

Lo que me gusta hacer para mejorar la experiencia de desarrollo es iniciar el servidor de desarrollo de frontend y backend en paralelo, con un solo comando. Para esto instalaremos un asistente de nodejs llamado [concurrently](https://www.npmjs.com/package/concurrently).

```shell
npm install --save-dev concurrently
```

Una vez hecho esto, podemos adaptar el `package.json` de la siguiente manera:

```shell
"start:fe": "ng serve client",
"start:be": "ng serve api",
"dev": "concurrently -p=\"{name}\" -n=\"Angular,NestJS\" -c=\"green,blue\" \"npm run start:fe\" \"npm run start:be\"",
```

Ahora, al ejecutar `npm run dev` se iniciarán ambos servidores de desarrollo en paralelo, prefija cada línea de la Terminal con "Angular" o "NestJS" y colorea los prefijos en verde y azul. ¡Impresionante!

# Sirviendo frontend y backend desde un solo servidor para producción

Bien, ahora tenemos una aplicación de pila completa lista para el desarrollo. Finalicémoslo empaquetando nuestra aplicación como un único paquete npm ejecutable que servirá tanto a nuestro frontend como al backend.

Para lograr esto, crearemos una compilación de producción de nuestra aplicación Angular y configuraremos nuestro servidor NestJS para que sirva al frontend bajo su ruta raíz, de modo que podamos empaquetar ambos en un paquete autónomo (para implementarlo, por ejemplo, en CloudFoundry o en alguna otra nube proveedor).

Primero, crearemos una compilación de producción de la interfaz angular:

```shell
>  npm run nx -- build client --prod

> hn-feed@0.0.0 nx /Users/acosta/Projects/hn-feed
> nx "build" "client" "--prod"


> ng run client:build:production
Generating ES5 bundles for differential loading...
ES5 bundle generation complete.

// ... A few seconds later...

Date: 2020-06-17T16:14:41.427Z - Hash: 4957569a994e1b83d273 - Time: 34832ms
```

Ahora nuestra salida compilada (minificada, uglificada, rellenada) se puede encontrar en `dist/apps/client`

Configuremos NestJS para que sirva a esta carpeta cuando accedamos a su ruta raíz.

Primero, instalaremos el paquete NestJS `serve-static` para permitir el servicio de activos estáticos

```shell
npm install --save @nestjs/serve-static
```

Ahora todo lo que tenemos que hacer es importar y configurar el `ServeStaticModule` proporcionado por este paquete dentro del AppModule (`apps/api/src/app/app.module.ts`)

```typescript
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

// ...

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client')
    })
  ]
  // ...
})
export class AppModule {}
```

que le indica a NestJS que ingrese a `../client` desde su propia carpeta dist (`dist/apps/api`) y sirva el contenido en su ruta raíz.

Y efectivamente, ejecutar solo el backend a través de `npm run start: be` y navegar a [](http://localhost:3333/)<http://localhost:3333/> debería producir el mismo resultado que antes, cuando ejecutamos el servidor de desarrollo Angular:

# Empaquetando la aplicación para su implementación

Todo lo que queda ahora es empaquetar todo en un paquete `npm` y estaremos listos para implementar nuestra aplicación de pila completa. Hagámoslo ahora.

Necesitamos editar el `package.json` para incluir solo los archivos dist y, como conveniencia, agregaremos un script de inicio:

```json
{
    ...
    "files": ["dist/apps/client", "dist/apps/api"],
    ...
    scripts: {
    "serve": "node dist/apps/api/main.js",
    ...
    }
}
```

Ahora, si ejecutamos `npm pack`, se generará un archivo tarball en el directorio del proyecto:

```shell
npm pack
npm notice
npm notice 📦  hn-feed@0.0.0
npm notice === Tarball Contents ===
// ...
npm notice === Tarball Details ===
npm notice name:          hn-feed
npm notice version:       0.0.0
npm notice filename:      hn-feed-0.0.0.tgz
npm notice total files:   14
```

Ahora podemos cargar este paquete en nuestro proveedor de nube favorito, hacer que ejecute `npm install --production` después de la carga y proporcionar el script `serve` como un comando de inicio para el paquete (este paso varía según su proveedor de nube).

Por supuesto, también puede ejecutar este paquete localmente, simplemente descomprimiendo el archivo tarball, ejecutando `npm install --production` dentro del directorio, luego ejecutando `npm run serve`.

Espero que hayas encontrado útil esta publicación. ¡Avísame si te falta algún paso importante! Obviamente, hay mucho más que podemos hacer ahora que tenemos esta configuración, como la validación del tipo de tiempo de ejecución para nuestro frontend o backend, compartir la lógica entre el frontend y el backend mediante el uso de una biblioteca compartida en el mismo espacio de trabajo, etc. temas, con mucho gusto escribiré una publicación de seguimiento a este :)

¡Gracias por leer!
