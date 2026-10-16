# Open UI Platform Integration

This stage turns the local-first editor into a production Windows desktop application.

## Native files
`.openui` is the canonical project archive. Native Open/Save/Save As must use user-selected paths only. Tauri Dialog + a narrowly scoped filesystem adapter are the intended integration. Do not grant renderer-wide filesystem access.

## AI
Local Ollama remains the default provider at `127.0.0.1:11434`. Cloud/API-compatible providers are opt-in. AI responses must become validated structured document operations and must be previewed before Apply. Reject leaves the document unchanged.

## Credentials
Project files and localStorage must never contain API keys. UI stores credential references only; native implementation must use OS-protected credential storage.

## Privacy
Telemetry is disabled. Offline Mode denies non-loopback requests. Cloud AI requires a separate explicit switch and a visible network state.

## Plugins
Plugins declare permissions. Network/document-write/assets-write require explicit consent. Runtime execution must be sandboxed before third-party plugins are enabled.

## Updates
Update checks may notify users. Installation requires explicit approval. Production updater remains disabled until a signing public key and HTTPS release endpoint exist.

## Release gate
A production release requires frontend typecheck/build, Windows desktop build, dependency/security review, installer smoke test, signed artifacts, recovery/open-save tests, offline-mode tests, and AI proposal safety tests.
