export type AiProviderKind="ollama-local"|"ollama-cloud"|"compatible-api";
export type AiProvider={id:string;name:string;kind:AiProviderKind;enabled:boolean;baseUrl:string;model:string;credentialId?:string};
export const localOllama:AiProvider={id:"ollama-local",name:"Local Ollama",kind:"ollama-local",enabled:true,baseUrl:"http://127.0.0.1:11434",model:""};
export type AiContextScope="selection"|"page"|"project";
export type AiAgentRequest={task:string;scope:AiContextScope;providerId:string};
export type DocumentOperation={op:"patch-style"|"patch-props"|"add-node"|"remove-node"|"move-node";targetId:string;value?:unknown};
export type AiProposal={id:string;summary:string;operations:DocumentOperation[];createdAt:string};
export function validateProposal(value:unknown):AiProposal{if(!value||typeof value!=="object")throw new Error("Invalid AI proposal");const p=value as Partial<AiProposal>;if(typeof p.summary!=="string"||!Array.isArray(p.operations))throw new Error("Invalid AI proposal schema");const allowed=new Set(["patch-style","patch-props","add-node","remove-node","move-node"]);for(const op of p.operations){if(!op||typeof op!=="object"||!allowed.has((op as DocumentOperation).op)||typeof (op as DocumentOperation).targetId!=="string")throw new Error("Unsafe AI operation")}return{id:p.id??crypto.randomUUID(),summary:p.summary,operations:p.operations as DocumentOperation[],createdAt:p.createdAt??new Date().toISOString()}}
export function providerAllowsNetwork(provider:AiProvider){return provider.kind!=="ollama-local"}
