
import { GoogleGenAI, Type } from "@google/genai";

// Utilisation de process.env.GEMINI_API_KEY comme requis par la plateforme
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

export async function getPathDescription(title: string, subtitle: string) {
  if (!apiKey) {
    console.warn("API Key manquante. Le contenu sera limité.");
    return null;
  }

  const ai = new GoogleGenAI({ apiKey: apiKey });

  const prompt = `Génère une présentation courte et attrayante pour la filière scolaire suivante : "${title} - ${subtitle}". 
  Le contenu doit être structuré en 3 points clés : Objectifs, Débouchés, et Pourquoi choisir cette voie. 
  Réponds en français, avec un ton professionnel et encourageant pour des futurs élèves. 
  La réponse doit être structurée en JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            introduction: { type: Type.STRING },
            objectifs: { type: Type.ARRAY, items: { type: Type.STRING } },
            debouches: { type: Type.ARRAY, items: { type: Type.STRING } },
            pointsForts: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["introduction", "objectifs", "debouches", "pointsForts"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
}
