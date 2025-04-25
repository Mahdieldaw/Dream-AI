import React from 'react';

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ value, onChange }) => {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontWeight: 600, fontSize: 15, color: "#1890ff", marginBottom: 6, display: "block" }}>Prompt (Mock)</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: "100%",
          minHeight: 90,
          border: "1px solid #91d5ff",
          borderRadius: 6,
          padding: 10,
          fontSize: 15,
          fontFamily: "Inter, monospace",
          resize: "vertical",
          background: "#f7faff"
        }}
        placeholder="Edit the prompt for this stage..."
        aria-label="Prompt editor"
      />
    </div>
  );
};

export default PromptEditor;