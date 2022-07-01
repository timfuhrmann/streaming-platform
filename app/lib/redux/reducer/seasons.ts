import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEpisodesBySeason } from "@lib/api/tmdb";
import { AppState } from "../index";

interface SeasonsState {
    seasonResults: Record<number, Record<number, Api.Episode[]>>;
}

interface ThunkParams {
    showId: number;
    seasonNumber: number;
}

const initialState: SeasonsState = {
    seasonResults: {},
};

export const fetchEpisodes = createAsyncThunk<Api.Episode[] | null, ThunkParams>(
    "seasons/fetchEpisodes",
    async ({ showId, seasonNumber }, thunkAPI) => {
        const { seasons } = thunkAPI.getState() as AppState;

        if (seasons.seasonResults[showId] && seasons.seasonResults[showId][seasonNumber]) {
            return null;
        }

        return await getEpisodesBySeason(showId, seasonNumber);
    }
);

const seasonsSlice = createSlice({
    name: "seasons",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchEpisodes.fulfilled, (state, { meta, payload }) => {
            if (!payload) {
                return;
            }

            state.seasonResults = {
                ...state.seasonResults,
                [meta.arg.showId]: {
                    ...state.seasonResults[meta.arg.showId],
                    [meta.arg.seasonNumber]: payload,
                },
            };
        });
    },
});

export default seasonsSlice.reducer;
