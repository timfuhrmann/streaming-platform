import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import styled from "styled-components";
import { PlayerContext } from "./PlayerContext";
import { useDispatch } from "react-redux";
import {
    setBuffer,
    setFullscreen,
    setPlaying,
    setProgress,
    setWaiting,
} from "@lib/redux/reducer/player";
import { handleFullscreen } from "../fullscreen";
import { convertToTimeCode, DEFAULT_TIMESTAMP } from "../index";

const HLS_VIDEO_SRC = "https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8";

const Video = styled.video`
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    pointer-events: none;
    user-select: none;
`;

interface PlayerProvider {
    fullscreenContainer: React.MutableRefObject<HTMLElement | null>;
}

export const PlayerProvider: React.FC<PlayerProvider> = ({ fullscreenContainer, children }) => {
    const dispatch = useDispatch();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (!videoRef.current) {
            return;
        }

        if (!Hls.isSupported()) {
            videoRef.current.src = HLS_VIDEO_SRC;
            return;
        }

        const hls = new Hls();
        hls.loadSource(HLS_VIDEO_SRC);
        hls.attachMedia(videoRef.current);

        return () => hls.destroy();
    }, []);

    /** Plays video if pause, else pause video. */
    const togglePlay = () => {
        if (!videoRef.current) {
            return;
        }

        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    /** Opens container fullscreen if closed, else closes fullscreen. */
    const toggleFullscreen = () => {
        if (!fullscreenContainer.current) {
            return;
        }

        handleFullscreen(fullscreenContainer.current).then(isFullscreen =>
            dispatch(setFullscreen(isFullscreen))
        );
    };

    /** Sets play state according to video paused state. */
    const handlePlayState = () => {
        if (!videoRef.current) {
            return;
        }

        dispatch(setPlaying(!videoRef.current.paused));
    };

    /**
     * Calculates progress from video's current time and duration.
     * @returns {number}
     */
    const calcProgress = (): number => {
        if (!videoRef.current) {
            return 0;
        }

        return videoRef.current.currentTime / videoRef.current.duration;
    };

    /**
     * Calculates buffer from video's buffered length and duration.
     * @returns {number}
     */
    const calcBuffer = (): number => {
        if (!videoRef.current) {
            return 0;
        }

        const buffer = videoRef.current.buffered.end(videoRef.current.buffered.length - 1) || 0;

        return buffer / videoRef.current.duration;
    };

    /**
     * Generates timestamp from absolute number and duration.
     * @param {number} abs
     * @returns {string}
     */
    const timeStampFromAbs = (abs: number): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        const time = videoRef.current.duration * abs;

        return convertToTimeCode(time);
    };

    /**
     * Generates timestamp from current time.
     * @returns {string} Current time in time code.
     */
    const currentTimeStamp = (): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        return convertToTimeCode(videoRef.current.currentTime);
    };

    /**
     * Generates timestamp from current time and duration.
     * @returns {string} Missing time in time code.
     */
    const missingTimeStamp = (): string => {
        if (!videoRef.current) {
            return DEFAULT_TIMESTAMP;
        }

        return convertToTimeCode(videoRef.current.duration - videoRef.current.currentTime);
    };

    /**
     * Jump to specific time from absolute number and duration.
     * @param {number} abs
     */
    const jumpToAbs = (abs: number): void => {
        if (!videoRef.current) {
            return;
        }

        videoRef.current.currentTime = videoRef.current.duration * abs;
    };

    /**
     * Event Listeners
     */
    const onPlay = () => {
        handlePlayState();
    };

    const onPause = () => {
        handlePlayState();
    };

    const onProgress = () => {
        dispatch(setBuffer(calcBuffer()));
    };

    const onTimeUpdate = () => {
        dispatch(setProgress(calcProgress()));
        dispatch(setWaiting(false));
    };

    const onWaiting = () => {
        dispatch(setWaiting(true));
    };

    return (
        <PlayerContext.Provider
            value={{
                togglePlay,
                toggleFullscreen,
                currentTimeStamp,
                missingTimeStamp,
                timeStampFromAbs,
                jumpToAbs,
            }}>
            {children}
            <Video
                ref={videoRef}
                onPlay={onPlay}
                onPause={onPause}
                onProgress={onProgress}
                onTimeUpdate={onTimeUpdate}
                onWaiting={onWaiting}
            />
        </PlayerContext.Provider>
    );
};
