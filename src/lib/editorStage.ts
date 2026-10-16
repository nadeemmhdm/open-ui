import type { NodeStyle,OpenUiNode } from "../types/document";
import type { Device } from "./responsive";
export type InspectorGroup="layout"|"size"|"spacing"|"appearance"|"typography"|"position";
export type CanvasSettings={grid:boolean;snap:boolean;guides:boolean;gridSize:number};
export type SmartGuide={axis:"x"|"y";position:number;kind:"edge"|"center"};
export const defaultCanvasSettings:CanvasSettings={grid:true,snap:true,guides:true,gridSize:8};
export function styleForInspector(node:OpenUiNode,device:Device):NodeStyle{return device==="desktop"?node.style:{...node.style,...node.responsive?.[device]}}
export function selectedNodes(root:OpenUiNode,ids:string[]){const wanted=new Set(ids),out:OpenUiNode[]=[];const walk=(n:OpenUiNode)=>{if(wanted.has(n.id))out.push(n);n.children.forEach(walk)};walk(root);return out}
export function commonStyle(nodes:OpenUiNode[],key:keyof NodeStyle){if(!nodes.length)return undefined;const first=nodes[0].style[key];return nodes.every(n=>n.style[key]===first)?first:undefined}
export function safeGridSize(value:number){return Math.max(2,Math.min(128,Math.round(value||8)))}
export function canResize(node:OpenUiNode){return node.type!=="page"&&!node.locked}
export function canMove(node:OpenUiNode){return node.type!=="page"&&!node.locked}
export function gridBackground(settings:CanvasSettings){if(!settings.grid)return undefined;const size=safeGridSize(settings.gridSize);return{backgroundImage:"linear-gradient(to right, rgba(100,116,139,.12) 1px, transparent 1px),linear-gradient(to bottom, rgba(100,116,139,.12) 1px, transparent 1px)",backgroundSize:`${size}px ${size}px`}}
export function smartGuides(moving:{left:number;top:number;width:number;height:number},others:{left:number;top:number;width:number;height:number}[],threshold=4):SmartGuide[]{const out:SmartGuide[]=[],mx=[moving.left,moving.left+moving.width/2,moving.left+moving.width],my=[moving.top,moving.top+moving.height/2,moving.top+moving.height];for(const o of others){const ox=[o.left,o.left+o.width/2,o.left+o.width],oy=[o.top,o.top+o.height/2,o.top+o.height];mx.forEach((v,i)=>ox.forEach((x,j)=>{if(Math.abs(v-x)<=threshold)out.push({axis:"x",position:x,kind:i===1&&j===1?"center":"edge"})}));my.forEach((v,i)=>oy.forEach((y,j)=>{if(Math.abs(v-y)<=threshold)out.push({axis:"y",position:y,kind:i===1&&j===1?"center":"edge"})}))}return out.filter((g,i,a)=>a.findIndex(x=>x.axis===g.axis&&x.position===g.position)===i).slice(0,8)}