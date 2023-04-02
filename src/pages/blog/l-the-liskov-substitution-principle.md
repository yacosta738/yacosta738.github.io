---
title: '[L] The Liskov Substitution Principle'
description: The Liskov substitution principle ensures that subclass objects can
  be used interchangeably with those of the superclass, preventing unexpected
  program errors. Adhering to this rule simplifies code management and increases
  predictability.
date: 2023-03-08T20:53:25.904Z
lang: en
cover: /uploads/liskov-substitution-principle.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - Kotlin
categories:
  - Software Development
draft: false
---

![[L] The Liskov Substitution Principle](/uploads/liskov-substitution-principle.png '[L] The Liskov Substitution Principle')

The Liskov substitution principle (LSP) is the third principle of the SOLID design principles. It states that subtypes should be substitutable for their base types. Specifically, objects of a superclass should be able to be replaced with objects of a subclass without altering the correctness of the program. This principle helps to ensure that objects of a subclass can be used interchangeably with objects of the superclass, without introducing any unexpected behavior.

An example of a bad practice that violates the Liskov Substitution Principle (LSP) is a class hierarchy where a subclass overrides a method in a way that changes the method's contract.

```kotlin
open class Rectangle {
    open var width: Int = 0
    open var height: Int = 0
    open fun area(): Int {
        return width * height
    }
}

class Square : Rectangle() {
    override var width: Int
        get() = super.width
        set(value) {
            super.width = value
            super.height = value
        }
    override var height: Int
        get() = super.height
        set(value) {
            super.width = value
            super.height = value
        }
}

```

In this example, the **Square** class is a subclass of the **Rectangle** class. However, the **Square** class overrides the **width** and **height** properties in a way that changes the class's contract. Specifically, the **Square** class sets both the **width** and **height** properties to the same value, ensuring that a square is always a square. Nevertheless, this is not an actual square, since a square is a rectangle with equal width and height values. As a result, replacing an object of the Rectangle class with an object of the Square class may result in unexpected program behavior.

A better practice would be to create a new class **Square** that has its own properties and methods, while also extending the **Rectangle** class.

```kotlin
open class Rectangle {
    open var width: Int = 0
    open var height: Int = 0
    open fun area(): Int {
        return width * height
    }
}

class Square : Rectangle() {
    var side: Int = 0
    override var width: Int
        get() = side
        set(value) {
            side = value
        }
    override var height: Int
        get() = side
        set(value) {
            side = value
        }
    override fun area(): Int {
        return side * side
    }
}

```

In conclusion, the **Square** class has its own properties and methods, making it interchangeable with the **Rectangle** class without introducing unexpected behavior. This adherence to the Liskov Substitution Principle results in code that is more maintainable and predictable.
