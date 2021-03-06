import React from "react";
import "@css/font/stylesheet.css";
import "keen-slider/keen-slider.min.css";
import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { theme } from "@css/theme";
import { GlobalStyle } from "@css/GlobalStyle";
import { Provider as ReduxProvider } from "react-redux";
import { useRedux } from "@lib/redux";
import { PopOver } from "../app/layout/global/pop-over/PopOver";
import { Navigation } from "../app/layout/global/navigation/Navigation";
import { ProfileProvider } from "@lib/context/profile/ProfileProvider";
import { WatchlistProvider } from "@lib/watchlist/context/WatchlistProvider";
import { NProgressProvider } from "@lib/context/nprogress/NProgressProvider";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
    const reduxStore = useRedux(pageProps);

    return (
        <ReduxProvider store={reduxStore}>
            <ThemeProvider theme={theme}>
                <NProgressProvider>
                    <ProfileProvider>
                        <WatchlistProvider>
                            <GlobalStyle />
                            {!pageProps.hideNavigation && <Navigation />}
                            <Component {...pageProps} />
                            <PopOver />
                        </WatchlistProvider>
                    </ProfileProvider>
                </NProgressProvider>
            </ThemeProvider>
        </ReduxProvider>
    );
};

export default App;
