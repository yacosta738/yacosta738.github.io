---
title: "[D] El Principio de Inversión de Dependencias"
description: Este artículo discute el Principio de Inversión de Dependencias
  (DIP), el quinto principio de los principios de diseño SOLID. DIP promueve un
  diseño en el que los módulos de alto nivel no están estrechamente acoplados a
  los módulos de bajo nivel, lo que hace que el código sea más flexible y fácil
  de mantener. El artículo proporciona un ejemplo de cómo implementar DIP en
  Kotlin para crear una base de código más adaptable y mantenible.
date: 2023-03-18T11:10:29.501Z
lang: es
cover: /uploads/dependency-inversion-principle.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - desarrollo de software
draft: false
---
![Principio de Inversión de Dependencias](/uploads/dependency-inversion-principle.png "Principio de Inversión de Dependencias")


El Principio de Inversión de Dependencias (DIP) es el quinto principio de los principios de diseño SOLID. Este principio establece que los módulos de alto nivel no deben depender de los módulos de bajo nivel, sino que ambos deben depender de abstracciones. Esto significa que una clase debe depender de abstracciones en lugar de implementaciones específicas. Este principio promueve un diseño en el que los módulos de alto nivel, como la lógica de negocios, no están fuertemente acoplados a los módulos de bajo nivel, como la capa de acceso a datos. Esto hace que el código sea más flexible y más fácil de mantener.

Un ejemplo de una mala práctica que viola el Principio de Inversión de Dependencias (DIP) es una clase que depende de una implementación específica de un módulo de bajo nivel.

```kotlin
class Order {
    private val database = MySQLDatabase()

    fun saveOrder() {
        database.save("orders", "order_data")
    }
}

```

En este ejemplo, la clase **`Order`** tiene una dependencia en una implementación específica de un módulo de bajo nivel, a saber, la clase **`MySQLDatabase`**. Esto viola el Principio de Inversión de Dependencia (DIP), porque la clase **`Order`** está fuertemente acoplada a una implementación específica de la clase **MySQLDatabase**. Si queremos cambiar la base de datos a PostgreSQL o cualquier otra base de datos, también tendríamos que modificar la clase **`Order`**.

Una práctica mejor sería crear una abstracción para el módulo de bajo nivel y hacer que el módulo de alto nivel dependa de la abstracción.

```kotlin
interface Database {
    fun save(table: String, data: String)
}

class MySQLDatabase: Database {
    override fun save(table: String, data: String) {
        println("Saving data to MySQL database")
    }
}

class PostgreSQLDatabase: Database {
    override fun save(table: String, data: String) {
        println("Saving data to PostgreSQL database")
    }
}

class Order {
    private lateinit var database: Database
    fun setDatabase(database: Database) {
        this.database = database
    }
    fun saveOrder() {
        database.save("orders", "order_data")
    }
}

```

La clase `Order` depende de la abstracción proporcionada por la interfaz `Database`, en lugar de una implementación específica de un módulo de bajo nivel. Este enfoque cumple con el Principio de Inversión de Dependencia (DIP), lo que hace que el código sea más flexible y mantenible. Con este diseño, es posible cambiar a una base de datos diferente creando una nueva implementación de la interfaz `Database` e inyectándola en la clase `Order`.

En conclusión, el Principio de Inversión de Dependencia (DIP) es un principio importante de los principios de diseño SOLID que promueve una base de código flexible y mantenible. Al depender de abstracciones en lugar de implementaciones específicas, los módulos de alto nivel pueden permanecer desacoplados de los módulos de bajo nivel, lo que facilita la modificación y extensión del sistema. Al seguir este principio, los desarrolladores pueden crear software más adaptable al cambio, más fácil de probar y mantener con el tiempo.
