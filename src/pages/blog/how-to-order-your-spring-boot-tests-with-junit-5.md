---
title: How to Order Your Spring Boot Tests with JUnit 5
description: Learn how to use JUnit 5's feature for ordering test classes to run
  Spring Boot automated tests from unit to integration tests, with the fastest
  tests running first. Configure JUnit with a ClassOrderer for a predetermined
  order.
date: 2023-01-25T21:56:01.410Z
lang: en
cover: /uploads/junit5-spring-boot.webp
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - junit5
  - spring boot
  - java
  - kotlin
categories:
  - Software Development
draft: false
---

![junit5 spring boot](/uploads/junit5-spring-boot.webp 'junit5 spring boot')

JUnit 5.9.2 allows for ordering test classes in an arbitrary manner. This blog article will show how to use this feature to order Spring Boot tests from unit tests to full integration tests, so that the faster tests run first.

As an example, let's take a basic Spring Boot application that uses Spring Data JPA and Spring Web MVC. We have four tests:

1. The first test is a regular, plain unit test without Spring involvement.

   ```java
   class UserTest {

       @Test
       void testUser() {
           User user = new User(1, "Wim");

           assertThat(user)
                   .isNotNull()
                   .satisfies(u -> {
                       assertThat(u.getId()).isEqualTo(1L);
                       assertThat(u.getName()).isEqualTo("Wim");
                   });
       }
   }
   ```

2. The second one uses `@DataJpaTest` to spin up an H2 database and the associated repositories:

   ```java
   @DataJpaTest
   class UserRepositoryTest {

       @Autowired
       private UserRepository repository;

       @Test
       void testSave() {
           User user = repository.save(new User(1, "Wim"));
           assertThat(user).isNotNull();
       }
   }
   ```

3. The third one uses `@WebMvcTest`, which utilizes MockMvc for testing controllers.

   ```java
   @WebMvcTest(UserController.class)
   class UserControllerTest {

       @Autowired
       private MockMvc mockMvc;
       @MockBean
       private UserRepository repository;

       @Test
       void test() throws Exception {
           Mockito.when(repository.findById(1L))
                  .thenReturn(Optional.of(new User(1L, "Wim")));

           mockMvc.perform(get("/users/{id}", 1L))
                  .andExpect(status().isOk());
       }
   }
   ```

4. The last one uses `@SpringBootTest` to start the full Spring context.

   ```java
   @SpringBootTest
   class Junit5TestOrderApplicationTests {

   	@Test
   	void contextLoads() {
   	}

   }
   ```

If we run the tests in the project using JUnit `5.7.0`, we cannot be certain of the order in which they will execute. This is unfortunate, as it is illogical to run integration tests before ensuring the unit tests are successful.

We can make this deterministic by using a major version of JUnit, such as `5.8.0` or the latest `5.9.2`.

With Spring Boot `2.7.8` or the most recent version `3.0.2`, we get JUnit `5.9.2` out of the box. To upgrade to the latest version, we can specify the following property in the pom.xml:

```xml
<project ...>
    ...
    <properties>
        <junit-jupiter.version>5.9.2
</junit-jupiter.version>
    </properties>
    ...
</project>
```

Now add a `junit-platform.properties` file in `src/test/resources` to configure JUnit.

In this file, we can specify what `ClassOrdener` instance should be used to determine the order of the test classes.

For example:

`junit.jupiter.testclass.order.default=org.junit.jupiter.api.ClassOrderer$Random`

We can use a ClassOrderer to ensure each run has a different order. The desired order is as follows:

```java
import org.junit.jupiter.api.ClassDescriptor;
import org.junit.jupiter.api.ClassOrderer;
import org.junit.jupiter.api.ClassOrdererContext;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Comparator;

public class SpringBootTestClassOrderer implements ClassOrderer {
    @Override
    public void orderClasses(ClassOrdererContext classOrdererContext) {
        classOrdererContext.getClassDescriptors().sort(Comparator.comparingInt(SpringBootTestClassOrderer::getOrder));
    }

    private static int getOrder(ClassDescriptor classDescriptor) {
        if (classDescriptor.findAnnotation(SpringBootTest.class).isPresent()) {
            return 4;
        } else if (classDescriptor.findAnnotation(WebMvcTest.class).isPresent()) {
            return 3;
        } else if (classDescriptor.findAnnotation(DataJpaTest.class).isPresent()) {
            return 2;
        } else {
            return 1;
        }
    }
}
```

Update `junit-platform.properties` to use this class:

`junit.jupiter.testclass.order.default=com.wimdeblauwe.examples.junit5testorder.SpringBootTestClassOrderer`

Run the full test suite to confirm that the order is correct.
