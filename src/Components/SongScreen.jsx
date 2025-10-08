import React, { useContext } from 'react'
import { MainContext } from '../Contexts/MainContext'
import PlaybackControl from './PlaybackControl'
import VolumeControl from './VolumeControl'

export default function SongScreen() {
    const { audioRef, 
            currentSong, 
            onLoadedMetaData,
            onTimeUpdate,
            onSongEnded,
            formatTime,
            currentTime,
            duration,
            handleProgressBarChange, } = useContext(MainContext);
    
    return (
        <div className="mainContainer">
            {/* Hidden Audio Element */}
            <audio
            ref={audioRef}
            src={currentSong.src}
            onLoadedMetadata={onLoadedMetaData}
            onTimeUpdate={onTimeUpdate}
            onEnded={onSongEnded}
            />

            {/* Song Info Display */}
            <div className="songInfo">
                <h2>{currentSong.title}</h2>
                <p>{currentSong.artist}</p>
            </div>

            <div className="imageBox">
                <i class="fa-solid fa-compact-disc"></i>
            </div>

            {/* Progress Bar */}
            <div className="progressBarSection">
                <div className="timeDisplay">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
                <input className="range"
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleProgressBarChange}
                />
            </div>

            {/* Playback Controls */}
            <PlaybackControl />

            {/* Volume Control */}
            <VolumeControl />
        </div>
    )
}
