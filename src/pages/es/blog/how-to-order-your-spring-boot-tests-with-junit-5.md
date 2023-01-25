---
title: Cómo ordenar sus pruebas de Spring Boot con JUnit 5
description: Esta publicación muestra cómo usar la característica de JUnit 5
  para ordenar las clases de pruebas. Esto permite ejecutar pruebas automáticas
  de Spring Boot desde pruebas unitarias hasta pruebas de integración completas,
  con las pruebas más rápidas ejecutándose primero. Explicamos cómo configurar
  JUnit con un ClassOrderer para garantizar que cada ejecución tenga un orden
  predeterminado.
date: 2023-01-25T22:16:55.497Z
lang: es
cover: /uploads/junit5-spring-boot.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - junit5
  - spring boot
  - java
  - kotlin
categories:
  - development
draft: true
---

![junit5 spring boot](/uploads/junit5-spring-boot.webp 'junit5 spring boot')

JUnit 5.9.2 admite ordenar las clases de prueba de una manera arbitraria. En este artículo de blog se mostrará cómo usar esta característica para ordenar las pruebas de Spring Boot desde pruebas unitarias hasta pruebas de integración completas, para que las pruebas más rápidas se ejecuten primero.

Como ejemplo, tomemos una aplicación básica de Spring Boot que usa Spring Data JPA y Spring Web MVC. Tenemos cuatro pruebas:

1. El primer test es una prueba unitaria regular y sin la participación de Spring.

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

2. El segundo usa `@DataJpaTest` para iniciar una base de datos H2 y los repositorios asociados:

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

3. El tercero usa `@WebMvcTest`, que utiliza MockMvc para probar los controladores.

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

4. El último usa `@SpringBootTes`t para iniciar el contexto completo de Spring.

   ```java
   @SpringBootTest
   class Junit5TestOrderApplicationTests {

   	@Test
   	void contextLoads() {
   	}

   }
   ```

Si ejecutamos las pruebas en el proyecto usando JUnit 5.7.0, no podemos estar seguros del orden en el que se ejecutarán. Esto es desafortunado, ya que es ilógico ejecutar pruebas de integración antes de asegurarse de que las pruebas unitarias sean exitosas.

Podemos hacer esto determinista usando una versión mayor de JUnit, como `5.8.0` o la última `5.9.2`.

Con Spring Boot `2.7.8` o la versión más reciente `3.0.2`, obtenemos JUnit `5.9.2` de forma predeterminada. Para actualizar a la última versión, podemos especificar la siguiente propiedad en el `pom.xml`:

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

Ahora agregue un archivo `junit-platform.properties` en `src/test/resources` para configurar JUnit.

En este archivo, podemos especificar qué instancia de `ClassOrdener` debe usarse para determinar el orden de las clases de prueba.

Por ejemplo:

`junit.jupiter.testclass.order.default=org.junit.jupiter.api.ClassOrderer$Random`

Podemos usar un ClassOrderer para asegurar que cada ejecución tenga un orden diferente. El orden deseado es el siguiente:

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

Actualice` junit-platform.properties` para usar esta clase:

`junit.jupiter.testclass.order.default=com.wimdeblauwe.examples.junit5testorder.SpringBootTestClassOrderer`

Ejecutar la suite de pruebas completa para confirmar que el orden es correcto.
