import type { NodeStyle,OpenUiNode,ResponsiveOverrides } from "../types/document";
import type { Device } from "./responsive";
export function effectiveStyle(node:OpenUiNode,device:Device):NodeStyle{if(device==="desktop")return node.style;return {...node.style,...node.responsive?.[device]}}
export function patchResponsive(node:OpenUiNode,device:Device,patch:Partial<NodeStyle>):Pick<OpenUiNode,"style"|"responsive">{if(device==="desktop")return{style:{...node.style,...patch},responsive:node.responsive};const responsive:ResponsiveOverrides={...node.responsive,[device]:{...node.responsive?.[device],...patch}};return{style:node.style,responsive}}
export function clearResponsiveValue(node:OpenUiNode,device:Exclude<Device,"desktop">,key:keyof NodeStyle):ResponsiveOverrides{const current={...node.responsive?.[device]};delete current[key];return{...node.responsive,[device]:current}}
export function hasResponsiveOverride(node:OpenUiNode,device:Device,key:keyof NodeStyle){return device!=="desktop"&&node.responsive?.[device]?.[key]!==undefined}
