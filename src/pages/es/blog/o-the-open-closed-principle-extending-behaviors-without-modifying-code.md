---
title: "[O] El Principio Abierto-Cerrado (OCP)"
description: El artículo explica el principio de diseño Open-Closed (OCP) en el
  contexto de los principios SOLID. Este principio establece que una clase debe
  estar abierta para la extensión pero cerrada para la modificación, lo que
  significa que el comportamiento de una clase puede ser extendido sin modificar
  la clase en sí. El artículo ilustra un ejemplo de código que viola este
  principio y muestra una solución que lo cumple. La implementación correcta del
  OCP hace que el código sea más flexible y fácil de mantener.
date: 2023-03-01T18:18:15.659Z
lang: es
cover: /uploads/open-closed-principle.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - kotlin
  - solid
categories:
  - desarrollo de software
draft: false
---
![[O] El Principio Abierto-Cerrado (OCP): Extender Comportamientos sin Modificar el Código.](/uploads/open-closed-principle.png "[O] El Principio Abierto-Cerrado (OCP): Extender Comportamientos sin Modificar el Código.")

El Principio Abierto-Cerrado (OCP) es un principio fundamental de los principios de diseño SOLID. Promueve la idea de que una clase debe ser diseñada para ser abierta a la extensión pero cerrada a la modificación. Esto significa que el comportamiento de una clase debe ser fácilmente extensible sin cambiar el código existente. Al adherirse a este principio, los desarrolladores pueden crear código más flexible, mantenible y escalable.

Uno de los errores comunes que violan el OCP es tener una clase que codifica en duro los comportamientos para diferentes formas. Por ejemplo, considera el siguiente código:

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

Aquí, la clase **`AreaCalculator`** calcula el área de diferentes formas. Si queremos agregar más formas o cambiar el cálculo del área para cualquier forma, tenemos que modificar la clase **`AreaCalculator`**, lo cual viola el principio OCP.

Para adherirse al OCP, una práctica mejor es definir una interfaz **`Shape`** que defina un método para calcular el área y crear clases separadas para cada forma que implemente la interfaz **`Shape`**. De esta manera, el comportamiento de la clase puede ser extendido creando nuevas clases que implementen la interfaz **`Shape`**, sin modificar el código existente. Aquí hay un ejemplo:

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

Con este enfoque, agregar nuevas formas o modificar el cálculo de una forma existente solo requiere crear una nueva clase que implemente la interfaz **`Shape`**. Esto cumple con el principio OCP, haciendo que el código sea más flexible, mantenible y escalable.

En conclusión, el principio OCP ayuda a los desarrolladores a crear software que pueda ser fácilmente extendido sin modificar el código existente. Al utilizar interfaces y herencia, el comportamiento de una clase puede ser extendido sin cambiar el código existente, lo que lo hace más flexible y fácil de mantener.
