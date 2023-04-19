---
title: ¡Potencia tus pruebas en Java con estas 7 increíbles bibliotecas!
description: 'Descubre 7 bibliotecas de Java para mejorar las pruebas de unidad
  e integración: AssertJ, Awaitility, Mockito, Wiser, Memoryfilesystem, WireMock
  y Testcontainers. Simplifica el desarrollo, reduce el tiempo de pruebas y
  asegura la calidad del código.'
date: 2023-02-15T13:46:25.916Z
lang: es
cover: /uploads/boost-your-java-testing-with-these-7-incredible-libraries.gif
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - java
  - kotlin
  - testing
categories:
  - Software Development
draft: false
---

![¡Potencia tus pruebas en Java con estas 7 increíbles bibliotecas!](/uploads/boost-your-java-testing-with-these-7-incredible-libraries.gif '¡Potencia tus pruebas en Java con estas 7 increíbles bibliotecas!')

Si estás buscando mejorar tus pruebas unitarias e integración en Java, ¡tengo buenas noticias para ti! Esta es una excelente oportunidad para aumentar la velocidad y la calidad de tus pruebas. En este artículo le proporcionaré una visión general de 7 bibliotecas útiles que puede usar para mejorar su proceso de pruebas. Estas bibliotecas le ayudarán a simplificar el proceso de desarrollo, reducir el tiempo de prueba y garantizar que su código sea de alta calidad. Algunas de estas bibliotecas le permiten vincular sus pruebas para facilitar la identificación de puntos débiles en su código, otras le permiten escribir pruebas unitarias con menos líneas de código y algunas incluso le permiten realizar pruebas de integración de manera eficiente. En última instancia, estas bibliotecas le permitirán aprovechar al máximo el tiempo que dedica a escribir pruebas y optimizar su código para que sea más robusto. Si estás listo para mejorar tus pruebas unitarias e integración en Java, ¡sigue leyendo!

Hablaremos de las siguientes bibliotecas:

- AssertJ
- Awaitility
- Mockito
- Wiser
- Memoryfilesystem
- WireMock
- Testcontainers

Examinemos cada uno con más detalle.

### AssertJ

JUnit proporciona sus propias aserciones (por ejemplo, `assertEquals`) que son adecuadas para casos de uso simples, pero pueden ser engorrosas de usar en escenarios más realistas. AssertJ es una pequeña biblioteca que proporciona un conjunto de aserciones fluidas que se pueden usar como reemplazo de las aserciones predeterminadas. ¡Funciona no solo con clases básicas de Java, sino también con archivos XML, JSON y tablas de base de datos!

```java
// basic assertions
assertThat(frodo.getName()).isEqualTo("Frodo");
assertThat(frodo).isNotEqualTo(sauron);

// chaining string specific assertions
assertThat(frodo.getName()).startsWith("Fro")
                           .endsWith("do")
                           .isEqualToIgnoringCase("frodo");
```

### Awaitility

Probar flujos de trabajo asíncronos puede ser difícil. Cuando necesitas verificar que un mensaje ha sido enviado o recibido por un broker de mensajes en particular, es posible que te encuentres con problemas de condiciones de carrera debido a que el código de prueba local se ejecuta más rápido que el código asíncrono. Afortunadamente, ¡Awaitility está aquí para ayudarte! Es una pequeña biblioteca que te permite escribir afirmaciones de sondeo de manera síncrona

```java
@Test
public void updatesCustomerStatus() {
    // Publish an asynchronous message to a broker (e.g. RabbitMQ):
    messageBroker.publishMessage(updateCustomerStatusMessage);

    // Awaitility lets you wait until the asynchronous operation completes:
    await().atMost(5, SECONDS).until(customerStatusIsUpdated());
    ...
}
```

### Mockito

Es importante utilizar mocks durante las pruebas unitarias para reemplazar ciertas funcionalidades. Mockito es una biblioteca confiable para este propósito. Te permite crear mocks, configurarlos y escribir afirmaciones en su contra. Además, Mockito se integra bien con muchas bibliotecas de terceros, como JUnit y Spring Boot.

