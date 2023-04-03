---
title: Array list vs linked list java collections
description: Compare ArrayList and LinkedList data structures in Java. Explore
  their differences in implementation, time complexity, memory usage, and
  guidance on when to use each based on use cases.
date: 2023-02-22T21:42:35.461Z
lang: en
cover: /uploads/array-list-vs-linked-list-java-collections.png
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - Java
  - Kotlin
  - jvm
categories:
  - Software Development
draft: false
---

![Array list vs linked list java collections](/uploads/array-list-vs-linked-list-java-collections.png 'Array list vs linked list java collections')

In computer programming, the choice of data structure can significantly influence the efficiency and performance of an algorithm. Two popular data structures in Java are the ArrayList and the LinkedList. Although both implement the List interface, they differ in how they store and manipulate data. The ArrayList is an implementation of a resizable array, while the LinkedList is a doubly-linked list. Each structure has its own advantages and disadvantages, so it's important to understand these differences in order to select the right one for a particular task. In this article, we'll compare the ArrayList and LinkedList in terms of their time complexities for various operations and their memory usage. We'll also discuss scenarios in which each structure is most suitable.

## **ArrayList vs LinkedList:**

- **`ArrayList`** is a resizable-array implementation of the **`List`** interface. Whereas **`LinkedList`** is a Doubly-linked list implementation of the **`List`** and **`Deque`** interfaces.
- In **`ArrayList`** accessing an element takes constant time **`O(1)`**and adding an element takes **`O(n)`** time in the worst case(i.e. adding an item at the first position). Whereas in LinkedList adding an element takes **`O(n)`** time(at the end of the list) and accessing also takes **`O(n)`** time.
- But **`LinkedList**`uses more memory than **`ArrayList` **because of extra overhead for the** next **and** previous\*\* pointers for each node in the linked list.

Now let’s dive deeper into the time complexities for different operations of these two collection classes.

As with standard linked list and array list operations, the various operations will have different algorithmic run times.

Let’s discuss these time complexities:

## **ArrayList<E>:**

- `get(int index)` is **\*O(1**)\*. Main benefit of `ArrayList<E>`.
- `add(E element)` is **_O(1)_** amortized, but **_O(n)_** worst-case since the array. must be resized and copied.
- `add(int index, E element)` is **\*O(n)**.\*
- `remove(int index)` is **\*O(n)**.\*
- `Iterator.remove()` is **\*O(n)**.\*
- `ListIterator.add(E element)` is **\*O(n)**.\*

![ArrayList.png](/uploads/arraylist.png 'ArrayList')

## **LinkedList<E>:**

- `get(int index)` is **O(n)**, but **O(1)** when `index = 0` or `index = list.size() - 1` (in this case, we can also use `getFirst()` and `getLast()`). **\*One of the main benefits of `LinkedList<E>`** .\*
- `add(int index, E element)` is **O(n)**, but **O(1)** when `index = 0` or `index = list.size() - 1` (in this case, we can also use `addFirst()` and `addLast()`). **\*One of the main benefits of `LinkedList<E>`** .\*
- `remove(int index)` is **O(n)**, but **O(1)** when `index = 0` or `index = list.size() - 1` (in this case, we can also use `removeFirst()` and `removeLast()`). **One of the main benefits of `LinkedList<E>`** .
- `Iterator.remove()` is O(1). **\*One of the main benefits of `LinkedList<E>`** .\*
- `ListIterator.add(E element)` is O(1). **\*One of the main benefits of `LinkedList<E>`** .\*

![LinkedList.png](/uploads/linkedlist.png 'LinkedList')

## **Which One Takes More Memory?**

If we have a large list, keep in mind that memory usage will be different for these data structures. Each element of a **`LinkedList`** has more overhead since the **next** and **previous** pointers are also stored. **`ArrayLists`** don't have this overhead.

However, **`ArrayLists`** take up as much memory as it is allocated for the capacity, regardless of whether elements have actually been added or not into the list. Basically, whatever initial capacity we specify while constructing the **`ArrayList`**that much of memory is assigned to the list even though there aren’t that many objects stored initially.

> Note: The default initial capacity of an ArrayList is small (10), But since the underlying implementation is an array, the array must be re-sized if we want to add a lot of elements. To avoid the high cost of re-sizing, when we know that we're going to add a lot of elements, we should construct the ArrayList with a higher initial capacity.

## **Now let’s understand when we should use these two data structures.**

Let me put two scenarios for you:

1. Let’s say you have to create a grocery list for all the items for your daily needs for the next month and
2. Another list you need to create for your favorite songs.

**_Now can you guess what kind of data structure you should use for the first and second use cases?_**

## **Where To Use ArrayList?**

In our first use case, we can definitely use an array list as our list can grow if we need more items and we can directly access any item on this list. Basically, **`ArrayList<E>`** allows fast random read access, so you can grab any element in constant time.

Also, if we want to add more elements than the capacity of the underlying array, a new array is allocated, and the old array is copied to the new one, so adding to an **`ArrayList`** is **_O(n)_** in the worst case but constant on average.

But adding or removing from anywhere requires shifting all the latter elements over to make an opening or fill the gap.

## **Where To Use LinkedList?**

Now for our second use case, we can use LinkedList as **`LinkedList<E>`** allows for constant-time insertions or removals using *iterators*, but only sequential access of the elements.

Now let’s say I’m playing the **‘X’** song of this **`playlist`** and want to move to the next song or go back to the previous song then, we can walk the list either forward or backward using the next and previous pointers of each Node.

But finding a position in the list takes time proportional to the size of the list.

## **How To Choose One?**

- So depending on the operations we intend to do, we should choose the implementations accordingly.
- Searching in a **`LinkedList`** means following the links in **_`O(n)`_** time for the worst case, whereas in an **`ArrayList`** the desired position can be computed mathematically using *the base address and offset* and can be accessed in**_`O(1)` ._**

> Note: The benefit of using a LinkedList can also arise when we want to add or remove from the head of the list since those operations are O(1), while they are O(n) for ArrayList.
>
> _Note that **`ArrayDeque`** maybe a good alternative to **`LinkedList`** for adding and removing from the head, but it is not a **`List`**._

In conclusion, both **`ArrayList`** and **`LinkedList`** are useful data structures with different performance characteristics. **`ArrayList`** provides constant-time access to an element, making it ideal for cases with many random reads or writes. On the other hand, **`LinkedList`** offers constant-time insertion and removal at the beginning or end of the list, making it a suitable choice for applications requiring frequent additions or deletions. However, **`LinkedList`** uses more memory than **`ArrayList`** due to the overhead for pointers for each node. Ultimately, the decision of which data structure to use depends on the specific use case and the operations required.
