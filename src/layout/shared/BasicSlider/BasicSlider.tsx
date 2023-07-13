import React, { forwardRef } from "react";
import styled, { useTheme } from "styled-components";
import { Card } from "../Card/Card";
import { aspectRatio, fillParent } from "@css/helper";
import { SliderTemplate } from "../SliderTemplate";
import { useWatchlist } from "@lib/watchlist/context";
import { createArray } from "@lib/util";
import { content } from "@css/helper/content";
import { KeenSliderOptions } from "keen-slider";

const SliderCard = styled.div`
    position: relative;
    ${aspectRatio(1.5)};
    flex-shrink: 0;
`;

const SliderCardInner = styled.div`
    ${fillParent};
`;

const SliderSkeleton = styled.div`
    overflow: hidden;
`;

const SliderSkeletonFrame = styled.div`
    display: flex;
    ${content()};
`;

const SliderCardSkeleton = styled(SliderCard)`
    --spacing: 1.5rem;
    --length: 2;

    width: 100%;
    max-width: calc((100% / var(--length)) - var(--spacing) + (var(--spacing) / var(--length)));
    margin-right: var(--spacing);
    background-color: ${p => p.theme.gray200};
    border-radius: 0.8rem;

    ${p => p.theme.breakpoints.min("m")} {
        --length: 3;
    }

    ${p => p.theme.breakpoints.min("l")} {
        --length: 4;
    }

    ${p => p.theme.breakpoints.min("xl")} {
        --length: 6;
    }
`;

interface ParentComposition {
    Skeleton: typeof BasicSliderSkeleton;
}

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BasicSlider: React.FC<BlockBasicSliderProps> & ParentComposition = ({
    title,
    shows,
}) => {
    const { bp } = useTheme();
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

    const sliderOptions: KeenSliderOptions = {
        slides: {
            perView: 2,
            spacing: 15,
        },
        breakpoints: {
            [`(min-width: ${bp.m}px)`]: {
                slides: {
                    perView: 3,
                    spacing: 15,
                },
            },
            [`(min-width: ${bp.l}px)`]: {
                slides: {
                    perView: 4,
                    spacing: 15,
                },
            },
            [`(min-width: ${bp.xl}px)`]: {
                slides: {
                    perView: 6,
                    spacing: 15,
                },
            },
        },
    };

    return (
        <SliderTemplate title={title} options={sliderOptions}>
            {shows.map(show => (
                <SliderCard key={show.id} className="keen-slider__slide">
                    <SliderCardInner>
                        <Card
                            {...show}
                            progress={hasShowProgress(show.id)}
                            watchlistActive={isShowActive(show.id)}
                            onWatchlist={() => addShowToWatchlist(show)}
                        />
                    </SliderCardInner>
                </SliderCard>
            ))}
        </SliderTemplate>
    );
};

const BasicSliderSkeleton = forwardRef<HTMLDivElement>((_, ref) => {
    return (
        <SliderSkeleton ref={ref}>
            <SliderSkeletonFrame>
                {createArray(20).map(index => (
                    <SliderCardSkeleton key={index} className="keen-slider__slide" />
                ))}
            </SliderSkeletonFrame>
        </SliderSkeleton>
    );
});

BasicSliderSkeleton.displayName = "BasicSliderSkeleton";
BasicSlider.Skeleton = BasicSliderSkeleton;
