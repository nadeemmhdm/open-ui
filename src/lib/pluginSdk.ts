export type PluginPermission="document:read"|"document:write"|"assets:read"|"assets:write"|"network"|"export";
export type OpenUiPluginManifest={id:string;name:string;version:string;apiVersion:1;permissions:PluginPermission[];entry:string};
const allowed=new Set<PluginPermission>(["document:read","document:write","assets:read","assets:write","network","export"]);
export function validatePluginManifest(value:unknown):OpenUiPluginManifest{if(!value||typeof value!=="object")throw new Error("Invalid plugin manifest");const m=value as Partial<OpenUiPluginManifest>;if(!m.id||!m.name||!m.version||m.apiVersion!==1||!m.entry||!Array.isArray(m.permissions))throw new Error("Invalid plugin manifest");if(m.permissions.some(p=>!allowed.has(p)))throw new Error("Unsupported plugin permission");return m as OpenUiPluginManifest}
export function requiresConsent(manifest:OpenUiPluginManifest){return manifest.permissions.some(p=>p==="network"||p==="document:write"||p==="assets:write")}
