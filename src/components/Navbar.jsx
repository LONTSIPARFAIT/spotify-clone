import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { PlayerContext } from '../context/PlayerContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { playByQuery } = useContext(PlayerContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      playByQuery(searchQuery)
      setSearchQuery('')
      // Rediriger vers la page de recherche si on n'y est pas déjà
      if (location.pathname !== '/search') {
        navigate('/search')
      }
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate(-1)} 
            className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
            disabled={!location.key} // Désactivé s'il n'y a pas d'historique
          >
            <img className='w-4' src={assets.arrow_left} alt="Précédent" />
          </button>
          <button 
            onClick={() => navigate(1)} 
            className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center hover:bg-opacity-100 transition"
          >
            <img className='w-4' src={assets.arrow_right} alt="Suivant" />
          </button>
          
          {/* Barre de recherche - Version desktop */}
          <div className="hidden md:flex items-center bg-black bg-opacity-70 rounded-full px-4 py-1">
            <img className='w-4 mr-2 opacity-50' src={assets.search_icon} alt="" />
            <input
              type="text"
              placeholder="Dis-moi quoi jouer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="bg-transparent px-2 py-1 text-white placeholder-gray-400 focus:outline-none w-64"
            />
          </div>

          {/* Barre de recherche - Version mobile */}
          <div className="md:hidden relative">
            <button 
              onClick={() => setShowSearch(!showSearch)}
              className="w-8 h-8 bg-black bg-opacity-70 rounded-full flex items-center justify-center"
            >
              <img className='w-4' src={assets.search_icon} alt="Rechercher" />
            </button>
            {showSearch && (
              <div className="absolute top-10 left-0 bg-black bg-opacity-95 rounded-lg p-2 z-50 w-64">
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    handleSearch(e)
                    if (e.key === "Enter") setShowSearch(false)
                  }}
                  className="w-full bg-gray-800 px-3 py-2 rounded text-white focus:outline-none"
                  autoFocus
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className='bg-white text-black text-[15px] px-4 py-1 rounded-full hover:scale-105 transition hidden md:block'>
            Explorer Premium
          </button>
          <button className='bg-black border border-gray-700 py-1 px-3 rounded-full text-[15px] hover:border-white transition'>
            Installer l'app
          </button>
          <button className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center hover:scale-110 transition font-bold'>
            P
          </button>
        </div>
      </div>

      {/* Filtres de catégories */}
      <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => navigate('/')}
          className={`px-4 py-1 rounded-full whitespace-nowrap transition ${
            location.pathname === '/' 
              ? 'bg-white text-black' 
              : 'bg-black bg-opacity-70 text-white hover:bg-opacity-100'
          }`}
        >
          Tous
        </button>
        <button 
          onClick={() => navigate('/search?filter=music')}
          className="bg-black bg-opacity-70 px-4 py-1 rounded-full hover:bg-opacity-100 transition whitespace-nowrap"
        >
          Musique
        </button>
        <button 
          onClick={() => navigate('/search?filter=podcast')}
          className="bg-black bg-opacity-70 px-4 py-1 rounded-full hover:bg-opacity-100 transition whitespace-nowrap"
        >
          Podcasts
        </button>
        <button className="bg-black bg-opacity-70 px-4 py-1 rounded-full hover:bg-opacity-100 transition whitespace-nowrap">
          Classements
        </button>
        <button className="bg-black bg-opacity-70 px-4 py-1 rounded-full hover:bg-opacity-100 transition whitespace-nowrap">
          Nouveautés
        </button>
        <button className="bg-black bg-opacity-70 px-4 py-1 rounded-full hover:bg-opacity-100 transition whitespace-nowrap">
          Découvertes
        </button>
      </div>
    </>
  )
}

export default Navbar