import React from "react";
import styled from "styled-components";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { GetStaticProps } from "next";
import { getGenres, getShowById, getShowsByGenres, getTrending } from "@lib/api/tmdb";
import { FEATURED_SHOW } from "@lib/api/tmdb/config";
import { Opener } from "../src/layout/block/Opener";
import { Block } from "@css/content";
import { REDUX_INITIAL_STATE, useAppSelector } from "@lib/redux";
import { TrendingSlider } from "../src/layout/slider/trending-slider/TrendingSlider";
import { fetchGenrePage, INFINITE_SCROLL_SKIP } from "@lib/redux/reducer/genre";
import { BasicSlider } from "../src/layout/slider/basic-slider/BasicSlider";
import { BasicSliderSkeleton } from "../src/layout/slider/basic-slider/BasicSliderSkeleton";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";
import { Spinner } from "../src/layout/shared/Spinner";
import { useDispatch } from "react-redux";

const PageWrapper = styled.div`
    padding-bottom: 12rem;
`;

const PageLoading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface HomeProps {
    featured: Api.TVDetails;
    trending: Api.TV[];
    genres: Api.Genre[];
}

const Home: React.FC<HomeProps> = ({ featured, trending }) => {
    const dispatch = useDispatch();
    const { loading: watchlistLoading, activeShowsFromWatchlist } = useWatchlist();
    const { genreResults, loading, hasNextPage } = useAppSelector(state => state.genre);

    const onLoadMore = () => {
        dispatch(fetchGenrePage());
    };

    const [sentryRef] = useInfiniteScroll({
        loading,
        hasNextPage,
        onLoadMore,
    });

    return watchlistLoading ? (
        <PageLoading>
            <Spinner />
        </PageLoading>
    ) : (
        <PageWrapper>
            {featured && <Opener {...featured} />}
            {activeShowsFromWatchlist.length > 0 && (
                <Block $isNegative>
                    <BasicSlider title="Your watchlist" shows={activeShowsFromWatchlist} />
                </Block>
            )}
            {trending && (
                <Block $isNegative={!activeShowsFromWatchlist.length}>
                    <TrendingSlider title="Trending" shows={trending} />
                </Block>
            )}
            {Object.keys(genreResults).map(showKey => (
                <Block key={showKey}>
                    <BasicSlider title={showKey} shows={genreResults[showKey]} />
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
