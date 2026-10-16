export type NodeType = "page" | "section" | "text" | "button" | "image";
export type NodeStyle={display?:"block"|"flex"|"grid";width?:string;height?:string;padding?:string;margin?:string;gap?:string;background?:string;color?:string;borderRadius?:string;fontSize?:string;fontWeight?:string;textAlign?:"left"|"center"|"right";position?:"static"|"relative"|"absolute";left?:string;top?:string;opacity?:string};
export type OpenUiNode={id:string;type:NodeType;name:string;props:{text?:string;src?:string;alt?:string};style:NodeStyle;children:OpenUiNode[];hidden?:boolean;locked?:boolean};
export type OpenUiDocument={format:"open-ui";version:1;id:string;name:string;updatedAt:string;root:OpenUiNode};
