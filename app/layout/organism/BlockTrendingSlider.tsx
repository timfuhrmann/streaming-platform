import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSlider } from "../../lib/slider";
import { Content } from "../../css/content";
import { HeadlineS } from "../../css/typography";
import { TrendingCard } from "../molecule/TrendingCard";

const TrendingWrapper = styled.div<{ $hidden: boolean }>`
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const TrendingContainer = styled.div`
    overflow: visible;
`;

const TrendingSlide = styled.a`
    will-change: transform;
`;

const TrendingTitle = styled(HeadlineS)`
    margin-bottom: 0.8rem;
`;

interface BlockBasicSliderProps {
    title?: string;
    movies: Api.Movie[];
}

export const BlockTrendingSlider: React.FC<BlockBasicSliderProps> = ({ title, movies }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { mounted } = useSlider(containerRef, {
        slidesPerView: 1,
        loop: false,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1340px)": {
                slidesPerView: 3,
            },
        },
    });

    return (
        <TrendingWrapper $hidden={!mounted}>
            <Content>
                {title && <TrendingTitle>{title}</TrendingTitle>}
                <TrendingContainer ref={containerRef} className="keen-slider">
                    {movies.slice(0, 9).map((movie, index) => (
                        <Link key={movie.id} href={{ query: { id: movie.id } }} shallow passHref>
                            <TrendingSlide className="keen-slider__slide">
                                <TrendingCard index={index} movie={movie} />
                            </TrendingSlide>
                        </Link>
                    ))}
                </TrendingContainer>
            </Content>
        </TrendingWrapper>
    );
};
