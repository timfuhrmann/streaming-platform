import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSlider } from "@lib/slider";
import { Content } from "@css/content";
import { HeadlineS } from "@css/typography";
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
    shows: Api.TV[];
}

export const BlockTrendingSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
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
                    {shows.slice(0, 9).map((show, index) => (
                        <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                            <TrendingSlide className="keen-slider__slide">
                                <TrendingCard index={index} show={show} />
                            </TrendingSlide>
                        </Link>
                    ))}
                </TrendingContainer>
            </Content>
        </TrendingWrapper>
    );
};
