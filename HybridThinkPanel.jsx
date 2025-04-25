import React, { useState } from "react";

const mockSnapshots = [
  { id: 1, timestamp: "2024-06-01 10:15", stageLabel: "Ideation", preview: "Brainstorm and collect ideas." },
  { id: 2, timestamp: "2024-06-01 10:45", stageLabel: "Drafting", preview: "Create the first draft." },
  { id: 3, timestamp: "2024-06-01 11:05", stageLabel: "Editing", preview: "Refine and improve." }
];

function SnapshotPreviewTooltip({ visible, preview, position }) {
  if (!visible) return null;
  return (
    <div style={{
      position: "fixed",
      left: position?.x || 200,
      top: position?.y || 200,
      background: "#fff",
      border: "1px solid #91d5ff",
      borderRadius: 10,
      boxShadow: "0 4px 24px rgba(24,144,255,0.10)",
      padding: 14,
      minWidth: 180,
      zIndex: 5000,
      pointerEvents: "none"
    }}>
      <div style={{ color: "#1890ff", fontWeight: 600, marginBottom: 4 }}>Preview</div>
      <div style={{ color: "#555", fontSize: 14 }}>{preview}</div>
    </div>
  );
}

function RestoreButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#52c41a",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        padding: "6px 14px",
        fontWeight: 600,
        cursor: "pointer",
        marginLeft: 10
      }}
    >
      Restore
    </button>
  );
}

function SnapshotList({ snapshots, onRestore, onHover, onHoverOut }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({});

  return (
    <div>
      {snapshots.map(snap => (
        <div
          key={snap.id}
          style={{
            display: "flex",
            alignItems: "center",
            background: hoveredId === snap.id ? "#e6f7ff" : "#fff",
            border: "1px solid #d6e4ff",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 12,
            position: "relative"
          }}
          onMouseEnter={e => {
            setHoveredId(snap.id);
            setTooltipPos({ x: e.clientX + 16, y: e.clientY });
            onHover && onHover(snap, { x: e.clientX + 16, y: e.clientY });
          }}
          onMouseLeave={() => {
            setHoveredId(null);
            onHoverOut && onHoverOut();
          }}
        >
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, color: "#1890ff" }}>{snap.stageLabel}</div>
            <div style={{ fontSize: 13, color: "#888" }}>{snap.timestamp}</div>
          </div>
          <RestoreButton onClick={() => onRestore(snap)} />
          {hoveredId === snap.id && (
            <SnapshotPreviewTooltip visible={true} preview={snap.preview} position={tooltipPos} />
          )}
        </div>
      ))}
    </div>
  );
}

function HybridThinkPanel({ open, onClose }) {
  const [showToast, setShowToast] = useState(false);

  const handleRestore = snap => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1600);
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed",
      right: 0,
      bottom: 0,
      top: 0,
      width: 360,
      background: "#f0f5ff",
      boxShadow: "-4px 0 24px rgba(24,144,255,0.10)",
      zIndex: 5000,
      padding: 32,
      display: "flex",
      flexDirection: "column"
    }}>
      <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "#f5f5f5", border: "none", borderRadius: 4, padding: 4, cursor: "pointer" }}>✕</button>
      <h3 style={{ marginBottom: 18, color: "#1890ff", fontWeight: 700 }}>Hybrid Think Panel</h3>
      <SnapshotList
        snapshots={mockSnapshots}
        onRestore={handleRestore}
      />
      {showToast && (
        <div style={{
          position: "fixed",
          bottom: 40,
          right: 60,
          background: "#52c41a",
          color: "#fff",
          padding: "10px 22px",
          borderRadius: 8,
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(82,196,26,0.15)",
          zIndex: 6000
        }}>
          Snapshot restored (mock)
        </div>
      )}
    </div>
  );
}

export default HybridThinkPanel;