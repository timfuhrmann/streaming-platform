import React from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { getPosterUrl } from "@lib/image";
import { usePreload } from "@lib/hook/usePreload";
import { fillParent } from "@css/helper";
import { text } from "@css/typography";
import { transition } from "@css/helper";
import { CardProgress } from "./CardProgress";
import { ButtonWatchlist } from "./CardWatchlist";
import { RatingCircle } from "../RatingCircle";
import { Button } from "../Button";

const CardHead = styled.div`
    display: flex;
    align-items: center;
`;

const CardName = styled.div`
    flex: 1 1 0;
    ${text("textXl", "bold")};
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
    border-radius: 0.8rem;
    overflow: hidden;
    transform: translateZ(0);
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

const CardFooter = styled.div`
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const CardGroup = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.2rem;
    margin-bottom: 1.2rem;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CardLink = styled(Link)`
    ${fillParent};
`;

const CardButton = styled.div`
    flex: 1 1 auto;
`;

interface CardProps extends Api.TV {
    progress: number;
    watchlistActive: boolean;
    onWatchlist: () => void;
}

export const Card: React.FC<CardProps> = ({
    id,
    name,
    poster_path,
    progress,
    watchlistActive,
    onWatchlist,
    vote_average,
}) => {
    const preload = usePreload(id);

    return (
        <CardWrapper onMouseEnter={preload.onMouseEnter} onMouseLeave={preload.onMouseLeave}>
            <CardContent>
                <CardHead>
                    <CardName>{name}</CardName>
                    <ButtonWatchlist active={watchlistActive} onClick={onWatchlist} />
                </CardHead>
                <CardFooter>
                    <CardGroup>
                        <div>
                            <RatingCircle vote={vote_average} />
                        </div>
                        <CardButton>
                            <Button action={"?id=" + id} scroll={false} shallow>
                                More info
                            </Button>
                        </CardButton>
                    </CardGroup>
                    {progress > 0 && <CardProgress progress={progress} />}
                </CardFooter>
                <CardOverlay />
                <CardLink href={{ query: { id } }} scroll={false} shallow passHref />
            </CardContent>
            {poster_path && <Image src={getPosterUrl(poster_path)} alt={name} fill />}
        </CardWrapper>
    );
};
