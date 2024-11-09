import React from "react";

function ATSScore({ scoreData }) {
  if (!scoreData) return null;

  return (
    <div>
      <h2>ATS Score</h2>
      <p>
        Your resume matches <strong>{scoreData.score}%</strong> of the job
        description keywords.
      </p>

      <h3>Matched Keywords</h3>
      <p>{scoreData.matchedKeywords.join(", ")}</p>

      <h3>Missing Keywords</h3>
      <p>{scoreData.missingKeywords.join(", ")}</p>
    </div>
  );
}

export default ATSScore;
