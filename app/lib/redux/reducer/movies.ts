import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { getMovieById } from "../../api/tmdb";

interface MovieState {
    entities: Record<number, Api.MovieDetails>;
    fetchRequests: number[];
}

interface ThunkParams {
    id: number;
}

const initialState: MovieState = {
    entities: {},
    fetchRequests: [],
};

export const preloadMovie = createAsyncThunk<Api.MovieDetails | null, ThunkParams>(
    "movies/preloadMovie",
    async ({ id }, thunkAPI) => {
        const { movies } = thunkAPI.getState() as RootState;

        if (!!movies.entities[id]) {
            return null;
        }

        thunkAPI.dispatch(registerFetchRequest(id));

        return await getMovieById(id);
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        registerFetchRequest(state, action: PayloadAction<number>) {
            state.fetchRequests.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(preloadMovie.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }

            state.entities = { ...state.entities, [payload.id]: payload };
        });
    },
});

export const { registerFetchRequest } = moviesSlice.actions;
export default moviesSlice.reducer;
