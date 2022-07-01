import React, { PropsWithChildren, useEffect } from "react";
import styled from "styled-components";
import { Content, square } from "@css/content";
import { IconChevronRight } from "@icon/IconChevronRight";
import { transition } from "@css/transition";
import { HeadlineS } from "@css/typography";
import { TOptions } from "keen-slider";
import { useSlider } from "@lib/hook/useSlider";

const SliderWrapper = styled.div<{ $hidden: boolean }>`
    overflow: hidden;
    visibility: ${p => p.$hidden && "hidden"};
`;

const SliderContainer = styled.div`
    overflow: visible;
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

interface SliderTemplateProps {
    title?: string;
    options?: TOptions;
    length?: number;
}

export const SliderTemplate: React.FC<PropsWithChildren<SliderTemplateProps>> = ({
    title,
    length,
    options = {},
    children,
}) => {
    const [ref, { mounted, isBeginning, isEnd, prev, next, resize }] = useSlider(options);

    useEffect(() => {
        if (!mounted || !length) {
            return;
        }

        resize();
    }, [mounted, length]);

    return (
        <React.Fragment>
            <SliderWrapper $hidden={!mounted}>
                <Content>{title && <SliderTitle>{title}</SliderTitle>}</Content>
                <SliderInner>
                    <SliderControlPrev type="button" onClick={prev} $isHidden={isBeginning}>
                        <SliderChevronLeft />
                    </SliderControlPrev>
                    <SliderFrame>
                        <SliderContainer ref={ref} className="keen-slider">
                            {children}
                        </SliderContainer>
                    </SliderFrame>
                    <SliderControl type="button" onClick={next} $isHidden={isEnd}>
                        <SliderChevron />
                    </SliderControl>
                </SliderInner>
            </SliderWrapper>
        </React.Fragment>
    );
};
