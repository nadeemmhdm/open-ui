import type { OpenUiNode } from "../types/document";
export type ReusableComponent={id:string;name:string;node:OpenUiNode;createdAt:string;updatedAt:string};
const KEY="open-ui:components:v1";
export function reusableComponents():ReusableComponent[]{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as ReusableComponent[]}catch{return[]}}
export function saveReusable(name:string,node:OpenUiNode){const now=new Date().toISOString(),item:ReusableComponent={id:crypto.randomUUID(),name:name.trim()||node.name,node:structuredClone(node),createdAt:now,updatedAt:now};localStorage.setItem(KEY,JSON.stringify([item,...reusableComponents()].slice(0,100)));return item}
export function deleteReusable(id:string){localStorage.setItem(KEY,JSON.stringify(reusableComponents().filter(x=>x.id!==id)))}
export function instantiateReusable(item:ReusableComponent):OpenUiNode{const node=structuredClone(item.node);const renew=(n:OpenUiNode)=>{n.id=`node_${crypto.randomUUID()}`;n.children.forEach(renew)};renew(node);return node}
