import { addNode, removeNode, updateNode } from "./document";
import type { NodeStyle, OpenUiDocument, OpenUiNode } from "../types/document";
export type UiOperation =
 | {type:"update";nodeId:string;patch:{name?:string;props?:OpenUiNode["props"];style?:Partial<NodeStyle>}}
 | {type:"remove";nodeId:string}
 | {type:"add";parentId:string;node:OpenUiNode};
export function applyOperations(doc:OpenUiDocument,ops:UiOperation[]):OpenUiDocument { let root=doc.root; for(const op of ops){ if(op.type==="remove") root=removeNode(root,op.nodeId); else if(op.type==="add") root=addNode(root,op.parentId,op.node); else { const patch={...op.patch}; if(patch.style){ const current=find(root,op.nodeId); patch.style={...current?.style,...patch.style}; } root=updateNode(root,op.nodeId,patch as Partial<OpenUiNode>); } } return {...doc,updatedAt:new Date().toISOString(),root}; }
function find(n:OpenUiNode,id:string):OpenUiNode|undefined { if(n.id===id)return n; for(const c of n.children){const f=find(c,id);if(f)return f;} }
export function parseOperations(raw:string):UiOperation[]{ const value=JSON.parse(raw) as unknown; if(!Array.isArray(value)) throw new Error("AI output must be an operation array"); return value.filter((x):x is UiOperation=>!!x&&typeof x==="object"&&["update","remove","add"].includes((x as {type?:string}).type??"")); }
