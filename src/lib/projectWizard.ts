import { blankTemplate,dashboardTemplate,landingTemplate } from "./templates";
import type { OpenUiDocument } from "../types/document";
export type StarterKind="blank"|"website"|"landing"|"dashboard"|"portfolio";
export function createStarter(kind:StarterKind,name?:string):OpenUiDocument{let doc=kind==="dashboard"?dashboardTemplate():kind==="blank"?blankTemplate():landingTemplate();doc={...doc,id:crypto.randomUUID(),name:name?.trim()||title(kind),updatedAt:new Date().toISOString()};return doc}
function title(kind:StarterKind){return kind[0].toUpperCase()+kind.slice(1)+" project"}
const CRASH_KEY="open-ui:recovery:v2";
export function saveRecovery(doc:OpenUiDocument){localStorage.setItem(CRASH_KEY,JSON.stringify({savedAt:new Date().toISOString(),document:doc}))}
export function readRecovery():{savedAt:string;document:OpenUiDocument}|null{try{return JSON.parse(localStorage.getItem(CRASH_KEY)??"null") as {savedAt:string;document:OpenUiDocument}|null}catch{return null}}
export function clearRecovery(){localStorage.removeItem(CRASH_KEY)}
