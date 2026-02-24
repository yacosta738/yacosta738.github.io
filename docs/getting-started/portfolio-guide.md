# Portfolio Application Guide

This document provides an overview of the `portfolio` application within the monorepo.

## 1. Overview

The portfolio is a modern, content-driven static site built with [Astro](https://astro.build/). As part of our monorepo transition, the portfolio app has been streamlined to focus on routing and page configuration, while leveraging shared components and logic from the `shared` package.

## 2. Tech Stack

- **Framework**: [Astro 5](https://astro.build/) using the new Content Layer API.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) via the `shared` package.
- **Content**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) powered by the `glob` loader pointing to shared data.
- **Testing**:
    - [Playwright](https://playwright.dev/) for E2E testing.
    - [Vitest](https://vitest.dev/) for unit testing.

## 3. Architecture (Monorepo)

The portfolio follows a "thin app" pattern where UI components and business logic are imported from `@packages/shared`.

### Key Locations

1. **Pages & Routing**: `apps/portfolio/src/pages/`
   - Handles the actual URL structure and page-level data fetching.
2. **Content Configuration**: `apps/portfolio/src/content.config.ts`
   - Uses the `glob` loader to pull content from `../../packages/shared/src/data/`.
3. **Shared Resources**:
   - **Components**: Imported from `@packages/shared/components/`.
   - **Layouts**: Imported from `@packages/shared/layouts/`.
   - **Logic**: Imported from `@packages/shared/lib/` and `@packages/shared/services/`.

## 4. Content Management

All content is managed centrally in `packages/shared/src/data/`. This includes:
- **Resume**: Professional experience, education, and skills.
- **Articles**: Markdown and MDX files for the blog.
- **Projects**: Metadata for showcased projects.

The `portfolio` app uses its own `content.config.ts` to define how it consumes this shared data, providing type safety and validation at build time.

## 5. Styling

Styling is centralized in `packages/shared/src/styles/`. The portfolio app imports the global CSS and uses Tailwind CSS 4 for utility classes.

## 6. How to Run Locally

From the root of the monorepo:

1. **Start Development**:
   ```bash
   pnpm dev:portfolio
   ```
2. **Build for Production**:
   ```bash
   pnpm build:portfolio
   ```

The application will be available at `http://localhost:4321`.
