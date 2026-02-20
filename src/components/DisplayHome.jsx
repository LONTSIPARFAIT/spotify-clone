import React from 'react'
import Navbar from './Navbar'
import { albumsData, songsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import SongItem from './SongItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      
      {/* Section Graphiques en vedette */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-slate-200 font-bold text-2xl">Graphiques en vedette</h1>
          <button className="text-sm text-gray-400 hover:text-white transition">
            Voir tout →
          </button>
        </div>
        <div className="flex overflow-auto gap-4 pb-2 scrollbar-hide">
          {albumsData.map((item, index) => (
            <AlbumItem 
              key={index} 
              image={item.image} 
              name={item.name} 
              desc={item.desc} 
              id={item.id} 
            />
          ))}
        </div>
      </div>

      {/* Section Les plus grands succès */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-slate-200 font-bold text-2xl">Les plus grands succès du jour</h1>
          <button className="text-sm text-gray-400 hover:text-white transition">
            Voir tout →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songsData.map((item, index) => (
            <SongItem 
              key={index} 
              image={item.image} 
              name={item.name} 
              artist={item.artist} 
              desc={item.desc} 
              id={item.id} 
            />
          ))}
        </div>
      </div>

      {/* Section Recommandé pour vous (optionnel) */}
      <div className="mb-8">
        <h1 className="text-slate-200 font-bold text-2xl mb-4">Recommandé pour vous</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {songsData.slice(0, 5).map((item, index) => (
            <SongItem 
              key={`rec-${index}`} 
              image={item.image} 
              name={item.name} 
              artist={item.artist} 
              desc={item.desc} 
              id={item.id} 
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default DisplayHome