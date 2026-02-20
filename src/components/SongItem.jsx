import React, { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";

const SongItem = ({ image, name, desc, id, artist }) => {
  const { playWithId, track, playStatus } = useContext(PlayerContext)
  const [isHovered, setIsHovered] = useState(false)
  
  const isCurrentSong = track?.id === id
  const isPlaying = isCurrentSong && playStatus

  return (
    <div 
      onClick={() => playWithId(id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-300"
    >
      <div className="relative">
        <img 
          className="rounded shadow-lg group-hover:shadow-xl transition-all duration-300" 
          src={image} 
          alt={name} 
        />
        
        {/* Overlay avec bouton play */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <img 
              className="w-6" 
              src={isPlaying ? assets.pause_icon : assets.play_icon} 
              alt={isPlaying ? "pause" : "play"} 
            />
          </button>
        </div>

        {/* Badge "En cours de lecture" */}
        {isCurrentSong && (
          <div className="absolute top-2 left-2 bg-green-500 rounded-full p-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        )}
      </div>

      <div className="mt-3">
        <p className={`font-bold truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
          {name}
        </p>
        <p className="text-gray-400 text-sm truncate">{artist || 'Artiste inconnu'}</p>
        {desc && <p className="text-gray-500 text-xs truncate mt-1">{desc}</p>}
      </div>

      {/* Menu contextuel (au survol) */}
      {isHovered && (
        <div className="absolute top-3 right-3 flex gap-1">
          <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          <button className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default SongItem;