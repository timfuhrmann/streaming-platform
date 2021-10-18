import styled from "styled-components";

export const Block = styled.div`
    margin-top: 10rem;
`;

export const NegativeBlock = styled.div`
    margin-top: -10rem;
`;

export const Content = styled.div<{ breakMobile?: boolean; breakDesktop?: boolean }>`
    margin: 0 2rem;
    width: calc(100% - 4rem);

    @media ${p => p.theme.bp.l} {
        max-width: 150rem;
        width: calc(100% - 20rem);
        margin: 0 auto;
    }
`;

export const aspectRatio = (abs: number) => `
    position: relative;

    &::after {
        content: "";
        display: block;
        padding-bottom: ${100 * abs}%;
    }
`;
