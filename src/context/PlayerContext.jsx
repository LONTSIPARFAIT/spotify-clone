import { createContext, useEffect, useRef, useState } from "react";
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
  const [track, setTrack] = useState(songsData[0]); // Chanson actuellement sélectionnée (par défaut, la première chanson)
  const [playStatus, setPlayStatus] = useState(false); // Statut de lecture (true = en lecture, false = en pause)
  const [volume, setVolume] = useState(0.5); // Volume initial à 50%
  const [speed, setSpeed] = useState(0); // Vitesse de l'utilisateur (utilisée pour la géolocalisation)
  const [time, setTime] = useState({
    currentTime: { second: "00", minute: "0" }, // Temps actuel de la chanson
    totalTime: { second: "00", minute: "0" }, // Durée totale de la chanson
  });
  const [songDurations, setSongDurations] = useState({}); // Durées des chansons (calculées dynamiquement)
  const [isListening, setIsListening] = useState(false); // État pour savoir si la reconnaissance vocale est active
  const [voiceMessage, setVoiceMessage] = useState(""); // Message affiché pour le feedback de la reconnaissance vocale
  const recognition = useRef(null); // Référence pour l'instance de SpeechRecognition

  // Fonction pour formater le temps (ex. 5 secondes -> "05")
  const formatTime = (seconds) => String(Math.floor(seconds)).padStart(2, "0");

  // Initialisation de la reconnaissance vocale
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = false; // Pas de reconnaissance continue
      recognition.current.interimResults = false; // Pas de résultats intermédiaires
      recognition.current.lang = "fr-FR"; // Langue française

      recognition.current.onstart = () => {
        console.log("Reconnaissance vocale démarrée");
        setIsListening(true);
        setVoiceMessage("Écoute en cours...");
      };

      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        console.log("Commande vocale détectée :", transcript);
        setVoiceMessage(`Commande détectée : ${transcript}`);
        setTimeout(() => setVoiceMessage(""), 5000);
        handleVoiceCommand(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error("Erreur de reconnaissance vocale :", event.error);
        setVoiceMessage(`Erreur : ${event.error}`);
        setTimeout(() => setVoiceMessage(""), 3000);
        setIsListening(false);
      };

      recognition.current.onend = () => {
        console.log("Reconnaissance vocale terminée");
        setIsListening(false);
        if (voiceMessage === "Écoute en cours...") {
          setVoiceMessage("");
        }
      };
    } else {
      console.warn("SpeechRecognition n'est pas pris en charge par ce navigateur.");
    }
  }, []);

  // Fonction pour gérer les commandes vocales
  const handleVoiceCommand = (command) => {
    console.log("Interprétation de la commande :", command);

    // Commandes pour jouer une chanson ou passer à la suivante/précédente
    if (command.includes("joue") || command.includes("play") || command.includes("jouer")) {
      console.log("Commande 'joue' détectée");
      if (command.includes("suivante") || command.includes("next") || command.includes("suivant")) {
        console.log("Passage à la chanson suivante");
        next();
      } else if (command.includes("précédente") || command.includes("previous") || command.includes("précédent")) {
        console.log("Passage à la chanson précédente");
        previous();
      } else {
        // Nettoyage de la requête pour enlever "joue", "play", "jouer", et "du " (ex. "joue du gospel" -> "gospel")
        let query = command
          .replace("joue", "")
          .replace("play", "")
          .replace("jouer", "")
          .replace("du ", "") // Ajouté pour gérer "joue du gospel"
          .trim();
        console.log("Recherche de la requête :", query);

        // Ajout : gestion des cas où la requête contient "de " (ex. "joue de la pop" -> "pop")
        query = query.replace("de la ", "").replace("de ", "");
        console.log("Requête nettoyée :", query); // Ajouté : log pour voir la requête après nettoyage

        playByQuery(query);
      }
    }
    // Commande pour mettre en pause
    else if (command.includes("pause") || command.includes("stop")) {
      console.log("Commande 'pause' détectée");
      pause();
    }
    // Commande pour reprendre la lecture
    else if (command.includes("reprends") || command.includes("resume") || command.includes("continue")) {
      console.log("Commande 'reprends' détectée");
      play();
    }
    // Ajout : gestion des cas où la commande n'est pas reconnue
    else {
      console.log("Commande non reconnue :", command);
      setVoiceMessage("Commande non reconnue");
      setTimeout(() => setVoiceMessage(""), 3000);
    }
  };

  // Fonction pour activer/désactiver la reconnaissance vocale
  const toggleVoiceRecognition = () => {
    if (!recognition.current) {
      console.warn("Reconnaissance vocale non prise en charge");
      setVoiceMessage("Reconnaissance vocale non prise en charge");
      setTimeout(() => setVoiceMessage(""), 3000);
      return;
    }

    if (isListening) {
      recognition.current.stop();
    } else {
      try {
        recognition.current.start();
      } catch (error) {
        console.error("Erreur lors du démarrage de la reconnaissance vocale :", error);
        setVoiceMessage("Erreur lors du démarrage de la reconnaissance");
        setTimeout(() => setVoiceMessage(""), 3000);
      }
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

  // Fonction pour démarrer la lecture
  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  // Fonction pour mettre en pause
  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  // Fonction pour jouer une chanson spécifique par ID
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

  // Fonction pour jouer une chanson en fonction d'une requête (ex. "joue du gospel")
  const playByQuery = async (query) => {
    console.log("Recherche dans songsData avec la requête :", query);
    const match = songsData.find((song) => {
      const nameMatch = song.name.toLowerCase().includes(query.toLowerCase());
      const descMatch = song.desc.toLowerCase().includes(query.toLowerCase());
      // Modification : ajout d'une vérification pour éviter une erreur si song.genre est undefined
      const genreMatch = song.genre && song.genre.toLowerCase().includes(query.toLowerCase());
      console.log(`Chanson : ${song.name}, nameMatch: ${nameMatch}, descMatch: ${descMatch}, genreMatch: ${genreMatch}`);
      return nameMatch || descMatch || genreMatch;
    });

    if (match) {
      console.log("Chanson trouvée :", match.name);
      await setTrack(match);
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (error) {
        console.error("Erreur lors de la lecture :", error);
        setVoiceMessage("Erreur lors de la lecture");
        setTimeout(() => setVoiceMessage(""), 3000);
      }
    } else {
      console.log("Aucune chanson trouvée pour la requête :", query);
      setVoiceMessage("Aucune chanson trouvée");
      setTimeout(() => setVoiceMessage(""), 3000);
    }
  };

  // Fonction pour passer à la chanson précédente
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Fonction pour passer à la chanson suivante
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  // Fonction pour avancer ou reculer dans la chanson en cliquant sur la barre de progression
  const seekSong = async (e) => {
    audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
    console.log(e);
  };

  // Gestion de la mise à jour du temps de lecture
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

    return () => {
      audio.ontimeupdate = null;
    };
  }, [audioRef, volume]);

  // Gestion de la géolocalisation pour adapter la musique à la vitesse de l'utilisateur
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setSpeed(position.coords.speed || 0);
          const genre = speed > 2 ? "Afrobeat" : speed > 1 ? "Pop" : "Gospel";
          const song = songsData.find((s) => s.genre === genre) || songsData[0];
          // Modification : correction de l'appel à setTrack (un seul argument)
          setTrack(song); // Avant : setTrack(song, songs) causait une erreur
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [speed]);

  // Valeurs partagées via le contexte
  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    playByQuery,
    previous,
    next,
    seekSong,
    volume,
    setVolume,
    songDurations,
    toggleVoiceRecognition,
    isListening,
    voiceMessage,
  };

  // Fournit le contexte aux composants enfants
  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;


// const song = songsData.find((s) => s.desc.includes(tempo)) || songsData[0];
// const songs = songsData.find((s) => s.genre === genre) || songsData[0];
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