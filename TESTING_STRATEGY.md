# Testing Strategy

This document outlines the testing approach for Tech Radar.

## Levels
- Unit tests: pure utilities (e.g., src/utils/radarUtils.ts)
- Component tests: visual rendering and props behavior for core components
- Smoke tests: build succeeds and app starts

## Scope
- Layout algorithms: deterministic placement and ring/quadrant mapping
- Rendering: component boundaries, props, and conditional styles
- Export: snapshot export function is invoked without throwing

## Tooling
- Preferred: Vitest + React Testing Library
- Linting: ESLint for static analysis

## Commands
- `npm run build` must succeed in CI
- Optional: add `npm test` when tests are introduced

## CI Gates
- Build must pass on pull requests
- Lint should be clean (no errors)