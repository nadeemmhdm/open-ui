export type SnapSettings={enabled:boolean;grid:number;tolerance:number};
export const defaultSnapSettings:SnapSettings={enabled:true,grid:8,tolerance:4};
export function snapValue(value:number,settings=defaultSnapSettings){if(!settings.enabled)return value;const target=Math.round(value/settings.grid)*settings.grid;return Math.abs(target-value)<=settings.tolerance?target:value}
export function snapPoint(x:number,y:number,settings=defaultSnapSettings){return{x:snapValue(x,settings),y:snapValue(y,settings)}}
export function gridCss(size=8){const safe=Math.max(2,Math.min(128,size));return {backgroundSize:`${safe}px ${safe}px`}}
