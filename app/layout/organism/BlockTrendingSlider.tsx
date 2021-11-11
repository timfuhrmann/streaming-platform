import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { TrendingCard } from "../molecule/TrendingCard";
import { SliderTemplate } from "../template/SliderTemplate";
import { TOptions } from "keen-slider";

const TrendingSlide = styled.a`
    will-change: transform;
    overflow: visible;
`;

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BlockTrendingSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const sliderOptions: TOptions = {
        slidesPerView: 1,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1340px)": {
                slidesPerView: 3,
            },
        },
    };

    return (
        <SliderTemplate title={title} options={sliderOptions}>
            {shows.slice(0, 9).map((show, index) => (
                <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                    <TrendingSlide className="keen-slider__slide">
                        <TrendingCard index={index} show={show} />
                    </TrendingSlide>
                </Link>
            ))}
        </SliderTemplate>
    );
};
