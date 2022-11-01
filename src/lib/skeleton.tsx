import React, { CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";

const SkeletonWrapper = styled.span``;

const SkeletonInner = styled.span<{ $fill?: boolean }>`
    position: relative;
    z-index: 1;
    display: inline-flex;
    width: 100%;
    max-width: 100%;
    background-color: ${p => p.theme.gray200};
    line-height: 1;
    border-radius: 0.4rem;
    overflow: hidden;
    color: transparent;
`;

interface SkeletonProps {
    style?: CSSProperties;
}

export const Skeleton: React.FC<PropsWithChildren<SkeletonProps>> = ({ style, children }) => {
    return (
        <SkeletonWrapper aria-live="polite" aria-busy="true">
            <SkeletonInner style={style}>{children ? children : "&zwnj;"}</SkeletonInner>
        </SkeletonWrapper>
    );
};
