import React from 'react'
import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-5">
        <h1 className="my-5 text-slate-200 font-bold text-2xl">Featured Charts</h1>  
        <div className="flex overflow-auto">
          {albumsData.map((item,index)=>(<AlbumItem key={index} image={item.image} name={item.name} desc={item.desc} id={item.id} />))}

        </div>
      </div>
    </>
  )
}

export default DisplayHome
