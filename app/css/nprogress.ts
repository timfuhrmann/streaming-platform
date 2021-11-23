import { css } from "styled-components";

export const nprogress = css`
    #nprogress {
        pointer-events: none;
    }

    #nprogress .bar {
        position: fixed;
        z-index: 9999;
        top: 0;
        left: 0;
        background: ${p => p.theme.primary};
        width: 100%;
        height: 0.4rem;
    }

    .nprogress-custom-parent {
        overflow: hidden;
        position: relative;
    }

    .nprogress-custom-parent #nprogress .bar {
        position: absolute;
    }
`;
