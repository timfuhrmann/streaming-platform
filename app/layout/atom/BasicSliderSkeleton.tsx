import React from "react";
import styled from "styled-components";
import { aspectRatio, Content, fillParent } from "@css/content";
import { HeadlineS } from "@css/typography";

const SkeletonWrapper = styled(Content)``;

const SkeletonList = styled.div`
    display: flex;
    margin: -0.75rem;
`;

const SkeletonCardFrame = styled.div`
    flex: 1 1 calc(16.66% - 1.5rem);
    max-width: calc(16.66% - 1.5rem);
    margin: 0.75rem;
    ${aspectRatio(1.5)};
`;

const SkeletonCard = styled.div`
    ${fillParent};
    background-color: ${p => p.theme.gray200};
`;

const SkeletonTitle = styled.h3`
    ${HeadlineS};
    margin-bottom: 0.8rem;
    opacity: 0;
`;

export const BasicSliderSkeleton: React.FC = () => {
    return (
        <SkeletonWrapper>
            <SkeletonTitle>Loading...</SkeletonTitle>
            <SkeletonList>
                {[...Array(6)].map((item, index) => (
                    <SkeletonCardFrame key={index}>
                        <SkeletonCard />
                    </SkeletonCardFrame>
                ))}
            </SkeletonList>
        </SkeletonWrapper>
    );
};
