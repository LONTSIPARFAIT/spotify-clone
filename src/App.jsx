import React from "react";
import Sidebar from "./components/Sidebar";

const App = () => {
  return (
    <div className="h-screen bg-black">
      <div className="h-[90%] flex">
        <Sidebar />
      </div>
      <PLayer />
    </div>
  );
};

export default App;
