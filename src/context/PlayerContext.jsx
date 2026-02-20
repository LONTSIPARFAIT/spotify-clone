import { createContext, useEffect, useRef, useState, useCallback } from "react";
import { songsData } from "../assets/assets";

// Création du contexte pour partager les états et fonctions entre les composants
export const PlayerContext = createContext();

// Composant fournisseur du contexte
const PlayerContextProvider = (props) => {
  // Références pour les éléments audio et la barre de progression
  const audioRef = useRef(); // Référence pour l'élément audio HTML
  const seekBg = useRef(); // Référence pour le fond de la barre de progression
  const seekBar = useRef(); // Référence pour la barre de progression elle-même

  // États pour gérer le lecteur
  const [track, setTrack] = useState(songsData[0]); // Chanson actuellement sélectionnée
  const [playStatus, setPlayStatus] = useState(false); // État de lecture
  const [volume, setVolume] = useState(() => {
    // Récupérer le volume sauvegardé
    const savedVolume = localStorage.getItem('playerVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.5;
  });
  const [speed, setSpeed] = useState(0); // Vitesse de l'utilisateur
  const [time, setTime] = useState({
    currentTime: { second: "00", minute: "0", totalSeconds: 0 },
    totalTime: { second: "00", minute: "0", totalSeconds: 0 },
  });
  const [songDurations, setSongDurations] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState("");
  const [repeatMode, setRepeatMode] = useState('none'); // 'none', 'all', 'one'
  const [isShuffling, setIsShuffling] = useState(false);
  const [queue, setQueue] = useState([]); // File d'attente
  const [history, setHistory] = useState([]); // Historique des chansons jouées
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const recognition = useRef(null);
  const animationFrameRef = useRef(null);

  // Fonction pour formater le temps
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return {
      minute: mins.toString(),
      second: secs.toString().padStart(2, "0"),
      totalSeconds: seconds
    };
  };

  // Sauvegarder le volume dans localStorage
  useEffect(() => {
    localStorage.setItem('playerVolume', volume.toString());
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false;
      recognition.current.interimResults = false;
      recognition.current.lang = "fr-FR";

      recognition.current.onstart = () => {
        console.log("Reconnaissance vocale démarrée");
        setIsListening(true);
        setVoiceMessage("🎤 Écoute en cours...");
        setTimeout(() => setVoiceMessage(""), 2000);
      };

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Commande vocale détectée :", transcript);
        setVoiceMessage(`🎤 "${transcript}"`);
        setTimeout(() => setVoiceMessage(""), 3000);
        handleVoiceCommand(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale :", event.error);
        setVoiceMessage(`❌ Erreur : ${event.error}`);
        setTimeout(() => setVoiceMessage(""), 3000);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        console.log("Reconnaissance vocale terminée");
        setIsListening(false);
      };
    } else {
      console.warn("SpeechRecognition n'est pas pris en charge par ce navigateur.");
    }

    return () => {
      if (recognition.current) {
        recognition.current.abort();
      }
    };
  }, []);

  // Fonction pour gérer les commandes vocales améliorée
  const handleVoiceCommand = (command) => {
    console.log("Interprétation de la commande :", command);

    // Commande pour jouer/pause
    if (command.includes("pause") || command.includes("stop")) {
      pause();
      setVoiceMessage("⏸️ Pause");
      setTimeout(() => setVoiceMessage(""), 2000);
      return;
    }

    if (command.includes("play") || command.includes("joue") || command.includes("reprends")) {
      if (command.includes("joue") || command.includes("play")) {
        let query = command
          .replace("joue", "")
          .replace("play", "")
          .replace("jouer", "")
          .replace("du ", "")
          .replace("la ", "")
          .replace("le ", "")
          .trim();
        
        if (query) {
          playByQuery(query);
        } else {
          play();
          setVoiceMessage("▶️ Lecture reprise");
          setTimeout(() => setVoiceMessage(""), 2000);
        }
      } else {
        play();
        setVoiceMessage("▶️ Lecture reprise");
        setTimeout(() => setVoiceMessage(""), 2000);
      }
      return;
    }

    // Commandes de navigation
    if (command.includes("suivante") || command.includes("next")) {
      next();
      setVoiceMessage("⏭️ Chanson suivante");
      setTimeout(() => setVoiceMessage(""), 2000);
      return;
    }

    if (command.includes("précédente") || command.includes("previous")) {
      previous();
      setVoiceMessage("⏮️ Chanson précédente");
      setTimeout(() => setVoiceMessage(""), 2000);
      return;
    }

    // Commande pour le volume
    if (command.includes("volume") || command.includes("volumes")) {
      const match = command.match(/(\d+)/);
      if (match) {
        const newVolume = Math.min(100, parseInt(match[0])) / 100;
        setVolume(newVolume);
        setVoiceMessage(`🔊 Volume à ${Math.round(newVolume * 100)}%`);
      } else if (command.includes("monte") || command.includes("augmente")) {
        setVolume(prev => Math.min(1, prev + 0.1));
        setVoiceMessage(`🔊 Volume à ${Math.round((volume + 0.1) * 100)}%`);
      } else if (command.includes("baisse") || command.includes("diminue")) {
        setVolume(prev => Math.max(0, prev - 0.1));
        setVoiceMessage(`🔊 Volume à ${Math.round((volume - 0.1) * 100)}%`);
      }
      setTimeout(() => setVoiceMessage(""), 2000);
      return;
    }

    // Commande pour les paroles
    if (command.includes("paroles") || command.includes("lyrics")) {
      window.location.href = '/lyrics';
      return;
    }

    setVoiceMessage("❓ Commande non reconnue");
    setTimeout(() => setVoiceMessage(""), 2000);
  };

  const toggleVoiceRecognition = useCallback(() => {
    if (!recognition.current) {
      setVoiceMessage("🎤 Non supporté");
      setTimeout(() => setVoiceMessage(""), 2000);
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      try {
        recognition.current.start();
      } catch (error) {
        console.error("Erreur de démarrage:", error);
      }
    }
  }, [isListening]);

  // Charge les durées des chansons de façon optimisée
  useEffect(() => {
    const loadDurations = async () => {
      const durations = {};
      const promises = songsData.map((song) => {
        return new Promise((resolve) => {
          const audio = new Audio(song.file);
          audio.onloadedmetadata = () => {
            durations[song.id] = {
              minute: Math.floor(audio.duration / 60).toString(),
              second: Math.floor(audio.duration % 60).toString().padStart(2, "0"),
              totalSeconds: audio.duration
            };
            resolve();
          };
          audio.onerror = () => resolve(); // Ignorer les erreurs
        });
      });
      await Promise.all(promises);
      setSongDurations(durations);
    };
    loadDurations();
  }, []);

  // Fonctions de lecture améliorées
  const play = useCallback(async () => {
    try {
      await audioRef.current?.play();
      setPlayStatus(true);
      setError(null);
    } catch (error) {
      console.error("Erreur de lecture:", error);
      setError("Impossible de lire la chanson");
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlayStatus(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (playStatus) {
      pause();
    } else {
      play();
    }
  }, [playStatus, play, pause]);

  const playWithId = useCallback(async (id) => {
    if (!songsData[id]) {
      setError("Chanson introuvable");
      return;
    }

    setIsLoading(true);
    try {
      // Ajouter à l'historique
      setHistory(prev => [track, ...prev].slice(0, 50));
      
      await setTrack(songsData[id]);
      
      // Petite pause pour permettre au src de se mettre à jour
      await new Promise(resolve => setTimeout(resolve, 50));
      
      await audioRef.current?.play();
      setPlayStatus(true);
      setError(null);
      
      // Ajouter à la file d'attente si nécessaire
      if (isShuffling) {
        // Logique de shuffle
      }
    } catch (error) {
      console.error("Erreur lors de la lecture:", error);
      setError("Erreur de lecture");
    } finally {
      setIsLoading(false);
    }
  }, [track, isShuffling]);

  const playByQuery = useCallback(async (query) => {
    console.log("Recherche:", query);
    
    const match = songsData.find((song) => {
      const searchTerms = query.toLowerCase().split(' ');
      const songText = `${song.name} ${song.artist} ${song.genre} ${song.desc}`.toLowerCase();
      return searchTerms.some(term => songText.includes(term));
    });

    if (match) {
      setVoiceMessage(`✅ ${match.name}`);
      setTimeout(() => setVoiceMessage(""), 2000);
      await playWithId(match.id);
    } else {
      setVoiceMessage("❌ Chanson non trouvée");
      setTimeout(() => setVoiceMessage(""), 2000);
    }
  }, [playWithId]);

  const previous = useCallback(async () => {
    if (track.id > 0) {
      setIsLoading(true);
      await setTrack(songsData[track.id - 1]);
      await new Promise(resolve => setTimeout(resolve, 50));
      await audioRef.current?.play();
      setPlayStatus(true);
      setIsLoading(false);
    } else {
      setVoiceMessage("📌 Première chanson");
      setTimeout(() => setVoiceMessage(""), 2000);
    }
  }, [track]);

  const next = useCallback(async () => {
    if (track.id < songsData.length - 1) {
      setIsLoading(true);
      await setTrack(songsData[track.id + 1]);
      await new Promise(resolve => setTimeout(resolve, 50));
      await audioRef.current?.play();
      setPlayStatus(true);
      setIsLoading(false);
    } else {
      if (repeatMode === 'all') {
        await setTrack(songsData[0]);
        await audioRef.current?.play();
        setPlayStatus(true);
      } else {
        setVoiceMessage("📌 Dernière chanson");
        setTimeout(() => setVoiceMessage(""), 2000);
      }
    }
  }, [track, repeatMode]);

  const seekSong = useCallback((e) => {
    if (!audioRef.current || !seekBg.current) return;
    
    const rect = seekBg.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, x / width));
    
    audioRef.current.currentTime = percentage * audioRef.current.duration;
  }, []);

  // Gestion de la fin de la chanson
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0;
        audio.play();
      } else if (repeatMode === 'all' || track.id < songsData.length - 1) {
        next();
      } else {
        setPlayStatus(false);
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [track, repeatMode, next]);

  // Gestion du temps avec requestAnimationFrame pour plus de fluidité
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (audio.duration) {
        const current = audio.currentTime;
        const duration = audio.duration;
        
        seekBar.current.style.width = `${(current / duration) * 100}%`;
        
        setTime({
          currentTime: formatTime(current),
          totalTime: formatTime(duration),
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(updateTime);
    };

    audio.addEventListener('play', () => {
      animationFrameRef.current = requestAnimationFrame(updateTime);
    });

    audio.addEventListener('pause', () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Gestion de la géolocalisation optimisée
  useEffect(() => {
    if (!navigator.geolocation) return;

    let watchId;
    
    const handlePosition = (position) => {
      const newSpeed = position.coords.speed || 0;
      setSpeed(newSpeed);
      
      // Adapter le genre selon la vitesse
      if (Math.abs(newSpeed - speed) > 0.5) { // Seulement si changement significatif
        let genre;
        if (newSpeed > 5) genre = "Dance";
        else if (newSpeed > 2) genre = "Afrobeat";
        else if (newSpeed > 1) genre = "Pop";
        else genre = "Gospel";
        
        const song = songsData.find(s => s.genre === genre);
        if (song && song.id !== track.id) {
          // Ne pas changer brutalement, suggérer plutôt
          setVoiceMessage(`🏃‍♂️ Rythme ${genre} suggéré`);
          setTimeout(() => setVoiceMessage(""), 3000);
        }
      }
    };

    watchId = navigator.geolocation.watchPosition(
      handlePosition,
      (error) => console.error("Erreur GPS:", error),
      { enableHighAccuracy: true, maximumAge: 30000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [speed, track]);

  // Valeurs partagées via le contexte
  const contextValue = {
    // États
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    volume,
    setVolume,
    songDurations,
    isListening,
    voiceMessage,
    repeatMode,
    setRepeatMode,
    isShuffling,
    setIsShuffling,
    queue,
    history,
    isLoading,
    error,
    
    // Fonctions
    play,
    pause,
    togglePlay,
    playWithId,
    playByQuery,
    previous,
    next,
    seekSong,
    toggleVoiceRecognition,
    
    // Utilitaires
    formatTime,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;