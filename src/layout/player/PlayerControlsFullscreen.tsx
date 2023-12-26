import React from "react";
import styled from "styled-components";
import { usePlayer } from "./PlayerProvider";
import { useAppSelector } from "@lib/redux";
import { IconMaximize } from "@icon/IconMaximize";
import { square } from "@css/helper";
import { IconMinimize } from "@icon/IconMinimize";
import { controlsTransition } from "@css/player";

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

export const PlayerControlsFullscreen: React.FC = () => {
    const fullscreen = useAppSelector(state => state.player.fullscreen);
    const { toggleFullscreen } = usePlayer();

    return (
        <FullscreenButton type="button" onClick={toggleFullscreen}>
            {fullscreen ? <Minimize /> : <Maximize />}
        </FullscreenButton>
    );
};
