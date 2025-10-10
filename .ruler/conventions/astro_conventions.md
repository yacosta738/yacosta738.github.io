# Astro Conventions

> This document outlines the conventions for working with the Astro framework, primarily for the marketing site.

## Project Structure

- Use the default `src/pages`, `src/components`, and `src/layouts` directories.
- Use `src/content` with Astro Collections for all structured content (e.g., blog posts, documentation).

## Components

- Use `.astro` components for layout, structure, and static content.
- Use framework components (e.g., Vue) only for islands of interactivity (`client:*` directives).
- Name components in `PascalCase` (e.g., `HeroBanner.astro`).
- Co-locate styles within component `<style>` blocks.

## Content Management

- Use **Astro Collections** to define schemas and validate frontmatter for all content.
- Use Markdown/MDX for all long-form content.

## Styling

- Use **Tailwind CSS** as the primary utility-first CSS framework.
- Prefer component-scoped styles. Global styles should be minimal and reside in `src/styles/global.css`.

## Performance

- Avoid shipping unnecessary JavaScript to the client. Prefer static HTML where possible.
- Use `client:load`, `client:idle`, or `client:visible` directives strategically to hydrate interactive components.
- Optimize images using Astro's built-in `<Image />` component.

## SEO

- Use the `<Head>` component to inject dynamic meta tags, canonical URLs, and `og:` tags.
- Use structured data (JSON-LD) for relevant content types like articles.
