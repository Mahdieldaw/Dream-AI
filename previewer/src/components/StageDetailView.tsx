import React from "react";

export interface StageDetailViewProps {
  stage: {
    id: string;
    name: string;
    prompt: string;
    output?: string;
    validatorStatus?: "pass" | "fail" | null;
    isGeneration?: boolean;
    restoredFromSnapshot?: boolean;
    metadata?: Record<string, any>;
  };
  onRetry: () => void;
  onInjectSnapshot: () => void;
  onRestorePrompt: () => void;
  onBack: () => void;
}

const StageDetailView: React.FC<StageDetailViewProps> = ({ stage, onRetry, onInjectSnapshot, onRestorePrompt, onBack }) => {
  return (
    <div style={{ padding: 32, background: "#fff", borderRadius: 12, minWidth: 420, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
        <button onClick={onBack} style={{ marginRight: 16, background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "#888" }}>&larr;</button>
        <h2 style={{ fontWeight: 700, fontSize: 22, margin: 0 }}>{stage.name} Stage</h2>
        {stage.isGeneration && <span title="Saved Generation" style={{ marginLeft: 10, color: "#faad14", fontSize: 18 }}>★</span>}
        {stage.restoredFromSnapshot && <span title="Restored from Snapshot" style={{ marginLeft: 8, color: "#722ed1", fontSize: 15 }}>⎌</span>}
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, color: "#1890ff", marginBottom: 6 }}>Prompt</div>
        <textarea value={stage.prompt} readOnly style={{ width: "100%", minHeight: 60, border: "1px solid #eee", borderRadius: 6, padding: 8, fontSize: 15, background: "#f7f8fa" }} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, color: "#52c41a", marginBottom: 6 }}>Output</div>
        <textarea value={stage.output || ""} readOnly style={{ width: "100%", minHeight: 60, border: "1px solid #eee", borderRadius: 6, padding: 8, fontSize: 15, background: "#f7f8fa" }} />
      </div>
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontWeight: 600, color: "#888", marginBottom: 6 }}>Validator Status</div>
        <span style={{ color: stage.validatorStatus === "pass" ? "#52c41a" : stage.validatorStatus === "fail" ? "#ff4d4f" : "#aaa" }}>
          {stage.validatorStatus ? stage.validatorStatus.toUpperCase() : "N/A"}
        </span>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
        <button onClick={onRetry} style={{ background: "#1890ff", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}>Retry</button>
        <button onClick={onInjectSnapshot} style={{ background: "#faad14", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}>Inject Snapshot</button>
        <button onClick={onRestorePrompt} style={{ background: "#722ed1", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}>Restore Prompt</button>
      </div>
      {stage.metadata && (
        <div style={{ fontSize: 13, color: "#aaa", marginTop: 12 }}>
          <strong>Meta:</strong> {JSON.stringify(stage.metadata)}
        </div>
      )}
    </div>
  );
};

export default StageDetailView;