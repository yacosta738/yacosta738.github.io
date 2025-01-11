---
title: An Introduction to the Runtime Class in Java
description: "Explore Java's Runtime class: control JVM execution, manage
  memory, and execute OS commands. Examples and benefits for building robust and
  efficient apps."
date: 2023-02-19T01:01:06.248Z
cover: /images/runtime-code.jpeg
author: en/yuniel-acosta
tags:
  - en/java
  - en/jvm
categories:
  - en/software-development
draft: false
---

In Java, the Runtime class provides a way for developers to interact with the runtime environment. The Runtime class is a [singleton](https://www.yunielacosta.com/posts/singleton-pattern/) class that provides an interface to the underlying operating system. The class provides methods for interacting with the operating system, such as executing commands, managing memory, and shutting down the JVM.

The main purpose of the [Runtime class](https://docs.oracle.com/javase/7/docs/api/java/lang/Runtime.html) is to provide information about the runtime environment and control the execution of the JVM. For example, it provides methods to get the amount of free memory, the total memory allocated, and the maximum amount of memory that can be allocated. It also provides methods for getting the number of available processors and the JRE version being used.

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

In the code snippet provided, the main method creates an instance of the Runtime class using the **`getRuntime()`** method. It then calls several methods to get information about the runtime environment and prints it to the console. The code also adds a shutdown hook, which is a thread that runs when the JVM is shutting down. In this case, the shutdown hook simply prints a message to the console.

One of the most powerful features of the Runtime class is the ability to execute commands in the operating system. The **`exec()`** method of the Runtime class can be used to execute a command in a separate process. This can be useful for running external applications, scripts, or batch files from a Java program.

The method has several overloaded versions depending on the arguments passed, but the basic signature is:

```java
public Process exec(String command) throws IOException
```

Here, the **`command`** parameter represents the command to be executed.

Here's an example of how to use the **`exec()`** method to run a simple command in a separate process:

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

In this example, the **`exec()`** method is used to execute the **`dir`** command on Windows. The command output is read from the process's input stream using a **`BufferedReader`** and printed to the console. The **`waitFor()`** method is called to wait for the command to complete, and the exit status of the process is obtained using the **`exitValue()`** method.

The **`exit()`** method of the Runtime class can be used to terminate the JVM with a specified exit status. This method can be used to shut down the JVM gracefully or in the event of an error.

In conclusion, the Runtime class is an important part of the Java API that provides access to the runtime environment. It allows developers to get information about the runtime environment and control the execution of the JVM. The class is a powerful tool for building robust, efficient, and scalable Java applications that can take full advantage of the capabilities of the Java platform.
