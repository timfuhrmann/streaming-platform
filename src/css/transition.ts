import { css } from "styled-components";

export const transition = (
    properties: string,
    durations: string,
    types: string = "ease",
    delay: string = "0s"
) => `
      transition-property: ${properties};
      transition-duration: ${durations};
      transition-type: ${durations};
      transition-timing-function: ${types};
      transition-delay: ${delay};
      will-change: ${properties};
`;

export const controlsTransition = css`
    transform-origin: center;
    ${transition("color, transform", "0.2s")};

    @media (hover: hover) {
        &:hover {
            color: ${p => p.theme.primary};
            transform: scale(1.15);
        }
    }

    &:active {
        color: ${p => p.theme.primary};
    }
`;
