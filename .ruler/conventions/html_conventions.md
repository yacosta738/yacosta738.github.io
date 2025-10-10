# HTML Conventions

> Guidelines for writing semantic, accessible, and maintainable HTML.

## Semantic HTML

- Always use HTML elements for their intended purpose. Use `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>` to structure pages.

## Accessibility

- Ensure all interactive elements are accessible. Use `aria-*` attributes where necessary.
- Images must have descriptive `alt` attributes.

## DOM Manipulation

When manipulating the DOM with JavaScript, prefer modern and safe APIs:

- Find elements with `.querySelector()` and `.closest()`.
- Manipulate classes with `.classList`.
- Set text content with `.textContent`.
- To insert HTML, use `.setHTML()` (when available) or a sanitization library to prevent XSS.
- Add/remove elements with `.append()`, `.prepend()`, `.before()`, `.after()`.
