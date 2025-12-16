import { GoogleGenAI } from "@google/genai";
import { MY_STATS, PROJECTS } from '../constants';

const API_KEY = process.env.API_KEY || '';

let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const generateTacticalResponse = async (userMessage: string): Promise<string> => {
  if (!ai) {
    return "COMMUNICATIONS OFFLINE. API KEY NOT FOUND.";
  }

  // Construct context from portfolio data
  const context = `
    You are a Tactical AI Assistant for Pratham's portfolio, styled like the announcer/AI from the game Valorant.
    Your tone is tactical, concise, and slightly futuristic. Use terms like "Agent", "Protocol", "Mission", "Arsenal" (for skills).
    
    Here is Pratham's Intel:
    Role: ${MY_STATS.role}
    Specialty: ${MY_STATS.specialty}
    Bio: ${MY_STATS.biography}
    Top Skills (Abilities): ${MY_STATS.abilities.map(a => a.name).join(', ')}
    
    Mission History (Projects):
    ${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`).join('\n')}
    
    User Query: ${userMessage}
    
    Respond directly to the user's query in character. Keep it brief (under 50 words if possible).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: context,
    });
    return response.text || "RADIO SILENCE... REPEAT LAST TRANSMISSION.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "SIGNAL INTERFERENCE. CONNECTION LOST.";
  }
};