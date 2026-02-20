import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
  
  const albumData = albumsData[id];
  const { playWithId, songDurations, track } = useContext(PlayerContext);

  // Filtrer les chansons de l'album
  const albumSongs = songsData.filter(song => song.album === albumData?.name);

  // Calculer la durée totale de l'album
  const totalDuration = albumSongs.reduce((total, song) => {
    const duration = songDurations[song.id] || { minute: 0, second: 0 };
    return total + (parseInt(duration.minute) * 60 + parseInt(duration.second));
  }, 0);
  
  const hours = Math.floor(totalDuration / 3600);
  const minutes = Math.floor((totalDuration % 3600) / 60);
  const durationText = hours > 0 
    ? `${hours} hr ${minutes} min` 
    : `${minutes} min`;

  // Vérifier si la chanson en cours de lecture est dans cet album
  useEffect(() => {
    if (track && albumSongs.some(song => song.id === track.id)) {
      setIsPlaying(true);
      setCurrentSongId(track.id);
    } else {
      setIsPlaying(false);
      setCurrentSongId(null);
    }
  }, [track, albumSongs]);

  const handlePlaySong = (songId) => {
    if (currentSongId === songId && isPlaying) {
      // Mettre en pause (à implémenter dans le contexte)
      // pauseSong();
    } else {
      playWithId(songId);
    }
  };

  const formatDuration = (duration) => {
    return `${duration.minute}:${duration.second.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <Navbar />
      
      {/* En-tête de l'album */}
      <div className="relative mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <div className="relative group">
          <img 
            className="w-48 rounded shadow-2xl" 
            src={albumData?.image} 
            alt={albumData?.name} 
          />
          <button 
            onClick={() => albumSongs[0] && handlePlaySong(albumSongs[0].id)}
            className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform"
          >
            <img 
              className="w-6" 
              src={isPlaying ? assets.pause_icon : assets.play_icon} 
              alt="play" 
            />
          </button>
        </div>
        
        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wider">Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData?.name}
          </h2>
          <h4 className="text-gray-300">{albumData?.desc}</h4>
          
          <div className="flex items-center gap-2 mt-4 text-sm">
            <img
              className="w-5 h-5 rounded-full"
              src={assets.spotify_logo}
              alt="Spotify"
            />
            <span className="font-semibold">Spotify</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{albumSongs.length} titres</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{durationText}</span>
          </div>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={() => albumSongs[0] && handlePlaySong(albumSongs[0].id)}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <img 
            className="w-7" 
            src={isPlaying ? assets.pause_icon : assets.play_icon} 
            alt="play" 
          />
        </button>
        
        <button className="hover:scale-105 transition-transform">
          <svg className="w-8 h-8 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zm3-5h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V8z"/>
          </svg>
        </button>
        
        <button className="hover:scale-105 transition-transform">
          <svg className="w-8 h-8 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18 21l-6-4-6 4V5a2 2 0 012-2h8a2 2 0 012 2v16z"/>
          </svg>
        </button>
      </div>

      {/* En-têtes des colonnes */}
      <div className="grid grid-cols-[16px,4fr,2fr,1fr] gap-4 mt-8 mb-2 px-4 text-sm text-gray-400 border-b border-gray-800 pb-2">
        <div>#</div>
        <div>Titre</div>
        <div>Album</div>
        <div className="text-right">
          <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2v20M12 2l4 4M12 2L8 6"/>
          </svg>
        </div>
      </div>

      {/* Liste des chansons */}
      <div className="space-y-1">
        {albumSongs.map((item, index) => {
          const isCurrentSong = currentSongId === item.id;
          const duration = songDurations[item.id] || { minute: "0", second: "00" };
          
          return (
            <div
              key={item.id}
              onClick={() => handlePlaySong(item.id)}
              className={`grid grid-cols-[16px,4fr,2fr,1fr] gap-4 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer group ${
                isCurrentSong ? 'bg-gray-800 text-green-500' : ''
              }`}
            >
              <div className="flex items-center text-gray-400 group-hover:hidden">
                {index + 1}
              </div>
              <div className="hidden items-center group-hover:flex">
                <img 
                  className="w-4" 
                  src={isCurrentSong && isPlaying ? assets.pause_icon : assets.play_icon} 
                  alt="play" 
                />
              </div>
              
              <div className="flex items-center gap-3">
                <img 
                  className="w-10 h-10 rounded" 
                  src={item.image} 
                  alt={item.name} 
                />
                <div>
                  <p className={`font-medium ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-400">{item.artist}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-400">
                {albumData?.name}
              </div>
              
              <div className="flex items-center justify-end gap-4">
                <span className="text-gray-400">{formatDuration(duration)}</span>
                <button className="opacity-0 group-hover:opacity-100">
                  <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pied de page */}
      <div className="mt-8 text-sm text-gray-400 border-t border-gray-800 pt-4">
        <p>{new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className="mt-1">© 2024 Spotify AB</p>
      </div>
    </>
  );
};

export default DisplayAlbum;