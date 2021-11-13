import { createContext, useContext } from "react";

interface WatchlistData {
    loading: boolean;
    watchlist: Record<number, Watchlist.Entry>;
    activeShowsFromWatchlist: Api.TV[];
    isShowActive: (id: number) => boolean;
    addShowToWatchlist: (show: Api.TV) => void;
    addProgressToWatchlist: (show: Api.TV, progress: number) => void;
}

export const WatchlistContext = createContext<WatchlistData>({} as WatchlistData);

export const useWatchlist = () => useContext(WatchlistContext);
