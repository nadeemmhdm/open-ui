# Open UI Architecture

## 1. Product boundary

Open UI is an installable Windows desktop application. React renders the editor interface inside Tauri's webview; Rust owns privileged desktop capabilities. A browser deployment is not the primary product and editor code must not assume a remote backend exists.

## 2. Major layers

### Desktop shell (Tauri / Rust)

Responsibilities: application windows, native file dialogs, safe project read/write, atomic saves, credential integration, application settings, controlled network/provider bridge where required, update/build integration, and other explicitly approved OS capabilities.

The native layer exposes a small typed command surface. It does not provide a generic `exec`, unrestricted file read/write, or generic proxy command.

### Editor application (React / TypeScript)

Responsibilities: workspace chrome, canvas, selection model, layer tree, components/assets, inspector, command palette, keyboard shortcuts, history, responsive viewport controls, source views, AI review UI, notifications and settings.

### Document engine

The document engine is framework-neutral. It owns nodes, parent/child relationships, properties, style tokens, responsive overrides, component definitions/instances, asset references, metadata and schema migrations.

Every editor mutation is expressed as a command/operation. This enables deterministic undo/redo, AI-generated changes, snapshots, collaboration-ready evolution, tests and future plugin hooks.

Example conceptual node:

```json
{
  "id": "node_01",
  "type": "button",
  "name": "Primary CTA",
  "props": { "text": "Get Started" },
  "style": {
    "display": "inline-flex",
    "background": "{color.primary}",
    "borderRadius": "{radius.md}"
  },
  "responsive": {},
  "children": []
}
```

Unknown or executable fields are rejected by schema validation.

### Canvas renderer

The canvas converts the Open UI document model to a visual representation. Selection overlays, guides, resize handles and editor controls live outside generated user content. Preview rendering must not expose Tauri privileges to project code.

### Exporters

Exporters consume the document model rather than scraping rendered DOM. Initial targets are semantic HTML/CSS and React/TypeScript. Export should preserve reusable components, responsive rules, tokens and accessible attributes where possible.

### AI provider layer

Providers implement a shared interface such as capability discovery, model listing, health check and structured generation. Initial adapters:

1. Local Ollama — offline-capable after the user installs/downloads a model.
2. Online Ollama-compatible provider — explicitly enabled and authenticated.

The AI layer returns proposed document operations. It cannot directly write arbitrary project files or call privileged desktop commands.

## 3. Workspace UX

The default workspace has:

- top app/command bar
- left switchable Components / Layers / Assets panel
- center infinite canvas and responsive viewport
- contextual floating selection toolbar
- right Properties inspector
- collapsible bottom Code / History / Problems panel
- dockable optional AI Assistant

Progressive disclosure is important: common controls appear first; advanced CSS/detail controls remain available without overwhelming beginners. Properties are searchable. A command palette provides keyboard-first access.

## 4. Selection and property editing

Clicking any canvas element selects its document node and synchronizes the Layers panel and Inspector. The Inspector is schema-driven and supports:

- identity/name
- content
- layout and constraints
- width/height/min/max
- margin/padding/gap
- typography
- fill/color/gradient/background image
- border/radius/shadow/effects
- responsive overrides
- interaction states
- accessibility
- component/instance properties

Multi-selection shows common properties and batch operations. Every change goes through the command history.

## 5. Persistence

Projects are local-first. Saves should be atomic (temporary file + replace) and recoverable. Autosave/recovery state is separate from explicit user saves. The portable `.openui` format should be versioned and migration-aware; credentials and machine-specific secrets are forbidden from the document.

## 6. Offline behavior

Without network connectivity the user can open/create/edit/save projects, use installed templates/assets, preview, export source and use a reachable local Ollama model. Online-only actions must fail clearly without degrading the editor.

## 7. Performance targets

- Avoid rerendering the entire canvas for a single property change.
- Normalize document state and subscribe at node/property granularity.
- Virtualize long layer/component lists.
- Debounce expensive layout/source regeneration while keeping direct manipulation responsive.
- Keep history operations compact and bounded with checkpoints.
- Lazy-load Monaco, AI and optional heavy panels.

## 8. Accessibility

The Open UI application itself should support keyboard navigation, visible focus, scalable UI, accessible labels and Windows high-contrast considerations. Generated interfaces receive separate accessibility diagnostics.
