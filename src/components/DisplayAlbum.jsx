import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'

const DisplayAlbum = () => {

  const {id} = useParams()
  // console.log(id);

  const albumData = albumsData[id]
  // console.log(albumData);
  

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p className=''>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'> {albumData.name} </h2>
          <h4 className=''>{albumData.desc}</h4>
          <p className="mt-1">
            <img className='inline-block w-5 ' src={assets.spotify_logo} alt="" />
            <b>Spotify </b>
            . 1,323,154 likes 
            . <b>50 songs, </b>
            about 3 hr 25 min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p className=""><b className='mr-4'>#</b>Titre</p>
        <p className="">Album</p>
        <p className="hidden sm:block ">Date d'Ajout</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {
        songsData.map((item, index) => {
          <div key={index} className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:text-[#ffffff2b] cursor-pointer">
             <p className="text-white">
              <b className='mr-4 text-[#a7a7a7]'> {index + 1} </b>
              <img src="" alt="" />
             </p>
          </div>
        })
      }
    </>
  )
}

export default DisplayAlbum
