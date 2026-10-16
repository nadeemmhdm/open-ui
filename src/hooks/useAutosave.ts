import { useEffect } from "react";
import { autosave } from "../lib/project";
import type { OpenUiDocument } from "../types/document";
export function useAutosave(document:OpenUiDocument){ useEffect(()=>{ const id=setTimeout(()=>autosave(document),350); return()=>clearTimeout(id); },[document]); }
