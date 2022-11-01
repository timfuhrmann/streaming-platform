import { createContext, useContext } from "react";

interface NProgressContextData {
    startProgress: () => void;
    finishProgress: () => void;
}

export const NProgressContext = createContext<NProgressContextData>({} as NProgressContextData);

export const useNProgress = () => useContext(NProgressContext);
