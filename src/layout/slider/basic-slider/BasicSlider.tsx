import React from "react";
import styled from "styled-components";
import { Card } from "../../shared/card/Card";
import { aspectRatio } from "@css/helper";
import { SliderTemplate } from "../SliderTemplate";
import { TOptions } from "keen-slider";
import { useWatchlist } from "@lib/watchlist/context/WatchlistContext";

const CardWrapper = styled.div`
    position: relative;
    ${aspectRatio(1.5)};
    max-width: calc(50% - 1.5rem);
    overflow: visible;

    ${p => p.theme.breakpoints.min("l")} {
        max-width: calc(25% - 1.5rem);
    }

    ${p => p.theme.breakpoints.min("xl")} {
        max-width: calc(16.66% - 1.5rem);
    }
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

export const BasicSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

    const sliderOptions: TOptions = {
        slidesPerView: 2,
        spacing: 15,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 3,
            },
            "(min-width: 1024px)": {
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
                            progress={hasShowProgress(show.id)}
                            watchlistActive={isShowActive(show.id)}
                            onWatchlist={() => addShowToWatchlist(show)}
                        />
                    </CardInner>
                </CardWrapper>
            ))}
        </SliderTemplate>
    );
};
