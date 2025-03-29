import { createContext, useRef } from "react";

const PlayerContext = createContext();

export const PlayerContextProvider = (props) => {

  const audioRef = useRef()

  const contextValue = {
    audioRef
  }

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  )

}

export default PlayerContextProvider;