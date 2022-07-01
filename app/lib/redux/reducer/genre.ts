import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppState } from "../index";
import { getShowsByGenre } from "@lib/api/tmdb";
import { recordArrayToRecord } from "@lib/util";

export const INFINITE_SCROLL_SKIP = 4;

interface GenreState {
    genres: Api.Genre[];
    genreResults: Record<string, Api.TV[]>;
    page: number;
    loading: boolean;
    hasNextPage: boolean;
}

const initialState: GenreState = {
    genres: [],
    genreResults: {},
    page: 0,
    loading: false,
    hasNextPage: true,
};

export const fetchGenrePage = createAsyncThunk<Record<string, Api.TV[]>[] | null>(
    "genre/fetchGenrePage",
    async (_, thunkAPI) => {
        const { genre } = thunkAPI.getState() as AppState;
        const { genres, page } = genre;

        const genrePage = genres.slice(
            INFINITE_SCROLL_SKIP * page,
            INFINITE_SCROLL_SKIP * (page + 1)
        );

        return Promise.all(genrePage.map(item => getShowsByGenre(item)));
    }
);

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGenrePage.pending, state => {
            state.loading = true;
            state.page += 1;
        });

        builder.addCase(fetchGenrePage.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }

            state.genreResults = { ...state.genreResults, ...recordArrayToRecord(payload) };
            state.hasNextPage = state.genres.length > Object.keys(state.genreResults).length;
            state.loading = false;
        });
    },
});

export default genreSlice.reducer;
