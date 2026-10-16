import type { NodeStyle } from "../types/document";
export type AnimationPreset="none"|"fade"|"slide-up"|"scale";
export type StateStyle={hover?:Partial<NodeStyle>;focus?:Partial<NodeStyle>;active?:Partial<NodeStyle>};
export function animationStyle(preset:AnimationPreset):Partial<NodeStyle>{if(preset==="fade")return{transition:"opacity 220ms ease",opacity:"1"};if(preset==="slide-up")return{transition:"transform 220ms ease, opacity 220ms ease",transform:"translateY(0)"};if(preset==="scale")return{transition:"transform 180ms ease",transform:"scale(1)"};return{transition:"none",transform:"none"}}
export function hoverPreset(preset:AnimationPreset):Partial<NodeStyle>{if(preset==="fade")return{opacity:"0.8"};if(preset==="slide-up")return{transform:"translateY(-4px)"};if(preset==="scale")return{transform:"scale(1.03)"};return{}}
