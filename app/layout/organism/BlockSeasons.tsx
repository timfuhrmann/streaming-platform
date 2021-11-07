import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchEpisodes } from "../../lib/redux/reducer/seasons";
import { Episodes } from "../molecule/Episodes";
import { useAppSelector } from "../../lib/redux";
import { Select } from "../atom/Select";
import { HeadlineM } from "../../css/typography";
import { EpisodesSkeleton } from "../molecule/EpisodesSkeleton";

const BlockWrapper = styled.div``;

const BlockHead = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 2rem;
    margin-bottom: 2rem;

    @media ${p => p.theme.bp.l} {
        padding: 0 4rem;
    }
`;

const BlockName = styled(HeadlineM)`
    display: flex;
`;

const BlockInfo = styled.span`
    color: ${p => p.theme.gray600};
    margin-left: 1.5rem;
`;

interface BlockSeasonsProps {
    seasons: Api.Season[];
    show: Api.TVDetails;
}

export const BlockSeasons: React.FC<BlockSeasonsProps> = ({ seasons, show }) => {
    const dispatch = useDispatch();
    const { seasonResults } = useAppSelector(state => state.seasons);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        dispatch(
            fetchEpisodes({ showId: show.id, seasonNumber: seasons[activeIndex].season_number })
        );
    }, [activeIndex]);

    const activeShow = seasonResults[show.id];
    const activeEpisodes = activeShow ? activeShow[seasons[activeIndex].season_number] : null;

    return (
        <BlockWrapper>
            <BlockHead>
                <BlockName>
                    {seasons[activeIndex].name}
                    <BlockInfo>
                        {seasons[activeIndex].episode_count}
                        {seasons[activeIndex].episode_count !== 1 ? " episodes" : " episode"}
                    </BlockInfo>
                </BlockName>
                <Select
                    value={activeIndex}
                    onChange={value => setActiveIndex(parseInt(value))}
                    options={seasons.reduce((map, season, index) => {
                        map[index] = season.name;
                        return map;
                    }, {} as Record<string, string>)}
                />
            </BlockHead>
            {activeEpisodes ? <Episodes episodes={activeEpisodes} /> : <EpisodesSkeleton />}
        </BlockWrapper>
    );
};
