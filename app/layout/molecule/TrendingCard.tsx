import React from "react";
import styled from "styled-components";
import { Card } from "./Card";
import { aspectRatio } from "@css/content";
import { numbers } from "@lib/numbers";

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

    @media ${p => p.theme.bp.l} {
        svg {
            left: unset;
            right: 50%;
        }
    }
`;

const CardFrame = styled.div`
    width: 60%;
    ${aspectRatio(1.5)};

    @media ${p => p.theme.bp.l} {
        width: 55%;
    }
`;

interface TrendingCardProps {
    index: number;
    show: Api.TV;
}

export const TrendingCard: React.FC<TrendingCardProps> = ({ index, show }) => {
    return (
        <TrendingWrapper>
            <TrendingIndex dangerouslySetInnerHTML={{ __html: numbers[index + 1] }} />
            <CardFrame>
                <Card {...show} />
            </CardFrame>
        </TrendingWrapper>
    );
};
