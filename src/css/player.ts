import { css } from "styled-components";
import { transition } from "@css/helper";

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
