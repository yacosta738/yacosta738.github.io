---
title: "[I] The Interface Segregation Principle"
description: This article explains the Interface Segregation Principle (ISP), a
  SOLID design principle. ISP says that a class should only implement the
  methods it needs. The article gives an example of a bad practice that violates
  ISP and a better practice that follows it by creating small, specific
  interfaces for each class.
date: 2023-03-17T10:46:22.279Z
lang: en
cover: /uploads/interface-segregation-principle.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - Software Development
draft: true
---
![Interface Segregation Principle](/uploads/interface-segregation-principle.png "Interface Segregation Principle")

ISP (Interface Segregation Principle) is the fourth principle of the SOLID design principles. It states that a class should not be forced to implement interfaces it does not use, meaning that a class should not be forced to implement methods it does not need. This principle encourages creating small, specific interfaces that are tailored to the needs of specific classes, rather than creating large, general interfaces that require classes to implement many methods they do not need.

An example of a bad practice that violates the Interface Segregation Principle (ISP) is a class that implements a large, general interface with many methods that the class does not need.

```kotlin
interface Shape {
    fun calculateArea(): Double
    fun calculatePerimeter(): Double
    fun draw(): Unit
    fun resize(): Unit
}

class Circle : Shape {
    var radius: Double = 0.0
    override fun calculateArea() = 3.14 * (radius * radius)
    override fun calculatePerimeter() = 2 * 3.14 * radius
    override fun draw() = println("Drawing circle")
    // resize is not needed for Circle class
    override fun resize() {}
}
```

In this example, the **`Circle`** class is required to implement the **resize()** method, even though it does not need it. This violates the ISP principle because the class is being forced to implement methods that it does not require.

A better practice is to create small, specific interfaces that are tailored to the needs of specific classes. This is preferable to creating large, general interfaces that require classes to implement many methods they do not need.

```kotlin
interface CalculableArea {
    fun calculateArea(): Double
}

interface CalculablePerimeter {
    fun calculatePerimeter(): Double
}

interface Drawable {
    fun draw(): Unit
}

class Circle : CalculableArea, CalculablePerimeter, Drawable {
    var radius: Double = 0.0
    override fun calculateArea() = 3.14 * (radius * radius)
    override fun calculatePerimeter() = 2 * 3.14 * radius
    override fun draw() = println("Drawing circle")
}
```

The `Circle` class shown in the example above implements only the necessary interfaces, thereby adhering to the ISP principle. This makes the code more maintainable and flexible.

In conclusion, the Interface Segregation Principle (ISP) is an important SOLID design principle that encourages creating small, specific interfaces that are tailored to the needs of specific classes. By adhering to the ISP principle, code becomes more maintainable and flexible. When designing software, it is important to keep the ISP principle in mind and to create interfaces that are only as big as they need to be.
