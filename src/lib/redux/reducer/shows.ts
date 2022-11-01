import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../index";
import { getShowById } from "../../api/tmdb";

interface ShowsState {
    entities: Record<number, Api.TVDetails>;
    fetchRequests: number[];
}

interface ThunkParams {
    id: number;
}

const initialState: ShowsState = {
    entities: {},
    fetchRequests: [],
};

export const preloadShow = createAsyncThunk<Api.TVDetails | null, ThunkParams>(
    "shows/preloadShow",
    async ({ id }, thunkAPI) => {
        const { shows } = thunkAPI.getState() as AppState;

        if (!!shows.entities[id]) {
            return null;
        }

        thunkAPI.dispatch(registerFetchRequest(id));

        return await getShowById(id);
    }
);

const showsSlice = createSlice({
    name: "shows",
    initialState,
    reducers: {
        registerFetchRequest(state, action: PayloadAction<number>) {
            state.fetchRequests.push(action.payload);
        },
    },
    extraReducers: builder => {
        builder.addCase(preloadShow.fulfilled, (state, { payload }) => {
            if (!payload) {
                return;
            }

            state.entities = { ...state.entities, [payload.id]: payload };
        });
    },
});

export const { registerFetchRequest } = showsSlice.actions;
export default showsSlice.reducer;
