import React from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { IconPlay } from "@icon/IconPlay";
import { square } from "@css/content";

const EpisodeNumber = styled.div`
    ${text("displayLg", "bold")};
    opacity: 0;
    background-color: ${p => p.theme.gray300};
`;

const EpisodeImage = styled.div`
    position: relative;
    height: 7.5rem;
    width: 10rem;
    min-width: 10rem;
    background-color: ${p => p.theme.gray300};
`;

const EpisodeName = styled.div`
    min-height: 2rem;
    width: 100%;
    background-color: ${p => p.theme.gray300};
`;

const EpisodeContent = styled.div`
    flex: 1;
`;

const EpisodeOverview = styled.div`
    display: none;
    margin-top: 0.25rem;
    min-height: 4rem;
    background-color: ${p => p.theme.gray300};

    @media ${p => p.theme.bp.l} {
        display: block;
    }
`;

const EpisodePlay = styled.div`
    color: ${p => p.theme.gray300};
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

    @media ${p => p.theme.bp.l} {
        padding: 2rem 4rem;
    }
`;

interface SeasonsOverviewSeasonEpisodeSkeletonProps {
    number?: number;
}

export const SeasonsOverviewSeasonEpisodeSkeleton: React.FC<
    SeasonsOverviewSeasonEpisodeSkeletonProps
> = ({ number }) => {
    return (
        <EpisodeWrapper>
            <EpisodeNumber>{number || "9"}</EpisodeNumber>
            <EpisodeImage />
            <EpisodeContent>
                <EpisodeName />
                <EpisodeOverview />
            </EpisodeContent>
            <EpisodePlay>
                <PlayIcon />
            </EpisodePlay>
        </EpisodeWrapper>
    );
};
