import React, { useRef } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getShowById } from "@lib/api/tmdb";
import { PlayerProvider } from "@lib/player/context/PlayerProvider";
import { useAppSelector } from "@lib/redux";
import { Spinner } from "../../app/layout/atom/Spinner";

const PlayerWrapper = styled.div``;

const SpinnerWrapper = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 50%;
    left: 50%;
`;

interface WatchProps {
    show: Api.TVDetails;
}

const Watch: React.FC<WatchProps> = ({ show }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { waiting } = useAppSelector(state => state.player);

    return (
        <PlayerWrapper ref={containerRef}>
            {waiting && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
            <PlayerProvider fullscreenContainer={containerRef} />
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
