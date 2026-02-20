import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPlaylists, setShowPlaylists] = useState(false);

  const playlists = [
    { id: 1, name: 'Mes favoris', songs: 23 },
    { id: 2, name: 'Workout', songs: 15 },
    { id: 3, name: 'Chill', songs: 18 },
  ];

  return (
    <div className='w-[25%] h-full bg-black p-2 flex-col gap-2 hidden lg:flex text-white'>
      {/* Menu principal */}
      <div className='bg-[#121212] rounded-lg p-4'>
        <div 
          onClick={() => navigate('/')}
          className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-[#1a1a1a] ${
            location.pathname === '/' ? 'text-white' : 'text-gray-400'
          }`}
        >
          <img className='w-6' src={assets.home_icon} alt="home" />
          <span className='font-semibold'>Accueil</span>
        </div>
        
        <div 
          onClick={() => navigate('/search')}
          className={`flex items-center gap-4 p-2 rounded cursor-pointer hover:bg-[#1a1a1a] ${
            location.pathname === '/search' ? 'text-white' : 'text-gray-400'
          }`}
        >
          <img className='w-6' src={assets.search_icon} alt="search" />
          <span className='font-semibold'>Rechercher</span>
        </div>
      </div>

      {/* Bibliothèque */}
      <div className='bg-[#121212] rounded-lg flex-1 overflow-hidden'>
        <div className='p-4 flex items-center justify-between'>
          <div className='flex items-center gap-3 cursor-pointer hover:text-white text-gray-400'>
            <img className='w-8' src={assets.stack_icon} alt="library" />
            <span className='font-semibold'>Bibliothèque</span>
          </div>
          <div className='flex items-center gap-3'>
            <button className='hover:bg-[#1a1a1a] p-2 rounded-full'>
              <img className='w-5' src={assets.plus_icon} alt="add" />
            </button>
            <button 
              onClick={() => setShowPlaylists(!showPlaylists)}
              className='hover:bg-[#1a1a1a] p-2 rounded-full'
            >
              <img 
                className={`w-5 transform transition-transform ${showPlaylists ? 'rotate-180' : ''}`} 
                src={assets.arrow_icon} 
                alt="toggle" 
              />
            </button>
          </div>
        </div>

        {/* Playlists */}
        <div className='overflow-y-auto h-[calc(100%-80px)] px-2'>
          {showPlaylists ? (
            playlists.map(playlist => (
              <div 
                key={playlist.id}
                onClick={() => navigate(`/playlist/${playlist.id}`)}
                className='p-3 hover:bg-[#1a1a1a] rounded cursor-pointer'
              >
                <p className='font-medium'>{playlist.name}</p>
                <p className='text-sm text-gray-400'>{playlist.songs} titres</p>
              </div>
            ))
          ) : (
            <>
              <div className='p-4 bg-[#242424] rounded-lg mb-4'>
                <h3 className='font-semibold mb-2'>Créez votre première playlist</h3>
                <p className='text-sm text-gray-400 mb-4'>
                  C'est facile, nous vous aiderons
                </p>
                <button className='px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform'>
                  Créer une playlist
                </button>
              </div>

              <div className='p-4 bg-[#242424] rounded-lg'>
                <h3 className='font-semibold mb-2'>Trouvons des podcasts</h3>
                <p className='text-sm text-gray-400 mb-4'>
                  Nous vous tiendrons au courant
                </p>
                <button className='px-4 py-2 bg-white text-black rounded-full text-sm font-semibold hover:scale-105 transition-transform'>
                  Parcourir les podcasts
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;