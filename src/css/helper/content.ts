import styled, { css } from "styled-components";
import { Breakpoint, breakpoints } from "@css/helper/breakpoints";

type ContentWidth = Record<Breakpoint, string>;

export const content = (only?: Breakpoint[]) => css`
    ${p => handleContent(p.theme.contentWidth, only)};
`;

export const Content = styled.div<{ $only?: Breakpoint[] }>`
    ${p => content(p.$only)};
`;

const handleContent = (contentWidth: ContentWidth, only?: Breakpoint[]) => {
    const keys = only || breakpoints().keys;

    return keys.map(breakpoint => {
        const content = contentWidth[breakpoint];

        if (!content) {
            return;
        }

        return css`
            ${breakpoint === "s" &&
            contentWidth["intrinsic"] &&
            `${breakpoints().max("s")} {
                    width: 100%;
                    max-width: ${contentWidth["intrinsic"]};
                    margin-left: auto;
                    margin-right: auto;
            }`}

            ${breakpoints().min(breakpoint)} {
                width: 100%;
                max-width: ${content};
                margin-left: auto;
                margin-right: auto;
            }
        `;
    });
};
