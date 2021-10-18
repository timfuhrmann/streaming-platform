import React from "react";
import { GetStaticProps } from "next";
import { getMovieById, getTrending } from "../app/lib/api";
import { BlockBasicSlider } from "../app/layout/organism/BlockBasicSlider";
import { FEATURED_MOVIE } from "../app/lib/api/config";
import { Content } from "../app/css/content";

interface HomeProps {
    featured: Api.MovieDetails;
    trending: Api.Movie[];
}

const Home: React.FC<HomeProps> = ({ featured, trending }) => {
    return (
        <div>
            {trending && (
                    <BlockBasicSlider movies={trending} />
            )}
        </div>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const trending = await getTrending();

    return {
        props: { featured, trending },
        revalidate: 60 * 60 * 24, // 24 hours
    };
};

export default Home;
