import thunk, { ThunkMiddleware } from "redux-thunk";
import reducer from "./reducer";
import { Middleware, Store, configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const REDUX_INITIAL_STATE = "__REDUX_STATE__";
const middleware: Middleware[] = [thunk as ThunkMiddleware];

let store: Store;

if (process.env.NODE_ENV !== "production") {
    // middleware.push(createLogger());
}

const makeStore = (preloadedState?: Partial<AppState>) => {
    return configureStore({
        reducer,
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
        devTools: process.env.NODE_ENV !== "production",
        preloadedState,
    });
};

const initializeStore = (preloadedState?: Partial<AppState>) => {
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

export const useRedux = (pageProps: { [REDUX_INITIAL_STATE]: Partial<AppState> }) => {
    const state = pageProps[REDUX_INITIAL_STATE];
    return useMemo(() => initializeStore(state), [state]);
};

export type AppState = ReturnType<typeof reducer>;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
