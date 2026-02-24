# Portfolio Application

This is the main portfolio application, built with [Astro](https://astro.build/). It showcases projects, experience, and skills.

## 🚀 Features

- **Astro 5**: High-performance static site generation.
- **Tailwind CSS 4**: Modern styling with the latest Tailwind features.
- **i18n**: Full internationalization support (English, Spanish, French).
- **View Transitions**: Smooth page transitions using Astro's native API.
- **Contact Form**: Integrated with a secure backend API.
- **Unit & E2E Testing**: Comprehensive testing suite with Vitest and Playwright.

## 🧞 Commands

All commands are run from the root of the monorepo or from this directory:

| Command | Action |
| :--- | :--- |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Build the production site to `./dist/` |
| `pnpm preview` | Preview the build locally |
| `pnpm check` | Run type checks and linting |
| `pnpm test:unit` | Run unit tests with Vitest |
| `pnpm test:e2e` | Run end-to-end tests with Playwright |

## 📁 Structure

- `src/components/`: Astro and React components.
- `src/content/`: Content collections for articles and projects.
- `src/layouts/`: Page layouts.
- `src/pages/`: Application routes.
- `src/i18n/`: Internationalization logic and translations.

## 📄 License

See the root `README.md` for license information.
