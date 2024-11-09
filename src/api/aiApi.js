import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Anthropic } from "@anthropic-ai/sdk";

// Generate ATS Resume Function
export const generateATSResume = async (
  jobDescription,
  resumeContent,
  model,
  apiKeys = {}
) => {
  try {
    let response;

    // Use model-specific logic
    switch (model) {
      case "ChatGPT":
        // Use OpenAI API (ChatGPT)
        const chatGPTApiKey =
          apiKeys.chatgpt || process.env.VITE_OPENAI_API_KEY;
        response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo", // Or any other model you prefer
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant specializing in creating ATS-friendly resumes.",
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
              Authorization: `Bearer ${chatGPTApiKey}`,
            },
          }
        );
        break;

      case "Claude":
        // Use Claude SDK
        const claudeApiKey = apiKeys.claude || process.env.VITE_CLAUDE_API_KEY;
        const anthropic = new Anthropic({ apiKey: claudeApiKey });
        response = await anthropic.messages.create({
          model: "claude-3", // Ensure this matches the correct model
          max_tokens: 1000,
          messages: [
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
        });
        break;

      case "Gemini":
        // Use Gemini SDK (Google Generative AI)
        const geminiApiKey = apiKeys.gemini || process.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const modelInstance = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
        const prompt = `Using the following job description: ${jobDescription}, enhance the resume provided below to be fully optimized for ATS systems. Ensure it contains:
              - Key skills and keywords from the job description
              - A clear and concise summary section that highlights relevant experience
              - Quantifiable achievements, wherever applicable
              - A structured layout that ATS software can easily parse
              - Consistent formatting and professional tone
        
            Here is the resume to optimize: ${resumeContent}.
            
            Additionally, suggest any improvements in wording, structure, or specific sections that would strengthen this resume's impact for the targeted position.`;
        response = await modelInstance.generateContent(prompt);
        break;

      default:
        throw new Error("Unsupported model");
    }

    // Return the optimized resume content
    return response.choices ? response.choices[0].text : response.text;
  } catch (error) {
    console.error("Error generating ATS-friendly resume:", error);
    throw error;
  }
};
