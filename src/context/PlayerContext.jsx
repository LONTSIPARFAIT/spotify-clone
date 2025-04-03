import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(0);
  const [time, setTime] = useState({
    currentTime: { second: "00", minute: "0" },
    totalTime: { second: "00", minute: "0" },
  });
  const [songDurations, setSongDurations] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const recognition = useRef(null);


  const formatTime = (seconds) => String(Math.floor(seconds)).padStart(2, "0");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "fr-FR";

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setVoiceMessage(`Commande détectée : ${transcript}`);
        setTimeout(() => setVoiceMessage(""), 5000); // Efface le message après 3 secondes
        handleVoiceCommand(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale :", event.error);
        setVoiceMessage("Erreur de reconnaissance vocale");
        setTimeout(() => setVoiceMessage(""), 3000);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        setIsListening(false);
        setVoiceMessage("");
      };
    }
  }, []);

  const handleVoiceCommand = (command) => {
    if (command.includes("joue") || command.includes("play")) {
      if (command.includes("suivante") || command.includes("next")) {
        next();
      } else if (command.includes("précédente") || command.includes("previous")) {
        previous();
      } else {
        const query = command.replace("joue", "").replace("play", "").trim();
        playByQuery(query);
      }
    } else if (command.includes("pause")) {
      pause();
    } else if (command.includes("reprends") || command.includes("resume")) {
      play();
    }
  };

  const toggleVoiceRecognition = () => {
    if (!recognition.current) {
      setVoiceMessage("Reconnaissance vocale non prise en charge");
      setTimeout(() => setVoiceMessage(""), 3000);
      return;
    }

    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
      setVoiceMessage("Écoute en cours...");
    }
  };

// Charge les durées des chansons au démarrage
useEffect(() => {
  const loadDurations = async () => {
    const durations = {};
    for (const song of songsData) {
      const audio = new Audio(song.file);
      await new Promise((resolve) => {
        audio.onloadedmetadata = () => {
          durations[song.id] = {
            minute: formatTime(audio.duration / 60),
            second: formatTime(audio.duration % 60),
          };
          resolve();
        };
      });
    }
    setSongDurations(durations);
  };
  loadDurations();
}, []);

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
    song.desc.toLowerCase().includes(query.toLowerCase()) ||
    song.genre.toLowerCase().includes(query.toLowerCase())
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
          const genre = speed > 2 ? "Afrobeat" : speed > 1 ? "Pop" : "Gospel";
          const song = songsData.find((s) => s.desc.includes(tempo)) || songsData[0];
          const songs = songsData.find((s) => s.genre === genre) || songsData[0];
          setTrack(song,songs);
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
    songDurations,
    toggleVoiceRecognition,
    isListening,
    voiceMessage,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
