# Feature Specification: Blog Post Comments

**Feature Branch**: `001-implement-comments-in`  
**Created**: 2025-10-13  
**Status**: Draft  
**Input**: User description: "implement comments in the blog posts using libs like utterances or Giscus"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read and Post Comments (Priority: P1)

A site visitor reading a blog post can see an embedded comments thread for that
post and, if authenticated with the selected commenting provider, can submit a
comment that appears in the thread.

**Why this priority**: Enables direct feedback and engagement on content, the
primary goal of adding comments.

**Independent Test**: On a published blog post page, verify loading of the
comment thread, display of existing comments, authentication prompt for posting,
and successful submission of a new comment (when authenticated).

**Acceptance Scenarios**:

1. Given a published blog post page, When the user scrolls to the comments
   section, Then the comments widget loads and displays existing comments for
   that post.
2. Given the user is not authenticated with the provider, When they select
   "Add comment", Then they are prompted to authenticate and the page retains
   context to return to the same post after login.
3. Given the user is authenticated with the provider, When they submit a valid
   comment, Then the comment appears in the thread with their identity and
   timestamp.
4. Given the comments provider is unavailable, When the user scrolls to the
   comments area, Then a non-blocking error message is shown and the page
   remains usable.

---

### User Story 2 - Theming, Accessibility, and Localization (Priority: P2)

The comments UI matches the site’s theme (light/dark) and respects the current
locale for UI strings where supported. The comments area is accessible via
keyboard and screen readers.

**Why this priority**: Consistent UX reduces friction and meets accessibility
expectations.

**Independent Test**: Toggle site theme and language, verify comments widget
reflects theme and localized labels/messages; test keyboard navigation and focus
management around the comments section.

**Acceptance Scenarios**:

1. Given the site is in dark mode, When the user opens the comments section,
   Then the widget renders in a dark theme consistent with the site.
2. Given the site language is set to Spanish, When the widget loads,
   Then supported UI labels/messages appear in Spanish (if provider supports it);
   otherwise English is used as a fallback.
3. Given a keyboard-only user, When tabbing through the page,
   Then the comments section has a correct heading and tab order and visible
   focus on interactive elements.

---

### User Story 3 - Performance and Loading Behavior (Priority: P3)

The comments widget loads only when needed and does not degrade primary content
performance or layout.

**Why this priority**: Preserves Core Web Vitals and overall page experience.

**Independent Test**: Verify widget is lazy-loaded when the section becomes
visible; ensure reserved space prevents layout shift; measure that loading the
widget does not regress page performance budgets.

**Acceptance Scenarios**:

1. Given the comments section is below-the-fold, When the user scrolls it into
   view, Then the widget is injected and loads asynchronously.
2. Given the comments block has a reserved container, When the widget loads,
   Then cumulative layout shift is ≤ 0.05 for that interaction.
3. Given a typical mobile network, When the page loads,
   Then LCP remains ≤ 2.5s at p75 because comments are deferred until visible.

### Edge Cases

- Third-party widget blocked by network, content blocker, or CSP → show a
  concise, non-blocking message with an option to retry.
- User denies provider authorization → show informative message and keep read-only view.
- Post without prior comments → show an empty state encouraging first comment.
- Excessively long comment content → ensure it wraps without breaking layout.
- Consent for third-party embeds may be required by policy →
  [NEEDS CLARIFICATION: Is user consent required before loading the provider widget?]

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a comments thread on blog post pages and
  hide it on non-post pages by default. [NEEDS CLARIFICATION: Are comments
  limited strictly to blog posts, or also enabled on case studies/projects?]
- **FR-002**: Users MUST be able to read existing comments without authenticating.
- **FR-003**: Users MUST authenticate with the selected provider to post a
  comment; unauthenticated users see a clear prompt to sign in.
- **FR-004**: The system MUST lazy-load the comments widget when its container
  becomes visible and MUST NOT block primary content rendering.
- **FR-005**: The comments UI MUST adapt to site theme (light/dark) and SHOULD
  localize provider UI strings to the current site language if supported.
- **FR-006**: The system MUST present clear error states when the provider fails
  to load, allowing users to continue reading the article.
- **FR-007**: Moderation MUST be possible via the chosen provider’s native
  workflow; custom on-site moderation UI is OUT OF SCOPE.
- **FR-008**: Comment storage MUST be external to the site and preserved by the
  provider (no site database required). [Assumption]
- **FR-009**: The system MUST use a single provider for all posts and a stable
  mapping so each post’s thread remains consistent over time.
- **FR-010**: The system MUST respect user privacy choices; if consent is
  required before loading third-party embeds, the widget MUST not load until
  consent is granted. [NEEDS CLARIFICATION]

### Non-Functional Requirements

- **NFR-001 (Code Quality)**: Spec-compliant deliverables MUST pass lint/format
  checks and type validation in CI.
- **NFR-002 (Testing)**: Add or update automated tests for primary journeys
  (reading and posting a comment) and a failure state. If bug fixes arise,
  include regression tests.
- **NFR-003 (Accessibility & UX)**: Keyboard navigation, visible focus, proper
  landmark/heading for the comments section, and accessible names are required.
- **NFR-004 (Performance)**: Comments MUST be lazy-loaded; page-level Core Web
  Vitals targets stay within LCP ≤ 2.5s, INP ≤ 200ms, CLS < 0.1 for key pages.

### Key Entities *(include if feature involves data)*

- **Post**: Content page with unique identifier (slug/permalink) used to link to
  its comment thread.
- **Comment Thread**: The external thread associated with a Post; includes link
  to provider location and count metadata.
- **Comment**: User-submitted message content with author identity and
  timestamp; managed by the provider.
- **User (Provider Identity)**: Authenticated identity required to post; reading
  is public.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of users can read existing comments on supported browsers.
- **SC-002**: 80% of authenticated users can successfully post a comment on the
  first attempt (measured over a 2-week period after launch).
- **SC-003**: Comments section loads within ≤ 1s (p75) after it becomes visible
  in viewport on a typical broadband connection.
- **SC-004**: Page Core Web Vitals (mobile p75) remain within targets: LCP ≤
  2.5s, INP ≤ 200ms, CLS < 0.1.
- **SC-005**: Accessibility checks pass for the comments section (keyboard
  navigation, focus order, accessible name/heading present).

## Assumptions

- The commenting provider uses GitHub identities; moderation and storage are
  external to the site and handled through the provider’s native UI.
- No custom on-site moderation tools will be built for this scope.
- Comments are public. Private/internal comments are out of scope.

## Clarifications Needed (max 3)

1. Provider selection: [NEEDS CLARIFICATION: Choose between a GitHub Discussions
   provider or a GitHub Issues-based provider].
2. Consent requirement: [NEEDS CLARIFICATION: Must explicit user consent be
   captured before loading the third-party widget?]
3. Scope of enablement: [NEEDS CLARIFICATION: Comments on blog posts only, or
   also on projects/case studies?]

 
