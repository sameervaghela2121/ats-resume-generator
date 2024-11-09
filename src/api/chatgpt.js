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
              "You are a highly knowledgeable assistant with expertise in creating ATS-friendly resumes that effectively showcase relevant skills and experiences aligned with job requirements.",
          },
          {
            role: "user",
            content: `Using the following job description: ${jobDescription}, enhance the resume provided below to be fully optimized for ATS systems. Ensure it contains:
              - Key skills and keywords from the job description
              - A clear and concise summary section that highlights relevant experience
              - Quantifiable achievements, wherever applicable
              - A structured layout that ATS software can easily parse
              - Consistent formatting and professional tone
        
            Here is the resume to optimize: ${resumeContent}.
            
            Additionally, suggest any improvements in wording, structure, or specific sections that would strengthen this resume's impact for the targeted position.`,
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
