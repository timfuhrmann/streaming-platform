import React from "react";
import styled from "styled-components";
import { getPosterUrl, Image } from "@lib/image";
import { text } from "@css/typography";
import { IconPlay } from "@icon/IconPlay";
import { square } from "@css/content";
import { transition } from "@css/transition";
import { truncateString } from "@lib/util";

const EpisodeNumber = styled.div`
    display: none;
    ${text("displayLg", "bold")};

    ${p => p.theme.breakpoints.min("m")} {
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
                {still_path && <Image src={getPosterUrl(still_path)} alt={name} fill />}
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
