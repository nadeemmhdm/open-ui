import type { NodeType,OpenUiNode } from "../types/document";
export const COMPONENT_MIME="application/x-open-ui-component";
export const NODE_MIME="application/x-open-ui-node";
export type DragPayload={kind:"component";type:NodeType}|{kind:"node";id:string};
export function encodeDragPayload(payload:DragPayload){return JSON.stringify(payload)}
export function decodeDragPayload(raw:string):DragPayload|null{try{const v=JSON.parse(raw) as Partial<DragPayload>;if(v.kind==="node"&&typeof v.id==="string")return{kind:"node",id:v.id};if(v.kind==="component"&&typeof v.type==="string")return{kind:"component",type:v.type as NodeType};return null}catch{return null}}
export function isDescendant(root:OpenUiNode,parentId:string,candidateId:string):boolean{const parent=find(root,parentId);if(!parent)return false;return contains(parent,candidateId)}
function contains(node:OpenUiNode,id:string):boolean{return node.children.some(c=>c.id===id||contains(c,id))}
function find(node:OpenUiNode,id:string):OpenUiNode|undefined{if(node.id===id)return node;for(const c of node.children){const f=find(c,id);if(f)return f}}
