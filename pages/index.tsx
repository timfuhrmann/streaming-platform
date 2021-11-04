import React from "react";
import { GetStaticProps } from "next";
import { getGenres, getShowById, getShowsByGenres, getTrending } from "../app/lib/api/tmdb";
import { FEATURED_MOVIE } from "../app/lib/api/tmdb/config";
import { Opener } from "../app/layout/molecule/Opener";
import { NegativeBlock, Block } from "../app/css/content";
import { BlockGenreSlider } from "../app/layout/template/BlockGenreSlider";
import { useInfiniteScroll } from "../app/lib/infinite-scroll";
import { REDUX_INITIAL_STATE } from "../app/lib/redux";
import { BlockTrendingSlider } from "../app/layout/organism/BlockTrendingSlider";

const INFINITE_SCROLL_LIMIT = 4;

interface HomeProps {
    featured: Api.TVDetails;
    trending: Api.TV[];
    genres: Api.Genre[];
}

const Home: React.FC<HomeProps> = ({ featured, trending, genres }) => {
    const { page } = useInfiniteScroll();

    // clever infinite scroll by mounting every and then loading when in viewport

    return (
        <div>
            {featured && featured.backdrop_path && (
                <Opener name={featured.name} image={featured.backdrop_path} />
            )}
            {trending && (
                <NegativeBlock>
                    <BlockTrendingSlider title="Trending" shows={trending} />
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
    const featured = await getShowById(FEATURED_MOVIE);
    const trending = await getTrending();
    const genres = await getGenres();
    const genreResults = await getShowsByGenres(
        genres.slice(0, INFINITE_SCROLL_LIMIT).map(genre => genre.id)
    );

    return {
        props: { featured, trending, genres, [REDUX_INITIAL_STATE]: { genre: { genreResults } } },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default Home;
