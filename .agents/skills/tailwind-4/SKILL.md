---
name: tailwind-4
description: >
  Tailwind CSS 4 patterns and best practices.
  Trigger: When styling with Tailwind - :class/class usage, theme variables, no var() in class.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

# Tailwind CSS 4 Best Practices

This document outlines best practices for using Tailwind CSS 4 in Astro and Vue projects, focusing
on when to use class/:class, optional helpers, style constants, and dynamic styles.

## Styling Decision Tree

```markdown
Tailwind class exists? → class="..." (Astro/Vue static)
Dynamic value (Vue)? → :style="{ width: x + '%' }"
Dynamic value (Astro)? → style="width: ${x}%" (string)
Conditional styles (Vue)  → :class="['base', condition && 'variant']" or :class="{ variant: condition }"
Conditional styles (Astro)→ class="base ${condition ? 'variant' : ''}"
Static only? → class="..." (no helper needed)
Library can't use class? → style props with var() constants
```

## Critical Rules

### Never Use var() in class

```typescript
// ❌ NEVER: var() in class
<div class = "bg-[var(--color-primary)]" / >
<div class = "text-[var(--text-color)]" / >

// ✅ ALWAYS: Use Tailwind semantic classes
<div class = "bg-primary" / >
<div class = "text-slate-400" / >
```

### Never Use Hex Colors

```typescript
// ❌ NEVER: Hex colors in class
<p class = "text-[#ffffff]" / >
<div class = "bg-[#1e293b]" / >

// ✅ ALWAYS: Use Tailwind color classes
<p class = "text-white" / >
<div class = "bg-slate-800" / >
```

## Conditional Classes in Vue/Astro

Prefer framework-native patterns:

```vue
<!-- Vue: arrays and objects -->
<template>
  <div :class="['base-class', isActive && 'active-class']" />
  <div :class="{ 'active-class': isActive }" />
  <button :class="['px-4', size === 'lg' && 'py-3', size === 'sm' && 'py-1']" />
</template>
```

```astro
---
const isActive = true;
const variant = 'primary';
---
<div class={`base-class ${isActive ? 'active-class' : ''}`} />
<div class={`rounded-lg border ${variant === 'primary' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`} />
```

Optional helper (only when programmatically composing class strings or merging potential Tailwind
conflicts):

```typescript
import {clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Using cn() in Vue/Astro

Use `cn()` when you need to merge potentially conflicting Tailwind classes or compose classes
programmatically. Prefer native `:class`/string interpolation for simple conditions.

```vue
<script setup lang="ts">
import { cn } from "@/lib/utils";
const props = defineProps<{ active?: boolean; size?: 'sm'|'md'|'lg'; class?: string }>();
</script>

<template>
  <!-- Merge variants + external class -->
  <button :class="cn(
    'inline-flex items-center font-medium',
    props.size === 'lg' && 'px-4 py-3 text-base',
    props.size === 'sm' && 'px-2 py-1 text-sm',
    props.active && 'bg-blue-600 text-white',
    props.class
  )" />

  <!-- Plain conditions can use native :class -->
  <div :class="['rounded', props.active && 'ring-2 ring-blue-500']" />
</template>
```

```astro
---
import { cn } from "@/lib/utils";
const { active = false, size = 'md', class: className = '' } = Astro.props;
---
<button class={cn(
  'inline-flex items-center font-medium',
  size === 'lg' && 'px-4 py-3 text-base',
  size === 'sm' && 'px-2 py-1 text-sm',
  active && 'bg-blue-600 text-white',
  className
)} />

<!-- Simple conditions: prefer string interpolation -->
<div class={`rounded ${active ? 'ring-2 ring-blue-500' : ''}`} />
```

### When NOT to Use cn()

```vue
<!-- ❌ Static classes - unnecessary helper -->
<div :class="cn('flex items-center gap-2')" />

<!-- ✅ Just use native binding -->
<div class="flex items-center gap-2" />
```

```astro
<!-- ❌ Static classes - unnecessary helper -->
<div class={cn('flex items-center gap-2')} />

<!-- ✅ Just use class directly -->
<div class="flex items-center gap-2" />
```

## Style Constants for Charts/Libraries

When libraries don't accept class/:class (e.g., Recharts, Chart.js, ECharts):

```typescript
// ✅ Constants with var() - ONLY for library props
const CHART_COLORS = {
  primary: "var(--color-primary)",
  secondary: "var(--color-secondary)",
  text: "var(--color-text)",
  gridLine: "var(--color-border)",
};

// Usage (can't use class)
<XAxis tick = {
{
  fill: CHART_COLORS.text
}
}
/>
< CartesianGrid
stroke = {CHART_COLORS.gridLine}
/>
```

## Dynamic Values

```typescript
// ✅ Vue: style binding for truly dynamic values
<div :style="{ width: percentage + '%', opacity: isVisible ? 1 : 0 }" />

// ✅ Astro: style as string
<div style={`width: ${percentage}%`} />
<div style={`opacity: ${isVisible ? 1 : 0}`} />

// ✅ CSS custom properties for theming
// Vue
<div :style="{ '--progress': value + '%' }" />

// Astro
<div style={`--progress: ${value}%`} />
```

## Common Patterns

### Flexbox

```typescript
<div class = "flex items-center justify-between gap-4" / >
<div class = "flex flex-col gap-2" / >
<div class = "inline-flex items-center" / >
```

### Grid

```typescript
<div class = "grid grid-cols-3 gap-4" / >
<div class = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" / >
```

### Spacing

```typescript
// Padding
<div class = "p-4" / >           // All sides
<div class = "px-4 py-2" / >     // Horizontal, vertical
<div class = "pt-4 pb-2" / >     // Top, bottom

// Margin
<div class = "m-4" / >
<div class = "mx-auto" / >       // Center horizontally
<div class = "mt-8 mb-4" / >
```

### Typography

```typescript
<h1 class = "text-2xl font-bold text-white" / >
<p class = "text-sm text-slate-400" / >
<span class = "text-xs font-medium uppercase tracking-wide" / >
```

### Borders & Shadows

```typescript
<div class = "rounded-lg border border-slate-700" / >
<div class = "rounded-full shadow-lg" / >
<div class = "ring-2 ring-blue-500 ring-offset-2" / >
```

### States

```typescript
<button class = "hover:bg-blue-600 focus:ring-2 active:scale-95" / >
<input class = "focus:border-blue-500 focus:outline-none" / >
<div class = "group-hover:opacity-100" / >
```

### Responsive

```typescript
<div class = "w-full md:w-1/2 lg:w-1/3" / >
<div class = "hidden md:block" / >
<div class = "text-sm md:text-base lg:text-lg" / >
```

### Dark Mode

```typescript
<div class = "bg-white dark:bg-slate-900" / >
<p class = "text-gray-900 dark:text-white" / >
```

## Arbitrary Values (Escape Hatch)

```typescript
// ✅ OK for one-off values not in design system
<div class = "w-[327px]" / >
<div class = "top-[117px]" / >
<div class = "grid-cols-[1fr_2fr_1fr]" / >

// ❌ Don't use for colors - use theme instead
<div class = "bg-[#1e293b]" / >  // NO
```
