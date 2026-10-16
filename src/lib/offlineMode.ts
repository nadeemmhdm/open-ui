export type NetworkTarget={url:string;kind:"loopback"|"remote"};
export function classifyNetworkTarget(raw:string):NetworkTarget{const url=new URL(raw),kind=url.hostname==="127.0.0.1"||url.hostname==="localhost"?"loopback":"remote";return{url:url.toString(),kind}}
export function offlineAllows(raw:string){return classifyNetworkTarget(raw).kind==="loopback"}
