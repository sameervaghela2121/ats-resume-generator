import { useState } from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import JobDescriptionForm from "./components/JobDescriptionForm";
import ResumeEditor from "./components/ResumeEditor";
import ATSScore from "./components/ATSScore";

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  return (
    <div className="App">
      <h1>ATS-Friendly Resume Builder</h1>
      <JobDescriptionForm
        jobDescription={jobDescription}
        setJobDescription={setJobDescription}
      />
      <FileUpload setResumeFile={setResumeFile} />
      <ResumeEditor jobDescription={jobDescription} resumeFile={resumeFile} />
      <ATSScore />
    </div>
  );
}

export default App;
