import type { CSSProperties,MouseEvent } from "react";
import type { OpenUiNode } from "../types/document";
import { useEditorStore } from "../store/editorStore";
export function NodeRenderer({node}:{node:OpenUiNode}){const selectedId=useEditorStore(s=>s.selectedId),select=useEditorStore(s=>s.select);if(node.hidden)return null;const style=node.style as CSSProperties,pick=(e:MouseEvent)=>{e.stopPropagation();select(node.id)},selected=selectedId===node.id,selection:CSSProperties=selected?{outline:`2px ${node.locked?"dashed":"solid"} #7c6cff`,outlineOffset:"2px"}:{},common={...style,...selection,opacity:node.locked?Number(node.style.opacity??1):node.style.opacity};
 if(node.type==="text")return <div data-openui-node={node.id} onClick={pick} style={common}>{node.props.text}</div>;
 if(node.type==="button")return <button data-openui-node={node.id} onClick={pick} style={{...common,cursor:"pointer"}}>{node.props.text}</button>;
 if(node.type==="image")return node.props.src?<img data-openui-node={node.id} onClick={pick} src={node.props.src} alt={node.props.alt??""} style={common}/>:<div data-openui-node={node.id} onClick={pick} style={{...common,minHeight:120,background:"#e2e8f0",display:"grid",placeItems:"center"}}>Image</div>;
 if(node.type==="input")return <input data-openui-node={node.id} onClick={pick} type={node.props.inputType??"text"} placeholder={node.props.placeholder??""} aria-label={node.props.ariaLabel??node.name} style={common}/>;
 if(node.type==="form")return <form data-openui-node={node.id} onSubmit={e=>e.preventDefault()} onClick={pick} style={common}>{children(node)}</form>;
 if(node.type==="navbar")return <nav data-openui-node={node.id} onClick={pick} style={common}>{children(node)}</nav>;
 if(node.type==="sidebar")return <aside data-openui-node={node.id} onClick={pick} style={common}>{children(node)}</aside>;
 if(node.type==="table")return <div role="table" data-openui-node={node.id} onClick={pick} style={common}>{node.children.length?children(node):<span style={{padding:12,background:"#fff"}}>Table — add rows or content</span>}</div>;
 if(node.type==="modal")return <div role="dialog" aria-label={node.props.ariaLabel??node.name} data-openui-node={node.id} onClick={pick} style={common}>{node.children.length?children(node):<span>Modal content</span>}</div>;
 return <div data-openui-node={node.id} onClick={pick} style={common}>{children(node)}</div>}
function children(node:OpenUiNode){return node.children.map(c=><NodeRenderer key={c.id} node={c}/>)}
