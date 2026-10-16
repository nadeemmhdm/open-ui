import type { OpenUiNode } from "../types/document";
export type Problem={nodeId:string;message:string};
export function accessibilityProblems(root:OpenUiNode){ const out:Problem[]=[]; const walk=(n:OpenUiNode)=>{ if(n.type==="image"&&!n.props.alt?.trim()) out.push({nodeId:n.id,message:`${n.name}: missing alt text`}); if(n.type==="button"&&!n.props.text?.trim()) out.push({nodeId:n.id,message:`${n.name}: button needs text`}); n.children.forEach(walk); }; walk(root); return out; }
