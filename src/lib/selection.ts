import type { OpenUiNode } from "../types/document";
export type SelectionBox={ids:string[];anchorId:string|null};
export function normalizeSelection(root:OpenUiNode,ids:string[]){const valid=new Set<string>();const walk=(n:OpenUiNode)=>{valid.add(n.id);n.children.forEach(walk)};walk(root);return [...new Set(ids)].filter(id=>valid.has(id))}
export function toggleSelection(current:string[],id:string){return current.includes(id)?current.filter(x=>x!==id):[...current,id]}
export function selectionBounds(elements:HTMLElement[]){if(!elements.length)return null;const rects=elements.map(x=>x.getBoundingClientRect());return {left:Math.min(...rects.map(r=>r.left)),top:Math.min(...rects.map(r=>r.top)),right:Math.max(...rects.map(r=>r.right)),bottom:Math.max(...rects.map(r=>r.bottom))}}
