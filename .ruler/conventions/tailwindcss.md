# Tailwind CSS v4 — Conventions and Best Practices (Vite/Astro)

> This project uses Tailwind CSS v4 with the Vite plugin and CSS‑first configuration. No tailwind.config.{js,mjs,ts} file is needed — all config lives in CSS and the Vite plugin wiring.

## Installation and wiring

- Use the official Vite plugin and import Tailwind in your global stylesheet.
- In this repo:
  - Vite plugin is registered in `astro.config.mjs` via `vite.plugins: [tailwindcss()]`.
  - Global CSS imports Tailwind in `src/styles/global.css` using `@import "tailwindcss";`.

Minimal example:

- `astro.config.mjs` → `vite.plugins: [tailwindcss()]`
- `src/styles/global.css` → `@import "tailwindcss";`

Official docs: <https://tailwindcss.com/docs/installation/using-vite>

## CSS‑first configuration

Define your design tokens and customizations directly in CSS, near where you import Tailwind.

- Use `@theme` to declare design tokens (fonts, colors, breakpoints, easing, etc.).
- Use CSS variables with semantic names. Prefer semantic tokens over raw brand values in components.

Example (aligned with this repo’s `global.css`):

- `@theme` contains semantic color tokens like `--color-foreground`, `--color-background`, and brand tokens like `--color-brand-accent`.
- Component utilities consume these tokens via custom utilities (e.g., `.text-foreground`, `.bg-background`).

Guidelines:

- Prefer semantic tokens: `--color-background`, `--color-foreground-muted`, `--font-display`.
- Keep `@theme` small and cohesive. Add only tokens actually used by components.
- If renaming a token, maintain a temporary mapping under `:root` to avoid churn during migration.

## Dark mode strategy

Tailwind v4 doesn’t require a config switch — define dark mode as a custom variant.

- Use `@custom-variant dark` to choose your selector strategy.
- This repo uses the class strategy: `@custom-variant dark (&:where(.dark, .dark *));`
- To use a data attribute instead, prefer: `@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));`

Tips:

- Only one dark variant definition should exist in your main stylesheet.
- Drive the selector from the app (e.g., add/remove `.dark` on `<html>`), optionally persisting in localStorage.
- When printing, force a light palette with a `@media print` block (this repo already includes print overrides).

## Custom utilities and variants

Tailwind v4 encourages adding small, focused utilities in CSS:

- `@utility` for single-property utilities (tab-size, bleed, etc.).
- `@layer utilities` for grouped utilities that reference your theme variables.
- `@variant` to apply built-in or custom variants to local CSS.

Conventions in this repo:

- Group semantic utilities in `@layer utilities` inside `global.css` (e.g., `.text-foreground`, `.bg-background`, `.border-border`).
- Keep utilities atomic and reusable. Avoid one-off, component-specific utilities in the global layer.
- Use `@apply` sparingly for third‑party overrides or rare cases where class composition improves clarity.

Examples:

- `@utility tab-4 { tab-size: 4; }`
- `@variant dark { /* local dark overrides */ }`
- `@apply` is fine to override vendor styles, but don’t overuse it for regular components — prefer utilities.

## Source detection and safelisting

Tailwind v4 auto-detects classes from your source by default.

- If a folder isn’t detected, annotate your CSS:
  - `@import "tailwindcss" source("./src");` or add `@source "./src/some-folder";`
- Avoid dynamically constructing class names (e.g., `bg-${color}-500`) — Tailwind can’t detect them. Use a switch/lookup or safelist.
- For rare safelisting needs (v4.1+):
  - `@source inline("underline");`
  - `@source inline("{hover:,}bg-red-{50,{100..900..100},950}");` (use sparingly to avoid CSS bloat)

Repo guidance:

- Our components typically use static class strings; prefer explicit unions or maps when deciding variants.
- If you must safelist, keep the inline patterns small and colocate them near the feature that needs them, with a short comment.

## Performance and maintainability

- Prefer Tailwind utilities in markup over custom CSS. When custom CSS is necessary, keep it small and colocated in the component or in `@layer utilities`.
- Avoid global overrides unless truly global. Most styling should live in components or semantic utilities.
- Keep `global.css` readable: logical sections (imports, variants, `@theme`, legacy mappings while migrating, utilities, resets, print rules).
- Don’t duplicate theme CSS across islands (Vue/Svelte modules). Instead, use `@reference` in component styles if you need `@apply`/variants:
  - `@reference "../../styles/global.css";`
  - If using only the default theme, `@reference "tailwindcss";`

## Color and spacing helpers

- Prefer OKLCH/OKLab color definitions inside `@theme` for predictable contrast and easy manipulation.
- Use the built-in helpers when needed:
  - `--alpha(var(--color-xxx) / 50%)` to change opacity.
  - `--spacing(4)` to compute spacing from the root scale.
- Continue to use Tailwind’s design tokens (e.g., `p-4`, `gap-2`) unless a semantic wrapper is justified.

## Accessibility and printing

- Respect `prefers-reduced-motion` with an overrides block (already present).
- Provide accessible contrast in both light/dark palettes; verify with OKLCH values where possible.
- Print: force a light theme, remove noisy backgrounds, and ensure text remains readable (this repo’s print block is a good template).

## Migration notes (v3 → v4)

- No `tailwind.config.js` is required. Use `@theme`, `@utility`, `@variant`, `@custom-variant` in CSS.
- Legacy `theme()` function is deprecated in favor of CSS variables — prefer `var(--color-...)` from `@theme`.
- Third‑party plugins from v3 can be loaded via `@plugin` for compatibility, but prefer native CSS‑first equivalents.
- If you previously relied on `safelist` in the JS config, use `@source inline()` (v4.1+) or generate a small safelist file and include it with `@source`.

## Practical checklist for new work

- Add classes directly in templates; avoid dynamic class name construction.
- If adding tokens, define them once in `@theme` and consume via utilities.
- Prefer Tailwind utilities; add small custom utilities in `@layer utilities` only when needed.
- Choose and stick to one dark mode selector (`.dark` or `[data-theme=dark]`) and define it via `@custom-variant`.
- Keep `global.css` as the single source of truth for theme and global utilities; use `@reference` from component styles when necessary.

---

Questions or edge cases? Add a short note in this file near the relevant section with a link to the Tailwind docs page.
