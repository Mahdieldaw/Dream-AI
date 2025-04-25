import React from "react";

function HoverPreviewBox({ stage, visible, position }) {
  if (!visible || !stage) return null;
  return (
    <div style={{
      position: "fixed",
      left: position?.x || 120,
      top: position?.y || 120,
      background: "#fff",
      border: "1px solid #91d5ff",
      borderRadius: 10,
      boxShadow: "0 4px 24px rgba(24,144,255,0.10)",
      padding: 18,
      minWidth: 220,
      zIndex: 2000,
      pointerEvents: "none"
    }}>
      <div style={{ fontWeight: 700, color: "#1890ff", fontSize: 16, marginBottom: 4 }}>{stage.title}</div>
      <div style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>{stage.summary}</div>
      <div style={{ fontSize: 13, color: "#888" }}><strong>Prompt:</strong> {stage.prompt}</div>
    </div>
  );
}

export default HoverPreviewBox;