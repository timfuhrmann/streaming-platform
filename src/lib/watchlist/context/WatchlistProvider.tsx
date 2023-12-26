import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from "react";
import { WatchlistContext } from "./index";
import { MOCK_WATCHLIST } from "@lib/mock/mock";

const STORAGE_WATCHLIST = "stream.watchlist";

export const WatchlistProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [watchlist, setWatchlist] = useState<Record<number, Watchlist.Entry>>({});

    useEffect(() => {
        try {
            const storage = localStorage.getItem(STORAGE_WATCHLIST);

            if (!storage) {
                setWatchlist(MOCK_WATCHLIST);
                setLoading(false);
                return;
            }

            setWatchlist(JSON.parse(storage));
            setLoading(false);
        } catch (e) {
            setWatchlist(MOCK_WATCHLIST);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_WATCHLIST, JSON.stringify(watchlist));
    }, [watchlist]);

    const activeShows = useMemo(() => {
        return Object.keys(watchlist)
            .filter(showId => {
                if (isNaN(parseInt(showId))) {
                    return false;
                }

                return watchlist[parseInt(showId)].active && !watchlist[parseInt(showId)].progress;
            })
            .sort((a, b) => watchlist[parseInt(a)].timestamp - watchlist[parseInt(b)].timestamp)
            .map(showId => watchlist[parseInt(showId)].show);
    }, [watchlist]);

    const keepWatching = useMemo(() => {
        return Object.keys(watchlist)
            .filter(showId => {
                if (isNaN(parseInt(showId))) {
                    return false;
                }

                return !!watchlist[parseInt(showId)].progress;
            })
            .sort((a, b) => watchlist[parseInt(b)].timestamp - watchlist[parseInt(a)].timestamp)
            .map(showId => watchlist[parseInt(showId)].show);
    }, [watchlist]);

    /**
     * Checks whether the show is active on watchlist.
     * @param {number} id
     * @return {boolean}
     */
    const isShowActive = useCallback(
        (id: number): boolean => {
            const show = watchlist[id];

            if (!show) {
                return false;
            }

            return show.active;
        },
        [watchlist]
    );

    /**
     * Returns show's progress.
     * @param {number} id
     * @return {number}
     */
    const hasShowProgress = useCallback(
        (id: number): number => {
            const show = watchlist[id];

            if (!show) {
                return 0;
            }

            return show.progress;
        },
        [watchlist]
    );

    /**
     * Adds show to playlist / removes show from playlist if has already been added.
     * @param {Api.TV} show
     */
    const addShowToWatchlist = useCallback((show: Api.TV) => {
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
    }, []);

    /**
     * Adds show to watchlist and/or updates its progress.
     * @param {Api.TV} show
     * @param {number} progress
     */
    const addProgressToWatchlist = useCallback((show: Api.TV, progress: number) => {
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
    }, []);

    return (
        <WatchlistContext.Provider
            value={{
                loading,
                watchlist,
                activeShows,
                keepWatching,
                isShowActive,
                hasShowProgress,
                addShowToWatchlist,
                addProgressToWatchlist,
            }}>
            {children}
        </WatchlistContext.Provider>
    );
};
