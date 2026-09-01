// src/services/cohereService.ts
import axios from 'axios';

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
// It's not COHERE, but Gemini!
const COHERE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${COHERE_API_KEY}`;

export async function generateText(title: string) {
    try {
        const response = await axios.post(
            COHERE_API_URL,
            {
                "contents": [
                    {
                        "parts": [
                            {
                                "text": `Responda em português: Escreva uma descrição breve em um parágrafo de no máximo 50 palavras sobre o que foi o seguinte período histórico: ${title}`
                            }
                        ]
                    }
                ]
            }
        );

        // console.log('Resposta:', response);
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('Erro ao gerar texto:', error);
        throw error;
    }
}