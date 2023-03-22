---
title: "[S] The Single Responsibility Principle"
description: The Single Responsibility Principle (SRP) is a design principle
  promoting maintainable code. It states that each class should have only one
  job. This post explains its importance with code examples, resulting in more
  understandable and maintainable code.
date: 2023-03-01T17:33:58.405Z
lang: en
cover: /uploads/single-responsibility-principle.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - Software Development
draft: false
---

![[S] The Single Responsibility Principle](/uploads/single-responsibility-principle.png '[S] The Single Responsibility Principle')

The Single Responsibility Principle (SRP) is one of the SOLID design principles, and it states that a class should have only one reason to change. In other words, a class should have only one responsibility or job to do. This helps to keep the code modular, easy to understand, and maintainable.

A class with multiple responsibilities is often referred to as a "God class" or a "Blob class" and can lead to problems such as code bloat, tight coupling, and difficulty in testing and maintaining.

For example, consider the following code that violates the SRP:

```kotlin
class Calculator {
    fun calculateSum(a: Int, b: Int): Int {
        return a + b
    }
    fun printSum(a: Int, b: Int) {
        val sum = calculateSum(a, b)
        println("The sum is: $sum")
    }
}
```

In this code, the **Calculator** class is responsible for calculating the sum and printing the result. As a result, any changes to the way the sum is calculated or printed would require modifications to this class, violating the SRP.

To adhere to the SRP, it is better to separate the responsibilities of the class into two different classes, one for calculation and one for printing:

```kotlin
class Calculator {
    fun calculateSum(a: Int, b: Int): Int {
        return a + b
    }
}

class Printer {
    fun printSum(sum: Int) {
        println("The sum is: $sum")
    }
}
```

In this code, the **Calculator** class is responsible only for the calculation of the sum, and the **Printer** class is responsible only for printing the results. This makes the code more modular and easier to maintain, adhering to the SRP.

In conclusion, following the SRP principle helps create a more maintainable and understandable code by ensuring that each class has only one responsibility or job.
