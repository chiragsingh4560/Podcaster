import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BackendContext } from "../context/BackendContext";

const Description = () => {
  const [podcast, setPodcast] = useState(null);
  const { id } = useParams();
  const { backendUrl } = useContext(BackendContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          // Route to get the podcast by podcast_id
          `${backendUrl}/api/v1/get-podcast/${id}`,
          { withCredentials: true }
        );
        setPodcast(res.data.data);
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    };
    fetch();
  }, [id, backendUrl]);

  if (!podcast) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <div className="px-4 lg:px-12 py-4 h-auto flex flex-col md:flex-row items-start justify-between gap-4">
      {/* CHANGED: Directly using Cloudinary URL */}
      <div className="w-2/6 flex items-center justify-center md:justify-start md:items-start">
        <img
          src={podcast.frontImage} // No need for `${backendUrl}/`
          alt="thumbnail"
          className="rounded w-full h-[70vh] object-cover"
        />
      </div>

      <div className="w-4/6">
        <div className="text-4xl font-semibold">{podcast.title}</div>
        <h4 className="mt-4">{podcast.description}</h4>
        <div className="mt-2 w-fit bg-orange-100 text-orange-700 border border-orange-700 rounded-full px-4 py-2 text-center">
          {podcast.category.categoryName}
        </div>
      </div>
    </div>
  );
};

export default Description;
