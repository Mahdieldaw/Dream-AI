import React, { useState } from "react";
import GhostOverlay from "./GhostOverlay";
import PromptLibraryDrawer from "./PromptLibraryDrawer";
import WorkflowRecallList from "./WorkflowRecallList";

const tabBtnStyle = isActive => ({
  flex: 1,
  padding: "12px 0",
  fontWeight: 700,
  color: isActive ? "#1890ff" : "#888",
  background: isActive ? "#e6f7ff" : "#f5f5f5",
  border: "none",
  borderBottom: isActive ? "2.5px solid #1890ff" : "2.5px solid transparent",
  borderRadius: isActive ? "16px 16px 0 0" : "16px 16px 0 0",
  cursor: "pointer",
  outline: "none",
  transition: "all 0.15s"
});

function GhostOverlayEntry() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("prompts");
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  // Hotkey: Ctrl+Shift+G
  React.useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "g") {
        setOpen(v => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 10000,
          background: "#fff",
          color: "#1890ff",
          border: "1.5px solid #1890ff",
          borderRadius: 24,
          padding: "12px 28px",
          fontWeight: 700,
          fontSize: 16,
          boxShadow: "0 2px 12px rgba(24,144,255,0.08)",
          cursor: "pointer"
        }}
        aria-label="Open Ghost Overlay"
      >
        👻 Open Ghost
      </button>
      <GhostOverlay open={open} onClose={() => setOpen(false)}>
        <div style={{ display: "flex", flexDirection: "row", borderBottom: "1.5px solid #f0f0f0" }}>
          <button style={tabBtnStyle(tab === "prompts")}
            onClick={() => { setTab("prompts"); setSelectedPrompt(null); }}>
            Saved Prompts
          </button>
          <button style={tabBtnStyle(tab === "workflows")}
            onClick={() => { setTab("workflows"); setSelectedWorkflow(null); }}>
            Previous Workflows
          </button>
        </div>
        <div style={{ flex: 1, minHeight: 320, background: "#fff", borderRadius: "0 0 16px 16px" }}>
          {tab === "prompts" ? (
            <PromptLibraryDrawer selectedId={selectedPrompt} onSelect={setSelectedPrompt} />
          ) : (
            <WorkflowRecallList selectedId={selectedWorkflow} onSelect={setSelectedWorkflow} />
          )}
        </div>
      </GhostOverlay>
    </>
  );
}

export default GhostOverlayEntry;