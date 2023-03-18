---
title: "[D] The Dependency Inversion Principle"
description: This article discusses the Dependency Inversion Principle (DIP),
  the fifth principle of the SOLID design principles. DIP promotes a design
  where high-level modules are not tightly coupled to low-level modules, making
  the code more flexible and easier to maintain. The article provides an example
  of how to implement DIP in Kotlin to create a more adaptable and maintainable
  codebase.
date: 2023-03-18T11:07:18.301Z
lang: en
cover: /uploads/dependency-inversion-principle.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - Software Development
draft: false
---
![Dependency Inversion Principle](/uploads/dependency-inversion-principle.png "Dependency Inversion Principle")

The Dependency Inversion Principle (DIP) is the fifth principle of the SOLID design principles. It states that high-level modules should not depend on low-level modules, but both should depend on abstractions. This means that a class should depend on abstractions rather than on specific implementations. This principle promotes a design where high-level modules, such as the business logic, are not tightly coupled to low-level modules, such as the data access layer. This makes the code more flexible and easier to maintain.

An example of a bad practice that violates the Dependency Inversion Principle (DIP) is a class that depends on a specific implementation of a low-level module.

```kotlin
class Order {
    private val database = MySQLDatabase()

    fun saveOrder() {
        database.save("orders", "order_data")
    }
}

```

In this example, the **`Order`** class has a dependency on a specific implementation of a low-level module, namely the **`MySQLDatabase`** class. This violates the Dependency Inversion Principle (DIP), because the **`Order`** class is tightly coupled to a specific implementation of the **MySQLDatabase** class. If we want to change the database to PostgreSQL or any other database, we would need to modify the **`Order`** class as well.

A better practice would be to create an abstraction for the low-level module and have the high-level module depend on the abstraction.

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

The `Order` class depends on the abstraction provided by the `Database` interface, rather than a specific implementation of a low-level module. This approach adheres to the Dependency Inversion Principle (DIP), which makes the code more flexible and maintainable. With this design, it is possible to switch to a different database by creating a new implementation of the `Database` interface and injecting it into the `Order` class.

In conclusion, the Dependency Inversion Principle (DIP) is an important principle of the SOLID design principles that promotes a flexible and maintainable codebase. By depending on abstractions rather than specific implementations, high-level modules can remain decoupled from low-level modules, which makes it easier to modify and extend the system. By following this principle, developers can create software that is more adaptable to change and easier to test and maintain over time.
