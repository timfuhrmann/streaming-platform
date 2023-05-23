import React from "react";
import styled from "styled-components";
import { getPosterUrl, Image } from "@lib/image";
import { text } from "@css/typography";
import { IconPlay } from "@icon/IconPlay";
import { square } from "@css/helper";
import { transition } from "@css/helper";
import { truncateString } from "@lib/util";
import { Skeleton } from "@lib/skeleton";
import { IconImagePlaceholder } from "@icon/IconImagePlaceholder";

const EpisodeNumber = styled.div`
    display: none;
    font-variant-numeric: tabular-nums;
    ${text("displayLg", "bold")};

    ${p => p.theme.breakpoints.min("m")} {
        display: block;
    }
`;

const EpisodeImage = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    height: 7.5rem;
    width: 10rem;
    min-width: 10rem;
    background-color: ${p => p.theme.gray300};
    border-radius: 0.6rem;
    overflow: hidden;
    transform: translateZ(0);
`;

const EpisodeContent = styled.div`
    flex: 1;
`;

const EpisodeOverview = styled.div`
    display: none;
    margin-top: 0.25rem;
    color: ${p => p.theme.gray700};

    ${p => p.theme.breakpoints.min("l")} {
        display: block;
    }
`;

const EpisodeName = styled.h4`
    ${text("textXl", "bold")};
`;

const EpisodePlay = styled.div`
    display: none;
    color: ${p => p.theme.gray600};
    ${transition("color", "0.15s")};

    ${p => p.theme.breakpoints.min("m")} {
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

    ${p => p.theme.breakpoints.min("l")} {
        padding: 2rem 4rem;
    }
`;

const EpisodeImagePlaceholder = styled(IconImagePlaceholder)`
    width: 100%;
    color: ${p => p.theme.gray600};
`;

interface ParentComposition {
    Skeleton: typeof SeasonsOverviewSeasonEpisodeSkeleton;
}

export const SeasonsOverviewSeasonEpisode: React.FC<Api.Episode> & ParentComposition = ({
    name,
    overview,
    episode_number,
    still_path,
}) => {
    return (
        <EpisodeWrapper>
            <EpisodeNumber>{episode_number}</EpisodeNumber>
            <EpisodeImage>
                {still_path ? (
                    <Image src={getPosterUrl(still_path)} alt={name} objectFit="cover" fill />
                ) : (
                    <EpisodeImagePlaceholder />
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

export const SeasonsOverviewSeasonEpisodeSkeleton: React.FC = () => {
    return (
        <EpisodeWrapper>
            <EpisodeNumber>
                <Skeleton>9</Skeleton>
            </EpisodeNumber>
            <EpisodeImage />
            <EpisodeContent>
                <EpisodeName>
                    <Skeleton />
                </EpisodeName>
                <EpisodeOverview>
                    <Skeleton />
                </EpisodeOverview>
            </EpisodeContent>
            <EpisodePlay>
                <PlayIcon />
            </EpisodePlay>
        </EpisodeWrapper>
    );
};

SeasonsOverviewSeasonEpisode.Skeleton = SeasonsOverviewSeasonEpisodeSkeleton;
