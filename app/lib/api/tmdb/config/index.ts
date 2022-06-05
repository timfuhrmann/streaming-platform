export const FEATURED_SHOW = 66732;

export const tmdbConfig = {
    host: process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_API_KEY,
    imageHost: "https://image.tmdb.org/t/p",
};

export const _tmdbHost = () => {
    const host = tmdbConfig.host;

    if (!host) {
        throw new Error("Couldn't find dotenv variable for TMDB host.");
    }

    return tmdbConfig.host;
};

export const _tmdbApiKey = () => {
    const host = tmdbConfig.host;

    if (!host) {
        throw new Error("Couldn't find dotenv variable for TMDB api key.");
    }

    return tmdbConfig.apiKey;
};

export const db = <T>(endpoint: string, params = ""): Promise<T> => {
    return fetch(`${_tmdbHost()}${endpoint}?api_key=${_tmdbApiKey()}${params}`)
        .then(res => res.json())
        .catch(console.log);
};
