import React from "react";

export interface StagePreviewOverlayProps {
  stage: {
    id: string;
    name: string;
    prompt: string;
    output?: string;
    metadata?: Record<string, any>;
  };
  visible: boolean;
  position: { x: number; y: number };
}

const StagePreviewOverlay: React.FC<StagePreviewOverlayProps> = ({ stage, visible, position }) => {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        background: "#fff",
        border: "1px solid #91d5ff",
        borderRadius: 10,
        boxShadow: "0 4px 24px rgba(24,144,255,0.10)",
        padding: 18,
        minWidth: 260,
        zIndex: 2000,
        pointerEvents: "none"
      }}
    >
      <div style={{ fontWeight: 700, color: "#1890ff", fontSize: 16, marginBottom: 4 }}>{stage.name}</div>
      <div style={{ color: "#555", fontSize: 14, marginBottom: 8 }}>
        <strong>Prompt:</strong> {stage.prompt}
      </div>
      {stage.output && (
        <div style={{ fontSize: 13, color: "#888", marginBottom: 6 }}>
          <strong>Output:</strong> {stage.output}
        </div>
      )}
      {stage.metadata && (
        <div style={{ fontSize: 12, color: "#aaa" }}>
          <strong>Meta:</strong> {JSON.stringify(stage.metadata)}
        </div>
      )}
    </div>
  );
};

export default StagePreviewOverlay;