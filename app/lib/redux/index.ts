import thunk from "redux-thunk";
import reducer from "./reducer";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Middleware, Store } from "@reduxjs/toolkit";
import { useMemo } from "react";

export const REDUX_INITIAL_STATE = "__REDUX_STATE__";
const middleware: Middleware[] = [thunk];

let store: Store;

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

const loadStore = (initialState?: RootState) => {
    return createStore(reducer, initialState, applyMiddleware(...middleware));
};

const initializeStore = (initialState?: RootState) => {
    const _store = store ?? loadStore(initialState);

    if (typeof window === "undefined") {
        return _store;
    }

    if (!store) {
        store = _store;
    }

    return _store;
};

export const useRedux = (pageProps: any) => {
    const state = pageProps[REDUX_INITIAL_STATE];
    return useMemo(() => initializeStore(state), [state]);
};

export type RootState = ReturnType<typeof store.getState>;
