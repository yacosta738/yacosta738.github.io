---
title: Lista de array vs. lista enlazada de colecciones de Java
description: Este artículo compara las estructuras de datos ArrayList y
  LinkedList en Java. Explica las diferencias en la implementación y complejidad
  temporal para varias operaciones de estas dos estructuras de datos. Además, se
  discuten las diferencias en el uso de memoria entre ambas y se proporciona
  orientación sobre cuándo usar cada una según casos de uso específicos.
date: 2023-02-22T12:51:48.976Z
lang: es
cover: /uploads/array-list-vs-linked-list-java-collections.png
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Java
  - Kotlin
  - jvm
categories:
  - Desarrollo de Software
draft: false
---
![Lista de array vs. lista enlazada de colecciones de Java](/uploads/array-list-vs-linked-list-java-collections.png "Lista de array vs. lista enlazada de colecciones de Java")

En la programación informática, la elección de la estructura de datos puede influir significativamente en la eficiencia y el rendimiento de un algoritmo. Dos estructuras de datos populares en Java son ArrayList y LinkedList. Aunque ambas implementan la interfaz List, difieren en cómo almacenan y manipulan los datos. ArrayList es una implementación de una matriz redimensionable, mientras que LinkedList es una lista doblemente enlazada. Cada estructura tiene sus propias ventajas y desventajas, por lo que es importante entender estas diferencias para seleccionar la adecuada para una tarea particular. En este artículo, compararemos ArrayList y LinkedList en términos de sus complejidades de tiempo para varias operaciones y su uso de memoria. También discutiremos escenarios en los que cada estructura es más adecuada.

## **ArrayList vs LinkedList:**

* **`ArrayList`** es una implementación de matriz redimensionable de la interfaz **`List`**. Mientras que **`LinkedList`** es una implementación de lista doblemente enlazada de las interfaces **`List`** y **`Deque`**.
* En **`ArrayList`** acceder a un elemento toma tiempo constante **`O(1)`** y agregar un elemento toma tiempo **`O(n)`** en el peor caso (es decir, agregar un elemento en la primera posición). Mientras que en LinkedList agregar un elemento toma tiempo **`O(n)`** (al final de la lista) y acceder también toma tiempo **`O(n)`**.
* Pero `LinkedList` utiliza más memoria que `ArrayList` debido al exceso de gastos generales para los punteros `next` y `previous` para cada nodo en la lista enlazada.

Ahora profundicemos en las complejidades de tiempo para diferentes operaciones de estas dos clases de colecciones.

Al igual que con las operaciones estándar de las listas enlazadas y las listas de arreglos, las diversas operaciones tendrán diferentes tiempos de ejecución algorítmicos.

Discutamos estas complejidades de tiempo:

## **ArrayList<E>:**

* El método `get(int index)` es ***O(1)***. El beneficio principal de `ArrayList<E>`.
* El método `add(E element)` es ***O(1)*** amortizado, pero ***O(n)*** en el peor de los casos ya que el array debe ser redimensionado y copiado.
* El método `add(int index, E element)` tiene una complejidad de tiempo de ***O(n)***.
* El método `remove(int index)` es ***O(n)***.
* El método `Iterator.remove()` es ***O(n)***.
* El método `ListIterator.add(E element)` es ***O(n)***.

![ArrayList.png](public/uploads/arraylist.png "ArrayList")

## **LinkedList<E>:**

* El método `get(int index)` es **O(n)**, pero **O(1)** cuando `index = 0` o `index = list.size() - 1` (en este caso, también podemos usar `getFirst()` y `getLast()`). **\*Uno de los principales beneficios de `LinkedList<E>`**.
* El método `add(int index, E element)` tiene una complejidad de **O(n)**, pero es **O(1)** cuando `index = 0` o `index = list.size() - 1` (en este caso, también podemos usar `addFirst()` y `addLast()`). ***Uno de los principales beneficios de LinkedList<E>***.
* El método `remove(int index)` es **O(n)**, pero **O(1)** cuando `index = 0` o `index = list.size() - 1` (en este caso, también podemos usar `removeFirst()` y `removeLast()`). **Uno de los principales beneficios de `LinkedList<E>`**.
* El método `Iterator.remove()` es O(1). ***Uno de los principales beneficios de `LinkedList<E>`***.
* El método `ListIterator.add(E element)` es O(1). *Uno de los principales beneficios de `LinkedList<E>`*.

![LinkedList.png](public/uploads/linkedlist.png "LinkedList")

