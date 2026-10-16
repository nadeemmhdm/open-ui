export type CredentialRef={id:string;providerId:string;label:string;createdAt:string};
export function credentialRef(providerId:string,label:string):CredentialRef{return{id:`cred_${crypto.randomUUID()}`,providerId,label,createdAt:new Date().toISOString()}}
export function assertNoPlaintextSecret(value:unknown){const raw=JSON.stringify(value).toLowerCase();for(const key of ["api_key","apikey","api-key","authorization","bearer "]){if(raw.includes(key))throw new Error("Plaintext credentials are not allowed in project data")}}
