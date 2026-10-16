import type { NodeType, OpenUiDocument, OpenUiNode } from "../types/document";

const id = () => `node_${crypto.randomUUID()}`;

export function makeNode(type: NodeType): OpenUiNode {
  const common = { id: id(), type, name: type[0].toUpperCase() + type.slice(1), props: {}, style: {}, children: [] } as OpenUiNode;
  if (type === "section") return { ...common, name: "Section", style: { display: "flex", padding: "64px", gap: "24px", background: "#ffffff" } };
  if (type === "text") return { ...common, name: "Text", props: { text: "New text" }, style: { color: "#111827", fontSize: "32px", fontWeight: "700" } };
  if (type === "button") return { ...common, name: "Button", props: { text: "Button" }, style: { background: "#6c5ce7", color: "#ffffff", padding: "12px 20px", borderRadius: "10px" } };
  if (type === "image") return { ...common, name: "Image", props: { src: "", alt: "" }, style: { width: "100%", borderRadius: "12px" } };
  return common;
}

export function defaultDocument(): OpenUiDocument {
  const root = makeNode("page");
  root.name = "Page";
  root.style = { background: "#ffffff", color: "#111827" };
  const hero = makeNode("section"); hero.name = "Hero"; hero.style = { ...hero.style, display: "flex", padding: "88px 72px", background: "#ffffff" };
  const heading = makeNode("text"); heading.name = "Heading"; heading.props.text = "Build interfaces at the speed of thought."; heading.style.fontSize = "56px";
  const copy = makeNode("text"); copy.name = "Body"; copy.props.text = "Create polished responsive products visually and export clean source code."; copy.style = { color: "#64748b", fontSize: "18px", fontWeight: "400" };
  const cta = makeNode("button"); cta.name = "Primary CTA"; cta.props.text = "Start building";
  hero.children = [heading, copy, cta]; root.children = [hero];
  return { format: "open-ui", version: 1, id: crypto.randomUUID(), name: "Untitled project", updatedAt: new Date().toISOString(), root };
}

export function findNode(node: OpenUiNode, target: string): OpenUiNode | undefined {
  if (node.id === target) return node;
  for (const child of node.children) { const found = findNode(child, target); if (found) return found; }
}

export function updateNode(node: OpenUiNode, target: string, patch: Partial<OpenUiNode>): OpenUiNode {
  if (node.id === target) return { ...node, ...patch };
  return { ...node, children: node.children.map((child) => updateNode(child, target, patch)) };
}

export function removeNode(node: OpenUiNode, target: string): OpenUiNode {
  return { ...node, children: node.children.filter((child) => child.id !== target).map((child) => removeNode(child, target)) };
}

export function addNode(node: OpenUiNode, parent: string, child: OpenUiNode): OpenUiNode {
  if (node.id === parent) return { ...node, children: [...node.children, child] };
  return { ...node, children: node.children.map((item) => addNode(item, parent, child)) };
}
