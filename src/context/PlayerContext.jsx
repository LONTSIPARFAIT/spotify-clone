import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false)
  }

  // useEffect(() => {
  //   setTimeout(() => {
      
  //     audioRef.current.ontimeupdate = () =>{
  //       setTimeout({
  //         currentTime: {
  //           second: Math.floor(audioRef.current.currentTime % 60),
  //           minute: Math.floor(audioRef.current.currentTime / 60),
  //         },
  //         totalTime: {
  //           second: Math.floor(audioRef.current.duration % 60),
  //           minute: Math.floor(audioRef.current.duration / 60),
  //         }
  //       });
  //     }

  //   }, 1000);
  // },[audioRef])

  useEffect(() => {
    const audio = audioRef.current;
  
    // Vérifie que l'élément audio existe
    if (!audio) return;
  
    // Définit le gestionnaire de mise à jour du temps
    const handleTimeUpdate = () => {
      seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.currentTime))
      setTime({
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      });
    };
  
    audio.ontimeupdate = handleTimeUpdate;
  
    // Nettoyage : retire le gestionnaire quand le composant se démonte
    return () => {
      audio.ontimeupdate = null;
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play,pause,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
