import React from "react";

const mockWorkflows = [
  { id: 1, name: "Research Article Flow", summary: "Ideation → Drafting → Editing → Review" },
  { id: 2, name: "Lesson Plan Builder", summary: "Brainstorm → Outline → Write → Refine" },
  { id: 3, name: "Blog Post Pipeline", summary: "Topic → Draft → Edit → Publish" }
];

function WorkflowRecallList({ selectedId, onSelect }) {
  return (
    <div style={{ padding: "24px 20px" }}>
      <h4 style={{ margin: "0 0 12px 0", color: "#1890ff", fontWeight: 700 }}>Previous Workflows</h4>
      <div>
        {mockWorkflows.map(flow => (
          <div
            key={flow.id}
            onClick={() => onSelect(flow.id)}
            style={{
              background: selectedId === flow.id ? "#e6f7ff" : "#fff",
              border: selectedId === flow.id ? "2px solid #1890ff" : "1px solid #d6e4ff",
              borderRadius: 8,
              padding: "12px 14px",
              marginBottom: 10,
              cursor: "pointer",
              boxShadow: selectedId === flow.id ? "0 2px 8px rgba(24,144,255,0.10)" : undefined,
              transition: "all 0.15s"
            }}
          >
            <div style={{ fontWeight: 600, color: "#1890ff" }}>{flow.name}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{flow.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkflowRecallList;