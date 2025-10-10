# TypeScript Conventions

> This document defines the conventions and best practices for writing TypeScript code.

## General Style

- Use **Biome** for all linting and formatting. Run `pnpm check` before committing.
- Use 2 spaces for indentation and always use semicolons.

## Types

- Prefer `type` over `interface` for defining object shapes, unless you need declaration merging.
- Always provide explicit types for function arguments and return values.
- Avoid `any` at all costs. Use `unknown` for values where the type is truly unknown and perform type-checking.

## Naming Conventions

- **Files**: `kebab-case.ts`
- **Types/Interfaces**: `PascalCase`
- **Variables/Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

## Functions

- Use arrow functions (`const fn = () => {}`) by default.
- Keep functions small and focused on a single responsibility.

## Imports & Exports

- Use ES module syntax (`import`/`export`).
- Use absolute path aliases (`@/` for `src/`) configured in `tsconfig.json`.
- Prefer named exports over default exports to avoid naming inconsistencies.

## Code Quality & Safety

- Enable `strict` mode in `tsconfig.json`.
- Use `readonly` for properties and variables to enforce immutability where possible.
- Use utility types (`Partial`, `Pick`, `Omit`, etc.) to create new types from existing ones.
- Use `as const` to preserve literal types.
