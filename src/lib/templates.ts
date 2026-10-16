import { defaultDocument, makeNode } from "./document";
import type { OpenUiDocument } from "../types/document";
export function blankTemplate():OpenUiDocument { const d=defaultDocument(); d.root.children=[]; d.name="Blank project"; return d; }
export function landingTemplate():OpenUiDocument { return defaultDocument(); }
export function dashboardTemplate():OpenUiDocument { const d=blankTemplate(); d.name="Dashboard"; const section=makeNode("section"); section.name="Dashboard grid"; section.style={display:"grid",padding:"32px",gap:"16px",background:"#f8fafc"}; for(let i=1;i<=4;i++){const card=makeNode("section");card.name=`Card ${i}`;card.style={padding:"24px",background:"#ffffff",borderRadius:"16px"};const text=makeNode("text");text.props.text=`Metric ${i}`;text.style={fontSize:"22px",fontWeight:"700",color:"#0f172a"};card.children=[text];section.children.push(card);} d.root.children=[section]; return d; }
