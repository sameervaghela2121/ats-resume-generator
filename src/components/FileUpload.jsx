import React from "react";

function FileUpload({ setResumeFile }) {
  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Upload Resume</h2>
      <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
    </div>
  );
}

export default FileUpload;
