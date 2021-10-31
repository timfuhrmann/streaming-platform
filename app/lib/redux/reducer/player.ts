import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
    playing: boolean;
    waiting: boolean;
    fullscreen: boolean;
    progress: number;
    buffer: number;
}

const initialState: PlayerState = {
    playing: false,
    waiting: false,
    fullscreen: false,
    progress: 0,
    buffer: 0,
};

const playerSlide = createSlice({
    name: "player",
    initialState,
    reducers: {
        setPlaying(state, action: PayloadAction<boolean>) {
            state.playing = action.payload;
        },
        setWaiting(state, action: PayloadAction<boolean>) {
            state.waiting = action.payload;
        },
        setFullscreen(state, action: PayloadAction<boolean>) {
            state.fullscreen = action.payload;
        },
        setProgress(state, action: PayloadAction<number>) {
            state.progress = action.payload;
        },
        setBuffer(state, action: PayloadAction<number>) {
            state.buffer = action.payload;
        },
    },
});

export const { setPlaying, setWaiting, setFullscreen, setBuffer, setProgress } =
    playerSlide.actions;
export default playerSlide.reducer;
