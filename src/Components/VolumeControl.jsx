import React, { useContext } from 'react'
import { MainContext } from '../Contexts/MainContext'

export default function VolumeControl() {
    const { volume, handleVolumeChange } = useContext(MainContext);
    
    return (
        <div className="volumeControl">
            <i className="fa-solid fa-volume-high"></i>
            <input className="range"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    )
}
