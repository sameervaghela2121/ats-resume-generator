import axios from "axios";

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const CLAUDE_API_KEY = import.meta.env.VITE_CLAUDE_API_KEY;

export const generateATSResume = async (
  jobDescription,
  resumeContent,
  userApiKey
) => {
  const apiKey = userApiKey || OPENAI_API_KEY;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant specializing in creating ATS-friendly resumes.",
          },
          {
            role: "user",
            content: `Here is a job description: ${jobDescription}. Based on this job description, optimize the following resume content to improve its ATS compatibility: ${resumeContent}.`,
          },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating ATS-friendly resume with ChatGPT:", error);
    throw error;
  }
};

export const generateATSResumeWithClaude = async (
  jobDescription,
  resumeContent,
  userApiKey
) => {
  const apiKey = userApiKey || CLAUDE_API_KEY;
  try {
    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      {
        prompt: `Based on the following job description:\n${jobDescription}\nOptimize the following resume for ATS compliance:\n${resumeContent}`,
        max_tokens: 1500,
        stop: ["\n\n"],
        model: "claude-gemini-1",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );
    return response.data.completion;
  } catch (error) {
    console.error(
      "Error generating ATS-friendly resume with Claude Gemini:",
      error
    );
    throw error;
  }
};
