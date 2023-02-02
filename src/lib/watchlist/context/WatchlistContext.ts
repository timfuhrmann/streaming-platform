import { createContext, useContext } from "react";

interface WatchlistData {
    loading: boolean;
    watchlist: Record<number, Watchlist.Entry>;
    activeShows: Api.TV[];
    keepWatching: Api.TV[];
    isShowActive: (id: number) => boolean;
    hasShowProgress: (id: number) => number;
    addShowToWatchlist: (show: Api.TV) => void;
    addProgressToWatchlist: (show: Api.TV, progress: number) => void;
}

export const WatchlistContext = createContext<WatchlistData>({} as WatchlistData);

export const useWatchlist = () => useContext(WatchlistContext);
