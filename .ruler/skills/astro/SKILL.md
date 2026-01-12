---
name: astro
description: >
  Astro framework patterns and best practices for content-focused sites.
  Trigger: When working with .astro files, content collections, or Astro routing.
allowed-tools: Read, Edit, Write, Glob, Grep, Bash
---

# Astro Framework Skill

Conventions for building content-focused, high-performance websites with Astro.

## When to Use

- Creating or modifying `.astro` components
- Working with content collections (blog, articles, resume)
- Configuring Astro routing and layouts
- Optimizing performance with island architecture
- Integrating Vue components as islands

## Critical Patterns

### 1. Island Architecture - Server First

**ALWAYS minimize client-side JavaScript**. Astro ships zero JS by default.

#### Compare these patterns: Static vs Interactive

**Static component** – No JavaScript shipped to the client:

```astro
---
import Header from '../components/Header.astro';
---
<Header title="Welcome" />
```

**Interactive island** – JavaScript loaded only for this component (uses `client:visible`):

```astro
---
import Counter from '../components/Counter.vue';
---
<Counter client:visible />
```

### 2. Hydration Directives

| Directive                           | When to Use                               |
|-------------------------------------|-------------------------------------------|
| `client:load`                       | Critical interactivity needed immediately |
| `client:idle`                       | Non-critical, can wait for browser idle   |
| `client:visible`                    | Below the fold, hydrate on scroll         |
| `client:media="(max-width: 768px)"` | Mobile-only interactivity                 |
| `client:only="vue"`                 | No SSR, client-only rendering (see note)  |

**Default choice**: `client:visible` unless there's a reason otherwise.

> [!WARNING] `client:only` trade-offs
> Components using `client:only` skip server-side rendering entirely, which increases the client JS
> payload and can harm SEO since no HTML is rendered initially. Use only for:
> - Third-party widgets that cannot render on the server
> - Complex client-only UI (e.g., canvas, WebGL, maps)
> - Non-SEO-critical parts of the page (modals, admin dashboards)

### 3. Component Structure

**Props typing options**: Astro supports both runtime access via `Astro.props` and compile-time
typing.

```astro
---
// 1. Type definitions FIRST
type Props = {
  title: string;
  description?: string;
  isActive?: boolean;
};

// 2. Props destructuring with defaults (runtime access)
const { title, description, isActive = false } = Astro.props;

// 3. Imports and logic
import { getCollection } from 'astro:content';
const posts = await getCollection('articles');
---

<!-- 4. Template -->
<section class:list={["hero", { active: isActive }]}>
  <h1>{title}</h1>
  {description && <p>{description}</p>}
  <slot />
</section>

<!-- 5. Scoped styles -->
<style>
  .hero {
    padding: var(--space-8);
  }
</style>
```

### 4. Content Collections

**ALWAYS define schemas for type safety** (see `src/content.config.ts`):

```typescript
// src/content.config.ts
import {defineCollection, z, reference} from 'astro:content';
import {glob} from 'astro/loaders';

const articles = defineCollection({
  loader: glob({pattern: '**/*.{md,mdx}', base: './src/data/articles'}),
  schema: ({image}) => z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: image().optional(),
    author: reference('authors'),
    tags: z.array(reference('tags')),
    category: reference('categories'),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {articles};
```

### 5. Image Optimization

**ALWAYS use Astro's Image component**:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<!-- ✅ Optimized, responsive -->
<Image
  src={heroImage}
  alt="Hero banner"
  width={1200}
  height={600}
  format="webp"
/>

<!-- ❌ NEVER use raw img for local images -->
<img src="/hero.jpg" alt="Hero" />
```

## Project Structure (This Portfolio)

```markdown
apps/portfolio/
├── src/
│ ├── pages/ # File-based routing
│ ├── components/
│ │ ├── atoms/ # Smallest elements
│ │ ├── molecules/ # Atom combinations
│ │ └── organisms/ # Full sections
│ ├── layouts/ # BaseLayout.astro, etc.
│ ├── data/ # Content collections
│ │ ├── articles/ # Blog posts (MDX)
│ │ ├── resume/ # Resume JSON by locale
│ │ ├── tags/ # Tag definitions
│ │ └── authors/ # Author profiles
│ ├── core/ # Business logic (domain)
│ ├── lib/ # Utilities
│ ├── i18n/ # Internationalization
│ └── styles/ # Global CSS (Tailwind)
├── public/ # Static assets
└── astro.config.mjs
```

## Anti-Patterns

❌ **Shipping unnecessary JS** - Use `.astro` for static content
❌ **Using `client:load` everywhere** - Most components don't need immediate hydration
❌ **Raw `<img>` tags** - Use `<Image>` for optimization
❌ **Inline styles for everything** - Use scoped `<style>` blocks
❌ **Hardcoded meta tags** - Use a reusable `BaseHead.astro`

## SEO Pattern

```astro
---
// BaseHead.astro
type Props = {
  title: string;
  description: string;
  image?: string;
};

const { title, description, image } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="canonical" href={canonicalURL} />
<title>{title}</title>
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonicalURL} />
{image && <meta property="og:image" content={new URL(image, Astro.site)} />}
```

## Commands

> **Astro CLI Usage**: Use `pnpm exec astro` or `pnpm --filter portfolio exec astro`

```bash
# Development
pnpm --filter=portfolio dev

# Build
pnpm --filter=portfolio build

# Preview production build
pnpm --filter=portfolio preview

# Running Astro CLI commands directly
pnpm --filter=portfolio exec astro check      # Type-check .astro files
pnpm --filter=portfolio exec astro add vue    # Add integrations
```

## Integration with Vue

When using Vue components as islands:

```astro
---
import InteractiveWidget from '../components/InteractiveWidget.vue';
---

<!-- Pass props, use appropriate hydration -->
<InteractiveWidget
  client:visible
  title="Dashboard"
  :items={data.items}
/>
```

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Image Optimization](https://docs.astro.build/en/guides/images/)
