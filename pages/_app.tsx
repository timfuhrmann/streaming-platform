import React from "react";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "../app/css/theme";
import { GlobalStyle } from "../app/css/GlobalStyle";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
  );
};

export default App;
