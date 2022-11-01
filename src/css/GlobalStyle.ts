import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { nprogress } from "./nprogress";
import { flowText } from "@css/typography";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    ${nprogress};
    
    :root {
        color-scheme: dark;
    }
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        ${flowText("textMd", "regular")};
        background-color: ${p => p.theme.gray50};
        color: ${p => p.theme.gray900};
        -webkit-overflow-scrolling: touch;
    }
    
    .hide-cursor {
        cursor: none;
    }
`;
