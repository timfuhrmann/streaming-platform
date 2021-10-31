import { createContext, useContext } from "react";

interface PlayerContextData {
    togglePlay: () => void;
    toggleFullscreen: () => void;
    currentTimeStamp: () => string;
    missingTimeStamp: () => string;
    timeStampFromAbs: (abs: number) => string;
    jumpToAbs: (abs: number) => void;
}

export const PlayerContext = createContext<PlayerContextData>({} as PlayerContextData);

export const usePlayer = () => useContext(PlayerContext);
