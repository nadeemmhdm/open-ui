import type { OpenUiNode } from "../types/document";
export type SelectionRect={left:number;top:number;right:number;bottom:number};
export type ElementRect=SelectionRect&{id:string};
export function toggleSelection(ids:string[],id:string,additive:boolean){if(!additive)return[id];return ids.includes(id)?ids.filter(x=>x!==id):[...ids,id]}
export function normalizeRect(x1:number,y1:number,x2:number,y2:number):SelectionRect{return{left:Math.min(x1,x2),top:Math.min(y1,y2),right:Math.max(x1,x2),bottom:Math.max(y1,y2)}}
export function intersects(a:SelectionRect,b:SelectionRect){return a.left<=b.right&&a.right>=b.left&&a.top<=b.bottom&&a.bottom>=b.top}
export function idsInsideMarquee(area:SelectionRect,items:ElementRect[]){return items.filter(item=>intersects(area,item)).map(item=>item.id)}
export function uniqueUnlocked(root:OpenUiNode,ids:string[]){const wanted=new Set(ids),out:string[]=[];const walk=(n:OpenUiNode)=>{if(wanted.has(n.id)&&!n.locked&&n.type!=="page")out.push(n.id);n.children.forEach(walk)};walk(root);return out}
export function selectionLabel(ids:string[]){return ids.length===0?"No selection":ids.length===1?"1 element":`${ids.length} elements`}