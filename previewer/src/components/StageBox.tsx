import React from "react";

export type StageStatus = "pending" | "in-progress" | "complete" | "failed";

export interface StageBoxProps {
  stage: {
    id: string;
    name: string;
    icon?: React.ReactNode;
    status: StageStatus;
    validatorStatus?: "pass" | "fail" | null;
    isGeneration?: boolean;
    restoredFromSnapshot?: boolean;
    summary?: string;
  };
  selected: boolean;
  onClick: () => void;
  onHover: (hovered: boolean) => void;
  onEllipsis: (e: React.MouseEvent) => void;
}

const statusColors: Record<StageStatus, string> = {
  "pending": "#d9d9d9",
  "in-progress": "#1890ff",
  "complete": "#52c41a",
  "failed": "#ff4d4f"
};

const validatorColors: Record<string, string> = {
  "pass": "#52c41a",
  "fail": "#ff4d4f"
};

const StageBox: React.FC<StageBoxProps> = ({ stage, selected, onClick, onHover, onEllipsis }) => {
  return (
    <div
      className="stage-box"
      style={{
        minWidth: 120,
        maxWidth: 160,
        background: selected ? "#e6f7ff" : "#fff",
        border: `2px solid ${selected ? "#1890ff" : statusColors[stage.status]}`,
        borderRadius: 10,
        boxShadow: selected ? "0 2px 12px rgba(24,144,255,0.10)" : "0 1px 4px rgba(0,0,0,0.04)",
        padding: 14,
        marginRight: 12,
        cursor: "pointer",
        position: "relative",
        transition: "all 0.18s"
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onContextMenu={onEllipsis}
    >
      <div style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
        {stage.icon && <span style={{ marginRight: 6 }}>{stage.icon}</span>}
        <span style={{ fontWeight: 600, fontSize: 15 }}>{stage.name}</span>
        {stage.isGeneration && (
          <span title="Saved Generation" style={{ marginLeft: 6, color: "#faad14", fontSize: 16 }}>★</span>
        )}
      </div>
      <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>{stage.summary || ""}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: statusColors[stage.status], display: "inline-block" }} title={stage.status}></span>
        {stage.validatorStatus && (
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: validatorColors[stage.validatorStatus], display: "inline-block" }} title={`Validator: ${stage.validatorStatus}`}></span>
        )}
        {stage.restoredFromSnapshot && (
          <span title="Restored from Snapshot" style={{ marginLeft: 4, color: "#722ed1", fontSize: 13 }}>⎌</span>
        )}
      </div>
      <button
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          color: "#888"
        }}
        onClick={onEllipsis}
        tabIndex={-1}
        aria-label="Stage options"
      >
        ⋮
      </button>
    </div>
  );
};

export default StageBox;