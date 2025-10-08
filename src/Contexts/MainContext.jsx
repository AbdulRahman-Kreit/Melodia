import React, { createContext, useState, useRef, useEffect } from 'react';
import { playlist } from '../Utils/PlayList';

export const MainContext = createContext(null);

export default function MainProvider({ children }) {
    // --- State Variables ---
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.7);

    // --- References ---
    const audioRef = useRef(null);

    // --- Helper Variables (Derived State) ---
    const currentSong = playlist[currentSongIndex];

    // --- Functions (Event Handlers & Logic) ---

    function togglePlayPause() {
        setIsPlaying(!isPlaying);
    }

    function playNextSong() {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true); // Automatically play the next song
    }

    function playPreviousSong() {
        let previousIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        setCurrentSongIndex(previousIndex);
        setIsPlaying(true); // Automatically play the previous song
    }

    function onLoadedMetaData() {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    }

    function onTimeUpdate() {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }

    function onSongEnded() {
        playNextSong(); // Play the next song when the current one ends
    }

    function handleProgressBarChange(event) {
        if (audioRef.current) { // Added check
            audioRef.current.currentTime = parseFloat(event.target.value);
            // Removed redundant setCurrentTime here, relying on onTimeUpdate
        }
    }

    function handleVolumeChange(event) {
        let newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        if (audioRef.current) { // Added check
            audioRef.current.volume = newVolume;
        }
    }

    // --- Effects ---
    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        // Autoplay was prevented. Show a UI element to let the user manually start playback.
                        console.error("Audio playback failed (likely autoplay prevention):", error);
                        setIsPlaying(false); // Stop trying to play
                        // Optionally, show a message to the user: "Click play to start audio"
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentSongIndex]); // Re-run when isPlaying or currentSongIndex changes

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]); // Re-run when volume changes

    // Format time function
    function formatTime(timeInSeconds) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    return (
        <MainContext.Provider value={{
            audioRef,
            currentSong,
            onLoadedMetaData,
            onTimeUpdate,
            onSongEnded,
            formatTime,
            currentTime,
            duration,
            handleProgressBarChange,
            playPreviousSong,
            togglePlayPause,
            isPlaying,
            playNextSong,
            volume,
            handleVolumeChange
        }}>
            {children}
        </MainContext.Provider>
    );
}