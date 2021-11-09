import React from "react";
import "@css/font/stylesheet.css";
import "keen-slider/keen-slider.min.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@css/theme";
import { GlobalStyle } from "@css/GlobalStyle";
import { Provider as ReduxProvider } from "react-redux";
import { useRedux } from "@lib/redux";
import { MoviePopUp } from "../app/layout/template/MoviePopUp";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const reduxStore = useRedux(pageProps);

    return (
        <ReduxProvider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Component {...pageProps} />
                <MoviePopUp />
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;
