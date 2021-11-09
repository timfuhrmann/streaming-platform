import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { _posterUrl } from "@lib/poster";
import { usePreload } from "@lib/preload";

const CardWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.gray200};
`;

export const SliderCard: React.FC<Api.TV> = ({ id, name, poster_path }) => {
    const preload = usePreload(id);

    if (!poster_path) return null;

    return (
        <CardWrapper onMouseEnter={preload.onMouseEnter} onMouseLeave={preload.onMouseLeave}>
            <Image src={_posterUrl(poster_path)} alt={name} layout="fill" objectFit="cover" />
        </CardWrapper>
    );
};
