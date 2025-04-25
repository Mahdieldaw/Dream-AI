import StageController from "./StageController";

const mockStage = {
  title: "Sample Stage",
  description: "Sample description for preview",
  summary: "This is a mock summary of the stage for preview purposes.",
  prompt: "Type your prompt here..."
};

export default function StageControllerPreview() {
  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa", padding: 24 }}>
      <StageController stage={mockStage} />
    </div>
  );
}
