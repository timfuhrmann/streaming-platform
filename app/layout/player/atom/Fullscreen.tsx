import React from "react";
import styled from "styled-components";
import { usePlayer } from "@lib/player/context/PlayerContext";
import { useAppSelector } from "@lib/redux";
import { IconMaximize } from "@icon/IconMaximize";
import { square } from "@css/content";
import { IconMinimize } from "@icon/IconMinimize";
import { controlsTransition } from "@css/transition";

const FullscreenButton = styled.button`
    display: flex;
    ${controlsTransition};
`;

const Maximize = styled(IconMaximize)`
    ${square("4rem")};
`;

const Minimize = styled(IconMinimize)`
    ${square("4rem")};
`;

export const Fullscreen: React.FC = () => {
    const { fullscreen } = useAppSelector(state => state.player);
    const { toggleFullscreen } = usePlayer();

    return (
        <FullscreenButton type="button" onClick={toggleFullscreen}>
            {fullscreen ? <Minimize /> : <Maximize />}
        </FullscreenButton>
    );
};
