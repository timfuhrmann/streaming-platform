import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { _posterUrl } from "../../lib/poster";

const CardWrapper = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: ${p => p.theme.gray100};
`;

export const SliderCard: React.FC<Api.Movie> = ({ title, poster_path }) => {
    if (!poster_path) return null;

    return (
        <CardWrapper>
            <Image src={_posterUrl(poster_path)} alt={title} layout="fill" objectFit="cover" />
        </CardWrapper>
    );
};
