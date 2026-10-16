import type { OpenUiDocument } from "../types/document";
export type OpenUiArchive={format:"open-ui-project";version:1;document:OpenUiDocument;assets:Record<string,string>;metadata:{savedAt:string;appVersion:string}};
export function createArchive(document:OpenUiDocument,assets:Record<string,string>={}):OpenUiArchive{return{format:"open-ui-project",version:1,document:structuredClone(document),assets,metadata:{savedAt:new Date().toISOString(),appVersion:"0.1.0-alpha.1"}}}
export function serializeArchive(archive:OpenUiArchive){return JSON.stringify(archive,null,2)}
export function parseArchive(raw:string):OpenUiArchive{const value=JSON.parse(raw) as Partial<OpenUiArchive>;if(value.format!=="open-ui-project"||value.version!==1||!value.document||value.document.format!=="open-ui")throw new Error("Invalid .openui project");return value as OpenUiArchive}
export function projectFilename(name:string){const safe=name.trim().replace(/[^a-z0-9._-]+/gi,"-").replace(/^-+|-+$/g,"")||"untitled";return `${safe}.openui`}
