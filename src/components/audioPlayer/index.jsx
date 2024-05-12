import React, { useState, useRef, useEffect } from "react";
import "./audioPlayer.css";
import Controls from "./controls";
import ProgressCircle from "./progressCircle";
import WaveAnimation from "./waveAnimation";

export default function AudioPlayer({
  currentTrack,
  currentIndex,
  setCurrentIndex,
  total,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const audioRef = useRef(new Audio());
  const intervalRef = useRef();

  console.log(currentTrack,"currentTrack")


  const startTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {

        handleNext();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };
  

  useEffect(() => {
    const audio = audioRef.current;

    if ( isPlaying && audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio playback started.");
          })
          .catch((error) => {

            console.error("Playback error:", error);
          });
      }
      startTimer();
    } else if (( !isPlaying) && !audio.paused) {
      audio.pause();
      clearInterval(intervalRef.current);
    }
  
    return () => {
      audio.pause();
      clearInterval(intervalRef.current);
    };
  }, [isPlaying]);
  

  useEffect(() => {
    if (currentTrack && currentTrack.preview_url && !audioRef.current.src) {
      audioRef.current.src = currentTrack.preview_url;
      audioRef.current.preload = 'auto';
    }
  }, [currentTrack]);

  
  useEffect(() => {

    audioRef.current.pause();
    audioRef.current = new Audio(total[currentIndex]?.track.preview_url);
    setTrackProgress(0);

    audioRef.current.addEventListener("canplay", () => {
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error("Playback error:", error);
        });
        startTimer();
      }
    });

    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % total.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + total.length) % total.length);
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n;
  };

  const artists = currentTrack?.album?.artists.map((artist) => artist.name) || [];

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle
          percentage={(trackProgress / audioRef.current.duration) * 100}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className="song-artist">{artists.join(" | ")}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">
              0:{addZero(Math.round(trackProgress))}
            </p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
