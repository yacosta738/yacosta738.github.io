# Portfolio Application Guide

This document provides a comprehensive overview of the `portfolio` application, covering its architecture, tech stack, and key features.

## 1. Overview

The portfolio is a modern, content-driven static site built with [Astro](https://astro.build/). It is designed to be highly performant by shipping zero JavaScript by default, while also being easily deployable to various platforms thanks to a dynamic adapter system.

## 2. Tech Stack

-   **Framework**: [Astro](https://astro.build/) for templating and page generation.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling, with minimal custom CSS.
-   **Content**: [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) for type-safe Markdown and JSON data management.
-   **Testing**:
    -   [Playwright](https://playwright.dev/) for End-to-End (E2E) testing.
    -   [Vitest](https://vitest.dev/) for unit and component testing.

## 3. Architecture

The project follows the principles of **Clean Architecture** and **Atomic Design** to ensure a strong separation of concerns and a scalable component library.

### Architectural Layers

1.  **Data Layer (Entities)**
    -   **Location**: `src/data/**/*.json` and `src/content/`
    -   **Description**: This is the core of the application, containing all raw data for the resume, blog posts, and projects. The shape of this data is strictly defined by TypeScript interfaces in `src/lib/resume-types.ts` and validated by Zod schemas in `src/content/config.ts`.

2.  **Business Logic (Use Cases)**
    -   **Location**: `src/lib/`, `src/core/`, and `src/services/`
    -   **Description**: This layer contains the logic to process, parse, and prepare data for the UI. It also includes the service layer (`src/services/`) responsible for communicating with the external API worker for features like the contact and newsletter forms.

3.  **Presentation Layer (UI)**
    -   **Location**: `src/components/`, `src/layouts/`, `src/pages/`
    -   **Description**: This layer is responsible for rendering the UI. It is organized using Atomic Design principles:
        -   **Atoms (`src/components/atoms/`)**: The smallest, indivisible UI elements (e.g., buttons, section wrappers).
        -   **Organisms (`src/components/organisms/`)**: More complex components that correspond to full sections of the site (e.g., the Experience section), composed of multiple atoms.
        -   **Layouts (`src/layouts/`)**: The overall page structure, arranging organisms into a cohesive whole.
        -   **Pages (`src/pages/`)**: The final pages that fetch data and pass it down to the appropriate layout and components.

## 4. Content Management

All content is managed through Astro Content Collections, configured in `src/content/config.ts`. This provides:
-   **Type Safety**: Ensures that all Markdown frontmatter and JSON data adhere to a defined schema.
-   **Data Validation**: Automatically validates content at build time, preventing errors.
-   **Easy Querying**: Provides a simple API for fetching and filtering content within Astro pages.

## 5. Styling

-   **Tailwind CSS** is the primary method for styling. Utility classes are preferred over custom CSS.
-   **Global Styles**: Minimal global styles are located in `src/styles/global.css`.
-   **Component Styles**: When custom CSS is necessary, it is scoped directly within Astro components using `<style>` blocks.

## 6. Key Features

-   **Internationalization (i18n)**: The site supports multiple languages (English and Spanish). The logic in `src/i18n/` handles language detection and path generation. A custom solution detailed in `docs/tag-language-switching-solution.md` provides smart fallbacks for tag pages.
-   **API Integration**: The portfolio communicates with a separate Cloudflare Worker for handling form submissions. This is managed by a dedicated, testable service layer in `src/services/`, ensuring the frontend is decoupled from the API backend.
-   **Dynamic Deployment**: The application can be deployed to multiple platforms (Node.js, Vercel, Cloudflare) by setting the `DEPLOYMENT_ADAPTER` environment variable. This is configured in `astro.config.mjs` and documented in `docs/deployment-adapters.md`.

## 7. How to Run Locally

1.  Navigate to the portfolio directory:
    ```bash
    cd apps/portfolio
    ```
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

The application will be available at `http://localhost:4321`.
