# Contributing to Open UI

Thanks for helping build Open UI.

## Before contributing

Open UI is early-stage desktop software. Prefer small, reviewable changes that preserve local-first behavior, document compatibility, security boundaries and accessibility.

## Workflow

1. Search existing issues/discussions before starting duplicate work.
2. Fork or create a feature branch from the current development base.
3. Keep unrelated changes in separate commits/PRs.
4. Add or update tests for behavior changes.
5. Run formatting, linting, type checking, tests and the relevant desktop build checks.
6. Explain user-facing behavior, architecture/security impact and manual verification in the PR.

## Code principles

- TypeScript strict mode; avoid `any` at trust boundaries.
- Rust commands must use typed inputs and explicit errors.
- Do not add generic shell execution or unrestricted filesystem/network bridges.
- Keep editor document operations deterministic and undoable.
- Treat imported files and AI output as untrusted.
- Keep core editing functional without an account or network.
- Prefer accessible controls and keyboard-operable interactions.
- Avoid coupling exporters to canvas DOM implementation details.

## Commit style

Use concise conventional prefixes where practical, for example:

- `feat: add canvas selection handles`
- `fix: prevent path escape in project save`
- `docs: explain local AI setup`
- `test: cover document operation undo`
- `chore: update build workflow`

## Security reports

Do not open public issues for exploitable vulnerabilities. Follow [SECURITY.md](SECURITY.md).

## License

By contributing, you agree that your contributions are licensed under the repository's MIT License.
