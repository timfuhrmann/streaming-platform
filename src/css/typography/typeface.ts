import { CSSObject } from "styled-components";

const createTypeface = (
    fontSize: string,
    lineHeight: string | number,
    letterSpacing?: string | number
): CSSObject => ({
    fontSize,
    lineHeight,
    letterSpacing,
});

export const typefaces = {
    display2Xl: createTypeface("7.2rem", "8rem", "-0.3rem"),
    displayXl: createTypeface("5.8rem", "6.4rem", "-0.3rem"),
    displayLg: createTypeface("4.4rem", "5.2rem", "-0.2rem"),
    displayMd: createTypeface("3.6rem", "4.4rem", "-0.15rem"),
    displaySm: createTypeface("3rem", "3.8rem", "-0.1rem"),
    displayXs: createTypeface("2.4rem", "3rem", "-0.1rem"),
    textXl: createTypeface("2rem", "2.8rem", "-0.05rem"),
    textLg: createTypeface("1.8rem", "2.6rem", "-0.05rem"),
    textMd: createTypeface("1.6rem", "2.1rem"),
    textSm: createTypeface("1.4rem", "1.9rem"),
    textXs: createTypeface("1.2rem", "1.7rem"),
    text2Xs: createTypeface("1rem", "1.4rem"),
} as const;

export type Typeface = keyof typeof typefaces;
