# Research: Blog Post Comments

**Feature**: 001-implement-comments-in  
**Date**: 2025-10-13  
**Phase**: 0 (Research & Resolution)

## Purpose

Resolve unknowns from Technical Context and feature specification to finalize the implementation approach for embedding GitHub-based comments on blog posts.

## Research Tasks & Findings

### R1: Provider Selection (Giscus vs. Utterances)

**Decision**: Use **Giscus** (GitHub Discussions-based)

**Rationale**:

- **Threading & Reactions**: Giscus supports nested replies and emoji reactions; Utterances (GitHub Issues) only supports top-level comments.
- **Modern GitHub Integration**: GitHub Discussions is the recommended platform for community discussions; Issues are primarily for bug/task tracking.
- **Theme & Localization**: Both support theme adaptation. Giscus has better localization coverage (20+ languages) and theme customization via CSS variables.
- **Minimal Migration Risk**: Both use GitHub authentication. Giscus maps each page to a Discussion; Utterances maps to an Issue. For a portfolio site with low comment volume, either is viable, but Discussions scale better for community engagement.

**Alternatives Considered**:

- **Utterances**: Simpler (GitHub Issues-based). Rejected because limited to flat comments and Issues are semantically incorrect for blog discussions.
- **Disqus / Commento**: Third-party services with ads or paid tiers. Rejected to avoid external accounts and keep costs zero.
- **Self-hosted (e.g., Isso, Remark42)**: Requires backend infrastructure and maintenance. Out of scope per "no backend API" constraint.

**Implementation Notes**:

- Use `<script>` tag or `@giscus/react` component (if using Astro island).
- Configure via `data-*` attributes: repo, repo-id, category, category-id, mapping (pathname), theme, lang.
- Official docs: <https://giscus.app/>

---

### R2: Consent Requirement for Third-Party Widget

**Decision**: **No explicit consent required** (implicit consent via global privacy policy)

**Rationale**:

- The portfolio site's global privacy policy discloses third-party embeds (analytics, social widgets) and GitHub authentication for comments.
- Comments widget loads on user scroll (lazy-loaded), not on initial page load, reducing tracking risk.
- GitHub Discussions is a public platform; no PII is collected by the site itself.
- Regional compliance (GDPR/CCPA): The site does not target EU/EEA specifically; if required in future, a consent banner can be added globally, not scoped to this feature.

**Alternatives Considered**:

- **Explicit opt-in**: Show a "Load Comments" button; user clicks to load widget. Rejected because it adds friction and is overkill for a personal portfolio with transparent privacy policy.
- **Regional conditional consent**: Detect EU/EEA visitors and gate widget behind consent. Deferred as future enhancement if traffic patterns warrant.

**Implementation Notes**:

- Update `/docs/privacy-policy.md` (if exists) to mention GitHub Discussions comments and link to GitHub's privacy policy.
- No code changes for consent in this phase; widget loads when visible.

---

### R3: Scope of Enablement (Blog Posts Only or Projects/Case Studies?)

**Decision**: **Blog posts only**

**Rationale**:

- Blog posts are authored content designed for discussion and feedback. Comments are valuable.
- Projects/case studies are portfolio showcases; feedback is typically solicited via contact form or GitHub repo issues.
- Simplifies mapping logic: each blog post slug maps to a unique GitHub Discussion.
- Avoids clutter on non-discussion-oriented pages.

**Alternatives Considered**:

- **Enable on projects**: Rejected because project pages serve a different purpose (showcase, not discourse).
- **Configurable per page (frontmatter flag)**: Over-engineering for MVP. If future content types need comments, add frontmatter opt-in then.

**Implementation Notes**:

- Comments component is added to blog post layout only (`apps/portfolio/src/layouts/BlogPost.astro` or similar).
- No changes to project/case study layouts.

---

### R4: Lazy Loading Strategy

**Decision**: Use **Intersection Observer** to load widget when comments section scrolls into viewport

**Rationale**:

- Defers loading external script and iframe until user scrolls to comments section.
- Preserves LCP and INP by not blocking initial page load.
- Standard browser API with wide support (polyfill unnecessary for modern browsers).

**Alternatives Considered**:

- **Immediate load**: Rejected because it adds ~50–100KB of JS and iframe overhead to every page load.
- **Manual "Load Comments" button**: Adds friction; rejected per R2 rationale.

**Implementation Notes**:

- Wrap `<script>` in a container with `data-giscus-lazy` or similar.
- Use `IntersectionObserver` to inject script when container is visible.
- Reserve min-height (e.g., `min-h-[200px]`) to prevent CLS.

---

### R5: Theme Integration (Light/Dark Mode)

**Decision**: Pass site theme via `data-theme` attribute and listen to theme changes

**Rationale**:

- Giscus supports `data-theme` attribute with values like `light`, `dark`, `preferred_color_scheme`.
- Portfolio site uses CSS-first Tailwind v4 with dark mode class (`.dark` on `<html>`).
- On theme toggle, send message to Giscus iframe to update theme dynamically.

**Alternatives Considered**:

- **Static theme**: Use `preferred_color_scheme` (auto). Rejected because site has explicit light/dark toggle; widget should match.
- **Custom theme URL**: Giscus allows custom CSS theme URLs. Deferred; use built-in themes first.

**Implementation Notes**:

- Detect theme from `document.documentElement.classList.contains('dark')`.
- Map to Giscus theme: `light` or `dark` (or `noborder_light`, `noborder_dark` for cleaner look).
- On theme change, use `postMessage` to Giscus iframe:

  ```ts
  iframe.contentWindow.postMessage(
    { giscus: { setConfig: { theme: newTheme } } },
    'https://giscus.app'
  );
  ```


---

### R6: Localization

**Decision**: Pass site locale to Giscus via `data-lang` attribute; fallback to English if unsupported

**Rationale**:

- Portfolio site supports `en` and `es`.
- Giscus supports both; widget UI (placeholders, buttons) will be localized.
- If user adds more languages, Giscus fallback is acceptable for MVP.

**Implementation Notes**:

- Read current locale from Astro context or i18n config.
- Map to Giscus lang code (e.g., `en`, `es`, `fr`).

---

## Summary of Decisions

| Unknown | Decision | Rationale |
|---------|----------|-----------|
| Provider | Giscus (GitHub Discussions) | Better threading, reactions, and localization |
| Consent | Implicit (global privacy policy) | Low risk; lazy-loaded; transparent policy |
| Scope | Blog posts only | Focused on discussion-oriented content |
| Lazy Loading | Intersection Observer | Preserves Core Web Vitals; standard API |
| Theme | Dynamic via postMessage | Matches site theme toggle; Giscus built-in support |
| Localization | Pass site locale to `data-lang` | Giscus supports en/es; fallback for others |

## Next Steps (Phase 1)

- Create `data-model.md` (lightweight; mostly external entities).
- Create `contracts/` (N/A for this feature; no API).
- Create `quickstart.md` (developer guide to add comments to new blog posts).
- Update agent context with Giscus, Intersection Observer, and theme integration patterns.
