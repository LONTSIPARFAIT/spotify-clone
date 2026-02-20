import React, { useContext, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext)

  // Gestion des erreurs audio
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.onerror = () => {
        console.error("Erreur de chargement audio");
      };
    }
  }, [audioRef]);

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      {track?.file && (
        <audio 
          ref={audioRef} 
          src={track.file} 
          preload="auto" 
          onError={(e) => console.error("Erreur audio:", e)}
        />
      )}
    </div>
  );
};

export default App;