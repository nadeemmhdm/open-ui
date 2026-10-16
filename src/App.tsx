import { Box, Code2, Component, Image, Laptop, Layers3, Plus, Redo2, Save, Smartphone, Tablet, Trash2, Type, Undo2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { NodeRenderer } from "./components/NodeRenderer";
import { exportHtml } from "./lib/exporter";
import { findNode } from "./lib/document";
import { useEditorStore } from "./store/editorStore";
import type { NodeType, OpenUiNode } from "./types/document";

type Device = "desktop" | "tablet" | "mobile";
type LeftTab = "components" | "layers";
const palette: { name: string; type: NodeType; icon: typeof Box }[] = [
  { name: "Section", type: "section", icon: Component }, { name: "Text", type: "text", icon: Type },
  { name: "Button", type: "button", icon: Box }, { name: "Image", type: "image", icon: Image },
];

export function App() {
  const [device, setDevice] = useState<Device>("desktop"); const [leftTab, setLeftTab] = useState<LeftTab>("components"); const [zoom, setZoom] = useState(85);
  const document = useEditorStore((s) => s.document); const selectedId = useEditorStore((s) => s.selectedId); const select = useEditorStore((s) => s.select);
  const add = useEditorStore((s) => s.add); const removeSelected = useEditorStore((s) => s.removeSelected); const patchSelected = useEditorStore((s) => s.patchSelected); const patchStyle = useEditorStore((s) => s.patchStyle);
  const undo = useEditorStore((s) => s.undo); const redo = useEditorStore((s) => s.redo); const past = useEditorStore((s) => s.past); const future = useEditorStore((s) => s.future);
  const selected = selectedId ? findNode(document.root, selectedId) : undefined;
  const canvasWidth = useMemo(() => ({ desktop: 1040, tablet: 760, mobile: 390 })[device], [device]);
  const addTarget = selected && ["page", "section"].includes(selected.type) ? selected.id : document.root.id;
  const saveProject = () => download(`${document.name.replace(/\s+/g, "-").toLowerCase()}.openui`, JSON.stringify(document, null, 2), "application/json");
  const exportProject = () => download("open-ui-export.html", exportHtml(document.root), "text/html");

  return <main className="app-shell">
    <header className="titlebar"><div className="brand"><span className="brand-mark"><Component size={17}/></span><strong>Open UI</strong><span className="alpha">ALPHA</span></div><div className="project-title">{document.name}</div><div className="title-actions"><button className="icon-button" disabled={!past.length} onClick={undo}><Undo2 size={16}/></button><button className="icon-button" disabled={!future.length} onClick={redo}><Redo2 size={16}/></button><button className="toolbar-button" onClick={saveProject}><Save size={15}/> Save</button><button className="primary-button" onClick={exportProject}><Code2 size={15}/> Export HTML</button></div></header>
    <section className="workspace">
      <aside className="left-panel"><nav className="panel-tabs"><button className={leftTab === "components" ? "active" : ""} onClick={() => setLeftTab("components")}><Component size={16}/>Components</button><button className={leftTab === "layers" ? "active" : ""} onClick={() => setLeftTab("layers")}><Layers3 size={16}/>Layers</button></nav>
        {leftTab === "components" ? <div className="component-section"><div className="section-heading"><span>Add to {selected?.name ?? "Page"}</span></div><div className="component-grid">{palette.map(({name,type,icon:Icon}) => <button className="component-tile" key={type} onClick={() => add(type, addTarget)}><Icon size={20}/><span>{name}</span></button>)}</div></div> : <div className="layer-list"><Layer node={document.root} depth={0}/></div>}
        <div className="left-footer"><span className="offline-pill">LOCAL / OFFLINE</span></div>
      </aside>
      <section className="editor-area"><div className="canvas-toolbar"><div className="device-switcher"><button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}><Laptop size={16}/></button><button className={device === "tablet" ? "active" : ""} onClick={() => setDevice("tablet")}><Tablet size={16}/></button><button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}><Smartphone size={16}/></button></div><div className="zoom"><button onClick={() => setZoom(Math.max(25,zoom-10))}>−</button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(200,zoom+10))}>+</button></div></div>
        <div className="canvas-stage" onClick={() => select(document.root.id)}><div className="artboard" style={{width:canvasWidth, transform:`scale(${zoom/100})`, transformOrigin:"top center"}}><NodeRenderer node={document.root}/></div></div>
      </section>
      <aside className="right-panel">{selected ? <><div className="inspector-head"><div><small>{selected.type.toUpperCase()}</small><strong>{selected.name}</strong></div>{selected.type !== "page" && <button className="icon-button" onClick={removeSelected} title="Delete"><Trash2 size={16}/></button>}</div>
        <InspectorSection title="Content"><label className="full-field">Layer name<input value={selected.name} onChange={(e)=>patchSelected({name:e.target.value})}/></label>{(selected.type === "text" || selected.type === "button") && <label className="full-field">Text<input value={selected.props.text ?? ""} onChange={(e)=>patchSelected({props:{...selected.props,text:e.target.value}})}/></label>}{selected.type === "image" && <><label className="full-field">Image URL<input value={selected.props.src ?? ""} onChange={(e)=>patchSelected({props:{...selected.props,src:e.target.value}})}/></label><label className="full-field">Alt text<input value={selected.props.alt ?? ""} onChange={(e)=>patchSelected({props:{...selected.props,alt:e.target.value}})}/></label></>}</InspectorSection>
        <InspectorSection title="Layout"><div className="field-row"><Field label="Width" value={selected.style.width ?? ""} set={(v)=>patchStyle({width:v})}/><Field label="Height" value={selected.style.height ?? ""} set={(v)=>patchStyle({height:v})}/></div><div className="field-row"><Field label="Padding" value={selected.style.padding ?? ""} set={(v)=>patchStyle({padding:v})}/><Field label="Gap" value={selected.style.gap ?? ""} set={(v)=>patchStyle({gap:v})}/></div></InspectorSection>
        <InspectorSection title="Appearance"><label className="full-field">Background<input value={selected.style.background ?? ""} placeholder="#ffffff" onChange={(e)=>patchStyle({background:e.target.value})}/></label><label className="full-field">Text color<input value={selected.style.color ?? ""} placeholder="#111827" onChange={(e)=>patchStyle({color:e.target.value})}/></label><div className="field-row"><Field label="Font size" value={selected.style.fontSize ?? ""} set={(v)=>patchStyle({fontSize:v})}/><Field label="Radius" value={selected.style.borderRadius ?? ""} set={(v)=>patchStyle({borderRadius:v})}/></div></InspectorSection>
      </> : <div className="empty-state">Select an element</div>}</aside>
    </section>
  </main>;
}

function Layer({node,depth}:{node:OpenUiNode;depth:number}) { const selectedId=useEditorStore((s)=>s.selectedId); const select=useEditorStore((s)=>s.select); return <>{<button className={selectedId===node.id?"layer selected":"layer"} style={{paddingLeft:12+depth*16}} onClick={()=>select(node.id)}><Layers3 size={14}/>{node.name}</button>}{node.children.map((child)=><Layer key={child.id} node={child} depth={depth+1}/>)}</>; }
function Field({label,value,set}:{label:string;value:string;set:(v:string)=>void}) { return <label>{label}<input value={value} onChange={(e)=>set(e.target.value)}/></label>; }
function InspectorSection({title,children}:{title:string;children:ReactNode}) { return <section className="inspector-section"><div className="section-heading"><span>{title}</span><Plus size={13}/></div>{children}</section>; }
function download(name:string,content:string,type:string){ const blob=new Blob([content],{type}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=name; a.click(); URL.revokeObjectURL(url); }
