import type { AiProvider } from "./aiProvider";
const LOOPBACK=new Set(["127.0.0.1","localhost"]);
export function validateProvider(provider:AiProvider){const url=new URL(provider.baseUrl);if(provider.kind==="ollama-local"&&!LOOPBACK.has(url.hostname))throw new Error("Local Ollama must use loopback");if(provider.kind!=="ollama-local"&&url.protocol!=="https:")throw new Error("Cloud AI requires HTTPS");if(provider.kind!=="ollama-local"&&!provider.credentialId)throw new Error("Cloud AI requires an OS credential reference");return provider}
export function providerStatus(provider:AiProvider){return{enabled:provider.enabled,network:provider.kind!=="ollama-local",credentialProtected:provider.kind==="ollama-local"||Boolean(provider.credentialId)}}
