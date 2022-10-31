import React, { useMemo } from "react";
import styled from "styled-components";
import { getPosterUrl, Image } from "@lib/image";
import { aspectRatio, fillParent } from "@css/content";
import { HeadlineL } from "@css/typography";
import { Button } from "../../shared/Button";
import { RatingCircle } from "../../shared/RatingCircle";
import { genresToString } from "@lib/genre";
import { useNProgress } from "@lib/context/nprogress";

const OpenerWrapper = styled.div`
    position: relative;
`;

const OpenerInner = styled.div`
    ${fillParent};
    display: flex;
    align-items: flex-end;
`;

const OpenerHeadline = styled.h2`
    ${HeadlineL};
    line-height: 1;
`;

const OpenerFrame = styled.div`
    min-height: 30rem;
    ${aspectRatio(0.55)};
    background-color: ${p => p.theme.gray300};
`;

const OpenerHead = styled.div`
    position: relative;
    z-index: 2;
    padding: 2rem 2rem 4rem;

    @media ${p => p.theme.bp.l} {
        padding: 4rem;
    }
`;

const OpenerGenres = styled.div`
    color: ${p => p.theme.gray800};
    margin-top: 0.75rem;
`;

const OpenerOverlay = styled.div`
    ${fillParent};
    z-index: 1;
    background: linear-gradient(0deg, ${p => p.theme.gray100} 0%, transparent 100%);

    @media ${p => p.theme.bp.m} {
        background: linear-gradient(0deg, ${p => p.theme.gray100} 0%, transparent 50%);
    }
`;

const OpenerContent = styled.div`
    padding: 0 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 0 4rem;
    }
`;

const OpenerText = styled.div`
    max-width: 50rem;
`;

const OpenerControls = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

export const PopOverOpener: React.FC<Api.TVDetails> = ({
    id,
    name,
    overview,
    vote_average,
    backdrop_path,
    genres,
}) => {
    const { startProgress } = useNProgress();

    const featuredGenres = useMemo(() => {
        return genresToString(genres);
    }, [genres]);

    return (
        <OpenerWrapper>
            <OpenerFrame>
                <OpenerInner>
                    <OpenerHead>
                        <OpenerHeadline>{name}</OpenerHeadline>
                        <OpenerGenres>{featuredGenres}</OpenerGenres>
                        <OpenerControls>
                            <Button action={`/watch/${id}`} onLink={startProgress}>
                                Play
                            </Button>
                            {vote_average > 0 && <RatingCircle vote={vote_average} />}
                        </OpenerControls>
                    </OpenerHead>
                    <OpenerOverlay />
                    {backdrop_path && (
                        <Image
                            src={getPosterUrl(backdrop_path, "original")}
                            alt={name}
                            objectPosition="50% 15%"
                            fill
                        />
                    )}
                </OpenerInner>
            </OpenerFrame>
            <OpenerContent>
                <OpenerText>{overview}</OpenerText>
            </OpenerContent>
        </OpenerWrapper>
    );
};
