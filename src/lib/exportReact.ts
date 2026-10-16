import type { OpenUiNode } from "../types/document";
const esc=(s="")=>s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
const style=(s:OpenUiNode["style"])=>JSON.stringify(s);
function node(n:OpenUiNode):string { if(n.hidden)return ""; if(n.type==="text") return `<div style={${style(n.style)}}>${esc(n.props.text)}</div>`; if(n.type==="button") return `<button style={${style(n.style)}}>${esc(n.props.text)}</button>`; if(n.type==="image") return `<img src=${JSON.stringify(n.props.src??"")} alt=${JSON.stringify(n.props.alt??"")} style={${style(n.style)}} />`; const tag=n.type==="section"?"section":"main"; return `<${tag} style={${style(n.style)}}>${n.children.map(node).join("")}</${tag}>`; }
export const exportReact=(root:OpenUiNode)=>`export default function OpenUiExport(){\n  return (${node(root)});\n}\n`;
