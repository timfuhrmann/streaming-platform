import React from "react";
import styled from "styled-components";
import { Card } from "../molecule/Card";
import { aspectRatio } from "@css/content";
import { SliderTemplate } from "../template/SliderTemplate";
import { TOptions } from "keen-slider";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";

const CardWrapper = styled.div`
    position: relative;
    ${aspectRatio(1.5)};
    overflow: visible;

    // Prevent content shifting caused by delayed recalculation from keen-slider
    max-width: 0;
`;

const CardInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const { isShowActive, addShowToWatchlist } = useWatchlist();

    const sliderOptions: TOptions = {
        slidesPerView: 2,
        spacing: 15,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 4,
            },
            "(min-width: 1340px)": {
                slidesPerView: 6,
            },
        },
    };

    return (
        <SliderTemplate title={title} length={shows.length} options={sliderOptions}>
            {shows.map(show => (
                <CardWrapper key={show.id} className="keen-slider__slide">
                    <CardInner>
                        <Card
                            {...show}
                            watchlistActive={isShowActive(show.id)}
                            onWatchlist={() => addShowToWatchlist(show)}
                        />
                    </CardInner>
                </CardWrapper>
            ))}
        </SliderTemplate>
    );
};
