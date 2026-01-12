# AGENTS.md - AI Agent Instructions

> Guidelines for AI agents working on this pnpm monorepo (Astro + Cloudflare Workers).

## Project Overview

- `apps/portfolio` - Astro 5.x static site with Tailwind CSS v4
- `apps/api` - Cloudflare Workers API (Hono + Zod OpenAPI)
- **Package Manager**: pnpm 10.28.0 (enforced)

---

## Build / Lint / Test Commands

### Root-Level Commands

```bash
pnpm install          # Install all dependencies
pnpm dev              # Run all apps in dev mode
pnpm build            # Build all apps
pnpm check            # Biome lint/format + Astro check
pnpm test:unit        # Unit tests only
pnpm test:e2e         # E2E tests only
```

### Per-App Commands

```bash
pnpm --filter=portfolio dev         # Dev server (port 4321)
pnpm --filter=portfolio build       # Production build
pnpm --filter=yap-api dev           # Wrangler dev server
```

### Running a Single Test

```bash
# Unit test - specific file
pnpm --filter=portfolio exec vitest run tests/unit/components/atoms/ThemeToggle.test.ts

# Unit test - pattern match
pnpm --filter=portfolio exec vitest run -t "ThemeToggle"

# E2E test - specific file
pnpm --filter=portfolio exec playwright test tests/e2e/smoke.spec.ts

# E2E test - specific browser
pnpm --filter=portfolio exec playwright test --project=chromium tests/e2e/smoke.spec.ts

# E2E test - headed mode
pnpm --filter=portfolio exec playwright test --headed tests/e2e/smoke.spec.ts
```

---

## Code Style (Biome)

- **Indentation**: Tabs (JSON/YAML/MD use 2 spaces)
- **Quotes**: Double quotes
- **Semicolons**: Required
- **Line endings**: LF, final newline required

## TypeScript

- **Strict mode**: Always (`extends: "astro/tsconfigs/strict"`)
- **Avoid `any`**: Use `unknown` + type guards
- **Explicit types**: Function args and return values
- **Prefer `type`**: Over `interface` unless merging needed
- **Use `as const`** and **`readonly`** for immutability

### Naming Conventions

| Element             | Convention       | Example            |
|---------------------|------------------|--------------------|
| Files               | kebab-case       | `theme-toggle.ts`  |
| Types               | PascalCase       | `UserProfile`      |
| Variables/Functions | camelCase        | `getUserData`      |
| Constants           | UPPER_SNAKE_CASE | `MAX_RETRIES`      |
| Components          | PascalCase       | `HeroBanner.astro` |

### Imports

```typescript
import {something} from "@/lib/utils";     // Path aliases
import Component from "@components/Component.astro";

export const myFunction = () => {
};          // Prefer named exports
```

**Path Aliases**: `@/*`, `@components/*`, `@lib/*`, `@utils/*`, `@i18n/*`, `@data/*`

## Error Handling

```typescript
try {
  await riskyOperation();
} catch (error: unknown) {
  if (error instanceof SpecificError) { /* handle */
  }
  throw new Error(`Operation failed: ${String(error)}`);
}
```

---

## Project Structure

```
src/
  components/
    atoms/       # Smallest elements (Button, Typography)
    molecules/   # Atom combinations
    organisms/   # Full sections (Hero, Experience)
  layouts/       # Page templates
  pages/         # Route definitions
  lib/           # Business logic (framework-agnostic)
  data/          # JSON data, content
  i18n/          # Internationalization
```

## Astro & Vue Components

**Astro**: Use `.astro` for static content; framework components only for interactivity (`client:*`)

**Vue**: `<script setup lang="ts">`, `defineProps()` + `withDefaults()`, `defineEmits()`

## Tailwind CSS v4

- **CSS-first**: No `tailwind.config.js` - config in `global.css`
- Use `@theme` for tokens, `@utility` for custom utilities
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))`

---

## Testing

### Unit (Vitest) - `tests/unit/**/*.test.ts`

```typescript
import {AstroContainer} from "astro/container";

const container = await AstroContainer.create();
const result = await container.renderToString(Component, {props: {}});
```

### E2E (Playwright) - `tests/e2e/**/*.spec.ts`

```typescript
import {expect, test} from "@playwright/test";

test("loads page", async ({page}) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Title/);
});
```

---

## Git Hooks (Lefthook)

- **Pre-commit**: `ruler:apply`, `organize`
- **Pre-push**: `pnpm check`, `lychee` (broken links)

## Architecture Principles

1. **Clean Architecture**: Data -> Business Logic -> Presentation
2. **Atomic Design**: Atoms -> Molecules -> Organisms -> Pages
3. **SOLID**: Single responsibility, open/closed
4. **No framework lock-in**: Business logic in `src/lib/`

---

## Quick Reference

| Task             | Command                                                          |
|------------------|------------------------------------------------------------------|
| Format           | `pnpm check:biome`                                               |
| Type check       | `pnpm --filter=portfolio check:astro`                            |
| Single unit test | `pnpm --filter=portfolio exec vitest run -t "name"`              |
| Single e2e test  | `pnpm --filter=portfolio exec playwright test path/file.spec.ts` |
| Dev              | `pnpm dev`                                                       |
| Build            | `pnpm build`                                                     |

---

## Skills Reference

Specialized skills are available in `.ruler/skills/` for detailed patterns:

| Skill        | Trigger                             | Description                                                 |
|--------------|-------------------------------------|-------------------------------------------------------------|
| `astro`      | `.astro` files, content collections | Astro 5.x patterns, AstroContainer testing, content schemas |
| `playwright` | E2E tests, `.spec.ts` files         | Page Objects, selectors, MCP workflow for test exploration  |
| `tailwind-4` | Styling, `class`/`:class` usage     | CSS-first config, `cn()` usage, no `var()` in classes       |
| `typescript` | `.ts`/`.tsx` files                  | Strict typing, naming conventions, error handling           |
| `zod-4`      | Schema validation                   | Used via `astro:content` for content collection schemas     |

### Loading Skills

Skills are automatically loaded by AI agents based on context. Each skill contains:

- Best practices and patterns specific to this project
- Common pitfalls and how to avoid them
- Code examples adapted to portfolio structure
