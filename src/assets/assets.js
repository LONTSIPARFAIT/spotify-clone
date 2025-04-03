import bell_icon from "./bell.png";
import home_icon from "./home.png";
import like_icon from "./like.png";
import loop_icon from "./loop.png";
import mic_icon from "./mic.png";
import next_icon from "./next.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import plays_icon from "./plays.png";
import prev_icon from "./prev.png";
import search_icon from "./search.png";
import shuffle_icon from "./shuffle.png";
import speaker_icon from "./speaker.png";
import stack_icon from "./stack.png";
import zoom_icon from "./zoom.png";
import plus_icon from "./plus.png";
import arrow_icon from "./arrow.png";
import mini_player_icon from "./mini-player.png";
import queue_icon from "./queue.png";
import volume_icon from "./volume.png";
import arrow_right from "./right_arrow.png";
import arrow_left from "./left_arrow.png";
import spotify_logo from "./spotify_logo.png";
import clock_icon from "./clock_icon.png";
import img1 from "./img1.jpg";
import img2 from "./img2.jpg";
import img3 from "./img3.jpg";
import img4 from "./img4.jpg";
import img5 from "./img5.jpg";
import img6 from "./img6.jpg";
import img7 from "./img7.jpg";
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";
import img10 from "./img10.jpg";
import img11 from "./img11.jpg";
import img12 from "./img12.jpg";
// import img13 from "./img13.jpg";
import img14 from "./img14.jpg";
// import img15 from "./img15.jpg";
// import img16 from "./img16.jpg";
import song1 from "./song1.mp3";
import song2 from "./song2.mp3";
import song3 from "./song3.mp3";
import song4 from "./song4.mp3";
import song5 from "./song5.mp3";
import song6 from "./song6.mp3";
import song7 from "./song7.mp3";
import song8 from "./song8.mp3";
import song9 from "./song9.mp3";
import song10 from "./song10.mp3";
import song11 from "./song11.mp3";

export const songsData = [
  {
    id: 0,
    name: "Song One",
    image: img1,
    file: song1,
    desc: "A cheerful pop track by Artist One",
    duration: "3:00",
    genre: "Pop",
  },
  {
    id: 1,
    name: "Song Two",
    image: img2,
    file: song2,
    desc: "Relaxing indie vibes by Artist Two",
    duration: "2:20",
    genre: "Indie",
  },
  {
    id: 2,
    name: "Song Three",
    image: img3,
    file: song3,
    desc: "Energetic rock anthem by Artist Three",
    duration: "2:32",
    genre: "Rock",
  },
  {
    id: 3,
    name: "C'est JESUS KS",
    image: img4,
    file: song4,
    desc: "Inspirational gospel by KS Bloom",
    duration: "2:50",
    genre: "Gospel",
  },
  {
    id: 4,
    name: "KS Bloom Alloco",
    image: img5,
    file: song5,
    desc: "Upbeat afrobeat by KS Bloom",
    duration: "3:10",
    genre: "Afrobeat",
  },
  {
    id: 5,
    name: "C'est Dieu KS",
    image: img14,
    file: song6,
    desc: "Spiritual vibes by KS Bloom",
    duration: "2:45",
    genre: "Gospel",
  },
  {
    id: 6,
    name: "C'est Tchor KS",
    image: img7,
    file: song7,
    desc: "Catchy afrobeat by KS Bloom",
    duration: "2:18",
    genre: "Afrobeat",
  },
  {
    id: 7,
    name: "Dieu pile pas foto",
    image: img12,
    file: song8,
    desc: "Uplifting gospel by Artist Seven",
    duration: "2:35",
    genre: "Gospel",
  },
  {
    id: 8,
    name: "Discipledanslaville",
    image: img11,
    file: song9,
    desc: "Melancholic pop by Artist Eight",
    duration: "2:35",
    genre: "Pop",
  },
  {
    id: 9,
    name: "Oh mon ame",
    image: img1,
    file: song10,
    desc: "Soulful track by Artist Nine",
    duration: "2:35",
    genre: "Soul",
  },
  {
    id: 10,
    name: "7event",
    image: img4,
    file: song11,
    desc: "Energetic hip-hop by Artist Ten",
    duration: "2:35",
    genre: "Hip-Hop",
  },
];

export const assets = {
  bell_icon,
  home_icon,
  like_icon,
  loop_icon,
  mic_icon,
  next_icon,
  play_icon,
  plays_icon,
  prev_icon,
  search_icon,
  shuffle_icon,
  speaker_icon,
  stack_icon,
  zoom_icon,
  plus_icon,
  arrow_icon,
  mini_player_icon,
  volume_icon,
  queue_icon,
  pause_icon,
  arrow_left,
  arrow_right,
  spotify_logo,
  clock_icon,
};


