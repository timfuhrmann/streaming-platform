import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SeasonsOverviewSeasonEpisode } from "./SeasonsOverviewSeasonEpisode";
import { useNProgress } from "@lib/context/nprogress";
import { useSeasonOverview } from "./SeasonOverviewProvider";
import { SeasonsOverviewSeasonSkeleton } from "./SeasonsOverviewSeasonSkeleton";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled.a`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

export const SeasonsOverviewSeason: React.FC = () => {
    const { startProgress } = useNProgress();
    const { activeEpisodes } = useSeasonOverview();

    return activeEpisodes ? (
        <EpisodesWrapper>
            {activeEpisodes.map(episode => (
                <Link key={episode.id} href={`/watch/${episode.id}`} passHref>
                    <EpisodeWrapper onClick={startProgress}>
                        <SeasonsOverviewSeasonEpisode {...episode} />
                    </EpisodeWrapper>
                </Link>
            ))}
        </EpisodesWrapper>
    ) : (
        <SeasonsOverviewSeasonSkeleton />
    );
};
