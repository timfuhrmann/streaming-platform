import React, { useMemo } from "react";
import styled from "styled-components";
import { text } from "@css/typography";
import { Button } from "./Button";
import { usePreload } from "@lib/hook/usePreload";
import { genresToString } from "@lib/genre";
import { truncateString } from "@lib/util";
import { useNProgress } from "@lib/context/nprogress";
import { getPosterUrl, Image } from "@lib/image";
import { Content } from "@css/helper/content";

const OpenerWrapper = styled.div`
    position: relative;
    isolation: isolate;
    display: flex;
    align-items: center;
    min-height: 65rem;
    padding: 10rem 0;

    ${p => p.theme.breakpoints.min("l")} {
        min-height: 75rem;
    }
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
    ${text("displayLg", "black")};

    ${p => p.theme.breakpoints.min("m")} {
        ${text("display2Xl", "black")};
    }
`;

export const Opener: React.FC<Api.TVDetails> = ({ id, name, backdrop_path, overview, genres }) => {
    const preload = usePreload(id);
    const { startProgress } = useNProgress();

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
                    <Button action={`/watch/${id}`} scroll={false} onLink={startProgress}>
                        Play
                    </Button>
                    <Button action={preload.onClick} isSecondary>
                        More info
                    </Button>
                </OpenerControls>
            </OpenerContent>
            <OpenerBackground>
                {backdrop_path && (
                    <Image src={getPosterUrl(backdrop_path, "original")} alt={name} priority fill />
                )}
            </OpenerBackground>
            <AccentOverlay />
        </OpenerWrapper>
    );
};
