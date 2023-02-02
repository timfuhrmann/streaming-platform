import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { square } from "@css/helper";
import { IconChevronRight } from "@icon/IconChevronRight";
import { transition } from "@css/helper";
import { text } from "@css/typography";
import { useSlider } from "@lib/hook/useSlider";
import { content, Content } from "@css/helper/content";
import { KeenSliderOptions } from "keen-slider";

const SliderWrapper = styled.div<{ $hidden: boolean }>`
    isolation: isolate;
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const SliderContainer = styled.div`
    &.keen-slider:not([data-keen-slider-disabled]) {
        overflow: visible;

        .keen-slider__slide {
            overflow: visible;
        }
    }
`;

const SliderInner = styled.div`
    display: flex;
`;

const SliderFrame = styled.div`
    ${content()};
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

    ${p => p.theme.breakpoints.min("l")} {
        display: flex;
    }
`;

const SliderControlPrev = styled(SliderControl)`
    background: ${p => p.theme.backgroundGradient_270_75};
`;

const SliderTitle = styled.h3`
    ${text("textXl", "bold")};
    margin-bottom: 0.8rem;
`;

interface SliderTemplateProps {
    title?: string;
    options?: KeenSliderOptions;
}

export const SliderTemplate: React.FC<PropsWithChildren<SliderTemplateProps>> = ({
    title,
    options = {},
    children,
}) => {
    const [sliderRef, { mounted, isBeginning, isEnd, prev, next }] = useSlider({
        ...options,
        observeMutations: true,
    });

    return (
        <SliderWrapper $hidden={!mounted}>
            <Content>{title && <SliderTitle>{title}</SliderTitle>}</Content>
            <SliderInner>
                <SliderControlPrev type="button" onClick={prev} $isHidden={isBeginning}>
                    <SliderChevronLeft />
                </SliderControlPrev>
                <SliderFrame>
                    <SliderContainer ref={sliderRef} className="keen-slider">
                        {children}
                    </SliderContainer>
                </SliderFrame>
                <SliderControl type="button" onClick={next} $isHidden={isEnd}>
                    <SliderChevron />
                </SliderControl>
            </SliderInner>
        </SliderWrapper>
    );
};
