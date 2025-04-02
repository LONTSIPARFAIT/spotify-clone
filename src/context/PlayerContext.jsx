import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(0.);
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState({
    currentTime: { second: "00", minute: "0" },
    totalTime: { second: "00", minute: "0" },
  });

  const formatTime = (seconds) => String(Math.floor(seconds)).padStart(2, "0");

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true)
  }

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false)
  }

  const playWithId = async (id) => {
    if (!songsData[id]) return;
    await setTrack(songsData[id]);
    try {
      await audioRef.current.play();
      setPlayStatus(true);
    } catch (error) {
      console.error("Erreur lors de la lecture :", error);
    }
  };

  const playByQuery = async (query) => {
    const match = songsData.find((song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.desc.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      await setTrack(match);
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (error) {
        console.error("Erreur lors de la lecture :", error);
      }
    }
  };

  const previous = async () => {
    if (track.id>0) {
      await setTrack(songsData[track.id-1])
      await audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const next = async () => {
    if (track.id < songsData.length-1) {
      await setTrack(songsData[track.id+1])
      await audioRef.current.play()
      setPlayStatus(true)
    }
  }

  const seekSong = async (e) => {
    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)
    console.log(e);
    
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
    if (!audio) return;

    audio.volume = volume;

    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const duration = audio.duration || 0;
      seekBar.current.style.width = `${(current / duration) * 100 || 0}%`;
      setTime({
        currentTime: {
          second: formatTime(current % 60),
          minute: formatTime(current / 60),
        },
        totalTime: {
          second: formatTime(duration % 60),
          minute: formatTime(duration / 60),
        },
      });
    };

    audio.ontimeupdate = handleTimeUpdate;
  
    // Nettoyage : retire le gestionnaire quand le composant se démonte
    return () => {
      audio.ontimeupdate = null;
    };
  }, [audioRef, volume]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setSpeed(position.coords.speed || 0); // Vitesse en m/s
          const tempo = speed > 2 ? "rapide" : "lent";
          const song = songsData.find((s) => s.desc.includes(tempo)) || songsData[0];
          setTrack(song);
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [speed]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track, setTrack,
    playStatus, setPlayStatus,
    time, setTime,
    play,pause,
    playWithId,playByQuery,
    previous,next,
    seekSong,
    volume,setVolume,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
