---
title: 15 formas de mejorar la velocidad de su aplicación de Java
description: Obtén quince consejos para acelerar tus aplicaciones de Java y
  optimizar tu código para un rendimiento óptimo. Simplificar la arquitectura y
  aprovechar las nuevas tecnologías reduce el tiempo de ejecución. La
  organización adecuada del código y los algoritmos eficientes garantizan que
  las aplicaciones se ejecuten sin problemas. Configura tus sistemas para un
  rendimiento óptimo. Implementa estos consejos para una velocidad máxima.
date: 2023-02-02T16:39:17.873Z
lang: es
cover: /uploads/maximizing-java-code-performance.webp
author: Yuniel Acosta
layout: ../../../components/templates/BlogPostTemplate.astro
tags:
  - Java
categories:
  - Software Development
draft: false
---

![maximizing java code performance](/uploads/maximizing-java-code-performance.webp 'maximizing java code performance')

## **1. Evite el uso de múltiples declaraciones if-else**

El uso excesivo de declaraciones condicionales puede tener un impacto negativo en el rendimiento de nuestro código, ya que la JVM debe evaluar cada condición cada vez que se ejecuta. Este problema puede agravarse si se usan estas declaraciones dentro de estructuras de bucle como bucles for o bucles while. Para mitigar esto, se recomienda agrupar condiciones y usar un único resultado booleano en la instrucción if. Además, **cambiar a una instrucción switch desde múltiples instrucciones if-else puede mejorar el rendimiento**, ya que las instrucciones switch ofrecen mejor rendimiento en comparación con las instrucciones **if-else**. Sin embargo, es crucial evaluar el impacto en la legibilidad y mantenibilidad antes de tomar una decisión.

El ejemplo se proporciona a continuación como un ejemplo para evitar.

**Ejemplo:**

```java
  if(condition1){
      if (condition2) {
  			if (condition3 || condition4) { execute ..}
  			else { execute..}
```

<aside>
 🗒️ Nota: El ejemplo anterior debe evitarse y usarse de la siguiente manera:

```java
boolean result = (condition1 && condition2) && (condition3 || condition4)
```

</aside>

## **2. Evite usar objetos de cadena para concatenación**

Las cadenas son clases inmutables; los objetos creados por la clase String no se pueden reutilizar. Por lo tanto, no se recomienda usar el operador '**+**' para concatenar cadenas grandes.

Esto conducirá a la creación de múltiples objetos de tipo `String`, lo que resultará en un mayor uso de la **heap memory**. En este caso, podemos usar `StringBuilder` o `StringBuffer`. `StringBuilder` es preferible, ya que tiene una ventaja de rendimiento debido a sus métodos no sincronizados.

El ejemplo **se proporciona a continuación:**

```java
String query = str1 + str2 + str3;
```

<aside>
🗒️ Nota: El ejemplo anterior debe evitarse y usarse de la siguiente manera:

```java
StringBuilder strBuilder = new StringBuilder(“”);
strBuilder.append(str1).append(str2).append(str3);

String query = strBuilder.toString();
```

</aside>

## 3. Evite escribir métodos largos.

Siga el principio de responsabilidad única al escribir código. Esto es beneficioso para el mantenimiento y el rendimiento, ya que los métodos grandes con demasiado procesamiento pueden consumir memoria y ciclos de CPU durante la carga de clase y las llamadas a métodos. Para reducir esto, divida los métodos en más pequeños en puntos lógicos adecuados.

