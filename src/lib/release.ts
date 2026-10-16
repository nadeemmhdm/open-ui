export type PrivacyState={offlineMode:boolean;aiEnabled:boolean;provider:"local"|"cloud";networkAllowed:boolean};
export type ReleaseCheck={id:string;label:string;ok:boolean;detail:string};
const KEY="open-ui:privacy:v1";
export const defaultPrivacyState:PrivacyState={offlineMode:true,aiEnabled:false,provider:"local",networkAllowed:false};
export function readPrivacy():PrivacyState{try{return{...defaultPrivacyState,...JSON.parse(localStorage.getItem(KEY)??"{}")}}catch{return defaultPrivacyState}}
export function writePrivacy(next:PrivacyState){localStorage.setItem(KEY,JSON.stringify(next));return next}
export function releaseChecks(input:{problems:number;hasRecovery:boolean;privacy:PrivacyState}):ReleaseCheck[]{return[
{id:"quality",label:"Quality diagnostics",ok:input.problems===0,detail:input.problems?`${input.problems} issue(s) remain`:"No editor diagnostics"},
{id:"recovery",label:"Crash recovery",ok:input.hasRecovery,detail:input.hasRecovery?"Recovery snapshot available":"Create or wait for an autosave"},
{id:"privacy",label:"Privacy guard",ok:input.privacy.offlineMode||!input.privacy.networkAllowed,detail:input.privacy.offlineMode?"Offline mode enabled":"Network access explicitly enabled"},
{id:"ai",label:"AI network policy",ok:!input.privacy.aiEnabled||input.privacy.provider==="local"||input.privacy.networkAllowed,detail:input.privacy.aiEnabled?`AI provider: ${input.privacy.provider}`:"AI disabled"}
]}
export type ExporterDescriptor={id:string;name:string;status:"built-in"|"planned"};
export const exporterRegistry:ExporterDescriptor[]=[{id:"html",name:"HTML/CSS",status:"built-in"},{id:"react",name:"React + TypeScript",status:"built-in"},{id:"next",name:"Next.js",status:"planned"},{id:"vue",name:"Vue",status:"planned"},{id:"flutter",name:"Flutter",status:"planned"}];
export type PluginPermission="document:read"|"document:write"|"export:write"|"network:request";
export type PluginManifest={id:string;name:string;version:string;permissions:PluginPermission[];signed:boolean};
export function validatePluginManifest(value:PluginManifest){return /^[a-z0-9.-]+$/.test(value.id)&&!!value.name.trim()&&/^\d+\.\d+\.\d+/.test(value.version)&&value.signed&&value.permissions.every(p=>["document:read","document:write","export:write","network:request"].includes(p))}
