import type { NodeStyle,OpenUiNode } from "../types/document";
import type { Device } from "./responsive";
export type InspectorGroup="layout"|"size"|"spacing"|"appearance"|"typography"|"position";
export type CanvasSettings={grid:boolean;snap:boolean;guides:boolean;gridSize:number};
export const defaultCanvasSettings:CanvasSettings={grid:true,snap:true,guides:true,gridSize:8};
export function styleForInspector(node:OpenUiNode,device:Device):NodeStyle{return device==="desktop"?node.style:{...node.style,...node.responsive?.[device]}}
export function selectedNodes(root:OpenUiNode,ids:string[]){const wanted=new Set(ids),out:OpenUiNode[]=[];const walk=(n:OpenUiNode)=>{if(wanted.has(n.id))out.push(n);n.children.forEach(walk)};walk(root);return out}
export function commonStyle(nodes:OpenUiNode[],key:keyof NodeStyle){if(!nodes.length)return undefined;const first=nodes[0].style[key];return nodes.every(n=>n.style[key]===first)?first:undefined}
export function safeGridSize(value:number){return Math.max(2,Math.min(128,Math.round(value||8)))}
export function canResize(node:OpenUiNode){return node.type!=="page"&&!node.locked}
export function canMove(node:OpenUiNode){return node.type!=="page"&&!node.locked}
