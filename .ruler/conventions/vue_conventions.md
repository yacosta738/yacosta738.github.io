# Vue 3 Conventions

> This document outlines the conventions and best practices for Vue 3 development.

## Component Conventions

- Use the `<script setup lang="ts">` syntax for all components.
- Name components using `PascalCase` (e.g., `UserProfileCard.vue`).
- Define props using `defineProps()` and provide defaults with `withDefaults()`.
- Explicitly declare all emitted events with `defineEmits()`.
- Co-locate styles in a `<style scoped>` block.

## State Management (Pinia)

- Use **Pinia** for all state management.
- Organize stores by domain (e.g., `useUserStore`, `useProjectStore`).
- Always provide strong types for state, getters, and actions.

## Composition API

- Encapsulate reusable logic into composables (e.g., `useFeature.ts`) and place them in the `composables/` directory.
- Composables should always return reactive values (`ref`, `computed`).

## UI Components

- Use **Shadcn-Vue** as the primary UI component library (`src/components/ui`). Use the components as provided, customizing styles via props or CSS variables.
- Create custom components only when necessary (e.g., for unique functionality or complex interactions).
- Prefer composing functionality with slots over complex props.
- Ensure all interactive components are accessible (a11y).

## Internationalization (i18n)

- Use `vue-i18n` for all user-facing text.
- Wrap all display text with the `$t()` function.
- Organize translation keys by domain or component (e.g., `userProfile.title`).

## Code Quality

- Use **Biome** for linting and formatting.
- Use TypeScript with `strict` mode enabled.

## Communication Between Components

- **Parent-Child**: Use props (down) and events (up).
- **Distant/Sibling**: Use a Pinia store or a shared composable.
- Avoid global event buses.

## Performance

- Use `v-memo` and `v-once` for static content.
- Use lazy loading for components and routes that are not immediately visible.
- Clean up side effects (e.g., timers, event listeners) in the `onUnmounted` lifecycle hook.
