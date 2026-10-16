import type { OpenUiDocument } from "../types/document";
export type NamedSnapshot={id:string;name:string;createdAt:string;document:OpenUiDocument};
const KEY="open-ui:snapshots:v1";
export function listSnapshots():NamedSnapshot[]{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as NamedSnapshot[]}catch{return []}}
export function createSnapshot(name:string,document:OpenUiDocument){const item:NamedSnapshot={id:crypto.randomUUID(),name:name.trim()||"Snapshot",createdAt:new Date().toISOString(),document:structuredClone(document)};const next=[item,...listSnapshots()].slice(0,30);localStorage.setItem(KEY,JSON.stringify(next));return item}
export function deleteSnapshot(id:string){localStorage.setItem(KEY,JSON.stringify(listSnapshots().filter(x=>x.id!==id)))}
export function restoreSnapshot(id:string){return listSnapshots().find(x=>x.id===id)?.document??null}
