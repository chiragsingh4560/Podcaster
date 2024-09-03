import React, { useEffect, useRef, useState } from "react";
import {
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPauseCircleSharp,
  IoPlaySharp,
} from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { playerActions } from "../../store/player";

const AudioPlayer = () => {
  const dispatch = useDispatch();
  // Current podcast states in redux
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const podcastImg = useSelector((state) => state.player.img);
  const podcastAudio = useSelector((state) => state.player.songPath);

  // Use state for knowing if the song is currently playing or not
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  // State to manage the duration of the podcast
  const [duration, setDuration] = useState(0);
  // Set the current time of the podcast
  const [time, setTime] = useState(0);

  const handlePlayPause = (e) => {
    e.preventDefault();
    setIsSongPlaying(!isSongPlaying);
    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // Reset everything when the close button is clicked
  const handleCloseAudioPlayer = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    setIsSongPlaying(false);
    setTime(0);
    setDuration(0);
  };

  // Store the reference of the audio file
  const audioRef = useRef();

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetaData = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    setIsSongPlaying(true);
    const currentPodcast = audioRef.current;
    currentPodcast.play();
    if (currentPodcast) {
      currentPodcast.addEventListener("timeupdate", handleTimeUpdate);
      currentPodcast.addEventListener("loadedmetadata", handleLoadedMetaData);
    }

    return () => {
      if (currentPodcast) {
        currentPodcast.removeEventListener("timeupdate", handleTimeUpdate);
        currentPodcast.removeEventListener("loadedmetadata", handleLoadedMetaData);
      }
    };
  }, [podcastAudio]);

  return (
    <div
      className={`${
        !PlayerDivState ? "hidden" : "fixed bottom-0 left-0"
      } w-[100%] bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}
    >
      <div className="hidden md:block w-1/3">
        <img
          src={podcastImg}
          alt="thumbnail"
          className="size-12 rounded-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center gap-4 text-xl">
          <button>
            <IoPlaySkipBackSharp />
          </button>
          <button onClick={handlePlayPause}>
            {isSongPlaying ? <IoPauseCircleSharp /> : <IoPlaySharp />}
          </button>
          <button>
            <IoPlaySkipForwardSharp />
          </button>
        </div>
        <div className="w-full flex items-center justify-center mt-3">
          <input
            type="range"
            min="0"
            max={duration}
            value={time}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            className="w-full hover:cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-end">
        <button onClick={handleCloseAudioPlayer}>
          <ImCross />
        </button>
      </div>
      <audio ref={audioRef} src={podcastAudio} />
    </div>
  );
};

export default AudioPlayer;
