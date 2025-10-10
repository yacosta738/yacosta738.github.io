---
mode: agent
---

# Project Overview & Onboarding Prompt

## Prompt Template (Role, Task, Context, Expectations)

```markdown
Role: Act as a senior engineer who is an expert on this Astro portfolio
codebase.

Task: Provide a concise and structured overview of the project. This should
serve as a quick onboarding guide for a new developer or as a refresher.

Required Context:
- Specific area of interest (optional): [e.g., "i18n system", "data flow for
  the resume", "styling approach"]

Expectations and Goals:
Generate a summary covering the following key areas:

1.  **Project Purpose & Core Technology:**
    - What is this project? (A personal portfolio and CV).
    - What is the main framework? (Astro).
    - What is the primary goal of the architecture? (Static site generation,
      performance, minimal client-side JS).

2.  **Key Directories:**
    - `src/components`: Reusable Astro components.
        - `sections`: Components for each major part of the CV (Experience,
          Education, etc.).
    - `src/data`: The raw content for the site, primarily JSON files. This is
      where the CV data lives.
    - `src/content`: Astro Content Collections configuration (Zod schemas for
      data validation).
    - `src/lib`: Core TypeScript logic (e.g., resume parser, utility
      functions).
    - `src/i18n`: Internationalization logic, UI string translations, and
      routing.
    - `src/styles`: Global CSS. Project primarily uses Tailwind CSS.
    - `src/pages`: The actual pages of the site, defining routes.

3.  **Data Flow (The Resume):**
    - Explain the flow:
        1. Raw data is in `src/data/resume/[lang]/resume.json`.
        2. Schema is validated by Zod in `src/content/config.ts`.
        3. The main page (`src/pages/[lang]/index.astro`) imports and parses
           this data.
        4. Data is passed as props to the section components in
           `src/components/organisms/`.

4.  **Styling Approach:**
    - The project uses **Tailwind CSS** for styling.
    - Global styles are minimal and located in `src/styles/global.css`.
    - Component-specific styles should be avoided in favor of Tailwind
      utilities.

5.  **Common Development Commands:**
    - `pnpm install`: Install dependencies.
    - `pnpm dev`: Start the local development server.
    - `pnpm check`: Run the linter (Biome) and TypeScript compiler
      (`astro check`).
    - `pnpm test`: Run the unit tests with Vitest.
    - `pnpm build`: Build the production-ready static site to the `dist/`
      directory.

6.  **Key Project Conventions:**
    - **Internationalization is mandatory:** All user-facing text must go
      through the i18n system in `src/i18n/ui.ts`.
    - **Minimal JavaScript:** Use Astro islands (`client:*` directives) only
      when absolutely necessary for interactivity.
    - **Data is separate from code:** Never hardcode resume data in components.
    - **Follow the linter:** Biome enforces code style.
```

## Usage Example

```markdown
Role: Act as a senior engineer who is an expert on this Astro portfolio
codebase.

Task: Provide a concise and structured overview of the project.

Required Context:
- Specific area of interest: "data flow for the resume"

Expectations and Goals:
- Generate the full overview, but provide extra detail for the "Data Flow"
  section.
```
