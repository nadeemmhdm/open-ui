import type { PrivacyState } from "./privacy";
export type DiagnosticReport={generatedAt:string;appVersion:string;privacy:Omit<PrivacyState,"cloudAiEnabled">&{cloudAiEnabled:boolean};secretsIncluded:false};
export function diagnosticReport(privacy:PrivacyState):DiagnosticReport{return{generatedAt:new Date().toISOString(),appVersion:"0.1.0-alpha.1",privacy:{...privacy},secretsIncluded:false}}
