export type PrivacyState={offlineMode:boolean;aiEnabled:boolean;cloudAiEnabled:boolean;telemetry:boolean};
export const defaultPrivacy:PrivacyState={offlineMode:false,aiEnabled:true,cloudAiEnabled:false,telemetry:false};
export function canRequestNetwork(state:PrivacyState,url:string){if(state.offlineMode)return false;try{const host=new URL(url).hostname;return host==="127.0.0.1"||host==="localhost"||state.cloudAiEnabled}catch{return false}}
export function maskedSecret(value:string){if(!value)return"";if(value.length<=8)return"••••••••";return `${value.slice(0,3)}••••••${value.slice(-3)}`}
export type NetworkEvent={id:string;at:string;target:string;purpose:"ai"|"update"|"import";allowed:boolean};
export function networkEvent(target:string,purpose:NetworkEvent["purpose"],allowed:boolean):NetworkEvent{return{id:crypto.randomUUID(),at:new Date().toISOString(),target,purpose,allowed}}
