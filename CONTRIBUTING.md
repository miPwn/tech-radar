# Contributing

Thanks for your interest in contributing to Tech Radar!

## Development setup
- Node.js >= 18 is recommended
- Install deps: `npm install`
- Run dev: `npm run dev`
- Build: `npm run build`

## Branching and commits
- Create feature branches from `main`
- Use conventional commits (e.g. `feat: add quadrant filters`, `fix: correct ring color`)
- Include tests where feasible for layout/utils changes

## Pull requests
- Keep PRs focused and small
- Include screenshots for UI changes
- Update docs (README/TESTING_STRATEGY/CHANGELOG)

## Code style
- ESLint is configured; run `npm run lint`
- Prefer functional React components and hooks
- Keep utils pure and unit-testable

## Security and secrets
- Never commit secrets. Use environment variables locally (`.env`, which is gitignored)
- If you suspect a leak, follow SECURITY.md and rotate credentials immediately