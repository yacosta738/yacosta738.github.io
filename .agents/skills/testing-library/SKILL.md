---
name: testing-library
description: >-
  Testing Library patterns for user-centric, accessibility-driven component testing.
  Covers query priority, user events, async utilities, and practical patterns for testing
  React, Vue, and DOM components the way users interact with them. Use when the task
  involves `Testing Library`, `@testing-library/react`, `React component testing`,
  `accessible testing`, or `user-centric testing`.
license: MIT
metadata:
  version: "1.0.0"
---

## When to Use

- Testing UI components with `@testing-library/react`, `@testing-library/vue`, or
  `@testing-library/dom`.
- Choosing the right query method for elements.
- Simulating user interactions (typing, clicking, selecting).
- Testing async behavior (data fetching, loading states, debounced input).
- Writing tests that enforce and verify accessibility.

## Critical Patterns

- **Test User Behavior, Not Implementation:** Your tests should resemble how users interact with
  your app. Query by role, label, and text — not by class, test ID, or component internals.
- **Query Priority:** Follow this order strictly — it maps to accessibility:
    1. `getByRole` — accessible roles (button, textbox, heading)
    2. `getByLabelText` — form fields with labels
    3. `getByPlaceholderText` — when no label exists
    4. `getByText` — visible text content
    5. `getByDisplayValue` — current input values
    6. `getByAltText` — images
    7. `getByTitle` — title attribute
    8. `getByTestId` — LAST RESORT only
- **userEvent Over fireEvent:** Always use `@testing-library/user-event` for interactions. It
  simulates real browser behavior (focus, keydown, keyup, input) while `fireEvent` dispatches a
  single synthetic event.
- **No Implementation Details:** NEVER assert on component state, props, or internal methods. NEVER
  query by class name or component structure.
- **Async by Default:** Use `findBy` queries (which return Promises) or wrap assertions in `waitFor`
  for any UI that updates asynchronously.

## Code Examples

### Query Priority in Practice

```typescript
import { render, screen } from "@testing-library/react";
import { SignupForm } from "./SignupForm";

it("renders the signup form with accessible elements", () => {
  render(<SignupForm />);

  // BEST — getByRole with accessible name
  screen.getByRole("heading", { name: /create account/i });
  screen.getByRole("textbox", { name: /email/i });
  screen.getByRole("button", { name: /sign up/i });

  // GOOD — getByLabelText for form fields
  screen.getByLabelText(/password/i);

  // ACCEPTABLE — getByText for static content
  screen.getByText(/already have an account/i);

  // LAST RESORT — only when element has no accessible role or text
  screen.getByTestId("captcha-widget");
});
```

### User Events — The Right Way

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("calls onSearch when user types and submits", async () => {
    const user = userEvent.setup(); // Always call setup() first
    const onSearch = jest.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByRole("searchbox", { name: /search/i });

    await user.type(input, "testing library");
    await user.keyboard("{Enter}");

    expect(onSearch).toHaveBeenCalledWith("testing library");
  });

  it("clears input when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSearch={jest.fn()} />);

    const input = screen.getByRole("searchbox", { name: /search/i });
    await user.type(input, "some query");
    expect(input).toHaveValue("some query");

    await user.click(screen.getByRole("button", { name: /clear/i }));
    expect(input).toHaveValue("");
  });
});
```

### Async Testing Patterns

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProfile } from "./UserProfile";

it("loads and displays user data", async () => {
  render(<UserProfile userId="1" />);

  // findBy queries wait for the element to appear (default timeout: 1000ms)
  const heading = await screen.findByRole("heading", { name: /alice/i });
  expect(heading).toBeInTheDocument();
});

it("shows error state when fetch fails", async () => {
  server.use(
    rest.get("/api/users/1", (_req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<UserProfile userId="1" />);

  // waitFor retries the assertion until it passes
  await waitFor(() => {
    expect(screen.getByRole("alert")).toHaveTextContent(/failed to load/i);
  });
});

it("shows loading then content", async () => {
  render(<UserProfile userId="1" />);

  // Loading state appears first
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Content replaces loading
  await waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
  expect(screen.getByRole("heading", { name: /alice/i })).toBeInTheDocument();
});
```

### Testing Forms

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();
    render(<ContactForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/name/i), "Alice");
    await user.type(screen.getByLabelText(/email/i), "alice@example.com");

    // Select from dropdown — use selectOptions
    await user.selectOptions(
      screen.getByRole("combobox", { name: /topic/i }),
      "support"
    );

    // Checkbox
    await user.click(screen.getByRole("checkbox", { name: /agree to terms/i }));

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Alice",
      email: "alice@example.com",
      topic: "support",
      agreedToTerms: true,
    });
  });

  it("displays validation errors for empty required fields", async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
```

### Testing Modals and Portals

```typescript
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmDialog } from "./ConfirmDialog";

it("opens and confirms deletion", async () => {
  const user = userEvent.setup();
  const onConfirm = jest.fn();
  render(<ConfirmDialog onConfirm={onConfirm} trigger="Delete Item" />);

  // Open dialog
  await user.click(screen.getByRole("button", { name: /delete item/i }));

  // Scope assertions to the dialog
  const dialog = screen.getByRole("dialog");
  expect(within(dialog).getByText(/are you sure/i)).toBeInTheDocument();

  // Confirm
  await user.click(within(dialog).getByRole("button", { name: /confirm/i }));

  expect(onConfirm).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
```

### Accessibility Assertions

```typescript
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Navigation } from "./Navigation";

expect.extend(toHaveNoViolations);

it("has no accessibility violations", async () => {
  const { container } = render(<Navigation />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Custom Render with Providers

```typescript
// test-utils.tsx
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "./ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function AllProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything from testing-library
export * from "@testing-library/react";
export { renderWithProviders as render };
```

## Best Practices

### DO

- Use `screen` for all queries — it's always scoped to `document.body` and requires no
  destructuring.
- Use `within()` to scope queries to a specific container (dialog, list item, section).
- Use `getByRole` as your default query — it verifies accessibility and finds elements reliably.
- Use regex with case-insensitive flag (`/submit/i`) for text matching — it's resilient to casing
  changes.
- Create a custom `render` function that includes your app's providers (theme, router, query
  client).
- Use MSW (Mock Service Worker) for API mocking — it works at the network level and shares mocks
  between tests and development.

### DON'T

- DON'T use `container.querySelector(".my-class")` — it tests implementation details, not user
  behavior.
- DON'T use `fireEvent` when `userEvent` is available — `fireEvent` doesn't simulate real browser
  behavior.
- DON'T use `getByTestId` as your first choice — it means the element lacks proper accessible roles
  or labels. Fix the component first.
- DON'T assert on component state or hooks directly — test what the user sees and interacts with.
- DON'T use `act()` manually in most cases — `userEvent` and `findBy` handle it internally.
- DON'T use `waitFor` with `getBy` inside — use `findBy` instead, which is `getBy` + `waitFor`
  combined.
- DON'T wrap non-async operations in `waitFor` — it adds unnecessary complexity and hides
  synchronous bugs.
