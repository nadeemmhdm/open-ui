import type { OpenUiDocument } from "../types/document";
import { findNode,removeNode,updateNode } from "./document";
import type { AiProposal,DocumentOperation } from "./aiProvider";
export function previewProposal(document:OpenUiDocument,proposal:AiProposal){let root=structuredClone(document.root);for(const operation of proposal.operations)root=apply(root,operation);return{...document,root,updatedAt:new Date().toISOString()}}
function apply(root:OpenUiDocument["root"],operation:DocumentOperation){const target=findNode(root,operation.targetId);if(operation.op==="remove-node")return operation.targetId===root.id?root:removeNode(root,operation.targetId);if(!target)return root;if(operation.op==="patch-style"&&operation.value&&typeof operation.value==="object")return updateNode(root,target.id,{style:{...target.style,...operation.value}});if(operation.op==="patch-props"&&operation.value&&typeof operation.value==="object")return updateNode(root,target.id,{props:{...target.props,...operation.value}});return root}
export function proposalSummary(proposal:AiProposal){return `${proposal.operations.length} proposed change${proposal.operations.length===1?"":"s"}: ${proposal.summary}`}
