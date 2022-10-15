---
title: Web Performance
description: More important than the speed of your website in milliseconds, is
  the speed with which users perceive your site. These perceptions are affected
  by the real-time page load time, the sluggishness, the responsiveness to the
  user interaction and the smoothness of the scrolling and other animations. In
  this article, we analyze the various metrics of loading, animation and
  response metrics, along with best practices to improve user perception, if not
  the real times.
date: 2022-10-13T12:33:43.553Z
lang: en
cover: public/uploads/wep-performance.jpg
author: Yuniel Acosta
layout: ../../components/templates/BlogPostTemplate.astro
tags:
  - web
  - html
  - javascript
  - TTFB
categories:
  - web
  - development
draft: false
---
![web performance](public/uploads/wep-performance.jpg "web performance")

WEB PERFORMANCE is one of the most important topics for the SUCCESS of your page. But almost no one knows the MOST IMPORTANT metrics. I explain them to you. ↓

### 📡 Time to First Byte (TTFB)

Measures the time from when the browser makes the request for the page until the first byte is received.

🆗 Very important, since it affects all the others.

✅ <600ms

It is extracted from laboratory data 🧪 and real users 👨‍👩‍👧‍👦

### 🎨 First Contentful Paint (FCP)

Time it takes to render any text or image (including backgrounds)

🆗 Tell the user if the web really works and can start consuming the web.

✅ <1.8s

Laboratory data 🧪 and real users 👨‍👩‍👧‍👦

### 🖼 Largest Contentful Paint (LCP)

The time it takes to render the largest piece of content that is in the viewport.

🆗 It is one of the three Google Web Vitals.

👀 Visually impacts the user a lot.

✅ <2.5s

Laboratory data 🧪 and real users 👨‍👩‍👧‍👦

### 📈 Speed Index (SI)

Calculates how fast the visual content has been progressively rendered in the viewport.

🆗 It is not the same as a blank page for 3 seconds and then show everything at once, to do it progressively. It is perceived differently.

✅ <2.5s

Only in laboratory 🧪

### ☝️ First Input Delay (FID)

Measures the time it takes for the interface to respond to the first user interaction.

🆗 It is the Web Vital of interactivity. Do you know when you click and the web does not respond? That's it.

✅ <100ms

Reliable on field data from real users 👨‍👩‍👧‍👦

### 🛑 Total Blocking Time (TBT)

Sum of the duration of long tasks (more than 50ms) of JS that have blocked the main thread after FCP.

🆗 The longer the thread is locked, the less usable the page is.

✅ <200ms

Laboratory data 🧪

### 👐 Max Potential First Input Delay (mFID)

Measures the maximum FID possible taking into account the time the main thread is blocked.

🆗 It is interesting to detect possible values of FID in tests.

✅ <130ms

Laboratory data 🧪

### 🎡 Cumulative Layout Shift (CLS)

It measures the jumps that the layout of your page has made while it was loading.

🆗 The Vital Web of visual stability. It usually happens with images and advertising banners.

✅ <0.1

Laboratory data 🧪 and real users 👨‍👩‍👧‍👦

### 🏃‍♀️ Time to Interactive (TTI)

The time it takes for the page to have displayed all the useful content, the events of the most visible elements have been registered and the page responds to interactions in 50ms.

🆗 Unstable, better look at the TBT.

✅ <3.8s

Laboratory data 🧪

Data that you extract with [Lighthouse](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk?hl=es) or similar tools from your machine or a prepared machine.

Field data with real users 👨‍👩‍👧‍👦

Using the Performance API you can extract the metrics and send them to a service. Also with Chrome UX Report.