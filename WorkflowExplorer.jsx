import React, { useState } from "react";

// Sample data for demonstration
const workflowTemplates = [
  {
    id: 1,
    title: "Content Creation",
    description: "Generate articles, blogs, and creative content.",
    estimate: "15-30 min",
    aiTools: ["GPT-4", "DALL-E"],
    stages: ["Ideation", "Drafting", "Editing", "Publishing"]
  },
  {
    id: 2,
    title: "Strategy Planning",
    description: "Develop business and marketing strategies.",
    estimate: "30-60 min",
    aiTools: ["GPT-4", "Claude"],
    stages: ["Research", "Analysis", "Synthesis", "Action Plan"]
  },
  {
    id: 3,
    title: "Research Assistant",
    description: "Conduct deep research and summarize findings.",
    estimate: "20-40 min",
    aiTools: ["Perplexity", "GPT-4"],
    stages: ["Query", "Gather", "Summarize", "Report"]
  }
];

const recommendedIds = [1, 3]; // Simulate personalized recommendations
const inProgress = [{ id: 2, progress: "Stage 2/4: Analysis" }];

function WorkflowExplorer() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  const handleSelect = (workflow) => setSelectedWorkflow(workflow);
  const handleBack = () => setSelectedWorkflow(null);

  return (
    <div style={{ padding: 32, fontFamily: "Inter, sans-serif", background: "#f7f8fa", minHeight: "100vh" }}>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 8 }}>Workflow Explorer</h1>
      <p style={{ color: "#555", marginBottom: 32 }}>Your hub for launching, exploring, and resuming AI-powered workflows.</p>
      {/* In-progress workflows for returning users */}
      {inProgress.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Continue Where You Left Off</h2>
          <div style={{ display: "flex", gap: 16 }}>
            {inProgress.map((item) => {
              const wf = workflowTemplates.find((w) => w.id === item.id);
              return (
                <div key={item.id} style={{ background: "#fffbe6", border: "1px solid #ffe58f", borderRadius: 8, padding: 16, minWidth: 220 }}>
                  <strong>{wf.title}</strong>
                  <div style={{ fontSize: 14, color: "#b8860b", margin: "8px 0" }}>{item.progress}</div>
                  <button onClick={() => handleSelect(wf)} style={{ background: "#ffd700", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}>Resume</button>
                </div>
              );
            })}
          </div>
        </section>
      )}
      {/* Personalized recommendations */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Recommended for You</h2>
        <div style={{ display: "flex", gap: 16 }}>
          {workflowTemplates.filter(wf => recommendedIds.includes(wf.id)).map((wf) => (
            <div key={wf.id} style={{ background: "#e6f7ff", border: "1px solid #91d5ff", borderRadius: 8, padding: 16, minWidth: 220 }}>
              <strong>{wf.title}</strong>
              <div style={{ fontSize: 14, color: "#1890ff", margin: "8px 0" }}>{wf.description}</div>
              <div style={{ fontSize: 13, color: "#555" }}>Est: {wf.estimate}</div>
              <div style={{ fontSize: 13, color: "#555", marginBottom: 8 }}>AI Tools: {wf.aiTools.join(", ")}</div>
              <button onClick={() => handleSelect(wf)} style={{ background: "#40a9ff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}>Preview</button>
            </div>
          ))}
        </div>
      </section>
      {/* All workflows organized by purpose */}
      <section>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Browse All Workflows</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {workflowTemplates.map((wf) => (
            <div key={wf.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: 8, padding: 16, minWidth: 220, marginBottom: 16 }}>
              <strong>{wf.title}</strong>
              <div style={{ fontSize: 14, color: "#555", margin: "8px 0" }}>{wf.description}</div>
              <div style={{ fontSize: 13, color: "#888" }}>Est: {wf.estimate}</div>
              <div style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>AI Tools: {wf.aiTools.join(", ")}</div>
              <button onClick={() => handleSelect(wf)} style={{ background: "#1890ff", color: "#fff", border: "none", borderRadius: 4, padding: "6px 16px", cursor: "pointer", fontWeight: 600 }}>Preview</button>
            </div>
          ))}
        </div>
      </section>
      {/* Workflow preview modal */}
      {selectedWorkflow && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, minWidth: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <h2 style={{ marginBottom: 8 }}>{selectedWorkflow.title} Workflow</h2>
            <div style={{ color: "#555", marginBottom: 12 }}>{selectedWorkflow.description}</div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>Estimated time: <strong>{selectedWorkflow.estimate}</strong></div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>AI Tools: <strong>{selectedWorkflow.aiTools.join(", ")}</strong></div>
            <div style={{ fontSize: 14, marginBottom: 16 }}>
              <strong>Stages:</strong>
              <ol style={{ margin: "8px 0 0 20px" }}>
                {selectedWorkflow.stages.map((stage, idx) => (
                  <li key={idx}>{stage}</li>
                ))}
              </ol>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
              <button style={{ background: "#52c41a", color: "#fff", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 700, cursor: "pointer" }}>Start Workflow</button>
              <button onClick={handleBack} style={{ background: "#eee", color: "#333", border: "none", borderRadius: 4, padding: "8px 20px", fontWeight: 600, cursor: "pointer" }}>Back</button>
            </div>
          </div>
        </div>
      )}
      {/* Onboarding for new users */}
      {inProgress.length === 0 && (
        <div style={{ marginTop: 32, background: "#f0f5ff", border: "1px solid #adc6ff", borderRadius: 8, padding: 24, textAlign: "center" }}>
          <h3 style={{ marginBottom: 8 }}>New here?</h3>
          <p style={{ color: "#555", marginBottom: 16 }}>Start your first workflow in seconds. Select a template above to begin!</p>
        </div>
      )}
    </div>
  );
}

export default WorkflowExplorer;