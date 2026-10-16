use std::{fs,path::{Path,PathBuf}};
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
fn app_info() -> serde_json::Value {serde_json::json!({"name":"Open UI","version":env!("CARGO_PKG_VERSION"),"channel":"alpha"})}

fn valid_project_path(path:&Path)->bool{path.extension().and_then(|x|x.to_str()).is_some_and(|x|x.eq_ignore_ascii_case("openui"))}

#[tauri::command]
fn open_project(app:tauri::AppHandle)->Result<Option<serde_json::Value>,String>{let picked=app.dialog().file().add_filter("Open UI project", &["openui"]).blocking_pick_file();let Some(file)=picked else{return Ok(None)};let path=file.as_path().ok_or("Selected project is not a local file")?;if !valid_project_path(path){return Err("Only .openui project files are allowed".into())}let content=fs::read_to_string(path).map_err(|e|e.to_string())?;Ok(Some(serde_json::json!({"path":path.to_string_lossy(),"content":content})))}

#[tauri::command]
fn save_project(app:tauri::AppHandle,path:Option<String>,content:String)->Result<Option<String>,String>{if content.len()>25*1024*1024{return Err("Project exceeds 25 MB safety limit".into())}let target:Option<PathBuf>=match path{Some(value)=>{let p=PathBuf::from(value);if !valid_project_path(&p){return Err("Only .openui project files are allowed".into())}Some(p)},None=>app.dialog().file().add_filter("Open UI project", &["openui"]).set_file_name("project.openui").blocking_save_file().and_then(|f|f.as_path().map(Path::to_path_buf))};let Some(target)=target else{return Ok(None)};if !valid_project_path(&target){return Err("Only .openui project files are allowed".into())}fs::write(&target,content).map_err(|e|e.to_string())?;Ok(Some(target.to_string_lossy().into_owned()))}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run(){tauri::Builder::default().plugin(tauri_plugin_dialog::init()).invoke_handler(tauri::generate_handler![app_info,open_project,save_project]).run(tauri::generate_context!()).expect("error while running Open UI");}
