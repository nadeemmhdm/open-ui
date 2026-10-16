export type RecentProject={path:string;name:string;openedAt:string};
const KEY="open-ui:recent-native-projects:v1";
export function recentProjects():RecentProject[]{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as RecentProject[]}catch{return[]}}
export function rememberProject(path:string,name:string){const item={path,name,openedAt:new Date().toISOString()};localStorage.setItem(KEY,JSON.stringify([item,...recentProjects().filter(p=>p.path!==path)].slice(0,20)))}
export function forgetProject(path:string){localStorage.setItem(KEY,JSON.stringify(recentProjects().filter(p=>p.path!==path)))}
