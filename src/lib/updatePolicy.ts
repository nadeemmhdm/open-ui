export type UpdatePreference="notify"|"disabled";
export type UpdateState={preference:UpdatePreference;lastCheckedAt?:string;availableVersion?:string};
export const defaultUpdateState:UpdateState={preference:"notify"};
export function mayInstallUpdate(userApproved:boolean){return userApproved===true}
export function validReleaseVersion(value:string){return /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(value.replace(/^v/,""))}
