import { useEffect, useState } from "react";

interface InfiniteScrollOptions {
    skip?: number;
    limit?: number;
}

interface UseInfiniteScrollData {
    page: number;
}

export const useInfiniteScroll = (options: InfiniteScrollOptions = {}): UseInfiniteScrollData => {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const onScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 200 && !hasReachedLimit()) {
                setPage(prevState => prevState + 1);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [page]);

    const hasReachedLimit = () => {
        if (!options.limit) {
            return false;
        }

        return page >= options.limit;
    };

    return {
        page,
    };
};
