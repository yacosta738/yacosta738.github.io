---
mode: agent
---

# Project-Specific Code Documentation Prompt

## Prompt Template (Role, Task, Context, Expectations)

```markdown
Role: Act as a technical writer and senior software engineer who produces
clear, accurate, and developer-friendly documentation for this Astro-based
portfolio codebase.

Task: Generate targeted documentation for the provided code, focusing on the
aspects most relevant to this project: data schemas, Astro component props,
and core TypeScript utilities.

Required Context:
- Code to document (files, modules, or snippets): [CODE_TO_DOCUMENT]
- High-level goal of the documentation: [DOCUMENTATION_GOAL]

Expectations and Goals:

1) Data Schema Documentation (for `src/data/**/*.json` or `src/content/*.ts`)
   - Describe the purpose of each key in the JSON or Zod schema.
   - Provide a clear example of the data structure.
   - Explain any constraints, optional fields, or expected formats (e.g., date
     formats, valid URLs).
   - This is the most critical documentation for this content-driven site.

2) Astro Component Documentation (for `src/components/**/*.astro`)
   - Document the component's `Props` interface using TSDoc comments.
   - Explain what the component is responsible for rendering.
   - Provide a clear usage example, showing how to pass props.
   - Example:
     ```typescript
     // src/components/atoms/Section.astro
     interface Props {
       /** The title of the section, displayed in an `h2` tag. */
       title: string;
       /** A unique identifier for the section, used for anchor links. */
       id: string;
     }
     ```

3) TypeScript Utility Documentation (for `src/lib/**/*.ts` or `src/i18n/**/*.ts`)
   - Add TSDoc comments to all exported functions, classes, and types.
   - Explain the function's purpose, its parameters (`@param`), and what it
     returns (`@returns`).
   - Include a simple usage example (`@example`) where the logic is not
     immediately obvious.

4) i18n Key Documentation (for `src/i18n/translations/*.ts`)
   - If adding new UI text, explain the context of the new translation keys.
   - Note which component or page uses the new keys.

Authoring Guidelines:
- Be concise and practical. Focus on what a developer needs to know to use the
  code or data correctly.
- Keep documentation close to the code (TSDoc/JSDoc) or data (e.g., a README
  in `src/data/resume/`).
- Avoid generic software engineering terms that don't apply here (e.g., "API
  scaling," "microservices").
```

## Usage Example

```markdown
Role: Act as a technical writer for this Astro portfolio.

Task: Document the `OptimizedPicture.astro` component, explaining its props
and purpose.

Required Context:
- CODE_TO_DOCUMENT: Contents of `src/components/atoms/OptimizedPicture.astro`
- DOCUMENTATION_GOAL: Explain how to use this component to display responsive,
  optimized images.

Expectations and Goals:
- Provide TSDoc comments for the component's `Props`.
- Add a brief explanation of why this component is used instead of a standard
  `<img>` tag.
- Show a markdown example of how to use it within another Astro component.
```
