import React from "react";
import styled, { useTheme } from "styled-components";
import { TrendingSliderCard } from "./TrendingSliderCard";
import { SliderTemplate } from "../SliderTemplate";
import { useWatchlist } from "@lib/watchlist/context";
import { KeenSliderOptions } from "keen-slider";

const TrendingSlide = styled.div`
    will-change: transform;
`;

interface BasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const TrendingSlider: React.FC<BasicSliderProps> = ({ title, shows }) => {
    const { bp } = useTheme();
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

    const sliderOptions: KeenSliderOptions = {
        slides: {
            perView: 1,
        },
        breakpoints: {
            [`(min-width: ${bp.m}px)`]: {
                slides: {
                    perView: 2,
                },
            },
            [`(min-width: ${bp.xl}px)`]: {
                slides: {
                    perView: 3,
                },
            },
        },
    };

    return (
        <SliderTemplate title={title} options={sliderOptions}>
            {shows.slice(0, 9).map((show, index) => (
                <TrendingSlide key={show.id} className="keen-slider__slide">
                    <TrendingSliderCard
                        index={index}
                        show={show}
                        progress={hasShowProgress(show.id)}
                        watchlistActive={isShowActive(show.id)}
                        onWatchlist={() => addShowToWatchlist(show)}
                    />
                </TrendingSlide>
            ))}
        </SliderTemplate>
    );
};
