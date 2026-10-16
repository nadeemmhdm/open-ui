import type { NodeStyle, OpenUiNode } from "../types/document";
export type AlignMode="left"|"center"|"right"|"top"|"middle"|"bottom";
export type DistributeMode="horizontal"|"vertical";
export function alignmentPatch(mode:AlignMode):Partial<NodeStyle>{if(mode==="left")return{textAlign:"left"};if(mode==="center"||mode==="middle")return{textAlign:"center"};if(mode==="right")return{textAlign:"right"};return{}}
export function canDistribute(nodes:OpenUiNode[]){return nodes.length>=3}
export function distributeOrder(nodes:OpenUiNode[],mode:DistributeMode){const key=mode==="horizontal"?"left":"top";return [...nodes].sort((a,b)=>parseFloat(a.style[key]??"0")-parseFloat(b.style[key]??"0"))}
