export const securityPolicy={telemetry:false,rendererShell:false,remoteHtml:false,cloudByDefault:false,credentialStorage:"os",aiOperations:"structured-only",updateInstall:"explicit-approval"} as const;
export function safeProjectPath(path:string){const p=path.trim();if(!p||p.includes("\0"))return false;return /\.openui$/i.test(p)}
export function safeImportText(raw:string,maxBytes=5_000_000){return new TextEncoder().encode(raw).byteLength<=maxBytes&&!/<script[\s>]/i.test(raw)}
