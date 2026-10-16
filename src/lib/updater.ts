import { check } from "@tauri-apps/plugin-updater";

export type UpdateState={status:"idle"|"checking"|"downloading"|"ready"|"error";version?:string;progress?:number;message?:string};

export async function runBackgroundUpdate(onState:(state:UpdateState)=>void){
  try{
    onState({status:"checking"});
    const update=await check();
    if(!update){onState({status:"idle"});return null;}
    let downloaded=0,total=0;
    onState({status:"downloading",version:update.version,progress:0});
    await update.download(event=>{
      if(event.event==="Started") total=event.data.contentLength??0;
      if(event.event==="Progress"){downloaded+=event.data.chunkLength;onState({status:"downloading",version:update.version,progress:total?Math.min(100,Math.round(downloaded/total*100)):undefined});}
      if(event.event==="Finished") onState({status:"ready",version:update.version,progress:100});
    });
    return update;
  }catch(error){onState({status:"error",message:error instanceof Error?error.message:"Update failed"});return null;}
}
