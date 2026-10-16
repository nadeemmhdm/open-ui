# Open UI

Open UI is an open-source, Windows-first visual UI builder for websites, web applications, and application interfaces. It is a real installable desktop application—not a hosted website—and is designed to remain useful with or without an internet connection.

> Status: early development / pre-alpha. APIs, project format, and editor behavior may change.

## Vision

Make professional interface design and front-end generation accessible from one fast desktop workspace: visually compose responsive interfaces, inspect and edit every element, use reusable components and design tokens, preview breakpoints, ask an optional AI assistant for changes, and export maintainable source code.

## Core principles

- Desktop-first: native Windows packaging with Tauri 2.
- Local-first: projects, history, assets, and editor state remain local by default.
- Offline-capable: the editor and core design workflow do not require an account or network.
- Optional AI: local Ollama and an explicitly enabled online Ollama-compatible provider.
- Editable output: AI never replaces the visual editor; generated UI becomes normal selectable elements.
- Open source: transparent architecture, contribution process, and security policy.
- Privacy by default: no project content is uploaded unless the user explicitly invokes an online feature.
- Accessible and responsive: breakpoint-aware editing and accessibility checks are first-class features.

## Planned editor experience

Open UI uses a professional desktop workspace with a component/asset panel, layer tree, central canvas, context toolbar, properties inspector, code panel, history, and optional AI assistant. Selecting an element exposes its name, content, dimensions, constraints, spacing, typography, colors, backgrounds, images, borders, radius, effects, responsive behavior, states, accessibility properties, and component settings.

### Recommended capabilities

- Drag-and-drop component insertion and direct canvas selection
- Multi-select, group, lock, hide, duplicate, copy/paste and keyboard shortcuts
- Flexbox, CSS Grid, absolute/free positioning and responsive constraints
- Desktop/tablet/mobile custom breakpoints
- Reusable components, variants, slots and component instances
- Design tokens for colors, typography, spacing, radius and shadows
- Local asset library for images, SVGs and project resources
- Gradient/image/background editor
- Hover, focus, active and disabled states
- Undo/redo command history and crash-recovery autosave
- Project snapshots/version history
- Zoom, pan, rulers, guides, smart snapping and alignment tools
- Accessibility checks including contrast, labels and keyboard-focus hints
- Live preview in isolated/sandboxed renderer
- HTML/CSS and React/TypeScript export targets
- Source preview/editing with Monaco Editor
- Portable `.openui` project format
- Template and component library that can work from locally installed packs
- Command palette and searchable actions
- Optional plugin API after the core editor format stabilizes

## AI modes

### Local / offline

Open UI can connect to a user-managed local Ollama server, normally `http://127.0.0.1:11434`. Once a compatible model is installed, supported AI workflows can operate without internet access.

### Online

An online Ollama-compatible provider can be enabled explicitly. Online mode is opt-in, clearly indicated in the UI, and should never silently send project data. API credentials must be stored through an operating-system credential mechanism rather than inside project files.

AI requests produce validated Open UI document operations/schema rather than injecting unrestricted executable HTML or JavaScript into the editor. Users can review, apply, undo, and edit AI-generated changes like any other editor operation.

## Technology direction

- Tauri 2
- Rust native/backend layer
- React + TypeScript + Vite
- Zustand for editor/application state
- Indexed/local project persistence with a portable project representation
- Monaco Editor for source views
- Vitest for TypeScript tests
- Rust tests for native commands
- GitHub Actions for validation and Windows builds

See [ARCHITECTURE.md](ARCHITECTURE.md), [ROADMAP.md](ROADMAP.md), and [SECURITY.md](SECURITY.md).

## Security model

Open UI follows least privilege. The webview does not receive arbitrary shell access. Native commands are allowlisted and validate all inputs. File access is scoped to project/user-selected paths. Imported SVG/HTML is sanitized, preview execution is isolated, secrets are redacted from logs, and network access is visible and controllable.

Please report vulnerabilities privately according to [SECURITY.md](SECURITY.md), not through a public issue.

## Development

The application scaffold is being built on the `feature/initial-open-ui` branch. The initial milestone establishes the desktop shell, document model, editor layout, property inspector, local persistence boundary, AI provider abstraction, security policy, tests, and Windows CI/build pipeline.

Prerequisites for local development will include Node.js LTS, Rust stable, Microsoft C++ Build Tools, and the Tauri 2 Windows prerequisites.

## License

Open UI is licensed under the MIT License. See [LICENSE](LICENSE).
