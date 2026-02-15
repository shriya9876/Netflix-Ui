# Contributing

Thanks for your interest in contributing to this project. Here's how to get started.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies with `npm install`
4. Create a new branch off `main` (see naming conventions below)
5. Make your changes
6. Push your branch and open a pull request

## Branch Naming

Use a prefix that describes the type of change:

- `feat/` — new features (`feat/add-search`)
- `fix/` — bug fixes (`fix/hero-banner-overflow`)
- `docs/` — documentation updates (`docs/update-readme`)

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat: add movie search functionality`
- `fix: resolve card hover flicker on mobile`
- `docs: update getting started instructions`

Keep the subject line under 72 characters. Use the body for additional context if needed.

## Code Style

- 2-space indentation (enforced by `.editorconfig`)
- Single quotes in TypeScript
- LF line endings
- No trailing whitespace
- Follow existing patterns in the codebase — consistency over personal preference

## Reporting Issues

Open an issue on GitHub with:

- A clear title describing the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS details if relevant
- Screenshots if applicable
