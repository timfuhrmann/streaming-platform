import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { getMoviesByGenre } from "../../api/tmdb";

interface GenreState {
    genreResults: Record<number, Api.Movie[]>;
}

interface ThunkParams {
    id: number;
}

const initialState: GenreState = {
    genreResults: {},
};

export const fetchGenre = createAsyncThunk<Api.Movie[] | null, ThunkParams>(
    "genre/fetchGenre",
    async ({ id }, thunkAPI) => {
        const { genre } = thunkAPI.getState() as RootState;

        if (!!genre.genreResults[id]) {
            return null;
        }

        return await getMoviesByGenre(id);
    }
);

const genreSlice = createSlice({
    name: "genre",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchGenre.fulfilled, (state, { meta, payload }) => {
            if (!payload) {
                return;
            }

            state.genreResults = { ...state.genreResults, [meta.arg.id]: payload };
        });
    },
});

export default genreSlice.reducer;
