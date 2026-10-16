import type { NodeStyle } from "../types/document";
export type ResizeHandle="n"|"s"|"e"|"w"|"ne"|"nw"|"se"|"sw";
export type Size={width:number;height:number};
const clamp=(v:number,min:number,max:number)=>Math.max(min,Math.min(max,v));
export function resizeFromDelta(size:Size,handle:ResizeHandle,dx:number,dy:number,min=16,max=10000):Partial<NodeStyle>{let width=size.width,height=size.height;if(handle.includes("e"))width+=dx;if(handle.includes("w"))width-=dx;if(handle.includes("s"))height+=dy;if(handle.includes("n"))height-=dy;return{width:`${Math.round(clamp(width,min,max))}px`,height:`${Math.round(clamp(height,min,max))}px`}}
export function parsePixelSize(style:NodeStyle,fallback:Size):Size{return{width:px(style.width,fallback.width),height:px(style.height,fallback.height)}}
function px(value:string|undefined,fallback:number){if(!value?.trim().endsWith("px"))return fallback;const n=Number.parseFloat(value);return Number.isFinite(n)?n:fallback}
