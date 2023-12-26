import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@lib/redux";
import { fetchEpisodes } from "@lib/redux/reducer/seasons";
import { SeasonsOverviewProps } from "./SeasonsOverview";

interface SeasonOverviewContextData {
    show: Api.TVDetails;
    activeSeasonIndex: number;
    setActiveSeasonIndex: (value: number) => void;
    activeSeason: Api.Season;
    activeEpisodes: Api.Episode[] | null;
}

const SeasonOverviewContext = createContext<SeasonOverviewContextData>(
    {} as SeasonOverviewContextData
);

export const SeasonOverviewProvider: React.FC<PropsWithChildren<SeasonsOverviewProps>> = ({
    show,
    seasons,
    children,
}) => {
    const dispatch = useDispatch();
    const { seasonResults } = useAppSelector(state => state.seasons);
    const [activeSeasonIndex, setActiveSeasonIndex] = useState<number>(0);

    useEffect(() => {
        dispatch(
            fetchEpisodes({
                showId: show.id,
                seasonNumber: seasons[activeSeasonIndex].season_number,
            })
        );
    }, [dispatch, show, seasons, activeSeasonIndex]);

    const activeShow = seasonResults[show.id];
    const activeSeason = seasons[activeSeasonIndex];
    const activeEpisodes = activeShow ? activeShow[activeSeason.season_number] : null;

    return (
        <SeasonOverviewContext.Provider
            value={{
                show,
                activeSeasonIndex,
                setActiveSeasonIndex,
                activeSeason,
                activeEpisodes,
            }}>
            {children}
        </SeasonOverviewContext.Provider>
    );
};

export const withSeasonOverview = <T,>(
    WrappedComponent: React.ComponentType<T & SeasonsOverviewProps>
) => {
    const displayName = WrappedComponent.displayName || WrappedComponent.name || "Component";

    const ComponentWithProvider = (props: T & SeasonsOverviewProps) => {
        return (
            <SeasonOverviewProvider {...props}>
                <WrappedComponent {...props} />
            </SeasonOverviewProvider>
        );
    };

    ComponentWithProvider.displayName = `withSeasonOverview(${displayName})`;

    return ComponentWithProvider;
};

export const useSeasonOverview = () => useContext(SeasonOverviewContext);
