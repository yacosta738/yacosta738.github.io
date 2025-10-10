# Tag Language Switching - Visual Flow Diagram

## System Architecture

```text
┌─────────────────────────────────────────────────────────────────────┐
│                         User Action                                  │
│           (Clicks language switcher on tag page)                     │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              LocaleSelect / LocaleSelectSingle Component             │
│                (Language switcher component)                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                   getLocalePathsEnhanced()                           │
│                  (Enhanced i18n function)                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
             Is Tag Page?      Is Regular Page?
                    │                 │
                    ▼                 ▼
        ┌───────────────────┐  ┌──────────────────┐
        │  Tag Locale       │  │  Standard        │
        │  Service          │  │  getLocalePaths()│
        └───────┬───────────┘  └────────┬─────────┘
                │                       │
                ▼                       │
    ┌───────────────────────┐          │
    │ Find Equivalent Tag   │          │
    │ in Target Language    │          │
    └───────┬───────────────┘          │
            │                           │
    ┌───────┴───────┐                 │
    │               │                 │
Tag Found?    Tag Not Found?          │
    │               │                 │
    ▼               ▼                 │
 /lang/tag/X   /lang/tag (index)     │
    │               │                 │
    └───────┬───────┘                 │
            │                         │
            └──────────┬──────────────┘
                       │
                       ▼
            ┌────────────────────┐
            │   Return Paths     │
            │   Array            │
            └──────────┬─────────┘
                       │
                       ▼
            ┌────────────────────┐
            │  Navigate User     │
            │  to Appropriate    │
            │  Page              │
            └────────────────────┘
```

## Tag Matching Logic

```text
Source Tag: /en/tag/security
                │
                ▼
┌───────────────────────────────────────────┐
│  Extract slug: "security"                 │
│  Extract current lang: "en"               │
│  Target lang: "es"                        │
└───────────────┬───────────────────────────┘
                │
                ▼
┌───────────────────────────────────────────┐
│  Load all tags in target language (es)   │
│  Search for tag with slug "security"     │
└───────────────┬───────────────────────────┘
                │
        ┌───────┴───────┐
        │               │
    Found?         Not Found?
        │               │
        ▼               ▼
   ┌─────────┐    ┌──────────────┐
   │ /es/tag/│    │ /es/tag      │
   │ security│    │ (fallback)   │
   └─────────┘    └──────────────┘
```

## Data Flow

```text
┌──────────────────────────────────────────────────────┐
│              Tag Data Storage                         │
│                                                       │
│  src/data/tags/                                       │
│  ├── en/                                              │
│  │   ├── security.md (title: "security")            │
│  │   ├── javascript.md (title: "javascript")        │
│  │   └── tech.md (title: "tech")                    │
│  └── es/                                              │
│      ├── security.md (title: "seguridad")           │
│      └── tech.md (title: "tecnología")              │
└──────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│        Astro Content Collections (Build Time)         │
│        - Loads and validates tag data                 │
│        - Generates slug from filename                 │
│        - Creates queryable collection                 │
└──────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│          Tag Service (Runtime - Server)               │
│          - Provides getTags(criteria)                 │
│          - Caches results for performance             │
│          - Filters by language                        │
└──────────────────────────────────────────────────────┘
                         │
                         ▼
┌──────────────────────────────────────────────────────┐
│          Tag Locale Service (Runtime)                 │
│          - Matches tags across languages              │
│          - Provides fallback paths                    │
│          - Handles edge cases                         │
└──────────────────────────────────────────────────────┘
```

## URL Pattern Recognition

```text
URL: /en/tag/security/page/2
         │   │    │       │
         │   │    │       └─ Pagination (optional)
         │   │    └───────── Tag slug (captured)
         │   └────────────── "tag" keyword (required)
         └────────────────── Language code (captured)

Regex Pattern:
/^\/[a-z]{2}(?:-[a-z]{2})?\/tag\/([^/]+)(?:\/|$)/i
     └─────┬──────┘           └──┬──┘
        Language           Tag slug (captured)
        (en, es,           (security, tech, etc.)
        zh-cn, etc.)
```

## Example Scenarios

### Scenario 1: Happy Path

```text
User Action:        View /en/tag/security → Switch to Spanish
                                  │
System Check:                     ▼
                    Tag "security" exists in Spanish? ✓
                                  │
Result:                          ▼
                    Navigate to /es/tag/security
                    
User sees:          Spanish articles tagged with "seguridad"
```

### Scenario 2: Fallback Path

```text
User Action:        View /en/tag/javascript → Switch to Spanish
                                  │
System Check:                     ▼
                    Tag "javascript" exists in Spanish? ✗
                                  │
Fallback Logic:                  ▼
                    No matching tag found
                                  │
Result:                          ▼
                    Navigate to /es/tag (tags index)
                    
User sees:          All available Spanish tags
                    Can browse and find related content
```

### Scenario 3: Multiple Languages

```text
Available languages: en, es, de
Current page: /en/tag/tech
User switches to: German

Process:
1. Check for "tech" tag in German → Not found
2. Fallback to /de/tag
3. User can browse German tags

Alternative if found:
1. Check for "tech" tag in German → Found!
2. Navigate to /de/tag/tech
3. User sees German articles with "tech" tag
```

## Component Integration

```text
┌──────────────────────────────────────────────┐
│          Layout.astro (Page Wrapper)          │
│                                               │
│  ┌─────────────────────────────────────┐     │
│  │  <link rel="alternate"> tags        │     │
│  │  (uses getLocalePathsEnhanced)      │     │
│  └─────────────────────────────────────┘     │
│                                               │
│  ┌─────────────────────────────────────┐     │
│  │         Header Component            │     │
│  │  ┌────────────────────────────┐     │     │
│  │  │  LocaleSelect Component    │     │     │
│  │  │  (uses enhanced paths)     │     │     │
│  │  └────────────────────────────┘     │     │
│  └─────────────────────────────────────┘     │
│                                               │
│  ┌─────────────────────────────────────┐     │
│  │       Page Content                  │     │
│  │    (Tag page or other page)         │     │
│  └─────────────────────────────────────┘     │
│                                               │
└──────────────────────────────────────────────┘
```

## Performance Considerations

```text
┌──────────────────────────────────────────┐
│         First Request                     │
│                                           │
│  getTags() → Database/File Read          │
│            ↓                              │
│         Cache Result                      │
│            ↓                              │
│    Return Tags (slow)                     │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│      Subsequent Requests                  │
│                                           │
│  getTags() → Check Cache                 │
│            ↓                              │
│      Return Cached Result (fast)         │
└──────────────────────────────────────────┘

Cache Key Format:
  - "all" → All tags
  - {"lang":"es"} → Tags for Spanish
  - {"lang":"en","title":"security"} → Specific search
```

---

**Note:** These diagrams use text-based ASCII art for maximum compatibility.
For presentation purposes, consider converting to proper diagrams using tools
like Mermaid, PlantUML, or draw.io.
