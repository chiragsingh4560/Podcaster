import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PodcastCard from "../PodcastCard/PodcastCard";
import { BackendContext } from "../../context/BackendContext";

const YourPodcast = () => {
  const [podcasts, setPodcasts] = useState([]); // Changed from undefined to an empty array
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state
  const { backendUrl } = useContext(BackendContext);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true); // Start loading
        const res = await axios.get(`${backendUrl}/api/v1/get-user-podcasts`, {
          withCredentials: true,
        });
        setPodcasts(res.data.data); // Set fetched podcasts
      } catch (err) {
        console.error("Error fetching user podcasts:", err);
        setError("Failed to load podcasts. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPodcasts();
  }, [backendUrl]); // Added backendUrl as a dependency

  return (
    <div className="px-4 lg:px-12 my-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold md:font-bold">Your Podcasts</h1>
        <Link
          to="/add-podcast"
          className="px-4 py-2 bg-zinc-800 text-white rounded font-semibold"
        >
          Add Podcast
        </Link>
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading...</p>}

      {/* Error Handling */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Podcasts List */}
      {!loading && !error && (
        <div className="w-full my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {podcasts.length > 0 ? (
            podcasts.map((items, i) => (
              <div key={i}>
                <PodcastCard items={items} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No podcasts found. Start by creating one!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default YourPodcast;
