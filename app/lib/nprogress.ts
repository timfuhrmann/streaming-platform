import { useEffect, useRef } from "react";
import NProgress from "nprogress";
import { useRouter } from "next/router";

interface NProgress {
    startProgress: () => void;
    finishProgress: () => void;
}

export const useNProgress = (): NProgress => {
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

    return {
        startProgress,
        finishProgress,
    };
};
