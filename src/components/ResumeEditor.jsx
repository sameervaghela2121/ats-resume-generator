import React, { useState, useEffect } from "react";
import { generateATSResume } from "../api/chatgpt";
import { calculateATSScore } from "../api/atsScoring";
import ATSScore from "./ATSScore";

function ResumeEditor({ jobDescription, resumeFile }) {
  const [resumeContent, setResumeContent] = useState("");
  const [optimizedResume, setOptimizedResume] = useState("");
  const [scoreData, setScoreData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateResume = async () => {
    if (!jobDescription || !resumeContent) {
      alert("Please provide both a job description and resume content.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const generatedResume = await generateATSResume(
        jobDescription,
        resumeContent
      );
      setOptimizedResume(generatedResume);
      const score = calculateATSScore(jobDescription, generatedResume);
      setScoreData(score);
    } catch (error) {
      console.error("Error generating optimized resume:", error);
      setError("Failed to generate optimized resume. Please try again.");
    }
    setLoading(false);
  };

  const handleFileRead = (e) => {
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      setResumeContent(event.target.result);
    };
    fileReader.onerror = () => {
      setError(
        "Error reading resume file. Please try again with a different file."
      );
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
      {error && <p style={{ color: "red" }}>{error}</p>}
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
