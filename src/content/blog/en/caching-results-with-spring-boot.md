---
title: Caching results with Spring Boot
description: Implementing a Cache with Spring is a fairly easy task,
  due to the ease of implementation. For this Spring provides us with a series
  of annotations that we will see in the rest of the tutorial.
date: 2022-10-21T23:18:16.315Z
cover: /images/cache.webp
author: en/yuniel-acosta
tags:
  - en/spring
  - en/spring-boot
  - en/java
  - en/kotlin
  - en/cache
categories:
  - en/software-development
draft: false
---

![background](/images/cache.webp 'cache')

Let's imagine a web application, where for each request received, it must read certain configuration data from a database. These data will not normally change but our application, in each request, must connect, run the appropriate statements to read the data, bring them over the network, etc. Let's imagine, in addition, that the database to which we connect is saturated or the network connection that connects us to the database is unstable. What would happen?. Well, we would have a slow application due to the fact of continuously reading some data that we know that hardly change.

To solve this problem we could use a **[Cache](<https://en.wikipedia.org/wiki/Cache_(computing)>)**, but how to implement it?. In this article I will explain how to use a basic cache in **[Spring Boot](https://spring.io/projects/spring-boot)**.

## A little theory

The cache is applied to functions, where for the same input value we expect the same output value. That is why we must always have at least one input parameter and an output.

A typical example would be this:

```java
@Cacheable(cacheNames="headers")
 public int cacheFun(int valor)
 {
  ... very complex and expensive calculations ....
  return N;
 }
```

And now suppose we have the following code where we call that function:

```java
int value=cacheFun(1);
int anotherValue=cacheFun(2);
int thirdValue=cacheFun(1);
```

When running the program, on the first line, **Spring**, will run the function and save the result it returns. On the second line, as it does not know the value that should be returned for the input with value “2” it will do the same. However, on the third line **Spring** will detect that a function marked with **[@Cacheable](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/cache/annotation/Cacheable.html)** with the cache name “**headers**” has already been called with the value “**1**” and will not run the function, it will simply return the value that in the first call saved.

The name of the cache is important because, among other things, it allows us to have different independent caches, which we can clean to force **Spring Boot** to run the functions again.

Thus, the basic idea is that in each call to a function marked as **@Cacheable** the results for each call are saved in an internal table, so that if it already has the output for an input, it does not call the function.

## Practice

And now, let's get to the practice:

The example project on which this article is based is at: [Github Repo](https://github.com/yacosta738/tutorials/tree/main/cacheExample)

The first thing we need is to include the following dependency in our project:

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-cache</artifactId>
</dependency>
```

Now we can already use the tags that will allow us to use Cache in our application.

The first tag to put is **@EnableCaching**. With this tag we tell Spring to prepare the support to use cache. If we do not put it, it will simply not use it, regardless of whether we later indicate that it caches the results of some functions.

```java
@SpringBootApplication
@EnableCaching
public class CacheExampleApplication {
	public static void main(String[] args) {
		SpringApplication.run(CacheExampleApplication.class, args);
	}
}
```

In this example some data will be read from a database through some REST requests.

The data itself is read in the class `CacheDataImpl.java` which is in the package `org.acosta.cacheexample.impl`

The function that reads the data is the following:

```java
@Cacheable(cacheNames="headers", condition="#id > 1")
 public DtoResponse getDataCache(int id) {
		try {
			Thread.sleep(500);
		} catch (InterruptedException e) {
		}
		DtoResponse requestResponse=new DtoResponse();
		Optional<Invoiceheader> invoice=invoiceHeaderRepository.findById(id);
		..... MORE CODE NOT IMPORTANT ...
	}
```

As you can see we have the tag **@Cacheable(cacheNames=”headers”, condition=”#id > 1″)**

With it, we are telling Spring two things.

- We want to cache the result of this function.
- We put as a condition that it only caches the results if the input value is greater than 1.

Later, in the flushCache function, we put the **@CacheEvict** tag which clears the indicated cache. In this case, in addition, we indicate that it deletes all entries that have cached.

```java
@CacheEvict(cacheNames="headers", allEntries=true)
public void flushCache() {  }
```

In the function `update` we update the database and with the tag **@CachePut** we tell Spring to update the data for the value that is in **dtoRequest.id**

```java
@CachePut(cacheNames="headers", key="#dtoRequest.id")
public  DtoResponse update(DtoRequest dtoRequest)
{
.... UPDATE DATABASE ....
}
```

Of course this function must return an object of the same type as the one marked with the tag **@Cacheable** and we must tell it the input value, for which we want to update the data.

## Working

To better understand the application we are going to start it and make some requests.

The application when it starts saves in the table `invoiceHeader` the headers of 4 invoices (you can see how it does it in the file `data.sql`).

Let's run the `get` function of the class `PrincipalController`, for this we write:

```shell
curl -s http://localhost:8080/2
```

It will return the following:

```json
{
  "interval": 507,
  "httpStatus": "OK",
  "invoiceHeader": {
    "id": 2,
    "activo": "N",
    "yearFiscal": 2019,
    "numberInvoice": 2,
    "customerId": 2
  }
}
```

The `interval` field is the time in milliseconds that it has taken to make the query. As you can see it has cost more than half a second, because in the function `getDataCache` of C`acheDataImpl.java` we have a sleep of **500** milliseconds.

Now we run the call again:

```shell
curl -s http://localhost:8080/2
{"interval":1,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

Now the time it took the call was _1_, because really **Spring** **DOES NOT** run the code of the function and simply returns the value that was cached.

However, if we request the **id** 1 as we have indicated that it does not cache it, it will always run the function and therefore we will have a time greater than 500 milliseconds:

```shell
 curl -s http://localhost:8080/1
{"interval":503,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

curl -s http://localhost:8080/1
{"interval":502,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

curl -s http://localhost:8080/1
{"interval":503,"httpStatus":"OK","invoiceHeader":{"id":1,"activo":"S","yearFiscal":2019,"numberInvoice":1,"customerId":1}}

```

If we call the `flushcache` function we will clear the cache and therefore the next call to the cached function must run the function:

```shell
curl -s http://localhost:8080/flushcache
Cache Flushed!

curl -s http://localhost:8080/2
{"interval":508,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

curl -s http://localhost:8080/2
{"interval":0,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

Finally we will see how if we change the value of the **activo** field to **N**, as the function that makes the change is marked with `@CacheEvict` it will update the value of the cache, but in the next call to the function `getDataCache` the code will still not be executed, however, returning the updated object.

```shell
curl -X PUT   http://localhost:8080/   -H "Content-Type: application/json"   -d "{\"id\": 2, \"active\": \"N\"}"

curl -s http://localhost:8080/2
{"interval":0,"httpStatus":"OK","invoiceHeader":{"id":2,"activo":"N","yearFiscal":2019,"numberInvoice":2,"customerId":2}}

```

## Conclusions

**Spring Boot**, without any difficulty, allows us to cache the results of the functions, however we must bear in mind that this cache is very basic and it is done in memory. However, **Spring Boot** allows us to use external libraries that will allow us to cache on disk, in databases, etc.

In [](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-caching.html)[boot-features-caching](https://docs.spring.io/spring-boot/docs/2.0.x/reference/html/boot-features-caching.html) you have the different Cache implementations that Spring Boot supports, among which is [EhCache](https://www.ehcache.org/), with which you can define different types of backend for the data, as well as specify data validity times and many more options.
