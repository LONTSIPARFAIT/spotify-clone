import React from 'react'
import { songsData } from '../assets/assets'

const Player = () => {
  return (
    <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
      <div className="hidden lg:flex items-center gap-4">
        <img src={songsData[0].image} alt="" />
      </div>
    </div>
  )
}

export default Player
