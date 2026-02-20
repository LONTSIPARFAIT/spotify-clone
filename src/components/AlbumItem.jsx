import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets, songsData } from '../assets/assets'
import { PlayerContext } from '../context/PlayerContext'

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const { playWithId } = useContext(PlayerContext)

  // Compter le nombre réel de chansons dans cet album
  const albumSongsCount = songsData.filter(song => song.album === name).length
  
  // Trouver la première chanson de l'album pour la lecture
  const firstSong = songsData.find(song => song.album === name)

  // Obtenir l'année de sortie (simulée ou à partir des données)
  const releaseYear = 2024 // Idéalement, à prendre depuis les données de l'album

  const handlePlayAlbum = (e) => {
    e.stopPropagation() // Empêcher la navigation
    if (firstSong) {
      playWithId(firstSong.id)
    }
  }

  return (
    <div 
      onClick={() => navigate(`/album/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-300"
    >
      <div className="relative">
        <img 
          className="rounded shadow-lg group-hover:shadow-xl transition-all duration-300 w-full aspect-square object-cover" 
          src={image} 
          alt={name} 
        />
        
        {/* Overlay avec bouton play */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button 
            onClick={handlePlayAlbum}
            className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <img className="w-6 ml-0.5" src={assets.play_icon} alt="play" />
          </button>
        </div>

        {/* Badge du nombre de titres (optionnel) */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-xs text-white px-2 py-1 rounded-full">
          {albumSongsCount} titres
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold text-white truncate">{name}</p>
        <p className="text-gray-400 text-sm truncate">{desc || 'Album'}</p>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
          <span>{releaseYear}</span>
          <span>•</span>
          <span>{albumSongsCount} titres</span>
        </div>
      </div>
    </div>
  )
}

export default AlbumItem