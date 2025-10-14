# Implementation Plan: Blog Post Comments

**Branch**: `001-implement-comments-in` | **Date**: 2025-10-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-implement-comments-in/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Add a lazy-loaded comments widget to blog post pages using a GitHub-based commenting provider (Giscus or Utterances). The widget must adapt to site theme, be accessible, and not degrade Core Web Vitals. Comments are read-only for unauthenticated users; posting requires GitHub authentication. All comment storage and moderation is external to the site.

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode enabled)  
**Primary Dependencies**: Astro 5.x, Tailwind CSS v4 (CSS-first config), Giscus (GitHub Discussions widget), @giscus/react (optional for island integration)  
**Storage**: External (GitHub Discussions or GitHub Issues via provider)  
**Testing**: Playwright (E2E for primary user journeys + smoke tests for locales), Vitest (unit/integration as needed)  
**Target Platform**: Web (SSG via Astro; static deployment)  
**Project Type**: Monorepo web app (`apps/portfolio`)  
**Performance Goals**: Core Web Vitals mobile p75: LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1; widget load ≤ 1s (p75) after visible  
**Constraints**: Lazy-load widget only when visible; no custom backend; no site database for comments  
**Scale/Scope**: Blog post pages only (content collection: `posts`); single provider for all posts; implicit consent via global privacy policy (no explicit consent widget)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Code Quality**: ✅ PASS
  - Plan references Biome for lint/format; TypeScript strict mode enabled
  - Coding conventions documented (AGENTS.md: TypeScript, Astro, Tailwind v4, HTML, UI conventions)
  - Named exports preferred; type aliases over interfaces; small, cohesive functions
  
- **Testing Standards**: ✅ PASS
  - E2E tests required: Primary P1 journey (read & post comment), failure states
  - Smoke tests for Spanish locale (secondary language)
  - Playwright for E2E; Vitest for unit/integration as needed
  - Regression tests required for any bug fixes
  
- **UX Consistency**: ✅ PASS
  - Accessibility: Keyboard navigation, visible focus, landmark/heading for comments section, accessible names
  - Theme adaptation: Light/dark mode support via widget configuration
  - Internationalization: Locale-aware labels where provider supports; fallback to English
  - Navigation/state: No layout shift (reserved container); lazy-loaded widget
  
- **Performance Requirements**: ✅ PASS
  - Core Web Vitals targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1 (mobile p75)
  - Widget load: ≤ 1s (p75) after becoming visible
  - Measurement: Lighthouse CI or documented local runs; evidence in PR
  - Lazy-loading: Widget injected only when scrolled into view

**Status**: All gates PASS. No waivers required.

## Project Structure

### Design Documents (this spec directory)

```text
specs/001-implement-comments-in/
├── spec.md              # Feature specification (already exists)
├── plan.md              # This file
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
apps/portfolio/
├── src/
│   ├── components/
│   │   └── organisms/
│   │       └── Comments.astro          # New: Comments widget component
│   ├── layouts/
│   │   └── BlogPost.astro              # Modified: Integrate Comments component
│   ├── lib/
│   │   └── comments-config.ts          # New: Provider configuration
│   ├── i18n/
│   │   ├── en.json                     # Modified: Add comment section keys
│   │   └── es.json                     # Modified: Add comment section keys
│   └── styles/
│       └── global.css                  # Modified: Add theme variables for widget
└── tests/
    └── integration/
        ├── comments.spec.ts             # New: E2E test for read & post
        └── comments-theme.spec.ts       # New: Theme adaptation test
```

**Structure Decision**: Web application structure (Astro monorepo). Comments feature lives in `apps/portfolio` with a new Comments organism component following Atomic Design principles.

---

*No complexity tracking needed: All Constitution gates pass without waivers.*

