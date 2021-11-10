import React, { useMemo } from "react";
import styled from "styled-components";
import Image from "next/image";
import { _posterUrl } from "@lib/image";
import { Content } from "@css/content";
import { HeadlineXL } from "@css/typography";
import { Button } from "../atom/Button";
import { usePreload } from "@lib/preload";
import { genresToString } from "@lib/genre";
import { truncateString } from "@lib/util";

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

const OpenerGenres = styled.div`
    color: ${p => p.theme.gray800};
    margin-top: 0.75rem;
`;

const OpenerText = styled.div`
    max-width: 50rem;
    margin-top: 1rem;
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

const OpenerControls = styled.div`
    display: flex;
    gap: 1.5rem;
    margin-top: 2rem;
`;

const OpenerContent = styled(Content)``;

const OpenerTitle = styled.h1`
    ${HeadlineXL};
    line-height: 1;
`;

export const Opener: React.FC<Api.TVDetails> = ({ id, name, backdrop_path, overview, genres }) => {
    const preload = usePreload(id);

    const featuredGenres = useMemo(() => {
        return genresToString(genres);
    }, [genres]);

    return (
        <OpenerWrapper onMouseEnter={preload.onMouseEnter} onMouseLeave={preload.onMouseLeave}>
            <OpenerContent>
                <OpenerTitle as="h1">{name}</OpenerTitle>
                <OpenerGenres>{featuredGenres}</OpenerGenres>
                <OpenerText>{truncateString(overview, 225)}</OpenerText>
                <OpenerControls>
                    <Button action={`/watch/${id}`}>Play</Button>
                    <Button action={preload.onClick} isSecondary>
                        More info
                    </Button>
                </OpenerControls>
            </OpenerContent>
            <OpenerBackground>
                {backdrop_path && (
                    <Image
                        src={_posterUrl(backdrop_path, "original")}
                        alt={name}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="50% 15%"
                        unoptimized
                    />
                )}
            </OpenerBackground>
            <AccentOverlay />
        </OpenerWrapper>
    );
};
