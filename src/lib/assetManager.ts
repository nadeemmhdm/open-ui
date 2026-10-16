export type AssetKind="image"|"svg"|"font";
export type LocalAsset={id:string;name:string;kind:AssetKind;mime:string;size:number;url:string;createdAt:string};
const KEY="open-ui:assets:v1";
export function listAssets():LocalAsset[]{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as LocalAsset[]}catch{return[]}}
export function rememberAsset(asset:LocalAsset){const next=[asset,...listAssets().filter(a=>a.id!==asset.id)].slice(0,200);localStorage.setItem(KEY,JSON.stringify(next))}
export function removeAsset(id:string){localStorage.setItem(KEY,JSON.stringify(listAssets().filter(a=>a.id!==id)))}
export function assetKind(file:File):AssetKind|null{if(file.type==="image/svg+xml")return"svg";if(file.type.startsWith("image/"))return"image";if(file.type.startsWith("font/")||/\.(woff2?|ttf|otf)$/i.test(file.name))return"font";return null}
export function assetFromFile(file:File):LocalAsset|null{const kind=assetKind(file);if(!kind)return null;return{id:crypto.randomUUID(),name:file.name,kind,mime:file.type,size:file.size,url:URL.createObjectURL(file),createdAt:new Date().toISOString()}}
