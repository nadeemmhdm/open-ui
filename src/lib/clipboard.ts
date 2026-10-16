import type { OpenUiNode } from "../types/document";
const KEY="open-ui:clipboard:v1";
export function copyNode(node:OpenUiNode){sessionStorage.setItem(KEY,JSON.stringify(node))}
export function readCopiedNode():OpenUiNode|null{try{const raw=sessionStorage.getItem(KEY);if(!raw)return null;const node=JSON.parse(raw) as OpenUiNode;const renew=(n:OpenUiNode)=>{n.id=`node_${crypto.randomUUID()}`;n.children.forEach(renew)};renew(node);node.name=`${node.name} Copy`;return node}catch{return null}}
export function clearCopiedNode(){sessionStorage.removeItem(KEY)}