// export const songsData = [
//   {
//     id: 0,
//     name: "Song One",
//     image: img1,
//     file: song1,
//     artist: "Artist One",
//     genre: "Pop",
//     desc: "A cheerful pop track to lift your spirits",
//     duration: "3:00",
//   },
//   {
//     id: 1,
//     name: "Song Two",
//     image: img2,
//     file: song2,
//     artist: "Artist Two",
//     genre: "Indie",
//     desc: "A mellow indie song for a relaxing evening",
//     duration: "2:20",
//   },
//   {
//     id: 2,
//     name: "Song Three",
//     image: img3,
//     file: song3,
//     artist: "Artist Three",
//     genre: "Rock",
//     desc: "A classic rock anthem to get you pumped",
//     duration: "2:32",
//   },
//   {
//     id: 3,
//     name: "C'est JESUS KS",
//     image: img4,
//     file: song4,
//     artist: "KS Bloom",
//     genre: "Gospel",
//     desc: "An uplifting gospel track",
//     duration: "2:50",
//   },
//   {
//     id: 4,
//     name: "KS Bloom Alloco",
//     image: img5,
//     file: song5,
//     artist: "KS Bloom",
//     genre: "Afrobeat",
//     desc: "A vibrant Afrobeat song",
//     duration: "3:10",
//   },
//   {
//     id: 5,
//     name: "C'est Dieu KS",
//     image: img14,
//     file: song6,
//     artist: "KS Bloom",
//     genre: "Gospel",
//     desc: "A spiritual gospel melody",
//     duration: "2:45",
//   },
//   {
//     id: 6,
//     name: "C'est Tchor KS",
//     image: img7,
//     file: song7,
//     artist: "KS Bloom",
//     genre: "Afrobeat",
//     desc: "A fun Afrobeat track",
//     duration: "2:18",
//   },
//   {
//     id: 7,
//     name: "Dieu pile pas foto",
//     image: img15,
//     file: song8,
//     artist: "KS Bloom",
//     genre: "Gospel",
//     desc: "A gospel song with a message",
//     duration: "2:35",
//   },
//   {
//     id: 8,
//     name: "Discipledanslaville",
//     image: img11,
//     file: song9,
//     artist: "KS Bloom",
//     genre: "Gospel",
//     desc: "A gospel track for inspiration",
//     duration: "2:35",
//   },
//   {
//     id: 9,
//     name: "Oh mon ame",
//     image: img1,
//     file: song10,
//     artist: "Bigty",
//     genre: "Gospel",
//     desc: "A soulful gospel song",
//     duration: "2:35",
//   },
//   {
//     id: 10,
//     name: "7event",
//     image: img12,
//     file: song11,
//     artist: "Sevent",
//     genre: "Afrobeat",
//     desc: "An energetic Afrobeat track",
//     duration: "2:35",
//   },
// ];

// export const albumsData = [
//   {
//     id: 0,
//     name: "Top 50 Global",
//     image: img8,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#2a4365",
//   },
//   {
//     id: 1,
//     name: "Top 50 India",
//     image: img9,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#22543d",
//   },
//   {
//     id: 2,
//     name: "Trending India",
//     image: img10,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#742a2a",
//   },
//   {
//     id: 3,
//     name: "Trending Global",
//     image: img16,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#44337a",
//   },
//   {
//     id: 4,
//     name: "Mega Hits",
//     image: img11,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#234e52",
//   },
//   {
//     id: 5,
//     name: "Happy Favorites",
//     image: img15,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
//   {
//     id: 6,
//     name: "Happy Favorites",
//     image: img13,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
//   {
//     id: 7,
//     name: "Happy Favorites",
//     image: img6,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
//   {
//     id: 8,
//     name: "Happy Favorites",
//     image: img11,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
//   {
//     id: 9,
//     name: "Happy Favorites",
//     image: img2,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
//   {
//     id: 10,
//     name: "Happy Favorites",
//     image: img1,
//     desc: "Your weekly update of the most played tracks",
//     bgColor: "#744210",
//   },
// ];

// export const songsData = [
//   {
//     id: 0,
//     name: "Song One",
//     image: img1,
//     file: song1,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "3:00",
//   },
//   {
//     id: 1,
//     name: "Song Two",
//     image: img2,
//     file: song2,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:20",
//   },
//   {
//     id: 2,
//     name: "Song Three",
//     image: img3,
//     file: song3,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:32",
//   },
//   {
//     id: 3,
//     name: "C'est JESUS KS",
//     image: img4,
//     file: song4,
//     desc: "Put a smile on  your face with these happy tunes",
//     duration: "2:50",
//   },
//   {
//     id: 4,
//     name: "KS Bloom Alloco",
//     image: img5,
//     file: song5,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "3:10",
//   },
//   {
//     id: 5,
//     name: "C'est Dieu KS",
//     image: img14,
//     file: song6,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:45",
//   },
//   {
//     id: 6,
//     name: "C'est Tchor KS",
//     image: img7,
//     file: song7,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:18",
//   },
//   {
//     id: 7,
//     name: "Dieu pile pas foto",
//     image: img12,
//     file: song8,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:35",
//   },
//   {
//     id: 8,
//     name: "Discipledanslaville",
//     image: img11,
//     file: song9,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:35",
//   },
//   {
//     id: 9,
//     name: "Oh mon ame",
//     image: img1,
//     file: song10,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:35",
//   },
//   {
//     id: 10,
//     name: "7event",
//     image: img4,
//     file: song11,
//     desc: "Put a smile on your face with these happy tunes",
//     duration: "2:35",
//   },
// ];
