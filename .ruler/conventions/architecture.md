# Architecture

## 1. Core Principles

This project's architecture is designed to be maintainable, performant, and
easy to extend. It pragmatically adapts classical software design
principles to the context of a content-driven static site built with Astro.

Our approach is guided by:

- **Clean Architecture:** Ensure a strong separation of concerns between
  data, business logic, and the UI framework.
- **Atomic Design:** Create a scalable and consistent component library.
- **SOLID Principles:** Write code that is understandable, robust, and
  easy to maintain.

## 2. Architectural Model: A Pragmatic Hybrid

We use a layered architecture that flows in one direction. Higher-level
layers (for example: Data) have no knowledge of lower-level layers
(for example: the UI). This keeps core data and logic independent of the
presentation framework.

`[ Layer 1: Data (Entities) ] <--- [ Layer 2: Business Logic (Use Cases) ]
<--- [ Layer 3: Presentation (UI) ]`

### Layer 1: Data (Entities)

This is the innermost layer, representing the core data structures of the
portfolio.

- **Location:**
  - `src/data/**/*.json`: The canonical source of all resume content.
  - `src/lib/resume-types.ts`: TypeScript interfaces defining the data
    shape (the contract).
  - `src/content/config.ts`: Zod schemas that validate the data and ensure
    content integrity at build time.
- **Responsibility:** Define "what" the application is about (resume,
  skills, projects, etc.).
- **Rules:** This layer is pure data and types. It has zero dependencies
  on other layers.

### Layer 2: Business Logic (Use Cases)

This layer contains logic that operates on the data.

- **Location:**
  - `src/lib/**/*.ts`: Utility functions for parsing, mapping, or
    processing data (for example: `resume-parser.ts`).
  - `src/i18n/**/*.ts`: Cross-cutting code that provides content in
    multiple languages.
- **Responsibility:** Implement business rules and prepare data for the
  presentation layer.
- **Rules:** Depends only on the Data layer. It has no knowledge of
  Astro or UI components.

### Layer 3: Presentation (UI)

This is the outermost layer, responsible for rendering the UI. It is
organized using the principles of **Atomic Design**.

- **Location:**
  - `src/components/`
  - `src/layouts/`
  - `src/pages/`
- **Responsibility:** Display data to the user.

#### Atomic Design Implementation

- **Atoms (`src/components/atoms/`):**
  The smallest, indivisible UI elements. They are highly reusable and
  have no specific business context.

  *Example: `Section.astro` provides a consistent wrapper for a titled
  content block.*

- **Organisms (`src/components/organisms/`):**
  For this project's scale, we combine the concepts of "Molecules" and
  "Organisms". These complex components correspond to a full section of
  the CV. They are composed of Atoms and render a specific slice of
  data.

  *Example: `Experience.astro` takes an array of `Work` objects and
  renders the entire experience section.*

- **Templates (`src/layouts/`):**
  Define the overall structure and layout of a page. They arrange
  Organisms into a cohesive whole.

  *Example: `Layout.astro` includes the header, footer, and the main
  content area.*

- **Pages (`src/pages/`):**
  The final, concrete instances of templates. They fetch the data (from
  the Business Logic or Data layer) and pass it down to Templates and
  Organisms.

  *Example: `src/pages/[lang]/index.astro` fetches the resume data and
  renders the main portfolio page.*

## 3. SOLID Principles in Practice

- **Single Responsibility Principle (SRP):**
  - Each Astro component has one reason to change (for example,
    `Skills.astro` only manages the display of skills).
  - Each TypeScript utility has a single job (for example,
    `collection.entity.ts` only deals with parsing entity IDs).

- **Open/Closed Principle (OCP):**
  - The architecture is open to extension but closed for modification.
    To add a new CV section, create a new Organism component and add it
    to the Page; do not modify existing section components.

- **Liskov Substitution Principle (LSP):**
  - While less relevant in a non-inheritance-heavy project, the
    principle is respected by ensuring components with similar props
    behave in a predictable and substitutable manner.

- **Interface Segregation Principle (ISP):**
  - Components only depend on the data they need. For example,
    `Experience.astro` receives `work[]` as a prop, not the entire
    `Resume` object. This prevents unnecessary coupling.

- **Dependency Inversion Principle (DIP):**
  - This is fundamental to our Clean Architecture approach. The
    Presentation layer depends on data *abstractions* (the TypeScript
    types in `src/lib/resume-types.ts`), not on the concrete
    implementation of data fetching. The Data layer knows nothing about
    the UI.
