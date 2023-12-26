import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SeasonsOverviewSeasonEpisode } from "./SeasonsOverviewSeasonEpisode";
import { useNProgress } from "@lib/context/nprogress";
import { useSeasonOverview } from "./SeasonOverviewProvider";
import { createArray } from "@lib/util";

const EpisodesWrapper = styled.div``;

const EpisodeWrapper = styled(Link)`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

const EpisodeSkeleton = styled.div`
    display: flex;
    border-bottom: 0.1rem solid ${p => p.theme.gray300};

    &:last-child {
        border: none;
    }
`;

export const SeasonsOverviewSeason: React.FC = () => {
    const { startProgress } = useNProgress();
    const { show, activeEpisodes } = useSeasonOverview();

    return activeEpisodes ? (
        <EpisodesWrapper>
            {activeEpisodes.map(episode => (
                <EpisodeWrapper
                    key={episode.id}
                    href={`/watch/${show.id}`}
                    onClick={startProgress}
                    passHref>
                    <SeasonsOverviewSeasonEpisode {...episode} />
                </EpisodeWrapper>
            ))}
        </EpisodesWrapper>
    ) : (
        <React.Fragment>
            {createArray(9).map(index => (
                <EpisodeSkeleton key={index}>
                    <SeasonsOverviewSeasonEpisode.Skeleton />
                </EpisodeSkeleton>
            ))}
        </React.Fragment>
    );
};
