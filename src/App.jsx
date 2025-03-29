import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";

const App = () => {

  const {audioRef} = useContext(Pla)

  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
        <Display />
      </div>
      <Player />
      <audio preload="auto" src=""></audio>
    </div>
  );
};

export default App;
