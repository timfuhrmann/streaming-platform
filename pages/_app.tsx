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
import { Navigation } from "../app/layout/atom/Navigation";
import { ProfileProvider } from "@lib/profile/ProfileProvider";
import { WatchlistProvider } from "@lib/watchlist/context/WatchlistProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const reduxStore = useRedux(pageProps);

    return (
        <ReduxProvider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <ProfileProvider>
                    <WatchlistProvider>
                        <GlobalStyle />
                        {!pageProps.hideNavigation && <Navigation />}
                        <Component {...pageProps} />
                        <MoviePopUp />
                    </WatchlistProvider>
                </ProfileProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;
