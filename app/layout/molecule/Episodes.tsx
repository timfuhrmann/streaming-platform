import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { Episode } from "../atom/Episode";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled.a`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

interface SeasonProps {
    episodes: Api.Episode[];
}

export const Episodes: React.FC<SeasonProps> = ({ episodes }) => {
    return (
        <EpisodesWrapper>
            {episodes.map(episode => (
                <Link key={episode.id} href={`/watch/${episode.id}`} passHref>
                    <EpisodeWrapper>
                        <Episode {...episode} />
                    </EpisodeWrapper>
                </Link>
            ))}
        </EpisodesWrapper>
    );
};
