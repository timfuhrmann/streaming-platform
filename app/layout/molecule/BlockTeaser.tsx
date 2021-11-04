import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SliderCard } from "./SliderCard";
import { aspectRatio, fillParent } from "../../css/content";
import { HeadlineS } from "../../css/typography";

const TeaserWrapper = styled.div`
    padding: 0 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 0 4rem;
    }
`;

const TeaserHeadline = styled(HeadlineS)`
    margin-bottom: 1.5rem;
`;

const TeaserList = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5rem;
`;

const TeaserCard = styled.a`
    flex: 1 1 calc(25% - 1rem);
    max-width: calc(25% - 1rem);
    margin: 0.5rem;
    ${aspectRatio(1.5)};
`;

const TeaserCardInner = styled.div`
    ${fillParent};
`;

interface BlockTeaserProps {
    headline?: string;
    movies: Api.Movie[];
}

export const BlockTeaser: React.FC<BlockTeaserProps> = ({ headline, movies }) => {
    return (
        <TeaserWrapper>
            {headline && <TeaserHeadline>{headline}</TeaserHeadline>}
            <TeaserList>
                {movies.slice(0, 8).map(movie => (
                    <Link key={movie.id} href={{ query: { id: movie.id } }} shallow passHref>
                        <TeaserCard key={movie.id}>
                            <TeaserCardInner>
                                <SliderCard {...movie} />
                            </TeaserCardInner>
                        </TeaserCard>
                    </Link>
                ))}
            </TeaserList>
        </TeaserWrapper>
    );
};
