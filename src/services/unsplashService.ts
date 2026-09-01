import axios from 'axios';

interface UnsplashPhoto {
    urls: { small: string };
}

export async function fetchImages(search: string): Promise<string[] | undefined> {
    try {
        const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
        const answer = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: search,
                client_id: apiKey,
            },
        });
        const results = answer.data.results as UnsplashPhoto[];
        return results.map((result) => result.urls.small);
    } catch (erro) {
        console.error(erro);
    }
}
