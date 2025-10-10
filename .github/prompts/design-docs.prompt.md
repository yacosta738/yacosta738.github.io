---
mode: agent
---

# New CV Section Guide & Checklist

## Prompt Template (Role, Task, Context, Expectations)

```markdown
Role: Act as a senior software engineer on this Astro portfolio project.

Task: Add a new section to the CV (e.g., "Hobbies," "Memberships"). Follow the
established project conventions to ensure the new section is integrated
correctly, styled properly, and uses the i18n system.

Required Context:
- Section Name: [e.g., "Hobbies"]
- Data required for each entry: [e.g., "name: string", "description: string"]

Expectations and Goals:
Follow this checklist to implement the new section. This lightweight process
replaces the need for a formal design document.

### Implementation Checklist

1.  **Define Data Structure:**
    - [ ] Open `src/lib/resume-types.ts`.
    - [ ] Add a new TypeScript interface for the section's data (e.g.,
      `export interface Hobby { ... }`).
    - [ ] Add the new array to the main `Resume` interface (e.g.,
      `hobbies: Hobby[];`).

2.  **Update Zod Schema for Content Collections:**
    - [ ] Open `src/content/config.ts`.
    - [ ] Create a new Zod schema for the section's data object (e.g.,
      `const hobbySchema = z.object({ ... });`).
    - [ ] Add the new schema to the `resumeSchema` (e.g.,
      `hobbies: z.array(hobbySchema).optional(),`).

3.  **Add Data:**
    - [ ] Open `src/data/resume/en/resume.json` (and other languages like
      `es/resume.json`).
    - [ ] Add the new section's data array (e.g., `"hobbies": [ ... ]`),
      ensuring it matches the structure defined in the previous steps.

4.  **Create Astro Component:**
    - [ ] Create a new file: `src/components/organisms/[SectionName].astro`
      (e.g., `Hobbies.astro`).
    - [ ] The component should accept the section's data as a prop (e.g.,
      `const { hobbies } = Astro.props;`).
    - [ ] Use existing components like `Section.astro` for the overall
      structure.
    - [ ] Use Tailwind CSS utilities for styling, following the style of other
      sections.

5.  **Add Internationalization (i18n) Keys:**
    - [ ] Open `src/i18n/ui.ts`.
    - [ ] Add a key for the new section's title (e.g.,
      `section.hobbies: "Hobbies"`).
    - [ ] Add translations for all supported languages.

6.  **Integrate into Layout:**
    - [ ] Open the main page where sections are rendered (e.g.,
      `src/pages/[lang]/index.astro` or a layout file).
    - [ ] Import the new component:
      `import Hobbies from '@/components/organisms/Hobbies.astro';`.
    - [ ] Use the i18n key to get the translated title.
    - [ ] Render the component, passing the data from the resume object:
      `<Hobbies hobbies={resume.hobbies} />`.

7.  **Verification:**
    - [ ] Run `pnpm run dev` to check the new section visually.
    - [ ] Run `pnpm run check` to ensure no linting or type errors.
    - [ ] Run `pnpm run build` to confirm the project builds successfully.

Authoring Guidelines:
- Follow the existing code style and project structure precisely.
- Do not introduce new dependencies.
- Ensure all new text is added via the i18n system.
```

## Usage Example

```markdown
Role: Act as a senior software engineer on this Astro portfolio project.

Task: Add a new "Certifications" section to the CV.

Required Context:
- Section Name: "Certifications"
- Data required for each entry: "name: string", "issuer: string",
  "date: string", "url: string"

Expectations and Goals:
- Follow the 7 steps in the checklist to implement the "Certifications"
  section.
```
