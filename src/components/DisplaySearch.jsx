import React, { useState } from "react";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import Navbar from "./Navbar";

const DisplaySearch = () => {
  const [query, setQuery] = useState("");
  const filteredSongs = songsData.filter(
    (song) =>
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher une chanson..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 rounded bg-[#242424] text-white"
        />
        <div className="flex overflow-auto mt-4">
          {filteredSongs.map((song) => (
            <SongItem
              key={song.id}
              id={song.id}
              name={song.name}
              image={song.image}
              desc={song.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplaySearch;