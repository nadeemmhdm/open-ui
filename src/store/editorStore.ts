import { create } from "zustand";
import { addNode, defaultDocument, findNode, makeNode, removeNode, updateNode } from "../lib/document";
import type { NodeStyle, NodeType, OpenUiDocument, OpenUiNode } from "../types/document";

type Snapshot={document:OpenUiDocument;selectedId:string|null};
type EditorState=Snapshot&{past:Snapshot[];future:Snapshot[];select:(id:string|null)=>void;add:(type:NodeType,parentId?:string)=>void;removeSelected:()=>void;duplicateSelected:()=>void;moveSelected:(direction:-1|1)=>void;toggleHidden:()=>void;toggleLocked:()=>void;patchSelected:(patch:Partial<OpenUiNode>)=>void;patchStyle:(patch:Partial<NodeStyle>)=>void;undo:()=>void;redo:()=>void;replaceDocument:(document:OpenUiDocument)=>void};
const initial=defaultDocument(); const snap=(s:EditorState):Snapshot=>({document:structuredClone(s.document),selectedId:s.selectedId});
const mutate=(s:EditorState,root:OpenUiNode,selectedId=s.selectedId)=>({past:[...s.past,snap(s)],future:[],document:{...s.document,updatedAt:new Date().toISOString(),root},selectedId});
function parentOf(root:OpenUiNode,id:string):OpenUiNode|undefined{for(const c of root.children){if(c.id===id)return root;const p=parentOf(c,id);if(p)return p;}}
function cloneNode(n:OpenUiNode):OpenUiNode{const c=structuredClone(n);const renew=(x:OpenUiNode)=>{x.id=crypto.randomUUID();x.children.forEach(renew)};renew(c);c.name=`${c.name} Copy`;return c;}
export const useEditorStore=create<EditorState>((set,get)=>({document:initial,selectedId:initial.root.children[0]?.children[2]?.id??initial.root.id,past:[],future:[],select:(selectedId)=>set({selectedId}),
 add:(type,parentId)=>{const s=get(),child=makeNode(type),parent=parentId??s.document.root.id;set(mutate(s,addNode(s.document.root,parent,child),child.id));},
 removeSelected:()=>{const s=get();if(!s.selectedId||s.selectedId===s.document.root.id)return;set(mutate(s,removeNode(s.document.root,s.selectedId),s.document.root.id));},
 duplicateSelected:()=>{const s=get();if(!s.selectedId||s.selectedId===s.document.root.id)return;const n=findNode(s.document.root,s.selectedId),p=parentOf(s.document.root,s.selectedId);if(!n||!p)return;const copy=cloneNode(n);set(mutate(s,addNode(s.document.root,p.id,copy),copy.id));},
 moveSelected:(direction)=>{const s=get();if(!s.selectedId)return;const p=parentOf(s.document.root,s.selectedId);if(!p)return;const children=[...p.children],i=children.findIndex(x=>x.id===s.selectedId),j=i+direction;if(i<0||j<0||j>=children.length)return;[children[i],children[j]]=[children[j],children[i]];set(mutate(s,updateNode(s.document.root,p.id,{children})));},
 toggleHidden:()=>{const s=get();if(!s.selectedId)return;const n=findNode(s.document.root,s.selectedId);if(n)get().patchSelected({hidden:!n.hidden});},toggleLocked:()=>{const s=get();if(!s.selectedId)return;const n=findNode(s.document.root,s.selectedId);if(n)get().patchSelected({locked:!n.locked});},
 patchSelected:(patch)=>{const s=get();if(!s.selectedId)return;const n=findNode(s.document.root,s.selectedId);if(n?.locked)return;set(mutate(s,updateNode(s.document.root,s.selectedId,patch)));},patchStyle:(patch)=>{const s=get();if(!s.selectedId)return;const n=findNode(s.document.root,s.selectedId);if(n)get().patchSelected({style:{...n.style,...patch}});},
 undo:()=>{const s=get(),p=s.past.at(-1);if(p)set({...p,past:s.past.slice(0,-1),future:[snap(s),...s.future]});},redo:()=>{const s=get(),n=s.future[0];if(n)set({...n,past:[...s.past,snap(s)],future:s.future.slice(1)});},replaceDocument:(document)=>set({document,selectedId:document.root.id,past:[],future:[]})}));
