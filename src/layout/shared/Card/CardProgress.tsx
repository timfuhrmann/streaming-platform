import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/helper";
import { convertToTimeCode } from "@lib/player";
import { HLS_VIDEO_DURATION } from "../../player/PlayerProvider";

const ProgressWrapper = styled.div``;

const ProgressTime = styled.div`
    color: ${p => p.theme.gray900};
    margin-bottom: 0.5rem;
`;

const ProgressFrame = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 0.4rem;
    background-color: ${p => p.theme.gray400};
`;

const ProgressInner = styled.div<{ $abs: number }>`
    ${fillParent};
    transform-origin: left;
    transform: scaleX(${p => p.$abs});
    background-color: ${p => p.theme.gray900};
`;

interface CardProgressProps {
    progress: number;
}

export const CardProgress: React.FC<CardProgressProps> = ({ progress }) => {
    return (
        <ProgressWrapper>
            <ProgressTime>{convertToTimeCode(progress)}</ProgressTime>
            <ProgressFrame>
                <ProgressInner $abs={progress / HLS_VIDEO_DURATION} />
            </ProgressFrame>
        </ProgressWrapper>
    );
};
