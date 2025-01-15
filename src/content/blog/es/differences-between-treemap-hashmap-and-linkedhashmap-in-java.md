---
defaultLocaleVersion: en/differences-between-treemap-hashmap-and-linkedhashmap-in-java
title: Diferencias entre TreeMap, HashMap y LinkedHashMap en Java
description: Este artículo discute las diferencias entre TreeMap, HashMap y
  LinkedHashMap en Java. Explica las características y casos de uso de cada una
  de estas clases para ayudarlo a elegir la implementación adecuada de la
  interfaz Map para su proyecto.
date: 2023-02-18T12:56:56.911Z

cover: /images/map.png
author: en/yuniel-acosta
tags:
  - en/java
  - en/kotlin
categories:
  - en/software-development
draft: false
---

![Diferencias entre TreeMap, HashMap y LinkedHashMap en Java](/images/map-diagram.png 'Diferencias entre TreeMap, HashMap y LinkedHashMap en Java')

Java ofrece tres clases que implementan la interfaz Map: HashMap, LinkedHashMap y TreeMap. Cada una de estas clases tiene sus propias características que las hacen adecuadas para diferentes casos de uso. Además, Java también ofrece la interfaz SortedMap, que extiende la interfaz Map y proporciona métodos adicionales para trabajar con mapas ordenados. En este artículo, nos centraremos en las diferencias entre TreeMap, HashMap y LinkedHashMap en Java.

### **HashMap**

HashMap es la implementación más comúnmente utilizada de la interfaz Map en Java. Es una colección no ordenada de pares clave-valor que utiliza hashing para almacenar y recuperar elementos rápidamente. La clase HashMap no garantiza el orden de los elementos y no mantiene ningún orden de elementos. El algoritmo de hashing utilizado en HashMap proporciona un rendimiento constante para operaciones básicas como obtener y poner.

HashMap es la mejor opción cuando se necesita un mapeo rápido y no ordenado de claves a valores. Es ideal para situaciones en las que no le importa el orden de los elementos y desea acceder rápidamente a ellos utilizando sus claves.

### **LinkedHashMap**

LinkedHashMap es una subclase de HashMap que mantiene el orden de los elementos en el que fueron insertados. Tiene una lista doblemente enlazada que recorre todas sus entradas, lo que permite acceder a los elementos en orden de inserción. LinkedHashMap proporciona todos los mismos métodos que HashMap, con el beneficio adicional de retener el orden de inserción.

LinkedHashMap es la mejor opción si necesita mantener el orden de inserción de los elementos. Es ideal para situaciones en las que desea iterar sobre los elementos en el orden en que se agregaron.

### **TreeMap**

TreeMap es una implementación de la interfaz SortedMap, lo que significa que mantiene los elementos en orden ordenado. TreeMap se basa en una estructura de datos de árbol Rojo-Negro y proporciona un costo de tiempo garantizado logarítmico para las operaciones básicas (obtener y poner). TreeMap ordena los elementos según las claves y es ideal para casos de uso donde las claves deben estar ordenadas.

TreeMap es la mejor opción si necesita un mapeo ordenado de claves a valores. Es ideal para situaciones en las que necesita acceder a los elementos en un orden específico, basado en sus claves.

### **Conclusión**

Elegir la implementación adecuada de la interfaz Map en Java depende de los requisitos específicos de su proyecto. Si necesita un mapeo rápido y no ordenado de claves a valores, HashMap es la mejor opción. Si necesita mantener el orden de inserción de los elementos, LinkedHashMap es la mejor elección. Si necesita un mapeo ordenado de claves a valores, TreeMap es la mejor opción. Al comprender las diferencias entre estas tres clases, puede elegir la que mejor se adapte a sus necesidades.
