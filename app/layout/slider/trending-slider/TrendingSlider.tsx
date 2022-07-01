import React from "react";
import styled from "styled-components";
import { TrendingSliderCard } from "./TrendingSliderCard";
import { SliderTemplate } from "../SliderTemplate";
import { TOptions } from "keen-slider";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";

const TrendingSlide = styled.div`
    will-change: transform;
    overflow: visible;
`;

interface BasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const TrendingSlider: React.FC<BasicSliderProps> = ({ title, shows }) => {
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

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
