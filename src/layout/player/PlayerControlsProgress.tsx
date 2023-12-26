import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Drag } from "@lib/drag";
import { useAppSelector } from "@lib/redux";
import { usePlayer } from "./PlayerProvider";

const ProgressWrapper = styled.div`
    position: relative;
`;

const ProgressFrame = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
`;

const ProgressIndicator = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100%;
    width: 0.25rem;
    background-color: ${p => p.theme.gray900};
    pointer-events: none;
    will-change: transform;
`;

const ProgressIndicatorTime = styled.div`
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    padding: 0.5rem;
    background-color: ${p => p.theme.gray200};
    will-change: transform;
`;

const ProgressBarWrapper = styled.div`
    position: relative;
    flex: 1;
`;

const ProgressBar = styled.div`
    position: relative;
    width: 100%;
    height: 1rem;
    background-color: ${p => p.theme.gray400};
    overflow: hidden;

    @media (hover: hover) {
        &:hover {
            transform: scaleY(1.5);
        }
    }
`;

const ProgressBarInner = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${p => p.theme.primary};
    transform-origin: left;
    will-change: transform;
`;

const ProgressBarBuffer = styled(ProgressBarInner)`
    background-color: ${p => p.theme.gray600};
`;

const ProgressTimeStamp = styled.div`
    font-weight: 600;
    min-width: 6rem;

    &:last-child {
        text-align: right;
    }
`;

export const PlayerControlsProgress: React.FC = () => {
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState<number>(0);
    const [indicatorActive, setIndicatorActive] = useState<boolean>(false);
    const { progress, buffer } = useAppSelector(state => state.player);
    const { currentTimeStamp, missingTimeStamp, timeStampFromAbs, jumpToAbs } = usePlayer();
    const [dragging, setDragging] = useState<boolean>(false);

    useEffect(() => {
        if (!progressRef.current) {
            return;
        }

        const drag = new Drag(progressRef.current, {
            onDrag: setDragging,
            onProgress: jumpToAbs,
        });

        return () => {
            drag.destroy();
        };
    }, [jumpToAbs]);

    const moveIndicator = useCallback(
        (e: MouseEvent) => {
            if (!progressRef.current || (!indicatorActive && !dragging)) {
                return;
            }

            const { left } = progressRef.current.getBoundingClientRect();

            setIndicator(e.clientX - left);
        },
        [dragging, indicatorActive]
    );

    useEffect(() => {
        document.addEventListener("mousemove", moveIndicator);
        return () => document.removeEventListener("mousemove", moveIndicator);
    }, [moveIndicator]);

    const calcIndicatorAbs = (): number => {
        if (!progressRef.current || indicator === null) {
            return 0;
        }

        const { width } = progressRef.current.getBoundingClientRect();

        return Math.min(1, Math.max(0, indicator / width));
    };

    return (
        <ProgressWrapper>
            <ProgressFrame>
                <ProgressTimeStamp>{currentTimeStamp()}</ProgressTimeStamp>
                <ProgressBarWrapper>
                    <ProgressBar
                        ref={progressRef}
                        onMouseEnter={() => setIndicatorActive(true)}
                        onMouseLeave={() => setIndicatorActive(false)}>
                        <ProgressBarBuffer style={{ transform: "scaleX(" + buffer + ")" }} />
                        <ProgressBarInner style={{ transform: "scaleX(" + progress + ")" }} />
                        {(indicatorActive || dragging) && (
                            <ProgressIndicator
                                style={{ transform: `translate3d(${indicator}px, 0, 0)` }}
                            />
                        )}
                    </ProgressBar>
                    {(indicatorActive || dragging) && (
                        <ProgressIndicatorTime
                            style={{
                                transform: `translate3d(calc(${indicator}px - 50%), calc(-100% - 1rem), 0)`,
                            }}>
                            {timeStampFromAbs(calcIndicatorAbs())}
                        </ProgressIndicatorTime>
                    )}
                </ProgressBarWrapper>
                <ProgressTimeStamp>{missingTimeStamp()}</ProgressTimeStamp>
            </ProgressFrame>
        </ProgressWrapper>
    );
};
