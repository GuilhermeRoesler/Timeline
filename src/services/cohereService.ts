// src/services/cohereService.ts
import axios from 'axios';

const COHERE_API_URL = 'https://api.cohere.ai/generate';
const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;

export async function generateText(title: string) {
    try {
        const response = await axios.post(
            COHERE_API_URL,
            {
                model: 'command-r-08-2024',
                prompt: `Responda em português: Escreva uma descrição breve em um parágrafo de no máximo 50 palavras sobre o que foi o seguinte período histórico: ${title}`,
                max_tokens: 150,
                temperature: 0.3
            },
            {
                headers: {
                    Authorization: `Bearer ${COHERE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Resposta:', response);
        return response.data.text;
    } catch (error) {
        console.error('Erro ao gerar texto:', error);
        throw error;
    }
}