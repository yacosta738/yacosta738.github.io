---
title: Boost Your Java Testing with These 7 Incredible Libraries
description: 'Discover 7 Java libraries for better unit and integration testing:
  AssertJ, Awaitility, Mockito, Wiser, Memoryfilesystem, WireMock, and
  Testcontainers. Simplify development, reduce testing time, and ensure code
  quality.'
date: 2023-02-15T13:40:04.973Z
cover: /images/boost-your-java-testing-with-these-7-incredible-libraries.gif
author: en/yuniel-acosta
tags:
  - java
  - kotlin
  - testing
categories:
  - Software Development
draft: false
---

![Boost Your Java Testing with These 7 Incredible Libraries](/images/boost-your-java-testing-with-these-7-incredible-libraries.gif 'Boost Your Java Testing with These 7 Incredible Libraries')

If you're looking to improve your unit and integration testing in Java, I have good news for you! This is an excellent opportunity to increase the speed and quality of your tests. In this article I will provide you with an overview of 7 useful libraries that you can use to improve your testing process. These libraries will help you to simplify the development process, reduce testing time and ensure that your code is of high quality. Some of these libraries allow you to link your tests to make it easier to identify weak points in your code, others allow you to write unit tests with fewer lines of code and some even allow you to perform integration tests efficiently. Ultimately, these libraries will allow you to make the most of the time you spend writing tests and optimize your code to make it more robust. If you're ready to improve your unit and integration testing in Java, keep reading!

We will talk about the following libraries:

- AssertJ
- Awaitility
- Mockito
- Wiser
- Memoryfilesystem
- WireMock
- Testcontainers

Let's examine each one in more detail.

### AssertJ

JUnit provides its own assertions (e.g. `assertEquals`) which are suitable for simple use cases, but can be cumbersome to use in more realistic scenarios. AssertJ is a small library that provides a set of fluent assertions which can be used as a replacement for the default assertions. It works not only with core Java classes, but also with XML, JSON files, and database tables!

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

Testing asynchronous workflows can be difficult. When you need to verify that a message broker has sent or received a particular message, you may encounter race condition issues due to the fact that local test code runs faster than asynchronous code. Fortunately, Awaitility is here to help. It is a small library that allows you to write polling assertions in a synchronous manner!

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

It's important to use mocks during unit testing to replace certain functionalities. Mockito is a reliable library for this purpose. It allows you to create mocks, configure them, and write assertions against them. Additionally, Mockito integrates well with many third-party libraries, such as JUnit and Spring Boot.

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

Keeping your code close to production and not relying solely on mocks is a viable strategy. For example, when sending emails, you don't have to mock out the entire email code or actually send them via Gmail or Amazon SES. Instead, you can use a small, embedded Java SMTP server called Wiser.

```java
Wiser wiser = new Wiser();
wiser.setPort(2500); // Default is 25
wiser.start();
```

Now you can use Java's SMTP API to send emails to Wiser and request to view the messages it has received. This eliminates the need for manual checking.

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

Writing a system that heavily relies on files can be tricky to test. File system access is often slow and fragile, especially when developers work on different operating systems. Memoryfilesystem provides a solution: it allows you to write tests against a file system that exists entirely in memory, while still simulating OS-specific behaviors from Windows to macOS and Linux.

```java
try (FileSystem fileSystem = MemoryFileSystemBuilder.newEmpty().build()) {
  Path p = fileSystem.getPath("p");
  System.out.println(Files.exists(p));
}
```

### WireMock

Handling flaky 3rd-party REST services or APIs in your tests is easy with WireMock. It provides a simple DSL to create full-blown mocks of any 3rd-party API. You can specify the responses your mocked API will return, and even inject random delays and other unspecified behavior into your server. This is useful for chaos monkey engineering.

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

Using mocks or embedded replacements for databases, mail servers, and message queues is convenient, but nothing beats using the real thing. Enter Testcontainers: a small library that enables you to start and stop any Docker container (and thus, any software) that you need for your tests. This ensures that your test environment is as close as possible to your production environment.

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

The use of these libraries can significantly improve your testing process and ensure that your code works as expected. Enjoy using these libraries and happy testing!
