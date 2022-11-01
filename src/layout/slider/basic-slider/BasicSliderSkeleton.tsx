import React from "react";
import styled from "styled-components";
import { aspectRatio, fillParent } from "@css/helper";
import { text } from "@css/typography";
import { createArray } from "@lib/util";
import { Content } from "@css/helper/content";

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

    ${p => p.theme.breakpoints.min("m")} {
        flex: 1 1 calc(33.33% - 1.5rem);
        max-width: calc(33.33% - 1.5rem);

        &:nth-child(n + 3) {
            display: block;
        }

        &:nth-child(n + 4) {
            display: none;
        }
    }

    ${p => p.theme.breakpoints.min("l")} {
        flex: 1 1 calc(25% - 1.5rem);
        max-width: calc(25% - 1.5rem);

        &:nth-child(n + 4) {
            display: block;
        }

        &:nth-child(n + 5) {
            display: none;
        }
    }

    ${p => p.theme.breakpoints.min("xl")} {
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
    ${text("textXl", "bold")};
    margin-bottom: 0.8rem;
    opacity: 0;
`;

export const BasicSliderSkeleton: React.FC = () => {
    return (
        <SkeletonWrapper>
            <SkeletonTitle>Loading...</SkeletonTitle>
            <SkeletonList>
                {createArray(7).map(index => (
                    <SkeletonCardFrame key={index}>
                        <SkeletonCard />
                    </SkeletonCardFrame>
                ))}
            </SkeletonList>
        </SkeletonWrapper>
    );
};
