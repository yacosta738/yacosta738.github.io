---
title: '[S] El Principio de Responsabilidad Única'
description: El Principio de Responsabilidad Única (SRP) es un principio de
  diseño que promueve el código mantenible. Establece que cada clase debe tener
  solo una tarea. Esta publicación explica su importancia con ejemplos de
  código, lo que resulta en un código más comprensible y mantenible.
date: 2023-03-01T17:38:53.409Z
lang: es
cover: /uploads/single-responsibility-principle.png
author: Yuniel Acosta

tags:
  - kotlin
  - solid
categories:
  - Software Development
draft: false
---

![[S] El Principio de Responsabilidad Única](/uploads/single-responsibility-principle.png '[S] El Principio de Responsabilidad Única')

El Principio de Responsabilidad Única (SRP) es uno de los principios de diseño SOLID, y establece que una clase debe tener solo una razón para cambiar. En otras palabras, una clase debe tener solo una responsabilidad o tarea que hacer. Esto ayuda a mantener el código modular, fácil de entender y mantenible.

Una clase con múltiples responsabilidades a menudo se conoce como una "clase Dios" o una "clase Bloque" y puede conducir a problemas como hinchazón de código, acoplamiento estrecho y dificultad para probar y mantener.

Por ejemplo, considera el siguiente código que viola el SRP:

```kotlin
class Calculator {
    fun calculateSum(a: Int, b: Int): Int {
        return a + b
    }
    fun printSum(a: Int, b: Int) {
        val sum = calculateSum(a, b)
        println("La suma es: $sum")
    }
}
```

En este código, la clase **Calculator** es responsable de calcular la suma e imprimir el resultado. Como resultado, cualquier cambio en la forma en que se calcula o imprime la suma requeriría modificaciones en esta clase, violando el SRP.

Para adherirse al SRP, es mejor separar las responsabilidades de la clase en dos clases diferentes, una para el cálculo y otra para la impresión:

```kotlin
class Calculator {
    fun calculateSum(a: Int, b: Int): Int {
        return a + b
    }
}

class Printer {
    fun printSum(sum: Int) {
        println("La suma es: $sum")
    }
}
```

En este código, la clase **Calculator** es responsable solo del cálculo de la suma y la clase **Printer** es responsable solo de imprimir los resultados. Esto hace que el código sea más modular y más fácil de mantener, cumpliendo con el SRP.

En conclusión, seguir el principio SRP ayuda a crear un código más mantenible y comprensible al asegurarse de que cada clase tenga solo una responsabilidad o tarea.
