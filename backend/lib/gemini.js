import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Generate personalized Tai Chi curriculum based on user evaluation
 */
export const generateTaiChiCurriculum = async (evaluationData) => {
    const { ageRange, fitnessLevel, primaryGoal, physicalLimitations, previousExperience } = evaluationData;

    const prompt = `Actúa como un Gran Maestro de Tai Chi Chuan. Genera un plan de estudios de 5 lecciones para un principiante con este perfil:
  - Edad: ${ageRange}
  - Nivel de condición física: ${fitnessLevel}
  - Meta principal: ${primaryGoal}
  - Limitaciones físicas: ${physicalLimitations}
  - Experiencia previa: ${previousExperience}

  Asegúrate de que las lecciones sean progresivas y seguras.
  
  IMPORTANTE: 
  - El campo "category" DEBE ser uno de estos valores exactos: "fundamento", "forma", "respiracion" (todo en minúsculas)
  - El campo "difficulty" DEBE ser uno de estos valores exactos: "principiante", "intermedio", "avanzado" (todo en minúsculas)
  - El campo "duration" debe ser un string como "30 minutos" o "45 minutos"
  - El campo "locked" debe ser false para la primera lección y true para las demás
  - El campo "id" debe ser un código único como "TC001", "TC002", etc.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
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
                        propertyOrdering: ['id', 'title', 'description', 'duration', 'category', 'difficulty', 'locked', 'content']
                    }
                }
            }
        });

        return JSON.parse(response.text || '[]');
    } catch (error) {
        console.error('Error generating curriculum:', error);
        throw new Error('Failed to generate curriculum');
    }
};

/**
 * Analyze posture from image using Gemini Vision
 */
export const analyzePosture = async (imageBase64) => {
    const prompt = 'Analiza la postura de Tai Chi de esta persona. Sé amable, breve y da un consejo específico para mejorar la alineación o el enraizamiento. Responde en español.';

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
                    { text: prompt }
                ]
            }
        });

        return response.text || 'No pude analizar la postura en este momento.';
    } catch (error) {
        console.error('Error analyzing posture:', error);
        throw new Error('Failed to analyze posture');
    }
};
