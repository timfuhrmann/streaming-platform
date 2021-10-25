declare module Api {
    type ImageSize = "w500" | "original";

    interface Page<T> {
        page: number;
        total_pages: number;
        total_results: number;
        results: T[];
    }

    interface Movie {
        id: number;
        title: string;
        original_title: string;
        genre_ids: number[];
        poster_path: string | null;
        backdrop_path: string | null;
        adult: boolean;
        overview: string;
        release_date: string;
        original_language: string;
        popularity: number;
        video: boolean;
        vote_count: number;
        vote_average: number;
        success?: boolean;
    }

    interface MovieDetails extends Movie {
        budget: number;
        homepage: string | null;
        imdb_id: string | null;
        production_companies: ProductionCompany[];
        revenue: number;
        runtime: number | null;
        spoken_languages: Language[];
        status: string;
        tagline: string | null;
        vote_count: number;
        vote_average: number;
    }

    interface Genre {
        id: number;
        name: string;
        media_type: string;
    }

    interface GenreList {
        genres: Genre[];
    }

    interface ProductionCompany {
        name: string;
        id: number;
        logo_path: string | null;
        origin_country: string;
    }

    interface Language {
        iso_639_1: string;
        name: string;
    }
}
