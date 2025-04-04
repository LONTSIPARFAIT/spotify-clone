import React, { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import loadLRC from "../utils/parseLRC";

const LyricsPage = () => {
  const { track, time } = useContext(PlayerContext);
  const navigate = useNavigate();
  const lyricsRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);

  // Charger les paroles depuis le fichier .lrc
  useEffect(() => {
    const fetchLyrics = async () => {
      if (track.lyricsFile) {
        const loadedLyrics = await loadLRC(track.lyricsFile);
        setLyrics(loadedLyrics);
      } else {
        setLyrics([]);
      }
    };
    fetchLyrics();
  }, [track]);

  // Calculer le temps actuel en secondes
  const currentTimeInSeconds =
    parseInt(time.currentTime.minute) * 60 + parseInt(time.currentTime.second);

  // Faire défiler automatiquement vers la ligne active
  useEffect(() => {
    const activeLine = document.querySelector(".lyric-line.active");
    if (activeLine && lyricsRef.current) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTimeInSeconds]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 animate-gradient">
      {/* Bouton pour revenir en arrière */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition-colors duration-300"
      >
        Retour
      </button>

      {/* Titre de la chanson */}
      <h1 className="text-4xl font-bold mb-2 font-poppins">{track.name}</h1>
      <h2 className="text-xl mb-6 font-poppins text-gray-400">
        Par {track.artist}
      </h2>

      {/* Affichage des paroles */}
      <div
        ref={lyricsRef}
        className="bg-gray-800 bg-opacity-80 p-6 rounded-lg max-h-[60vh] overflow-y-auto shadow-lg"
      >
        {lyrics.length > 0 ? (
          lyrics.map((line, index) => {
            const isActive =
              currentTimeInSeconds >= line.time &&
              (index === lyrics.length - 1 ||
                currentTimeInSeconds < lyrics[index + 1].time);
            return (
              <p
                key={index}
                className={`lyric-line text-lg mb-4 font-poppins transition-all duration-500 ${
                  isActive
                    ? "active text-green-400 font-bold scale-105"
                    : "text-gray-400"
                }`}
              >
                {line.text}
              </p>
            );
          })
        ) : (
          <p className="text-lg font-poppins text-gray-400">
            Paroles non disponibles
          </p>
        )}
      </div>
    </div>
  );
};

export default LyricsPage;
