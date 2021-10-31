import { db } from "./config";

export const getTrending = async (): Promise<Api.Movie[]> => {
    const { results } = await db<Api.Page<Api.Movie>>("/trending/movie/week");
    return results;
};

export const getMovieById = async (id: number): Promise<Api.MovieDetails> => {
    return await db<Api.MovieDetails>(`/movie/${id}`);
};

export const getGenres = async (): Promise<Api.Genre[]> => {
    const { genres } = await db<Api.GenreList>(`/genre/movie/list`);
    return genres;
};

export const getMoviesByGenre = async (genreId: number): Promise<Api.Movie[]> => {
    const { results } = await db<Api.Page<Api.Movie>>("/discover/movie", `&with_genres=${genreId}`);
    return results;
};

export const getMoviesByGenres = async (
    genreIds: number[]
): Promise<Record<number, Api.Movie[]>> => {
    const result = await Promise.all(genreIds.map(genreId => getMoviesByGenre(genreId)));

    return result.reduce((map, movies, index) => {
        map[genreIds[index]] = movies;
        return map;
    }, {} as Record<number, Api.Movie[]>);
};
