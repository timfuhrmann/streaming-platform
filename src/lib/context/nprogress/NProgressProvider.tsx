import React, { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { NProgressContext } from "@lib/context/nprogress/index";

export const NProgressProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const { events } = useRouter();
    const activeRef = useRef<boolean>(false);

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
    }, []);

    const finishProgress = useCallback(() => {
        if (!activeRef.current) {
            return;
        }

        NProgress.done();
        activeRef.current = false;
    }, []);

    useEffect(() => {
        events.on("routeChangeComplete", finishProgress);
        return () => events.off("routeChangeComplete", finishProgress);
    }, [events, finishProgress]);

    const startProgress = useCallback(() => {
        if (activeRef.current) {
            return;
        }

        NProgress.start();
        activeRef.current = true;
    }, []);

    return (
        <NProgressContext.Provider value={{ startProgress, finishProgress }}>
            {children}
        </NProgressContext.Provider>
    );
};
