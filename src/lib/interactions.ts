export type InteractionState="default"|"hover"|"focus"|"active"|"disabled";
export type InteractionAction={trigger:"click"|"hover";action:"show"|"hide"|"toggle"|"navigate";target?:string;value?:string};
export function validateInteraction(action:InteractionAction){if(action.action==="navigate"){const v=action.value??"";return v.startsWith("/")||v.startsWith("#")||/^https:\/\//i.test(v)}return action.action==="toggle"||!!action.target}