Sugiero el uso de los plugins **[PMD](https://pmd.github.io/), [FindBugs](https://plugins.jetbrains.com/plugin/3847-findbugs-idea) o [SonarQube](https://plugins.jetbrains.com/plugin/7973-sonarlint)** en su IDE. Estos plugins le alertarán cuando la complejidad cognitiva de sus métodos exceda un umbral determinado.

## **4. Evite obtener el tamaño de la colección en el bucle**

Cuando itere a través de cualquier colección, obtenga el tamaño de la colección antes del bucle y nunca obténgalo durante la iteración. El siguiente ejemplo debe evitarse:

**Ejemplo:**

```java
  List<String> empListData = getEmpData();
  for (int i = 0; i < empListData.size(); i++){
  	// execute code ..
  }
```

<aside>
 🗒️ Nota:  El ejemplo anterior debe evitarse y usarse de la siguiente manera:

```java
List<String> empListData= getEmpData();

int size = empListData.size();

for (int i = 0; i < size; i++) {

	// execute code ..

}
```

</aside>

## 5. Evite usar la clase **BigInteger y** BigDecimal.

La clase `BigDecimal` proporciona precisión exacta para valores decimales. Sin embargo, el uso excesivo de este objeto puede reducir drásticamente el rendimiento, especialmente cuando se usa para calcular valores en un bucle. `BigInteger` y `BigDecimal` requieren una gran cantidad de memoria para realizar cálculos.

Si la precisión no es un problema o si estamos seguros de que el rango del valor calculado no excederá `long` o `double`, podemos evitar usar `BigDecimal` y deberíamos usar `long` o `double` con el casting adecuado en su lugar.

## 6. Utilice tipos primitivos siempre que sea posible.

Los tipos de datos primitivos son preferibles a los objetos ya que se almacenan en la **stack memory**, que es más rápida de acceder que la **heap memory**. Siempre que sea posible, use `double` en lugar de `Double` y `int` en lugar de `Integer` para un acceso más rápido a los datos.

## 7. Utilice procedimientos almacenados en lugar de consultas.

Escribir procedimientos almacenados en lugar de consultas complejas y grandes es beneficioso ya que se almacenan como objetos en la base de datos y se compilan previamente. Esto reduce el tiempo de ejecución en comparación con una consulta, que se compila y ejecuta cada vez que se llama a través de la aplicación.

La procedimiento almacenado tiene una ventaja en la transferencia de datos y el tráfico de red, ya que no necesita transferir la consulta compleja al servidor de base de datos para su ejecución cada vez.

## 8. Evite crear objetos grandes con frecuencia.

Ciertas clases actúan como contenedores de datos dentro de la aplicación, como objetos de **conexión DB** o objetos de sesión para el usuario después del inicio de sesión. Estos objetos son pesados y su creación debe evitarse varias veces, ya que usan muchos recursos. Para mejorar el rendimiento de la aplicación, deberíamos **reutilizar** estos objetos en lugar de crearlos, ya que esto reducirá el uso de memoria.

Deberíamos usar el [patrón **Singleton**](/es/blog/singleton-pattern) siempre que sea posible para crear una única instancia de un objeto y reutilizarla cuando sea necesario, o clonar el objeto en lugar de crear uno nuevo.

## 9. Usa "\***\*contains\*\***" con precaución en tus aplicaciones de Java.

`Listas`, `ArrayLists` y `Vectores` todos tienen un método `contains` que permite a los programadores verificar si una colección ya tiene un objeto similar. Cuando se itera a través de una muestra grande, a menudo es necesario encontrar una lista de objetos únicos. El código para esto podría verse así:

```java
ArrayList al = new ArrayList();

for (int i=0; i < vars.size(); i++) {
	String obj = (String) vars.get(i);
	if (!al.contains(obj)) {
		al.add(obj);
	}
}
```

Funcionalmente, este código está bien. Sin embargo, desde una perspectiva de rendimiento, está comprobando si la `ArrayList` contiene el objeto en cada iteración del bucle. El método `contains` escanea toda la `ArrayList` cada vez, por lo que a medida que la `ArrayList` crece, la penalización de rendimiento aumenta.

Agregue primero todas las muestras a la `ArrayList`, luego realice una sola comprobación de duplicados utilizando una colección como un `HashSet` que proporciona inherentemente unicidad. Esto reducirá el número de comprobaciones de contenido en la `ArrayList` de potencialmente miles a solo una. Finalmente, cree la `ArrayList` única.

```java
ArrayList al = new ArrayList();
…
for (int i=0; i < vars.size(); i++) {
	String obj = (String) vars.get(i);
	al.add(obj);
}
al = removeDuplicates(al);
…
static ArrayList removeDuplicates(ArrayList list) {
	if (list == null || list.size() == 0){
		return list;
	}
  Set set = new HashSet(list);
	list.clear();
	list.addAll(set);
 	return list;
}
```

La tabla a continuación ilustra la diferencia de tiempo entre nuestro código original y el código modificado:

| List Size     | 100  | 1000 | 10000  | 100000   |
| ------------- | ---- | ---- | ------ | -------- |
| Original Code | 0 ms | 5 ms | 171 ms | 49820 ms |
| Modified Code | 0 ms | 1 ms | 7 ms   | 28 ms    |

## 10. Usar PreparedStatement en lugar de Statement

Usamos la API **JDBC** y clases para ejecutar consultas `SQL` a través de la aplicación. `PreparedStatement` tiene una ventaja sobre `Statement` para la ejecución de consultas parametrizadas, ya que el objeto `PreparedStatement` se compila una vez y se ejecuta varias veces.

El objeto **`Statement`** por otro lado se compila y ejecuta cada vez que se llama. Además, el objeto de declaración preparado es **seguro para evitar ataques de inyección SQL**.

## 11. Seleccionar columnas requeridas en una consulta

Al recuperar datos de la base de datos, debemos usar consultas `SELECT` para obtener solo las columnas necesarias para un procesamiento posterior o para mostrar en el front end. Seleccionar demasiadas columnas puede causar un retraso en la ejecución de la consulta en el lado de la base de datos y aumentar el tráfico de red desde la base de datos hasta la aplicación, lo que debe evitarse. **Es mejor evitar usar el asterisco (“\*”) al seleccionar datos de la base de datos.** Como ejemplo de lo que debe evitarse, vea el ejemplo a continuación:

**Ejemplo:**

```sql
    select * from employee where emp_id = 100;
```

<aside>
💡 Nota: El ejemplo anterior debe evitarse y usarse de la siguiente manera:

```sql
select emp_name, emp_age, emp_gender, emp_occupation, emp_address from employee where emp_id = 100;
```

</aside>

## 12. Uso de sentencias de logs Innecesarias y niveles de logs incorrectos

Logging is an essential part of any application and must be implemented efficiently to prevent performance issues caused by incorrect logging and log levels. We should avoid logging large objects into code. Logging should be restricted to specific parameters.

El registro de logs es una parte esencial de cualquier aplicación y debe implementarse de manera eficiente para evitar problemas de rendimiento causados por un registro de logs y niveles de logs incorrecto. Debemos evitar registrar en los logs objetos grandes en el código. Los logs debe limitarse a parámetros específicos.

Se recomienda mantener el nivel de logs en niveles más altos como `DEBUG` y `ERROR`, en lugar de `INFO`. A continuación se proporciona un ejemplo de lo que se debe evitar:

**Ejemplo:**

```java
    Logger.debug("Employee info : " + emp.toString());
    Logger.info("Method called for setting employee data:" + emp.getData());
```

<aside>
💡 Nota: El ejemplo anterior debe evitarse y usarse de la siguiente manera:

```java
Logger.debug("Employee info : " + emp.getName() + " : login ID : " + emp.getLoginId());

Logger.info("Method called for setting employee data");
```

</aside>

## 13. Obtenga los datos usando joins

Mientras se recuperan datos de varias tablas, es esencial usar correctamente los joins. Los joins incorrectos o las tablas no normalizadas pueden causar un retraso en la ejecución de la consulta, lo que resulta en un rendimiento deficiente de la aplicación. **En lugar de usar subconsultas, es más eficiente usar joins.** Para mejorar el rendimiento de la ejecución de la consulta y reducir la latencia, cree un índice en las columnas que se usan con frecuencia. **Al usar joins o cláusulas WHERE, priorice las claves primarias.**

## 14. Usar EntrySet en lugar de KeySet

Iterar sobre un mapa con `EntrySet` es más eficiente que `KeySet`. `EntrySet` puede ejecutar 9000 operaciones más por segundo, lo que resulta en un mejor rendimiento.

## 15. EnumSet es la mejor opción para valores Enum.

Trabajar con `EnumSet` tiene más sentido que otros métodos cuando se trata de valores `Enum`. Permite computaciones más rápidas que, por ejemplo, `HashSet`. Además, `EnumSet` almacena los valores en un orden predecible, lo cual no es el caso con `HashSet` y por lo tanto toma más tiempo para producir los mismos resultados.
