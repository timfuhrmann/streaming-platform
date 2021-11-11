import React from "react";
import styled from "styled-components";
import { fillParent } from "@css/content";

const ProgressWrapper = styled.div``;

const ProgressTime = styled.div`
    color: ${p => p.theme.gray900};
    margin-bottom: 0.5rem;
`;

const ProgressFrame = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 0.4rem;
    background-color: ${p => p.theme.gray400};
`;

const ProgressInner = styled.div<{ $abs: number }>`
    ${fillParent};
    transform-origin: left;
    transform: scaleX(${p => p.$abs});
    background-color: ${p => p.theme.gray900};
`;

export const CardProgress: React.FC = () => {
    return (
        <ProgressWrapper>
            <ProgressTime>1h 30min</ProgressTime>
            <ProgressFrame>
                <ProgressInner $abs={0.5} />
            </ProgressFrame>
        </ProgressWrapper>
    );
};
