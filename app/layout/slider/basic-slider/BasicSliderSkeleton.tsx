import React from "react";
import styled from "styled-components";
import { aspectRatio, Content, fillParent } from "@css/content";
import { HeadlineS } from "@css/typography";
import { createArray } from "@lib/util";

const SkeletonWrapper = styled(Content)``;

const SkeletonList = styled.div`
    display: flex;
    margin: -0.75rem;
`;

const SkeletonCardFrame = styled.div`
    flex: 1 1 calc(50% - 1.5rem);
    max-width: calc(50% - 1.5rem);
    margin: 0.75rem;
    ${aspectRatio(1.5)};

    &:nth-child(n + 3) {
        display: none;
    }

    @media ${p => p.theme.bp.m} {
        flex: 1 1 calc(33.33% - 1.5rem);
        max-width: calc(33.33% - 1.5rem);

        &:nth-child(n + 3) {
            display: block;
        }

        &:nth-child(n + 4) {
            display: none;
        }
    }

    @media ${p => p.theme.bp.l} {
        flex: 1 1 calc(25% - 1.5rem);
        max-width: calc(25% - 1.5rem);

        &:nth-child(n + 4) {
            display: block;
        }

        &:nth-child(n + 5) {
            display: none;
        }
    }

    @media ${p => p.theme.bp.xl} {
        flex: 1 1 calc(16.66% - 1.5rem);
        max-width: calc(16.66% - 1.5rem);

        &:nth-child(n + 5) {
            display: block;
        }
    }
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
                {createArray(6).map(index => (
                    <SkeletonCardFrame key={index}>
                        <SkeletonCard />
                    </SkeletonCardFrame>
                ))}
            </SkeletonList>
        </SkeletonWrapper>
    );
};
