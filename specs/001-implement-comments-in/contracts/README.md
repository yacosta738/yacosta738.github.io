# API Contracts: Blog Post Comments

**Feature**: 001-implement-comments-in  
**Date**: 2025-10-13  
**Phase**: 1 (Design)

## Overview

This feature does **not** introduce any new backend API endpoints. All comment-related API interactions are handled by the external Giscus widget, which communicates directly with the GitHub Discussions API.

## External APIs (Read-Only for Site)

### GitHub Discussions API (via Giscus)

Giscus acts as a client-side proxy to the GitHub Discussions API. The site does not make direct API calls; instead, the Giscus iframe manages all interactions.

**Base URL**: `https://api.github.com/graphql` (GitHub GraphQL API)

**Authentication**: User authenticates via GitHub OAuth (managed by Giscus).

**Endpoints Used** (by Giscus, not by site code):

1. **Fetch Discussion by Mapping**
   - Query: GraphQL query to find discussion by repo, category, and page mapping (e.g., pathname).
   - Response: Discussion ID, comment count, comments list.

2. **Fetch Comments**
   - Query: GraphQL query for comments in a discussion (with pagination).
   - Response: Array of comments with author, body, reactions, replies.

3. **Create Comment**
   - Mutation: GraphQL mutation to post a new comment.
   - Request: Comment body, discussion ID, parent comment ID (if reply).
   - Response: Newly created comment object.

4. **React to Comment**
   - Mutation: Add/remove emoji reaction.
   - Request: Comment ID, reaction type.
   - Response: Updated reactions list.

**Notes**:

- All interactions are client-side within the Giscus iframe.
- Site code does not parse or store API responses.
- For reference: [GitHub Discussions GraphQL API](https://docs.github.com/en/graphql/reference/objects#discussion)

---

## Site-Internal Interfaces (No HTTP API)

### CommentsConfig (TypeScript Module)

A configuration module that exports Giscus settings for the site.

**File**: `apps/portfolio/src/lib/comments-config.ts`

**Interface**:

```typescript
export interface GiscusConfig {
  repo: string;              // e.g., "yacosta738/yacosta738.github.io"
  repoId: string;            // GitHub repo ID (from Giscus setup)
  category: string;          // Discussion category name (e.g., "Blog Comments")
  categoryId: string;        // Discussion category ID (from Giscus setup)
  mapping: 'pathname' | 'url' | 'title' | 'og:title';
  reactionsEnabled: boolean; // Enable emoji reactions
  emitMetadata: boolean;     // Emit discussion metadata
  inputPosition: 'top' | 'bottom';
  theme: string;             // e.g., "light", "dark", "noborder_light"
  lang: string;              // e.g., "en", "es"
}

export const giscusConfig: GiscusConfig = {
  repo: 'yacosta738/yacosta738.github.io',
  repoId: 'REPO_ID_PLACEHOLDER',         // Replace with actual ID
  category: 'Blog Comments',
  categoryId: 'CATEGORY_ID_PLACEHOLDER', // Replace with actual ID
  mapping: 'pathname',
  reactionsEnabled: true,
  emitMetadata: false,
  inputPosition: 'bottom',
  theme: 'light', // Will be dynamically updated based on site theme
  lang: 'en',     // Will be dynamically updated based on site locale
};
```

**Usage**: Imported by Comments component to configure Giscus widget.

---

### Comments Component Props (Astro Component)

**File**: `apps/portfolio/src/components/organisms/Comments.astro`

**Props Interface**:

```typescript
interface Props {
  slug: string;       // Blog post slug (for mapping to discussion)
  locale: string;     // Current site locale (e.g., "en", "es")
  theme?: 'light' | 'dark'; // Override theme if needed
}
```

**Notes**:

- Component uses props to configure Giscus `data-*` attributes.
- No API calls from component itself; only renders `<script>` tag or client-side loader.

---

## Theme Update Message (postMessage to iframe)

When the site theme changes (user toggles dark mode), the site sends a message to the Giscus iframe to update the widget theme.

**Target**: `https://giscus.app` (Giscus iframe origin)

**Message Format**:

```typescript
interface GiscusSetConfigMessage {
  giscus: {
    setConfig: {
      theme: string; // e.g., "light", "dark"
    };
  };
}
```

**Example**:

```typescript
const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
iframe?.contentWindow?.postMessage(
  {
    giscus: {
      setConfig: {
        theme: 'dark',
      },
    },
  },
  'https://giscus.app'
);
```

**Notes**:

- This is a one-way message (site → iframe).
- No response expected; widget updates theme internally.

---

## Summary

- **No backend API**: All comment operations via GitHub Discussions API (proxied by Giscus).
- **Site interfaces**: TypeScript config module and Astro component props.
- **External communication**: postMessage for theme updates only.
