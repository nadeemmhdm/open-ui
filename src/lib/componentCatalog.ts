import type { NodeType } from "../types/document";
export type ComponentGroup={name:string;items:{name:string;type:NodeType}[]};
export const componentGroups:ComponentGroup[]=[{name:"Layout",items:[{name:"Section",type:"section"},{name:"Div",type:"div"},{name:"Flex",type:"flex"},{name:"Grid",type:"grid"}]},{name:"Content",items:[{name:"Text",type:"text"},{name:"Image",type:"image"},{name:"Button",type:"button"},{name:"Card",type:"card"}]},{name:"Navigation",items:[{name:"Navbar",type:"navbar"},{name:"Sidebar",type:"sidebar"},{name:"Tabs",type:"tabs"}]},{name:"Forms",items:[{name:"Form",type:"form"},{name:"Input",type:"input"}]},{name:"Advanced",items:[{name:"Modal",type:"modal"},{name:"Table",type:"table"}]}];
export const containerTypes=new Set<NodeType>(["page","section","div","flex","grid","card","navbar","sidebar","form","tabs","modal","table"]);
export function acceptsChildren(type:NodeType){return containerTypes.has(type)}
