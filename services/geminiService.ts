
import { GoogleGenAI, Type } from "@google/genai";
import { EvaluationData, Lesson } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTaiChiCurriculum = async (data: EvaluationData): Promise<Lesson[]> => {
  const prompt = `Actúa como un Gran Maestro de Tai Chi Chuan. Genera un plan de estudios de 5 lecciones para un principiante con este perfil:
  - Edad: ${data.ageRange}
  - Nivel de condición física: ${data.fitnessLevel}
  - Meta principal: ${data.primaryGoal}
  - Limitaciones físicas: ${data.physicalLimitations}
  - Experiencia previa: ${data.previousExperience}

  Asegúrate de que las lecciones sean progresivas y seguras.`;

  // Query GenAI with both the model name and prompt directly
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            duration: { type: Type.STRING },
            category: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            locked: { type: Type.BOOLEAN },
            content: { type: Type.STRING }
          },
          propertyOrdering: ["id", "title", "description", "duration", "category", "difficulty", "locked", "content"]
        }
      }
    }
  });

  try {
    // Extract text output using the .text property
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Error parsing Gemini response:", e);
    return [];
  }
};

export const analyzePosture = async (imageBuffer: string): Promise<string> => {
  const prompt = "Analiza la postura de Tai Chi de esta persona. Sé amable, breve y da un consejo específico para mejorar la alineación o el enraizamiento. Responde en español.";
  
  // Multi-part content for image analysis
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: imageBuffer } },
        { text: prompt }
      ]
    }
  });

  // Extract text output using the .text property
  return response.text || "No pude analizar la postura en este momento.";
};
