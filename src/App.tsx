import {
  Box,
  ChevronDown,
  Code2,
  Component,
  Grid2X2,
  Image,
  Layers3,
  Laptop,
  MessageSquareText,
  MousePointer2,
  PanelBottom,
  Play,
  Plus,
  Redo2,
  Save,
  Search,
  Settings2,
  Smartphone,
  Sparkles,
  Square,
  Tablet,
  Type,
  Undo2,
} from "lucide-react";
import { useMemo, useState } from "react";

type Device = "desktop" | "tablet" | "mobile";
type LeftTab = "components" | "layers" | "assets";

const components = [
  { name: "Frame", icon: Square },
  { name: "Text", icon: Type },
  { name: "Button", icon: Box },
  { name: "Image", icon: Image },
  { name: "Grid", icon: Grid2X2 },
  { name: "Component", icon: Component },
];

export function App() {
  const [device, setDevice] = useState<Device>("desktop");
  const [leftTab, setLeftTab] = useState<LeftTab>("components");
  const [selected, setSelected] = useState("hero-button");
  const [bottomOpen, setBottomOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [zoom, setZoom] = useState(85);

  const canvasWidth = useMemo(
    () => ({ desktop: 1040, tablet: 760, mobile: 390 })[device],
    [device],
  );

  return (
    <main className="app-shell">
      <header className="titlebar">
        <div className="brand"><span className="brand-mark"><Component size={17} /></span><strong>Open UI</strong><span className="alpha">ALPHA</span></div>
        <div className="project-title"><span className="status-dot" /> Untitled project <ChevronDown size={14} /></div>
        <div className="title-actions">
          <button className="icon-button" title="Undo"><Undo2 size={16} /></button>
          <button className="icon-button" title="Redo"><Redo2 size={16} /></button>
          <span className="divider" />
          <button className="toolbar-button"><Save size={15} /> Save</button>
          <button className="toolbar-button"><Play size={15} /> Preview</button>
          <button className="primary-button"><Code2 size={15} /> Export</button>
        </div>
      </header>

      <section className="workspace">
        <aside className="left-panel">
          <nav className="panel-tabs">
            <button className={leftTab === "components" ? "active" : ""} onClick={() => setLeftTab("components")}><Component size={16} />Components</button>
            <button className={leftTab === "layers" ? "active" : ""} onClick={() => setLeftTab("layers")}><Layers3 size={16} />Layers</button>
            <button className={leftTab === "assets" ? "active" : ""} onClick={() => setLeftTab("assets")}><Image size={16} />Assets</button>
          </nav>
          <div className="search"><Search size={15} /><input aria-label="Search panel" placeholder={`Search ${leftTab}`} /></div>
          {leftTab === "components" && <div className="component-section">
            <div className="section-heading"><span>Basics</span><button><Plus size={14} /></button></div>
            <div className="component-grid">{components.map(({ name, icon: Icon }) => <button className="component-tile" key={name}><Icon size={20} /><span>{name}</span></button>)}</div>
            <div className="section-heading"><span>Quick sections</span></div>
            <button className="library-card"><div className="library-preview"><span /><span /><span /></div><div><strong>Hero section</strong><small>Responsive starter</small></div></button>
          </div>}
          {leftTab === "layers" && <div className="layer-list">
            <button className="layer"><Layers3 size={14} /> Page</button>
            <button className="layer indent"><Square size={14} /> Hero</button>
            <button className="layer indent2"><Type size={14} /> Heading</button>
            <button className={selected === "hero-button" ? "layer indent2 selected" : "layer indent2"} onClick={() => setSelected("hero-button")}><Box size={14} /> Primary CTA</button>
          </div>}
          {leftTab === "assets" && <div className="empty-state"><Image size={30} /><strong>Your assets</strong><span>Images and SVGs stay with your local project.</span><button className="secondary-button"><Plus size={15} /> Add asset</button></div>}
          <div className="left-footer"><button><Settings2 size={16} /> Settings</button><span className="offline-pill">Local</span></div>
        </aside>

        <section className="editor-area">
          <div className="canvas-toolbar">
            <div className="tool-group"><button className="tool active" title="Select"><MousePointer2 size={16} /></button><button className="tool" title="Frame"><Square size={16} /></button><button className="tool" title="Text"><Type size={16} /></button></div>
            <div className="device-switcher">
              <button className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")} title="Desktop"><Laptop size={16} /></button>
              <button className={device === "tablet" ? "active" : ""} onClick={() => setDevice("tablet")} title="Tablet"><Tablet size={16} /></button>
              <button className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")} title="Mobile"><Smartphone size={16} /></button>
            </div>
            <div className="zoom"><button onClick={() => setZoom(Math.max(25, zoom - 10))}>−</button><span>{zoom}%</span><button onClick={() => setZoom(Math.min(200, zoom + 10))}>+</button></div>
          </div>
          <div className="canvas-stage">
            <div className="artboard" style={{ width: canvasWidth, transform: `scale(${zoom / 100})` }}>
              <div className="mock-nav"><strong>Northstar</strong><div><span>Product</span><span>Solutions</span><span>Pricing</span></div><button>Sign in</button></div>
              <div className="mock-hero">
                <span className="eyebrow">DESIGN WITHOUT LIMITS</span>
                <h1>Build interfaces<br />at the speed of thought.</h1>
                <p>Create polished, responsive products visually. Keep full control of every element and export clean source code.</p>
                <div className="mock-actions"><button className={selected === "hero-button" ? "mock-primary selected-node" : "mock-primary"} onClick={() => setSelected("hero-button")}>Start building</button><button className="mock-secondary">Explore components</button></div>
              </div>
            </div>
          </div>
          {bottomOpen && <div className="bottom-panel"><div className="bottom-tabs"><button className="active"><Code2 size={14} /> Code</button><button><Undo2 size={14} /> History</button><button><PanelBottom size={14} /> Problems <span className="count">0</span></button><button className="close-bottom" onClick={() => setBottomOpen(false)}>×</button></div><pre><span className="muted">// Live document output</span>{"\n"}<span className="keyword">export function</span> Hero() &#123; <span className="keyword">return</span> &lt;section&gt;...&lt;/section&gt; &#125;</pre></div>}
          {!bottomOpen && <button className="reopen-bottom" onClick={() => setBottomOpen(true)}><Code2 size={15} /> Code</button>}
        </section>

        <aside className="right-panel">
          <div className="inspector-head"><div><small>BUTTON</small><strong>Primary CTA</strong></div><button className="icon-button"><Settings2 size={16} /></button></div>
          <InspectorSection title="Layout"><div className="segmented"><button className="active">Flex</button><button>Grid</button><button>Block</button></div><div className="field-row"><label>W<input defaultValue="Auto" /></label><label>H<input defaultValue="44" /></label></div><div className="field-row"><label>X<input defaultValue="0" /></label><label>Y<input defaultValue="0" /></label></div></InspectorSection>
          <InspectorSection title="Spacing"><div className="spacing-box"><span>12</span><div><span>20</span><b>Content</b><span>20</span></div><span>12</span></div></InspectorSection>
          <InspectorSection title="Typography"><select defaultValue="Inter"><option>Inter</option><option>System UI</option></select><div className="field-row"><label>Size<input defaultValue="15" /></label><label>Weight<input defaultValue="600" /></label></div></InspectorSection>
          <InspectorSection title="Fill"><div className="color-field"><span className="swatch" /><input defaultValue="#6C5CE7" /><span>100%</span></div></InspectorSection>
          <InspectorSection title="Border & radius"><div className="field-row"><label>Radius<input defaultValue="10" /></label><label>Border<input defaultValue="0" /></label></div></InspectorSection>
          <InspectorSection title="Accessibility"><label className="full-field">Accessible name<input defaultValue="Start building" /></label></InspectorSection>
        </aside>
      </section>

      <button className={aiOpen ? "ai-fab open" : "ai-fab"} onClick={() => setAiOpen(!aiOpen)}><Sparkles size={18} /><span>AI</span></button>
      {aiOpen && <aside className="ai-panel"><header><div><Sparkles size={17} /><strong>Open UI AI</strong></div><span className="local-badge">LOCAL</span></header><div className="ai-body"><div className="ai-welcome"><MessageSquareText size={30} /><strong>Design with your local model</strong><p>Ask for a layout or select an element and describe a change. Proposed edits remain reviewable and undoable.</p></div></div><div className="ai-input"><textarea placeholder="e.g. Make this hero more minimal..." /><button><Sparkles size={16} /></button></div></aside>}
    </main>
  );
}

function InspectorSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="inspector-section"><div className="section-heading"><span>{title}</span><button><Plus size={13} /></button></div>{children}</section>;
}
