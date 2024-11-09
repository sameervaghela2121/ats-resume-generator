import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const API_URL = "https://api.openai.com/v1/chat/completions";

export const generateATSResume = async (jobDescription, resumeContent) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
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
        max_tokens: 1500, // Adjust as needed for the length of the resume content
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating ATS-friendly resume:", error);
    throw error;
  }
};
