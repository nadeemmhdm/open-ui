import { create } from "zustand";
import { addNode, defaultDocument, findNode, makeNode, removeNode, updateNode } from "../lib/document";
import type { NodeStyle, NodeType, OpenUiDocument, OpenUiNode } from "../types/document";

type Snapshot = { document: OpenUiDocument; selectedId: string | null };
type EditorState = Snapshot & {
  past: Snapshot[]; future: Snapshot[];
  select: (id: string | null) => void;
  add: (type: NodeType, parentId?: string) => void;
  removeSelected: () => void;
  patchSelected: (patch: Partial<OpenUiNode>) => void;
  patchStyle: (patch: Partial<NodeStyle>) => void;
  undo: () => void; redo: () => void;
  replaceDocument: (document: OpenUiDocument) => void;
};

const initial = defaultDocument();
const snap = (state: EditorState): Snapshot => ({ document: structuredClone(state.document), selectedId: state.selectedId });

export const useEditorStore = create<EditorState>((set, get) => ({
  document: initial, selectedId: initial.root.children[0]?.children[2]?.id ?? initial.root.id, past: [], future: [],
  select: (selectedId) => set({ selectedId }),
  add: (type, parentId) => { const state = get(); const parent = parentId ?? state.document.root.id; const child = makeNode(type); set({ past: [...state.past, snap(state)], future: [], document: { ...state.document, updatedAt: new Date().toISOString(), root: addNode(state.document.root, parent, child) }, selectedId: child.id }); },
  removeSelected: () => { const state = get(); if (!state.selectedId || state.selectedId === state.document.root.id) return; set({ past: [...state.past, snap(state)], future: [], document: { ...state.document, updatedAt: new Date().toISOString(), root: removeNode(state.document.root, state.selectedId) }, selectedId: state.document.root.id }); },
  patchSelected: (patch) => { const state = get(); if (!state.selectedId) return; set({ past: [...state.past, snap(state)], future: [], document: { ...state.document, updatedAt: new Date().toISOString(), root: updateNode(state.document.root, state.selectedId, patch) } }); },
  patchStyle: (patch) => { const state = get(); if (!state.selectedId) return; const node = findNode(state.document.root, state.selectedId); if (node) get().patchSelected({ style: { ...node.style, ...patch } }); },
  undo: () => { const state = get(); const previous = state.past.at(-1); if (!previous) return; set({ ...previous, past: state.past.slice(0, -1), future: [snap(state), ...state.future] }); },
  redo: () => { const state = get(); const next = state.future[0]; if (!next) return; set({ ...next, past: [...state.past, snap(state)], future: state.future.slice(1) }); },
  replaceDocument: (document) => set({ document, selectedId: document.root.id, past: [], future: [] }),
}));
