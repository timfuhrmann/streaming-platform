import React, { useRef } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getShowById } from "@lib/api/tmdb";
import { PlayerProvider } from "@lib/player/context/PlayerProvider";
import { PlayerControls } from "../../app/layout/player/molecule/PlayerControls";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@icon/IconArrowLeft";
import { square } from "@css/content";
import { controlsTransition } from "@css/transition";

const PlayerWrapper = styled.div``;

const PlayerControlsWrapper = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 0;
    left: 0;
    width: 100%;
`;

const Back = styled.button`
    position: absolute;
    top: 4rem;
    left: 4rem;
`;

const IconBack = styled(IconArrowLeft)`
    ${square("4rem")};
    ${controlsTransition};
`;

interface WatchProps {
    show: Api.TVDetails;
}

const Watch: React.FC<WatchProps> = ({ show }) => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <PlayerWrapper ref={containerRef}>
            <Back onClick={router.back}>
                <IconBack />
            </Back>
            <PlayerProvider fullscreenContainer={containerRef}>
                <PlayerControlsWrapper>
                    <PlayerControls />
                </PlayerControlsWrapper>
            </PlayerProvider>
        </PlayerWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const id = params?.identifier;

    if (!id || typeof id !== "string") {
        return {
            notFound: true,
        };
    }

    const show = await getShowById(parseInt(id));

    if (!show) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            show,
            hideNavigation: true,
        },
    };
};

export default Watch;
