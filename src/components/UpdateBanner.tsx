import { useEffect,useRef,useState } from "react";
import type { Update } from "@tauri-apps/plugin-updater";
import { RefreshCw } from "lucide-react";
import { runBackgroundUpdate,type UpdateState } from "../lib/updater";

export function UpdateBanner(){const[state,setState]=useState<UpdateState>({status:"idle"}),pending=useRef<Update|null>(null);useEffect(()=>{let alive=true;runBackgroundUpdate(s=>alive&&setState(s)).then(update=>{if(alive&&update)pending.current=update});return()=>{alive=false}},[]);if(state.status==="idle"||state.status==="checking"||state.status==="downloading"||state.status==="error")return null;return <div className="update-banner"><div><strong>Update ready</strong><small>Open UI {state.version} downloaded. Restart to finish installation.</small></div><button onClick={async()=>{const update=pending.current;if(!update)return;await update.install({restartAfterInstall:true})}}><RefreshCw size={14}/> Restart & update</button></div>}
