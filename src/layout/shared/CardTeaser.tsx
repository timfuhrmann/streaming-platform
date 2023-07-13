import React from "react";
import styled from "styled-components";
import { Card } from "./Card/Card";
import { aspectRatio, fillParent } from "@css/helper";
import { text } from "@css/typography";
import { useWatchlist } from "@lib/watchlist/context";

const TeaserWrapper = styled.div`
    padding: 0 2rem;

    ${p => p.theme.breakpoints.min("l")} {
        padding: 0 4rem;
    }
`;

const TeaserHeadline = styled.h3`
    ${text("textXl", "bold")};
    margin-bottom: 1.5rem;
`;

const TeaserList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
`;

const TeaserCard = styled.div`
    flex: 1 1 calc(50% - 1rem);
    max-width: calc(50% - 1rem);
    margin: 0.5rem;
    ${aspectRatio(1.5)};

    ${p => p.theme.breakpoints.min("m")} {
        flex: 1 1 calc(33.33% - 1rem);
        max-width: calc(33.33% - 1rem);
    }
`;

const TeaserCardInner = styled.div`
    ${fillParent};
`;

interface CardTeaserProps {
    headline?: string;
    shows: Api.TV[];
}

export const CardTeaser: React.FC<CardTeaserProps> = ({ headline, shows }) => {
    const { hasShowProgress, isShowActive, addShowToWatchlist } = useWatchlist();

    return (
        <TeaserWrapper>
            {headline && <TeaserHeadline>{headline}</TeaserHeadline>}
            <TeaserList>
                {shows.slice(0, 6).map(show => (
                    <TeaserCard key={show.id}>
                        <TeaserCardInner>
                            <Card
                                {...show}
                                progress={hasShowProgress(show.id)}
                                watchlistActive={isShowActive(show.id)}
                                onWatchlist={() => addShowToWatchlist(show)}
                            />
                        </TeaserCardInner>
                    </TeaserCard>
                ))}
            </TeaserList>
        </TeaserWrapper>
    );
};
