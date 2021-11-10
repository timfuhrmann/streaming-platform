import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSlider } from "@lib/slider";
import { Content, square } from "@css/content";
import { HeadlineS } from "@css/typography";
import { TrendingCard } from "../molecule/TrendingCard";
import { IconChevronRight } from "@icon/IconChevronRight";
import { transition } from "@css/transition";

const TrendingWrapper = styled.div<{ $hidden: boolean }>`
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const TrendingInner = styled.div`
    display: flex;
`;

const TrendingFrame = styled(Content)`
    @media ${p => p.theme.bp.maxL} {
        width: 100%;
    }
`;
const TrendingContainer = styled.div`
    overflow: visible;
`;

const TrendingSlide = styled.a`
    will-change: transform;
`;

const TrendingTitle = styled.h3`
    ${HeadlineS};
    margin-bottom: 0.8rem;
`;

const TrendingChevron = styled(IconChevronRight)`
    ${square("6rem")};
`;

const TrendingChevronLeft = styled(TrendingChevron)`
    transform: scaleX(-1);
`;

const TrendingControl = styled.button<{ $isHidden: boolean }>`
    position: relative;
    z-index: 1;
    flex: 1;
    display: none;
    justify-content: center;
    align-items: center;
    background: ${p => p.theme.backgroundGradient_90_75};
    opacity: ${p => (p.$isHidden ? 0 : 1)};
    pointer-events: ${p => p.$isHidden && "none"};
    ${transition("opacity", "0.15s")};

    @media ${p => p.theme.bp.l} {
        display: flex;
    }
`;

const TrendingControlPrev = styled(TrendingControl)`
    background: ${p => p.theme.backgroundGradient_270_75};
`;

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BlockTrendingSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const [ref, { mounted, isBeginning, isEnd, prev, next }] = useSlider({
        slidesPerView: 1,
        loop: false,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 2,
            },
            "(min-width: 1340px)": {
                slidesPerView: 3,
            },
        },
    });

    return (
        <TrendingWrapper $hidden={!mounted}>
            <Content>{title && <TrendingTitle>{title}</TrendingTitle>}</Content>
            <TrendingInner>
                <TrendingControlPrev type="button" onClick={prev} $isHidden={isBeginning}>
                    <TrendingChevronLeft />
                </TrendingControlPrev>
                <TrendingFrame>
                    <TrendingContainer ref={ref} className="keen-slider">
                        {shows.slice(0, 9).map((show, index) => (
                            <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                                <TrendingSlide className="keen-slider__slide">
                                    <TrendingCard index={index} show={show} />
                                </TrendingSlide>
                            </Link>
                        ))}
                    </TrendingContainer>
                </TrendingFrame>
                <TrendingControl type="button" onClick={next} $isHidden={isEnd}>
                    <TrendingChevron />
                </TrendingControl>
            </TrendingInner>
        </TrendingWrapper>
    );
};
