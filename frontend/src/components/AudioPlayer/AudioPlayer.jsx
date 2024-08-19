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
  // current podcast states in redux
  const PlayerDivState = useSelector((state) => state.player.isPlayerDiv);
  const podcastImg = useSelector((state) => state.player.img);
  const podcastAudio = useSelector((state) => state.player.songPath);
  // use state for knowing if song is currently playing or not
  const [isSongPlaying, setIsSongPlaying] = useState(false);

  const handlePlayPause = (e) => {
    e.preventDefault();
    setIsSongPlaying(!isSongPlaying);
    if (isSongPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  // close dabaya to sb reset krde setdiv state,song and image
  const handleCloseAudioPlayer = (e) => {
    e.preventDefault();
    dispatch(playerActions.closeDiv());
    dispatch(playerActions.changeImage(""));
    dispatch(playerActions.changeSong(""));
  };
  // stores the refernce of audio file
  const audioRef = useRef();

  useEffect(() => {
    setIsSongPlaying(true);
    audioRef.current.play();
  }, [podcastAudio]);

  return (
    <div
      // means ki jb player div state h mtlb ki play ho rha h to set it fixed in bottom else make it hidden
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
            max="100"
            className="w-full hover:cursor-pointer"
          />
        </div>
        <div className="w-full flex items-center justify-between text-sm">
          <span>0:00</span>
          <span>3:00</span>
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
