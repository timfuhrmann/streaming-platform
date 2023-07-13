export const FEATURED_SHOW = 73375;

export const tmdbConfig = {
    host: process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_BASE_URL,
    apiKey: process.env.NEXT_PUBLIC_THE_MOVIE_DB_V3_API_KEY,
    imageHost: "https://image.tmdb.org/t/p",
};

export const getTmdbHost = () => {
    const host = tmdbConfig.host;

    if (!host) {
        throw new Error("NEXT_PUBLIC_THE_MOVIE_DB_V3_BASE_URL is undefined");
    }

    return tmdbConfig.host;
};

export const getTmdbApiKey = () => {
    const host = tmdbConfig.host;

    if (!host) {
        throw new Error("NEXT_PUBLIC_THE_MOVIE_DB_V3_API_KEY is undefined");
    }

    return tmdbConfig.apiKey;
};

export const db = <T>(endpoint: string, params = ""): Promise<T> => {
    return fetch(`${getTmdbHost()}${endpoint}?api_key=${getTmdbApiKey()}${params}`).then(res =>
        res.json()
    );
};
