# CSS Conventions

> Guidelines for styling, maintainability, and consistent usage of Tailwind and custom CSS.

## Framework

- Use **Tailwind CSS** as the primary styling method. Avoid writing custom CSS files when a utility class suffices.

## Methodology

- When custom CSS is unavoidable (e.g., for complex animations or third-party overrides), keep it minimal.
- Scope styles to components whenever possible (e.g., `<style scoped>` in Vue).

## Naming

- For cases where custom classes are needed, use a BEM-like naming convention (`block__element--modifier`) to avoid conflicts.

## Units

- Use `rem` for font sizes and `px` for borders.
