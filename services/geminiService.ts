
import { GoogleGenAI, Type } from "@google/genai";

export const cleanReviewWithAI = async (rawNotes: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform the following rough employee performance notes into a professional, neutral, and structured HR review suitable for a dealership platform. 
      Ensure it is objective and avoids emotional language while maintaining the core facts.
      
      Notes: "${rawNotes}"`,
      config: {
        systemInstruction: "You are a professional HR auditor for an automotive dealership group. Your task is to polish rough remarks into professional, objective language that complies with Indian privacy and defamation laws."
      }
    });
    return response.text?.trim() || rawNotes;
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return rawNotes;
  }
};

export const getHiringSnapshot = async (reviews: string[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Summarize the following dealership reviews into a concise 2-sentence "Hiring Snapshot" for a new recruiter.
      Reviews: ${JSON.stringify(reviews)}`,
    });
    return response.text?.trim() || "No snapshot available.";
  } catch (error) {
    return "Error generating snapshot.";
  }
};
