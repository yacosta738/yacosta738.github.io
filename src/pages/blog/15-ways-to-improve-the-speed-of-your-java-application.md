---
title: 15 Ways To Improve The Speed of Your Java Application
description: This document provides fifteen invaluable tips for improving the
  speed of Java applications and optimizing code for maximum performance.
  Streamlining architecture and utilizing the latest advancements in technology
  can help reduce execution time. Properly organizing code and taking advantage
  of efficient algorithms can ensure applications run efficiently and quickly.
  Additionally, developers should ensure their systems are properly configured
  for optimal performance. Implementing these tips can help ensure Java
  applications run at maximum speed.
date: 2023-02-02T16:28:19.185Z
lang: en
cover: /uploads/maximizing-java-code-performance.webp
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - Java
  - Performance
categories:
  - development
draft: false
---
![maximizing java code performance](/uploads/maximizing-java-code-performance.webp "maximizing java code performance")

## **1. Avoid Use Of Multiple If-else Statements**

Excessive use of conditional statements can negatively impact the performance of our code as the JVM must evaluate each condition every time it is executed. This issue can be compounded if these statements are used within looping structures such as for loops or while loops. To mitigate this, it is recommended to group conditions and use a single boolean result in the if statement. Additionally, **switching to a switch statement from multiple if-else statements can improve performance**, as switch statements offer better performance compared to **if-else** statements. However, it is crucial to weigh the impact on readability and maintainability before making a decision.

The sample is provided below as an example to avoid:

 **Example:**  

  ```java
    if(condition1){
        if (condition2) {
    			if (condition3 || condition4) { execute ..}        
    			else { execute..}
  ```
    

<aside>
 🗒️ Note: Above sample is to be avoided and use this as follows:

```java
**boolean result = (condition1 && condition2) && (condition3 || condition4)**
```

</aside>

## **2. Avoid Using String Objects For Concatenation**

Strings are immutable classes; objects created by the String class cannot be reused. Therefore, it is not recommended to use the '**+**' operator to concatenate large strings.

This will lead to multiple objects of type `String` being created, resulting in increased usage of heap memory. In this case, we can use either `StringBuilder` or `StringBuffer`. `StringBuilder` is preferable, as it has a performance advantage due to its non-synchronized methods.

**The sample is provided below :**

```java
String query = str1 + str2 + str3;
```

<aside>
 🗒️ Note: Above sample is to be avoided and use this as follows:

```java
StringBuilder strBuilder = new StringBuilder(“”);
strBuilder.append(str1).append(str2).append(str3);

String query = strBuilder.toString();
```

</aside>

## 3. Avoid Writing Long Methods

Follow the Single Responsibility Principle when writing code. This is beneficial for maintenance and performance, as large methods with too much processing can consume memory and CPU cycles during class loading and method calls. To reduce this, break methods into smaller ones at suitable logical points.

