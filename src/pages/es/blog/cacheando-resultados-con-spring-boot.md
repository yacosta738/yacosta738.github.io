---
title: Cacheando resultados con Spring Boot
description: Implementar una Cache con Spring es una tarea bastante fácil,
  debido a la facilidad de implementación. Para ello Spring nos aporta una serie
  de anotaciones que podremos ver en el resto del tutorial.
date: 2022-10-21T23:18:16.315Z
lang: es
cover: public/uploads/cache.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Spring
  - Spring Boot
  - Java
  - Kotlin
  - Cache
categories:
  - development
  - backend
draft: true
---
Vamos a imaginar una aplicación web, donde por cada petición recibida, debe leer ciertos datos de configuración desde una base de datos. Esos datos no cambiarán normalmente pero nuestra aplicación, en cada petición, debe conectarse, ejecutar las sentencias adecuadas para leer los datos, traerlos por la red, etc. Imaginemos, además, que la base de datos a la que nos conectamos está saturada o la conexión de red que nos une a la base de datos es inestable. ¿Qué pasaría?. Pues que tendríamos una aplicación lenta por el hecho de leer continuamente unos datos que sabemos que apenas cambian.

Para solucionar ese problema podríamos utilizar una **[Caché](https://es.wikipedia.org/wiki/Cach%C3%A9_(inform%C3%A1tica))**, pero ¿cómo implementarlo?. En este artículo explicaré como usar una caché básica en **[Spring Boot](https://spring.io/projects/spring-boot)**.

#### Un poco de teoría

La caché se aplica sobre funciones, donde para un mismo valor de entrada esperamos un mismo valor de salida. Es por ello que siempre debemos tener al menos un parámetro de entrada y una salida.

Un ejemplo típico sería este:

```java
@Cacheable(cacheNames="headers")
 public int funcionCacheada(int valor)
 {
  ... calculos muy complejos y costosos ....
  return N;
 }
```

Y ahora supongamos que tenemos el siguiente código donde llamamos a esa función:

```java
int valor=funcionCacheada(1);
int otroValor=funcionCacheada(2);
int tercerValor=funcionCacheada(1);
```

Al ejecutar el programa, en la primera línea, **Spring**, ejecutará la función y guardará el resultado que devuelve. En la segunda línea, como no sabe el valor que se debe devolver para la entrada con valor “2” hará lo mismo. Sin embargo en la tercera línea **Spring** detectara que una función marcada con **[@Cacheable](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/annotation/Cacheable.html)** con el nombre de cache “**headers**” ya ha sido llamada con el valor “**1**” y no ejecutará la función, simplemente devolverá el valor que en la primera llamada guardo.

El nombre de la caché es importante pues, entre otras cosas, nos permite tener diferentes caches independientes, las cuales podremos, entre otras cosas limpiar, para obligar a **Spring Boot** a ejecutar de nuevo las funciones.

Así, la idea básicamente es que en cada llamada a una función marcada como **@Cacheable** se guarda en una tabla interna los resultados para cada llamada, de tal manera que si ya tiene la salida para una entrada, no llama a la función.

#### Práctica

Y ahora, vamos a la práctica:

El proyecto de ejemplo sobre el que está basado este artículo esta en: <https://github.com/yacosta738/>

Lo primero que se necesita es incluir la siguiente dependencia en nuestro proyecto:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

Ahora ya podremos utilizar las etiquetas que nos permitirán usar Caché en nuestra aplicación.

La primera etiqueta a poner es **@EnableCaching**. Con esta etiqueta le indicamos a Spring que prepare el soporte para usar caché. Si no se la ponemos simplemente no la usará, independientemente de si indicamos posteriormente que cachee los resultados de unas funciones.

```java
@SpringBootApplication
@EnableCaching
public class CacheExampleApplication {
	public static void main(String[] args) {
		SpringApplication.run(CacheExampleApplication.class, args);
	}
}
```

En este ejemplo se leerán unos datos de una base de datos a través de unas peticiones REST.

Los datos como tal se leen en la clase `CacheDataImpl.java` que esta en el paquete `com.profesorp.cacheexample.impl`

La función que lee los datos es la siguiente:

```java
@Cacheable(cacheNames="headers", condition="#id > 1")
 public DtoResponse getDataCache(int id) {	
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
		}		
		DtoResponse requestResponse=new DtoResponse();		
		Optional<Invoiceheader> invoice=invoiceHeaderRepository.findById(id);
		..... MAS CODIGO NO IMPORTANTE ...
	}
```

Como se puede ver tenemos la etiqueta **@Cacheable(cacheNames=”headers”, condition=”#id > 1″)**

Con ella, le estamos indicando a Spring dos cosas.

* Deseamos que cachee el resultado de esta función.
* Le ponemos como condición, que solo cachee los resultados si el valor de entrada es superior a 1.

Más adelante, en la función flushCache, le ponemos la etiqueta **@CacheEvict** la cual limpia la caché indicada. En este caso, además, le indicamos que borre todas las entradas que tengan cacheadas.

```java
@CacheEvict(cacheNames="headers", allEntries=true)
public void flushCache() {  }
```

En la función `update` actualizamos la base de datos y con la etiqueta **@CachePut** le indicamos a Spring que actualice los datos para el valor que hay en **dtoRequest.id**

```java
@CachePut(cacheNames="headers", key="#dtoRequest.id")
public  DtoResponse update(DtoRequest dtoRequest)
{
.... ACTUALIZADA LA BASE DE DATOS ...
}
```

Por supuesto esta función tiene que devolver un objeto del mismo tipo que el de la marcada con la etiqueta **@Cacheable** y debemos indicarle el valor de entrada, para el que se desea actualizar los datos.

#### Funcionando

Para entender mejor la aplicación vamos a arrancarla y realizarle algunas peticiones.

La aplicación al arrancar guarda en la tabla `invoiceHeader` las cabeceras de 4 facturas (podéis ver como lo hace en el fichero `data.sql`).

Vamos a ejecutar la función `get` de la clase `PrincipalController`, para ello escribimos:

```shell
curl -s http://localhost:8080/2
```

Nos devolverá lo siguiente:

```json
{
   "interval":507,
   "httpStatus":"OK",
   "invoiceHeader":{
      "id":2,
      "activo":"N",
      "yearFiscal":2019,
      "numberInvoice":2,
      "customerId":2
   }
}
```

El campo `interval` el tiempo en milisegundos que le ha costado realizar la consulta. Como se puede ver le ha costado más de medio segundo, pues en la función `getDataCache` de C`acheDataImpl.java` tenemos un sleep de **500** milisegundos.

Ahora ejecutamos de nuevo la llamada:

```shell
curl -s http://localhost:8080/2
{"interval":1,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

Ahora el tiempo que ha tomado la llamada es *1* , porque realmente **Spring** **NO** ha ejecutado el código de la función y simplemente ha devuelto el valor que tenía cacheado.

Sin embargo si solicitamos el **id** 1 como hemos indicado que no lo cachee siempre ejecutará la función y por lo tanto tendremos un tiempo superior a 500 milisegundos:

```shell
 curl -s http://localhost:8080/1
{"interval":503,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

curl -s http://localhost:8080/1
{"interval":502,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

curl -s http://localhost:8080/1
{"interval":503,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

```

Si llamamos a la función `flushcache` limpiaremos la cache y por lo tanto la próxima llamada a la función cacheada deberá ejecutar la función:

```shell
curl -s http://localhost:8080/flushcache
Cache Flushed!

curl -s http://localhost:8080/2
{"interval":508,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

curl -s http://localhost:8080/2
{"interval":0,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

Por último veremos cómo si cambiamos el valor del campo **activo** a **N** , como la función que realiza el cambio está marcada con `@CacheEvict` nos actualizará el valor de la caché, pero en la próxima llamada a la función `getDataCache` se seguirá sin ejecutar el código, devolviendo, sin embargo, el objeto actualizado.

```shell
curl -X PUT   http://localhost:8080/   -H "Content-Type: application/json"   -d "{\"id\": 2, \"active\": \"N\"}"

curl -s http://localhost:8080/2
{"interval":0,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

### Conclusiones

**Spring Boot**, sin ninguna dificultad, nos permite cachear los resultados de las funciones, sin embargo hay que tener en cuenta que esa caché es muy básica y la realiza en memoria. Sin embargo **Spring Boot** permite usar librerías externas que nos permitirán cachear en disco, en bases de datos, etc.

En [](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-caching.html)[boot-features-caching](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/boot-features-caching.html) tienes las diferentes implementaciones de Cache que Spring Boot soporta, entre las que esta [EhCache](https://www.ehcache.org/) , con la cual puedes definir diferentes tipos de backend para los datos, así como especificar tiempos de validez para los datos y muchas más opciones.