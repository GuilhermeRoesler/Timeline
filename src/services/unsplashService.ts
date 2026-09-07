import axios from 'axios';
import type { UnsplashImage } from '@/utils/responsiveImage';

interface UnsplashPhoto {
    urls: {
        thumb: string;
        small: string;
        regular: string;
    };
}

export async function fetchImages(search: string): Promise<UnsplashImage[] | undefined> {
    try {
        const apiKey = import.meta.env.VITE_UNSPLASH_API_KEY;
        const answer = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: search,
                client_id: apiKey,
            },
        });
        const results = answer.data.results as UnsplashPhoto[];
        return results.map((result) => ({
            thumb: result.urls.thumb,
            small: result.urls.small,
            regular: result.urls.regular,
        }));
    } catch (erro) {
        console.error(erro);
    }
}
