import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import player, { playerActions } from "../../store/player";
// items is the prop here
const PodcastCard = ({ items }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handlePlay = (e) => {
    if (isLoggedIn) {
      //if logged in then only play else wo apne aap login page p bhej dega niche code dekhle!
      e.preventDefault();
      dispatch(playerActions.setDiv());
      dispatch(
        playerActions.changeImage(`http://localhost:3000/${items.frontImage}`)
      );
      dispatch(
        playerActions.changeSong(`http://localhost:3000/${items.audioFile}`)
      );
    }
  };
  return (
    <div>
      {/* send the user to the description of the item if he clicks on podcast card */}
      <Link
        to={`/description/${items._id}`}
        className="border p-4 rounded flex flex-col shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div>
          <img
            src={`http://localhost:3000/${items.frontImage}`}
            className="rounded size-[42vh] object-cover"
          />
        </div>
        <div className="mt-2 text-xl font-bold">{items.title.slice(0, 20)}</div>
        <div className="mt-2 leading-5 text-slate-500">
          {items.description.slice(0, 50)}
        </div>
        <div className="mt-2 bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {items.category.categoryName}
        </div>
        <div className="mt-2">
          {/* if the user is not logged in then send him on login page */}
          <Link
            to={isLoggedIn ? "#" : "/login"}
            className="bg-green-900 text-white px-4 py-2 mt-2 flex items-center justify-center hover:bg-green-700 transition-all duration-300"
            onClick={handlePlay}
          >
            Play Now
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default PodcastCard;
