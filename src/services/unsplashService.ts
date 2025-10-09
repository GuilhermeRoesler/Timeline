import axios from "axios";

export async function fetchImages(search: string): Promise<string[] | undefined> {
    try {
        const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
        const answer = await axios.get("https://api.unsplash.com/search/photos", {
            params: {
                query: search,
                client_id: apiKey
            }
        })
        const results = answer.data.results
        return results.map((result: any) => result.urls.small)
    } catch (erro) {
        console.error(erro)
    }
}