I suggest using **[PMD](https://pmd.github.io/), [FindBugs](https://plugins.jetbrains.com/plugin/3847-findbugs-idea), or [SonarQube](https://plugins.jetbrains.com/plugin/7973-sonarlint)** plugins in your IDE. These plugins will alert you when the cognitive complexity of your methods exceeds a certain threshold.

## **4. Avoid Getting the Size of the Collection in the Loop**

When iterating through any collection, get the size of the collection before the loop and never get it during the iteration. The following example should be avoided:

**Example:**
    
    
  ```java
    List<String> empListData = getEmpData();
    for (int i = 0; i < empListData.size(); i++){
    	// execute code ..
    }
  ```
    

<aside>

 🗒️ Note: Above sample is to be avoided and use this as follows:

```java
List<String> empListData= getEmpData();

int size = empListData.size();

for (int i = 0; i < size; i++) {

	// execute code ..

}
```

</aside>

## 5. Avoid Using **BigInteger And** BigDecimal Class

The `BigDecimal` class provides accurate precision for decimal values. However, overusing this object can drastically reduce performance, especially when used to calculate values in a loop. `BigInteger` and `BigDecimal` require a large amount of memory to perform calculations.

If precision is not an issue or if we are certain the range of the calculated value will not exceed `long` or `double`, we can avoid using `BigDecimal` and should use `long` or `double` with proper casting instead.

## 6. Use Primitive Types Wherever Possible

Primitive data types are preferable over objects since they are stored in **stack memory**, which is faster to access than **heap memory**. Whenever possible, use `double` instead of `Double` and `int` instead of `Integer` for faster data access.

## 7. Use Stored Procedures Instead of Queries

Writing stored procedures instead of complex and big queries is beneficial as they are stored as objects in the database and pre-compiled. This reduces the execution time compared to a query, which is compiled and executed every time it is called through the application.

The stored procedure has an advantage in data transfer and network traffic, as it does not need to transfer the complex query to the database server for execution each time.

## 8. Avoid Creating Big Objects Often

Certain classes act as data holders within the application, such as **DB connection** objects or session objects for the user after login. These objects are heavy and their creation should be avoided multiple times, as they use a lot of resources. To improve application performance, we should **reuse** these objects instead of creating them, as this will reduce memory usage.

We should use the **[Singleton pattern](/blog/singleton-pattern)** whenever possible to create a single instance of an object and reuse it when needed, or clone the object instead of creating a new one.

## 9. Use “contains” with caution in your Java applications

`Lists`, `ArrayLists`, and `Vectors` all have a `contains` method that allows programmers to check if a collection already has a similar object. When iterating through a large sample, it is often necessary to find a list of unique objects. The code for this might look like this:

```java
ArrayList al = new ArrayList();

for (int i=0; i < vars.size(); i++) {
	String obj = (String) vars.get(i);
	if (!al.contains(obj)) {
		al.add(obj);
	}
}
```

Functionally, this code is fine. However, from a performance perspective, you are checking if the `ArrayList` contains the object on every loop iteration. The `contains` method scans the entire `ArrayList` each time, so as the `ArrayList` grows, the performance penalty increases.

Add all the samples to the `ArrayList` first, then conduct a single duplicate check using a collection such as a `HashSet` that inherently provides uniqueness. This will reduce the number of contains checks on the `ArrayList` from potentially thousands to just one. Finally, create the unique `ArrayList`.

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

The table below illustrates the time difference between our original code and the modified code:

| List Size | 100 | 1000 | 10000 | 100000 |
| --- | --- | --- | --- | --- |
| Original Code | 0 ms | 5 ms | 171 ms | 49820 ms |
| Modified Code | 0 ms | 1 ms | 7 ms | 28 ms |

## 10. Using PreparedStatement instead of Statement

We use **JDBC API** and classes to execute `SQL` queries through the application. `PreparedStatement` has an advantage over `Statement` for parameterized query execution, as the `PreparedStatement` object is compiled once and executed multiple times.

**`Statement` object on other hand is compiled and executed every time it is called**. Also, the prepared statement object is **safe to avoid SQL injection attacks** .

## 11. Select Required Columns in a Query

When retrieving data from the database, we should use `SELECT` queries to only get the necessary columns for further processing or displaying on the front end. Selecting too many columns can cause a delay in query execution at the database end and increase network traffic from the database to the application, which should be avoided. **It is best to avoid using the asterisk (“*”) when selecting data from the database.** As an example of what should be avoided, see the sample below:

 **Example:**
    
    
  ```sql
    select * from employee where emp_id = 100;
  ```
    

<aside>
 🗒️ Note: Above sample is to be avoided and use this as follows:

```sql
select emp_name, emp_age, emp_gender, emp_occupation, emp_address from employee where emp_id = 100;
```

</aside>

## 12. Use of Unnecessary Log Statements and Incorrect Log Levels

Logging is an essential part of any application and must be implemented efficiently to prevent performance issues caused by incorrect logging and log levels. We should avoid logging large objects into code. Logging should be restricted to specific parameters.

It is recommended to keep the logging level at higher levels such as `DEBUG` and `ERROR`, rather than `INFO`. An example of what should be avoided is provided below:

**Example:**
    
    
 ```java
    Logger.debug("Employee info : " + emp.toString());
    Logger.info("Method called for setting employee data:" + emp.getData());
  ```
    

<aside>
 🗒️ Note: Above sample is to be avoided and use this as follows:

```java
Logger.debug("Employee info : " + emp.getName() + " : login ID : " + emp.getLoginId());

Logger.info("Method called for setting employee data");
```

</aside>

## 13. Fetch the Data Using Joins

While retrieving data from multiple tables, it is essential to use joins correctly. Incorrect joins or non-normalized tables can cause a delay in query execution, resulting in poor application performance. **Rather than using subqueries, it is more efficient to use joins.** To improve query execution performance and reduce latency, create an index on columns that are frequently used. **When using joins or WHERE clauses, prioritize primary keys.**

## 14. Use EntrySet Rather Than KeySet

Iterating over a map with `EntrySet` is more efficient than `KeySet`. `EntrySet` can run 9000 more operations per second, resulting in better performance.

## 15. EnumSet Is the Best Option for Enum Values

Working with `EnumSet` makes more sense than other methods when dealing with `Enum` values. It allows for faster computations than, for example, `HashSet`. Additionally, `EnumSet` stores values in a predictable order, which is not the case with `HashSet` and thus takes longer to produce the same results.