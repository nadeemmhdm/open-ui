export type WindowsInstaller="msi"|"nsis";
export const windowsRelease={targets:["msi","nsis"] as WindowsInstaller[],installScope:"user-preferred",autoInstallUpdates:false,requiresSignedArtifacts:true,requiresExplicitUpdateApproval:true} as const;
export function releaseAssetName(version:string,target:WindowsInstaller,arch="x64"){const ext=target==="msi"?"msi":"exe";return `Open-UI_${version}_${arch}.${ext}`}
