export function safeHttpEndpoint(value:string){ const u=new URL(value); if(!["http:","https:"].includes(u.protocol)) throw new Error("Only HTTP(S) AI endpoints are allowed"); return u.origin; }
export function redactSecrets(value:string){ return value.replace(/(api[_-]?key|authorization|bearer)\s*[:=]?\s*[^\s,;]+/gi,"$1=[REDACTED]"); }
export function safeAssetUrl(value:string){ if(!value)return ""; const u=new URL(value,location.href); if(["http:","https:","data:","blob:","asset:"].includes(u.protocol))return value; throw new Error("Unsupported asset URL"); }
