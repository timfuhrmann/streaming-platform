import { db } from "./config";
import { hasEpisodeAired } from "@lib/episode";
import { recordArrayToRecord } from "@lib/util";

export const getTrending = async (): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>("/trending/tv/week");
    return results;
};

export const getShowById = async (id: number): Promise<Api.TVDetails> => {
    return db<Api.TVDetails>(`/tv/${id}`);
};

export const getEpisodesBySeason = async (
    showId: number,
    seasonNumber: number
): Promise<Api.Episode[]> => {
    const { episodes } = await db<Api.SeasonDetails>(`/tv/${showId}/season/${seasonNumber}`);
    return episodes.filter(episode => hasEpisodeAired(episode.air_date));
};

export const getGenres = async (): Promise<Api.Genre[]> => {
    const { genres } = await db<Api.GenreList>(`/genre/tv/list`);
    return genres;
};

export const getShowsByGenre = async (genre: Api.Genre): Promise<Record<string, Api.TV[]>> => {
    const { results } = await db<Api.Page<Api.TV>>("/discover/tv", `&with_genres=${genre.id}`);
    return { [genre.name]: results };
};

export const getRecommendations = async (id: number): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>(`/tv/${id}/similar`);
    return results;
};

export const getShowsByGenres = async (genres: Api.Genre[]): Promise<Record<string, Api.TV[]>> => {
    const result = await Promise.all(genres.map(genre => getShowsByGenre(genre)));
    return recordArrayToRecord(result);
};

export const getShowByString = async (string: string): Promise<Api.TV[]> => {
    const { results } = await db<Api.Page<Api.TV>>(`/search/tv`, `&query=${string}`);
    return results;
};
