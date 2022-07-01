import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { getPosterUrl } from "@lib/image";
import { HeadlineL, HeadlineS } from "@css/typography";
import { IconPlay } from "@icon/IconPlay";
import { square } from "@css/content";
import { transition } from "@css/transition";
import { truncateString } from "@lib/util";

const EpisodeNumber = styled.div`
    display: none;
    ${HeadlineL};

    @media ${p => p.theme.bp.m} {
        display: block;
    }
`;

const EpisodeImage = styled.div`
    position: relative;
    height: 7.5rem;
    width: 10rem;
    min-width: 10rem;
    background-color: ${p => p.theme.gray300};
`;

const EpisodeContent = styled.div`
    flex: 1;
`;

const EpisodeOverview = styled.div`
    display: none;
    margin-top: 0.25rem;
    color: ${p => p.theme.gray700};

    @media ${p => p.theme.bp.l} {
        display: block;
    }
`;

const EpisodeName = styled.h4`
    ${HeadlineS};
`;

const EpisodePlay = styled.div`
    display: none;
    color: ${p => p.theme.gray600};
    ${transition("color", "0.15s")};

    @media ${p => p.theme.bp.m} {
        display: block;
    }
`;

const PlayIcon = styled(IconPlay)`
    ${square("4rem")};
`;

const EpisodeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 3rem;
    width: 100%;
    padding: 2rem;
    ${transition("background-color", "0.15s")};

    @media (hover: hover) {
        &:hover {
            background-color: ${p => p.theme.gray200};

            ${EpisodePlay} {
                color: ${p => p.theme.gray900};
            }
        }
    }

    &:active {
        ${EpisodePlay} {
            color: ${p => p.theme.gray900};
        }
    }

    @media ${p => p.theme.bp.l} {
        padding: 2rem 4rem;
    }
`;

export const SeasonsOverviewSeasonEpisode: React.FC<Api.Episode> = ({
    name,
    overview,
    episode_number,
    still_path,
}) => {
    return (
        <EpisodeWrapper>
            <EpisodeNumber>{episode_number}</EpisodeNumber>
            <EpisodeImage>
                {still_path && (
                    <Image
                        src={getPosterUrl(still_path)}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        unoptimized
                    />
                )}
            </EpisodeImage>
            <EpisodeContent>
                <EpisodeName>{name}</EpisodeName>
                <EpisodeOverview>{truncateString(overview, 145)}</EpisodeOverview>
            </EpisodeContent>
            <EpisodePlay>
                <PlayIcon />
            </EpisodePlay>
        </EpisodeWrapper>
    );
};
