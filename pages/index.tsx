import React from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { GetStaticProps } from "next";
import { getGenres, getShowById, getShowsByGenres, getTrending } from "../app/lib/api/tmdb";
import { FEATURED_SHOW } from "@lib/api/tmdb/config";
import { Opener } from "../app/layout/molecule/Opener";
import { NegativeBlock, Block } from "@css/content";
import { REDUX_INITIAL_STATE, useAppSelector } from "../app/lib/redux";
import { BlockTrendingSlider } from "../app/layout/organism/BlockTrendingSlider";
import { fetchGenrePage, INFINITE_SCROLL_SKIP } from "@lib/redux/reducer/genre";
import { BlockBasicSlider } from "../app/layout/organism/BlockBasicSlider";
import { useDispatch } from "react-redux";
import { BasicSliderSkeleton } from "../app/layout/atom/BasicSliderSkeleton";

const PageWrapper = styled.div`
    padding-bottom: 12rem;
`;

interface HomeProps {
    featured: Api.TVDetails;
    trending: Api.TV[];
    genres: Api.Genre[];
}

const Home: React.FC<HomeProps> = ({ featured, trending }) => {
    const dispatch = useDispatch();
    const { genreResults, loading, hasNextPage } = useAppSelector(state => state.genre);

    const onLoadMore = () => {
        dispatch(fetchGenrePage());
    };

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore,
    });

    return (
        <PageWrapper>
            {featured && <Opener {...featured} />}
            {trending && (
                <NegativeBlock>
                    <BlockTrendingSlider title="Trending" shows={trending} />
                </NegativeBlock>
            )}
            {Object.keys(genreResults).map(showKey => (
                <Block key={showKey}>
                    <BlockBasicSlider title={showKey} shows={genreResults[showKey]} />
                </Block>
            ))}
            {(loading || hasNextPage) && (
                <Block ref={sentryRef}>
                    <BasicSliderSkeleton />
                </Block>
            )}
        </PageWrapper>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const featured = await getShowById(FEATURED_SHOW);
    const trending = await getTrending();
    const genres = await getGenres();
    const genreResults = await getShowsByGenres(genres.slice(0, INFINITE_SCROLL_SKIP));

    return {
        props: {
            featured,
            trending,
            genres,
            [REDUX_INITIAL_STATE]: {
                genre: { genres, genreResults, page: 0, loading: false, hasNextPage: true },
            },
        },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default Home;
