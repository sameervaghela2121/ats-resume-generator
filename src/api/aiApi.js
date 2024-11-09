import axios from "axios";

export const generateATSResume = async (
  jobDescription,
  resumeContent,
  model,
  apiKeys
) => {
  try {
    const config = {
      ChatGPT: {
        url: "https://api.openai.com/v1/chat/completions",
        key: apiKeys.chatgpt || import.meta.env.VITE_OPENAI_API_KEY,
      },
      Claude: {
        url: "https://api.claudeai.com/v1/completions",
        key: apiKeys.claude || import.meta.env.VITE_CLAUDE_API_KEY,
      },
      Gemini: {
        url: "https://api.gemini.com/v1/chat/completions",
        key: apiKeys.gemini || import.meta.env.VITE_GEMINI_API_KEY,
      },
    };

    const { url, key } = config[model];

    const response = await axios.post(
      url,
      {
        model: model === "ChatGPT" ? "gpt-3.5-turbo" : "advanced", // Adjust as necessary
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant specializing in creating ATS-friendly resumes.",
          },
          {
            role: "user",
            content: `Here is a job description: ${jobDescription}. Optimize the resume content: ${resumeContent}.`,
          },
        ],
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating ATS-friendly resume:", error);
    throw error;
  }
};
