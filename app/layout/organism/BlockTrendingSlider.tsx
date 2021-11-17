import React from "react";
import styled from "styled-components";
import { TrendingCard } from "../molecule/TrendingCard";
import { SliderTemplate } from "../template/SliderTemplate";
import { TOptions } from "keen-slider";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";

const TrendingSlide = styled.div`
    will-change: transform;
    overflow: visible;
`;

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BlockTrendingSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
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
                    <TrendingCard
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
