import React from "react";
import styled from "styled-components";
import { getPosterUrl, Image } from "@lib/image";
import { aspectRatio, fillParent } from "@css/helper";
import { text } from "@css/typography";
import { Button } from "../../shared/Button";
import { RatingCircle } from "../../shared/RatingCircle";
import { genresToString } from "@lib/genre";
import { useNProgress } from "@lib/context/nprogress";
import { usePopover } from "./PopoverProvider";

const OpenerWrapper = styled.div`
    position: relative;
    isolation: isolate;
`;

const OpenerGrid = styled.div`
    position: relative;
    display: grid;
    grid-template: "stack";
`;

const OpenerSize = styled.div`
    grid-area: stack;
    min-height: 30rem;
    ${aspectRatio(0.55)};
`;

const OpenerFrame = styled.div`
    grid-area: stack;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    background-color: ${p => p.theme.gray300};
`;

const OpenerHead = styled.div`
    position: relative;
    padding: 2rem 2rem 4rem;

    ${p => p.theme.breakpoints.min("l")} {
        padding: 4rem;
    }
`;

const OpenerHeadline = styled.h1`
    ${text("displayMd", "bold")};

    ${p => p.theme.breakpoints.min("m")} {
        ${text("displayLg", "bold")};
    }
`;

const OpenerGenres = styled.div`
    color: ${p => p.theme.gray800};
    margin-top: 0.25rem;
`;

const OpenerOverlay = styled.div`
    ${fillParent};
    background: linear-gradient(0deg, ${p => p.theme.gray100} 0%, transparent 100%);

    ${p => p.theme.breakpoints.min("m")} {
        background: linear-gradient(0deg, ${p => p.theme.gray100} 0%, transparent 50%);
    }
`;

const OpenerContent = styled.div`
    position: relative;
    z-index: 1;
    padding: 0 2rem;

    ${p => p.theme.breakpoints.min("l")} {
        padding: 0 4rem;
    }
`;

const OpenerText = styled.div`
    max-width: 60rem;
`;

const OpenerControls = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

export const PopoverOpener: React.FC = () => {
    const { entry } = usePopover();
    const { startProgress } = useNProgress();

    const { id, name, overview, vote_average, backdrop_path, genres } = entry;

    return (
        <OpenerWrapper>
            <OpenerGrid>
                <OpenerSize />
                <OpenerFrame>
                    {backdrop_path && (
                        <Image
                            src={getPosterUrl(backdrop_path, "original")}
                            alt={name}
                            objectPosition="50% 15%"
                            fill
                        />
                    )}
                    <OpenerOverlay />
                    <OpenerHead>
                        <OpenerHeadline>{name}</OpenerHeadline>
                        <OpenerGenres>{genresToString(genres)}</OpenerGenres>
                        <OpenerControls>
                            <Button action={`/watch/${id}`} onLink={startProgress}>
                                Play
                            </Button>
                            {vote_average > 0 && <RatingCircle vote={vote_average} />}
                        </OpenerControls>
                    </OpenerHead>
                </OpenerFrame>
            </OpenerGrid>
            <OpenerContent>
                <OpenerText>{overview}</OpenerText>
            </OpenerContent>
        </OpenerWrapper>
    );
};
