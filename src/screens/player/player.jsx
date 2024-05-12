import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";
import APIKit from "../../spotify";

export default function Player() {
  const location = useLocation("");
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

 
  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    if(!location.state){
    APIKit.get("https://api.spotify.com/v1/me/tracks?offset=0&limit=20&locale=en-GB,en-US;q=0.9,en;q=0.8").then(function (response) {
      setTracks(response.data.items);
    setCurrentTrack(response.data.items[0].track);

    
    });
  }
  }, []);
  useEffect(() => {

  
        setCurrentTrack(tracks[currentIndex]?.track);
    

}, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets artistID={currentTrack?.album?.artists[0]?.id} />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}