```java
// mock creation
List mockedList = mock(List.class);
// or even simpler with Mockito 4.10.0+
// List mockedList = mock();

// using mock object - it does not throw any "unexpected interaction" exception
mockedList.add("one");
mockedList.clear();

// selective, explicit, highly readable verification
verify(mockedList).add("one");
verify(mockedList).clear();
```

### \***\*Wiser\*\***

Mantener tu código cerca de producción y no depender únicamente de mocks es una estrategia viable. Por ejemplo, cuando se envían correos electrónicos, no es necesario crear mocks de todo el código de correo electrónico o enviarlos realmente a través de Gmail o Amazon SES. En su lugar, puedes utilizar un pequeño servidor SMTP embebido en Java llamado Wiser.

```java
Wiser wiser = new Wiser();
wiser.setPort(2500); // Default is 25
wiser.start();
```

Ahora puedes utilizar la API SMTP de Java para enviar correos electrónicos a Wiser y solicitar ver los mensajes que ha recibido. Esto elimina la necesidad de comprobaciones manuales.

```java
for (WiserMessage message : wiser.getMessages())
{
	String envelopeSender = message.getEnvelopeSender();
	String envelopeReceiver = message.getEnvelopeReceiver();

	MimeMessage mess = message.getMimeMessage();

	// now do something fun!
}
```

### Memoryfilesystem

Escribir un sistema que depende en gran medida de archivos puede ser difícil de probar. El acceso al sistema de archivos a menudo es lento y frágil, especialmente cuando los desarrolladores trabajan en diferentes sistemas operativos. Memoryfilesystem proporciona una solución: te permite escribir pruebas contra un sistema de archivos que existe completamente en memoria, al tiempo que simula comportamientos específicos del sistema operativo desde Windows hasta macOS y Linux.

```java
try (FileSystem fileSystem = MemoryFileSystemBuilder.newEmpty().build()) {
  Path p = fileSystem.getPath("p");
  System.out.println(Files.exists(p));
}
```

### WireMock

Manejar servicios REST de terceros o APIs que presentan inestabilidad en tus pruebas es fácil con WireMock. Proporciona un DSL simple para crear mocks completos de cualquier API de terceros. Puedes especificar las respuestas que devolverá tu API simulada e incluso inyectar retrasos aleatorios y otros comportamientos no especificados en tu servidor. Esto es útil para la ingeniería de monkey chaos.

```java
// The static DSL will be automatically configured for you
stubFor(get("/static-dsl").willReturn(ok()));

// Instance DSL can be obtained from the runtime info parameter
WireMock wireMock = wmRuntimeInfo.getWireMock();
wireMock.register(get("/instance-dsl").willReturn(ok()));

// Info such as port numbers is also available
int port = wmRuntimeInfo.getHttpPort();
```

### Testcontainers

Usar mocks o reemplazos embebidos para bases de datos, servidores de correo y colas de mensajes es conveniente, pero nada supera el uso del producto real. Aquí es donde entra Testcontainers: una pequeña biblioteca que te permite iniciar y detener cualquier contenedor Docker (y, por lo tanto, cualquier software) que necesites para tus pruebas. Esto garantiza que tu entorno de pruebas sea lo más cercano posible a tu entorno de producción.

```java
@Testcontainers
class MixedLifecycleTests {

    // will be shared between test methods
    @Container
    private static final MySQLContainer MY_SQL_CONTAINER = new MySQLContainer();

    // will be started before and stopped after each test method
    @Container
    private PostgreSQLContainer postgresqlContainer = new PostgreSQLContainer()
        .withDatabaseName("foo")
        .withUsername("foo")
        .withPassword("secret");
```

El uso de estas bibliotecas puede mejorar significativamente tu proceso de prueba y asegurar que tu código funcione como se espera. ¡Disfruta utilizando estas bibliotecas y feliz prueba!
