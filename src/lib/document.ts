import type { NodeType,OpenUiDocument,OpenUiNode } from "../types/document";
const id=()=>`node_${crypto.randomUUID()}`;
export function makeNode(type:NodeType):OpenUiNode{const common={id:id(),type,name:type[0].toUpperCase()+type.slice(1),props:{},style:{},children:[]} as OpenUiNode;
 if(type==="section")return{...common,name:"Section",style:{display:"flex",flexDirection:"column",padding:"64px",gap:"24px",background:"#ffffff"}};
 if(type==="div")return{...common,name:"Div",style:{display:"block",padding:"16px"}};
 if(type==="flex")return{...common,name:"Flex",style:{display:"flex",alignItems:"center",gap:"16px"}};
 if(type==="grid")return{...common,name:"Grid",style:{display:"grid",gridTemplateColumns:"repeat(3, minmax(0, 1fr))",gap:"16px"}};
 if(type==="card")return{...common,name:"Card",style:{display:"flex",flexDirection:"column",padding:"24px",gap:"12px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:"16px",boxShadow:"0 8px 24px rgba(15,23,42,.08)"}};
 if(type==="navbar")return{...common,name:"Navbar",style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 24px",background:"#ffffff",border:"1px solid #e2e8f0"}};
 if(type==="sidebar")return{...common,name:"Sidebar",style:{display:"flex",flexDirection:"column",width:"260px",minHeight:"480px",padding:"20px",gap:"12px",background:"#f8fafc"}};
 if(type==="text")return{...common,name:"Text",props:{text:"New text"},style:{color:"#111827",fontSize:"32px",fontWeight:"700"}};
 if(type==="button")return{...common,name:"Button",props:{text:"Button"},style:{background:"#6c5ce7",color:"#ffffff",padding:"12px 20px",borderRadius:"10px"}};
 if(type==="image")return{...common,name:"Image",props:{src:"",alt:""},style:{width:"100%",borderRadius:"12px"}};
 if(type==="form")return{...common,name:"Form",style:{display:"flex",flexDirection:"column",gap:"12px",padding:"24px",border:"1px solid #e2e8f0",borderRadius:"12px"}};
 if(type==="input")return{...common,name:"Input",props:{placeholder:"Enter value",inputType:"text",ariaLabel:"Input"},style:{width:"100%",padding:"12px",border:"1px solid #cbd5e1",borderRadius:"8px"}};
 if(type==="tabs")return{...common,name:"Tabs",style:{display:"flex",gap:"8px",padding:"8px",border:"1px solid #e2e8f0",borderRadius:"10px"}};
 if(type==="modal")return{...common,name:"Modal",style:{display:"flex",flexDirection:"column",maxWidth:"520px",padding:"24px",gap:"16px",background:"#ffffff",borderRadius:"16px",boxShadow:"0 20px 60px rgba(15,23,42,.18)"}};
 if(type==="table")return{...common,name:"Table",style:{display:"grid",width:"100%",gap:"1px",background:"#e2e8f0",border:"1px solid #e2e8f0"}};return common}
export function defaultDocument():OpenUiDocument{const root=makeNode("page");root.name="Page";root.style={background:"#ffffff",color:"#111827"};const hero=makeNode("section");hero.name="Hero";hero.style={...hero.style,padding:"88px 72px",background:"#ffffff"};const heading=makeNode("text");heading.name="Heading";heading.props.text="Build interfaces at the speed of thought.";heading.style.fontSize="56px";const copy=makeNode("text");copy.name="Body";copy.props.text="Create polished responsive products visually and export clean source code.";copy.style={color:"#64748b",fontSize:"18px",fontWeight:"400"};const cta=makeNode("button");cta.name="Primary CTA";cta.props.text="Start building";hero.children=[heading,copy,cta];root.children=[hero];return{format:"open-ui",version:1,id:crypto.randomUUID(),name:"Untitled project",updatedAt:new Date().toISOString(),root}}
export function findNode(node:OpenUiNode,target:string):OpenUiNode|undefined{if(node.id===target)return node;for(const child of node.children){const found=findNode(child,target);if(found)return found}}
export function updateNode(node:OpenUiNode,target:string,patch:Partial<OpenUiNode>):OpenUiNode{if(node.id===target)return{...node,...patch};return{...node,children:node.children.map(child=>updateNode(child,target,patch))}}
export function removeNode(node:OpenUiNode,target:string):OpenUiNode{return{...node,children:node.children.filter(child=>child.id!==target).map(child=>removeNode(child,target))}}
export function addNode(node:OpenUiNode,parent:string,child:OpenUiNode):OpenUiNode{if(node.id===parent)return{...node,children:[...node.children,child]};return{...node,children:node.children.map(item=>addNode(item,parent,child))}}
