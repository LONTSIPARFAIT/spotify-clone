import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { Link } from "react-router-dom";

const Player = () => {

  const { track,seekBg,seekBar,playStatus,play,pause,time,previous,next,seekSong, volume, setVolume,toggleVoiceRecognition,isListening,voiceMessage, } = useContext(PlayerContext)

  return (
    <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="" />
        <div className="">
          <p> {track.name} </p>
          <p> {track.artist} </p>
          {/* Ajout d'un lien vers la page des paroles */}
          <Link to="/lyrics" className="text-sm text-gray-400 hover:text-gray-200">
            Voir les paroles
          </Link>
          {/* <p> {track.desc.slice(0, 12)} </p> */}
        </div>
      </div>
      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
          <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt=""/>
          {
            playStatus
            ?<img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt=""/>
            :<img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt=""/>
          }
          <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt=""/>
          <img className="w-4 cursor-pointer"  src={assets.loop_icon} alt=""/>
        </div>
        <div className="flex items-center gap-5">
          <p>{time.currentTime.minute}:{time.currentTime.second}</p>
          <div ref={seekBg} onClick={seekSong} className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer">
            <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full' />
          </div>
          <p>{time.totalTime.minute}:{time.totalTime.second}</p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="" />
        <img
          onClick={toggleVoiceRecognition}
          className={`w-4 cursor-pointer ${isListening ? "text-green-500" : "text-white"}`}
          src={assets.mic_icon}
          alt=""
        />
        <img className="w-4" src={assets.queue_icon} alt="" />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        <img className="w-4" src={assets.volume_icon} alt="" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="w-20 h-1 bg-slate-50 rounded"
        />
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />    
      </div>  
      {voiceMessage && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded">
          {voiceMessage}
        </div>
      )}
    </div>
  );
};

export default Player;
