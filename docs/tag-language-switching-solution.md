# Tag Page Language Switching Solution

## Overview

This document explains the comprehensive solution implemented for handling language switching on tag pages in this Astro-based multilingual portfolio site.

## Problem Statement

When users changed languages while viewing a tag page (e.g., `/en/tag/security`), the system would maintain the same tag slug but change the language prefix (e.g., `/es/tag/security`), resulting in 404 errors because:

1. Tag slugs might not exist in all languages
2. Tag titles differ between languages (e.g., "security" vs "seguridad")
3. There was no smart fallback behavior

## Solution Architecture

The solution consists of three main components:

### 1. Tag Locale Service (`src/core/tag/tag-locale.service.ts`)

This service provides utilities for matching tags across languages and generating appropriate fallback paths.

**Key Functions:**

- `findTagInLanguage(sourceTagSlug, targetLang)`: Attempts to find an equivalent tag in the target language by matching slugs
- `getTagLocalePaths(currentTagSlug, currentLang, availableLanguages)`: Generates locale paths for a tag page with smart fallbacks
- `extractTagSlugFromPath(pathname)`: Extracts the tag slug from a URL path
- `isTagPage(pathname)`: Determines if a given pathname represents a tag page

**Matching Strategy:**

- Tags are matched by slug across languages (e.g., both English and Spanish might use the slug "security" even though titles differ)
- If no match is found, the system falls back to the tags index page for that language

### 2. Enhanced i18n Module (`src/i18n/i18n.ts`)

Added `getLocalePathsEnhanced()` function that:

1. Detects if the current page is a tag page
2. If yes, uses the Tag Locale Service to generate smart paths
3. If no, uses the standard `getLocalePaths()` behavior

This function is used by language switcher components and the Layout component for alternate language links.

### 3. Updated Components

**Components updated to use `getLocalePathsEnhanced()`:**

- `src/i18n/components/LocaleSelect.astro` - Dropdown language switcher
- `src/i18n/components/LocaleSelectSingle.astro` - Simple two-language switcher  
- `src/layouts/Layout.astro` - Generates `<link rel="alternate">` tags for SEO

## Implementation Details

### Tag Matching Logic

Tags are stored in `src/data/tags/[lang]/[tagname].md` with frontmatter like:

```markdown
---
title: security
---
```

The slug is generated from the filename (e.g., `security.md` → slug: `security`). Tags with the same slug across languages are considered equivalent, even if their titles differ.

### Fallback Behavior

When a tag doesn't exist in the target language:

1. **Path**: Redirects to `/[lang]/tag` (tags index page)
2. **UX**: User lands on the tags index where they can browse available tags
3. **SEO**: Alternate language links point to appropriate pages

### URL Pattern Detection

The system recognizes tag pages using the pattern:

```regex
/^\/[a-z]{2}(?:-[a-z]{2})?\/tag\/([^/]+)(?:\/|$)/i
```

This matches:

- `/en/tag/security`
- `/es/tag/seguridad`
- `/en/tag/security/page/2` (paginated)

But not:

- `/en/tag` (tags index)
- `/en/tag/` (tags index with trailing slash)

## User Experience

### Scenario 1: Tag Exists in Both Languages

- User on: `/en/tag/security`
- Switches to Spanish
- Lands on: `/es/tag/security` (equivalent Spanish tag page)

### Scenario 2: Tag Only Exists in Source Language

- User on: `/en/tag/niche-topic`
- Switches to Spanish (tag doesn't exist in Spanish)
- Lands on: `/es/tag` (Spanish tags index)
- Can browse all available Spanish tags

## Technical Benefits

1. **Type Safety**: Full TypeScript support with strict typing
2. **Performance**: Caching at the service level reduces repeated lookups
3. **SEO**: Proper alternate language link tags for search engines
4. **Maintainability**: Clean separation of concerns with dedicated service
5. **Extensibility**: Easy to extend for category pages or other content types

## Testing

The solution includes unit tests in `src/core/tag/tag-locale.service.test.ts` covering:

- Tag slug extraction from various URL patterns
- Tag page detection logic
- Edge cases (index pages, non-tag pages, etc.)

Note: Full integration tests that use `astro:content` must be run in the Astro build environment.

## Usage Example

To use the enhanced language switching in a component:

```astro
---
import { getLocalePathsEnhanced } from "@/i18n";

// This works for both tag pages and regular pages
const paths = await getLocalePathsEnhanced(Astro.url);
---

<select>
  {paths.map(({ lang, path }) => (
    <option value={path}>{lang}</option>
  ))}
</select>
```

## Future Enhancements

Possible improvements:

1. **Smart Suggestions**: When a tag doesn't exist, suggest similar tags in the target language
2. **Tag Translation Mapping**: Explicit mapping file for semantic tag equivalents
3. **Category Pages**: Apply the same pattern to category page language switching
4. **Analytics**: Track language switch patterns to improve content strategy

## Files Changed

- **New Files:**
  - `src/core/tag/tag-locale.service.ts` - Core tag localization logic
  - `src/core/tag/tag-locale.service.test.ts` - Unit tests

- **Modified Files:**
  - `src/core/tag/index.ts` - Export new service
  - `src/i18n/i18n.ts` - Add `getLocalePathsEnhanced()` function
  - `src/i18n/components/LocaleSelect.astro` - Use enhanced function
  - `src/i18n/components/LocaleSelectSingle.astro` - Use enhanced function
  - `src/layouts/Layout.astro` - Use enhanced function for alternate links

## Maintenance Notes

- When adding new tag-related pages (e.g., tag pagination), ensure URL patterns are detected correctly
- If changing the tag slug generation logic, update the matching logic accordingly
- Consider the fallback strategy when adding new languages

---

**Last Updated:** 2025-10-01  
**Author:** GitHub Copilot
