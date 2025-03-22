import React from 'react'
import {assets} from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[25%] h-full p-2 flex-col gap-2 hidden lg:flex text-white'>
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
            <img src={assets.home_icon} alt="" />
            <div className="font-bold">Home</div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