## ¿Cuál ocupa más memoria?

Si tenemos una lista grande, debemos tener en cuenta que el uso de memoria será diferente para estas estructuras de datos. Cada elemento de un **`LinkedList`** tiene más sobrecarga ya que también se almacenan los punteros **siguiente** y **anterior**. Los **`ArrayLists`** no tienen esta sobrecarga.

Sin embargo, los `ArrayLists` ocupan tanta memoria como se asigna para la capacidad, independientemente de si se han agregado elementos o no a la lista. Básicamente, cualquier capacidad inicial que especifiquemos al construir el `ArrayList`, se asigna tanta memoria a la lista aunque inicialmente no haya tantos objetos almacenados.

> Nota: La capacidad inicial predeterminada de un ArrayList es pequeña (10), pero como la implementación subyacente es una matriz, la matriz debe redimensionarse si queremos agregar muchos elementos. Para evitar el alto costo de redimensionamiento, cuando sabemos que vamos a agregar muchos elementos, debemos construir el ArrayList con una capacidad inicial más alta.

## Ahora entendamos cuándo debemos utilizar estas dos estructuras de datos.

Permíteme presentarte dos escenarios:

1. Imaginemos que tienes que crear una lista de compras para todos los artículos que necesitas diariamente durante el próximo mes y
2. Otra lista que necesitas crear para tus canciones favoritas.

¿Ahora puedes adivinar qué tipo de estructura de datos debes usar para el primer y segundo caso de uso?

## ¿Dónde usar ArrayList?

En nuestro primer caso de uso, definitivamente podemos usar un ArrayList ya que nuestra lista puede crecer si necesitamos más elementos y podemos acceder directamente a cualquier elemento en esta lista. Básicamente, `**ArrayList <E>`\*\* permite un rápido acceso de lectura aleatorio, por lo que puedes obtener cualquier elemento en tiempo constante.

Además, si queremos agregar más elementos que la capacidad del array subyacente, se asigna un nuevo array, y el antiguo se copia en el nuevo, por lo que agregar a un **`ArrayList`** es **O(n)** en el peor caso pero constante en promedio.

Pero agregar o eliminar desde cualquier lugar requiere desplazar todos los elementos posteriores para crear una abertura o llenar el espacio.

## ¿Dónde usar LinkedList?

Para nuestro segundo caso de uso, podemos usar LinkedList ya que **`LinkedList<E>`** permite inserciones o eliminaciones de tiempo constante utilizando *iterators*, pero solo acceso secuencial a los elementos.

Ahora supongamos que estoy reproduciendo la canción **'X'** de esta **`lista de reproducción`** y quiero pasar a la siguiente canción o volver a la canción anterior. En ese caso, podemos caminar por la lista hacia adelante o hacia atrás utilizando los punteros siguiente y anterior de cada Nodo.

Pero encontrar una posición en la lista lleva tiempo proporcional al tamaño de la lista.

## ¿Cómo elegir uno?

* Dependiendo de las operaciones que pretendamos realizar, debemos elegir las implementaciones correspondientes.
* Buscar en un **`LinkedList`** significa seguir los enlaces en ***`O(n)`*** tiempo para el peor caso, mientras que en un **`ArrayList`** la posición deseada se puede calcular matemáticamente utilizando *la dirección base y el desplazamiento* y se puede acceder en ***`O(1)`***.

> Nota: El beneficio de usar una LinkedList también puede surgir cuando queremos agregar o eliminar desde la cabeza de la lista, ya que esas operaciones son O(1), mientras que son O(n) para ArrayList.
>
> Tenga en cuenta que **`ArrayDeque`** puede ser una buena alternativa a **`LinkedList`** para agregar y eliminar desde la cabeza, pero no es una **`List`**.

En conclusión, tanto **`ArrayList`** como **`LinkedList`** son estructuras de datos útiles con diferentes características de rendimiento. **`ArrayList`** proporciona acceso constante a un elemento, lo que lo hace ideal para casos con muchas lecturas o escrituras aleatorias. Por otro lado, **`LinkedList`** ofrece inserción y eliminación constante al principio o al final de la lista, lo que lo hace una opción adecuada para aplicaciones que requieren adiciones o eliminaciones frecuentes. Sin embargo, **`LinkedList`** usa más memoria que **`ArrayList`** debido a los punteros adicionales para cada nodo. En última instancia, la decisión de qué estructura de datos usar depende del caso de uso específico y de las operaciones requeridas.
