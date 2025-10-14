# Data Model: Blog Post Comments

**Feature**: 001-implement-comments-in  
**Date**: 2025-10-13  
**Phase**: 1 (Design)

## Overview

This feature does not introduce new database tables or backend storage. All comment data is stored externally by GitHub Discussions. The data model describes the conceptual entities and their relationships for understanding the feature, not for implementation.

## Entities

### Post (Existing)

Represents a blog post page in the portfolio.

**Attributes**:

- `slug` (string, unique): URL slug identifying the post (e.g., `"my-first-post"`).
- `locale` (string): Language code (`"en"`, `"es"`).
- `title` (string): Post title.
- `publishedDate` (Date): Publication date.

**Relationships**:

- A Post has zero or one CommentThread (mapped externally).

**Notes**:

- Existing entity in Astro content collections (`src/content/blog/`).
- No schema changes required.

---

### CommentThread (External)

Represents a GitHub Discussion thread mapped to a Post.

**Attributes**:

- `discussionId` (string, GitHub Discussion ID): Unique identifier from GitHub API.
- `discussionNumber` (number): Human-readable discussion number.
- `url` (string): Link to the discussion on GitHub.
- `commentCount` (number): Total number of comments (including replies).

**Relationships**:

- Belongs to a Post (1:1 mapping via post slug).
- Contains many Comments.

**Notes**:

- Managed entirely by GitHub Discussions; not stored in site database.
- Mapping is implicit: Giscus uses `data-mapping="pathname"` to link post slug to discussion title or URL.

---

### Comment (External)

Represents a user-submitted comment within a CommentThread.

**Attributes**:

- `commentId` (string, GitHub Comment ID): Unique identifier.
- `author` (User): GitHub user who posted the comment.
- `body` (string, Markdown): Comment content.
- `createdAt` (DateTime): Timestamp of creation.
- `updatedAt` (DateTime, optional): Timestamp of last edit.
- `reactions` (map): Emoji reactions (e.g., `{"+1": 5, "heart": 2}`).
- `replies` (array of Comment): Nested replies (threaded).

**Relationships**:

- Belongs to a CommentThread.
- May have many child Comments (replies).

**Notes**:

- Managed by GitHub Discussions.
- Rendered by Giscus widget; no site-side parsing or storage.

---

### User (External, Provider Identity)

Represents a GitHub user identity.

**Attributes**:

- `login` (string, GitHub username): e.g., `"yacosta738"`.
- `avatarUrl` (string): URL to user's GitHub avatar.
- `profileUrl` (string): Link to GitHub profile.

**Relationships**:

- Authors many Comments.

**Notes**:

- Authentication handled by GitHub OAuth via Giscus.
- No user accounts stored on the portfolio site.

---

## State Transitions

### CommentThread Lifecycle

1. **Not Created**: Post is published; no discussion exists yet.
2. **Created (Empty)**: First visitor loads comments section; Giscus creates a GitHub Discussion if configured to do so (depends on settings).
3. **Active**: Users post comments; thread grows.
4. **Locked** (optional): Discussion is locked via GitHub (no new comments).

**Trigger**: User interaction (loading widget, posting comment) or GitHub admin action.

**Site Responsibility**: None; lifecycle managed by GitHub Discussions.

---

### Comment Lifecycle

1. **Draft**: User types comment in Giscus widget (local state).
2. **Posted**: User submits; comment is created in GitHub Discussion via API.
3. **Edited**: User edits comment via GitHub (tracked by `updatedAt`).
4. **Deleted**: User or admin deletes comment on GitHub.

**Site Responsibility**: None; all CRUD operations happen via GitHub Discussions API.

---

## Validation Rules

No site-side validation. GitHub Discussions enforces:

- **Authentication**: User must be authenticated with GitHub to post.
- **Content Length**: GitHub enforces max comment length (~65K characters).
- **Spam/Abuse**: GitHub applies rate limits and moderation tools.

---

## Data Flow

```text
┌─────────────┐
│  User       │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Loads blog post page
       ▼
┌──────────────────┐
│  Astro Page      │
│  (Static HTML)   │
│  + Giscus script │
└────────┬─────────┘
         │
         │ 2. Intersection Observer detects visibility
         ▼
┌──────────────────┐
│  Giscus Widget   │
│  (iframe)        │
└────────┬─────────┘
         │
         │ 3. Fetches CommentThread via GitHub Discussions API
         ▼
┌──────────────────┐
│  GitHub          │
│  Discussions API │
└────────┬─────────┘
         │
         │ 4. Returns comments (JSON)
         ▼
┌──────────────────┐
│  Giscus Widget   │
│  (renders UI)    │
└──────────────────┘

User posts comment:
┌─────────────┐
│  User       │
│  (clicks    │
│   "Comment")│
└──────┬──────┘
       │
       │ 1. Authenticates via GitHub OAuth (if not already)
       ▼
┌──────────────────┐
│  Giscus Widget   │
│  (sends POST)    │
└────────┬─────────┘
         │
         │ 2. Creates comment via GitHub Discussions API
         ▼
┌──────────────────┐
│  GitHub          │
│  Discussions API │
└────────┬─────────┘
         │
         │ 3. Returns new comment
         ▼
┌──────────────────┐
│  Giscus Widget   │
│  (updates UI)    │
└──────────────────┘
```

---

## Storage & Persistence

- **Site**: No comment data stored. Widget configuration (repo, category ID, theme, locale) stored in code (`comments-config.ts`).
- **GitHub Discussions**: All comment data persisted by GitHub. Accessible via GitHub API or web UI.

---

## Privacy & Security

- **Data Controller**: GitHub (Microsoft) is the data controller for comment content and user identities.
- **Site Responsibility**: Disclose GitHub Discussions usage in privacy policy; link to GitHub's privacy policy.
- **User Consent**: Implicit via site-wide policy (per research.md R2).

---

## Assumptions

- A single GitHub repository is used for all discussions (e.g., `yacosta738/yacosta738.github.io` or a dedicated `yacosta738/blog-comments` repo).
- Each blog post slug maps to a unique discussion title or URL (Giscus handles mapping).
- Moderation happens via GitHub's native tools (lock, hide, delete comments).

---

## Future Extensions (Out of Scope for MVP)

- **Comment count badge**: Fetch comment count from GitHub API and display next to post title in blog list.
- **RSS feed for comments**: Subscribe to comment activity via GitHub Discussions RSS.
- **Self-hosted alternative**: Migrate to Isso or Remark42 if GitHub Discussions proves inadequate.
