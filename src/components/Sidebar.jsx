import React from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  
  const navigate = useNavigate()

  return (
    <div className='w-[25%] h-full bg-[#1b1b1b] p-2 flex-col gap-2 hidden lg:flex text-white'>
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div onClick={} className="flex items-center pt-2 gap-3 pl-8 cursor-pointer">
            <img className='w-6' src={assets.home_icon} alt="" />
            <div className="font-bold">Home</div>
        </div>
        <div className="flex items-center pt-2 gap-3 pl-8 cursor-pointer">
            <img className='w-6' src={assets.search_icon} alt="" />
            <div className="font-bold">Search</div>
        </div>
        <div className="bg-[#121212] h-[85%] rounded">
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img className='w-8' src={assets.stack_icon} alt="" />
                    <div className="font-semibold">Votre Bibliothèque</div>
                </div>
                <div className="flex items-center gap-3">
                    <img className='w-5' src={assets.arrow_icon} alt="" />
                    <img className='w-5' src={assets.plus_icon} alt="" />
                </div>
            </div>
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                <h1>Créez votre première playlist</h1>
                {/* <h1>Create your first playlist</h1> */}
                <p className='font-light'>c'est facile, nous vous aiderons</p>
                {/* <p>it's easy we will help you</p> */}
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>Creer La PlayList</button>
            </div>
            <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
                <h1>Trouvons quelques podcasts à suivre</h1>
                <p className='font-light'>nous vous tiendrons au courant des nouveaux épisodes</p>
                <button className='px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer'>Parcourir le podcast</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
