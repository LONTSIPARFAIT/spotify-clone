import React, { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";
import loadLRC from "../utils/parseLRC";

const LyricsPage = () => {
  const { track, time, play, pause, playStatus } = useContext(PlayerContext);
  const navigate = useNavigate();
  const lyricsRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [fontSize, setFontSize] = useState(18);
  const [showControls, setShowControls] = useState(false);

  // Charger les paroles
  useEffect(() => {
    const fetchLyrics = async () => {
      if (track?.lyricsFile) {
        const loadedLyrics = await loadLRC(track.lyricsFile);
        setLyrics(loadedLyrics);
      } else {
        // Paroles factices si aucun fichier
        setLyrics([
          { time: 0, text: "♪" },
          { time: 5, text: "Paroles non disponibles" },
          { time: 10, text: "Profitez de la musique !" },
        ]);
      }
    };
    fetchLyrics();
  }, [track]);

  const currentTimeInSeconds =
    parseInt(time.currentTime.minute) * 60 + parseInt(time.currentTime.second);

  // Faire défiler automatiquement
  useEffect(() => {
    const activeLine = document.querySelector(".lyric-line.active");
    if (activeLine && lyricsRef.current) {
      activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [currentTimeInSeconds]);

  // Trouver la ligne active
  const findActiveIndex = () => {
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTimeInSeconds >= lyrics[i].time) {
        return i;
      }
    }
    return -1;
  };

  const activeIndex = findActiveIndex();

  // Gérer le partage
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: track.name,
          text: `Écoute ${track.name} par ${track.artist}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Partage annulé');
      }
    }
  };

  if (!track?.name) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-4">Aucune chanson en cours de lecture</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-green-500 rounded-full hover:bg-green-600 transition"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Barre de navigation */}
      <div className="sticky top-0 z-10 bg-black bg-opacity-80 backdrop-blur-lg">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(prev => Math.min(prev + 2, 24))}
              className="p-2 hover:bg-gray-800 rounded-full transition"
              title="Augmenter la taille"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize(prev => Math.max(prev - 2, 14))}
              className="p-2 hover:bg-gray-800 rounded-full transition"
              title="Diminuer la taille"
            >
              A-
            </button>
            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-800 rounded-full transition"
              title="Partager"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Info chanson */}
        <div className="px-4 pb-4 flex items-center gap-4">
          <img 
            src={track.image} 
            alt={track.name}
            className="w-16 h-16 rounded-lg shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-xl font-bold">{track.name}</h1>
            <p className="text-gray-400">{track.artist}</p>
          </div>
          <button
            onClick={() => setShowControls(!showControls)}
            className="p-2 hover:bg-gray-800 rounded-full transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>

        {/* Contrôles rapides */}
        {showControls && (
          <div className="px-4 pb-4 flex items-center justify-center gap-4">
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 21l-6-4-6 4V5a2 2 0 012-2h8a2 2 0 012 2v16z"/>
              </svg>
            </button>
            <button
              onClick={playStatus ? pause : play}
              className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition"
            >
              <img 
                className="w-6" 
                src={playStatus ? assets.pause_icon : assets.play_icon} 
                alt={playStatus ? "pause" : "play"}
              />
            </button>
            <button className="p-2 hover:bg-gray-800 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Paroles */}
      <div 
        ref={lyricsRef}
        className="px-4 py-8 max-w-2xl mx-auto"
        style={{ fontSize: `${fontSize}px` }}
      >
        {lyrics.map((line, index) => (
          <p
            key={index}
            className={`lyric-line mb-6 transition-all duration-500 ${
              index === activeIndex
                ? "active text-green-400 font-bold scale-105"
                : index < activeIndex
                ? "text-gray-500"
                : "text-gray-300"
            }`}
            style={{
              transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)',
              transformOrigin: 'left'
            }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* Progression */}
      <div className="sticky bottom-0 bg-black bg-opacity-80 backdrop-blur-lg p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>{time.currentTime.minute}:{time.currentTime.second.toString().padStart(2, '0')}</span>
            <span>{time.totalTime.minute}:{time.totalTime.second.toString().padStart(2, '0')}</span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ 
                width: `${(currentTimeInSeconds / (parseInt(time.totalTime.minute) * 60 + parseInt(time.totalTime.second))) * 100 || 0}%` 
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LyricsPage;