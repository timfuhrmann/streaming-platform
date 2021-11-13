import React from "react";
import styled from "styled-components";
import { Play } from "../atom/Play";
import { Progress } from "../atom/Progress";
import { Fullscreen } from "../atom/Fullscreen";

const ControlsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    width: 100%;
    padding: 7.5rem 2rem 4rem;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, transparent 100%);

    @media ${p => p.theme.bp.m} {
        gap: 4rem;
        padding: 7.5rem 4rem 4rem;
    }
`;

const ProgressWrapper = styled.div`
    flex: 1;
`;

export const PlayerControls: React.FC = () => {
    return (
        <ControlsWrapper>
            <Play />
            <ProgressWrapper>
                <Progress />
            </ProgressWrapper>
            <Fullscreen />
        </ControlsWrapper>
    );
};
