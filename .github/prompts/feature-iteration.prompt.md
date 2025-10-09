---
mode: agent
---

# Feature Iteration Guide

Define the task to achieve, with requirements, constraints, and success
criteria aligned to this Astro/TypeScript/Tailwind project.

Role: Senior software engineer optimizing code iteratively (performance,
refactor, reliability) without modifying existing tests.

Task: Improve or extend a feature while keeping public behavior stable and the
build clean.

Required Context (fill concretely):

- CURRENT_CODE_IMPLEMENTATION: Key files and current logic, entry points, data
  flow.
- REQUIREMENTS_OR_FEEDBACK: User story/bug, acceptance criteria, edge cases.
- CONSTRAINTS: Astro 5.13, TypeScript strict, Tailwind CSS 4, minimal client
  JS, Spanish (es-ES) UI, no section reordering unless requested.
- INTEGRATIONS: i18n (src/i18n), resume parser (src/lib/resume-*), data in
  `src/data` and `@cv` alias when applicable, skill library.
- NFRS: Performance (avoid shipping JS), accessibility basics, security (no
  secrets), maintainability.
- PUBLIC_CONTRACTS: Keep types in `src/*.d.ts` (p.ej., `src/cv.d.ts`), public
  component props and data shapes, routes and alias (`@/` → `src/*`, `@cv` →
  `./cv.json`).

Project Editing Policy:

- Minimal diffs; no unrelated reformats. Respect existing style (Biome).
- Prefer Tailwind utilities; avoid global CSS changes (only in
  `src/styles/global.css` if strictly necessary).
- Don’t introduce new dependencies unless justified; if added, pin versions
  and explain.
- Keep Spanish UI; add i18n keys if new text (`src/i18n/translations`).
- Don’t reorder sections in `pages/index.astro` unless explicitly required.
- Don’t break types; no “any”. Use explicit types and strict TS.

Acceptance Gates (must pass):

- Build: `pnpm run build` → `astro check && astro build` with no errors.
- Lint/format: `pnpm run check` (Biome) clean or with justified, fixed issues.
- Preview smoke test: `pnpm run preview`; no console errors.
- A11y basics: `alt` in images, `aria`/`title` where applicable.
- No unnecessary client JS for static content (Astro islands only when
  needed).

Expectations and Goals:

1) Analysis of Current State
   - Identify code smells, perf bottlenecks (JS shipped, heavy DOM), a11y
     gaps, type violations.
   - Clarify assumptions, edge cases, failure modes (empty data, lang
     fallbacks, missing images).

2) Improvement Plan
   - Prioritize: critical fixes → performance (SSR/static) → refactor →
     enhancements.
   - Explain trade-offs and expected impact (bundle size/JS payload,
     complexity, readability).

3) Implementation Details
   - Concrete, small changes: files touched, rationale; keep components small
     (Astro conventions).
   - Use aliases (`@/`, `@cv`), keep types strict; no API/props breaking
     changes.
   - Tailwind utilities over custom CSS; component-scoped styles if needed.

4) Performance and Reliability
   - Avoid `client:hydrate` by default; use `client:*` directives only if
     interactive.
   - Optimize images via `OptimizedPicture.astro` or Astro's `<Image>`
     component when available.
   - Batch/guard data access; add simple memoization when local and safe.

5) Error Handling and Security
   - Validate inputs/props; safe defaults; avoid throwing on expected empty
     states.
   - No secrets/PII; sanitize any dynamic HTML; prefer `textContent`.

6) Backward Compatibility
   - Keep public interfaces and data formats; provide migration notes if any
     subtle behavior change.
   - List rollback steps (git revert scope, files touched).

7) Documentation Updates
   - Inline comments near changed logic; brief notes in README or PR
     description if visible change.
   - Note known limitations and future follow-ups.

8) Verification Plan (without editing tests)
   - Run: `pnpm run build`; `pnpm run preview` (smoke).
   - Manual checks: section rendering, i18n (es-ES default), link targets,
     print/PDF if applicable.
   - Quality gates summary: Build PASS, Lint PASS, Preview OK, No console
     errors.

Authoring Guidelines:

- Make small, reversible changes; preserve clarity.
- Tie choices to project conventions (Ruler docs); avoid cleverness over
  maintainability.
- Justify significant decisions and note risks with mitigations.

Delivery Format (for PR/notes):

- Actions taken: bullet list with file paths and purpose.
- Diffs summary: what changed and why, in 3–6 bullets.
- Quality gates: Build/Lint/Preview status.
- Requirements coverage: map each requirement to Done/Deferred (+reason).
