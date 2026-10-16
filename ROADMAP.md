# Open UI Roadmap

This roadmap is directional. Security, data integrity and editor fundamentals take priority over feature count.

## Milestone 0 — Foundation

- Tauri 2 + React + TypeScript + Vite desktop scaffold
- Windows development/build configuration
- application shell and responsive desktop workspace
- document schema and IDs
- editor command/history system
- basic local settings and project persistence boundary
- security capability configuration
- lint/typecheck/test/Windows build CI

## Milestone 1 — Visual editor MVP

- canvas with zoom/pan
- element selection and selection overlays
- Layers / Components / Assets panels
- inspector-driven property editing
- text, container, section, button, image, input and basic form elements
- flex and grid layout controls
- spacing, sizing, typography, color, backgrounds, borders, radius and shadow
- undo/redo, duplicate, delete, lock/hide, group and keyboard shortcuts
- desktop/tablet/mobile responsive overrides
- autosave and crash recovery

## Milestone 2 — Components and design system

- reusable components and instances
- component variants and exposed properties
- design tokens
- local component/template packs
- asset manager
- gradients and image fills
- interaction states
- rulers, guides, smart snapping and alignment/distribution
- command palette and property search

## Milestone 3 — Preview and export

- isolated live preview
- semantic HTML/CSS exporter
- React + TypeScript exporter
- source preview with Monaco
- responsive preview matrix
- accessibility diagnostics
- export validation and project problems panel

## Milestone 4 — AI, offline first

- provider abstraction
- local Ollama health/model discovery
- prompt-to-layout via validated document operations
- selection-aware edit/redesign
- generate copy/component/layout variants
- responsive and accessibility suggestions
- change preview, accept/reject and undo
- explicit online Ollama-compatible provider switch
- OS-backed secret storage
- visible network/privacy state

## Milestone 5 — Production desktop experience

- Windows installer
- signed releases when signing infrastructure is configured
- authenticated updater
- recovery center and snapshot management
- performance profiling for large documents
- migration framework for `.openui` projects
- import/export polish
- comprehensive keyboard/accessibility pass

## Later candidates

These should not destabilize the core editor: plugin SDK, additional exporters/frameworks, design-to-code import helpers, local Git integration, optional team/collaboration architecture, community template registry, and advanced animation/timeline tooling.
