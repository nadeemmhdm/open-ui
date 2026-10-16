import type { OpenUiPluginManifest,PluginPermission } from "./pluginSdk";
export type PluginGrant={pluginId:string;permissions:PluginPermission[];approvedAt:string};
export function grantPlugin(manifest:OpenUiPluginManifest,permissions:PluginPermission[]):PluginGrant{const requested=new Set(manifest.permissions);if(permissions.some(p=>!requested.has(p)))throw new Error("Cannot grant an unrequested permission");return{pluginId:manifest.id,permissions:[...new Set(permissions)],approvedAt:new Date().toISOString()}}
export function hasPermission(grant:PluginGrant|undefined,permission:PluginPermission){return Boolean(grant?.permissions.includes(permission))}
