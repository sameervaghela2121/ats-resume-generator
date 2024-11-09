import React, { useState, useEffect } from "react";
import { generateATSResume } from "../api/aiApi"; // Update the API handler
import { calculateATSScore } from "../api/atsScoring";
import ATSScore from "./ATSScore";
import ModelSelector from "./ModelSelector";

function ResumeEditor({ jobDescription, resumeFile }) {
  const [resumeContent, setResumeContent] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("ChatGPT");
  const [apiKeys, setApiKeys] = useState({
    chatgpt: import.meta.env.VITE_OPENAI_API_KEY,
    claude: import.meta.env.VITE_CLAUDE_API_KEY,
    gemini: import.meta.env.VITE_GEMINI_API_KEY,
  });

  const handleModelChange = (model, userApiKeys) => {
    setSelectedModel(model);
    setApiKeys({
      ...apiKeys,
      ...userApiKeys,
    });
  };

  const handleGenerateResume = async () => {
    if (!jobDescription || !resumeContent) {
      alert("Please provide both a job description and resume content.");
      return;
    }

    setLoading(true);
    try {
      const generatedResume = await generateATSResume(
        jobDescription,
        resumeContent,
        selectedModel,
        apiKeys
      );
      setOptimizedResume(generatedResume);
      const score = calculateATSScore(jobDescription, generatedResume);
      setScoreData(score);
    } catch (error) {
      console.error("Error generating optimized resume:", error);
      alert("Failed to generate optimized resume. Please try again.");
    }
    setLoading(false);
  };

  const handleFileRead = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setResumeContent(event.target.result);
    };
    fileReader.readAsText(resumeFile);
  };

  useEffect(() => {
    if (resumeFile) {
      handleFileRead();
    }
  }, [resumeFile]);

  return (
    <div>
      <h2>Resume Editor</h2>
      <ModelSelector onModelChange={handleModelChange} />
      <button onClick={handleGenerateResume} disabled={loading}>
        {loading ? "Generating..." : "Generate ATS-Friendly Resume"}
      </button>
      {optimizedResume && (
        <div>
          <h3>Optimized Resume</h3>
          <pre>{optimizedResume}</pre>
        </div>
      )}
      {scoreData && <ATSScore scoreData={scoreData} />}
    </div>
  );
}

export default ResumeEditor;
