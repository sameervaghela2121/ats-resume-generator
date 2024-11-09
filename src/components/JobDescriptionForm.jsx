import React from "react";

function JobDescriptionForm({ jobDescription, setJobDescription }) {
  return (
    <div>
      <h2>Enter Job Description</h2>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        style={{ width: "100%" }}
      />
    </div>
  );
}

export default JobDescriptionForm;
