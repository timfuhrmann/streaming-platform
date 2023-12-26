import React from "react";
import styled from "styled-components";
import { IconPlay } from "@icon/IconPlay";
import { IconPause } from "@icon/IconPause";
import { controlsTransition } from "@css/player";
import { square } from "@css/helper";
import { useAppSelector } from "@lib/redux";
import { usePlayer } from "./PlayerProvider";

const PlayButton = styled.button`
    display: flex;
    ${controlsTransition};
`;

const PlayIcon = styled(IconPlay)`
    ${square("4rem")};
`;

const PauseIcon = styled(IconPause)`
    ${square("4rem")};
`;

export const PlayerControlsPlay: React.FC = () => {
    const playing = useAppSelector(state => state.player.playing);
    const { togglePlay } = usePlayer();

    return (
        <PlayButton type="button" onClick={togglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
        </PlayButton>
    );
};
