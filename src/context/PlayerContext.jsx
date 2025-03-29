import { createContext, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

  const audioRef = useRef()
  const seekBg = useRef()
  const seekBar = useRef()

  const [track,setTrack] = useState

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )

}


export default PlayerContextProvider;