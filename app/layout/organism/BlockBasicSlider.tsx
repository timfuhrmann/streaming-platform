import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSlider } from "@lib/slider";
import { Card } from "../molecule/Card";
import { aspectRatio, Content, square } from "@css/content";
import { HeadlineS } from "@css/typography";
import { IconChevronRight } from "@icon/IconChevronRight";
import { transition } from "@css/transition";

const SliderWrapper = styled.div<{ $hidden: boolean }>`
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const SliderContainer = styled.div`
    overflow: visible;
`;

const CardWrapper = styled.a`
    position: relative;
    ${aspectRatio(1.5)};
`;

const CardInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const SliderInner = styled.div`
    display: flex;
`;

const SliderFrame = styled(Content)`
    @media ${p => p.theme.bp.maxL} {
        width: 100%;
    }
`;

const SliderChevron = styled(IconChevronRight)`
    ${square("6rem")};
`;

const SliderChevronLeft = styled(SliderChevron)`
    transform: scaleX(-1);
`;

const SliderControl = styled.button<{ $isHidden: boolean }>`
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

const SliderControlPrev = styled(SliderControl)`
    background: ${p => p.theme.backgroundGradient_270_75};
`;

const SliderTitle = styled.h3`
    ${HeadlineS};
    margin-bottom: 0.8rem;
`;

interface BlockBasicSliderProps {
    title?: string;
    shows: Api.TV[];
}

export const BlockBasicSlider: React.FC<BlockBasicSliderProps> = ({ title, shows }) => {
    const [ref, { mounted, isBeginning, isEnd, prev, next }] = useSlider({
        slidesPerView: 2,
        spacing: 15,
        breakpoints: {
            "(min-width: 768px)": {
                slidesPerView: 4,
            },
            "(min-width: 1340px)": {
                slidesPerView: 6,
            },
        },
    });

    return (
        <SliderWrapper $hidden={!mounted}>
            <Content>{title && <SliderTitle>{title}</SliderTitle>}</Content>
            <SliderInner>
                <SliderControlPrev type="button" onClick={prev} $isHidden={isBeginning}>
                    <SliderChevronLeft />
                </SliderControlPrev>
                <SliderFrame>
                    <SliderContainer ref={ref} className="keen-slider">
                        {shows.map(show => (
                            <Link key={show.id} href={{ query: { id: show.id } }} shallow passHref>
                                <CardWrapper className="keen-slider__slide">
                                    <CardInner>
                                        <Card {...show} />
                                    </CardInner>
                                </CardWrapper>
                            </Link>
                        ))}
                    </SliderContainer>
                </SliderFrame>
                <SliderControl type="button" onClick={next} $isHidden={isEnd}>
                    <SliderChevron />
                </SliderControl>
            </SliderInner>
        </SliderWrapper>
    );
};
