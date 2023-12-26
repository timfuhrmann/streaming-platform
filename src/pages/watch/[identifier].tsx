import React, { useRef } from "react";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import { getShowById } from "@lib/api/tmdb";
import { useAppSelector } from "@lib/redux";
import { Spinner } from "../../layout/shared/Spinner";
import { checkBrowserCompatibility } from "@lib/browser";
import { fillParent } from "@css/helper";
import { Player } from "../../layout/player/Player";
import { Content } from "@css/helper/content";
import { Meta } from "@lib/meta";

const PlayerWrapper = styled.div``;

const SpinnerWrapper = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 50%;
    left: 50%;
`;

const PlayerIncompatible = styled.div`
    ${fillParent};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

interface WatchProps {
    show: Api.TVDetails;
    browserCompatible: boolean;
}

const Watch: React.FC<WatchProps> = ({ show, browserCompatible }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const waiting = useAppSelector(state => state.player.waiting);

    if (!browserCompatible)
        return (
            <PlayerIncompatible>
                <Content>
                    Your device/browser seems to be incompatible. Please download our app for the
                    best experience!
                </Content>
            </PlayerIncompatible>
        );

    return (
        <PlayerWrapper ref={containerRef}>
            <Meta title={`${show.name ?? "Watch"} | Stream`} />
            {waiting && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
            <Player show={show} fullscreenContainer={containerRef} />
        </PlayerWrapper>
    );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
    const id = ctx.params?.identifier;

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

    const compatible = checkBrowserCompatibility(ctx);

    return {
        props: {
            show,
            browserCompatible: compatible,
            hideNavigation: compatible,
        },
    };
};

export default Watch;
