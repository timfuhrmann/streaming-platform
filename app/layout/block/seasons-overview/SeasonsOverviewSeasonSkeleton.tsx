import React from "react";
import styled from "styled-components";
import { SeasonsOverviewSeasonEpisodeSkeleton } from "./SeasonsOverviewSeasonEpisodeSkeleton";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled.a`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

export const SeasonsOverviewSeasonSkeleton: React.FC = () => {
    return (
        <EpisodesWrapper>
            {[...Array(9)].map((_, index) => (
                <EpisodeWrapper key={index}>
                    <SeasonsOverviewSeasonEpisodeSkeleton number={index + 1} />
                </EpisodeWrapper>
            ))}
        </EpisodesWrapper>
    );
};
