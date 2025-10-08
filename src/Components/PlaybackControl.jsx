import React, { useContext } from 'react'
import { MainContext } from '../Contexts/MainContext'

export default function PlaybackControl() {
    const { playPreviousSong, 
            togglePlayPause, 
            isPlaying, 
            playNextSong } = useContext(MainContext);
    
    return (
        <div className="playbackControls">
            <button onClick={playPreviousSong}>
                <i className="fa-solid fa-backward-step"></i>
            </button>
            <button onClick={togglePlayPause}>
                {isPlaying ? 
                <i className="fa-solid fa-circle-pause"></i> : 
                <i className="fa-solid fa-circle-play"></i>}
            </button>
            <button onClick={playNextSong}>
                <i className="fa-solid fa-forward-step"></i>
            </button>
        </div>
    )
}
