import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData } from '../assets/assets'

const DisplayAlbum = () => {

  const {id} = useParams()
  // console.log(id);

  const albumData = albumsData.find(item=>item.id === id)
  

  return (
    <>
      <Navbar />
      dfd
    </>
  )
}

export default DisplayAlbum
