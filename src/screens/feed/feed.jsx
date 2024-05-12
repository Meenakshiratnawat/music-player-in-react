import React,{useEffect,useState  } from 'react'
import APIKit from "../../spotify";
import "./feed.css";
import apiClient from "../../spotify";
import Widgets from '../../components/widgets';
import Favorites from '../favorites/favorites';
export default function Feed() {
  const [data, setData]= useState(null);
  const [sata, setsata]= useState(null);

  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLAY3C19kL0nV2bI_plU3_YFCtra0dpsYkg&usqp=CAU"
  );
  useEffect(() => {
    apiClient.get("me").then((response) => {
      setImage(response.data.images[0].url);
      setData(response.data)
    });
  }, []);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/recommendations?seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical%2Ccountry&seed_tracks=0c6xIDDpzE81m2q797ordA", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");  
      }
      return response.json();
    })
    .then(data => {
      setsata(data.tracks[0]);
 
    })
    .catch(error => {
      console.error("There was a problem with your fetch operation:", error);
    });
    
  


  }, []);
return (
    <div className="screen-container">
    <div className="feed-body">
    <h1>Your profile</h1>
          <img
            src={image}
            className="feed-image"
            alt="Playlist-Art"
          />
          <p className="feed-title">{data?.display_name}</p>
<Widgets artistID={sata?.artists[0].id} />
      </div>
  </div> 
   )
}
