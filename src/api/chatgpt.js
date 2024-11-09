import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

const getApiUrlAndHeaders = (model, apiKey) => {
  switch (model) {
    case "ChatGPT":
      return {
        url: "https://api.openai.com/v1/chat/completions",
        headers: { Authorization: `Bearer ${apiKey}` },
      };
    case "Claude":
      return {
        url: "https://api.anthropic.com/v1/claude/completions",
        headers: { Authorization: `Bearer ${apiKey}` },
      };
    case "Gemini":
      return {
        url: "https://api.gemini.com/v1/completions",
        headers: { Authorization: `Bearer ${apiKey}` },
      };
    default:
      throw new Error("Unsupported AI model");
  }
};

export const generateATSResume = async (
  jobDescription,
  resumeContent,
  model,
  apiKey
) => {
  const { url, headers } = getApiUrlAndHeaders(model, apiKey);

  try {
    const response = await axios.post(
      url,
      {
        model: model === "ChatGPT" ? "gpt-4" : "your-model-id", // specify models if necessary
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant for creating ATS-friendly resumes.",
          },
          {
            role: "user",
            content: `Based on this job description: ${jobDescription}, optimize this resume: ${resumeContent}.`,
          },
        ],
        max_tokens: 1500,
      },
      { headers }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error generating resume with ${model}:`, error);
    throw error;
  }
};
