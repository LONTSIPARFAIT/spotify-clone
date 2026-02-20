import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { Link } from "react-router-dom";

const Player = () => {
  const { 
    track, seekBg, seekBar, playStatus, play, pause, 
    time, previous, next, seekSong, volume, setVolume,
    toggleVoiceRecognition, isListening, voiceMessage 
  } = useContext(PlayerContext)
  
  const [showVolume, setShowVolume] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)
  const [repeatMode, setRepeatMode] = useState('none') // none, all, one

  // Formater le temps avec 2 chiffres pour les secondes
  const formatTime = (timeObj) => {
    return `${timeObj.minute}:${timeObj.second.toString().padStart(2, '0')}`
  }

  // Calculer le pourcentage de progression
  const progressPercentage = time.totalTime.totalSeconds > 0 
    ? (time.currentTime.totalSeconds / time.totalTime.totalSeconds) * 100 
    : 0

  return (
    <div className="h-[10%] bg-black border-t border-gray-800 flex justify-between items-center text-white px-4 relative">
      {/* Informations de la piste */}
      <div className="hidden lg:flex items-center gap-4 w-1/4">
        {track?.image && (
          <div className="relative group">
            <img className="w-14 h-14 rounded shadow-lg" src={track.image} alt={track.name} />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Link to="/lyrics" className="text-xs text-white hover:text-green-400">
                Paroles
              </Link>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold truncate hover:underline cursor-pointer">
            {track?.name || 'Aucune piste'}
          </p>
          <p className="text-sm text-gray-400 truncate hover:underline cursor-pointer">
            {track?.artist || 'Artiste inconnu'}
          </p>
          {track?.name && (
            <Link to="/lyrics" className="text-xs text-gray-400 hover:text-green-400 transition">
              Voir les paroles →
            </Link>
          )}
        </div>
      </div>

      {/* Contrôles principaux */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-3xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsShuffling(!isShuffling)}
            className={`hover:text-green-400 transition ${isShuffling ? 'text-green-400' : 'text-gray-400'}`}
          >
            <img className="w-4" src={assets.shuffle_icon} alt="shuffle" />
          </button>
          
          <button 
            onClick={previous} 
            className="hover:text-white transition text-gray-400"
          >
            <img className="w-4" src={assets.prev_icon} alt="previous"/>
          </button>
          
          <button 
            onClick={playStatus ? pause : play} 
            className="bg-green-900/100 hover:scale-105 transition rounded-full p-2"
          >
            <img 
              className="w-5" 
              src={playStatus ? assets.pause_icon : assets.play_icon} 
              alt={playStatus ? "pause" : "play"}
            />
          </button>
          
          <button 
            onClick={next} 
            className="hover:text-white transition text-gray-400"
          >
            <img className="w-4" src={assets.next_icon} alt="next"/>
          </button>
          
          <button 
            onClick={() => {
              if (repeatMode === 'none') setRepeatMode('all')
              else if (repeatMode === 'all') setRepeatMode('one')
              else setRepeatMode('none')
            }}
            className={`hover:text-green-400 transition ${
              repeatMode !== 'none' ? 'text-green-400' : 'text-gray-400'
            }`}
          >
            <img 
              className="w-4" 
              src={repeatMode === 'one' ? assets.repeat_one_icon : assets.loop_icon} 
              alt="repeat" 
            />
          </button>
        </div>

        {/* Barre de progression personnalisée */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">
            {formatTime(time.currentTime)}
          </span>
          
          <div className="relative flex-1 group">
            <div 
              ref={seekBg}
              onClick={seekSong}
              className="w-full h-1 bg-gray-600 rounded-full cursor-pointer group-hover:h-2 transition-all"
            >
              <div 
                ref={seekBar}
                className="absolute h-full bg-green-400 rounded-full pointer-events-none"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          
          <span className="text-xs text-gray-400 w-10">
            {formatTime(time.totalTime)}
          </span>
        </div>
      </div>

      {/* Contrôles secondaires */}
      <div className="hidden lg:flex items-center gap-3 w-1/4 justify-end">
        <button className="hover:text-green-400 transition text-gray-400">
          <img className="w-4" src={assets.plays_icon} alt="queue" />
        </button>
        
        <button 
          onClick={toggleVoiceRecognition}
          className={`hover:text-green-400 transition ${
            isListening ? 'text-green-400' : 'text-gray-400'
          }`}
          title="Commande vocale"
        >
          <img className="w-4" src={assets.mic_icon} alt="voice" />
        </button>
        
        <button className="hover:text-green-400 transition text-gray-400">
          <img className="w-4" src={assets.queue_icon} alt="queue" />
        </button>
        
        <div className="relative flex items-center gap-2">
          <button 
            onClick={() => setShowVolume(!showVolume)}
            className="hover:text-green-400 transition text-gray-400"
          >
            <img className="w-4" src={assets.volume_icon} alt="volume" />
          </button>
          
          {showVolume && (
            <div className="absolute bottom-8 right-0 bg-gray-800 p-3 rounded-lg shadow-xl">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #10b981 ${volume * 100}%, #4b5563 ${volume * 100}%)`
                }}
              />
            </div>
          )}
        </div>
        
        <button className="hover:text-green-400 transition text-gray-400">
          <img className="w-4" src={assets.mini_player_icon} alt="mini player" />
        </button>
        
        <button className="hover:text-green-400 transition text-gray-400">
          <img className="w-4" src={assets.zoom_icon} alt="fullscreen" />
        </button>
      </div>

      {/* Message vocal avec animation */}
      {voiceMessage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-down">
          <p className="text-sm">{voiceMessage}</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800" />
        </div>
      )}
    </div>
  );
};

export default Player;