# Open UI Release Checklist

Open UI is local-first. A production release is ready only after the exact release commit passes both frontend and Windows desktop CI jobs.

## Required checks

- `npm run typecheck`
- `npm run build`
- `npm run desktop:build`
- MSI and NSIS bundles are produced by Tauri.
- CSP remains restrictive and optional network access is explicit.
- No telemetry is enabled by default.
- `.openui` native open/save accepts only local `.openui` files and enforces the project size limit.
- Recovery/autosave is tested before publishing.

## Signing

Do not commit signing certificates, passwords, updater private keys, cloud AI keys, or tokens. Windows code-signing credentials must be supplied only through the trusted release environment. Unsigned development builds are acceptable for CI verification but must be clearly identified as development artifacts.

## Updater

Automatic silent updates are intentionally not enabled in the alpha channel. The release architecture requires an explicit user-approved update flow and signed update metadata before updater activation.

## Plugin security

Third-party plugins are future-facing. Production plugin loading must require a signed manifest, an explicit permission list, and user approval for network access. Renderer code must never gain arbitrary shell execution.

## Exporters

HTML/CSS and React + TypeScript are built in. Next.js, Vue, and Flutter remain installable/future exporter targets rather than privileged core code.
