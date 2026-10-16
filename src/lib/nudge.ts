import type { NodeStyle } from "../types/document";
export type NudgeDirection="left"|"right"|"up"|"down";
const px=(v?:string)=>Number.parseFloat(v??"0")||0;
export function nudgeStyle(style:NodeStyle,direction:NudgeDirection,step=1):Partial<NodeStyle>{const position=style.position==="absolute"?"absolute":"relative";if(direction==="left")return{position,left:`${px(style.left)-step}px`};if(direction==="right")return{position,left:`${px(style.left)+step}px`};if(direction==="up")return{position,top:`${px(style.top)-step}px`};return{position,top:`${px(style.top)+step}px`}}
