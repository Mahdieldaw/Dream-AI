import React, { useState } from "react";

const mockPrompts = [
  { id: 1, title: "Summarize Text", content: "Summarize the following text in 3 bullet points." },
  { id: 2, title: "Rewrite for Clarity", content: "Rewrite this passage for clarity and conciseness." },
  { id: 3, title: "Generate Questions", content: "Generate 5 thoughtful questions about this topic." }
];

function PromptLibraryDrawer({ selectedId, onSelect }) {
  return (
    <div style={{ padding: "24px 20px" }}>
      <h4 style={{ margin: "0 0 12px 0", color: "#1890ff", fontWeight: 700 }}>Saved Prompts</h4>
      <div>
        {mockPrompts.map(prompt => (
          <div
            key={prompt.id}
            onClick={() => onSelect(prompt.id)}
            style={{
              background: selectedId === prompt.id ? "#e6f7ff" : "#fff",
              border: selectedId === prompt.id ? "2px solid #1890ff" : "1px solid #d6e4ff",
              borderRadius: 8,
              padding: "12px 14px",
              marginBottom: 10,
              cursor: "pointer",
              boxShadow: selectedId === prompt.id ? "0 2px 8px rgba(24,144,255,0.10)" : undefined,
              transition: "all 0.15s"
            }}
          >
            <div style={{ fontWeight: 600, color: "#1890ff" }}>{prompt.title}</div>
            <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{prompt.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PromptLibraryDrawer;