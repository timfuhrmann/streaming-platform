import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { _posterUrl } from "../../lib/poster";
import { Content } from "../../css/content";
import { HeadlineXL } from "../../css/typography";

const OpenerWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    min-height: 75rem;
`;

const OpenerBackground = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const AccentOverlay = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, ${p => p.theme.gray50} 0%, transparent 100%);
`;

const OpenerContent = styled(Content)``;

const OpenerTitle = styled(HeadlineXL)``;

interface OpenerProps {
    name: string;
    image: string;
}

export const Opener: React.FC<OpenerProps> = ({ name, image }) => {
    return (
        <OpenerWrapper>
            <OpenerContent>
                <OpenerTitle as="h1">{name}</OpenerTitle>
            </OpenerContent>
            <OpenerBackground>
                <Image
                    src={_posterUrl(image, "original")}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="50% 15%"
                />
            </OpenerBackground>
            <AccentOverlay />
        </OpenerWrapper>
    );
};
