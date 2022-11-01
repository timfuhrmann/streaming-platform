import React, { PropsWithChildren, useEffect, useRef } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";
import { NProgressContext } from "@lib/context/nprogress/index";

export const NProgressProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    const activeRef = useRef<boolean>(false);

    useEffect(() => {
        NProgress.configure({ showSpinner: false });
    }, []);

    useEffect(() => {
        router.events.on("routeChangeComplete", finishProgress);
        return () => router.events.off("routeChangeComplete", finishProgress);
    }, []);

    const startProgress = () => {
        if (activeRef.current) {
            return;
        }

        NProgress.start();
        activeRef.current = true;
    };

    const finishProgress = () => {
        if (!activeRef.current) {
            return;
        }

        NProgress.done();
        activeRef.current = false;
    };

    return (
        <NProgressContext.Provider value={{ startProgress, finishProgress }}>
            {children}
        </NProgressContext.Provider>
    );
};
