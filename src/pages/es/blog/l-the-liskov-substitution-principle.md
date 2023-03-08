---
title: "[L] The Liskov Substitution Principle"
description: El principio de sustitución de Liskov es una regla fundamental en
  el desarrollo de software que asegura la intercambiabilidad de objetos de una
  subclase con los de una superclase. No seguir esta regla puede llevar a
  errores inesperados en el programa. Al adherirse a esta regla, se simplifica
  la gestión del código y se aumenta la previsibilidad.
date: 2023-03-08T20:56:23.626Z
lang: es
cover: public/uploads/liskov-substitution-principle.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Kotlin
categories:
  - Software Development
draft: true
---
![[L] The Liskov Substitution Principle](public/uploads/liskov-substitution-principle.png "[L] The Liskov Substitution Principle")

El principio de sustitución de Liskov (LSP) es el tercer principio de los principios de diseño SOLID. Se establece que los subtipos deben ser sustituibles por sus tipos base. Específicamente, los objetos de una superclase deben poder ser reemplazados por objetos de una subclase sin alterar la corrección del programa. Este principio ayuda a garantizar que los objetos de una subclase puedan ser utilizados de forma intercambiable con los objetos de la superclase, sin introducir ningún comportamiento inesperado.

Un ejemplo de una mala práctica que viola el Principio de Sustitución de Liskov (LSP) es una jerarquía de clases donde una subclase anula un método de tal manera que cambia el contrato del método.

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

En este ejemplo, la clase **Square** es una subclase de la clase **Rectangle**. Sin embargo, la clase **Square** anula las propiedades de **width** y **height** de una manera que cambia el contrato de la clase. Específicamente, la clase **Square** establece tanto las propiedades de **width** y **height** con el mismo valor, asegurando que un cuadrado siempre sea un cuadrado. No obstante, esto no es un cuadrado real, ya que un cuadrado es un rectángulo con valores iguales de anchura y altura. Como resultado, sustituir un objeto de la clase Rectangle con un objeto de la clase Square puede resultar en un comportamiento del programa inesperado.

Una práctica mejor sería crear una nueva clase **Square** que tenga sus propiedades y métodos propios, además de extender la clase **Rectangle**.

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

En conclusión, la clase **Square** tiene sus propias propiedades y métodos, lo que la hace intercambiable con la clase **Rectangle** sin introducir un comportamiento inesperado. Esta adherencia al Principio de Sustitución de Liskov resulta en un código más mantenible y predecible.