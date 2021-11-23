import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";
import { nprogress } from "./nprogress";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    ${nprogress};
    
    body {
        font-family: "Circular Std", Helvetica, Arial, sans-serif;
        background-color: ${p => p.theme.gray50};
        color: ${p => p.theme.gray900};
    }
    
    .no-scroll {
      overflow: hidden;
    }
`;
