import React from "react";
import styled from "styled-components";
import { SeasonsOverviewSeasonEpisodeSkeleton } from "./SeasonsOverviewSeasonEpisodeSkeleton";
import { createArray } from "@lib/util";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled.div`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

export const SeasonsOverviewSeasonSkeleton: React.FC = () => {
    return (
        <EpisodesWrapper>
            {createArray(9).map(index => (
                <EpisodeWrapper key={index}>
                    <SeasonsOverviewSeasonEpisodeSkeleton number={index + 1} />
                </EpisodeWrapper>
            ))}
        </EpisodesWrapper>
    );
};
