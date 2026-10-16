export type ProjectKind="blank"|"landing"|"dashboard"|"portfolio";
export type AiScope="selection"|"page"|"project";
export type ExportProfile="html"|"react"|"next"|"vue"|"flutter";
export type PrivacyState={offlineMode:boolean;aiEnabled:boolean;provider:"local"|"cloud";networkAllowed:boolean};
export type DesignTokens={colors:Record<string,string>;spacing:Record<string,string>;radius:Record<string,string>;typography:Record<string,string>};
export const defaultTokens:DesignTokens={colors:{background:"#ffffff",foreground:"#0f172a",primary:"#2563eb"},spacing:{sm:"8px",md:"16px",lg:"32px"},radius:{sm:"6px",md:"12px",lg:"20px"},typography:{body:"Inter, sans-serif",heading:"Inter, sans-serif"}};
export const builtInComponents=["Navbar","Hero","Card","Pricing","Dashboard","Login","Form","Tabs","Modal","Table"] as const;
export const exportProfiles:ExportProfile[]=["html","react","next","vue","flutter"];
export function networkAllowed(p:PrivacyState){return !p.offlineMode&&p.networkAllowed;}
export function aiMaySendContext(p:PrivacyState,scope:AiScope){return p.aiEnabled&&(p.provider==="local"||networkAllowed(p))&&scope.length>0;}
