import { db } from "./config";

export const getTrending = async () => {
    const { results } = await db<Api.Page<Api.Movie>>("/trending/movie/week");
    return results;
};

export const getMovieById = async (id: number) => {
    return await db<Api.MovieDetails>(`/movie/${id}`);
};
