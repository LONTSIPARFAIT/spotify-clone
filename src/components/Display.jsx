import React, { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import DisplayAlbum from './DisplayAlbum'
import { albumsData } from '../assets/assets'
import DisplaySearch from './DisplaySearch'
import LyricsPage from './LyricsPage'

const Display = () => {
  const displayRef = useRef()
  const location = useLocation()
  
  const isAlbum = location.pathname.includes('album')
  const albumId = isAlbum ? location.pathname.split('/').pop() : ""
  const bgColor = isAlbum && albumsData[albumId] ? albumsData[albumId].bgColor : "#121212"

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.style.background = isAlbum 
        ? `linear-gradient(${bgColor}, #121212)`
        : `#121212`
    }
  }, [isAlbum, bgColor]) // Ajout des dépendances

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />}/>
        <Route path="/album/:id" element={<DisplayAlbum />}/>
        <Route path="/search" element={<DisplaySearch />}/>
        <Route path="/playlist" element={<DisplaySearch />}/>
        <Route path="/lyrics" element={<LyricsPage />}/>
      </Routes>
    </div>
  )
}

export default Display