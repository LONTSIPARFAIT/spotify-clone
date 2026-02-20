import React, { useState, useEffect } from "react";
import { songsData, albumsData } from "../assets/assets";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";

const DisplaySearch = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, songs, albums, artists
  const [recentSearches, setRecentSearches] = useState([]);

  // Charger les recherches récentes depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Filtrer les chansons
  const filteredSongs = songsData.filter(
    (song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase()) ||
      song.genre.toLowerCase().includes(query.toLowerCase())
  );

  // Filtrer les albums
  const filteredAlbums = albumsData.filter(
    (album) =>
      album.name.toLowerCase().includes(query.toLowerCase()) ||
      album.desc.toLowerCase().includes(query.toLowerCase())
  );

  // Extraire les artistes uniques
  const artists = [...new Set(songsData.map(song => song.artist))];
  const filteredArtists = artists.filter(artist =>
    artist.toLowerCase().includes(query.toLowerCase())
  );

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.trim() && !recentSearches.includes(searchTerm)) {
      const updated = [searchTerm, ...recentSearches].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <>
      <Navbar />
      
      <div className="p-4">
        {/* Barre de recherche */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Rechercher des chansons, albums ou artistes..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-4 pl-12 rounded-full bg-[#242424] text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <svg 
            className="absolute left-4 top-4 w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Recherches récentes */}
        {!query && recentSearches.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Recherches récentes</h2>
              <button 
                onClick={clearRecentSearches}
                className="text-sm text-gray-400 hover:text-white"
              >
                Effacer tout
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(search)}
                  className="px-4 py-2 bg-[#242424] rounded-full hover:bg-[#3a3a3a] transition"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Onglets de catégories */}
        {query && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['all', 'songs', 'albums', 'artists'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  activeTab === tab
                    ? 'bg-white text-black'
                    : 'bg-[#242424] text-white hover:bg-[#3a3a3a]'
                }`}
              >
                {tab === 'all' && 'Tous'}
                {tab === 'songs' && 'Chansons'}
                {tab === 'albums' && 'Albums'}
                {tab === 'artists' && 'Artistes'}
              </button>
            ))}
          </div>
        )}

        {/* Résultats */}
        {query && (
          <div className="space-y-8">
            {/* Chansons */}
            {(activeTab === 'all' || activeTab === 'songs') && filteredSongs.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Chansons</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredSongs.slice(0, activeTab === 'all' ? 5 : undefined).map((song) => (
                    <SongItem
                      key={song.id}
                      id={song.id}
                      name={song.name}
                      image={song.image}
                      artist={song.artist}
                      desc={song.desc}
                    />
                  ))}
                </div>
                {activeTab === 'all' && filteredSongs.length > 5 && (
                  <button 
                    onClick={() => setActiveTab('songs')}
                    className="mt-2 text-sm text-gray-400 hover:text-white"
                  >
                    Voir toutes les {filteredSongs.length} chansons →
                  </button>
                )}
              </div>
            )}

            {/* Albums */}
            {(activeTab === 'all' || activeTab === 'albums') && filteredAlbums.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Albums</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredAlbums.slice(0, activeTab === 'all' ? 5 : undefined).map((album) => (
                    <AlbumItem
                      key={album.id}
                      id={album.id}
                      name={album.name}
                      image={album.image}
                      desc={album.desc}
                    />
                  ))}
                </div>
                {activeTab === 'all' && filteredAlbums.length > 5 && (
                  <button 
                    onClick={() => setActiveTab('albums')}
                    className="mt-2 text-sm text-gray-400 hover:text-white"
                  >
                    Voir tous les {filteredAlbums.length} albums →
                  </button>
                )}
              </div>
            )}

            {/* Artistes */}
            {(activeTab === 'all' || activeTab === 'artists') && filteredArtists.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-4">Artistes</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredArtists.slice(0, activeTab === 'all' ? 5 : undefined).map((artist, index) => (
                    <div 
                      key={index}
                      className="bg-[#242424] p-4 rounded-lg hover:bg-[#3a3a3a] cursor-pointer"
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-2" />
                      <h3 className="font-semibold text-center">{artist}</h3>
                      <p className="text-sm text-gray-400 text-center">Artiste</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Aucun résultat */}
            {filteredSongs.length === 0 && filteredAlbums.length === 0 && filteredArtists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">Aucun résultat trouvé pour "{query}"</p>
                <p className="text-sm text-gray-500 mt-2">Essayez avec d'autres mots-clés</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DisplaySearch;