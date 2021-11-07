import React from "react";
import styled from "styled-components";
import { EpisodeSkeleton } from "../atom/EpisodeSkeleton";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled.a`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

export const EpisodesSkeleton: React.FC = () => {
    return (
        <EpisodesWrapper>
            {[...Array(9)].map((item, index) => (
                <EpisodeWrapper key={index}>
                    <EpisodeSkeleton number={index + 1} />
                </EpisodeWrapper>
            ))}
        </EpisodesWrapper>
    );
};
