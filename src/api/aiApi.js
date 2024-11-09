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
