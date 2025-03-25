import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData } from '../assets/assets'

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
          <p></p>
        </div>
      </div>
    </>
  )
}

export default DisplayAlbum
