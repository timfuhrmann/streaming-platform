import React from "react";
import styled from "styled-components";
import { SeasonsOverviewSeason } from "./SeasonsOverviewSeason";
import { Select } from "../../shared/Select";
import { text } from "@css/typography";
import { useSeasonOverview, withSeasonOverview } from "./SeasonOverviewProvider";

const BlockWrapper = styled.div``;

const BlockHead = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 2rem;
    margin-bottom: 2rem;

    ${p => p.theme.breakpoints.min("l")} {
        padding: 0 4rem;
    }
`;

const BlockName = styled.h3`
    ${text("displaySm", "bold")};
    display: flex;
`;

const BlockInfo = styled.div`
    display: none;
    color: ${p => p.theme.gray600};
    margin-left: 1.5rem;

    ${p => p.theme.breakpoints.min("m")} {
        display: block;
    }
`;

export interface SeasonsOverviewProps {
    seasons: Api.Season[];
    show: Api.TVDetails;
}

export const SeasonsOverview: React.FC<SeasonsOverviewProps> = withSeasonOverview(({ seasons }) => {
    const { activeSeasonIndex, setActiveSeasonIndex, activeSeason } = useSeasonOverview();
    const { name, episode_count } = activeSeason;

    return (
        <BlockWrapper>
            <BlockHead>
                <BlockName>
                    {name}
                    <BlockInfo>
                        {episode_count}
                        {episode_count !== 1 ? " episodes" : " episode"}
                    </BlockInfo>
                </BlockName>
                <Select
                    value={activeSeasonIndex}
                    onChange={value => setActiveSeasonIndex(parseInt(value))}
                    options={seasons.reduce((map, season, index) => {
                        map[index] = season.name;
                        return map;
                    }, {} as Record<string, string>)}
                />
            </BlockHead>
            <SeasonsOverviewSeason />
        </BlockWrapper>
    );
});
