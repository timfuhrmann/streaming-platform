import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { _posterUrl } from "@lib/image";
import { usePreload } from "@lib/preload";
import { fillParent } from "@css/content";
import { HeadlineS } from "@css/typography";
import { transition } from "@css/transition";
import { CardProgress } from "../atom/CardProgress";

const CardName = styled.div`
    ${HeadlineS};
`;

const CardOverlay = styled.div`
    ${fillParent};
    z-index: -1;
    background-color: ${p => p.theme.overlay_75};
`;

const CardContent = styled.div`
    ${fillParent};
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
    opacity: 0;
    ${transition("opacity", "0.2s")};
`;

const CardWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.gray200};
    ${transition("transform", "0.2s")};

    @media (hover: hover) {
        &:hover {
            transform: translate3d(0, -0.5rem, 0);

            ${CardContent} {
                opacity: 1;
            }
        }
    }
`;

export const Card: React.FC<Api.TV> = ({ id, name, poster_path }) => {
    const preload = usePreload(id);

    if (!poster_path) return null;

    return (
        <CardWrapper onMouseEnter={preload.onMouseEnter} onMouseLeave={preload.onMouseLeave}>
            <CardContent>
                <CardName>{name}</CardName>
                <CardProgress />
                <CardOverlay />
            </CardContent>
            <Image
                src={_posterUrl(poster_path)}
                alt={name}
                layout="fill"
                objectFit="cover"
                unoptimized
            />
        </CardWrapper>
    );
};
