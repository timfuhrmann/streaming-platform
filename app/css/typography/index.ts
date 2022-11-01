import { css } from "styled-components";
import { Typeface, typefaces } from "@css/typography/typeface";

const fontWeights = {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 800,
} as const;

type FontWeight = keyof typeof fontWeights;

export const flowText = (typeface: Typeface, fontWeight: FontWeight = "regular") => css`
    ${typefaces[typeface]};
    font-weight: ${fontWeights[fontWeight]};
`;

export const text = (typeface: Typeface, fontWeight: FontWeight = "regular") => css`
    ${flowText(typeface, fontWeight)};
    line-height: normal;
`;
