---
title: '[I] Principio de Segregación de Interfaces'
description: Este artículo explica el Principio de Segregación de Interfaces
  (ISP), un principio de diseño SOLID. ISP establece que una clase solo debe
  implementar los métodos que necesita. El artículo da un ejemplo de una mala
  práctica que viola ISP y una mejor práctica que lo sigue creando interfaces
  pequeñas y específicas para cada clase.
date: 2023-03-17T10:52:46.179Z
lang: es
cover: /uploads/interface-segregation-principle.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - Software Development
draft: false
---

![Principio de Segregación de Interfaces](/uploads/interface-segregation-principle.png 'Principio de Segregación de Interfaces')

ISP (Principio de Segregación de Interfaces) es el cuarto principio de los principios de diseño SOLID. Este principio establece que una clase no debería ser forzada a implementar interfaces que no usa, lo que significa que una clase no debería ser forzada a implementar métodos que no necesita. Este principio fomenta la creación de interfaces pequeñas y específicas que se adapten a las necesidades de clases específicas, en lugar de crear interfaces grandes y generales que requieran que las clases implementen muchos métodos que no necesitan.

Un ejemplo de una mala práctica que viola el Principio de Segregación de Interfaces (ISP) es una clase que implementa una interfaz grande y general con muchos métodos que la clase no necesita.

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

En este ejemplo, se requiere que la clase **`Circle`** implemente el método **resize()**, aunque no lo necesite. Esto viola el principio ISP porque obliga a la clase a implementar métodos que no necesita.

Una práctica mejor es crear interfaces pequeñas y específicas que estén adaptadas a las necesidades de clases específicas. Esto es preferible a crear interfaces grandes y generales que requieren que las clases implementen muchos métodos que no necesitan.

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

La clase `Circle` mostrada en el ejemplo anterior implementa solo las interfaces necesarias, cumpliendo así con el principio ISP. Esto hace que el código sea más mantenible y flexible.

En conclusión, el Principio de Segregación de Interfaces (ISP) es un importante principio de diseño SOLID que anima a crear interfaces pequeñas y específicas que se adapten a las necesidades de clases específicas. Al adherirse al principio ISP, el código se vuelve más mantenible y flexible. Al diseñar software, es importante tener en cuenta el principio ISP y crear interfaces que sean solo tan grandes como sea necesario.
