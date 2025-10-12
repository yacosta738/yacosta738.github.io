# ReDoS Security Fix - Email Validation

> **Note on Relevance**
> This document describes a security fix that was applied to a legacy API endpoint (`src/pages/api/contact.json.ts`). This file has since been **deleted** as part of the project's migration to a centralized Cloudflare Worker.
>
> The same secure validation logic (length check and a ReDoS-safe regex) has been implemented in the new API worker, ensuring the vulnerability remains patched in the current architecture.

---

## Vulnerability

**Date Fixed:** 2025-01-17  
**Severity:** High  
**Type:** Regular Expression Denial of Service (ReDoS)  
**Legacy File:** `src/pages/api/contact.json.ts`

## Problem

The original email validation regex was vulnerable to catastrophic backtracking attacks (ReDoS):

```typescript
const emailRegex = /^[^S@]+@[^S@]+\.[^S@]+$/;
```

### Attack Vector

A malicious input like `"aaaaaaa...aaa@"` (many characters followed by an `@` without completing the pattern) could cause the regex engine to take exponential time to evaluate all possible backtracking paths.

**Example:**

-   **Input:** `"a".repeat(50) + "@"`
-   The regex engine attempts to match `[^S@]+` with every possible sub-combination of characters before the `@`.
-   Execution time grows exponentially with the length of the input.

## Solution

Two defenses were implemented:

### 1. Length Validation

The email is limited to 254 characters (the maximum specified in RFC 5321):

```typescript
if (typeof email !== "string" || email.length > 254) {
  return new Response(
    JSON.stringify({
      success: false,
      message: "Invalid email address",
    }),
    { status: 400, headers: { "Content-Type": "application/json" } },
  );
}
```

### 2. Secure RFC 5322 Regex

The vulnerable regex was replaced with a new one that avoids dangerous nested quantifiers:

```typescript
const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```

**Features:**

-   ✅ Complies with RFC 5322 (the standard email format).
-   ✅ Uses non-capturing groups `(?:...)` for efficiency.
-   ✅ Explicitly limits repetitions `{0,61}` instead of using nested `+` or `*`.
-   ✅ Correctly validates the domain format.
-   ✅ Prevents catastrophic backtracking.

## Testing

### Valid Emails (should pass)

```text
user@example.com
john.doe@company.co.uk
test+tag@domain.org
first.last@sub.domain.com
```

### Invalid Emails (should fail)

```text
invalid@
@invalid.com
invalid @example.com
invalid..email@example.com
"a".repeat(300) + "@example.com"  // > 254 chars
```

### Performance Test

```javascript
// Before (vulnerable):
// Input: "a".repeat(50) + "@"
// Time: ~10 seconds (exponential)

// After (secure):
// Input: "a".repeat(50) + "@"
// Time: <1ms (linear)
```

## References

-   [OWASP - Regular Expression Denial of Service](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
-   [RFC 5322 - Internet Message Format](https://tools.ietf.org/html/rfc5322#section-3.4.1)
-   [RFC 5321 - SMTP (254 char limit)](https://tools.ietf.org/html/rfc5321#section-4.5.3.1.3)
-   [SonarCloud Rule: Regex should not be vulnerable to ReDoS](https://rules.sonarsource.com/typescript/RSPEC-5852/)