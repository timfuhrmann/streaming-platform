import React from "react";
import styled from "styled-components";
import { Card } from "../Card/Card";
import { aspectRatio } from "@css/helper";
import { TRENDING_SLIDER_NUMBERS } from "@lib/numbers";

const TrendingWrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
`;

const TrendingIndex = styled.div`
    svg {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 75%;
        max-width: 50%;
        max-height: 100%;
        fill: ${p => p.theme.gray50};
        stroke: ${p => p.theme.gray600};
    }

    ${p => p.theme.breakpoints.min("l")} {
        svg {
            left: unset;
            right: 50%;
        }
    }
`;

const CardFrame = styled.div`
    width: 60%;
    ${aspectRatio(1.5)};

    ${p => p.theme.breakpoints.min("l")} {
        width: 55%;
    }
`;

interface TrendingSliderCardProps {
    index: number;
    show: Api.TV;
    progress: number;
    watchlistActive: boolean;
    onWatchlist: () => void;
}

export const TrendingSliderCard: React.FC<TrendingSliderCardProps> = ({
    index,
    show,
    progress,
    watchlistActive,
    onWatchlist,
}) => {
    return (
        <TrendingWrapper>
            <TrendingIndex
                dangerouslySetInnerHTML={{ __html: TRENDING_SLIDER_NUMBERS[index + 1] }}
            />
            <CardFrame>
                <Card
                    {...show}
                    progress={progress}
                    watchlistActive={watchlistActive}
                    onWatchlist={onWatchlist}
                />
            </CardFrame>
        </TrendingWrapper>
    );
};
