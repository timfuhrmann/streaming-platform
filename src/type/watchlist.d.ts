declare module Watchlist {
    interface Entry {
        timestamp: number;
        progress: number;
        active: boolean;
        show: Api.TV;
    }
}
