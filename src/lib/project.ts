import type { OpenUiDocument } from "../types/document";

const KEY = "open-ui:autosave:v1";
export function autosave(doc: OpenUiDocument) { localStorage.setItem(KEY, JSON.stringify(doc)); }
export function recovery(): OpenUiDocument | null { try { const raw=localStorage.getItem(KEY); return raw ? JSON.parse(raw) as OpenUiDocument : null; } catch { return null; } }
export function parseProject(raw:string): OpenUiDocument { const value=JSON.parse(raw) as OpenUiDocument; if(value.format!=="open-ui"||value.version!==1||!value.root) throw new Error("Invalid Open UI project"); return value; }
