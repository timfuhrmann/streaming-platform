import React from "react";
import { GetStaticProps } from "next";
import { getGenres, getMovieById, getMoviesByGenres, getTrending } from "../app/lib/api";
import { BlockBasicSlider } from "../app/layout/organism/BlockBasicSlider";
import { FEATURED_MOVIE } from "../app/lib/api/config";
import { Opener } from "../app/layout/molecule/Opener";
import { NegativeBlock, Block } from "../app/css/content";
import { BlockGenreSlider } from "../app/layout/template/BlockGenreSlider";
import { useInfiniteScroll } from "../app/lib/infinite-scroll";
import { REDUX_INITIAL_STATE } from "../app/lib/redux";

const INFINITE_SCROLL_LIMIT = 4;

interface HomeProps {
    featured: Api.MovieDetails;
    trending: Api.Movie[];
    genres: Api.Genre[];
}

const Home: React.FC<HomeProps> = ({ featured, trending, genres }) => {
    const { page } = useInfiniteScroll();

    // clever infinite scroll by mounting every and then loading when in viewport

    return (
        <div>
            {featured && featured.backdrop_path && (
                <Opener title={featured.title} image={featured.backdrop_path} />
            )}
            {trending && (
                <NegativeBlock>
                    <BlockBasicSlider title="Trending" movies={trending} />
                </NegativeBlock>
            )}
            {genres.slice(0, page * INFINITE_SCROLL_LIMIT).map(genre => (
                <Block key={genre.id}>
                    <BlockGenreSlider {...genre} />
                </Block>
            ))}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const featured = await getMovieById(FEATURED_MOVIE);
    const trending = await getTrending();
    const genres = await getGenres();
    const genreResults = await getMoviesByGenres(
        genres.slice(0, INFINITE_SCROLL_LIMIT).map(genre => genre.id)
    );

    return {
        props: { featured, trending, genres, [REDUX_INITIAL_STATE]: { genre: { genreResults } } },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default Home;
