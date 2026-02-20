import React, { useContext, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  const albumData = albumsData[id];
  const { playWithId, songDurations, track, pause, play } = useContext(PlayerContext);

  // Filtrer les chansons de l'album
  const albumSongs = songsData.filter(song => song.album === albumData?.name);

  // Calculer les statistiques de l'album
  const totalSongs = albumSongs.length;
  
  // Calculer la durée totale
  const totalDuration = albumSongs.reduce((total, song) => {
    const duration = songDurations[song.id] || { totalSeconds: 0 };
    return total + (duration.totalSeconds || 0);
  }, 0);
  
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min ${remainingSeconds}s`;
  };

  // Compter les artistes uniques
  const uniqueArtists = [...new Set(albumSongs.map(song => song.artist))];
  
  // Année de sortie (simulée ou à prendre des données)
  const releaseYear = 2024;
  const recordLabel = "Spotify Records";
  
  // Likes simulés
  const likesCount = Math.floor(Math.random() * 1000000) + 500000;

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
      pause();
    } else {
      playWithId(songId);
    }
  };

  const handlePlayAlbum = () => {
    if (albumSongs.length > 0) {
      if (isPlaying) {
        pause();
      } else {
        playWithId(albumSongs[0].id);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <Navbar />
      
      {/* En-tête de l'album avec plus d'informations */}
      <div className="relative mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        {/* Cover de l'album avec badge */}
        <div className="relative group flex-shrink-0">
          <img 
            className="w-48 rounded shadow-2xl" 
            src={albumData?.image} 
            alt={albumData?.name} 
          />
          
          {/* Badge du nombre de titres sur la cover */}
          <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
            {totalSongs} titres
          </div>
          
          <button 
            onClick={handlePlayAlbum}
            className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:scale-105 transform"
          >
            <img 
              className="w-6 ml-0.5" 
              src={isPlaying ? assets.pause_icon : assets.play_icon} 
              alt="play" 
            />
          </button>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span className="uppercase tracking-wider">Album</span>
            <span>•</span>
            <span>{releaseYear}</span>
          </div>
          
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData?.name}
          </h2>
          
          {/* Description avec option "Voir plus" */}
          <div className="text-gray-300 mb-4">
            <p className={showFullDescription ? '' : 'line-clamp-2'}>
              {albumData?.desc || `Découvrez l'album ${albumData?.name} avec ${totalSongs} titres incontournables.`}
            </p>
            {albumData?.desc && albumData.desc.length > 100 && (
              <button 
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="text-sm text-gray-400 hover:text-white mt-1"
              >
                {showFullDescription ? 'Voir moins' : 'Voir plus'}
              </button>
            )}
          </div>
          
          {/* Informations détaillées */}
          <div className="space-y-2">
            {/* Artistes */}
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">Artistes:</span>
              <div className="flex flex-wrap gap-1">
                {uniqueArtists.map((artist, index) => (
                  <span key={index} className="text-white hover:underline cursor-pointer">
                    {artist}{index < uniqueArtists.length - 1 ? ',' : ''}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Statistiques */}
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2v20M12 2l4 4M12 2L8 6"/>
                </svg>
                <span className="text-gray-300">{formatDuration(totalDuration)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span className="text-gray-300">{likesCount.toLocaleString()} likes</span>
              </div>
              
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM8 12H6v-2h2v2zm10 0h-2v-2h2v2z"/>
                </svg>
                <span className="text-gray-300">{recordLabel}</span>
              </div>
            </div>
            
            {/* Badges et tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {albumData?.genre && (
                <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                  {albumData.genre}
                </span>
              )}
              <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                {totalSongs} titres
              </span>
              {uniqueArtists.length > 1 && (
                <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">
                  Collaboration
                </span>
              )}
            </div>
          </div>
          
          {/* Métadonnées Spotify */}
          <div className="flex items-center gap-2 mt-4 text-sm">
            <img
              className="w-5 h-5 rounded-full"
              src={assets.spotify_logo}
              alt="Spotify"
            />
            <span className="font-semibold">Spotify</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{totalSongs} titres</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{formatDuration(totalDuration)}</span>
          </div>
        </div>
      </div>

      {/* Barre d'actions */}
      <div className="flex items-center gap-6 mt-8">
        <button 
          onClick={handlePlayAlbum}
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
        >
          <img 
            className="w-7 ml-0.5" 
            src={isPlaying ? assets.pause_icon : assets.play_icon} 
            alt="play" 
          />
        </button>
        
        <button 
          onClick={handleLike}
          className="hover:scale-105 transition-transform"
        >
          <svg 
            className={`w-8 h-8 ${isLiked ? 'text-green-500' : 'text-gray-400 hover:text-white'}`} 
            fill={isLiked ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
        
        <button 
          onClick={handleFollow}
          className="hover:scale-105 transition-transform"
        >
          <svg 
            className={`w-8 h-8 ${isFollowing ? 'text-green-500' : 'text-gray-400 hover:text-white'}`} 
            fill={isFollowing ? 'currentColor' : 'none'} 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
        
        <button className="hover:scale-105 transition-transform">
          <svg className="w-8 h-8 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2zm3-5h8v2H8v-2zm0-4h8v2H8v-2zm0-4h8v2H8V8z"/>
          </svg>
        </button>
        
        <button className="hover:scale-105 transition-transform">
          <svg className="w-8 h-8 text-gray-400 hover:text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
          </svg>
        </button>
      </div>

      {/* En-têtes des colonnes */}
      <div className="grid grid-cols-[16px,4fr,2fr,1fr,1fr] gap-4 mt-8 mb-2 px-4 text-sm text-gray-400 border-b border-gray-800 pb-2">
        <div>#</div>
        <div>Titre</div>
        <div>Artiste</div>
        <div>Album</div>
        <div className="text-right">
          <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2v20M12 2l4 4M12 2L8 6"/>
          </svg>
        </div>
      </div>

      {/* Liste des chansons avec plus d'informations */}
      <div className="space-y-1">
        {albumSongs.map((item, index) => {
          const isCurrentSong = currentSongId === item.id;
          const duration = songDurations[item.id] || { minute: "0", second: "00" };
          
          return (
            <div
              key={item.id}
              onClick={() => handlePlaySong(item.id)}
              className={`grid grid-cols-[16px,4fr,2fr,1fr,1fr] gap-4 px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer group ${
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
                  {item.artist !== albumData?.artist && (
                    <p className="text-xs text-gray-500">feat. {item.artist}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-gray-400">
                {item.artist}
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

      {/* Section "Vous aimerez aussi" */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Vous aimerez aussi</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {albumsData
            .filter(album => album.id !== id && album.genre === albumData?.genre)
            .slice(0, 5)
            .map(album => (
              <div 
                key={album.id}
                onClick={() => navigate(`/album/${album.id}`)}
                className="min-w-[150px] cursor-pointer group"
              >
                <img 
                  src={album.image} 
                  alt={album.name}
                  className="w-full aspect-square rounded shadow-lg group-hover:shadow-xl transition-shadow"
                />
                <p className="font-semibold mt-2 truncate">{album.name}</p>
                <p className="text-sm text-gray-400 truncate">{album.artist}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Pied de page avec plus d'infos */}
      <div className="mt-8 text-sm text-gray-400 border-t border-gray-800 pt-4">
        <div className="flex justify-between items-center">
          <div>
            <p>Sortie le : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p className="mt-1">© {releaseYear} {recordLabel}</p>
          </div>
          <div className="text-right">
            <p>{totalSongs} titres • {formatDuration(totalDuration)}</p>
            <p className="mt-1">{likesCount.toLocaleString()} likes</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayAlbum;