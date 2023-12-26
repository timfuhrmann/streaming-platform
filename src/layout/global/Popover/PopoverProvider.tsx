import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { preloadShow } from "@lib/redux/reducer/shows";
import { getRecommendations } from "@lib/api/tmdb";
import { deleteParamFromQuery } from "@lib/util";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useAppSelector } from "@lib/redux";

interface PopoverContext {
    entry: Api.TVDetails;
    recommendations: Api.TV[] | null;
    handleClose: () => Promise<boolean>;
}

const PopoverContext = createContext<PopoverContext>({} as PopoverContext);

export const PopoverProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const { entities, fetchRequests } = useAppSelector(state => state.shows);
    const [entry, setEntry] = useState<Api.TVDetails | null>(null);
    const [recommendations, setRecommendations] = useState<Api.TV[] | null>(null);

    useEffect(() => {
        if (!id || typeof id !== "string") {
            setEntry(null);
            return;
        }

        const numId = parseInt(id);

        const entity = entities[numId];

        if (entity) {
            setEntry(entity);
        } else if (!fetchRequests.includes(numId)) {
            dispatch(preloadShow({ id: numId }));
        }
    }, [id, entities, dispatch, fetchRequests]);

    useEffect(() => {
        if (!id || typeof id !== "string") {
            return;
        }

        getRecommendations(parseInt(id)).then(setRecommendations);

        return () => setRecommendations(null);
    }, [id]);

    const handleClose = () => {
        const query = deleteParamFromQuery(router.query, "id");

        return router.push({ query }, undefined, {
            shallow: true,
            scroll: false,
        });
    };

    if (!entry) {
        return null;
    }

    return (
        <PopoverContext.Provider value={{ entry, recommendations, handleClose }}>
            {children}
        </PopoverContext.Provider>
    );
};

export const withPopover = <T,>(WrappedComponent: React.ComponentType<T>) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T & {}) => {
        return (
            <PopoverProvider {...props}>
                <WrappedComponent {...props} />
            </PopoverProvider>
        );
    };

    ComponentWithProvider.displayName = `withPopover(${displayName})`;

    return ComponentWithProvider;
};

export const usePopover = () => useContext(PopoverContext);
