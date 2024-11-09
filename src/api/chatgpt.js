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
