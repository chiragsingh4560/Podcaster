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
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const podcastImg = useSelector((state) => state.player.img);
  const podcastAudio = useSelector((state) => state.player.songPath);

  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (!audioRef.current || !podcastAudio) return;

    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
    setIsSongPlaying(!isSongPlaying);
  };

  const handleCloseAudioPlayer = () => {
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
    setIsSongPlaying(false);
    setTime(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
  };

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
    if (isNaN(time) || time < 0) return "0:00";
    const minute = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minute}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (!podcastAudio || !currentAudio) return;

    currentAudio.src = podcastAudio;
    currentAudio
      .play()
      .then(() => setIsSongPlaying(true))
      .catch((error) => console.error("Error playing audio:", error));

    currentAudio.addEventListener("timeupdate", handleTimeUpdate);
    currentAudio.addEventListener("loadedmetadata", handleLoadedMetaData);

    return () => {
      currentAudio.pause();
      currentAudio.src = "";
      currentAudio.removeEventListener("timeupdate", handleTimeUpdate);
      currentAudio.removeEventListener("loadedmetadata", handleLoadedMetaData);
    };
  }, [podcastAudio]);

  return (
    <div
      className={`${
        !PlayerDivState ? "hidden" : "fixed bottom-0 left-0 w-full"
      } bg-zinc-900 text-zinc-300 p-4 rounded flex items-center gap-4`}
    >
      {/* Podcast Thumbnail */}
      <div className="hidden md:block w-1/3">
        {podcastImg && (
          <img
            src={podcastImg}
            alt="thumbnail"
            className="size-12 rounded-full object-cover"
          />
        )}
      </div>

      {/* Controls */}
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

        {/* Progress Bar */}
        <div className="w-full flex items-center justify-center mt-3">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={time}
            onChange={(e) => (audioRef.current.currentTime = e.target.value)}
            className="w-full hover:cursor-pointer"
          />
        </div>

        {/* Time Display */}
        <div className="w-full flex items-center justify-between text-sm">
          <span>{formatTime(time)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Close Button */}
      <div className="w-1/3 flex items-center justify-end">
        <button onClick={handleCloseAudioPlayer}>
          <ImCross />
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;
