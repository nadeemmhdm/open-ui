export type RecentProject={id:string;name:string;updatedAt:string;source:"local"|"file"};
const KEY="open-ui:recent:v1";
export function recentProjects():RecentProject[]{try{return JSON.parse(localStorage.getItem(KEY)??"[]") as RecentProject[]}catch{return[]}}
export function rememberProject(project:RecentProject){const next=[project,...recentProjects().filter(x=>x.id!==project.id)].slice(0,12);localStorage.setItem(KEY,JSON.stringify(next))}
export function forgetProject(id:string){localStorage.setItem(KEY,JSON.stringify(recentProjects().filter(x=>x.id!==id)))}
