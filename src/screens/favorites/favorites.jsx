import React,{useEffect,useState  } from 'react'
import APIKit from "../../spotify";
import "./favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [album, setAlbum] = useState(null);

useEffect(() => {
  APIKit.get("https://api.spotify.com/v1/me/tracks?offset=0&limit=20&locale=en-GB,en-US;q=0.9,en;q=0.8").then(function (response) {
    setAlbum(response.data.items);

  });
}, []);
const navigate = useNavigate();

const playPlaylist = (id) => {

  // navigate("/player", { state: { id: id } });
};


return (
    <div className="screen-container">
        <div><h1 className="library-title">Your Favorites</h1></div>

    <div className="library-body">
      {album?.map((album,index) => (

        <div
          className="favorite-card"
          key={index}
          onClick={() => playPlaylist(album[0]?.track)}

        >
          <img
            src={album.track.album.images[0].url}
            className="playlist-image"
            alt="Playlist-Art"
          />
          <p className="playlist-title">{album.track.name}</p>
          <div className="playlist-fade">
           
          </div>
        </div>
      ))}
    </div>
  </div> 
   )
}
