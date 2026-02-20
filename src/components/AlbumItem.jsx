import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const AlbumItem = ({ image, name, desc, id }) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      onClick={() => navigate(`/album/${id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative min-w-[180px] p-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-300"
    >
      <div className="relative">
        <img 
          className="rounded shadow-lg group-hover:shadow-xl transition-all duration-300" 
          src={image} 
          alt={name} 
        />
        
        {/* Overlay avec bouton play */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 rounded flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
            <img className="w-6" src={assets.play_icon} alt="play" />
          </button>
        </div>
      </div>

      <div className="mt-3">
        <p className="font-bold text-white truncate">{name}</p>
        <p className="text-gray-400 text-sm truncate">{desc || 'Album'}</p>
        <p className="text-gray-500 text-xs mt-1">
          {Math.floor(Math.random() * 20) + 5} titres
        </p>
      </div>
    </div>
  )
}

export default AlbumItem