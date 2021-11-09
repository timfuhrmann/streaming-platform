import React from "react";
import Image from "next/image";
import styled from "styled-components";
import { _posterUrl } from "@lib/poster";
import { aspectRatio, fillParent } from "@css/content";
import { HeadlineL } from "@css/typography";
import { Button } from "../atom/Button";
import { Rating } from "../atom/Rating";

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
    gap: 1.5rem;
    margin-top: 1.5rem;
`;

export const PopUpOpener: React.FC<Api.TVDetails> = ({
    id,
    name,
    overview,
    vote_average,
    backdrop_path,
}) => {
    return (
        <OpenerWrapper>
            <OpenerFrame>
                <OpenerInner>
                    <OpenerHead>
                        <OpenerHeadline>{name}</OpenerHeadline>
                        <OpenerControls>
                            <Button action={`/watch/${id}`}>Play</Button>
                            <Rating vote={vote_average} />
                        </OpenerControls>
                    </OpenerHead>
                    <OpenerOverlay />
                    {backdrop_path && (
                        <Image
                            src={_posterUrl(backdrop_path, "original")}
                            alt={name}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="50% 15%"
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
