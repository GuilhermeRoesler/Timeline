import axios from 'axios';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent?key=${GEMINI_API_KEY}`;

export async function generateText(title: string): Promise<string> {
    const response = await axios.post(GEMINI_API_URL, {
        contents: [
            {
                parts: [
                    {
                        text: `Responda em português: Escreva uma descrição breve em um parágrafo de no máximo 50 palavras sobre o que foi o seguinte período histórico: ${title}`,
                    },
                ],
            },
        ],
    });

    return response.data.candidates[0].content.parts[0].text;
}
