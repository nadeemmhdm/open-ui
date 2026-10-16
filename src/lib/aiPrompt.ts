import type { OpenUiDocument } from "../types/document";
import type { AiAgentRequest } from "./aiProvider";
export function buildAgentPrompt(request:AiAgentRequest,document:OpenUiDocument,selectedId:string|null){const context=request.scope==="selection"?{selectedId}:request.scope==="page"?{rootId:document.root.id}:{projectId:document.id};return JSON.stringify({system:"Return JSON only. Propose safe Open UI document operations. Never return shell commands, executable scripts, secrets, or network instructions.",task:request.task,scope:request.scope,context,document})}
