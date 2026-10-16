import type { OpenUiNode } from "../types/document";

const esc = (value = "") => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const css = (style: OpenUiNode["style"]) => Object.entries(style).filter(([, v]) => v).map(([k, v]) => `${k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}:${v}`).join(";");
function htmlNode(node: OpenUiNode): string {
  const style = esc(css(node.style));
  if (node.type === "text") return `<div style="${style}">${esc(node.props.text)}</div>`;
  if (node.type === "button") return `<button style="${style}">${esc(node.props.text)}</button>`;
  if (node.type === "image") return `<img src="${esc(node.props.src)}" alt="${esc(node.props.alt)}" style="${style}" />`;
  return `<${node.type === "section" ? "section" : "main"} style="${style}">${node.children.map(htmlNode).join("")}</${node.type === "section" ? "section" : "main"}>`;
}
export const exportHtml = (root: OpenUiNode) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Open UI Export</title></head><body style="margin:0">${htmlNode(root)}</body></html>`;
