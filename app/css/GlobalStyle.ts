import { createGlobalStyle } from "styled-components";
import { reset } from "./reset";

export const GlobalStyle = createGlobalStyle`
    ${reset};
    
    body {
        background-color: ${p => p.theme.gray50};
        color: ${p => p.theme.gray900};
    }
`;
