---
title: Introducción a la clase Runtime en Java
description: 'Explora la clase Runtime de Java: controla la ejecución de la JVM,
  gestiona la memoria y ejecuta comandos del SO. Ejemplos y beneficios para
  construir aplicaciones sólidas y eficientes.'
date: 2023-02-19T01:08:10.172Z
lang: es
cover: /uploads/runtime-code.jpeg
author: Yuniel Acosta

tags:
  - java
  - jvm
categories:
  - Software Development
draft: false
---

La clase Runtime de Java proporciona una forma para que los desarrolladores interactúen con el entorno de tiempo de ejecución. La clase Runtime es una clase [singleton](https://www.yunielacosta.com/es/blog/singleton-pattern/) que proporciona una interfaz con el sistema operativo subyacente. La clase proporciona métodos para interactuar con el sistema operativo, como ejecutar comandos, administrar la memoria y apagar la JVM.

The main purpose of the [Runtime class](https://docs.oracle.com/javase/7/docs/api/java/lang/Runtime.html) is to provide information about the runtime environment and control the execution of the JVM. For example, it provides methods to get the amount of free memory, the total memory allocated, and the maximum amount of memory that can be allocated. It also provides methods for getting the number of available processors and the JRE version being used.

La principal finalidad de la clase [Runtime](https://docs.oracle.com/javase/7/docs/api/java/lang/Runtime.html) es proporcionar información sobre el entorno de tiempo de ejecución y controlar la ejecución de la JVM. Por ejemplo, proporciona métodos para obtener la cantidad de memoria libre, la memoria total asignada y la cantidad máxima de memoria que se puede asignar. También proporciona métodos para obtener el número de procesadores disponibles y la versión de JRE que se está utilizando.

```java
public class Tets {
	public static void main(String[] args){
		Runtime rt = Runtime.getRuntime();
		System.out.println("Free Memory:" + rt.freeMemory());
		System.out.println("Total Memory:" + rt.totalMemory());
		System.out.println("Max Memory:" + rt.maxMemory());
		System.out.println("Available Processors:" + rt.availableProcessors());
		System.out.println("JRE Version:" + rt.version());
		// run a thread before shutting down
		rt.addShutdownHook(new Thread(() -> {
			System.out.println("Good bye!");
		}));
		System.out.println("Jvm shutting down...");
		rt.exit(1);
	}
}
```

En el fragmento de código proporcionado, el método principal crea una instancia de la clase Runtime usando el método **`getRuntime()`**. Luego llama a varios métodos para obtener información sobre el entorno de tiempo de ejecución y la imprime en la consola. El código también agrega un gancho de apagado, que es un hilo que se ejecuta cuando la JVM se está apagando. En este caso, el gancho de apagado simplemente imprime un mensaje en la consola.

Una de las características más poderosas de la clase Runtime es la capacidad de ejecutar comandos en el sistema operativo. El método **`exec()`** de la clase Runtime se puede usar para ejecutar un comando en un proceso separado. Esto puede ser útil para ejecutar aplicaciones externas, scripts o archivos por lotes desde un programa Java.

El método tiene varias versiones sobrecargadas dependiendo de los argumentos pasados, pero la firma básica es:

```java
public Process exec(String command) throws IOException
```

Aquí, el parámetro **`command`** representa el comando a ejecutar.

Aquí hay un ejemplo de cómo usar el método **`exec()`** para ejecutar un comando simple en un proceso separado:

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class ExecExample {
    public static void main(String[] args) throws IOException {
        // Run the "dir" command on Windows
        Process process = Runtime.getRuntime().exec("cmd /c dir");

        // Read the output of the command
        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }

        // Wait for the command to complete and get the exit status
        try {
            int exitValue = process.waitFor();
            System.out.println("Exit value: " + exitValue);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
```

El método **`exec()`** se usa en este ejemplo para ejecutar el comando **`dir`** en Windows. La salida del comando se lee desde el flujo de entrada del proceso usando un **`BufferedReader`** y se imprime en la consola. El método **`waitFor()`** se llama para esperar a que el comando se complete y el estado de salida del proceso se obtiene usando el método **`exitValue()`**.

El método **`exit()`** de la clase Runtime se puede usar para terminar la JVM con un estado de salida especificado. Este método se puede usar para apagar la JVM de manera elegante o en caso de un error.

En conclusión, la clase Runtime es una parte importante de la API de Java que proporciona acceso al entorno de tiempo de ejecución. Permite a los desarrolladores obtener información sobre el entorno de tiempo de ejecución y controlar la ejecución de la JVM. La clase es una herramienta poderosa para construir aplicaciones Java robustas, eficientes y escalables que pueden aprovechar al máximo las capacidades de la plataforma Java.
