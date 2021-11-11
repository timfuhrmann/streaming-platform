import React, { useEffect, useMemo, useState } from "react";
import { WatchlistContext } from "./WatchlistContext";

const STORAGE_WATCHLIST = "watchlist";

export const WatchlistProvider: React.FC = ({ children }) => {
    const [watchlist, setWatchlist] = useState<Record<number, Watchlist.Entry>>({});

    useEffect(() => {
        const storage = localStorage.getItem(STORAGE_WATCHLIST);

        if (!storage) {
            return;
        }

        const json = JSON.parse(storage);

        if (!json) {
            return;
        }

        setWatchlist(json);
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_WATCHLIST, JSON.stringify(watchlist));
    }, [watchlist]);

    const activeShowsFromWatchlist = useMemo(() => {
        return Object.keys(watchlist)
            .filter(showId => watchlist[parseInt(showId)].active)
            .sort((a, b) => watchlist[parseInt(a)].timestamp - watchlist[parseInt(b)].timestamp)
            .map(showId => watchlist[parseInt(showId)].show);
    }, [watchlist]);

    /**
     * Checks whether or not show is active on watchlist.
     * @param {number} id
     * @return {boolean}
     */
    const isShowActive = (id: number): boolean => {
        const show = watchlist[id];

        if (!show) {
            return false;
        }

        return show.active;
    };

    /**
     * Adds show to playlist / removes show from playlist if has already been added.
     * @param {Api.TV} show
     */
    const addShowToWatchlist = (show: Api.TV) => {
        setWatchlist(prevState => {
            const prevShow = prevState[show.id];

            if (prevShow && prevShow.active) {
                if (!prevShow.progress) {
                    const slicedState = { ...prevState };
                    delete slicedState[show.id];
                    return slicedState;
                }

                return {
                    ...prevState,
                    [show.id]: {
                        ...prevShow,
                        active: false,
                    },
                };
            }

            return {
                ...prevState,
                [show.id]: {
                    timestamp: Date.now(),
                    progress: 0,
                    active: true,
                    show,
                },
            };
        });
    };

    /**
     * Adds show to watchlist and/or updates its progress.
     * @param {Api.TV} show
     * @param {number} progress
     */
    const addProgressToWatchlist = (show: Api.TV, progress: number) => {
        setWatchlist(prevState => {
            const prevShow = prevState[show.id];

            if (prevShow) {
                return {
                    ...prevState,
                    [show.id]: {
                        ...prevShow,
                        progress,
                    },
                };
            }

            return {
                ...prevState,
                [show.id]: {
                    timestamp: Date.now(),
                    active: false,
                    progress,
                    show,
                },
            };
        });
    };

    return (
        <WatchlistContext.Provider
            value={{
                watchlist,
                activeShowsFromWatchlist,
                isShowActive,
                addShowToWatchlist,
                addProgressToWatchlist,
            }}>
            {children}
        </WatchlistContext.Provider>
    );
};
