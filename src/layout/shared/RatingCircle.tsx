import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { centerAbsolute, square } from "@css/helper";

const RatingWrapper = styled.div`
    position: relative;
    ${square("4rem")};
    font-size: 1.5rem;

    circle {
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }
`;

const RatingValue = styled.div`
    ${centerAbsolute};
`;

interface RatingCircleProps {
    vote: number;
}

export const RatingCircle: React.FC<RatingCircleProps> = ({ vote }) => {
    const circleRef = useRef<SVGCircleElement | null>(null);

    useEffect(() => {
        const circle = circleRef.current;

        if (!circle) {
            return;
        }

        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;

        circle.style.strokeDasharray = `${circumference} ${circumference}`;

        const offset = circumference - (vote / 10) * circumference;

        circle.style.strokeDashoffset = offset.toString();
    }, [vote]);

    return (
        <RatingWrapper className="rating">
            <svg viewBox="0 0 120 120">
                <circle
                    ref={circleRef}
                    stroke="white"
                    strokeWidth="6"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
            </svg>
            <RatingValue>{vote.toFixed(1)}</RatingValue>
        </RatingWrapper>
    );
};
