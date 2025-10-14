# Quickstart: Adding Comments to Blog Posts

**Feature**: 001-implement-comments-in  
**Audience**: Developers working on the portfolio site  
**Last Updated**: 2025-10-13

## Overview

This guide shows how to add Giscus-powered comments to blog post pages in the Astro portfolio site. Comments are stored externally in GitHub Discussions and require no backend infrastructure.

## Prerequisites

- Node.js 18+ and pnpm installed
- Access to the GitHub repository (to configure Giscus)
- Familiarity with Astro components and TypeScript

## One-Time Setup

### Step 1: Enable GitHub Discussions

1. Go to your GitHub repo: `https://github.com/yacosta738/yacosta738.github.io`
2. Navigate to **Settings** > **General** > **Features**
3. Enable **Discussions** if not already enabled
4. Create a new category: **Blog Comments** (or similar)
   - Type: **Announcement** or **General** (your choice)
   - Note the category name; you'll need it for Giscus config

### Step 2: Configure Giscus

1. Visit <https://giscus.app>
2. Fill in the form:
   - **Repository**: `yacosta738/yacosta738.github.io`
   - **Page ↔️ Discussions Mapping**: Choose **pathname** (maps post slug to discussion)
   - **Discussion Category**: Select the category you created (e.g., "Blog Comments")
   - **Features**: Enable reactions, emit metadata (optional)
   - **Theme**: Start with `light` (we'll handle dynamic theme in code)
3. Copy the generated `data-repo-id` and `data-category-id` values
4. Save these IDs; you'll add them to the site config

### Step 3: Install Dependencies (if needed)

Giscus uses a `<script>` tag; no npm package is strictly required. However, if using React/Vue islands:

```bash
pnpm add @giscus/react
```

For this Astro-first approach, we'll use the vanilla `<script>` method.

## Implementation

### Step 4: Create Comments Config

Create a new file to store Giscus configuration:

**File**: `apps/portfolio/src/lib/comments-config.ts`

```typescript
export interface GiscusConfig {
  repo: string;
  repoId: string;
  category: string;
  categoryId: string;
  mapping: 'pathname' | 'url' | 'title' | 'og:title';
  reactionsEnabled: boolean;
  emitMetadata: boolean;
  inputPosition: 'top' | 'bottom';
  theme: string;
  lang: string;
}

export const giscusConfig: GiscusConfig = {
  repo: 'yacosta738/yacosta738.github.io',
  repoId: 'YOUR_REPO_ID_HERE',         // From Step 2
  category: 'Blog Comments',
  categoryId: 'YOUR_CATEGORY_ID_HERE', // From Step 2
  mapping: 'pathname',
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  theme: 'light', // Will be overridden dynamically
  lang: 'en',     // Will be overridden dynamically
};
```

**Action**: Replace `YOUR_REPO_ID_HERE` and `YOUR_CATEGORY_ID_HERE` with the values from Step 2.

### Step 5: Create Comments Component

Create a new Astro component that lazy-loads the Giscus widget:

**File**: `apps/portfolio/src/components/organisms/Comments.astro`

```astro
---
import { giscusConfig } from '@/lib/comments-config';

interface Props {
  slug: string;
  locale?: string;
}

const { slug, locale = 'en' } = Astro.props;

// Detect current theme (assuming a global CSS class on <html>)
// In production, read from cookie or Astro locals
const isDark = false; // Placeholder; will be set client-side

const theme = isDark ? 'dark' : 'light';
const lang = locale === 'es' ? 'es' : 'en';
---

<section class="comments-section" aria-labelledby="comments-heading">
  <h2 id="comments-heading" class="text-2xl font-bold mb-4">Comments</h2>
  
  <!-- Reserved space to prevent CLS -->
  <div 
    class="giscus-container min-h-[200px]"
    data-slug={slug}
    data-theme={theme}
    data-lang={lang}
  >
    <!-- Giscus script will be injected here by client-side JS -->
  </div>
</section>

<script>
  // Lazy-load Giscus when container is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const container = entry.target as HTMLElement;
        const slug = container.dataset.slug || '';
        const theme = container.dataset.theme || 'light';
        const lang = container.dataset.lang || 'en';

        // Import config (assuming it's bundled or inline the values here)
        const config = {
          repo: 'yacosta738/yacosta738.github.io',
          repoId: 'YOUR_REPO_ID_HERE',
          category: 'Blog Comments',
          categoryId: 'YOUR_CATEGORY_ID_HERE',
          mapping: 'pathname',
          reactionsEnabled: true,
          emitMetadata: false,
          inputPosition: 'bottom',
        };

        // Create and inject Giscus script
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', config.repo);
        script.setAttribute('data-repo-id', config.repoId);
        script.setAttribute('data-category', config.category);
        script.setAttribute('data-category-id', config.categoryId);
        script.setAttribute('data-mapping', config.mapping);
        script.setAttribute('data-reactions-enabled', config.reactionsEnabled ? '1' : '0');
        script.setAttribute('data-emit-metadata', config.emitMetadata ? '1' : '0');
        script.setAttribute('data-input-position', config.inputPosition);
        script.setAttribute('data-theme', theme);
        script.setAttribute('data-lang', lang);
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;

        container.appendChild(script);
        observer.unobserve(container);
      }
    });
  });

  const container = document.querySelector('.giscus-container');
  if (container) {
    observer.observe(container);
  }

  // Listen for theme changes and update Giscus
  document.addEventListener('themeChanged', (event: Event) => {
    const customEvent = event as CustomEvent<{ theme: string }>;
    const newTheme = customEvent.detail.theme;
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage(
      { giscus: { setConfig: { theme: newTheme } } },
      'https://giscus.app'
    );
  });
</script>

<style>
  .comments-section {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }
</style>
```

**Notes**:

- Replace `YOUR_REPO_ID_HERE` and `YOUR_CATEGORY_ID_HERE` inline or import from config.
- The `IntersectionObserver` lazy-loads the script when the container scrolls into view.
- The `themeChanged` event listener updates the widget theme dynamically (you'll need to dispatch this event from your theme toggle).

### Step 6: Integrate into Blog Post Layout

Add the Comments component to your blog post layout:

**File**: `apps/portfolio/src/layouts/BlogPost.astro` (or similar)

```astro
---
import Comments from '@/components/organisms/Comments.astro';

// Existing props and setup
const { frontmatter, slug } = Astro.props;
const locale = Astro.currentLocale || 'en';
---

<!-- Existing blog post content -->
<article>
  <h1>{frontmatter.title}</h1>
  <div class="prose">
    <slot />
  </div>
</article>

<!-- Add comments at the end -->
<Comments slug={slug} locale={locale} />
```

### Step 7: Update Theme Toggle (if applicable)

If your site has a theme toggle, dispatch a `themeChanged` event when the theme changes:

**Example** (in your theme toggle script):

```typescript
function setTheme(theme: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
  
  // Dispatch event for Giscus
  document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
}
```

## Testing

### Local Development

1. Start the dev server:

   ```bash
   pnpm dev
   ```

2. Navigate to a blog post page (e.g., `http://localhost:4321/en/blog/my-post`)

3. Scroll to the comments section; verify:
   - Giscus widget loads
   - Existing comments appear (if any)
   - Theme matches site theme

4. Toggle theme; verify widget updates

5. Authenticate with GitHub and post a test comment

### End-to-End Tests

Add a Playwright test:

**File**: `apps/portfolio/tests/integration/comments.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

test.describe('Blog Post Comments', () => {
  test('should load comments section', async ({ page }) => {
    await page.goto('/en/blog/sample-post');
    
    // Wait for comments section to be visible
    const commentsSection = page.locator('.comments-section');
    await expect(commentsSection).toBeVisible();
    
    // Verify heading
    await expect(page.locator('#comments-heading')).toHaveText('Comments');
  });

  test('should lazy-load Giscus widget', async ({ page }) => {
    await page.goto('/en/blog/sample-post');
    
    // Scroll to comments section
    await page.locator('.giscus-container').scrollIntoViewIfNeeded();
    
    // Wait for Giscus iframe to appear
    const iframe = page.frameLocator('iframe.giscus-frame');
    await expect(iframe.locator('body')).toBeVisible({ timeout: 10000 });
  });
});
```

Run tests:

```bash
pnpm --filter=portfolio test:e2e
```

## Deployment

1. Commit changes:

   ```bash
   git add .
   git commit -m "feat: add Giscus comments to blog posts"
   ```

2. Push to feature branch:

   ```bash
   git push origin 001-implement-comments-in
   ```

3. Open PR and verify:
   - Constitution Check passes (tests, lint, performance)
   - Comments work on preview deployment

4. Merge to main and deploy

## Troubleshooting

### Widget doesn't load

- Check browser console for CSP errors; add `https://giscus.app` to CSP if needed
- Verify repo ID and category ID are correct
- Ensure GitHub Discussions is enabled and category exists

### Theme doesn't update

- Verify `themeChanged` event is dispatched correctly
- Check iframe origin matches `https://giscus.app`
- Inspect postMessage in browser DevTools (Network > WS)

### Performance regression

- Verify lazy loading is active (widget should not load until scrolled into view)
- Check reserved min-height prevents CLS
- Run Lighthouse and verify LCP/CLS metrics

## Next Steps

- Add comment count badge to blog list page (optional; requires GitHub API call)
- Customize Giscus theme with CSS variables (see Giscus docs)
- Add i18n keys for "Comments" heading in multiple languages

## References

- [Giscus Official Docs](https://giscus.app/)
- [GitHub Discussions API](https://docs.github.com/en/graphql/reference/objects#discussion)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
