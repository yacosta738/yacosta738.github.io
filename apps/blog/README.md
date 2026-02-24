# Blog Application

A personal blog application built with [Astro](https://astro.build/). It shares thoughts on software development, productivity, and technology.

## 🚀 Features

- **Astro 5**: Optimized for content-heavy sites.
- **MDX Support**: Write articles using Markdown and components.
- **Search**: Integrated search functionality.
- **RSS Feed**: Automatically generated RSS feeds for multiple languages.
- **SEO Optimized**: Meta tags, sitemaps, and open graph images.

## 🧞 Commands

All commands are run from the root of the monorepo or from this directory:

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local dev server |
| `pnpm build` | Build the production site |
| `pnpm preview` | Preview the build locally |
| `pnpm check` | Run type checks and linting |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |

## 📁 Structure

- `src/content/`: Articles and external links.
- `src/pages/`: Blog routes and RSS generation.
- `scripts/`: Helper scripts for organizing articles and updating CSP.

## 📄 License

See the root `README.md` for license information.
