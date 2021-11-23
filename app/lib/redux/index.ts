import thunk from "redux-thunk";
import reducer from "./reducer";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware, Middleware, Store } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const REDUX_INITIAL_STATE = "__REDUX_STATE__";
const middleware: Middleware[] = [thunk];

let store: Store;

if (process.env.NODE_ENV !== "production") {
    middleware.push(createLogger());
}

const makeStore = (preloadedState?: AppState) => {
    return createStore(reducer, preloadedState, applyMiddleware(...middleware));
};

const initializeStore = (preloadedState?: AppState) => {
    let _store = store ?? makeStore(preloadedState);

    if (preloadedState && store) {
        _store = makeStore({ ...store.getState(), ...preloadedState });
    }

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

export type AppState = ReturnType<typeof reducer>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
