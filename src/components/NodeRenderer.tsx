import type { CSSProperties, MouseEvent } from "react";
import type { OpenUiNode } from "../types/document";
import { useEditorStore } from "../store/editorStore";

export function NodeRenderer({ node }: { node: OpenUiNode }) {
  const selectedId = useEditorStore((s) => s.selectedId); const select = useEditorStore((s) => s.select);
  const style = node.style as CSSProperties;
  const pick = (event: MouseEvent) => { event.stopPropagation(); select(node.id); };
  const selected = selectedId === node.id;
  const selection: CSSProperties = selected ? { outline: "2px solid #7c6cff", outlineOffset: "2px" } : {};
  if (node.type === "text") return <div onClick={pick} style={{ ...style, ...selection }}>{node.props.text}</div>;
  if (node.type === "button") return <button onClick={pick} style={{ ...style, ...selection, border: 0, cursor: "pointer" }}>{node.props.text}</button>;
  if (node.type === "image") return node.props.src ? <img onClick={pick} src={node.props.src} alt={node.props.alt ?? ""} style={{ ...style, ...selection }} /> : <div onClick={pick} style={{ ...style, ...selection, minHeight: 120, background: "#e2e8f0", display: "grid", placeItems: "center" }}>Image</div>;
  return <div onClick={pick} style={{ ...style, ...selection }}>{node.children.map((child) => <NodeRenderer key={child.id} node={child} />)}</div>;
}
