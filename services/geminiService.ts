import { GoogleGenAI, Type } from "@google/genai";

// FIX: Aligned with Gemini API guidelines by initializing GoogleGenAI directly
// with process.env.API_KEY and removing manual key validation checks.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface SummaryResponse {
  summary: string;
  tags: string[];
}

export const summarizeContent = async (content: string): Promise<SummaryResponse> => {
  const prompt = `You are an expert content distiller. Analyze the following content and provide a concise, neutral summary (around 2-3 sentences) and exactly 3 relevant tags in JSON format.
  
Content to analyze:
---
${content}
---
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A concise 2-3 sentence summary of the content.",
            },
            tags: {
              type: Type.ARRAY,
              description: "An array of exactly 3 relevant string tags.",
              items: {
                type: Type.STRING,
              },
            },
          },
          required: ["summary", "tags"],
        },
      },
    });

    const jsonString = response.text.trim();
    const parsed: SummaryResponse = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Provide a fallback response in case of API error
    return {
      summary: "Could not generate a summary for this content.",
      tags: ["error"],
    };
  }
};
