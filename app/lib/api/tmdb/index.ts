import { db } from "./config";

export const getTrending = async (): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>("/trending/tv/week");
    return results;
};

export const getShowById = async (id: number): Promise<Api.TVDetails> => {
    return await db<Api.TVDetails>(`/tv/${id}`);
};

export const getGenres = async (): Promise<Api.Genre[]> => {
    const { genres } = await db<Api.GenreList>(`/genre/tv/list`);
    return genres;
};

export const getShowsByGenre = async (genreId: number): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>("/discover/tv", `&with_genres=${genreId}`);
    return results;
};

export const getRecommendations = async (id: number): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>(`/tv/${id}/similar`);
    return results;
};

export const getShowsByGenres = async (genreIds: number[]): Promise<Record<number, Api.TV[]>> => {
    const result = await Promise.all(genreIds.map(genreId => getShowsByGenre(genreId)));

    return result.reduce((map, shows, index) => {
        map[genreIds[index]] = shows;
        return map;
    }, {} as Record<number, Api.TV[]>);
};
