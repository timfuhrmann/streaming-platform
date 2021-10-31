import React from "react";
import styled from "styled-components";
import { IconPlay } from "../../../icon/IconPlay";
import { IconPause } from "../../../icon/IconPause";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux";
import { usePlayer } from "../../../lib/player/context/PlayerContext";
import { controlsTransition } from "../../../css/transition";
import { square } from "../../../css/content";

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

export const Play: React.FC = () => {
    const { playing } = useSelector((state: RootState) => state.player);
    const { togglePlay } = usePlayer();

    return (
        <PlayButton type="button" onClick={togglePlay}>
            {playing ? <PauseIcon /> : <PlayIcon />}
        </PlayButton>
    );
};
