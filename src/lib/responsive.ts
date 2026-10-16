export const breakpoints={mobile:390,tablet:760,desktop:1040} as const;
export type Device=keyof typeof breakpoints;
export function clampZoom(value:number){return Math.min(200,Math.max(25,value));}
