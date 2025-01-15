---
defaultLocaleVersion: en/o-the-open-closed-principle-extending-behaviors-without-modifying-code
title: '[O] The Open-Closed Principle'
description: This article explains the Open-Closed Principle (OCP) of SOLID
  design, which advises creating flexible and maintainable code by keeping
  classes open to extension but closed to modification. It uses an example to
  show how to adhere to the OCP by defining an interface and creating separate
  classes for each shape.
date: 2023-03-01T18:13:14.418Z
cover: /images/open-closed-principle.png
author: en/yuniel-acosta
tags:
  - en/kotlin
  - en/solid
categories:
  - en/software-development
draft: false
---

![[O] The Open-Closed Principle: Extending Behaviors Without Modifying Code](/images/open-closed-principle.png '[O] The Open-Closed Principle: Extending Behaviors Without Modifying Code')

The Open-Closed Principle (OCP) is a fundamental principle of the SOLID design principles. It promotes the idea that a class should be designed to be open for extension but closed for modification. This means that the behavior of a class should be easily extendable without changing the existing code. By adhering to this principle, developers can create code that is more flexible, maintainable, and easier to scale.

One of the common mistakes that violate the OCP is to have a class that hard-codes behaviors for different shapes. For instance, consider the following code:

```kotlin
class AreaCalculator {
    private val shapes = listOf("circle", "square", "triangle")
    fun calculateArea(shape: String): Double {
        return when (shape) {
            "circle" -> 3.14 * (5 * 5)
            "square" -> 5 * 5
            "triangle" -> 0.5 * (5 * 5)
            else -> 0.0
        }
    }
}
```

Here, the **`AreaCalculator`** class calculates the area of different shapes. If we want to add more shapes or change the calculation of area for any shape, we have to modify the **`AreaCalculator`** class, which violates the OCP principle.

To adhere to the OCP, a better practice is to define an interface **`Shape`** that defines a method to calculate the area, and create separate classes for each shape that implements the **`Shape`** interface. This way, the behavior of the class can be extended by creating new classes that implement the **`Shape`** interface, without modifying the existing code. Here's an example:

```kotlin
interface Shape {
    fun calculateArea(): Double
}

class Circle(private val radius: Double) : Shape {
    override fun calculateArea() = 3.14 * (radius * radius)
}

class Square(private val side: Double) : Shape {
    override fun calculateArea() = side * side
}

class Triangle(private val base: Double, private val height: Double) : Shape {
    override fun calculateArea() = 0.5 * (base * height)
}
```

With this approach, adding new shapes or modifying the calculation of an existing shape only requires creating a new class that implements the **`Shape`** interface. This adheres to the OCP principle, making the code more flexible, maintainable, and scalable.

In conclusion, the OCP principle helps developers to create software that can be easily extended without modifying the existing code. By using interfaces and inheritance, the behavior of a class can be extended without changing the existing code, making it more flexible and easier to maintain.
